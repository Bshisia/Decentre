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
            {/* Animated Background Particles */}
            <Box position="absolute" inset={0} pointerEvents="none">
                {[...Array(25)].map((_, i) => (
                    <Box
                        key={i}
                        position="absolute"
                        w="2px"
                        h="2px"
                        bg="#00d4ff"
                        borderRadius="50%"
                        opacity={0.4}
                        left={`${Math.random() * 100}%`}
                        top={`${Math.random() * 100}%`}
                        animation={`float ${3 + Math.random() * 3}s ease-in-out infinite`}
                        sx={{
                            '@keyframes float': {
                                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                                '50%': { transform: 'translateY(-20px) rotate(180deg)' }
                            }
                        }}
                    />
                ))}
            </Box>
            <Navbar title="Certificate Verification" icon="🔍" showLogin />

            <Container maxW="4xl" py={8}>
                <VStack spacing={8}>
                    {/* Search Section */}
                    <Card w="full" bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="2xl" _hover={{ transform: 'translateY(-5px)', borderColor: 'rgba(0, 212, 255, 0.3)' }} transition="all 0.3s ease">
                        <CardHeader textAlign="center">
                            <Text fontSize="6xl" mb={4}>🎓</Text>
                            <Heading size="xl" color="#00d4ff" mb={2}>Verify Student Certificate</Heading>
                            <Text color="whiteAlpha.800" fontSize="lg">Enter the student ID to verify their certificate authenticity</Text>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={6}>
                                <Input
                                    value={studentId}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentId(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter Student ID"
                                    bg="rgba(255, 255, 255, 0.1)"
                                    border="2px solid rgba(0, 212, 255, 0.2)"
                                    color="white"
                                    _placeholder={{ color: 'whiteAlpha.600' }}
                                    _focus={{ borderColor: '#00d4ff', shadow: '0 0 0 1px #00d4ff' }}
                                    size="lg"
                                    maxW="md"
                                />
                                <Button 
                                    onClick={handleVerify} 
                                    bg="linear-gradient(135deg, #00d4ff, #0099cc)"
                                    color="white"
                                    size="lg"
                                    borderRadius="50px"
                                    isLoading={loading}
                                    loadingText="Verifying..."
                                    px={8}
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)' }}
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
                            bg="rgba(255, 255, 255, 0.05)" 
                            backdropFilter="blur(10px)" 
                            border="2px solid" 
                            borderColor={certificate.isRevoked ? 'rgba(255, 71, 87, 0.5)' : 'rgba(0, 212, 255, 0.5)'}
                            borderRadius="20px"
                            shadow="2xl"
                        >
                            <CardHeader bg={certificate.isRevoked ? 'rgba(255, 71, 87, 0.1)' : 'rgba(0, 212, 255, 0.1)'} borderTopRadius="20px">
                                <HStack justify="space-between" align="center">
                                    <HStack>
                                        <Text fontSize="2xl">
                                            {certificate.isRevoked ? '❌' : '✅'}
                                        </Text>
                                        <Heading size="md" color={certificate.isRevoked ? '#ff4757' : '#00d4ff'}>
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
                                            <Text fontSize="sm" color="whiteAlpha.600" mb={1}>Student Name</Text>
                                            <Text fontSize="lg" fontWeight="bold" color="white">{certificate.studentName}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize="sm" color="whiteAlpha.600" mb={1}>Student ID</Text>
                                            <Text fontSize="lg" fontWeight="bold" color="white">{studentId}</Text>
                                        </Box>
                                    </VStack>
                                    <VStack align="start" spacing={4}>
                                        <Box>
                                            <HStack mb={1}>
                                                <Text>🏢</Text>
                                                <Text fontSize="sm" color="whiteAlpha.600">Institution</Text>
                                            </HStack>
                                            <Text fontSize="lg" fontWeight="bold" color="white">{certificate.institution}</Text>
                                        </Box>
                                        <Box>
                                            <HStack mb={1}>
                                                <Text>📅</Text>
                                                <Text fontSize="sm" color="whiteAlpha.600">Date Issued</Text>
                                            </HStack>
                                            <Text fontSize="lg" fontWeight="bold" color="white">{certificate.dateIssued}</Text>
                                        </Box>
                                    </VStack>
                                </SimpleGrid>
                                <Divider my={4} />
                                <Box>
                                    <Text fontSize="sm" color="whiteAlpha.600" mb={1}>Course/Program</Text>
                                    <Text fontSize="xl" fontWeight="bold" color="#00d4ff">{certificate.course}</Text>
                                </Box>
                                
                                {/* Certificate File Display */}
                                {fullCertificate?.certificateFile && (
                                    <Box mt={6}>
                                        <Divider my={4} />
                                        <Text fontSize="sm" color="whiteAlpha.600" mb={3}>Certificate Document</Text>
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
                        <Card w="full" bg="rgba(255, 255, 255, 0.05)" backdropFilter="blur(10px)" border="1px solid rgba(0, 212, 255, 0.1)" borderRadius="20px" shadow="xl">
                            <CardBody>
                                <VStack spacing={4}>
                                    <Heading size="md" color="#00d4ff">How to Verify</Heading>
                                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
                                        <Box textAlign="center" p={4}>
                                            <Text fontSize="3xl" mb={2}>🎫</Text>
                                            <Text fontWeight="bold" mb={1}>1. Enter Student ID</Text>
                                            <Text fontSize="sm" color="whiteAlpha.700">Input the unique student identifier</Text>
                                        </Box>
                                        <Box textAlign="center" p={4}>
                                            <Text fontSize="3xl" mb={2}>🔍</Text>
                                            <Text fontWeight="bold" mb={1}>2. Click Verify</Text>
                                            <Text fontSize="sm" color="whiteAlpha.700">Search blockchain for certificate</Text>
                                        </Box>
                                        <Box textAlign="center" p={4}>
                                            <Text fontSize="3xl" mb={2}>🎓</Text>
                                            <Text fontWeight="bold" mb={1}>3. View Results</Text>
                                            <Text fontSize="sm" color="whiteAlpha.700">See certificate details instantly</Text>
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