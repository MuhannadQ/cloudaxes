import Header from '@/components/Header'
import SiteFooter from '@/components/Footer'

type HomeLayoutProps = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Blank />
      <div className="hidden min-h-screen flex-col sm:flex">
        <Header />
        <main className="container flex-1 pt-16">{children}</main>
        <SiteFooter className="border-t" />
      </div>
    </>
  )
}

const Blank = () => (
  <div className="flex h-full items-center justify-center bg-blue-50 sm:hidden">
    <h2 className="text-xl">Viewport is too small!</h2>
  </div>
)
