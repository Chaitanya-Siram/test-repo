import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';

const Cardwpr = styled.div`
  padding: 0.5rem 0.75rem;
  font-weight: 500;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 0.5rem;
  height: 2rem;
  box-sizing: border-box;
`;

const CardTitle = ({ title = 'Title' }) => {
  return <Cardwpr>{title}</Cardwpr>;
};

CardTitle.propTypes = {
  title: Proptypes.string,
};

export default CardTitle;

const ArtcleThemetitle = styled.div`
  padding: 0.38rem 0.625rem 0.27rem;
  border: 1px solid ${({ theme }) => theme.tagsBorderColor};
  border-radius: 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  height: 28px;
  /* width: 4.5rem; */
  justify-content: center;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ArticleTheme = ({ title = 'Title' }) => {
  return <ArtcleThemetitle>{title}</ArtcleThemetitle>;
};

ArticleTheme.propTypes = {
  title: Proptypes.string,
};
