import React from 'react';

interface CertificateDetails {
    id: string;
    issuedTo: string;
    issuedBy: string;
    dateIssued: string;
    status: string;
}

const Certificate: React.FC<{ certificateId: string }> = ({ certificateId }) => {
    const [certificateDetails, setCertificateDetails] = React.useState<CertificateDetails | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const fetchCertificateDetails = React.useCallback(async () => {
        if (!certificateId) return;
        
        setLoading(true);
        setError(null);
        try {
            // Logic to interact with blockchain and fetch details
            // Placeholder implementation
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCertificateDetails({
                id: certificateId,
                issuedTo: 'Sample User',
                issuedBy: 'Sample Institution',
                dateIssued: new Date().toLocaleDateString(),
                status: 'Valid'
            });
        } catch (err) {
            setError('Failed to fetch certificate details');
        } finally {
            setLoading(false);
        }
    }, [certificateId]);

    React.useEffect(() => {
        fetchCertificateDetails();
    }, [fetchCertificateDetails]);

    if (loading) return <p>Loading certificate details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Certificate Details</h2>
            {certificateDetails ? (
                <div>
                    <p>Certificate ID: {certificateDetails.id}</p>
                    <p>Issued To: {certificateDetails.issuedTo}</p>
                    <p>Issued By: {certificateDetails.issuedBy}</p>
                    <p>Date Issued: {certificateDetails.dateIssued}</p>
                    <p>Status: {certificateDetails.status}</p>
                </div>
            ) : (
                <p>No certificate found</p>
            )}
        </div>
    );
};

export default Certificate;