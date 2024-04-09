import styled from 'styled-components';

export const TabSectionMainWrp = styled.div`
  height: calc(80%);
  display: flex;
  flex-direction: column;
  gap: 0.938rem;
  padding: 1.5rem 0rem 0rem 0rem;
  /* background-color: #ebecf2; */
  border-radius: 1rem 1rem 0 0;
  margin-bottom: 4rem;
`;

export const TabSectionWrp = styled.div`
  height: 2.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
`;

export const TabIcon = styled.img``;
export const TabBtnWrp = styled.div`
  height: 2rem;
  padding: 0rem 0.5rem;
`;
export const TabBtn = styled.button`
  height: 100%;
  font-weight: 600;
  border: none;
  background-color: transparent;
  font-size: 0.85rem;
  padding: 0rem 0.5rem;

  &:hover {
    background-color: #675ef2;
    color: #fff;
    border-radius: 0.5rem;
  }

  &.active {
    background-color: #675ef2;
    color: #fff;
    border-radius: 0.5rem;
  }
`;
export const TabAdd = styled.div`
  display: flex;
  padding: 0.53rem 0.75rem 0.47rem;
  border-radius: 0.5rem;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  height: 2rem;
  margin-top: 1px;
  cursor: pointer;
`;

export const BentoSectionWrp = styled.div`
  height: 30rem;
`;

export const Tabwpr = styled.div`
  display: flex;
  align-items: center;
`;

export const Custombtnwpr = styled.div`
  display: flex;
  padding: 0.53rem 0.75rem 0.47rem;
  border-radius: 0.5rem;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  height: 2rem;
  margin-top: 1px;
  cursor: pointer;
  gap: 0.2rem;
`;

export const Custombtntxt = styled.div`
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: ${({ theme }) => theme.primary};
`;

export const Imgwpr = styled.img`
  display: flex;
  align-items: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

export const IconContDiv = styled.div`
  height: auto;
  width: auto;
  background-color: #656b8a;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
