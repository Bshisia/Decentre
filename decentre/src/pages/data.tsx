import React from 'react';
import { Box, Container, Heading, Text, Button, VStack, Code, Pre } from '@chakra-ui/react';
import Link from 'next/link';

export default function DataPage() {
    const viewInConsole = () => {
        const data = localStorage.getItem('decentre_certificates');
        console.log('=== DECENTRE CERTIFICATE DATA BLOCKS ===');
        console.log('Raw Data:', data);
        console.log('Parsed Data:', JSON.parse(data || '{}'));
        alert('Check browser console (F12) for detailed data blocks!');
    };

    return (
        <Box minH="100vh" bg="linear-gradient(to bottom right, #2d3748, #4a5568)" color="white">
            <Container maxW="4xl" py={20}>
                <VStack spacing={8} textAlign="center">
                    <Heading size="2xl">📊 Certificate Data Blocks</Heading>
                    <Text fontSize="lg" color="gray.300">
                        View raw blockchain-style data storage
                    </Text>
                    
                    <VStack spacing={4}>
                        <Button onClick={viewInConsole} colorScheme="green" size="lg">
                            🔍 View Data in Console
                        </Button>
                        <Text fontSize="sm" color="gray.400">
                            Press F12 to open browser console after clicking
                        </Text>
                    </VStack>

                    <Box bg="gray.800" p={6} borderRadius="md" w="full">
                        <Text fontWeight="bold" mb={3}>Storage Information:</Text>
                        <VStack align="start" spacing={2} fontSize="sm">
                            <Text>📍 <strong>Location:</strong> Browser localStorage</Text>
                            <Text>🔑 <strong>Key:</strong> 'decentre_certificates'</Text>
                            <Text>💾 <strong>Format:</strong> JSON with base64 encoded files</Text>
                            <Text>🔒 <strong>Security:</strong> Client-side storage (demo only)</Text>
                        </VStack>
                    </Box>

                    <Link href="/admin">
                        <Button variant="outline" colorScheme="blue">
                            ← Back to Admin
                        </Button>
                    </Link>
                </VStack>
            </Container>
        </Box>
    );
}