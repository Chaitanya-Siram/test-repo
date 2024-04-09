import styled from 'styled-components';

export const PopupWrp = styled.div`
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
`;

export const HeadingText = styled.div`
  color: rgb(0, 0, 0);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.02rem;
`;
export const BtnWrp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: flex-end;
`;
