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
        <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" position="relative">
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="blackAlpha.400" />
            <Container maxW="md" py={20} position="relative" zIndex={1} display="flex" alignItems="center" justifyContent="center" minH="100vh">
                <Card w="full" bg="whiteAlpha.950" backdropFilter="blur(20px)" border="2px solid" borderColor="whiteAlpha.400" shadow="2xl" borderRadius="2xl">
                    <CardHeader textAlign="center" pb={2}>
                        <Box 
                            bg="blue.500" 
                            borderRadius="full" 
                            p={4} 
                            display="inline-block"
                            mb={4}
                            shadow="lg"
                        >
                            <Text fontSize="3xl" color="white">🔐</Text>
                        </Box>
                        <Heading size="xl" color="gray.800" mb={2}>Welcome Back</Heading>
                        <Text color="gray.600" fontSize="lg">Sign in to access your dashboard</Text>
                    </CardHeader>
                    <CardBody pt={4}>
                        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="semibold">Username</FormLabel>
                                <Input
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    bg="white"
                                    border="2px solid"
                                    borderColor="gray.200"
                                    _focus={{ borderColor: "blue.500", shadow: "0 0 0 1px #3182ce" }}
                                    size="lg"
                                    borderRadius="xl"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="gray.700" fontWeight="semibold">Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    bg="white"
                                    border="2px solid"
                                    borderColor="gray.200"
                                    _focus={{ borderColor: "blue.500", shadow: "0 0 0 1px #3182ce" }}
                                    size="lg"
                                    borderRadius="xl"
                                />
                            </FormControl>

                            <Button 
                                type="submit" 
                                colorScheme="blue" 
                                size="lg"
                                w="full"
                                isLoading={loading}
                                loadingText="Signing in..."
                                borderRadius="xl"
                                py={6}
                                fontSize="lg"
                                _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
                                transition="all 0.3s"
                            >
                                Sign In
                            </Button>

                            {error && (
                                <Alert status="error" borderRadius="xl" bg="red.50" border="1px solid" borderColor="red.200">
                                    <AlertIcon />
                                    <Text color="red.700">{error}</Text>
                                </Alert>
                            )}

                            <Box p={6} bg="gradient-to-r from-blue.50 to-purple.50" borderRadius="xl" w="full" border="1px solid" borderColor="blue.200">
                                <Text fontSize="sm" color="blue.800" fontWeight="bold" mb={3} textAlign="center">Demo Credentials</Text>
                                <VStack spacing={2}>
                                    <Box textAlign="center">
                                        <Text fontSize="sm" color="blue.700" fontWeight="semibold">Admin Access</Text>
                                        <Text fontSize="sm" color="blue.600">admin / admin123</Text>
                                    </Box>
                                    <Box textAlign="center">
                                        <Text fontSize="sm" color="purple.700" fontWeight="semibold">University Access</Text>
                                        <Text fontSize="sm" color="purple.600">university / uni2024</Text>
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