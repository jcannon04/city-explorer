import React from "react";
import LocationForm from "./components/LocationForm";
import Container from "react-bootstrap/Container";
export default function App() {
  return (
    <Container className='mt-5'>
        <LocationForm className='d-flex justify-content-center' />
    </Container>
  );
}
