import { AuthContext } from './contexts/auth'
import React, { useContext } from 'react'
import { Home } from './components/Home'
import { Login } from './components/Login'

import { Footer } from './components/Footer'
import { Header } from './components/Header'

export function App() {

  const { login } = useContext(AuthContext);

  return (
    <>
    <Header />
    {
      login ? <Home /> : <Login />
    }
    <Footer />
    </>
  )
}
