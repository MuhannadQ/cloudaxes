type RootLayoutProps = {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="h-screen">
      {children}
      {/* 
        // Global Stuff
        <Analytics />
        <Toaster />
      */}
    </div>
  )
}
