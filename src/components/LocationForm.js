// react imports
import React from "react";
import { useState } from "react";
import Weather from "./Weather";
import Movies from "./Movies";
import LocationData from "./LocationData";

// axios import
import axios from "axios";

// react-bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LocationForm() {
  // state variables
  const [location, setlocation] = useState("");
  const [apiData, setApiData] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // function to handle change in search box
  const handleChange = (e) => {
    setlocation(e.target.value);
  };

  //  function to get data from apis
  const getPageData = async (e) => {
    e.preventDefault();
    try {
      let response = await getLocationData();
      let weatherResponse = await getWeatherData(location, response.data[0].lon, response.data[0].lat);
      let movieResponse = await getMovieData(location);
  
      const responseData = {
        displayName: response.data[0].display_name,
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        mapImg: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}`,
        forecasts: weatherResponse ? weatherResponse.data : undefined,
        movies: movieResponse ? movieResponse.data : undefined,
      };
  
      setApiData(responseData);
      setRequestError(null);
      
    } catch (error) {
      setRequestError(error);
    }
  };

  // function to get location data from api
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
      return response;
    } catch (error) {
      setRequestError(error);
    }
  };

  // function to get weather data from api
  const getWeatherData = async (searchQuery, lon, lat) => {
    try {
      const response = await axios.get(
        `https://city-explorer-api-drec.onrender.com/weather`,
        {
          params: {
            searchQuery,
            lon,
            lat,
          },
        }
      );
      return response;
    } catch (error) {
      setRequestError(error);
    }
  };

  // function to get movie data from api
  const getMovieData = async (searchQuery) => {
    try {
      const response = await axios.get(
        `https://city-explorer-api-drec.onrender.com/movies`,
        {
          params: {
            city_name: searchQuery,
          },
        }
      );
      return response;
    } catch (error) {
      setRequestError(error);
    }
  };
  return (

    // display search box and button
    <Row className='w-100 justify-content-center'>
      <Form
        onSubmit={getPageData}
        className='d-flex justify-content-center'
      >
        <Row className='w-100'>
          <Col className=''>
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

          <Col xs={4}>
            <Button variant='primary' type='submit'>
              Explore!
            </Button>
          </Col>
        </Row>
      </Form>

      {/* display card if there is data to display */}
      {apiData ? (
        <Row className='mt-5 text-center'>
          <LocationData apiData={apiData} />
          {apiData.forecasts ? (
            <Row>
              <Weather forecasts={apiData.forecasts} />
            </Row>
          ) : (
            ""
          )}
          {apiData.movies ? (
            <Row>
              <Movies movies={apiData.movies} />
            </Row>
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
