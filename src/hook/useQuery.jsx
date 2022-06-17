import { useState, useEffect } from "react";
import API from "../services/api";
import { ApiError } from "../services/error";



/**
 * Хук для сетевых запросов
 * @param {function} queryMethod - метод сетевого запроса. fetch или любой другой
 * @param {string} url - адрес запроса 
 * @returns {Object} - isLoading - состояние загрузки. response - данные ответа. error - ошибка. abort - функция сброса запроса.
 */
function useQuery(queryMethod, url) {
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    let abort;

    useEffect(() => {
      const abortController = new AbortController();
      const {signal} = abortController;
      abort = abortController.abort.bind(abortController);

      const query = async () => {
        try {
          const response = await queryMethod(url, signal);

          if (response.status === 401) {
            const result = await API.refreshToken();

            if (result.ok) {
              query();
              return;
            } else {
              throw result.error;
            }
          }

          if (!response.ok) {
            throw new ApiError(response.status, 'Spotify api error');
          }

          const json = await response.json();

          setResponse(json);
          setIsLoading(false);

        } catch (error) {
          
          // console.log(error);
          setError(error);
          setIsLoading(false)
        }
      };
      query();

      return () => {
        abort();
        setIsLoading(false);
      }
    }, [url]);
  
    return { isLoading, response, error, abort };
  }

  export default useQuery;