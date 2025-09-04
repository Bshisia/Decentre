import React, { useState, useEffect } from 'react';
import { 
    Card, CardBody, CardHeader, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Badge, VStack, Button, HStack, Image, Avatar
} from '@chakra-ui/react';
import { certificateStore } from '../../utils/certificateStore';
import { authStore } from '../../utils/authStore';

const StudentView: React.FC = () => {
    const [students, setStudents] = useState<any[]>([]);
    const currentAdmin = authStore.getCurrentAdmin();

    const refreshStudents = () => {
        if (currentAdmin?.institution) {
            const institutionStudents = certificateStore.getByInstitution(currentAdmin.institution);
            setStudents(institutionStudents);
        }
    };

    useEffect(() => {
        refreshStudents();
    }, [currentAdmin]);

    return (
        <VStack spacing={6} align="stretch">
            <Card bg="whiteAlpha.900" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.300" shadow="2xl">
                <CardHeader>
                    <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={1}>
                            <Heading size="lg" color="blue.600">Students from {currentAdmin?.institution}</Heading>
                            <Text color="gray.600" fontSize="md">View all students with certificates from your institution</Text>
                        </VStack>
                        <Button onClick={refreshStudents} colorScheme="blue" size="sm">
                            🔄 Refresh
                        </Button>
                    </HStack>
                </CardHeader>
                <CardBody>
                    {students.length === 0 ? (
                        <Text color="gray.500" textAlign="center" py={8}>
                            No students found with certificates from your institution.
                        </Text>
                    ) : (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Photo</Th>
                                    <Th>Student ID</Th>
                                    <Th>Student Name</Th>
                                    <Th>Course</Th>
                                    <Th>Date Issued</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {students.map((student, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            {student.photo ? (
                                                <Image 
                                                    src={student.photo} 
                                                    alt={student.studentName}
                                                    boxSize="40px" 
                                                    objectFit="cover" 
                                                    borderRadius="full"
                                                />
                                            ) : (
                                                <Avatar size="sm" name={student.studentName} />
                                            )}
                                        </Td>
                                        <Td fontWeight="medium">{student.studentId}</Td>
                                        <Td>{student.studentName}</Td>
                                        <Td>{student.course}</Td>
                                        <Td>{student.dateIssued}</Td>
                                        <Td>
                                            <Badge colorScheme={student.isRevoked ? 'red' : 'green'}>
                                                {student.isRevoked ? 'Revoked' : 'Valid'}
                                            </Badge>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </CardBody>
            </Card>
        </VStack>
    );
};

export default StudentView;