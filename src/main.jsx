import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.scss'
import { App } from './App'
import { AuthProvider } from './contexts/auth'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
