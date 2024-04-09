import styled from 'styled-components';

export const NewsLetterWrp = styled.div`
  width: 55vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionLink = styled.button`
  font-weight: bold;
  color: #0563c1;
  text-decoration: underline;
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;
`;

export const SectionWrapper = styled.div`
  padding: 0rem 2rem 0rem 1.25rem;
`;

export const NewsLetterRow = styled.div`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background: #fff;
  position: relative;
  display: ${(props) => (props.split ? 'grid' : 'flex')};
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  align-items: flex-start;
  gap: 0rem 1rem;
  &:hover .tool-bar-wrp {
    visibility: visible;
  }
  &:hover .show-text {
    display: block;
  }
  &::after {
    width: 1.5rem;
    height: 8rem;
    background: transparent;
    content: '';
    display: block;
    position: absolute;
    right: -17px;
    z-index: 1;
  }
`;
export const NewsLetterComponentWrp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const FullTextWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  left: -6rem;
  display: none;
  background-color: white;
  border: none;
  border-radius: 1rem;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 12px 12px 0px #0000001f;
`;

export const AddRowWrp = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
`;

export const ToolBarWrp = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0px;
  right: -11.25rem;
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-end;
`;
