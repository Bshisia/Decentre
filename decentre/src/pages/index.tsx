import { Box, Heading, Text, Button, VStack, HStack, Container, SimpleGrid, Card, CardBody } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" position="relative" overflow="hidden">
      {/* Animated Background Particles */}
      <Box position="absolute" inset={0} pointerEvents="none">
        {[...Array(30)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            w="2px"
            h="2px"
            bg="#00d4ff"
            borderRadius="50%"
            opacity={0.6}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            animation={`float ${3 + Math.random() * 3}s ease-in-out infinite`}
            sx={{
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-20px) rotate(180deg)' }
              }
            }}
          />
        ))}
      </Box>

      {/* Header */}
      <Box position="fixed" top={0} w="full" p={4} bg="rgba(15, 15, 35, 0.9)" backdropFilter="blur(10px)" borderBottom="1px solid rgba(0, 212, 255, 0.1)" zIndex={1000}>
        <Container maxW="6xl">
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Text fontSize="2xl">🔗</Text>
              <Heading size="lg" color="#00d4ff" fontWeight="700">Decentre</Heading>
            </HStack>
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              <Link href="#features"><Text color="white" _hover={{ color: '#00d4ff' }} cursor="pointer">Features</Text></Link>
              <Link href="#how-it-works"><Text color="white" _hover={{ color: '#00d4ff' }} cursor="pointer">How It Works</Text></Link>
              <Link href="/verify"><Text color="white" _hover={{ color: '#00d4ff' }} cursor="pointer">Verify</Text></Link>
            </HStack>
            <Link href="/login">
              <Button bg="linear-gradient(135deg, #00d4ff, #0099cc)" color="white" borderRadius="50px" px={6} _hover={{ transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)' }}>
                Get Started
              </Button>
            </Link>
          </HStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxW="6xl" pt={32} pb={20}>
        <VStack spacing={12} textAlign="center">
          <VStack spacing={6} animation="fadeInUp 1s ease-out">
            <Heading 
              size="4xl" 
              fontWeight="800" 
              bgGradient="linear(135deg, #ffffff, #00d4ff)"
              bgClip="text"
              lineHeight="1.2"
            >
              Decentralized Certificate Verification
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900" maxW="3xl" lineHeight="1.6">
              Secure, transparent, and tamper-proof certificate verification powered by blockchain technology. 
              Verify credentials instantly with complete trust and transparency.
            </Text>
          </VStack>

          <HStack spacing={6} flexWrap="wrap" justify="center">
            <Link href="/verify">
              <Button 
                size="lg" 
                px={8} 
                py={6}
                bg="linear-gradient(135deg, #00d4ff, #0099cc)"
                color="white"
                borderRadius="50px"
                fontSize="lg"
                fontWeight="600"
                _hover={{ transform: 'translateY(-3px)', boxShadow: '0 15px 30px rgba(0, 212, 255, 0.4)' }}
                transition="all 0.3s ease"
              >
                Verify Certificate
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                size="lg" 
                px={8} 
                py={6}
                bg="transparent"
                border="2px solid #00d4ff"
                color="#00d4ff"
                borderRadius="50px"
                fontSize="lg"
                fontWeight="600"
                _hover={{ bg: '#00d4ff', color: '#0f0f23', transform: 'translateY(-3px)' }}
                transition="all 0.3s ease"
              >
                Learn More
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>

      {/* Features Section */}
      <Box id="features" py={20}>
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Heading 
              size="2xl" 
              textAlign="center"
              bgGradient="linear(135deg, #ffffff, #00d4ff)"
              bgClip="text"
            >
              Why Choose Decentre?
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {[
                { icon: '🔒', title: 'Immutable Security', desc: 'Certificates stored on blockchain cannot be altered or forged, ensuring permanent authenticity.' },
                { icon: '⚡', title: 'Instant Verification', desc: 'Verify any certificate in seconds without contacting issuing institutions.' },
                { icon: '🌍', title: 'Global Accessibility', desc: 'Access and verify certificates from anywhere in the world, 24/7.' },
                { icon: '💰', title: 'Cost Effective', desc: 'Eliminate verification costs and reduce administrative overhead.' },
                { icon: '🔄', title: 'Transparent Process', desc: 'Full audit trail and transparency with blockchain\'s public ledger.' },
                { icon: '🎯', title: 'Zero Trust Model', desc: 'No need to trust intermediaries - blockchain provides cryptographic proof.' }
              ].map((feature, index) => (
                <Card 
                  key={index}
                  bg="rgba(255, 255, 255, 0.05)" 
                  backdropFilter="blur(10px)" 
                  border="1px solid rgba(0, 212, 255, 0.1)"
                  borderRadius="20px"
                  p={6}
                  _hover={{ 
                    transform: 'translateY(-10px)', 
                    boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)',
                    borderColor: 'rgba(0, 212, 255, 0.3)'
                  }}
                  transition="all 0.3s ease"
                >
                  <CardBody textAlign="center" p={0}>
                    <Text fontSize="3xl" mb={4}>{feature.icon}</Text>
                    <Heading size="md" mb={3} color="#00d4ff">{feature.title}</Heading>
                    <Text color="whiteAlpha.800" lineHeight="1.6">{feature.desc}</Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" bg="rgba(0, 0, 0, 0.2)" py={20}>
        <Container maxW="4xl">
          <VStack spacing={12} textAlign="center">
            <Heading 
              size="2xl"
              bgGradient="linear(135deg, #ffffff, #00d4ff)"
              bgClip="text"
            >
              How It Works
            </Heading>
            
            <HStack spacing={8} justify="space-between" flexWrap="wrap">
              {[
                { num: '1', title: 'Admin Issues Certificate', desc: 'Institution uploads certificate data with cryptographic signatures' },
                { num: '2', title: 'Blockchain Storage', desc: 'Certificate hash and metadata are permanently stored on network' },
                { num: '3', title: 'Instant Verification', desc: 'Anyone can verify certificate authenticity by checking blockchain records' }
              ].map((step, index) => (
                <VStack key={index} spacing={4} flex={1} minW="250px">
                  <Box
                    w="60px"
                    h="60px"
                    borderRadius="50%"
                    bg="linear-gradient(135deg, #00d4ff, #0099cc)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xl"
                    fontWeight="bold"
                    color="white"
                  >
                    {step.num}
                  </Box>
                  <Heading size="md" color="#00d4ff">{step.title}</Heading>
                  <Text color="whiteAlpha.800" lineHeight="1.6">{step.desc}</Text>
                </VStack>
              ))}
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box py={12}>
        <Container maxW="4xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} textAlign="center">
            {[
              { number: '1K+', label: 'Certificates Verified' },
              { number: '10+', label: 'Partner Institutions' },
              { number: '99.9%', label: 'Security Rate' },
              { number: '<3s', label: 'Verification Time' }
            ].map((stat, index) => (
              <VStack key={index} spacing={2}>
                <Heading size="2xl" color="#00d4ff" fontWeight="bold">{stat.number}</Heading>
                <Text color="whiteAlpha.800" fontSize="lg">{stat.label}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="rgba(0, 0, 0, 0.3)" py={8} borderTop="1px solid rgba(0, 212, 255, 0.1)">
        <Container maxW="6xl">
          <Text textAlign="center" color="whiteAlpha.800">
            © 2025 Decentre. Built with blockchain technology for a trusted future.
          </Text>
        </Container>
      </Box>
    </Box>
  )
}