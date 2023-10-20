import React from "react";
import Time from "../components/Time.jsx";
import { useState, useEffect } from "react";

function CountryData({ code, region, ipData }) {
  const [information, setInformation] = useState();
  const [countryError, setCountryError] = useState();

  const url = `https://restcountries.com/v3.1/alpha/${code}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(`Request failed ${res.status} ${res.statusText}`);
        const data = await res.json();
        setInformation(data);
      } catch (error) {
        setCountryError(error);
      }
    }
    fetchData();
  }, [url]);

  if (countryError) {
    return <p>{countryError.message}</p>;
  }

  return (
    <div className="flex flex-col h-full justify-center items-center">
      {information && ipData && ipData.ip && ipData.location.region && (
        <>
          <p className="bg-blue-500 rounded-3xl text-white p-3 m-2">
            Your IP Address is: {ipData && ipData.ip}
          </p>
          <div className="flex flex-row items-center m-2 p-2">
            <img
              className="h-4 w-4 m-2"
              src={information[0].flags.png}
              alt={information[0].flags.alt}
            />
            <h5>
              You are currently located in {ipData.location.region},{" "}
              {information[0].name.common}
            </h5>
          </div>
        </>
      )}

      <Time />
    </div>
  );
}

export default CountryData;
