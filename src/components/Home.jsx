import React from 'react';
import { Container, Button} from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebase';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const [user, loading] = useAuthState(auth);
  return (
    <div>
      <div className="bg-secondary text-white text-center py-5 min-vh-100 "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
      }}
      >
        <Container>
          <h1 className="display-1 fw-bolder mb-4">Welcome to Countries</h1>
          <p className='lead my-4'>Your one-stop destination to browse countries of the World</p>
          {user && (
            <>
         <Link to='/countries'><Button variant="outline-light"> Browse Countries</Button></Link> 
         </>
         )}
        </Container>
        {!user && (
          <>
            <p>Please Sign Up to browse countires</p>
            <LinkContainer to='/register'>
              <Button variant='primary' hidden={loading} className='mb-3'>
                Sign Up 
              </Button>
            </LinkContainer>
          </>
        )}
      </div>
         
    </div>
  );
}

export default Home;
