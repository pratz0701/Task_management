import { useState, useCallback } from 'react';

const useCrudOperations = ({ url, method}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = useCallback(async (requestData) => {
    const body = requestData?.requestData;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json' ,
        },
        body: body ? JSON.stringify(body) : null,
        // credentials:'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  return [data, loading, error, executeRequest];
};

export default useCrudOperations;
