import { useSelector } from 'react-redux';

const usePermissions = () => {
  const loggedInRole = useSelector((store) => {
    return store?.user?.data?.role || '';
  });

  const hasPermission = (role) => {
    return role === loggedInRole;
  };
  return { hasPermission };
};

export default usePermissions;
