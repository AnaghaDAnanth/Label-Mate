import { useEffect, useState, useCallback } from 'react';
import fetchLabels from '../api/APICalls.js'

function LabelDropdown() {
    
    const[isDropdownOpen, setDropdownState] = useState(false);
    // const labels = ["bug", "enhancement", "question", "help wanted"];
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
        <div className="pt-4.5 ">
            {error && <p>{error}</p>}
            <button id="selectLabel" 
                    onClick={() => setDropdownState(!isDropdownOpen)} 
                    className="pl-1.5 pr-1.5 w-[290px] h-[35px] flex border border-gray-300 rounded-md items-center
                               justify-center"> 
                Select Labels to Highlight
            </button>
            {isDropdownOpen &&
                <div className="mt-2 text-sm">
                    {labels.map((label) => (
                        <div key={label.id} className="flex items-center">
                            <input type="checkbox" className="mr-2"/>
                            <div>
                                {label.name}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default LabelDropdown;