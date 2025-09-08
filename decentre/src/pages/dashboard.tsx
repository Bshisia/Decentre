import React, { useState, useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Dashboard from '../app/components/Dashboard'
import Login from '../app/components/Login'
import Navbar from '../app/components/Navbar'
import { authStore } from '../utils/authStore'
import { useRouter } from 'next/router'

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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
    router.push('/login')
  }

  if (loading) {
    return <Box minH="100vh" bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" />
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" position="relative" overflow="hidden">
      <Navbar title="Admin Dashboard" icon="💼" showAuth onLogout={handleLogout} />
      <Container maxW="5xl" py={12}>
        <Dashboard />
      </Container>
    </Box>
  )
}