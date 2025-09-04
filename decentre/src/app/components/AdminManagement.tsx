import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text, Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';
import { authStore } from '../../utils/authStore';

const AdminManagement: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [admins, setAdmins] = useState(authStore.getAllAdmins());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.username.trim() || !form.password.trim()) {
            setMessage('Username and password are required');
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
            
            const success = authStore.addAdmin(form.username, form.password);
            
            if (success) {
                setMessage('Admin added successfully! 🎉');
                setForm({ username: '', password: '' });
                setAdmins(authStore.getAllAdmins());
            } else {
                setMessage('Username already exists. Please choose a different username.');
            }
        } catch (error) {
            setMessage('Failed to add admin. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <VStack spacing={8} align="stretch">
            {/* Add Admin Form */}
            <Card bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                <CardHeader>
                    <Heading size="lg" color="purple.600">Add New Admin</Heading>
                    <Text color="gray.600" mt={2} fontSize="md">Create a new admin account</Text>
                </CardHeader>
                <CardBody>
                    <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>👤 Username</FormLabel>
                            <Input
                                value={form.username}
                                onChange={(e) => setForm({...form, username: e.target.value})}
                                placeholder="Enter admin username"
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

                        <Button 
                            type="submit" 
                            colorScheme="purple" 
                            size="lg"
                            w="full"
                            isLoading={loading}
                            loadingText="Adding Admin..."
                        >
                            Add Admin
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

            {/* Current Admins List */}
            <Card bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                <CardHeader>
                    <Heading size="lg" color="blue.600">Current Admins</Heading>
                    <Text color="gray.600" mt={2} fontSize="md">List of all admin accounts</Text>
                </CardHeader>
                <CardBody>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Username</Th>
                                <Th>Role</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {admins.map((admin, index) => (
                                <Tr key={index}>
                                    <Td fontWeight="medium">{admin.username}</Td>
                                    <Td>
                                        <Text color="blue.600" fontWeight="medium">Admin</Text>
                                    </Td>
                                    <Td>
                                        <Text color="green.600" fontWeight="medium">Active</Text>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
        </VStack>
    );
};

export default AdminManagement;