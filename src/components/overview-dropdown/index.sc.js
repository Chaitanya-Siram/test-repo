import styled from 'styled-components';

export const DropButtonBox = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0rem -0.125rem 0.25rem rgba(103, 94, 242, 0.2);
  border-radius: ${(props) =>
    props.open ? '0.625rem 0.625rem 0 0' : '0.625rem'};
  display: flex;
  position: relative;
  width: 17rem;
  height: 2.875rem;
`;

export const Wrpr = styled.div`
  display: flex;
  gap: 0.375rem;
  width: 100%;
  padding: 0.81rem 0.93rem;
`;

export const ButtonText = styled.div`
  margin: 0rem;
  padding: 0rem;
  font-style: normal;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25rem;
`;

export const DropDownwrpr = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 2.875rem;
  left: 0;
  width: 100%;
  background: #ffffff;
  border-radius: 0 0 0.625rem 0.625rem;
  box-shadow: 0rem 0.625rem 1.25rem rgba(103, 94, 242, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 0.813rem 1.25rem 1.25rem 1.25rem;
  cursor: auto;
  z-index: 10;
`;

export const DesText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #675ef2;
`;

export const CreateButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  height: 1.563rem;
  cursor: pointer;
  position: static;
  &:hover > span > svg > path {
    stroke: #fff;
  }
  &:hover > span {
    background: #675ef2;
  }
`;

export const PlusCircle = styled.span`
  box-sizing: border-box;
  background: #ffffff;
  border: 0.075rem solid #675ef2;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out;
`;

export const CreatebtnTxt = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #675ef2;
`;

export const Line = styled.div`
  width: 100%;
  opacity: 0.5;
  height: 0.063rem;
  background: #c3c7d9;
`;

export const SubDesc = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.813rem;
  display: flex;
  align-items: center;
  color: #585858;
  opacity: 0.65;
`;
