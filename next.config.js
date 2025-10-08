const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ['raw.githubusercontent.com', 'github.com'],
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
   },
   async rewrites() {
      return [
         {
            source: "/ingest/static/:path*",
            destination: "https://eu-assets.i.posthog.com/static/:path*",
         },
         {
            source: "/ingest/:path*",
            destination: "https://eu.i.posthog.com/:path*",
         },
      ]
   },
   skipTrailingSlashRedirect: true,
}

module.exports = withPWA(nextConfig)
