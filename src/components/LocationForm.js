// react imports
import React from "react";
import { useState } from "react";
import Weather from "./Weather";

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
      let displayName = response.data[0].display_name;
      let latitude = response.data[0].lat;
      let longitude = response.data[0].lon;
      let mapImg = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}`;
      let weatherResponse = await getWeatherData(location, longitude, latitude);
      let forecasts = weatherResponse ? weatherResponse.data : undefined;
      setApiData({
        displayName,
        latitude,
        longitude,
        mapImg,
        forecasts,
      });
      setRequestError(null);
    } catch (error) {
      setRequestError(error);
    }
  };
  const getWeatherData = async (searchQuery, lon, lat) => {
    try {
      const response = await axios.get(`http://localhost:8000/weather`, {
        params: {
          searchQuery,
          lon,
          lat,
        },
      });
      return response;
    } catch (error) {
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
            {/* display error message if api resulted in error */}
            <Form.Text muted>
              {requestError ? (
                <p className='text-danger'>{requestError.message} </p>
              ) : (
                ""
              )}
            </Form.Text>
          </Col>

          <Col lg={2}>
            <Button variant='primary' type='submit'>
              Explore!
            </Button>
          </Col>
        </Row>
      </Form>

      {/* display card if there is data to display */}
      {apiData ? (
        <Row className='d-flex justify-content-center mt-5'>
          <Col>
            <Card >
              <Card.Title className='text-center'>
                {apiData.displayName}
              </Card.Title>
              <img src={apiData.mapImg} alt='map' />
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
          </Col>
          {apiData.forecasts ? (
            <Col>
              <Weather forecasts={apiData.forecasts} />
            </Col>
          ) : (
            ""
          )}
        </Row>
      ) : (
        ""
      )}
    </Row>
  );
}
