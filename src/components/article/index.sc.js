import styled from 'styled-components';

export const ArticleWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #c3c7d9;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #000000;
  position: relative;
`;
export const SectionA = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  height: 100%;
  position: relative;
`;
export const SectionB = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 50%;
  height: 100%;
`;
export const SectionTitle = styled.div`
  color: #000000;
  font-weight: 600;
  text-align: left;
`;
export const SectionContent = styled.div`
  font-weight: 400;
  color: #5d5e60;
  font-size: 0.85rem;
  text-align: left;
`;
export const SectionSubContent = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #5d5e60;
  text-align: left;
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  margin-top: auto;
`;
export const ImgSection = styled.div`
  width: 45%;
  height: 100%;
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-position: center;
`;
export const InfoSection = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.8rem;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
`;
export const Heading = styled.div`
  color: #989da4;
`;
export const Value = styled.div`
  color: #000000;
  font-weight: 600;
`;
export const SentimentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: #d9f2df;
  border: 1px solid #d9f2df;
  border-radius: 20px;
  width: fit-content;
  padding: 5px 8px 5px 5px;
  margin-top: 1rem;
  span {
    font-size: 0.85rem;
    font-weight: 500;
    color: #000000;
  }
`;

export const MenuOption = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
