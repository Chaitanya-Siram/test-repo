import styled from 'styled-components';

export const NewsletterWrp = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  &:hover .show-icon {
    display: block;
  }
  &:hover .background-color {
    display: block;
  }
`;

export const NewsLetterBackground = styled.div`
  min-height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
`;

export const LogoText = styled.h1`
  margin: 0;
  background: linear-gradient(
    to right,
    rgba(245, 132, 28, 1),
    rgba(245, 132, 28, 0.59)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  cursor: pointer;
`;

export const LogoHeaderDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HoverContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0;
  &:hover .hover-card {
    display: block;
  }
`;

export const ImageUploadPopupOver = styled.div`
  display: block;
  position: absolute;
  bottom: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid rgba(223, 223, 223, 1);
  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  width: 9rem;
  box-sizing: border-box;
  padding: 0.5rem;
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
`;

export const TitleBox = styled.div`
  width: 55vw;
  background: ${({ backgroundColor }) => backgroundColor || 'white'};
  padding: 2rem 2.91rem 1rem 2.44rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.875rem;
  color: black;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  ${({ backgroundImageUrl }) =>
    backgroundImageUrl &&
    `
    background-image: url(${backgroundImageUrl});
    background-size: cover;
    background-position: center;
  `}
`;

export const NewsletterTitle = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: normal;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

export const NewsLetterInputHoverContainer = styled.div`
  display: inline-block;
  position: relative;
  &:hover .input-color {
    display: block;
  }
`;

export const NewsletterDateHoverContainer = styled.div`
  display: inline-block;
  position: relative;
  &:hover .date-color {
    display: block;
  }
`;

export const NewsLetterDescriptionHoverContainer = styled.div`
  display: inline-block;
  position: relative;
  &:hover .description-color {
    display: block;
  }
`;

export const NewsLetterBannerInput = styled.textarea`
  width: 100%;
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  line-height: normal;
  margin: 0;
  padding: 0;
  border: none;
  resize: none;
  background: transparent;
  outline: none;
  color: ${({ titleColor }) => titleColor || 'black'};
  &::placeholder {
    color: ${({ titleColor }) => titleColor || 'black'};
  }
  overflow: hidden;
`;

export const TitleBoxWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const NewsletterTitleText = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

export const TitleBoxBottomWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleBoxBottomText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.188rem;
  letter-spacing: -0.02rem;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

export const TitleBoxBottomRightText = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 0.8125rem;
  margin: 0;
  padding: 0;
  color: ${({ dateColor }) => dateColor || 'black'};
`;

export const NewsLetterBannerDescription = styled.textarea`
  font-family: Inter;
  width: 100%;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  color: ${({ descriptionColor }) => descriptionColor || 'black'};
  &::placeholder {
    color: ${({ descriptionColor }) => descriptionColor || 'black'};
  }
`;
