
import fetchLabels from '../api/APICalls.js'
import { useEffect, useState, useCallback } from 'react';

const Labels = () => {
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);
  const [browserUrl, setBrowserUrl] = useState('');

  const getLabels = useCallback(async () => {
    try {
      const data = await fetchLabels();
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
        if (tab && tab.url) {
          setBrowserUrl(tab.url);
          getLabels();
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
      <h1> {browserUrl} </h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {labels.map(label => (
          <li key={label.id}>
            <span>
              {label.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Labels;