import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text, Container
} from '@chakra-ui/react';
import { authStore } from '../../utils/authStore';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 800));

        if (authStore.login(username, password)) {
            onLogin();
        } else {
            setError('Invalid username or password');
        }
        setLoading(false);
    };

    return (
        <Box minH="100vh" bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" position="relative" overflow="hidden">
            {/* Animated Background Particles */}
            <Box position="absolute" inset={0} pointerEvents="none">
                {[...Array(20)].map((_, i) => (
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

            <Container maxW="md" py={20} position="relative" zIndex={1} display="flex" alignItems="center" justifyContent="center" minH="100vh">
                <Card w="full" bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="2xl">
                    <CardHeader textAlign="center" pb={2}>
                        <Box 
                            bg="linear-gradient(135deg, #00d4ff, #0099cc)" 
                            borderRadius="full" 
                            p={4} 
                            display="inline-block"
                            mb={4}
                            shadow="lg"
                        >
                            <Text fontSize="3xl" color="white">🔐</Text>
                        </Box>
                        <Heading size="xl" color="#00d4ff" mb={2}>Welcome Back</Heading>
                        <Text color="whiteAlpha.800" fontSize="lg">Sign in to access your dashboard</Text>
                    </CardHeader>
                    <CardBody pt={4}>
                        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel color="white" fontWeight="semibold">Username</FormLabel>
                                <Input
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    bg="rgba(255, 255, 255, 0.1)"
                                    border="2px solid rgba(0, 212, 255, 0.2)"
                                    color="white"
                                    _placeholder={{ color: 'whiteAlpha.600' }}
                                    _focus={{ borderColor: "#00d4ff", shadow: "0 0 0 1px #00d4ff" }}
                                    size="lg"
                                    borderRadius="xl"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="white" fontWeight="semibold">Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    bg="rgba(255, 255, 255, 0.1)"
                                    border="2px solid rgba(0, 212, 255, 0.2)"
                                    color="white"
                                    _placeholder={{ color: 'whiteAlpha.600' }}
                                    _focus={{ borderColor: "#00d4ff", shadow: "0 0 0 1px #00d4ff" }}
                                    size="lg"
                                    borderRadius="xl"
                                />
                            </FormControl>

                            <Button 
                                type="submit" 
                                bg="linear-gradient(135deg, #00d4ff, #0099cc)"
                                color="white"
                                size="lg"
                                w="full"
                                borderRadius="50px"
                                isLoading={loading}
                                loadingText="Signing in..."
                                py={6}
                                fontSize="lg"
                                _hover={{ transform: "translateY(-2px)", boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)" }}
                                transition="all 0.3s"
                            >
                                Sign In
                            </Button>

                            {error && (
                                <Alert status="error" borderRadius="xl" bg="rgba(255, 71, 87, 0.1)" border="1px solid rgba(255, 71, 87, 0.3)">
                                    <AlertIcon color="#ff4757" />
                                    <Text color="#ff4757">{error}</Text>
                                </Alert>
                            )}

                            <Box p={6} bg="rgba(0, 212, 255, 0.1)" borderRadius="xl" w="full" border="1px solid rgba(0, 212, 255, 0.2)">
                                <Text fontSize="sm" color="#00d4ff" fontWeight="bold" mb={3} textAlign="center">Demo Credentials</Text>
                                <VStack spacing={2}>
                                    <Box textAlign="center">
                                        <Text fontSize="sm" color="whiteAlpha.900" fontWeight="semibold">Admin Access</Text>
                                        <Text fontSize="sm" color="whiteAlpha.700">admin / admin123</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Text fontSize="sm" color="whiteAlpha.900" fontWeight="semibold">University Access</Text>
                                        <Text fontSize="sm" color="whiteAlpha.700">university / uni2024</Text>
                                    </Box>
                                </VStack>
                            </Box>
                        </VStack>
                    </CardBody>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;