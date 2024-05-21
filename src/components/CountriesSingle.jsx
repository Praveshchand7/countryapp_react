import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Image, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';





const CountriesSingle = () => {
  //function hooks
  const location = useLocation();
  const navigate = useNavigate();

  //State hooks
  const [weather, setWeather]= useState('');
  const [errors, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  

    //Destructuring variables
  const country = location.state.country;

  useEffect(() => {
    if (!country.capital){
      setLoading(false)
      setError(true)
    }else{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`)
    .catch((error)=> {
      setError(true);
    })
    .then((res)=> {
      if (res && res.data){
        setWeather(res.data)
      }
      setLoading(false);
    })
  }
  }, [country.capital])
console.log("Weather=", weather);

if (loading) {
  return(
    <Container>
      <Spinner
      animation='border'
      role='status'
      className='center'
      variant='info'
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </Container>
  )
}
  return (
    <Container> 
    <Row className='mt-5'>
      <Col>
      <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.capital}`}/>
      </Col>
      <Col>
      <h2 className='display-4'>{country.name.common}</h2>
      <p>Capital City:<strong>{country.capital}</strong></p>
      
      {!errors && weather && (
        <div>
        <p>
         
          Right now it is <strong>{parseInt(weather?.main?.temp)}</strong> degrees in <strong>{country.capital}</strong> {weather.weather[0].description}
        </p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />
        </div>
      )}

      {errors && (
        <div>
        <p> No weather for the country </p>
        </div>
      )}
      <p>Area:<strong>{(new Intl.NumberFormat('en-EN').format(country.area))} sq meters</strong></p>
      <p>Continent: <strong>{country.continents}</strong></p>
      </Col>  
    </Row>
    <Row>
      <Col>
      <Button variant='primary' onClick={() => navigate('/countries')} style={{marginTop:'1rem'}}>Back to Countries</Button>
      </Col>
    </Row>
    <div style={{display:'flex', margin:'2rem',gap:'1rem'}} >
      <Image thumbnail src={`https://source.unsplash.com/1600x900/?${country.subregion}`}  style={{width:'50%'}} />
      <Image alt='' src={country.coatOfArms.png} style={{width:'50%'}} />
    </div>
    </Container>
  );
};

export default CountriesSingle;
