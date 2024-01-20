import { Link, NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import UserNav from '@/components/UserNav'
import Icons from '@/components/Icons'
import { pages } from '@/data/site'

export default function Header() {
  return (
    <div className="fixed top-0 z-50 w-full border-b bg-background shadow-sm">
      <header className="container flex h-16 items-center gap-6 px-4 md:gap-10">
        <Link to="/">
          <Icons.logo />
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </header>
    </div>
  )
}

function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      {pages.map((page) => (
        <NavLink
          key={page.path}
          to={page.path}
          className={({ isActive }) =>
            cn(
              'text-sm font-medium transition-colors hover:text-primary',
              !isActive && 'text-muted-foreground'
            )
          }
        >
          {page.title}
        </NavLink>
      ))}
    </nav>
  )
}

function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}
