import '../styles/globals.css'
import { Quicksand } from '@next/font/google'
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--quicksand-font'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${quicksand.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  )
}
