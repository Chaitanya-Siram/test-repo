import styled from 'styled-components';

export const MainWrp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
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
`;
export const HeadingMain = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: Inter;
  padding: 0;
  margin: 0;
`;

export const HeadingDesp = styled.p`
  display: inline-block;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.01em;
  text-align: left;
  color: ${({ theme }) => theme.secondaryText};
  margin-top: 1.25rem;
  margin-block-end: 0;
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
  padding: 0.75rem 0;
`;
export const InputField = styled.input.attrs((props) => ({ type: props.type }))`
  width: 100%;
  min-height: 2.8rem;
  border: 1px solid rgb(195, 199, 217);
  border-radius: 0.37rem;
  outline: none;
  padding: 0.75rem 0.8rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 1.5rem;
  ::placeholder {
    color: #999999;
  }
`;

export const ButtonMainWrp = styled.div`
  border-top: 1px solid rgba(195, 199, 217, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1.5rem 0 0;
`;
export const ButtonWrp = styled.button`
  width: fit-content;
  padding: 0.65rem 1rem;
  -webkit-box-align: center;
  font-size: 0.8125rem;
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
export const InputWrp = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: ${(props) => props.outline};
`;

export const IconWrp = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 0.95rem;
  cursor: pointer;
`;

export const InputSubmit = styled.input.attrs((props) => ({
  type: props.type,
}))`
  width: 4.85rem;
  padding: 0.65rem 1rem;
  -webkit-box-align: center;
  font-size: 0.8125rem;
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

export const ErrorMessage = styled.p`
  display: flex;
  color: red;
  font-size: 0.8rem;
  min-height: 0.8rem;
  margin-block: 0 0.3rem;
`;
