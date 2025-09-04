import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, SimpleGrid
} from '@chakra-ui/react';
import { authStore } from '../../utils/authStore';

const UniversityManagement: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        institution: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [universities, setUniversities] = useState(authStore.getAllUniversities());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.username.trim() || !form.password.trim() || !form.institution.trim()) {
            setMessage('All fields are required');
            return;
        }

        if (form.password.length < 6) {
            setMessage('Password must be at least 6 characters');
            return;
        }
        
        setLoading(true);
        setMessage('');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const success = authStore.addUniversity(form.username, form.password, form.institution);
            
            if (success) {
                setMessage('University added successfully! 🎉');
                setForm({ username: '', password: '', institution: '' });
                setUniversities(authStore.getAllUniversities());
            } else {
                setMessage('Username already exists. Please choose a different username.');
            }
        } catch (error) {
            setMessage('Failed to add university. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* Add University Form */}
            <Card bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                <CardHeader>
                    <Heading size="lg" color="green.600">Add New University</Heading>
                    <Text color="gray.600" mt={2} fontSize="md">Create a new university account</Text>
                </CardHeader>
                <CardBody>
                    <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>👤 Username</FormLabel>
                            <Input
                                value={form.username}
                                onChange={(e) => setForm({...form, username: e.target.value})}
                                placeholder="Enter university username"
                                bg="white"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>🔒 Password</FormLabel>
                            <Input
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                placeholder="Enter secure password (min 6 chars)"
                                bg="white"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>🏢 Institution Name</FormLabel>
                            <Input
                                value={form.institution}
                                onChange={(e) => setForm({...form, institution: e.target.value})}
                                placeholder="Enter institution name"
                                bg="white"
                            />
                        </FormControl>

                        <Button 
                            type="submit" 
                            colorScheme="green" 
                            size="lg"
                            w="full"
                            isLoading={loading}
                            loadingText="Adding University..."
                        >
                            Add University
                        </Button>

                        {message && (
                            <Alert status={message.includes('success') ? 'success' : 'error'} borderRadius="md">
                                <AlertIcon />
                                {message}
                            </Alert>
                        )}
                    </VStack>
                </CardBody>
            </Card>

            {/* Universities List */}
            <Card bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                <CardHeader>
                    <Heading size="lg" color="blue.600">Universities</Heading>
                    <Text color="gray.600" mt={2} fontSize="md">List of all university accounts</Text>
                </CardHeader>
                <CardBody>
                    {universities.length === 0 ? (
                        <Text color="gray.500" textAlign="center" py={8}>
                            No universities added yet.
                        </Text>
                    ) : (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Username</Th>
                                    <Th>Institution</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {universities.map((university, index) => (
                                    <Tr key={index}>
                                        <Td fontWeight="medium">{university.username}</Td>
                                        <Td>{university.institution}</Td>
                                        <Td>
                                            <Text color="green.600" fontWeight="medium">Active</Text>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </CardBody>
            </Card>
        </SimpleGrid>
    );
};

export default UniversityManagement;