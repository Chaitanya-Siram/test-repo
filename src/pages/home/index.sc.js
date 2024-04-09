import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  font-family: Inter;
`;

export const TitleWrapper = styled.h2`
  font-size: 18px;
  margin: 0;
  padding: 0;
  font-weight: 700;
  color: #000000;
`;

export const BoxWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const ImgWrapper = styled.img`
  border-radius: 10px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 7px;
  height: 100%;
  justify-content: space-between;
`;

export const BoldText = styled.div`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
`;

export const LightText = styled.div`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  color: #5d5e60;
`;

export const HomeWrp = styled.div`
  height: 100vh;
  width: 100%;
  /* overflow: auto; */
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
