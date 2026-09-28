import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/relink/edit", "/relink/signin"] },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
