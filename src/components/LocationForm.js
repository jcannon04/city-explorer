// react imports
import React from "react";
import { useState } from "react";
//axios imports
import axios from "axios";

// react-bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/esm/Card";

export default function LocationForm() {
  const [location, setlocation] = useState("");
  const [apiData, setApiData] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);

  const handleChange = (e) => {
    setlocation(e.target.value);
  };

  const getLocationData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}`,
        {
          params: {
            q: location,
            format: "json",
          },
        }
      );
      setApiData({
        displayName: response.data[0].display_name,
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        mapImg: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}`,
      });
      setApiCalled(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Row className='w-100'>
      <Form
        onSubmit={getLocationData}
        className='d-flex justify-content-center'
      >
        <Row className='w-50'>
          <Col>
            <Form.Control
              onChange={handleChange}
              type='text'
              placeholder='Enter Location'
            />
          </Col>
          <Col lg={2}>
            <Button variant='primary' type='submit'>
              Explore!
            </Button>
          </Col>
        </Row>
      </Form>

      {/* conditionally render location data */}
      {apiCalled && apiData && (
        <Row className='d-flex justify-content-center mt-3'>
          <Card className='w-50'>
            <Card.Title className='text-center'>
              {apiData.displayName}
            </Card.Title>
            <img src={apiData.mapImg} alt='map' className='' />
            <Card.Body>
              <ul className='list-group list-group-flush mt-3'>
                <li className='list-group-item'>
                  Latitude: {apiData.latitude}
                </li>
                <li className='list-group-item'>
                  Longitude: {apiData.longitude}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Row>
      )}
    </Row>
  );
}
