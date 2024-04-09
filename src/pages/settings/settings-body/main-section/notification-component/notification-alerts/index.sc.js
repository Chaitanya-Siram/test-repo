import styled from 'styled-components';

export const MainWrp = styled.div`
  padding-right: 4.8rem;
`;

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

export const IconWrp = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const SubText = styled.p`
  color: #656b8a;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const AlertsWrp = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2.59rem;
`;

export const AlertWrp = styled.div`
  padding: 1.44rem 1.26rem 1.26rem;
  border-radius: 0.3125rem;
  border: 1px solid #d1d5dc;
  background: #fff;
`;

export const TitleWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OptionLabel = styled.h5`
  color: #000;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.05rem;
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
  margin-top: 0.89rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.44rem;
`;

export const StatusWrp = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
`;

export const StatusText = styled.p`
  color: ${(props) => (props.alertIsActive ? '#00B929' : '#FF2525')};
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0;
  margin: 0;
`;

export const ContentText = styled.p`
  color: #000;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const OtherText = styled.p`
  color: #000;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
