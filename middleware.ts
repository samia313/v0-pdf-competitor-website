// Re-export proxy as default middleware for Next.js 16 compatibility
export { default } from './proxy'

export const config = {
  matcher: [
    '/((?!_next|_vercel|api/(?!auth)|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
