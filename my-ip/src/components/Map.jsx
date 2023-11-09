import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ position }) {
  return (
    <>
      {position && (
        <MapContainer
          id="map"
          className="h-64"
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

export default Map;
