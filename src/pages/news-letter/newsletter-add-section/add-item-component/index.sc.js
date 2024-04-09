import styled from 'styled-components';

export const AddItemWrp = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 6rem;
  max-height: 6rem;
`;

export const SectionWrp = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /* background: #eceff5; */
  background: ${({ theme }) => theme.newsletterContentBackGround};
  /* border: 1px dashed #000000; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 0.75rem;
  flex-direction: column;
`;

export const SectionTextWrp = styled.div`
  width: fit-content;
  height: 3rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconWrp = styled.div`
  height: 1.4rem;
  width: 1.4rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  /* &:hover {
    border: 2px solid ${({ theme }) => theme.primary};
    .add-options {
      visibility: visible;
      pointer-events: all;
    }
  } */
`;

export const AddOptionsWrp = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.813rem 0.938rem;
  gap: 0.625rem;
  width: ${({ selectTitle }) =>
    selectTitle === 'articles' || selectTitle === 'graphs' ? '13rem' : '9rem'};
  background: #ffffff;
  border: 2px solid ${({ theme }) => theme.primary};
  box-shadow: 0px 8px 8px rgba(153, 153, 153, 0.3);
  border-radius: 0.625rem;
  position: absolute;
  top: ${({ selectTitle }) =>
    selectTitle === 'articles' || selectTitle === 'graphs' ? '1rem' : '2.5rem'};
  margin-left: ${({ selectTitle }) =>
    selectTitle === 'articles' || selectTitle === 'graphs' ? '23rem' : '0'};
  z-index: 1;
  visibility: visible;
  &::before {
    width: 4rem;
    height: 20rem;
    background: transparent;
    content: '';
    display: block;
    position: absolute;
    right: 102px;
    top: -11rem;
    z-index: 1;
    transform: rotate(90deg);
  }
`;

export const OptionWrp = styled.div`
  width: 16.75rem;
  height: ${({ type }) =>
    type === 'saved_graph' || type === 'graphs' || type === 'upload_image'
      ? 'auto'
      : '1.875rem'};
  display: flex;
  align-items: center;
`;

export const OptionText = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.188rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export const OptionTextSpan = styled.span`
  font-weight: 700;
`;

export const AddTextContent = styled.div`
  width: fit-content;
  height: 1rem;
  font-family: Inter;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.02em;
  text-align: left;
`;
