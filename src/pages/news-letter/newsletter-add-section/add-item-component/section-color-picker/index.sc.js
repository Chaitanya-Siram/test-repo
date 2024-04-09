import styled from 'styled-components';

export const SectionContainer = styled.div`
  position: absolute;
  z-index: 1;
  display: ${({ show }) => (show ? 'block' : 'none')};
  /* left: ${({ showFontColor, showBackground, showImageUpload }) => {
    if (showFontColor && showBackground) {
      return '-7.2rem';
    } else if (showBackground && showImageUpload) {
      return '-12.8rem';
    } else if (showFontColor) {
      return '-5.2rem';
    } else {
      return '-3rem';
    }
  }}; */
  ${({ showFontColor, showBackground, showImageUpload }) => {
    if (showBackground && showImageUpload) {
      return 'right: -11.3rem;';
    } else if (showFontColor && showBackground) {
      return 'left: -7.2rem;';
    } else if (showFontColor) {
      return 'left: -5.2rem;';
    } else {
      return 'left: -3rem;';
    }
  }}
  top: ${({ showFontColor, showBackground, showImageUpload }) => {
    if (showImageUpload && !showBackground && !showFontColor) {
      return '-5.5rem';
    } else if (showBackground && showImageUpload) {
      return '2.3rem';
    } else {
      return '-2.55rem';
    }
  }};
`;
export const SectionColorWrp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: ${({ showImageUpload, showBackground, showFontColor }) =>
    showImageUpload && !showBackground && !showFontColor
      ? '9rem'
      : 'fit-content'};
  height: ${({ showImageUpload }) => (showImageUpload ? '3.5rem' : '2rem')};
  /* top: 382px;
left: 282px; */
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px;
  gap: 0.5rem;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 12px 12px 0px #0000001f;
  background-color: #fff;
`;

export const SectionColor = styled.div`
  background-color: ${({ selectedColor }) => selectedColor || '#fff'};
  width: 1.5rem;
  height: 1.5rem;
  z-index: 1;
  border-radius: 50%;
  border: 2px solid #888888;
  padding: 1px;
`;

export const FontColor = styled.div`
  color: ${({ selectedColor }) => selectedColor || '#000000'};
  z-index: 1;
  font-weight: bolder;
`;

export const SectionColorIconWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
