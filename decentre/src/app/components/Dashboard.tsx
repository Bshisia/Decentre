import React, { useState } from 'react';
import { 
    Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon, 
    Card, CardBody, CardHeader, Heading, Text, SimpleGrid, Tabs, TabList, TabPanels, Tab, TabPanel,
    Image, Center
} from '@chakra-ui/react';
import { certificateStore } from '../../utils/certificateStore';
import { authStore } from '../../utils/authStore';
import AdminManagement from './AdminManagement';
import StudentView from './StudentView';
import UniversityManagement from './UniversityManagement';
import PasswordChange from './PasswordChange';


interface CertificateForm {
    studentId: string;
    studentName: string;
    course: string;
    institution: string;
    photo?: string;
    certificateFile?: File;
}

const Dashboard: React.FC = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [form, setForm] = useState<CertificateForm>({
        studentId: '',
        studentName: '',
        course: '',
        institution: '',
        photo: ''
    });
    const [filePreview, setFilePreview] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<CertificateForm>>({});

    const validateForm = () => {
        const newErrors: Partial<CertificateForm> = {};
        if (!form.studentId.trim()) newErrors.studentId = 'Student ID is required';
        if (!form.studentName.trim()) newErrors.studentName = 'Student name is required';
        if (!form.course.trim()) newErrors.course = 'Course is required';
        if (!currentAdmin?.institution && !form.institution.trim()) newErrors.institution = 'Institution is required';
        
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
            
            // Get institution name from current user or form
            const institutionName = currentAdmin?.institution || form.institution;
            
            // Prepare certificate data with file
            let certificateData: any = {
                studentId: form.studentId,
                studentName: form.studentName,
                course: form.course,
                institution: institutionName,
                photo: form.photo
            };

            // Add file data if present
            if (form.certificateFile) {
                const fileData = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(form.certificateFile!);
                });

                certificateData.certificateFile = {
                    name: form.certificateFile.name,
                    type: form.certificateFile.type,
                    data: fileData,
                    size: form.certificateFile.size
                };
            }
            
            // Issue certificate
            certificateStore.issue(certificateData);
            
            setMessage('Certificate issued successfully!');
            setForm({ studentId: '', studentName: '', course: '', institution: '', photo: '' });
            setFilePreview('');
            setRefreshKey(prev => prev + 1); // Trigger refresh
        } catch (error) {
            setMessage('Failed to issue certificate. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const currentAdmin = authStore.getCurrentAdmin();
    const canManageAdmins = authStore.canManageAdmins();

    return (
        <Box position="relative">
            {/* Animated Background Particles */}
            <Box position="absolute" inset={0} pointerEvents="none" zIndex={0}>
                {[...Array(15)].map((_, i) => (
                    <Box
                        key={i}
                        position="absolute"
                        w="2px"
                        h="2px"
                        bg="#00d4ff"
                        borderRadius="50%"
                        opacity={0.3}
                        left={`${Math.random() * 100}%`}
                        top={`${Math.random() * 100}%`}
                        animation={`float ${4 + Math.random() * 2}s ease-in-out infinite`}
                        sx={{
                            '@keyframes float': {
                                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                                '50%': { transform: 'translateY(-15px) rotate(180deg)' }
                            }
                        }}
                    />
                ))}
            </Box>
            
        <Tabs variant="enclosed" colorScheme="blue" position="relative" zIndex={1}>
            <TabList mb={6} bg="rgba(255, 255, 255, 0.05)" borderRadius="xl" p={2} border="1px solid rgba(0, 212, 255, 0.1)">
                {!canManageAdmins && <Tab color="white" _selected={{ color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', borderColor: '#00d4ff' }} borderRadius="lg">📜 Issue Certificates</Tab>}
                {canManageAdmins ? (
                    <>
                        <Tab color="white" _selected={{ color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', borderColor: '#00d4ff' }} borderRadius="lg">👥 Manage Admins</Tab>
                        <Tab color="white" _selected={{ color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', borderColor: '#00d4ff' }} borderRadius="lg">🏢 Manage Universities</Tab>
                    </>
                ) : (
                    <Tab color="white" _selected={{ color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', borderColor: '#00d4ff' }} borderRadius="lg">👨🎓 View Students</Tab>
                )}
                <Tab color="white" _selected={{ color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.1)', borderColor: '#00d4ff' }} borderRadius="lg">🔑 Change Password</Tab>

            </TabList>
            
            <TabPanels>
                {!canManageAdmins && (
                    <TabPanel p={0}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
                        {/* Issue Certificate Form */}
                        <Card bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="2xl" _hover={{ transform: 'translateY(-5px)', borderColor: 'rgba(0, 212, 255, 0.3)' }} transition="all 0.3s ease">
                            <CardHeader>
                                <Heading size="lg" color="#00d4ff">Issue New Certificate</Heading>
                                <Text color="whiteAlpha.800" mt={2} fontSize="md">Fill in the student details to create a new certificate</Text>
                            </CardHeader>
                            <CardBody>
                                <VStack spacing={6} as="form" onSubmit={handleSubmit}>
                                    <FormControl isRequired isInvalid={!!errors.studentId}>
                                        <FormLabel color="white">🎫 Student ID</FormLabel>
                                        <Input
                                            value={form.studentId}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, studentId: e.target.value})}
                                            placeholder="e.g., STU2024001"
                                            bg="rgba(255, 255, 255, 0.1)"
                                            border="2px solid rgba(0, 212, 255, 0.2)"
                                            color="white"
                                            _placeholder={{ color: 'whiteAlpha.600' }}
                                            _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                                        />
                                        {errors.studentId && <Text color="red.500" fontSize="sm">{errors.studentId}</Text>}
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.studentName}>
                                        <FormLabel color="white">👨🎓 Student Name</FormLabel>
                                        <Input
                                            value={form.studentName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, studentName: e.target.value})}
                                            placeholder="e.g., John Doe"
                                            bg="rgba(255, 255, 255, 0.1)"
                                            border="2px solid rgba(0, 212, 255, 0.2)"
                                            color="white"
                                            _placeholder={{ color: 'whiteAlpha.600' }}
                                            _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                                        />
                                        {errors.studentName && <Text color="red.500" fontSize="sm">{errors.studentName}</Text>}
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.course}>
                                        <FormLabel color="white">🎓 Course/Program</FormLabel>
                                        <Input
                                            value={form.course}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, course: e.target.value})}
                                            placeholder="e.g., Bachelor of Computer Science"
                                            bg="rgba(255, 255, 255, 0.1)"
                                            border="2px solid rgba(0, 212, 255, 0.2)"
                                            color="white"
                                            _placeholder={{ color: 'whiteAlpha.600' }}
                                            _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                                        />
                                        {errors.course && <Text color="red.500" fontSize="sm">{errors.course}</Text>}
                                    </FormControl>

                                    {!currentAdmin?.institution && (
                                        <FormControl isRequired isInvalid={!!errors.institution}>
                                            <FormLabel>🏢 Institution</FormLabel>
                                            <Input
                                                value={form.institution}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, institution: e.target.value})}
                                                placeholder="e.g., Tech University"
                                                bg="rgba(255, 255, 255, 0.1)"
                                                border="2px solid rgba(0, 212, 255, 0.2)"
                                                color="white"
                                                _placeholder={{ color: 'whiteAlpha.600' }}
                                                _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                                            />
                                            {errors.institution && <Text color="red.500" fontSize="sm">{errors.institution}</Text>}
                                        </FormControl>
                                    )}
                                    {currentAdmin?.institution && (
                                        <FormControl>
                                            <FormLabel>🏢 Institution</FormLabel>
                                            <Input
                                                value={currentAdmin.institution}
                                                isReadOnly
                                                bg="gray.100"
                                                color="gray.600"
                                            />
                                        </FormControl>
                                    )}

                                    <FormControl>
                                        <FormLabel color="white">📷 Student Passport Photo</FormLabel>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        setForm({...form, photo: event.target?.result as string});
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            bg="rgba(255, 255, 255, 0.1)"
                                            border="2px solid rgba(0, 212, 255, 0.2)"
                                            color="white"
                                            _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                                        />
                                        {form.photo && (
                                            <Center mt={4}>
                                                <Image 
                                                    src={form.photo} 
                                                    alt="Student Photo" 
                                                    boxSize="100px" 
                                                    objectFit="cover" 
                                                    borderRadius="md"
                                                    border="2px solid"
                                                    borderColor="gray.200"
                                                />
                                            </Center>
                                        )}
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel color="white">📄 Certificate File (PDF/Image)</FormLabel>
                                        <Input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setForm({...form, certificateFile: file});
                                                    
                                                    // Create preview for images
                                                    if (file.type.startsWith('image/')) {
                                                        const reader = new FileReader();
                                                        reader.onload = (event) => {
                                                            setFilePreview(event.target?.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    } else {
                                                        setFilePreview('');
                                                    }
                                                }
                                            }}
                                            bg="rgba(255, 255, 255, 0.1)"
                                            border="2px solid rgba(0, 212, 255, 0.2)"
                                            color="white"
                                            _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                                        />
                                        {form.certificateFile && (
                                            <Box mt={3} p={3} bg="gray.50" borderRadius="md">
                                                <Text fontSize="sm" color="gray.600">
                                                    📁 {form.certificateFile.name} ({(form.certificateFile.size / 1024).toFixed(1)} KB)
                                                </Text>
                                            </Box>
                                        )}
                                        {filePreview && (
                                            <Center mt={4}>
                                                <Image 
                                                    src={filePreview} 
                                                    alt="Preview" 
                                                    maxH="200px" 
                                                    objectFit="contain" 
                                                    borderRadius="md"
                                                    border="2px solid"
                                                    borderColor="gray.200"
                                                />
                                            </Center>
                                        )}
                                    </FormControl>

                                    <Button 
                                        type="submit" 
                                        bg="linear-gradient(135deg, #00d4ff, #0099cc)"
                                        color="white"
                                        size="lg"
                                        w="full"
                                        borderRadius="50px"
                                        isLoading={loading}
                                        loadingText="Issuing Certificate..."
                                        _hover={{ transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)' }}
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
                        <Card bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="2xl" _hover={{ transform: 'translateY(-5px)', borderColor: 'rgba(0, 212, 255, 0.3)' }} transition="all 0.3s ease">
                            <CardHeader>
                                <Heading size="lg" color="#00d4ff">Instructions</Heading>
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
                )}
                
                <TabPanel p={0}>
                    {canManageAdmins ? (
                        <AdminManagement />
                    ) : (
                        <StudentView key={refreshKey} />
                    )}
                </TabPanel>
                
                {canManageAdmins && (
                    <TabPanel p={0}>
                        <UniversityManagement />
                    </TabPanel>
                )}
                
                <TabPanel p={0}>
                    <PasswordChange />
                </TabPanel>

            </TabPanels>
        </Tabs>
        </Box>
    );
};

export default Dashboard;