import styled from 'styled-components';
export const PopUpWrp = styled.div`
  background-color: #ffffff;
`;
export const ContentWrp = styled.div`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
`;
export const TitleWrp = styled.h3`
  color: #161a34;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02875rem;
  margin: 0;
  padding: 0;
`;
export const ChartInputWrp = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;
export const ChartTypeWrp = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;
export const ChartNameText = styled.p`
  display: inline-flex;
  /* margin-bottom: 0.44rem; */
  margin: 0;
  color: ${({ theme }) => theme.darkText};
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
`;
export const InputBox = styled.input`
  display: flex;
  width: 100%;
  height: 2.5rem;
  align-items: center;
  padding-left: 0.55rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.darkText};
  border: 1px solid rgb(209, 213, 220);
  border-radius: 0.3125rem;
  outline: none;
  &::placeholder {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 13px;
    color: #999999;
  }
  &:focus {
    outline: none;
  }
`;
export const BtnWrp = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
export const GraphTypeWrp = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export const GraphTypeBox = styled.div`
  padding: 0.5rem;
  text-align: center;
  border: 1px solid ${(props) => (props.selected ? '#000000' : '#c3c7d9')};
`;
export const GraphName = styled.div`
  margin: 0;
  padding: 0;
  color: #656b8a;
  font-size: 0.6875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem;
`;
