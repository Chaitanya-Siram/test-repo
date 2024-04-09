import styled from 'styled-components/macro';

export const DrawerContentBox = styled.div`
  width: ${({ width }) => width || '80vw'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.75rem;
  max-height: 90vh;
`;

export const HeaderWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.85rem;
  background: #fff;
  height: 3.5rem;
  position: relative;
  border-radius: 0.75rem 0.75rem 0 0;
`;

export const HeaderLeftWpr = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  & > img {
    width: 1.5rem;
    height: 1.5rem;
    align-items: center;
  }
`;

export const IconWpr = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  & > img {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export const HeaderTitleWrp = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.secondaryText};
`;

export const MainBoxWpr = styled.div`
  height: ${({ height }) => height || '31.25rem'};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem;
  margin-bottom: 0;
  overflow: auto;
  background: #eceff3;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FooterBoxWpr = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 0.85rem 1.85rem;
  margin-top: ${({ mt }) => `${mt}rem`};
  border-top: 1px solid #c3c7d9;
  box-shadow: 0px -1px 0px 0px #c3c7d9;
`;
