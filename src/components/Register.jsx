import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {useAuthState} from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from '../auth/firebase';

import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [repeatPassword,setRepeatPassword]=useState('')
    const [name,setName]=useState('');
    const [user,loading,error]=useAuthState(auth);
    const navigate = useNavigate();

    const register =()=>{
        if(!name)alert("Please enter name");
        if(password!==repeatPassword){
          alert("Passwords do not match");
          return;
        }
        registerWithEmailAndPassword(name,email,password)
    }

    useEffect(()=>{
        if(loading) return;
        if(user) navigate('/countries')
    },[user,loading])

    return (
        <div>
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image min-vh-100' style={{backgroundImage: 'linear-gradient(to right, #434343 0%, black 100%)'}} >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px', borderRadius:'1rem'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' value={name}onChange={(e)=>setName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)}/>

          {repeatPassword && (
          <div> 
         {password === repeatPassword ? (
         <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
        ) : (
       <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
       )}
      <span style={{marginLeft:'5px'}}>Passwords {password === repeatPassword ? "match" : "do not match"}</span>
      </div>
      )}
          {/* <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div> */}
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={register}>Register</MDBBtn>
          <div>
          <p className="mb-0"> Already have an account?
          <Link to="/login">Login</Link></p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
        </div>
    );
};

export default Register;