// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import { UserProvider } from '@/context/UserContext'

export const metadata = {
  title: 'POS Qalandari',
  description: 'POS Qalandari Mobile.'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}

export default RootLayout
