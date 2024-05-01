import '@styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '@components/Navbar';


export const metadata = {
  title : "Vulnera-App",
  description : "App to demo common vulnerabilities in web app"
}

interface RootLayoutProps {
  children: ReactNode; // Specify the type for children
}

const RootLayout : React.FC<RootLayoutProps> = ({children}) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className='gradient'></div>
        </div>
        <Navbar></Navbar>

        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
