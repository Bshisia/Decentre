import React, { useState } from 'react';
import { 
    Box, Button, Input, VStack, Alert, AlertIcon, Text, Heading, 
    Container, Card, CardBody, CardHeader, HStack, Badge,
    SimpleGrid, Divider, Image
} from '@chakra-ui/react';
import { certificateStore } from '../utils/certificateStore';
import Navbar from '../app/components/Navbar';

interface CertificateData {
    studentName: string;
    course: string;
    institution: string;
    dateIssued: string;
    isRevoked: boolean;
    photo?: string;
}

const Verify: React.FC = () => {
    const [studentId, setStudentId] = useState('');
    const [certificate, setCertificate] = useState<CertificateData | null>(null);
    const [fullCertificate, setFullCertificate] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleVerify = async () => {
        if (!studentId.trim()) {
            setError('Please enter a student ID');
            return;
        }

        setLoading(true);
        setError('');
        setCertificate(null);
        setSearched(true);

        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Look up certificate in store
            const foundCertificate = certificateStore.verify(studentId);
            
            if (foundCertificate) {
                setCertificate({
                    studentName: foundCertificate.studentName,
                    course: foundCertificate.course,
                    institution: foundCertificate.institution,
                    dateIssued: foundCertificate.dateIssued,
                    isRevoked: foundCertificate.isRevoked,
                    photo: foundCertificate.photo
                });
                setFullCertificate(foundCertificate);
            } else {
                setError('Certificate not found for this Student ID');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleVerify();
        }
    };

    return (
        <Box minH="100vh" bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" position="relative" overflow="hidden">
            <Navbar title="Certificate Verification" icon="🔍" showLogin />

            <Container maxW="4xl" py={8}>
                <VStack spacing={8}>
                    {/* Search Section */}
                    <Card w="full" bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                        <CardHeader textAlign="center">
                            <Text fontSize="6xl" mb={4}>🎓</Text>
                            <Heading size="xl" color="gray.800" mb={2}>Verify Student Certificate</Heading>
                            <Text color="gray.600" fontSize="lg">Enter the student ID to verify their certificate authenticity</Text>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={6}>
                                <Input
                                    value={studentId}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentId(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter Student ID"
                                    bg="white"
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'green.500', boxShadow: '0 0 0 1px #38A169' }}
                                    size="lg"
                                    maxW="md"
                                />
                                <Button 
                                    onClick={handleVerify} 
                                    colorScheme="green" 
                                    size="lg"
                                    isLoading={loading}
                                    loadingText="Verifying..."
                                    px={8}
                                >
                                    🔍 Verify Certificate
                                </Button>
                            </VStack>
                        </CardBody>
                    </Card>

                    {/* Error Message */}
                    {error && (
                        <Alert status="error" borderRadius="lg">
                            <AlertIcon />
                            <Box>
                                <Text fontWeight="bold">Verification Failed</Text>
                                <Text>{error}</Text>
                            </Box>
                        </Alert>
                    )}

                    {/* Certificate Display */}
                    {certificate && (
                        <Card 
                            w="full" 
                            bg="whiteAlpha.950" 
                            backdropFilter="blur(10px)" 
                            border="2px solid" 
                            borderColor={certificate.isRevoked ? 'red.300' : 'green.300'}
                            shadow="2xl"
                        >
                            <CardHeader bg={certificate.isRevoked ? 'red.100' : 'green.100'} borderTopRadius="md">
                                <HStack justify="space-between" align="center">
                                    <HStack>
                                        <Text fontSize="2xl">
                                            {certificate.isRevoked ? '❌' : '✅'}
                                        </Text>
                                        <Heading size="md" color={certificate.isRevoked ? 'red.700' : 'green.700'}>
                                            Certificate {certificate.isRevoked ? 'Revoked' : 'Verified'}
                                        </Heading>
                                    </HStack>
                                    <Badge 
                                        colorScheme={certificate.isRevoked ? 'red' : 'green'} 
                                        fontSize="md" 
                                        px={3} 
                                        py={1}
                                    >
                                        {certificate.isRevoked ? 'REVOKED' : 'VALID'}
                                    </Badge>
                                </HStack>
                            </CardHeader>
                            <CardBody>
                                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                                    <VStack align="center" spacing={4}>
                                        {certificate.photo ? (
                                            <Image 
                                                src={certificate.photo} 
                                                alt={certificate.studentName}
                                                boxSize="120px" 
                                                objectFit="cover" 
                                                borderRadius="md"
                                                border="2px solid"
                                                borderColor="gray.200"
                                            />
                                        ) : (
                                            <Box 
                                                boxSize="120px" 
                                                bg="gray.100" 
                                                borderRadius="md"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Text color="gray.500">No Photo</Text>
                                            </Box>
                                        )}
                                        <Text fontSize="sm" color="gray.500">Student Photo</Text>
                                    </VStack>
                                    <VStack align="start" spacing={4}>
                                        <Box>
                                            <Text fontSize="sm" color="gray.500" mb={1}>Student Name</Text>
                                            <Text fontSize="lg" fontWeight="bold">{certificate.studentName}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize="sm" color="gray.500" mb={1}>Student ID</Text>
                                            <Text fontSize="lg" fontWeight="bold">{studentId}</Text>
                                        </Box>
                                    </VStack>
                                    <VStack align="start" spacing={4}>
                                        <Box>
                                            <HStack mb={1}>
                                                <Text>🏢</Text>
                                                <Text fontSize="sm" color="gray.500">Institution</Text>
                                            </HStack>
                                            <Text fontSize="lg" fontWeight="bold">{certificate.institution}</Text>
                                        </Box>
                                        <Box>
                                            <HStack mb={1}>
                                                <Text>📅</Text>
                                                <Text fontSize="sm" color="gray.500">Date Issued</Text>
                                            </HStack>
                                            <Text fontSize="lg" fontWeight="bold">{certificate.dateIssued}</Text>
                                        </Box>
                                    </VStack>
                                </SimpleGrid>
                                <Divider my={4} />
                                <Box>
                                    <Text fontSize="sm" color="gray.500" mb={1}>Course/Program</Text>
                                    <Text fontSize="xl" fontWeight="bold" color="blue.600">{certificate.course}</Text>
                                </Box>
                                
                                {/* Certificate File Display */}
                                {fullCertificate?.certificateFile && (
                                    <Box mt={6}>
                                        <Divider my={4} />
                                        <Text fontSize="sm" color="gray.500" mb={3}>Certificate Document</Text>
                                        {fullCertificate.certificateFile.type.startsWith('image/') ? (
                                            <Box textAlign="center">
                                                <img 
                                                    src={fullCertificate.certificateFile.data} 
                                                    alt="Certificate" 
                                                    style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '2px solid #e2e8f0' }}
                                                />
                                            </Box>
                                        ) : (
                                            <Box p={4} bg="gray.50" borderRadius="md" textAlign="center">
                                                <Text fontSize="2xl" mb={2}>📄</Text>
                                                <Text fontWeight="bold" mb={2}>{fullCertificate.certificateFile.name}</Text>
                                                <Button 
                                                    as="a" 
                                                    href={fullCertificate.certificateFile.data} 
                                                    download={fullCertificate.certificateFile.name}
                                                    colorScheme="blue" 
                                                    size="sm"
                                                >
                                                    📎 Download PDF
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </CardBody>
                        </Card>
                    )}

                    {/* Instructions */}
                    {!searched && (
                        <Card w="full" bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="xl">
                            <CardBody>
                                <VStack spacing={4}>
                                    <Heading size="md" color="gray.700">How to Verify</Heading>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
                                        <Box textAlign="center" p={4}>
                                            <Text fontSize="3xl" mb={2}>🎫</Text>
                                            <Text fontWeight="bold" mb={1}>1. Enter Student ID</Text>
                                            <Text fontSize="sm" color="gray.600">Input the unique student identifier</Text>
                                        </Box>
                                        <Box textAlign="center" p={4}>
                                            <Text fontSize="3xl" mb={2}>🔍</Text>
                                            <Text fontWeight="bold" mb={1}>2. Click Verify</Text>
                                            <Text fontSize="sm" color="gray.600">Search blockchain for certificate</Text>
                                        </Box>
                                        <Box textAlign="center" p={4}>
                                            <Text fontSize="3xl" mb={2}>🎓</Text>
                                            <Text fontWeight="bold" mb={1}>3. View Results</Text>
                                            <Text fontSize="sm" color="gray.600">See certificate details instantly</Text>
                                        </Box>
                                    </SimpleGrid>
                                </VStack>
                            </CardBody>
                        </Card>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default Verify;