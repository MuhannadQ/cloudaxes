import Icons from '@/components/Icons'

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20">
          <Icons.logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This app is a time-saver, simplifying AWS resource navigation and
              offering quick insights into EC2 instances, making auditing a breeze.&rdquo;
            </p>
            <footer className="text-sm">Said Nobody</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  )
}
