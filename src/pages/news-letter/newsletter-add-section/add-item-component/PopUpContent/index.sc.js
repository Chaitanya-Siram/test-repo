import styled from 'styled-components';

export const ContentPopWrp = styled.div`
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ContentHeaderWrp = styled.div`
  width: fit-content;
  height: 3.81rem;
  gap: 0.75rem;
`;

export const ContentHeaderTitle = styled.div`
  width: fit-content;
  height: 1.8rem;
  font-family: Inter;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.8rem;
  letter-spacing: -0.02em;
  text-align: left;
  color: #000000;
`;

export const ContentHeaderDescp = styled.div`
  width: fit-content;
  height: 1.25rem;
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.02em;
  text-align: left;
  color: #585858;
`;

export const OptImgWrp = styled.div``;

export const OptionBtnsWrp = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 0.375rem;
`;

export const OptionBtns = styled.button`
  width: max-content;
  height: 2.31rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#ffffff' : '#000000')};
  gap: 0.625rem;
  background-color: ${({ isSelected }) => (isSelected ? '#5f39f8' : '#ffffff')};
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.01em;
  text-align: left;
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#000000')};
  cursor: pointer;
`;

export const OptionImg = styled.img`
  display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
  width: 100%;
  border-radius: 0.5rem;
  border: 1px;
  margin-top: 1.5rem;
  margin-left: -0.6rem;
  background-repeat: no-repeat !important;
  max-height: 30rem;
  /* object-fit: cover; */
  /* display: flex;
  justify-content: center; */
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;
