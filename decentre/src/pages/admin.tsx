import React, { useState, useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Dashboard from '../app/components/Dashboard'
import Login from '../app/components/Login'
import Navbar from '../app/components/Navbar'
import { authStore } from '../utils/authStore'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsAuthenticated(authStore.isAuthenticated())
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    authStore.logout()
    setIsAuthenticated(false)
  }

  if (loading) {
    return <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <Navbar title="Admin Dashboard" icon="👨💼" showAuth onLogout={handleLogout} />
      <Container maxW="5xl" py={12}>
        <Dashboard />
      </Container>
    </Box>
  )
}