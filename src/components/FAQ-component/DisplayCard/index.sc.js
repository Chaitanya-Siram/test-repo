import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CardWrpr = styled.div`
  min-width: 14rem;
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  background: #f0f2f8;
  padding: 1.03rem 1.19rem;
  cursor: pointer;
  &:hover h4 {
    color: #375dd7;
  }
`;

export const Img = styled.div`
  height: 11.625rem;
  height: 7.1875rem;
  background-image: url(${(props) => props.background});
  background-size: cover;
`;

export const Heading = styled.h4`
  width: 10rem;
  height: auto;
  color: #656b8a;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.375rem;
  letter-spacing: -0.01875rem;
  padding-top: 1.3rem;
  margin: 0;
`;

Img.propTypes = {
  background: PropTypes.img,
};
