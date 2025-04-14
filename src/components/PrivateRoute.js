import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') // or any login flag like `user`, `auth`, etc.

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
