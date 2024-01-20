export const siteConfig = {
  name: 'Cloudaxes',
  description: 'An open source application built using react and shadcn ui.',
  url: 'https://cloudaxes.hashtag.dev',
  ogImage: 'https://cloudaxes.hashtag.dev/og.jpg',
  links: {
    twitter: 'https://twitter.com/MuhannadQ',
    github: 'https://github.com/MuhannadQ/cloudaxes',
  },
} as const

export const pages = [
  { path: '/', title: 'Overview' },
  { path: '/ec2', title: 'EC2' },
  { path: '/settings', title: 'Settings' },
] as const
