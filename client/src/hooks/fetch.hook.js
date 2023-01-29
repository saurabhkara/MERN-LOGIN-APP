import { getUser, getUserName } from "../helper/apiHelper";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/store";
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

function useFetch() {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serveError: null,
  });
  const username = useAuthStore((state) => state.auth.username);
  useEffect(() => {
    // if (!query) return;
    let userD;
    if (!username) {
      userD = getUserName();
    }
    const fetchData = async () => {
      try {
        setData((state) => ({ ...state, isLoading: true }));
        const { data, status } = username
          ? await getUser({ username: username })
          : await getUser({ username: userD.username });
        setData((state) => ({
          ...state,
          isLoading: false,
          apiData: data,
          status: status,
        }));
      } catch (error) {
        setData((state) => ({ ...state, isLoading: false, serveError: error }));
      }
    };
    fetchData();
  }, [username]);

  return [getData, setData];
}

export default useFetch;
