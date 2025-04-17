
import fetchLabels from '../api/APICalls.js'
import { useEffect, useState, useCallback } from 'react';

const Labels = () => {
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);
  const [browserUrl, setBrowserUrl] = useState('');

  const getLabels = useCallback(async (org, repo) => {
    try {
      const data = await fetchLabels(org, repo);
      setLabels(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    // Get URL of active tab
    const getTabUrl = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.url && tab.url.startsWith("https://github.com/") && tab.url.endsWith("/issues")) {
          setBrowserUrl(tab.url);
          const urlParts = tab.url.split("/");
          const org = urlParts[3];
          const repo = urlParts[4];
          
          getLabels(org, repo);
        }
        else {
          setError("Open a GitHub Issues link to activate me 😄");
        }
      });
    };

    // Listen for visibility change and update the URL
    // Every time tab switches, a new URL is fetched
    const handleVisibilityChange = () => {
      console.log('Visibility changed:', document.visibilityState);
      if (document.visibilityState === 'visible') {
        getTabUrl();
      }
    };

    // Entry point for useEffect on mount
    document.addEventListener('visibilitychange', handleVisibilityChange);
    getTabUrl();
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      {/* <h1> {browserUrl} </h1> */}
      {error && <p>{error}</p>}
      <ul>
        {labels.map(label => (
          <li key={label.id}>
            <span className='bg-amber-50 rounded-full text-xs'>
              {label.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Labels;