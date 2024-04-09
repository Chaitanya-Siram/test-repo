import React, { useCallback, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import {
  ButtonMainWrp,
  ButtonWrp,
  CustomUploadButton,
  FileInput,
  FormWrp,
  HeadingMain,
  IconWrp,
  ImageDivWrp,
  ImgWrp,
  InputField,
  LabelWrp,
  MainWrp,
} from './index.sc';
import {
  // axiosPostRequest,
  // axiosPutRequest,
  axiosPutRequestAPI,
} from '../../../service';
// import { useSelector } from 'react-redux';
import Edit from '../../../assets/icons/Edit';
import toast from 'react-hot-toast';

const EditPopUp = ({
  Heading = 'Edit Profile',
  setShowEditPopUp,
  setShouldFetchUserDetails,
  userDetails,
}) => {
  // const userData = useSelector((state) => state.user.data);
  // console.log(userData, userDetails);
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    // firstName: userData?.firstName,
    // lastName: userData?.lastName,
    first_name: userDetails?.first_name,
    last_name: userDetails?.last_name,
    image: userDetails?.image,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axiosPutRequestAPI(
      '/settings/user_update/',
      { id: userDetails?.id },
      // { data: { ...userData, ...formData } }
      { data: { ...formData } }
    ).then((resp) => {
      if (resp.status === 200) {
        setShouldFetchUserDetails(true);
        toast.success('Details Updated Successfully');
      }
    });
    setShowEditPopUp(false);
  };
  const handleProfile = useCallback(() => {
    const formData = new FormData();
    formData.append('file', file);
    // axiosPostRequest('/upload', {}, formData).then(() => {
    // call the userUpdated Data
    axiosPutRequestAPI(
      '/settings/profile_Picture_update/',
      { id: userDetails?.id },
      formData
    ).then((resp) => {
      // call the userUpdated Data
      // http://127.0.0.1:8000/settings/profile_Picture_update/16/
      toast.success(resp?.data?.msg);
    });
  }, [file, userDetails?.id]);

  useEffect(() => {
    if (file) {
      handleProfile();
    }
  }, [file, handleProfile]);
  return (
    <MainWrp>
      <HeadingMain>{Heading}</HeadingMain>
      <ImageDivWrp>
        <ImgWrp src={formData?.image} />
        <IconWrp>
          <CustomUploadButton htmlFor="profileImage">
            <Edit />
          </CustomUploadButton>
        </IconWrp>
        <FileInput
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </ImageDivWrp>
      <FormWrp onSubmit={handleSubmit}>
        <LabelWrp>First Name</LabelWrp>
        <InputField
          type="text"
          value={formData?.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
        ></InputField>
        <LabelWrp>Last Name</LabelWrp>
        <InputField
          type="text"
          value={formData?.last_name}
          onChange={(e) =>
            setFormData({ ...formData, last_name: e.target.value })
          }
        ></InputField>
        <ButtonMainWrp>
          <ButtonWrp outline={true} onClick={() => setShowEditPopUp(false)}>
            Cancel
          </ButtonWrp>
          <ButtonWrp onClick={handleSubmit}>Update</ButtonWrp>
        </ButtonMainWrp>
      </FormWrp>
    </MainWrp>
  );
};
EditPopUp.propTypes = {
  Heading: Proptypes.string,
  setShowEditPopUp: Proptypes.func,
  setShouldFetchUserDetails: Proptypes.func,
  userDetails: Proptypes.object,
};
export default EditPopUp;
