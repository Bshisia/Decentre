import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text, Container, HStack, SimpleGrid
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { authStore } from '../utils/authStore';
import Navbar from '../app/components/Navbar';

export default function Login() {
    const [selectedRole, setSelectedRole] = useState<'admin' | 'university' | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRoleSelect = (role: 'admin' | 'university') => {
        setSelectedRole(role);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        await new Promise(resolve => setTimeout(resolve, 800));

        if (authStore.login(username, password)) {
            router.push('/admin');
        } else {
            setError('Invalid username or password');
        }
        setLoading(false);
    };

    const handleBack = () => {
        setSelectedRole(null);
        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" position="relative">
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="blackAlpha.400" />
            <Box position="relative" zIndex={1}>
                <Navbar title="Login" icon="🔐" showLogin={false} />
                <Container maxW="md" py={20} display="flex" alignItems="center" justifyContent="center" minH="80vh">
                    {!selectedRole ? (
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
                                    <Text fontSize="3xl" color="white">👥</Text>
                                </Box>
                                <Heading size="xl" color="gray.800" mb={2}>Choose Login Type</Heading>
                                <Text color="gray.600" fontSize="lg">Select your role to continue</Text>
                            </CardHeader>
                            <CardBody pt={4}>
                                <SimpleGrid columns={1} spacing={4}>
                                    <Button
                                        size="lg"
                                        py={8}
                                        bg="purple.500"
                                        color="white"
                                        _hover={{ bg: "purple.600", transform: "translateY(-2px)" }}
                                        onClick={() => handleRoleSelect('admin')}
                                        borderRadius="xl"
                                        leftIcon={<Text fontSize="2xl">👨💼</Text>}
                                    >
                                        <VStack spacing={1}>
                                            <Text fontSize="lg" fontWeight="bold">System Administrator</Text>
                                            <Text fontSize="sm" opacity={0.8}>Manage admins and universities</Text>
                                        </VStack>
                                    </Button>
                                    <Button
                                        size="lg"
                                        py={8}
                                        bg="green.500"
                                        color="white"
                                        _hover={{ bg: "green.600", transform: "translateY(-2px)" }}
                                        onClick={() => handleRoleSelect('university')}
                                        borderRadius="xl"
                                        leftIcon={<Text fontSize="2xl">🏫</Text>}
                                    >
                                        <VStack spacing={1}>
                                            <Text fontSize="lg" fontWeight="bold">University</Text>
                                            <Text fontSize="sm" opacity={0.8}>Issue certificates and view students</Text>
                                        </VStack>
                                    </Button>
                                </SimpleGrid>
                            </CardBody>
                        </Card>
                    ) : (
                        <Card w="full" bg="whiteAlpha.950" backdropFilter="blur(20px)" border="2px solid" borderColor="whiteAlpha.400" shadow="2xl" borderRadius="2xl">
                            <CardHeader textAlign="center" pb={2}>
                                <HStack justify="space-between" align="center" mb={4}>
                                    <Button size="sm" variant="ghost" onClick={handleBack}>← Back</Button>
                                    <Box />
                                </HStack>
                                <Box 
                                    bg={selectedRole === 'admin' ? 'purple.500' : 'green.500'}
                                    borderRadius="full" 
                                    p={4} 
                                    display="inline-block"
                                    mb={4}
                                    shadow="lg"
                                >
                                    <Text fontSize="3xl" color="white">
                                        {selectedRole === 'admin' ? '👨💼' : '🏫'}
                                    </Text>
                                </Box>
                                <Heading size="xl" color="gray.800" mb={2}>
                                    {selectedRole === 'admin' ? 'Admin Login' : 'University Login'}
                                </Heading>
                                <Text color="gray.600" fontSize="lg">
                                    {selectedRole === 'admin' ? 'System Administrator Access' : 'University Portal Access'}
                                </Text>
                            </CardHeader>
                            <CardBody pt={4}>
                                <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                                    <FormControl isRequired>
                                        <FormLabel color="gray.700" fontWeight="semibold">Username</FormLabel>
                                        <Input
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            bg="white"
                                            border="2px solid"
                                            borderColor="gray.200"
                                            _focus={{ borderColor: selectedRole === 'admin' ? 'purple.500' : 'green.500' }}
                                            size="lg"
                                            borderRadius="xl"
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel color="gray.700" fontWeight="semibold">Password</FormLabel>
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            bg="white"
                                            border="2px solid"
                                            borderColor="gray.200"
                                            _focus={{ borderColor: selectedRole === 'admin' ? 'purple.500' : 'green.500' }}
                                            size="lg"
                                            borderRadius="xl"
                                        />
                                    </FormControl>

                                    <Button 
                                        type="submit" 
                                        colorScheme={selectedRole === 'admin' ? 'purple' : 'green'}
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

                                    <Box p={6} bg={selectedRole === 'admin' ? 'purple.50' : 'green.50'} borderRadius="xl" w="full" border="1px solid" borderColor={selectedRole === 'admin' ? 'purple.200' : 'green.200'}>
                                        <Text fontSize="sm" color={selectedRole === 'admin' ? 'purple.800' : 'green.800'} fontWeight="bold" mb={3} textAlign="center">Demo Credentials</Text>
                                        <Box textAlign="center">
                                            <Text fontSize="sm" color={selectedRole === 'admin' ? 'purple.700' : 'green.700'} fontWeight="semibold">
                                                {selectedRole === 'admin' ? 'Admin: admin / admin123' : 'University: university / uni2024'}
                                            </Text>
                                        </Box>
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card>
                    )}
                </Container>
            </Box>
        </Box>
    );
}