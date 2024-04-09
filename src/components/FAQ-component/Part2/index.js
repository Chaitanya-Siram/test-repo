import React, { useState } from 'react';
import {
  HeaderWrpr,
  PaddingWrpr,
  Wrpr,
  HeadingHead,
  Footer,
  FooterText,
  MajorDesWrpr,
  MajorHeding,
  MajorTextDes,
  VideoWrpr,
  SecondaryDiscriptionWrpr,
  TextWrpr,
  TextWrprHeading,
  TextWrprText,
  CarouselWrpr,
  // DemoCards,
  CardsContainer,
} from './index.sc';

import X from '../../../assets/icons/X';
import { ButtonComp } from '../../button/index.sc';
import PropTypes from 'prop-types';
import LeftFacingArrow from '../../../assets/icons/LeftFacingArrow';
import DisplayCard from '../DisplayCard';
import DashboardPopup from '../../dasboard-popup';
import ContactUs from '../../contact-us';

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

export default function FAQpt2({ title, open, handleBackClick, totalBack }) {
  const [newCanvasPopCont, setNewCanvasPopCont] = useState(false);
  const updateParentStateCont = (newValue) => {
    setNewCanvasPopCont(newValue);
  };
  return (
    <>
      <Wrpr isOpen={open}>
        <PaddingWrpr>
          <HeaderWrpr>
            <div onClick={handleBackClick} style={{ cursor: 'pointer' }}>
              <LeftFacingArrow />
            </div>
            <HeadingHead>{title}</HeadingHead>
            <div onClick={totalBack} style={{ cursor: 'pointer' }}>
              <X color={'#cdcdcd'} size={'1.6rem'}></X>
            </div>
          </HeaderWrpr>
          <MajorDesWrpr>
            <MajorHeding>
              Guide to creating an efficient Brand Dashboard
            </MajorHeding>
            <MajorTextDes>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eget nisl aliquam, pharetra massa ac, tristique enim. Nulla sit
              amet placerat sem. Phasellus sit amet libero purus. Aliquam sit
              amet leo eu ligula dictum posuere eget ac augue. Mauris finibus
              interdum tincidunt. Donec enim est, pharetra at efficitur vitae,
              interdum non eros. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus.{' '}
            </MajorTextDes>
          </MajorDesWrpr>
          <VideoWrpr
            src="https://res.cloudinary.com/dfvea8n6y/video/upload/v1694549102/AMX/uihxmhuicoognk4mpgno.mp4"
            controls
          ></VideoWrpr>
          <SecondaryDiscriptionWrpr>
            <TextWrpr>
              <TextWrprHeading>Charts in Brand Dashboard</TextWrprHeading>
              <TextWrprText>
                Lorem ipsum dolor sit amet consectetur. Neque elit quisque hac
                egestas. Vitae eu eu dictum proin. Id tellus nulla consequat
                molestie commodo nec ultricies faucibus elementum. Eget proin
                semper duis nunc. Dolor eros ullamcorper nibh a et quis lacinia
                tellus. Maecenas fringilla ultrices et nunc habitasse mauris sed
                amet semper. Mattis nunc viverra fusce eget orci tincidunt
                varius varius lectus. Amet risus duis turpis faucibus eget donec
                turpis in vel. Commodo aliquam pellentesque aliquet ultrices est
                nunc.
              </TextWrprText>
            </TextWrpr>
            <TextWrpr>
              <TextWrprHeading>Charts in Brand Dashboard</TextWrprHeading>
              <TextWrprText>
                Lorem ipsum dolor sit amet consectetur. Neque elit quisque hac
                egestas. Vitae eu eu dictum proin. Id tellus nulla consequat
                molestie commodo nec ultricies faucibus elementum. Eget proin
                semper duis nunc. Dolor eros ullamcorper nibh a et quis lacinia
                tellus. Maecenas fringilla ultrices et nunc habitasse mauris sed
                amet semper. Mattis nunc viverra fusce eget orci tincidunt
                varius varius lectus. Amet risus duis turpis faucibus eget donec
                turpis in vel. Commodo aliquam pellentesque aliquet ultrices est
                nunc.
              </TextWrprText>
            </TextWrpr>
            <TextWrpr>
              <TextWrprHeading>Charts in Brand Dashboard</TextWrprHeading>
              <TextWrprText>
                Lorem ipsum dolor sit amet consectetur. Neque elit quisque hac
                egestas. Vitae eu eu dictum proin. Id tellus nulla consequat
                molestie commodo nec ultricies faucibus elementum. Eget proin
                semper duis nunc. Dolor eros ullamcorper nibh a et quis lacinia
                tellus. Maecenas fringilla ultrices et nunc habitasse mauris sed
                amet semper. Mattis nunc viverra fusce eget orci tincidunt
                varius varius lectus. Amet risus duis turpis faucibus eget donec
                turpis in vel. Commodo aliquam pellentesque aliquet ultrices est
                nunc.
              </TextWrprText>
            </TextWrpr>
            <TextWrpr>
              <TextWrprHeading>More Tutorials</TextWrprHeading>
              <CarouselWrpr>
                <CardsContainer>
                  {CardDetails.map((card, index) => (
                    <DisplayCard
                      key={index}
                      text={card.boldText}
                      bg={card.cardImg}
                      // click={() => openSecondPopUp(card.boldText)}
                    ></DisplayCard>
                  ))}
                </CardsContainer>
              </CarouselWrpr>
            </TextWrpr>
          </SecondaryDiscriptionWrpr>
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
      </Wrpr>
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

FAQpt2.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleBackClick: PropTypes.func,
  totalBack: PropTypes.func,
};
