import React, { useState } from 'react';
import {
  Mastercontainer,
  HeadingContainer,
  HeadingContainerHeading,
  HeadingContainertwo,
  HeadingContainerHeadingtwo,
  CoverupWrp,
  CutIcon,
} from '../terms-and-conditions-privacy-policy/index.sc';

import SubmitArrow from '../../assets/icons/SubmitArrow';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';

import {
  MainContainer,
  SideDiv,
  SideDivHeading,
  SideDivTextDiv,
  SideDivTextList,
  SideDivTextDivUl,
  AboutUsForm,
  FormKeyValuePairContainer,
  Valueholder,
  Keyholder,
  Textarea,
  Buttonwrapper,
  DivBottom,
  DivBottomCont,
  DivBottomDetails,
  DivBottomDetailsHeading,
  DivBottomDetailsText,
  LinkTag,
  BottomDivEntireContainer,
  KeyholderNumber,
  WrongInput,
  DropDownDiv,
  DropDownButtonWraper,
  UlListDropDown,
  ListItems,
  DropDownDivWraper,
  DropDownChoosedPlaceholder,
  // Button,
} from './index.sc';

import X from '../../assets/icons/X';
import PropTypes from 'prop-types';

// import { Button } from '../button';
// import AppBG from '../app-bg';
// import bgsr from '../../assets/img/bg/bg_sr.svg';
// import AppHeader from '../app-header';
// import AppFooter from '../app-footer';
import ContactIcon from '../../assets/icons/Contact-icon.js';
// Used for navigation

import DropDownButton from '../../assets/icons/DropDownButton';
import { Button } from '../button';

// import { CrossButtonWrp } from '../../pages/news-letter/newsletter-top-section/top-bar/index.sc';
// import ArrowLeft from '../../assets/icons/ArrowLeft';

export default function ContactUs({ updateParentStateCont }) {
  // function to handel input change
  const [inputNumber, setInputNumber] = useState('');

  const [warning, setWarning] = useState('');

  const handleInputChange = (event) => {
    setInputNumber(event.target.value);
    // console.log(isValidPhoneNumber(inputNumber));
    if (isValidPhoneNumber(inputNumber) === true) {
      setWarning(' ');
    } else {
      setWarning('*Invalid Input');
      setTimeout(() => {
        setWarning(' ');
      }, 1500);
    }
  };

  const isValidPhoneNumber = (inputNumber) => {
    const regex = /^\+1 \(\d{3}\) \d{3}-\d{3}$/;
    return regex.test(inputNumber);
  };

  // the onclick funtion to navigate

  const handleButtonClick = () => {
    updateParentStateCont(false);
  };

  // the onclick function to view dropdown
  const [showCustomComponent, setShowCustomComponent] = useState(false);

  const handleClick = () => {
    setShowCustomComponent(!showCustomComponent);
  };

  // the onclick function to show the value in list
  const [chosedCountry, setChosedCountry] = useState('Select Country');
  const ClickedCountry = (country) => {
    setChosedCountry(country);
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  return (
    <>
      {/* <AppBG bg1h={'11.5%'} bg1={bgsr} />
      <AppHeader /> */}
      <CoverupWrp>
        <Mastercontainer>
          <HeadingContainer>
            {/* <CrossButtonWrp onClick={handleButtonClick}>
              <ArrowLeft color={'#656B8A'} width="2rem" />
            </CrossButtonWrp> */}
            <HeadingContainerHeading>Contact Us</HeadingContainerHeading>
            <CutIcon onClick={handleButtonClick}>
              <X color={'#cdcdcd'}></X>
            </CutIcon>
          </HeadingContainer>
          <HeadingContainertwo>
            <HeadingContainerHeadingtwo>
              Speak to an expert
            </HeadingContainerHeadingtwo>
          </HeadingContainertwo>
          <MainContainer>
            <SideDiv>
              <SideDivHeading>Our team can help you:</SideDivHeading>
              <SideDivTextDiv>
                <SideDivTextDivUl>
                  <SideDivTextList>
                    Design a solution to accept and optimise payments, add new
                    revenue streams and automate financial workflows.
                  </SideDivTextList>
                  <SideDivTextList>
                    Access custom pricing including cost+ pricing, volume
                    discounts, and more.
                  </SideDivTextList>
                  <SideDivTextList>
                    Get started on AlphametricX faster with dedicated
                    implementation and support services.
                  </SideDivTextList>
                </SideDivTextDivUl>
              </SideDivTextDiv>
            </SideDiv>
            <AboutUsForm>
              <FormKeyValuePairContainer>
                <Valueholder>First name</Valueholder>
                <Keyholder placeholder="Name" type="text"></Keyholder>
              </FormKeyValuePairContainer>
              <FormKeyValuePairContainer>
                <Valueholder>Last name</Valueholder>
                <Keyholder placeholder="Last name" type="text"></Keyholder>
              </FormKeyValuePairContainer>
              <FormKeyValuePairContainer>
                <Valueholder>Work email</Valueholder>
                <Keyholder
                  placeholder="w.dogulas@example.com"
                  type="email"
                ></Keyholder>
              </FormKeyValuePairContainer>
              <FormKeyValuePairContainer>
                <Valueholder>Work phone</Valueholder>
                <KeyholderNumber
                  placeholder="+1 (235) 678-1234"
                  value={inputNumber}
                  onChange={handleInputChange}
                ></KeyholderNumber>
                <WrongInput>{warning}</WrongInput>
              </FormKeyValuePairContainer>
              <FormKeyValuePairContainer>
                <Valueholder>Company Name</Valueholder>
                <Keyholder placeholder="Name" type="text"></Keyholder>
              </FormKeyValuePairContainer>
              <FormKeyValuePairContainer onClick={handleClick}>
                <Valueholder>Country name</Valueholder>
                <DropDownDiv>
                  <DropDownDivWraper>
                    <DropDownChoosedPlaceholder>
                      {chosedCountry}
                    </DropDownChoosedPlaceholder>
                    <DropDownButtonWraper>
                      <DropDownButton
                        size={'0.9375rem'}
                        color={'grey'}
                      ></DropDownButton>
                    </DropDownButtonWraper>
                  </DropDownDivWraper>
                  {showCustomComponent && (
                    <UlListDropDown>
                      <ListItems
                        type="none"
                        onClick={() => ClickedCountry('USA')}
                      >
                        USA
                      </ListItems>
                      <ListItems
                        type="none"
                        onClick={() => ClickedCountry('INDIA')}
                      >
                        INDIA
                      </ListItems>
                      <ListItems
                        type="none"
                        onClick={() => ClickedCountry('GERMANY')}
                      >
                        GERMANY
                      </ListItems>
                      <ListItems
                        type="none"
                        onClick={() => ClickedCountry('SINGAPORE')}
                      >
                        SINGAPORE
                      </ListItems>
                      <ListItems
                        type="none"
                        onClick={() => ClickedCountry('AUSTRALIA')}
                      >
                        AUSTRALIA
                      </ListItems>
                    </UlListDropDown>
                  )}
                </DropDownDiv>
              </FormKeyValuePairContainer>
              <FormKeyValuePairContainer>
                <Valueholder>Write Comments</Valueholder>
                <Textarea placeholder="Type comments here"></Textarea>
              </FormKeyValuePairContainer>
              <Buttonwrapper>
                {/* <Button backgroundColor={'#675ef2'}>
                  Submit
                  <SubmitArrow size="1rem" color="#fff"></SubmitArrow>
                </Button> */}
                <Button
                  title={'Submit'}
                  backgroundColor={theme[selectedTheme].primary}
                  icon={<SubmitArrow size="1rem" color="#fff" />}
                  iconPosition={'right'}
                  // onClick={() => handler(campaignData)}
                />
              </Buttonwrapper>
            </AboutUsForm>
          </MainContainer>
          <DivBottom>
            <DivBottomCont>
              <BottomDivEntireContainer>
                <ContactIcon size="4.375rem"></ContactIcon>
                <DivBottomDetails>
                  <DivBottomDetailsHeading>
                    Technical support
                  </DivBottomDetailsHeading>
                  <DivBottomDetailsText>
                    {"We're here to help! If you have technical issues,"}
                    <br />
                    <LinkTag>contact support</LinkTag>
                  </DivBottomDetailsText>
                </DivBottomDetails>
              </BottomDivEntireContainer>
            </DivBottomCont>
            <DivBottomCont>
              <BottomDivEntireContainer>
                <ContactIcon size="4.375rem"></ContactIcon>
                <DivBottomDetails>
                  <DivBottomDetailsHeading>
                    Account support
                  </DivBottomDetailsHeading>
                  <DivBottomDetailsText>
                    {"We're here to help! If you have technical issues,"}
                    <br />
                    <LinkTag>contact support</LinkTag>
                  </DivBottomDetailsText>
                </DivBottomDetails>
              </BottomDivEntireContainer>
            </DivBottomCont>
          </DivBottom>
        </Mastercontainer>
      </CoverupWrp>
      {/* <AppFooter /> */}
    </>
  );
}

ContactUs.propTypes = {
  updateParentStateCont: PropTypes.func,
};
