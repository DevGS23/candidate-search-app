import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API'; // Ensure this function exists in API.tsx

const CandidateSearch = () => {
    const [candidate, setCandidate] = useSt