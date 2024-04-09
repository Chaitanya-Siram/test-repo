import jwtDecode from 'jwt-decode';
import { tokenKey } from './index';

export const validateToken = () => {
  const token = localStorage.getItem(tokenKey); // Replace with your actual access token
  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);

    // Access the expiration time (exp) from the decoded token
    const expirationTime = decodedToken.exp;

    // Get the current timestamp in seconds since the epoch
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (currentTimestamp > expirationTime) {
      localStorage.clear();
      return false;
      // You can handle token expiration here, such as logging the user out.
    } else {
      return true;
    }
  } catch (error) {
    return false;
    // Handle the error, such as an invalid token.
  }
};

export const getTokenData = () => {
  const token = localStorage.getItem(tokenKey); // Replace with your actual access token
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode(token);
  return decodedToken;
};
