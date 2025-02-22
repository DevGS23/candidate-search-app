import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API'; // Ensure this function exists

const CandidateSearch = () => {
    const [candidate, setCandidate] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCandidate();
    }, []);

    const fetchCandidate = async () => {
        try {
            setLoading(true);
            console.log('Fetching new candidate...'); // Debugging log ✅

            const data = await searchGithubUser('octocat'); // Using a placeholder username
            console.log('Fetched candidate:', data); // Debugging log ✅

            if (!data || Object.keys(data).length === 0) {
                throw new Error('GitHub API returned an empty object.');
            }

            setCandidate(data);
            setLoading(false);
        } catch (err) {
            console.error('❌ Error fetching candidate:', err);
            setError('Failed to fetch candidate.');
            setLoading(false);
        }
    };

    const saveCandidate = () => {
        if (!candidate || Object.keys(candidate).length === 0) {
            console.warn('❌ No valid candidate to save.');
            return;
        }

        console.log('Saving candidate:', candidate); // Debugging log ✅

        const candidateData = {
            login: candidate.login,
            name: candidate.name || 'No Name Available',
            avatar_url: candidate.avatar_url,
            html_url: candidate.html_url,
            location: candidate.location || 'Not provided',
            company: candidate.company || 'Not provided',
            email: candidate.email || 'Not available',
        };

        const existingCandidates = JSON.parse(
            localStorage.getItem('savedCandidates') || '[]'
        );
        const updatedCandidates = [...existingCandidates, candidateData];
        localStorage.setItem(
            'savedCandidates',
            JSON.stringify(updatedCandidates)
        );

        console.log('✅ Updated saved candidates:', updatedCandidates);
        fetchCandidate();
    };

    const skipCandidate = () => {
        console.log('❌ Skipping candidate...');
        fetchCandidate();
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
