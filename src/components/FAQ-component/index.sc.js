import styled from 'styled-components';
import PropTypes from 'prop-types';

export const PaddingWrpr = styled.div`
  padding: 2.4rem 2.4rem 0rem 2.4rem;
`;

export const FAQWrpr = styled.div`
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
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.92rem;
`;

export const SearchLable = styled.p`
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem; /* 153.846% */
  letter-spacing: -0.01625rem;
  color: #000;
  margin: 0;
`;

export const SearchBox = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.borders};
  height: 2.5rem;
  border-radius: 0.3125rem;
  padding: 0.55rem;
  outline: none;
  &:active {
    outline: none;
  }
`;

export const ExploreSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.94rem;
  margin-top: 1.69rem;
`;

export const ExploreSectionHeading = styled.h4`
  color: var(--bw-black, #000);
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5625rem;
  letter-spacing: -0.025rem;
  margin: 0;
`;

export const TileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  flex-wrap: wrap;
`;

export const FAQsSection = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3.12rem;
  display: flex;
  flex-direction: column;
`;

export const QuestionsWrpr = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const Questions = styled.p`
  padding: 0.725rem 0rem;
  border-bottom: 1px solid #eceff3;
  color: var(--bw-grey-04, #5c5e60);
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  width: 100%;
  margin: 0;
  cursor: pointer;
`;

export const AnsWrpr = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.625rem;
  cursor: pointer;
`;

export const TextAnsWrpr = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

export const TextAns = styled.p`
  color: #5c5e60;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  display: block;
  margin: 0;
  height: auto;
`;

export const ImageAnsWrpr = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.81rem 16.31rem;
  background: #f0f2f8;
`;

export const ImageAns = styled.div`
  width: 25rem;
  height: 20rem;
  background-image: url(${(props) => props.ansimg});
  background-size: cover;
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

ImageAns.propTypes = {
  ansimg: PropTypes.img,
};
