import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AppHeaderWrp = styled.div`
  padding: 0.75rem 1.75rem 0.5rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AppHeaderLeft = styled.div``;

export const AppHeaderRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1.25rem;
`;

export const AppLogo = styled(Link)`
  font-weight: bold;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.logoText};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

export const AppLogoSpan = styled.span`
  height: 1.3rem;
  width: 2.5rem;
  background-size: cover;
  background-image: url(${({ theme }) => theme.logo});
`;

export const NavIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

export const NavUserProfile = styled.div`
  display: flex;
  align-items: center;
`;
export const NavUserProfileTitle = styled.div`
  padding: 0rem 0.75rem;
  font-size: 0.75rem;
  color: #fff;
    &:hover {
    cursor: pointer;
  }
`;
export const NavUserProfileImg = styled.div`
  position: relative;
  height: 1.75rem;
  width: 1.75rem;
  border-radius: 50%;
  background-size: contain;
  background-image: url(${({ profileImage }) => profileImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  &:hover {
    cursor: pointer;
  }
`;

export const UserProfileCard = styled.div`
  width: 250px;
  height: auto;
  border-radius: 0.5rem;
  position: absolute;
  margin-top: 2.5rem;
  z-index: 30;
  border: none;
  background: #fff;
  right: 0.2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 6px 7px 19px 0px rgba(204, 204, 204, 1);
`;

export const ProfileCardDetails = styled.div`
  width: 100%;
  background: #f6f7fb;
  height: 5.4rem;
  display: flex;
  gap: 0.625rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  padding: 1rem;
  align-items: center;
  /* justify-content: center; */
`;

export const ProfileImage = styled.div`
  width: 3.43rem;
  height: 3.43rem;
  background: url(${({ profileImage }) => profileImage});
  background-size: cover;
  border-radius: 50%;
`;

export const ProfileText = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
`;

export const UserName = styled.h3`
  color: #000;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
  margin: 0;
`;

export const EmailId = styled.p`
  color: var(--grey-grey-3, #999);
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 150% */
  letter-spacing: -0.015rem;
  margin: 0;
`;

export const ButtonsWrpr = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 1rem;
  gap: 20px;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  margin: 0.5rem 0rem;
`;

export const Button = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
`;

export const ButtonOne = styled.div`
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem; /* 120% */
  letter-spacing: -0.01875rem;
  color: #ff2525;
`;

export const CoachStartLabel = styled.div`
  color: #ffffff;
  font-size: 0.75rem;
  cursor: pointer;
`;

export const CoachMarksIntroWrp = styled.div`
  width: 23rem;
  /* height: 23rem; */
  flex-shrink: 0;
  /* border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2); */
`;
export const CoachMarksIntroImg = styled.img`
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  border-radius: 0.625rem;
`;
export const CoachMarksIntroDesc = styled.div`
  width: 100%;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  .intro-label {
    color: #161a34;
    text-align: center;
    font-size: 1.4375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem; /* 121.739% */
    letter-spacing: -0.02875rem;
    > span {
      color: ${({ theme }) => theme.primary};
      font-size: 1.4375rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.75rem;
      letter-spacing: -0.02875rem;
    }
  }
  .intro-description {
    color: #161a34;
    text-align: center;
    font-size: 1.0625rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem; /* 141.176% */
    letter-spacing: -0.02125rem;
  }
`;
export const CoachMarksImg = styled.img`
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  border-radius: 0.625rem 0.625rem 0rem 0rem;
`;
export const CoachMarksBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0 1rem;
`;
