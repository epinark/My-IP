function Ip({ ipError, ipData }) {
  if (ipError) {
    return <p>Something went wrong {ipError.message}</p>;
  }

  return <div></div>;
}

export default Ip;
