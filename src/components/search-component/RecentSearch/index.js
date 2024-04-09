import React from 'react';
import PropTypes from 'prop-types';
import {
  ComponentTitle,
  ComponentWrapper,
  Result,
  ResultsContainer,
  Value,
} from './index.sc';
import { useNavigate } from 'react-router-dom';

const RecentSearch = ({ results = [] }) => {
  // const limitedResults = results.slice(0, maxLimit);
  const navigate = useNavigate();
  return (
    <ComponentWrapper>
      <ComponentTitle>Recent: </ComponentTitle>
      <ResultsContainer>
        {results.map((result, i) => {
          const { query } = result;
          return (
            <Result
              key={i}
              onClick={() => navigate(`search-results/${result.id}`)}
            >
              <Value>{query}</Value>
            </Result>
          );
        })}
        {/* {results.length > maxLimit && (
          <Result>
            <Value>+{results.length - maxLimit}</Value>
          </Result>
        )} */}
      </ResultsContainer>
    </ComponentWrapper>
  );
};

export default RecentSearch;

RecentSearch.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  maxLimit: PropTypes.number,
};
