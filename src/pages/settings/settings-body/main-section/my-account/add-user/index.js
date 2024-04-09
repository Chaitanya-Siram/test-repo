import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  AccessDescription,
  AccessLevelWrapper,
  AccessListContainer,
  AccessListIconWrp,
  AccessListItem,
  AccessOptionTextWrp,
  AccessTitle,
  ButtonContainer,
  DrawerContentBox,
  ErrorTxt,
  FlexDiv,
  FooterContainer,
  FormFieldsWrapper,
  Headerleftwpr,
  Headerwrap,
  Heading,
  Iconwpr,
  InputHeader,
  MainBoxwpr,
  SearchInputs,
  SearchInputsWrp,
  SectionTitle,
} from './index.sc';
import { theme } from '../../../../../../constants/theme';
import { Button } from '../../../../../../components/button';
import Close from '../../../../../../assets/icons/Close';
import { useSelector } from 'react-redux';
import AddAdminIcon from '../../../../../../assets/icons/AddAdminIcon';
import AddAnalystIcon from '../../../../../../assets/icons/AddAnalystIcon';
import AddUserIcon from '../../../../../../assets/icons/AddUserIcon';
import { ValidateEmail } from '../../../../../login/validateEmail';

const accessLevels = [
  {
    title: 'Admin',
    value: 'admin',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'Analyst',
    value: 'analyst',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'Reader',
    value: 'reader',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

// const btnStyle = {
//   color: theme.dark.text,
//   fontFamily: ' Inter',
//   fontSize: '0.9375rem',
//   fontStyle: 'normal',
//   fontWeight: '400',
//   lineHeight: '1.125rem' /* 120% */,
//   letterSpacing: '-0.01875rem',
// };

const AddUserPopup = ({
  toggler = () => {},
  heading = 'Add New User',
  handleSave,
  handleEdit,
  type = 'Save',
  rowData = {},
}) => {
  const [selectedLevel, setSelectedLevel] = useState(
    rowData?.access_level ? rowData?.access_level : 'admin'
  );
  const [emailError, setEmailError] = useState('');

  const fullName = rowData?.name?.title?.split(' ');

  const initialState = {
    first_name: rowData?.name?.title ? fullName[0] : '',
    last_name: rowData?.name?.title ? fullName[fullName.length - 1] : '',
    email: rowData?.name?.subTitle ? rowData?.name?.subTitle : '',
  };
  const [formFields, setFormFields] = useState(initialState);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const handleToggle = () => {
    toggler(false);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };
  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleCancelAddUser = () => {
    toggler(false);
  };
  const handleEditUser = () => {
    const returnData = {
      selectedLevel,
      id: rowData?.id,
    };
    handleEdit(returnData);
    toggler(false);
  };
  const handleSaveAddUser = () => {
    const returnData = {
      ...formFields,
      selectedLevel: capitalizeFirstLetter(selectedLevel),
    };
    if (ValidateEmail(formFields.email)) {
      setEmailError('');
      handleSave(returnData);
      toggler(false);

      // setPasswordError('');
    } else {
      setEmailError('Invalid email!');
    }
  };
  const capitalizeFirstLetter = (str) => {
    return str
      ?.split(' ')
      ?.map((word) => {
        return word?.charAt(0)?.toUpperCase() + word?.slice(1);
      })
      ?.join(' ');
  };

  return (
    <DrawerContentBox>
      <Headerwrap>
        <Headerleftwpr>
          <Heading>{heading}</Heading>
        </Headerleftwpr>
        <Iconwpr onClick={handleToggle}>
          <Close color={theme[selectedTheme].text} height={'34'} width={'34'} />
        </Iconwpr>
      </Headerwrap>
      <MainBoxwpr>
        <FormFieldsWrapper>
          <FlexDiv>
            <SearchInputsWrp>
              <InputHeader>First Name</InputHeader>
              <SearchInputs
                placeholder="First Name"
                name="first_name"
                value={formFields.first_name}
                onChange={handleFieldsChange}
                disabled={type === 'edit'}
              />
            </SearchInputsWrp>
            <SearchInputsWrp>
              <InputHeader>Last Name</InputHeader>

              <SearchInputs
                placeholder="Last Name"
                name="last_name"
                value={formFields.last_name}
                onChange={handleFieldsChange}
                disabled={type === 'edit'}
              />
            </SearchInputsWrp>
          </FlexDiv>
          <FlexDiv>
            <SearchInputsWrp>
              <InputHeader>Email Address</InputHeader>
              <SearchInputs
                placeholder="Email Address"
                type="email"
                name="email"
                value={formFields.email}
                onChange={handleFieldsChange}
                disabled={type === 'edit'}
              />
              <ErrorTxt>{emailError}</ErrorTxt>
            </SearchInputsWrp>
          </FlexDiv>
        </FormFieldsWrapper>
        <AccessLevelWrapper>
          <SectionTitle>Alert Me for Changes in Volume</SectionTitle>
          <AccessListContainer>
            {accessLevels.map((level, i) => (
              <AccessListItem
                key={i}
                className={level.value === selectedLevel ? 'selected' : ''}
                onClick={() => handleSelectLevel(level.value)}
              >
                <AccessListIconWrp>
                  {level.value === 'admin' && <AddAdminIcon />}
                  {level.value === 'analyst' && <AddAnalystIcon />}
                  {level.value === 'reader' && <AddUserIcon />}
                </AccessListIconWrp>
                <AccessOptionTextWrp>
                  <AccessTitle>{level.title}</AccessTitle>
                  <AccessDescription>{level.description}</AccessDescription>
                </AccessOptionTextWrp>
              </AccessListItem>
            ))}
          </AccessListContainer>
        </AccessLevelWrapper>
      </MainBoxwpr>
      <FooterContainer>
        <ButtonContainer>
          <Button
            title={'Cancel'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={handleCancelAddUser}
            border={theme[selectedTheme].primary}
          />
          {type === 'edit' ? (
            <Button
              title="Submit"
              backgroundColor={theme[selectedTheme].primary}
              color={theme[selectedTheme].background}
              onClick={handleEditUser}
            />
          ) : (
            <Button
              title="Submit"
              backgroundColor={theme[selectedTheme].primary}
              color={theme[selectedTheme].background}
              onClick={handleSaveAddUser}
              disable={
                !formFields.first_name.length || !formFields.last_name.length
              }
              disableStyle={{
                background: theme[selectedTheme].borders,
                border: 'none',
                color: theme[selectedTheme].background,
              }}
            />
          )}
        </ButtonContainer>
      </FooterContainer>
    </DrawerContentBox>
  );
};

export default AddUserPopup;

AddUserPopup.propTypes = {
  toggler: Proptypes.func,
  heading: Proptypes.string,
  handleSave: Proptypes.func,
  handleEdit: Proptypes.func,
  type: Proptypes.string,
  rowData: Proptypes.any,
};
