import type { Metadata } from 'next'
import '../styles/globals.css'
import DarkModeProvider from '@/components/DarkModeProvider'

export const metadata: Metadata = {
  title: 'Airdrop | nekowawolf',
  description: 'Airdrop tracking application',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var darkmode = localStorage.getItem('darkmode');
                  if (darkmode === 'active') {
                    document.documentElement.classList.add('darkmode');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="body1 transition-all duration-300 flex items-center justify-center min-h-screen">
        <DarkModeProvider>
          <div className="navbar-width">
            {children}
          </div>
        </DarkModeProvider>
      </body>
    </html>
  )
} 