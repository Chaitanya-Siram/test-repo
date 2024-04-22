import styled from 'styled-components';
import Group from '../../assets/img/loginImg/Group.svg';
import Rect1 from '../../assets/img/loginImg/Rect1.png';
import Rect2 from '../../assets/img/loginImg/Rect2.png';
import Rect3 from '../../assets/img/loginImg/Rect3.png';

import { Link } from 'react-router-dom';
// import { style } from 'd3';

export const LoginContrwpr = styled.div`
  width: 100%;
  height: calc(100vh - 30px);
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  position: relative;
`;

export const LoginFooter = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

export const LoginContactFooter = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  margin-left: 1em;
`;

export const LoginBgImagewpr = styled.div`
  width: 55%;
  background: #eceff9;
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
`;

// export const RectagleImgwpr = styled.img`
//   position: absolute;
//   top: ${({ top }) => top};
//   left: ${({ left }) => left};
//   right: ${({ right }) => right};
//   width: ${({ width }) => width};
//   height: ${({ height }) => height};
// `;

export const Informationwpr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const CarouselWrpr = styled.div`
  width: 50%;
  height: auto;
  margin-top: 5%;
  overflow-x: scroll;
  display: flex;
`;

export const CarouselScrollWrpr = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const Boldtextwpr = styled.h1`
  color: #000;
  margin: 0;
  font-family: Inter;
  font-size: 2.3125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.75rem;
  letter-spacing: -0.04625rem;
`;

export const LightTxtwpr = styled.p`
  color: #656b8a;
  font-family: Inter;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.25rem; /* 117.647% */
  letter-spacing: -0.02125rem;
  margin: 0;
`;
export const LoginFormCtrn = styled.div`
  width: 40%;
  margin: auto;
  max-width: 400px;
  @media (min-width: 1200px) {
    width: 30%;
  }
`;

export const LoginTextDsly = styled.h1`
  color: white;
  position: absolute;
  left: 5%;
  bottom: 5%;
  margin: 10px;
  font-size: 3em;
`;

export const LoginFormwpr = styled.div`
  width: 100%;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 44px 34px -10px rgba(0, 0, 0, 0.16);
  /* gap: 6rem; */
`;

export const LogoBox = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-bottom: 2rem;
`;

export const LogoTextwpr = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const LogoImgwpr = styled.img`
  width: 4rem;
  height: 3rem;
  display: flex;
  align-self: stretch;
  margin-bottom: 1.25rem;
  margin-left: -0.7rem;
`;

export const backgroundImage = styled.div`
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px; /* Set the height as needed */
`;

export const LoginFormBox = styled.div`
  width: 100%;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormBoldtxt = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1.6875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: -0.03375rem;
  margin-bottom: 0.5rem;
`;

export const FormGraytxt = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.03rem;
  margin-bottom: 1.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  /* margin-bottom: -0.5rem; */
`;

export const Input = styled.input`
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid #e2e2e2;
  border-radius: 0.5rem;
  outline: none;
  padding: 0.832rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  &:focus {
    border-color: #4d33eb;
  }
`;

export const FormLightTxt = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: -0.01625rem;
`;

export const ErrorTxt = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: red;
`;

export const LoginBtn = styled.button`
  margin: 0;
  /* padding: 0.72rem 1.25rem 0.77rem; */
  padding: 0.8125rem 1.5625rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  color: #fff;
  cursor: pointer;
`;

export const LinkWrp = styled.div`
  display: flex;
  gap: 1rem;
`;

export const LightGray = styled(Link)`
  text-decoration: none;
  font-family: Inter;
  font-size: 0.75rem;
  color: #4f4f4f;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.14px;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
  }
`;

export const CarouselWrp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  bottom: 3rem;
`;
export const Dot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  padding: 0.45rem;
  background-color: white;
  border-radius: 50%;
  margin: 0 0.5rem;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  cursor: pointer;
`;

export const GroupAbstract = styled.div`
  width: 100%;
  height: 60%;
  background-image: url(${Group});
  background-repeat: no-repeat;
`;

export const SlidesWrpr = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6.35rem;
`;

export const SliderImage1 = styled.div`
  width: 31.5625rem;
  height: 20.3125rem;
  background-image: url(${Rect1});
  background-size: cover;
`;
export const SliderImage2 = styled.div`
  width: 31.5625rem;
  height: 20.3125rem;
  background-image: url(${Rect2});
  background-size: cover;
`;
export const SliderImage3 = styled.div`
  width: 31.5625rem;
  height: 20.3125rem;
  background-image: url(${Rect3});
  background-size: cover;
`;

export const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.primary};
  height: 1rem;
  width: 1rem;
  margin: 0;
`;

export const CheckboxText = styled.label`
  color: #4f4f4f;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.00875rem;
`;
