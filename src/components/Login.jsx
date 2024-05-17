import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { auth, loginWithEmailAndPassword } from '../auth/firebase';
import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [user,loading,error]=useAuthState(auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(loading) return;
        if(user) navigate('/countries')
    },[user,loading])

    return (
        <div>
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image min-vh-100' style={{backgroundImage: 'linear-gradient(to right, #434343 0%, black 100%)'}}>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
           <MDBCol col='12'>

           <MDBCard className='m-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
           <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

           <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
           <p className="text-black-50 mb-5">Please enter your email and password!</p>

           <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <MDBBtn outline className='mx-2 px-5' size='lg' onClick={()=>loginWithEmailAndPassword(email,password)}>
          Login
         </MDBBtn>
        <div>
          <p className="mb-0 mt-3">Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</MDBRow>
</MDBContainer>
        </div>
    );
};

export default Login;