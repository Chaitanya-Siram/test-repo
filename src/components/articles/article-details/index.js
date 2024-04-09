import React from 'react';
import PropTypes from 'prop-types';
import { ArticleDetailsL, ArticleDetailsWrp } from './index.sc';
import { addCountPrefix } from '../../../constants/utils';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';

const ArticleDetails = ({ start = 1, end = 50, total = 50, isSyndication }) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  return (
    <ArticleDetailsWrp>
      <ArticleDetailsL>
        Showing <span>{`${start}-${end}`}</span> of{' '}
        <span>{addCountPrefix(total || 0)}</span>{' '}
        {isSyndication ? 'syndicated' : 'unique'} articles <br />{' '}
        {!isSyndication && (
          <span
            style={{
              color: theme[selectedTheme]?.closeButton,
              fontWeight: '500',
              fontSize: '0.75rem',
            }}
          >
            (duplicates are clubbed as syndication)
          </span>
        )}
      </ArticleDetailsL>
    </ArticleDetailsWrp>
  );
};

ArticleDetails.propTypes = {
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  end: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleSearchChange: PropTypes.func,
  handleFilterChange: PropTypes.func,
  handleSort: PropTypes.func,
  isSyndication: PropTypes.bool,
};

export default ArticleDetails;
