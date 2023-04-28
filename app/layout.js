import './globals.css'

export const metadata = {
  title: 'Book Gallery',
  description: 'A list of must read books.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
