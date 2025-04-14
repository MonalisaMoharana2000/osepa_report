import React from 'react'
import { Navigate } from 'react-router-dom'

export function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isApproved')

  return isAuthenticated ? <Navigate to="/" replace /> : children
}
