import Map from "./components/Map.jsx";
import CountryData from "./components/CountryData.jsx";
import Loading from "./components/Loading.jsx";
import { useState, useEffect } from "react";

function App() {
  const [ipData, setIpData] = useState();
  const [ipError, setIpError] = useState();
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState();
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);

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
        setLoading(false);
      } catch (error) {
        setIpError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  if (ipError) {
    return <p>Something went wrong {ipError.message}</p>;
  }
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
          const city = data.address.town;
          const country = data.address.country;
          const countryCode = data.address.country_code;
          setCity(city);
          setCountry(country);
          setCountryCode(countryCode);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching city:", error);
          setLoading(false);
        });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-custom w-full p-4 md:w-3/4 m-3 ">
        <div className="flex flex-wrap">
          <div className="w-full h-full  md:w-1/2">
            {loading && <Loading />}
            {ipData && position && <Map position={position} />}
          </div>
          <div className="w-full md:w-1/2 p-2">
            {ipData !== null &&
              countryCode &&
              city !== null &&
              position &&
              !loading && (
                <CountryData
                  ipData={ipData}
                  ipError={ipError}
                  countryCode={countryCode}
                  city={city}
                  position={position}
                />
              )}
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
