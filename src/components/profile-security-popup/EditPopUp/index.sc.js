import styled from 'styled-components';

export const MainWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
`;
export const ImgWrp = styled.img`
  width: 9.5rem;
  height: 9.5rem;
  border-radius: 50%;
  object-fit: cover;
`;
export const ImageDivWrp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const IconWrp = styled.div`
  position: absolute;
  bottom: 0;
  right: 30%;
  > svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  > svg > g > g > path {
    fill: #000;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const FileInput = styled.input`
  display: none; // Hide the default file input
`;

export const CustomUploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: #fff;
  background: #000;
  border-radius: 50%;
  > svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  > svg > g > path {
    stroke: #fff;
  }
  border: none;
  &:hover {
    cursor: pointer;
    background: #c3c7d9;
  }
`;
export const HeadingMain = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: Inter;
  padding: 0;
  margin: 0;
`;
export const FormWrp = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export const LabelWrp = styled.label`
  font-size: 0.875rem;
  font-family: Inter;
  font-weight: 600;
  color: #585858;
  padding: 0.5rem 0;
`;
export const InputField = styled.input.attrs((props) => ({ type: 'text' }))`
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid rgb(195, 199, 217);
  border-radius: 0.37rem;
  outline: none;
  padding: 0.5rem 0.8rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ButtonMainWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
`;
export const ButtonWrp = styled.button`
  width: 100%;
  padding: 0.65rem 0.8125rem;
  -webkit-box-align: center;
  font-size: 1rem;
  border-radius: 0.313rem;
  background: ${({ outline }) => (outline ? '#fff' : '#675ef2')};
  border: ${({ outline }) => (outline ? '1px solid #000' : 'none')};
  cursor: pointer;
  color: ${({ outline }) => (outline ? '#000' : '#fff')};

  &:hover {
    transition: background 0.2s ease 0s;
    background: rgb(133, 126, 245);
    color: rgb(255, 255, 255);
    border-color: rgb(133, 126, 245);
  }
`;
