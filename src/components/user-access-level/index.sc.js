import styled from 'styled-components';

export const PopupWrp = styled.div`
  position: absolute;
  z-index: 3;
  top: calc(100% + 10px);
  right: -90%;
  width: 20rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(209, 213, 220);
  padding: 1rem;
  border-radius: 0.625rem;
  filter: drop-shadow(rgba(0, 0, 0, 0.2) 0px 5px 20px);
`;

export const MainWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const ContentWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding-bottom: 0.625rem;
`;

export const HeadingText = styled.div`
  color: rgb(0, 0, 0);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.02rem;
`;

export const UserWrp = styled.div`
  display: flex;
  padding: 0.5rem 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.5rem;
  background: #f3f4f8;
  width: 100%;
`;

export const UserContentWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TextWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const UserNameText = styled.h3`
  color: #000;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.125rem;
  letter-spacing: -0.0175rem;
  padding: 0;
  margin: 0;
`;

export const ClickText = styled.span`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export const AccessLevelWrp = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const StrikedText = styled.p`
  color: #999;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0175rem;
  padding: 0;
  margin: 0;
  text-decoration: line-through;
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const AccessLeveltext = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0175rem;
  padding: 0;
  margin: 0;
`;

export const LearnMoreText = styled.p`
  color: #999;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.0175rem;
  padding: 0;
  margin: 0;
`;

export const BtnWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: flex-end;
`;
