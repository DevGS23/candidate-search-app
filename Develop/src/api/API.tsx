export const searchGithubUser = async (username: string) => {
    try {
        console.log('Fetching from GitHub API...'); // Debugging log ✅

        // Read token from .env file
        const token = import.meta.env.VITE_GITHUB_TOKEN;

        // Ensure the token is actually set
        if (!token) {
            console.error('❌ ERROR: GitHub Token is missing from .env!');
            return {};
        }

        console.log('Using GitHub Token:', token); // Debugging log ✅

        const response = await fetch(
            `https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // 🛠️ Using Bearer token
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        // Handle response errors
        if (!response.ok) {
            throw new Error(
                `GitHub API error: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        console.log('✅ GitHub API Response:', data); // Debugging log ✅

        return data;
    } catch (error) {
        console.error('❌ Error fetching GitHub user:', error);
        return {}; // Return empty object to prevent crashes
    }
};

// ✅ Add this to ensure TypeScript treats it as a module
export {};
