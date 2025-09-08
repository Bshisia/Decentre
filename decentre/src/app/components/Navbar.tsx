import React from 'react';
import { Box, Container, HStack, Button, Text, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { authStore } from '../../utils/authStore';

interface NavbarProps {
  title: string;
  icon: string;
  showAuth?: boolean;
  showHome?: boolean;
  showLogin?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, icon, showAuth = false, showHome = true, showLogin = true, onLogout }) => {
  const currentAdmin = authStore.getCurrentAdmin();

  return (
    <Box bg="whiteAlpha.100" backdropFilter="blur(10px)" borderBottom="1px" borderColor="whiteAlpha.200">
      <Container maxW="6xl" py={6}>
        <HStack justify="space-between">
          <HStack spacing={4}>
            <Text fontSize="3xl">{icon}</Text>
            <Heading size="xl" color="white">{title}</Heading>
            {showAuth && currentAdmin && (
              <Text color="whiteAlpha.800" fontSize="sm">
                Welcome, {currentAdmin.username}
              </Text>
            )}
          </HStack>
          <HStack spacing={3}>
            {showAuth && onLogout && (
              <Button 
                onClick={onLogout}
                bg="red.500" 
                color="white" 
                _hover={{ bg: "red.600" }}
                size="sm"
              >
               Logout
              </Button>
            )}
            {!showAuth && showLogin && (
              <Link href="/login">
                <Button 
                  bg="blue.500" 
                  color="white" 
                  _hover={{ bg: "blue.600" }}
                  size="sm"
                >
                  🔐 Login
                </Button>
              </Link>
            )}
            {showHome && (
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
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;