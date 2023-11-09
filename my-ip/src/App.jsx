import Map from "./components/Map.jsx";
import CountryData from "./components/CountryData.jsx";
import { useState, useEffect } from "react";
import Loading from "./components/Loading.jsx";

function App() {
  const [position, setPosition] = useState();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      setPosition([pos.coords.latitude, pos.coords.longitude]);

      const baseUrl = "https://nominatim.openstreetmap.org/reverse?format=json";

      fetch(`${baseUrl}&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
        .then((response) => response.json())
        .then((data) => {
          const city = data.address.city;
          setCity(city);
        })
        .catch((error) => {
          console.error("Error fetching city:", error);
        });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const [ipData, setIpData] = useState();
  const [ipError, setIpError] = useState();
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_IPIFY_KEY;

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(`Request failed ${res.status} ${res.statusText}`);
        const data = await res.json();
        setIpData(data);
        setLoading(false);
      } catch (error) {
        setIpError(error);
      }
    }
    fetchData();
  }, [url]);
  if (ipError) {
    return <p>Something went wrong {ipError.message}</p>;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-custom w-full p-4 md:w-3/4 m-3 ">
        <div className="flex flex-wrap">
          <div className="w-full h-full  md:w-1/2">
            {ipData && position && <Map position={position} />}
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full md:w-1/2 p-2">
              {ipData && (
                <CountryData
                  ipData={ipData}
                  ipError={ipError}
                  code={ipData.location.country}
                  city={city}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
