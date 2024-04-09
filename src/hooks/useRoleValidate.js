import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function useRoleValidate(role) {
  const [isRoleMatch, setIsRoleMatch] = useState(false);

  const loggedInRole = useSelector((store) => {
    return store?.user?.data?.role || '';
  });

  useEffect(() => {
    setIsRoleMatch(role === loggedInRole);
  }, [role, loggedInRole]);

  return isRoleMatch;
}

export default useRoleValidate;
