import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text
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
        await new Promise(resolve => setTimeout(resolve, 500));

        if (authStore.login(username, password)) {
            onLogin();
        } else {
            setError('Invalid username or password');
        }
        setLoading(false);
    };

    return (
        <Box minH="100vh" bg="linear-gradient(to bottom right, #3182ce, #553c9a)" display="flex" alignItems="center" justifyContent="center">
            <Card maxW="md" w="full" mx={4} bg="whiteAlpha.950" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                <CardHeader textAlign="center">
                    <Text fontSize="4xl" mb={4}>🔐</Text>
                    <Heading size="lg" color="gray.800">Admin Login</Heading>
                    <Text color="gray.600" mt={2}>Access the certificate management system</Text>
                </CardHeader>
                <CardBody>
                    <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>👤 Username</FormLabel>
                            <Input
                                value={username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                bg="white"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>🔑 Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                bg="white"
                            />
                        </FormControl>

                        <Button 
                            type="submit" 
                            colorScheme="blue" 
                            size="lg"
                            w="full"
                            isLoading={loading}
                            loadingText="Signing in..."
                        >
                            Sign In
                        </Button>

                        {error && (
                            <Alert status="error" borderRadius="md">
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}

                        <Box p={4} bg="blue.50" borderRadius="md" w="full">
                            <Text fontSize="sm" color="blue.700" fontWeight="bold" mb={2}>Demo Credentials:</Text>
                            <Text fontSize="sm" color="blue.600">Username: admin | Password: admin123</Text>
                            <Text fontSize="sm" color="blue.600">Username: university | Password: uni2024</Text>
                        </Box>
                    </VStack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Login;