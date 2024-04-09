import styled from 'styled-components';

export const MainWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

export const PopoverWrapper = styled.div`
  position: absolute;
  // box-shadow: 0px 5px 10px rgba(108, 73, 172, 0.3);
  top: -28%;
  ${({ position }) =>
    position === 'right' ? 'left' : 'right'}: calc(100% + 10px);
  transform: translate(0, 0%);
  display: ${(prop) => (prop.show ? 'flex' : 'none')};
  z-index: 9999;
  // &::before {
  //   content: '';
  //   position: absolute;
  //   ${(props) => props.position}: 0;
  //   top: 50%;
  //   transform: translate(50%, -55%) rotate(-45deg);
  //   border-right: 1px solid #c3c7d9;
  //   border-bottom: 1px solid #c3c7d9;
  //   width: 10px;
  //   height: 10px;
  //   background: #ffffff;
  //   z-index: 9999;
  // }
`;

export const Toggler = styled.div`
  margin: 0;
  padding: 0;
  width: fit-content;
`;
