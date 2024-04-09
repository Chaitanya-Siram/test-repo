import styled from 'styled-components';
// import backgroundImage from '../../assets/img/homePageBG1.png';

export const AppBGWrp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

export const AppBG1 = styled.div`
  height: ${({ bg1h }) => bg1h || '25%'};
  width: 100%;
  background-image: url(${({ theme, bg1 }) => bg1 || theme.backgroundImage});
  background-size: cover;
`;
export const AppBG2 = styled.div`
  height: 100%;
  width: 100%;
  background-color: #eceff3;
`;
