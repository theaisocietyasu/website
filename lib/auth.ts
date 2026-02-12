import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import "./auth-types" // Extend NextAuth types

/**
 * Verify user has admin role in Discord guild using bot token
 */
async function verifyDiscordAdminRole(discordUserId: string): Promise<boolean> {
  const botToken = process.env.DISCORD_BOT_TOKEN
  const guildId = process.env.DISCORD_GUILD_ID
  const adminRoleId = process.env.ADMIN_ROLE_ID

  if (!botToken || !guildId || !adminRoleId) {
    // Missing configuration - fail silently for security
    return false
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${discordUserId}`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      }
    )

    if (!response.ok) {
      // User not found or API error - fail silently
      return false
    }

    const member: { roles: string[] } = await response.json()
    const hasRole = member.roles.includes(adminRoleId)

    return hasRole
  } catch (error) {
    // Authentication error - fail silently for security
    return false
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // NO DATABASE - JWT only!
    maxAge: (await import('@/lib/config')).SESSION.MAX_AGE,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Verify Discord role on sign-in
      if (account?.provider === "discord" && account?.providerAccountId) {
        const hasAdminRole = await verifyDiscordAdminRole(account.providerAccountId)
        
        if (!hasAdminRole) {
          // Deny sign-in
          return false
        }
      }
      return true
    },
    async jwt({ token, account, profile }) {
      // Store Discord ID in JWT for future role checks
      if (account?.providerAccountId) {
        token.discordId = account.providerAccountId
      }
      return token
    },
    async session({ session, token }) {
      // Add Discord ID to session
      if (token.discordId) {
        session.user.discordId = token.discordId as string
      }
      return session
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
})

