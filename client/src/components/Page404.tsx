import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <main className="container pt-24 sm:pt-64">
      <p className="font-semibold leading-8 text-red-600 dark:text-red-400">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 leading-7 text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10">
        <Link
          to="/"
          className="text-sm font-semibold leading-7 text-red-600 dark:text-red-400"
        >
          <span aria-hidden="true">&larr;</span> Back to home
        </Link>
      </div>
    </main>
  )
}
