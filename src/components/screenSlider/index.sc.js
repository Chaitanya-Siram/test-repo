import styled from 'styled-components';

export const ScreenWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

export const Dashboard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0;
  width: ${(props) =>
    props.IsfullWidth ? '100vw' : props.default ? props.width : '0vw'};
  background: #f6f7fb;
  transition: 2s ease-in-out;
  padding: ${(props) =>
    props.default || props.IsfullWidth
      ? '1.1875rem 1.25rem .625rem 1.9375rem'
      : '0rem'};
  gap: 1.25rem;
`;

export const ArticleWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: ${(props) =>
    props.IsfullWidth ? '100vw' : props.default ? props.width : '0vw'};
  background: #ffffff;
  transition: width 2s ease-in-out;
  z-index: 0;
`;

export const ArrowButtonsCircle = styled.div`
  position: absolute;
  top: 3.7188rem;
  left: ${(props) =>
    props.isLeft ? '0' : props.displayVal ? '65vw' : '100vw'};
  transition: 2s ease-in-out;
  background: ${(props) => (props.displayVal ? '#ffffff' : '#675ef2')};
  border: 0.1563rem solid #675ef2;
  box-shadow: 0rem 0.3125rem 0.625rem rgba(108, 73, 172, 0.1);
  border-radius: 1.25rem;
  width: 2.1875rem;
  height: 2.1875rem;
  transform: translate(-50%, 0);
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  display: flex;
  z-index: 1;
`;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  z-index: 0;
`;

export const TileContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.6875rem;
  font-family: 'Inter';
`;

export const IconHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const ArticleHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  padding: 1.875rem 1.875rem 0.9375rem 1.25rem;
  border-bottom: 0.075rem solid #c3c7d9;
  height: 5rem;
`;

export const ArticleTitle = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.6875rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
`;
