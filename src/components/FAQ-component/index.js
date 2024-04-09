import React, { useState } from 'react';

// import of components
import {
  AnsWrpr,
  ExploreSection,
  ExploreSectionHeading,
  FAQWrpr,
  FAQsSection,
  Footer,
  FooterText,
  HeaderWrpr,
  HeadingHead,
  ImageAns,
  ImageAnsWrpr,
  PaddingWrpr,
  Questions,
  QuestionsWrpr,
  SearchBox,
  SearchLable,
  SearchSection,
  TextAns,
  TextAnsWrpr,
  TileSection,
} from './index.sc';

// import of cardComponents
import DisplayCard from './DisplayCard';

// import of buttons
import { ButtonComp } from '../button/index.sc';

// import of X icon
import X from '../../assets/icons/X';

// import of second page
import FAQpt2 from './Part2';

// other dependancies
import { MainWrp } from '../notification-popup/index.sc';
import PropTypes from 'prop-types';
import DashboardPopup from '../dasboard-popup';
import ContactUs from '../contact-us';

// Array that will be maped
const CardDetails = [
  {
    boldText: 'Get Started with Dashboards',
    cardImg:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694532610/AMX/Explore%20Tutorials/e9mc18ge7xufmt1lyqm1.png',
  },
  {
    boldText: 'Get Started with Search',
    cardImg:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694532610/AMX/Explore%20Tutorials/v0t7dvq9lxsf4rlou4ps.png',
  },
  {
    boldText: 'Get Started with Newsletters',
    cardImg:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694532610/AMX/Explore%20Tutorials/oe48mhudseztkmhqphly.png',
  },
  {
    boldText: 'Learn About Settings & User Management',
    cardImg:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694532610/AMX/Explore%20Tutorials/vwpldwhnzafhl91tiwcp.png',
  },
  {
    boldText: 'How to create new dashboard',
    cardImg:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694532611/AMX/Explore%20Tutorials/cw72itw1zxwljqo9sfys.png',
  },
];

// Array for Questions
const FAQquestions = [
  {
    question: 'I forgot my password, what should I do? ',
    points: [
      'New users can be added from',

      '1. Account -> Manage Users (https://app.meltwater.com/account/users).  ',

      '2.You will see the “Add User” icon in the top-right of the page.',
    ],
    visual:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694534478/AMX/mgpzykjxg2vnxllqfnhh.png',
  },
  {
    question: 'How do i add new user?',
    points: [
      'New users can be added from',

      '1. Account -> Manage Users (https://app.meltwater.com/account/users).  ',

      '2.You will see the “Add User” icon in the top-right of the page.',
    ],
    visual:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694534478/AMX/mgpzykjxg2vnxllqfnhh.png',
  },

  {
    question: 'Can I change my email address of existing user? ',
    points: [
      'New users can be added from',

      '1. Account -> Manage Users (https://app.meltwater.com/account/users).  ',

      '2.You will see the “Add User” icon in the top-right of the page.',
    ],
    visual:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694534478/AMX/mgpzykjxg2vnxllqfnhh.png',
  },
  {
    question: 'How many searcher do I have? ',
    points: [
      'New users can be added from',

      '1. Account -> Manage Users (https://app.meltwater.com/account/users).  ',

      '2.You will see the “Add User” icon in the top-right of the page.',
    ],
    visual:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694534478/AMX/mgpzykjxg2vnxllqfnhh.png',
  },
  {
    question: 'How can I find reach of an article or source? ',
    points: [
      'New users can be added from',

      '1. Account -> Manage Users (https://app.meltwater.com/account/users).  ',

      '2.You will see the “Add User” icon in the top-right of the page.',
    ],

    visual:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694534478/AMX/mgpzykjxg2vnxllqfnhh.png',
  },
  {
    question: 'How do I export articles? ',
    points: [
      'New users can be added from',

      '1. Account -> Manage Users (https://app.meltwater.com/account/users).  ',

      '2.You will see the “Add User” icon in the top-right of the page.',
    ],
    visual:
      'https://res.cloudinary.com/dfvea8n6y/image/upload/v1694534478/AMX/mgpzykjxg2vnxllqfnhh.png',
  },
];

export default function FAQsection({ FAQPopupIsOpen, handleFAQPopup }) {
  const [secondPopUpOpen, setSecondPopUpOpen] = useState(false);
  const [secondTitle, setSecondTitle] = useState('');
  // State to manage the visibility of answer wrappers
  const [visibleAnswers, setVisibleAnswers] = useState(
    Array(FAQquestions.length).fill(false)
  );

  // Function to toggle the visibility of the answer wrapper for a specific question
  const toggleAnswerVisibility = (index) => {
    const newVisibleAnswers = [...visibleAnswers];
    newVisibleAnswers[index] = !newVisibleAnswers[index];
    setVisibleAnswers(newVisibleAnswers);
  };

  const closeFAQPopup = () => {
    handleFAQPopup();
    setSecondPopUpOpen(false);
  };

  const openSecondPopUp = (boldText) => {
    setSecondPopUpOpen(!secondPopUpOpen);
    setSecondTitle(boldText);
  };

  const handleBackClick = () => {
    setSecondPopUpOpen(!secondPopUpOpen);
  };

  const [newCanvasPopCont, setNewCanvasPopCont] = useState(false);
  const updateParentStateCont = (newValue) => {
    setNewCanvasPopCont(newValue);
  };

  return (
    <>
      {FAQPopupIsOpen && (
        <MainWrp isOpen={FAQPopupIsOpen} onClick={closeFAQPopup} />
      )}

      <FAQWrpr isOpen={FAQPopupIsOpen}>
        <PaddingWrpr>
          <HeaderWrpr>
            <HeadingHead>Help & FAQs</HeadingHead>
            <div onClick={() => handleFAQPopup()} style={{ cursor: 'pointer' }}>
              <X color={'#cdcdcd'} size={'1.6rem'}></X>
            </div>
          </HeaderWrpr>
          <SearchSection>
            <SearchLable>Find answers quickly</SearchLable>
            <SearchBox type="search" placeholder="How can we help" />
          </SearchSection>
          <ExploreSection>
            <ExploreSectionHeading>Explore Tutorials</ExploreSectionHeading>
            <TileSection>
              {CardDetails.map((card, index) => (
                <DisplayCard
                  key={index}
                  text={card.boldText}
                  bg={card.cardImg}
                  click={() => openSecondPopUp(card.boldText)}
                ></DisplayCard>
              ))}
            </TileSection>
          </ExploreSection>
          <FAQsSection>
            <ExploreSectionHeading>FAQs</ExploreSectionHeading>
            <QuestionsWrpr>
              {FAQquestions.map((ques, i) => (
                <Questions
                  key={i} // Add an onClick event to toggle answer visibility
                  onClick={() => toggleAnswerVisibility(i)}
                >
                  {ques.question}
                  {/* Only render the answer wrapper if it's visible */}
                  {visibleAnswers[i] && (
                    <AnsWrpr>
                      <TextAnsWrpr>
                        {ques.points.map((point, j) => (
                          <TextAns key={j}>{point}</TextAns>
                        ))}
                      </TextAnsWrpr>
                      <ImageAnsWrpr>
                        <ImageAns ansimg={ques.visual}></ImageAns>
                      </ImageAnsWrpr>
                    </AnsWrpr>
                  )}
                </Questions>
              ))}
            </QuestionsWrpr>
          </FAQsSection>
        </PaddingWrpr>
        <Footer>
          <FooterText style={{ cursor: 'pointer' }}>
            Get in touch with our team
          </FooterText>
          <ButtonComp
            style={{ color: '#fff' }}
            title={'Contact Us'}
            backgroundColor={'#675ef2'}
            color={'#fff'}
            disable={false}
            onClick={() => setNewCanvasPopCont(true)}
          >
            Contact Us
          </ButtonComp>
        </Footer>
      </FAQWrpr>
      <FAQpt2
        open={secondPopUpOpen}
        title={secondTitle}
        handleBackClick={handleBackClick}
        totalBack={closeFAQPopup}
      />
      <DashboardPopup
        open={newCanvasPopCont}
        toggler={setNewCanvasPopCont}
        popContent={
          <ContactUs
            toggler={setNewCanvasPopCont}
            updateParentStateCont={updateParentStateCont}
          />
        }
        padding="0"
        Cross={false}
        borderRadius="0.75rem"
        width={'auto'}
      ></DashboardPopup>
    </>
  );
}

FAQsection.propTypes = {
  FAQPopupIsOpen: PropTypes.bool,
  handleFAQPopup: PropTypes.func,
};
