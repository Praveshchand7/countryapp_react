import React, { useState, useEffect  } from 'react';
import CountryCard from './CountryCard';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/countries/countriesSlice';

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  

  console.log("CountriesList=", countriesList)

  const [search, setSearch] = useState('')

  console.log("Search: ", search)

  useEffect(()=> {
    dispatch(initializeCountries())
  },[dispatch]
  )

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList.filter((c)=>{
          return c.name.official.toLowerCase().includes(search.toLowerCase());  
        })
        .map((country)=>(
          <CountryCard key={country.name.common} country={country}/>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
