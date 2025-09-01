import { Box, Heading, Container, HStack, Button, Text } from '@chakra-ui/react'
import Dashboard from '../app/components/Dashboard'
import Link from 'next/link'

export default function Admin() {
  return (
    <Box minH="100vh" bg="linear-gradient(to bottom right, #3182ce, #553c9a)">
      <Box bg="whiteAlpha.100" backdropFilter="blur(10px)" borderBottom="1px" borderColor="whiteAlpha.200">
        <Container maxW="6xl" py={6}>
          <HStack justify="space-between">
            <HStack spacing={4}>
              <Text fontSize="3xl">👨💼</Text>
              <Heading size="xl" color="white">Admin Dashboard</Heading>
            </HStack>
            <Link href="/">
              <Button 
                bg="whiteAlpha.200" 
                color="white" 
                _hover={{ bg: "whiteAlpha.300" }}
                backdropFilter="blur(10px)"
              >
                ← Back to Home
              </Button>
            </Link>
          </HStack>
        </Container>
      </Box>
      <Container maxW="5xl" py={12}>
        <Dashboard />
      </Container>
    </Box>
  )
}