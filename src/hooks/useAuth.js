import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const storedToken = localStorage.getItem('token');
  const storeddata = JSON.parse(localStorage.getItem('data'));
  const data = useSelector((store) => {
    return storedToken
      ? { token: storedToken, ...storeddata }
      : store?.user?.data || {};
  });

  // eslint-disable-next-line no-constant-condition
  return true ? (
    <Outlet />
  ) : data.token ? (
    <Navigate to={'/unauthorized'} state={{ from: location }} replace />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default RequireAuth;
