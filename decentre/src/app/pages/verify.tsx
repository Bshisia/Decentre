import React, { useState } from 'react';
import { Box, Button, Input, VStack, Alert, AlertIcon, Text, Heading } from '@chakra-ui/react';

interface CertificateData {
    studentName: string;
    course: string;
    institution: string;
    dateIssued: string;
    isRevoked: boolean;
}

const Verify: React.FC = () => {
    const [studentId, setStudentId] = useState('');
    const [certificate, setCertificate] = useState<CertificateData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!studentId.trim()) {
            setError('Please enter a student ID');
            return;
        }

        setLoading(true);
        setError('');
        setCertificate(null);

        try {
            // TODO: Integrate with blockchain contract
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock data for demonstration
            setCertificate({
                studentName: 'John Doe',
                course: 'Computer Science',
                institution: 'Tech University',
                dateIssued: new Date().toLocaleDateString(),
                isRevoked: false
            });
        } catch (err) {
            setError('Certificate not found or verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={8}>
            <Heading mb={6}>Verify Certificate</Heading>
            <VStack spacing={4}>
                <Input
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter Student ID"
                    size="lg"
                />
                <Button 
                    onClick={handleVerify} 
                    colorScheme="blue" 
                    isLoading={loading}
                    size="lg"
                >
                    Verify Certificate
                </Button>
                
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                
                {certificate && (
                    <Alert status={certificate.isRevoked ? 'warning' : 'success'}>
                        <AlertIcon />
                        <Box>
                            <Text><strong>Student:</strong> {certificate.studentName}</Text>
                            <Text><strong>Course:</strong> {certificate.course}</Text>
                            <Text><strong>Institution:</strong> {certificate.institution}</Text>
                            <Text><strong>Date Issued:</strong> {certificate.dateIssued}</Text>
                            <Text><strong>Status:</strong> {certificate.isRevoked ? 'REVOKED' : 'VALID'}</Text>
                        </Box>
                    </Alert>
                )}
            </VStack>
        </Box>
    );
};

export default Verify;