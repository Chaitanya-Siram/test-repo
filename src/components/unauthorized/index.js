import React from 'react';
import { useNavigate } from 'react-router';

const Unauthorized = () => {
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const from = location.state?.from?.pathname || '/';
  return (
    <div>
      <div>Unauthorized</div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </button>
    </div>
  );
};

export default Unauthorized;
