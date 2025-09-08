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
                setMessage('University added successfully!');
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
            <Card bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="2xl" _hover={{ transform: 'translateY(-5px)', borderColor: 'rgba(0, 212, 255, 0.3)' }} transition="all 0.3s ease">
                <CardHeader>
                    <Heading size="lg" color="#00d4ff">Add New University</Heading>
                    <Text color="whiteAlpha.800" mt={2} fontSize="md">Create a new university account</Text>
                </CardHeader>
                <CardBody>
                    <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel color="white">👤 Username</FormLabel>
                            <Input
                                value={form.username}
                                onChange={(e) => setForm({...form, username: e.target.value})}
                                placeholder="Enter university username"
                                bg="rgba(255, 255, 255, 0.1)"
                                border="2px solid rgba(0, 212, 255, 0.2)"
                                color="white"
                                _placeholder={{ color: 'whiteAlpha.600' }}
                                _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color="white">🔒 Password</FormLabel>
                            <Input
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                placeholder="Enter secure password (min 6 chars)"
                                bg="rgba(255, 255, 255, 0.1)"
                                border="2px solid rgba(0, 212, 255, 0.2)"
                                color="white"
                                _placeholder={{ color: 'whiteAlpha.600' }}
                                _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color="white">🏢 Institution Name</FormLabel>
                            <Input
                                value={form.institution}
                                onChange={(e) => setForm({...form, institution: e.target.value})}
                                placeholder="Enter institution name"
                                bg="rgba(255, 255, 255, 0.1)"
                                border="2px solid rgba(0, 212, 255, 0.2)"
                                color="white"
                                _placeholder={{ color: 'whiteAlpha.600' }}
                                _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
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
                            loadingText="Adding University..."
                            _hover={{ transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)' }}
                        >
                            Add University
                        </Button>

                        {message && (
                            <Alert status={message.includes('success') ? 'success' : 'error'} borderRadius="xl" bg={message.includes('success') ? 'rgba(72, 187, 120, 0.1)' : 'rgba(255, 71, 87, 0.1)'} border="1px solid" borderColor={message.includes('success') ? 'rgba(72, 187, 120, 0.3)' : 'rgba(255, 71, 87, 0.3)'}>
                                <AlertIcon color={message.includes('success') ? '#48bb78' : '#ff4757'} />
                                <Text color={message.includes('success') ? '#48bb78' : '#ff4757'}>{message}</Text>
                            </Alert>
                        )}
                    </VStack>
                </CardBody>
            </Card>

            {/* Universities List */}
            <Card bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="2xl" _hover={{ transform: 'translateY(-5px)', borderColor: 'rgba(0, 212, 255, 0.3)' }} transition="all 0.3s ease">
                <CardHeader>
                    <Heading size="lg" color="#00d4ff">Universities</Heading>
                    <Text color="whiteAlpha.800" mt={2} fontSize="md">List of all university accounts</Text>
                </CardHeader>
                <CardBody>
                    {universities.length === 0 ? (
                        <Text color="whiteAlpha.600" textAlign="center" py={8}>
                            No universities added yet.
                        </Text>
                    ) : (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th color="whiteAlpha.800" borderColor="rgba(0, 212, 255, 0.2)">Username</Th>
                                    <Th color="whiteAlpha.800" borderColor="rgba(0, 212, 255, 0.2)">Institution</Th>
                                    <Th color="whiteAlpha.800" borderColor="rgba(0, 212, 255, 0.2)">Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {universities.map((university, index) => (
                                    <Tr key={index}>
                                        <Td fontWeight="medium" color="white" borderColor="rgba(0, 212, 255, 0.1)">{university.username}</Td>
                                        <Td color="whiteAlpha.800" borderColor="rgba(0, 212, 255, 0.1)">{university.institution}</Td>
                                        <Td borderColor="rgba(0, 212, 255, 0.1)">
                                            <Text color="#48bb78" fontWeight="medium">Active</Text>
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