import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text
} from '@chakra-ui/react';
import { authStore } from '../../utils/authStore';

const PasswordChange: React.FC = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
            setMessage('All fields are required');
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            setMessage('New passwords do not match');
            return;
        }

        if (form.newPassword.length < 6) {
            setMessage('New password must be at least 6 characters');
            return;
        }
        
        setLoading(true);
        setMessage('');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const success = authStore.changePassword(form.currentPassword, form.newPassword);
            
            if (success) {
                setMessage('Password changed successfully! 🎉');
                setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setMessage('Current password is incorrect');
            }
        } catch (error) {
            setMessage('Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="2xl" maxW="md" mx="auto">
            <CardHeader>
                <Heading size="lg" color="#00d4ff">Change Password</Heading>
                <Text color="whiteAlpha.800" mt={2}>Update your account password</Text>
            </CardHeader>
            <CardBody>
                <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel color="white">🔒 Current Password</FormLabel>
                        <Input
                            type="password"
                            value={form.currentPassword}
                            onChange={(e) => setForm({...form, currentPassword: e.target.value})}
                            placeholder="Enter current password"
                            bg="rgba(255, 255, 255, 0.1)"
                            border="2px solid rgba(0, 212, 255, 0.2)"
                            color="white"
                            _placeholder={{ color: 'whiteAlpha.600' }}
                            _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color="white">🔑 New Password</FormLabel>
                        <Input
                            type="password"
                            value={form.newPassword}
                            onChange={(e) => setForm({...form, newPassword: e.target.value})}
                            placeholder="Enter new password (min 6 chars)"
                            bg="rgba(255, 255, 255, 0.1)"
                            border="2px solid rgba(0, 212, 255, 0.2)"
                            color="white"
                            _placeholder={{ color: 'whiteAlpha.600' }}
                            _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color="white">✅ Confirm New Password</FormLabel>
                        <Input
                            type="password"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                            placeholder="Confirm new password"
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
                        loadingText="Changing Password..."
                        _hover={{ transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)' }}
                    >
                        Change Password
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
    );
};

export default PasswordChange;