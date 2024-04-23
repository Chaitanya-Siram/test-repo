import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AppHeaderLeft,
  AppHeaderRight,
  AppHeaderWrp,
  AppLogo,
  AppLogoSpan,
  Button,
  ButtonOne,
  ButtonsWrpr,
  CoachMarksBody,
  CoachMarksImg,
  CoachMarksIntroDesc,
  CoachMarksIntroImg,
  CoachMarksIntroWrp,
  CoachStartLabel,
  EmailId,
  NavIcon,
  NavUserProfile,
  NavUserProfileImg,
  NavUserProfileTitle,
  ProfileCardDetails,
  ProfileImage,
  ProfileText,
  UserName,
  UserProfileCard,
} from './index.sc';
// import profileImage from '../../assets/img/nav/Ellipse 18.png';
import helpIcon from '../../assets/img/nav/help-circle.svg';
import gearIcon from '../../assets/img/nav/gearIcon.svg';
import bellIcon from '../../assets/img/nav/bell.svg';
import { useSelector } from 'react-redux';
import NotificationPopup from '../notification-popup';
import FAQsection from '../FAQ-component';

import { useNavigate, useParams } from 'react-router-dom';
// import { clearUserData } from '../../redux/slices/userSlice';
import CoachMarks from '../coach-marks';
import Tooltip from '../icon-tooltip';
import {
  CoachDescription,
  CoachLabel,
  CoachMarksWrp,
} from '../coach-marks/index.sc';
import IntroImg from '../../assets/img/coachmarks/intro.svg';
import CoachStep1 from '../../assets/img/coachmarks/step1.svg';
import CoachStep2 from '../../assets/img/coachmarks/step2.svg';
import CoachStep3 from '../../assets/img/coachmarks/step3.svg';
import CoachStep4 from '../../assets/img/coachmarks/step4.svg';
import { Img } from '../../assets/img';
import { getTokenData } from '../../constants/validateToken';

const AppHeader = () => {
  const navigate = useNavigate();
  const [notificationPopupIsOpen, setNotificationPopupIsOpen] = useState(false);
  const [FAQpopupisopen, setFAQpopupisopen] = useState(false);
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(); // Ref to store the reference of the dropdown container
  const { dashboardId } = useParams();
  const tokenData = getTokenData();

  const [openCoachMark, setOpenCoachMark] = useState(false);

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const user = useSelector((store) => {
    return store?.user?.data || {};
  });

  const handleNotificationClick = () => {
    setNotificationPopupIsOpen(!notificationPopupIsOpen);
  };

  const handleFAQClick = () => {
    setFAQpopupisopen(!FAQpopupisopen);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleLogout = async () => {
    localStorage.clear();
    window.location.reload();
  };

  const { firstName, image, email } = user;
  // const Options = [
  //   {
  //     id: 0,
  //     label: 'Logout',
  //     action: handleLogout,
  //   },
  // ];

  const coachSteps = useMemo(() => {
    if (window?.location?.pathname === '/') {
      return [
        {
          id: 'desktop',
          content: (
            <CoachMarksIntroWrp>
              <CoachMarksIntroImg src={IntroImg} />
              <CoachMarksIntroDesc>
                <CoachLabel className="intro-label">
                  Welcome, <span> {firstName}!</span>
                </CoachLabel>
                <CoachDescription className="intro-description">
                  It’s great to have you onboard, Ready to create your first
                  Opportunity?
                </CoachDescription>
              </CoachMarksIntroDesc>
            </CoachMarksIntroWrp>
          ),
          intro: true,
        },
        {
          id: 'coach-search-bar-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep1} />
              <CoachMarksBody>
                <CoachLabel>Search Box</CoachLabel>
                <CoachDescription>
                  Search Articles, Brands, Topics....etc.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-create-dashboard-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep2} />
              <CoachMarksBody>
                <CoachLabel>Add</CoachLabel>
                <CoachDescription>
                  Click on the ‘+’ icon to Create New Dashboard.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-create-news-letters-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep2} />
              <CoachMarksBody>
                <CoachLabel>Add</CoachLabel>
                <CoachDescription>
                  Click on the ‘+’ icon to Create News Letter.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-customize-canvas',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep3} />
              <CoachMarksBody>
                <CoachLabel>Customization Button</CoachLabel>
                <CoachDescription>
                  Click this button to customize the dashboard.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
      ];
    } else if (window?.location?.pathname?.includes('brand')) {
      return [
        {
          id: 'coach-brand-keywords-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Brand</CoachLabel> */}
                <CoachDescription>
                  Add keyword representing your primary brand
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-competition-keywords-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Add competition keywords.
                  Or leave it empty if you want to analyze
                  the only the primary brand.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-brand-competition-analyze-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Click Analyze to get brand and competition insights
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-add-remove-charts-wrap',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  You can add or remove charts from below options
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
      ];
    } else if (window?.location?.pathname?.includes('people')) {
      return [
        {
          id: 'coach-people-keywords-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Brand</CoachLabel> */}
                <CoachDescription>
                  Add keyword representing your primary person
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-people-analyze-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Click Analyze to get person insights
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-add-remove-charts-wrap',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  You can add or remove charts from below options
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
      ];
    } else if (window?.location?.pathname?.includes('campaign')) {
      return [
        {
          id: 'coach-add-campaign-wrapper',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Brand</CoachLabel> */}
                <CoachDescription>
                  Add new camapign
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-campaign-generate-btn-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Click generate to get camapign insights
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
      ];
    } else if (window?.location?.pathname?.includes('congruence')) {
      return [
        {
          id: 'coach-add-campaign-wrapper',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Brand</CoachLabel> */}
                <CoachDescription>
                  Add new congruence
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-campaign-generate-btn-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Click generate to get congruence insights
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
      ];
    } else if (window?.location?.pathname?.includes('primpact')) {
      return [
        {
          id: 'coach-brand-keywords-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Brand</CoachLabel> */}
                <CoachDescription>
                  Add keyword representing your primary brand
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-brand-competition-analyze-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Click Analyze to get brand and competition insights
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        }
      ];
    } else if (window?.location?.pathname?.includes('custom-search')) {
      return [
        {
          id: 'coach-create-news-letters-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep2} />
              <CoachMarksBody>
                <CoachLabel>Add</CoachLabel>
                <CoachDescription>
                  Click on the ‘+’ icon to Create News Letter.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-create-dashboard-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep2} />
              <CoachMarksBody>
                <CoachLabel>Add</CoachLabel>
                <CoachDescription>
                  Click on the ‘+’ icon to Create New Dashboard.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
      ];
    } else if (window?.location?.pathname?.includes('custom')) {
      return [
        {
          id: 'coach-brand-keywords-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Brand</CoachLabel> */}
                <CoachDescription>
                  Add keyword representing your primary brand
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-competition-keywords-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Add competition keywords.
                  Or leave it empty if you want to analyze
                  the only the primary brand.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-people-keywords-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Brand</CoachLabel> */}
                <CoachDescription>
                  Add person keywords.
                  Or leave it empty if you want to analyze
                  the only the primary brand.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'brand-competition-people-custom-analyze-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  Click Analyze to get brand, competition and person insights
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-add-remove-charts-wrap',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                {/* <CoachLabel>Competition</CoachLabel> */}
                <CoachDescription>
                  You can add or remove charts from below options
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
      ];
    } else if (window?.location?.pathname?.includes('create-news-letter')) {
      return [
        {
          id: 'coach-add-recipients-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                <CoachDescription>
                  Add keyword representing your email
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-send-date-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                <CoachDescription>
                  Add send date
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-send-time-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                <CoachDescription>
                  Add send time
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-publish-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                <CoachDescription>
                  Publish the news letter
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        },
        {
          id: 'coach-add-news-letter-wrp',
          content: (
            <CoachMarksWrp>
              <CoachMarksImg src={CoachStep4} />
              <CoachMarksBody>
                <CoachDescription>
                  Click on the ‘+’ icon to Create News Letter.
                </CoachDescription>
              </CoachMarksBody>
            </CoachMarksWrp>
          ),
        }
      ];
    }
  }, [firstName]);

  return (
    <>
      <AppHeaderWrp>
        <AppHeaderLeft>
          <AppLogo to="/">
            <AppLogoSpan /> AlphaMetricX
          </AppLogo>
        </AppHeaderLeft>
        <AppHeaderRight>
          {tokenData?.role !== 'Analyst' && (
            <>
              {(window?.location?.pathname === '/' ||
                ((window?.location?.pathname?.includes('custom-search'))) ||
                (!dashboardId && (window?.location?.pathname?.includes('brand') ||
                  window?.location?.pathname?.includes('people') ||
                  window?.location?.pathname?.includes('campaign') ||
                  window?.location?.pathname?.includes('congruence') ||
                  window?.location?.pathname?.includes('primpact') ||
                  window?.location?.pathname?.includes('custom'))) ||
                window?.location?.pathname?.includes('create-news-letter')
              ) && (
                  <CoachStartLabel onClick={() => setOpenCoachMark(true)}>
                    Start Tour
                  </CoachStartLabel>
                )}
              <Tooltip content="FAQ">
                <NavIcon src={helpIcon} onClick={handleFAQClick}></NavIcon>
              </Tooltip>

              <Tooltip content="Settings">
                <NavIcon src={gearIcon} onClick={handleSettingsClick}></NavIcon>
              </Tooltip>

              <Tooltip content="Notification">
                <NavIcon
                  src={bellIcon}
                  onClick={handleNotificationClick}
                ></NavIcon>
              </Tooltip>
            </>
          )}
          <NavUserProfile
            onClick={() => setIsDropdownOpen(!isDropDownOpen)}
            ref={dropdownRef}
          >
            <NavUserProfileTitle>{firstName}</NavUserProfileTitle>
            <NavUserProfileImg
              profileImage={Img.Image}
            // onClick={() => setIsDropdownOpen(!isDropDownOpen)}
            // ref={dropdownRef}
            >
              {isDropDownOpen && (
                <UserProfileCard>
                  <ProfileCardDetails>
                    <ProfileImage profileImage={image} />
                    <ProfileText>
                      <UserName>{firstName}</UserName>
                      <EmailId>{email}</EmailId>
                    </ProfileText>
                  </ProfileCardDetails>
                  <ButtonsWrpr>
                    {tokenData?.role !== 'Analyst' && (
                      <Button onClick={handleSettingsClick}>My Account</Button>
                    )}
                    <ButtonOne onClick={handleLogout}>Sign Out</ButtonOne>
                  </ButtonsWrpr>
                </UserProfileCard>
              )}
            </NavUserProfileImg>
          </NavUserProfile>
        </AppHeaderRight>
      </AppHeaderWrp>
      {notificationPopupIsOpen && (
        <NotificationPopup
          notificationPopupIsOpen={notificationPopupIsOpen}
          handleNotificationPopup={handleNotificationClick}
        />
      )}
      {FAQpopupisopen && (
        <FAQsection
          FAQPopupIsOpen={FAQpopupisopen}
          handleFAQPopup={handleFAQClick}
        ></FAQsection>
      )}
      {openCoachMark && (
        <CoachMarks steps={coachSteps} toggler={setOpenCoachMark} />
      )}
    </>
  );
};

export default AppHeader;
