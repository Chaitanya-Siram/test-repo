import styled from 'styled-components';

export const MainWrp = styled.div`
  background-color: white;
  margin: 0.5rem 2.22rem;
  border-radius: 0.625rem 0.625rem 0.625rem 0.625rem;
`;

export const SubHeader = styled.div`
  display: flex;
  padding: 1.25rem;
  justify-content: space-between;
  align-items: center;
  gap: 0.625rem;
  box-shadow: 0px 1px 0px 0px #e8e8e8;
`;
export const ContentWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6875rem;
`;
export const BtnWrp = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubHeaderText = styled.div`
  color: #000000;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.06rem;
`;

export const CrossButtonWrp = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  transform: rotate(180deg);
`;
