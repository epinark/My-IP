import Map from "./components/Map.jsx";
import CountryData from "./components/CountryData.jsx";
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
  if (ipError) {
    return <p>Something went wrong {ipError.message}</p>;
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-custom w-full p-4 md:w-3/4 m-3 ">
        <div className="flex flex-wrap">
          <div className="w-full h-full  md:w-1/2">
            <Map />
          </div>

          <div className="w-full md:w-1/2 p-2">
            {ipData && (
              <CountryData
                ipData={ipData}
                ipError={ipError}
                code={ipData.location.country}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
