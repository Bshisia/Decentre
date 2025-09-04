import { Box, Heading, Text, Button, VStack, HStack, Container, SimpleGrid, Card, CardBody } from '@chakra-ui/react'
import Link from 'next/link'
import Navbar from '../app/components/Navbar'

export default function Home() {
  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" position="relative">
      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="blackAlpha.300" />
      <Box position="relative" zIndex={1}>
        <Navbar title="Decentre" icon="🎓" showHome={false} showLogin />
        <Container maxW="6xl" py={10}>
        <VStack spacing={16} textAlign="center">
          {/* Hero Section */}
          <VStack spacing={8}>
            <Box 
              bg="whiteAlpha.200" 
              borderRadius="full" 
              p={8} 
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="whiteAlpha.400"
              shadow="2xl"
            >
              <Text fontSize="8xl">🎓</Text>
            </Box>
            <VStack spacing={4}>
              <Heading size="4xl" color="white" fontWeight="bold" textShadow="2px 2px 4px rgba(0,0,0,0.3)">
                Decentre
              </Heading>
              <Heading size="xl" color="whiteAlpha.900" fontWeight="normal">
                Decentralized Certification System
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.800" maxW="3xl" lineHeight="tall">
                Secure, tamper-proof certificates stored on blockchain. 
                No more lost documents or verification delays.
              </Text>
            </VStack>
          </VStack>

          {/* Action Buttons */}
          <HStack spacing={8}>
            <Link href="/admin">
              <Button 
                size="xl" 
                px={12}
                py={8}
                fontSize="xl"
                bg="white"
                color="blue.600"
                _hover={{ bg: "blue.50", transform: "translateY(-4px)", shadow: "2xl" }}
                shadow="xl"
                borderRadius="2xl"
                transition="all 0.3s"
              >
                👨💼 Admin Dashboard
              </Button>
            </Link>
            <Link href="/verify">
              <Button 
                size="xl" 
                px={12}
                py={8}
                fontSize="xl"
                bg="green.500"
                color="white"
                _hover={{ bg: "green.600", transform: "translateY(-4px)", shadow: "2xl" }}
                shadow="xl"
                borderRadius="2xl"
                transition="all 0.3s"
              >
                🔍 Verify Certificate
              </Button>
            </Link>
          </HStack>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full" mt={16}>
            <Card bg="whiteAlpha.900" backdropFilter="blur(20px)" border="1px solid" borderColor="whiteAlpha.400" shadow="xl" _hover={{ transform: "translateY(-4px)", shadow: "2xl" }} transition="all 0.3s">
              <CardBody textAlign="center" p={8}>
                <Text fontSize="4xl" mb={4}>🛡️</Text>
                <Heading size="md" mb={2} color="gray.800">Secure Storage</Heading>
                <Text color="gray.600">Certificates stored on blockchain with cryptographic security</Text>
              </CardBody>
            </Card>
            <Card bg="whiteAlpha.900" backdropFilter="blur(20px)" border="1px solid" borderColor="whiteAlpha.400" shadow="xl" _hover={{ transform: "translateY(-4px)", shadow: "2xl" }} transition="all 0.3s">
              <CardBody textAlign="center" p={8}>
                <Text fontSize="4xl" mb={4}>⚡</Text>
                <Heading size="md" mb={2} color="gray.800">Instant Verification</Heading>
                <Text color="gray.600">Verify any certificate in seconds using just student ID</Text>
              </CardBody>
            </Card>
            <Card bg="whiteAlpha.900" backdropFilter="blur(20px)" border="1px solid" borderColor="whiteAlpha.400" shadow="xl" _hover={{ transform: "translateY(-4px)", shadow: "2xl" }} transition="all 0.3s">
              <CardBody textAlign="center" p={8}>
                <Text fontSize="4xl" mb={4}>📱</Text>
                <Heading size="md" mb={2} color="gray.800">No Physical Docs</Heading>
                <Text color="gray.600">Students only need their ID number for verification</Text>
              </CardBody>
            </Card>
            <Card bg="whiteAlpha.900" backdropFilter="blur(20px)" border="1px solid" borderColor="whiteAlpha.400" shadow="xl" _hover={{ transform: "translateY(-4px)", shadow: "2xl" }} transition="all 0.3s">
              <CardBody textAlign="center" p={8}>
                <Text fontSize="4xl" mb={4}>👨💼</Text>
                <Heading size="md" mb={2} color="gray.800">Admin Control</Heading>
                <Text color="gray.600">Authorized admins can issue and revoke certificates</Text>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* How it Works */}
          <Box w="full" mt={16}>
            <Heading size="xl" mb={8} color="white">How It Works</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <VStack spacing={4} align="start">
                <Box p={6} bg="whiteAlpha.200" borderRadius="xl" w="full" backdropFilter="blur(10px)" _hover={{ bg: "whiteAlpha.300" }} transition="all 0.3s">
                  <Text fontWeight="bold" color="white" fontSize="lg">1. Admin Issues Certificate</Text>
                  <Text color="whiteAlpha.800">Enter student details and course information</Text>
                </Box>
                <Box p={6} bg="whiteAlpha.200" borderRadius="xl" w="full" backdropFilter="blur(10px)" _hover={{ bg: "whiteAlpha.300" }} transition="all 0.3s">
                  <Text fontWeight="bold" color="white" fontSize="lg">2. Blockchain Storage</Text>
                  <Text color="whiteAlpha.800">Certificate stored securely with student ID as key</Text>
                </Box>
              </VStack>
              <VStack spacing={4} align="start">
                <Box p={6} bg="whiteAlpha.200" borderRadius="xl" w="full" backdropFilter="blur(10px)" _hover={{ bg: "whiteAlpha.300" }} transition="all 0.3s">
                  <Text fontWeight="bold" color="white" fontSize="lg">3. Student Shares ID</Text>
                  <Text color="whiteAlpha.800">Student provides only their ID number to employers</Text>
                </Box>
                <Box p={6} bg="whiteAlpha.200" borderRadius="xl" w="full" backdropFilter="blur(10px)" _hover={{ bg: "whiteAlpha.300" }} transition="all 0.3s">
                  <Text fontWeight="bold" color="white" fontSize="lg">4. Instant Verification</Text>
                  <Text color="whiteAlpha.800">Employer verifies certificate authenticity immediately</Text>
                </Box>
              </VStack>
            </SimpleGrid>
          </Box>
        </VStack>
        </Container>
      </Box>
    </Box>
  )
}