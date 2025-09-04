import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text, SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import { certificateStore } from '../../utils/certificateStore';
import { authStore } from '../../utils/authStore';
import AdminManagement from './AdminManagement';
import StudentView from './StudentView';

interface CertificateForm {
    studentId: string;
    studentName: string;
    course: string;
    institution: string;
}

const Dashboard: React.FC = () => {
    const [form, setForm] = useState<CertificateForm>({
        studentId: '',
        studentName: '',
        course: '',
        institution: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<CertificateForm>>({});

    const validateForm = () => {
        const newErrors: Partial<CertificateForm> = {};
        if (!form.studentId.trim()) newErrors.studentId = 'Student ID is required';
        if (!form.studentName.trim()) newErrors.studentName = 'Student name is required';
        if (!form.course.trim()) newErrors.course = 'Course is required';
        if (!form.institution.trim()) newErrors.institution = 'Institution is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        // Check authentication
        if (!authStore.isAuthenticated()) {
            setMessage('Authentication required. Please login again.');
            return;
        }
        
        setLoading(true);
        setMessage('');
        try {
            // Check if certificate already exists
            const existing = certificateStore.verify(form.studentId);
            if (existing) {
                setMessage('Certificate already exists for this Student ID');
                setLoading(false);
                return;
            }
            
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Issue certificate
            certificateStore.issue({
                studentId: form.studentId,
                studentName: form.studentName,
                course: form.course,
                institution: form.institution
            });
            
            setMessage('Certificate issued successfully! 🎉');
            setForm({ studentId: '', studentName: '', course: '', institution: '' });
        } catch (error) {
            setMessage('Failed to issue certificate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const currentAdmin = authStore.getCurrentAdmin();
    const canManageAdmins = authStore.canManageAdmins();

    return (
        <Tabs variant="enclosed" colorScheme="blue">
            <TabList mb={6}>
                <Tab>📜 Issue Certificates</Tab>
                {canManageAdmins ? (
                    <Tab>👥 Manage Admins</Tab>
                ) : (
                    <Tab>👨🎓 View Students</Tab>
                )}
            </TabList>
            
            <TabPanels>
                <TabPanel p={0}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                        {/* Issue Certificate Form */}
                        <Card bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                            <CardHeader>
                                <Heading size="lg" color="blue.600">Issue New Certificate</Heading>
                                <Text color="gray.600" mt={2} fontSize="md">Fill in the student details to create a new certificate</Text>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                                    <FormControl isRequired isInvalid={!!errors.studentId}>
                                        <FormLabel>🎫 Student ID</FormLabel>
                                        <Input
                                            value={form.studentId}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, studentId: e.target.value})}
                                            placeholder="e.g., STU2024001"
                                            bg="white"
                                        />
                                        {errors.studentId && <Text color="red.500" fontSize="sm">{errors.studentId}</Text>}
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.studentName}>
                                        <FormLabel>👨🎓 Student Name</FormLabel>
                                        <Input
                                            value={form.studentName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, studentName: e.target.value})}
                                            placeholder="e.g., John Doe"
                                            bg="white"
                                        />
                                        {errors.studentName && <Text color="red.500" fontSize="sm">{errors.studentName}</Text>}
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.course}>
                                        <FormLabel>🎓 Course/Program</FormLabel>
                                        <Input
                                            value={form.course}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, course: e.target.value})}
                                            placeholder="e.g., Bachelor of Computer Science"
                                            bg="white"
                                        />
                                        {errors.course && <Text color="red.500" fontSize="sm">{errors.course}</Text>}
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.institution}>
                                        <FormLabel>🏢 Institution</FormLabel>
                                        <Input
                                            value={form.institution}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, institution: e.target.value})}
                                            placeholder="e.g., Tech University"
                                            bg="white"
                                        />
                                        {errors.institution && <Text color="red.500" fontSize="sm">{errors.institution}</Text>}
                                    </FormControl>

                                    <Button 
                                        type="submit" 
                                        colorScheme="blue" 
                                        size="lg"
                                        w="full"
                                        isLoading={loading}
                                        loadingText="Issuing Certificate..."
                                    >
                                        Issue Certificate
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

                        {/* Instructions */}
                        <Card bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                            <CardHeader>
                                <Heading size="lg" color="green.600">Instructions</Heading>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={4} align="start">
                                    <Box p={4} bg="blue.50" borderRadius="md" w="full">
                                        <Text fontWeight="bold" color="blue.700" mb={2}>📝 Student ID Format</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Use a unique identifier like STU2024001, REG123456, or any format your institution uses.
                                        </Text>
                                    </Box>
                                    
                                    <Box p={4} bg="green.50" borderRadius="md" w="full">
                                        <Text fontWeight="bold" color="green.700" mb={2}>✅ Certificate Storage</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Once issued, certificates are permanently stored on blockchain and cannot be altered.
                                        </Text>
                                    </Box>
                                    
                                    <Box p={4} bg="orange.50" borderRadius="md" w="full">
                                        <Text fontWeight="bold" color="orange.700" mb={2}>🔍 Verification</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Students can share their Student ID with employers for instant certificate verification.
                                        </Text>
                                    </Box>
                                    
                                    <Box p={4} bg="purple.50" borderRadius="md" w="full">
                                        <Text fontWeight="bold" color="purple.700" mb={2}>🔒 Security</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Only authorized admins can issue certificates. All transactions are recorded on blockchain.
                                        </Text>
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                </TabPanel>
                
                <TabPanel p={0}>
                    {canManageAdmins ? (
                        <AdminManagement />
                    ) : (
                        <StudentView />
                    )}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default Dashboard;