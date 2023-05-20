import Card from "react-bootstrap/Card";

function LocationData({ apiData }) {
  return (
    <Card>
      <Card.Title className='text-center'>{apiData.displayName}</Card.Title>
      <img src={apiData.mapImg} alt='map' />
      <Card.Body>
        <ul className='list-group list-group-flush mt-3'>
          <li className='list-group-item'>Latitude: {apiData.latitude}</li>
          <li className='list-group-item'>Longitude: {apiData.longitude}</li>
        </ul>
      </Card.Body>
    </Card>
  );
}

export default LocationData;
