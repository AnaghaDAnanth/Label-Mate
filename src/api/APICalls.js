const token = import.meta.env.VITE_GITHUB_PAT

async function fetchLabels(org, repo) {
    const urlFetchLabelsForRepo = import.meta.env.VITE_GITHUB_URL_BEG + org + "/" + repo + import.meta.env.VITE_GITHUB_URL_END;
    // Get API response
    const response = await fetch(urlFetchLabelsForRepo, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
        }
    })

    // Extract the needed response
    if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to fetch labels: ${response.statusText}`);
      }
    const data = await response.json();
    console.log('Fetched labels:', data);
    return data;
}

export default fetchLabels;