import './global.scss'
import { Inter } from 'next/font/google'
import RootProvider from './provider/RootProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anonymous University - LMS',
  description: 'Enhance your organization\'s training and education initiatives with a comprehensive Learning Management System (LMS). Streamline course management, track progress, and engage learners with interactive features. Discover the power of an efficient LMS to drive knowledge retention, empower your workforce, and unlock their full potential.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>
          <main>
            {children}
          </main>
        </RootProvider>
      </body>
    </html>
  )
}
