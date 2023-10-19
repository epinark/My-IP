import React from "react";
// import Time from "../components/Time.jsx";
import { useState, useEffect } from "react";

function CountryData({ code, region, ipError, ipData }) {
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
    <div>
      {information && (
        <>
          <img src={information[0].flags.png} alt={information[0].flags.alt} />
          <h5>
            You are currently located in {region}, {information[0].name.common}
          </h5>
        </>
      )}
      <p>Your IP Address is: {ipData && ipData.ip}</p>

      {/* <Time /> */}
    </div>
  );
}

export default CountryData;
