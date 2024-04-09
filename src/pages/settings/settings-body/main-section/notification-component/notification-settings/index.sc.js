import styled from 'styled-components';

export const MainWrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  grid-template-columns: repeat(2, 1fr);
`;

export const NotificationsWrp = styled.div`
  display: flex;
  align-items: baseline;
`;

export const HeaderWrp = styled.div``;

export const HeaderText = styled.h3`
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.05rem;
  margin: 0;
  padding: 0;
`;

export const SubText = styled.p`
  color: #656b8a;
  max-width: 60%;
  width: 30rem;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const OptionsWrp = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  margin-top: 1.92rem;
`;

export const OptionWrp = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.125rem;
`;

export const OptionLabel = styled.h5`
  color: #000;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.0375rem;
  margin: 0;
  padding: 0;
`;

export const OptionText = styled.p`
  color: #656b8a;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  padding: 0;
`;

export const OptionDescrWrp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
`;
