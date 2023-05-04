import React from "react";
import LocationForm from "./components/LocationForm";
import Container from "react-bootstrap/Container";
export default function App() {
  return (
    <Container className='d-flex mt-3 justify-content-center'>
        <LocationForm />
    </Container>
  );
}
