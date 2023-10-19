import CountryData from "./components/CountryData";
import Ip from "./components/Ip";
import Map from "./components/Map";

import { useState, useEffect } from "react";

function App() {
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

  return (
    <>
      {ipData && (
        <>
          <Ip ipData={ipData} ipError={ipError} />

          <CountryData
            code={ipData.location.country}
            region={ipData.location.region}
          />
        </>
      )}
      <Map />
    </>
  );
}

export default App;
