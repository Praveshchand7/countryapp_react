import React, { useEffect, useState } from 'react';
import { Container, Row,Image, Col, Button, ListGroup, } from 'react-bootstrap';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';

const CountriesSingle = () => {
  // Function hooks
const location = useLocation();
const navigate = useNavigate();

// State Hooks
const [weather,setWeather] = useState('');
const [error,setError]=useState(false);
const [loading, setLoading] = useState(true);
const countriesList = useSelector((state)=>state.countries.countries);

// Destructuring variable
const country = location.state.country;

useEffect(()=>{
  if(!country.capital){
    setLoading(false)
    setError(true)
  }else{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
  .catch((err) => {
    setError(true);
  })
  .then((res) => {
    setWeather(res.data);
    setLoading(false);
  })
  }
},[country.capital])

const borders = Object.values(country.borders ?? {});

// console.log("weather",weather);

if(loading){
  return(
  <Container>
     <Spinner animation='border' role='status' className='center' variant='info'/>
     <span className='visually-hidden'></span>
  </Container>
  )
}

  return (
    <Container>
      <Row className='mt-5'>
        <Col> <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.capital}`}/>
        </Col>
        <Col>
        <h2 className='display-4' style={{color:'#003049'}}>{country.name.common}</h2>
        <h3>{country.capital}</h3>
        {error && (
          <p>Sorry, we don't have weather information for this country.</p>
        )}
        {!error && weather && (
          <div>
          <p>Right now it is <strong>{parseInt(weather.main.temp)}</strong> degrees in {country.capital} and {weather.weather[0].description}
          </p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`}/>
          </div>
        )}
                {borders.length > 0 && (
        <div>
          <h4>Borders:</h4>
            {borders.map((border) => {  
          const borderList = countriesList.find((country)=>country.cca3 === border)
          if (borderList){
            return (
              <ListGroup.Item
              key ={borderList.cca3}>
               <Link 
               to={`/countries/${borderList.name.common}`} 
               state={{country:borderList}}
               style={{color:'teal',textDecoration:'none'}}>
               {borderList.name.common}
               </Link> 
              </ListGroup.Item>
            )
          }
          return null;
        }                  
          )
          }
      
        </div>

       )}
        </Col>

      </Row>
      <Row className='mt-3'>
        <Col>
        <Button variant='primary' onClick={()=>navigate('/countries')} >
          Back to Countries
        </Button>
        </Col>
      </Row>
     
    </Container>
  );
};

export default CountriesSingle;
