import React, { useState, useEffect } from 'react'
import { Box, Heading, Container, HStack, Button, Text } from '@chakra-ui/react'
import Dashboard from '../app/components/Dashboard'
import Login from '../app/components/Login'
import Link from 'next/link'
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
    return <Box minH="100vh" bg="linear-gradient(to bottom right, #3182ce, #553c9a)" />
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Box minH="100vh" bg="linear-gradient(to bottom right, #3182ce, #553c9a)">
      <Box bg="whiteAlpha.100" backdropFilter="blur(10px)" borderBottom="1px" borderColor="whiteAlpha.200">
        <Container maxW="6xl" py={6}>
          <HStack justify="space-between">
            <HStack spacing={4}>
              <Text fontSize="3xl">👨💼</Text>
              <Heading size="xl" color="white">Admin Dashboard</Heading>
              <Text color="whiteAlpha.800" fontSize="sm">
                Welcome, {authStore.getCurrentAdmin()?.username}
              </Text>
            </HStack>
            <HStack spacing={3}>
              <Button 
                onClick={handleLogout}
                bg="red.500" 
                color="white" 
                _hover={{ bg: "red.600" }}
                size="sm"
              >
                🚪 Logout
              </Button>
              <Link href="/">
                <Button 
                  bg="whiteAlpha.200" 
                  color="white" 
                  _hover={{ bg: "whiteAlpha.300" }}
                  backdropFilter="blur(10px)"
                  size="sm"
                >
                  ← Home
                </Button>
              </Link>
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW="5xl" py={12}>
        <Dashboard />
      </Container>
    </Box>
  )
}