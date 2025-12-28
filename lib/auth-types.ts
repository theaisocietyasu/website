import type { DefaultSession, User } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      discordId?: string
    } & DefaultSession["user"]
  }

  interface User {
    discordId?: string
  }
}

