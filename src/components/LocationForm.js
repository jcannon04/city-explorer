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
  // state variables
  const [location, setlocation] = useState("");
  const [apiData, setApiData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  // controlled input change handler
  const handleChange = (e) => {
    setlocation(e.target.value);
  };
  // function to get location data from location IQ
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
      setRequestError(null);
    } catch (error) {
      console.log(error);
      setRequestError(error);
    }
  };

  return (
    // display search box and button
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

      {/* display error message if api resulted in error */}
      {requestError ? (
        <h1 className='text-center mt-5 text-danger'>
          {requestError.message}{" "}
        </h1>
      ) : (
        ""
      )}

      {/* display card if there is data to display */}
      {apiData ? (
        <Row className='d-flex justify-content-center mt-5'>
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
      ) : (
        ""
      )}
    </Row>
  );
}
