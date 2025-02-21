import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API'; // Ensure this function exists in API.tsx

const CandidateSearch = () => {
    const [candidate, setCandidate] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCandidate();
    }, []);

    // 🔹 Function to Fetch a New Candidate
    const fetchCandidate = async () => {
        try {
            setLoading(true);
            console.log('Fetching candidate...'); // Debug log ✅

            const data = await searchGithubUser('octocat'); // Using a placeholder username
            console.log('Fetched candidate:', data); // Debug log ✅

            setCandidate(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching candidate:', err);
            setError('Failed to fetch candidate.');
            setLoading(false);
        }
    };

    // ✅ Save Candidate Function
    const saveCandidate = () => {
        if (candidate) {
            console.log('Saving candidate:', candidate); // Debugging log ✅

            // Get existing saved candidates from local storage
            const existingCandidates = JSON.parse(
                localStorage.getItem('savedCandidates') || '[]'
            );

            // Add the new candidate
            const updatedCandidates = [...existingCandidates, candidate];

            // Save back to local storage
            localStorage.setItem(
                'savedCandidates',
                JSON.stringify(updatedCandidates)
            );

            console.log('Updated saved candidates:', updatedCandidates); // Debugging log ✅

            // Move to the next candidate
            fetchCandidate();
        }
    };

    // ❌ Skip Candidate Function
    const skipCandidate = () => {
        console.log('Skipping candidate...'); // Debugging log ✅
        fetchCandidate(); // Fetch a new candidate
    };

    return (
        <div>
            <h1>Candidate Search</h1>
            {loading && <p>Loading candidate...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {candidate && (
                <div>
                    <img src={candidate.avatar_url} alt='Avatar' width={100} />
                    <h2>{candidate.name || 'No Name Available'}</h2>
                    <p>Username: {candidate.login}</p>
                    <p>Location: {candidate.location || 'Not provided'}</p>
                    <p>Company: {candidate.company || 'Not provided'}</p>
                    <p>Email: {candidate.email || 'Not available'}</p>
                    <a
                        href={candidate.html_url}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        View GitHub Profile
                    </a>
                    <div>
                        <button onClick={saveCandidate}>
                            ➕ Save Candidate
                        </button>
                        <button onClick={skipCandidate}>
                            ➖ Skip Candidate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateSearch;
