import { useState, useCallback } from 'react';
import { API_URLS } from '../CRUDoperations/constants';

const useCrudOperations = ({ url, method, skipAccessToken }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to refresh access token
  const refreshAccessToken = async () => {
    const response = await fetch(API_URLS.refreshToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expiresInMins: 30,
      }),
      credentials: 'include', // This is necessary to include the refresh token in the request
    });

    const data = await response.json();
    return data;
  };

  // Function to execute the request
  const executeRequest = useCallback(
    async ({ requestData }) => {
      const body = requestData;
      setLoading(true);
      setError(null);
      let headers = {
        'Content-Type': 'application/json',
      };

      // Conditionally set credentials based on skipAccessToken
      const fetchOptions = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      };

      if (!skipAccessToken) {
        // If skipAccessToken is false, include credentials
        fetchOptions.credentials = 'include';
      }

      console.log("fetchiptions are",fetchOptions)

      try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          if (response.status === 401) {
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
              // Retry request with new access token
              headers = {
                'Authorization': `Bearer ${newAccessToken.accessToken}`,
              };

              const retryResponse = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
              });

              if (retryResponse.ok) {
                const retryResult = await retryResponse.json();
                setData(retryResult);
                return;
              }
            }

            alert('Session expired. Please log in again.');
            window.location.href = '/login';
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [skipAccessToken, url, method]
  );

  return [data, loading, error, executeRequest];
};

export default useCrudOperations;
