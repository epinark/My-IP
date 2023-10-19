import { useState, useEffect } from "react";

function Ip() {
  const [ipData, setIpData] = useState();
  const [ipError, setIpError] = useState();

  const apiKey = import.meta.env.VITE_IPIFY_KEY;

  const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(`Request failed ${res.status} ${res.statusText}`);
        const data = await res.json();
        setIpData(data);
      } catch (error) {
        setIpError(error);
      }
    }
    fetchData();
  }, [url]);
  return <div>{ipData && ipData.ip}</div>;
}

export default Ip;
