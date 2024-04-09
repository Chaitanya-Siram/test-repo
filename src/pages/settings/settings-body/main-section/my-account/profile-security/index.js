import React, { useState } from 'react';
import {
  ButtonMainWrp,
  ButtonWrp,
  ImgWrp,
  MainWrp,
  TextWrp,
  UserDetailsWrp,
  UserMainWrp,
} from './index.sc';
// import { useDispatch } from 'react-redux';
import Edit2 from '../../../../../../assets/icons/Edit2';
import DashboardPopup from '../../../../../../components/dasboard-popup';
import EditPopUp from '../../../../../../components/profile-security-popup/EditPopUp';
import ChangePasswordPopUp from '../../../../../../components/profile-security-popup/ChangePasswordPopUp';
import ChangePasswordOTPPopUp from '../../../../../../components/profile-security-popup/ChangePasswordOTPPopUp';
// import toast from 'react-hot-toast';
// import { getUserDetailsAPI } from '../../../../../../redux/slices/userSlice';
// import { getTokenData } from '../../../../../../constants/validateToken';
import Proptypes from 'prop-types';

const ProfileSecurity = ({ userDetails, setShouldFetchUserDetails }) => {
  // const userData = useSelector((state) => state.user.data);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showChangePopUp, setShowChangePopUp] = useState(false);
  const [showOTPPopUp, setShowOTPPopUp] = useState(false);
  // const [userDetails, setUserDetails] = useState({});
  // const [shouldFetchUserDetails, setShouldFetchUserDetails] = useState(true);

  // const dispatch = useDispatch();

  const capitalizeFirstLetter = (str) => {
    return str
      ?.split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  // useEffect(() => {
  //   const userData = getTokenData();
  //   if (shouldFetchUserDetails) {
  //     console.log(setShouldFetchUserDetails);
  //     dispatch(getUserDetailsAPI(userData?.user_id))
  //       .then((resp) => {
  //         if (resp?.type === 'user/getAPIData/fulfilled') {
  //           setUserDetails(resp?.payload);
  //           setShouldFetchUserDetails(false);
  //           console.log(resp);
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error(err?.msg);
  //       });
  //   }
  // }, [dispatch, shouldFetchUserDetails]);

  return (
    <>
      <MainWrp>
        <UserMainWrp onClick={() => setShowEditPopUp(true)}>
          <ImgWrp src={userDetails?.image} />
          <UserDetailsWrp>
            <TextWrp bold={true}>
              {userDetails?.first_name} {userDetails?.last_name}
            </TextWrp>
            <TextWrp>{userDetails?.email}</TextWrp>
            <TextWrp>
              Access Level : {capitalizeFirstLetter(userDetails?.selectedLevel)}
            </TextWrp>
          </UserDetailsWrp>
        </UserMainWrp>
      </MainWrp>
      <ButtonMainWrp>
        <ButtonWrp onClick={() => setShowChangePopUp(true)}>
          Change Password
        </ButtonWrp>
        <ButtonWrp onClick={() => setShowEditPopUp(true)}>
          <Edit2 size="1.25rem" />
          Edit Profile
        </ButtonWrp>
      </ButtonMainWrp>
      <DashboardPopup
        open={showEditPopUp}
        toggler={setShowEditPopUp}
        popContent={
          <EditPopUp
            setShowEditPopUp={setShowEditPopUp}
            setShouldFetchUserDetails={setShouldFetchUserDetails}
            userDetails={userDetails}
          />
        }
        width="23rem"
        padding="1.5rem 1.75rem"
        borderRadius="0.75rem"
        Cross={true}
      />
      <DashboardPopup
        open={showChangePopUp}
        toggler={setShowChangePopUp}
        popContent={
          <ChangePasswordPopUp
            setShowChangePopUp={setShowChangePopUp}
            setShowOTPPopUp={setShowOTPPopUp}
            userId={userDetails?.id}
          />
        }
        width="25rem"
        padding="1.5rem 1.75rem"
        borderRadius="0.75rem"
        Cross={true}
      />
      <DashboardPopup
        open={showOTPPopUp}
        toggler={setShowOTPPopUp}
        popContent={
          <ChangePasswordOTPPopUp
            userId={userDetails?.id}
            email={userDetails?.email}
            setShowOTPPopUp={setShowOTPPopUp}
          />
        }
        width="25rem"
        padding="1.5rem 1.75rem"
        borderRadius="0.75rem"
        Cross={true}
      />
    </>
  );
};

ProfileSecurity.propTypes = {
  userDetails: Proptypes.object,
  setShouldFetchUserDetails: Proptypes.func,
};

export default ProfileSecurity;
