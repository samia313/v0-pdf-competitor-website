'use client'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Admin panel is accessible in development
  // In production, add proper authentication
  return <>{children}</>
}
