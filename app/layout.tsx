"use client";

import '@styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '@components/Navbar';
import { SessionProvider } from 'next-auth/react';

interface RootLayoutProps {
  children: ReactNode; // Specify the type for children
  session: any
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div className="main">
            <div className='gradient'></div>
          </div>
          <Navbar></Navbar>

          <main className='app'>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
