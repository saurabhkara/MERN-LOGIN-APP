import { getUser } from "../helper/apiHelper";
import { useState, useEffect } from "react";

function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serveError: null,
  });

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setData((state) => ({ ...state, isLoading: true }));
        const {data, status} = await getUser({ username: query });
        setData((state) => ({ ...state, isLoading: false, apiData: data , status:status}));
      } catch (error) {
        setData((state) => ({ ...state, isLoading: false }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}

export default useFetch;
