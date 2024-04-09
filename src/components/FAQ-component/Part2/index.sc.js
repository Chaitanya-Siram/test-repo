import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Wrpr = styled.div`
  width: 63rem;
  right: ${(props) => (props.isOpen ? '0' : '-100rem')};
  border-radius: 0.6125rem;
  background: #fff;
  position: absolute;
  top: 0;
  background-color: #fff;
  transition: 0.3s ease-in-out;
  z-index: 1000;
  height: calc(100% - 1.25rem);
  margin: 0.625rem;
  border-radius: 0.625rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const PaddingWrpr = styled.div`
  padding: 2.4rem 2.4rem 0rem 2.4rem;
`;

export const HeaderWrpr = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const HeadingHead = styled.h3`
  color: var(--bw-black, #000);
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02875rem;
  margin-right: auto;
  margin-top: 0;
  margin-left: 0.5rem;
`;

export const MajorDesWrpr = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.44rem;
  margin-top: 0.5rem;
`;

export const MajorHeding = styled.h4`
  color: var(--bw-black, #000);
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem;
  letter-spacing: -0.025rem;
  margin: 0;
`;

export const MajorTextDes = styled.p`
  color: var(--bw-grey-04, #5c5e60);
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  margin: 0;
`;

export const VideoWrpr = styled.video`
  height: auto;
  width: 100%;
  margin-top: 1.87rem;
`;

export const SecondaryDiscriptionWrpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.56rem;
  height: auto;
  width: 100;
  margin-top: 1.38rem;
`;

export const TextWrpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.58rem;
  height: auto;
  width: 100%;
`;

export const TextWrprHeading = styled.h4`
  color: #000;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  margin: 0;
`;

export const TextWrprText = styled.p`
  color: #5c5e60;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
`;

export const CarouselWrpr = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  gap: 10px;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const CardsContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  gap: 10px;
`;

export const DemoCards = styled.div`
  height: 14rem;
  width: 14rem;
  color: white;
  background-color: grey;
`;

export const Footer = styled.div`
  height: 4.85rem;
  width: 63.3845rem;
  background-color: #f0f2f8;
  margin-top: 3.52rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding: 1.4rem 2.69rem;
  position: relative;
  z-index: 1200;
`;

export const FooterText = styled.p`
  color: #5c5e60;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  padding-top: 0.5rem;
  padding-right: 1rem;
  margin-left: auto;
  margin: 0;
`;

Wrpr.propTypes = {
  isOpen: PropTypes.bool,
};
