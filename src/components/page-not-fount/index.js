import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Oops!</h1>
      <p>Page not found</p>
      <button onClick={() => navigate(-1)}>back</button>
    </div>
  );
}
