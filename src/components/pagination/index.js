import React from 'react';
import {
  Iconwpr,
  NextButton,
  NumButton,
  CustomPaginationWrapper,
  PaginationWrapper,
  PrevButton,
  Showtxt,
  CustomInputWrp,
  InputBox,
} from './index.sc';
import PropTypes from 'prop-types';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import { Button } from '../button';
import { useSelector } from 'react-redux';
import { theme } from '../../constants/theme';

const Pagination = ({
  page,
  prevClick,
  handlePage,
  nextClick,
  isCustomPagiNation,
  setIsCustomPagiNation,
  customPageNum,
  cumstomPageHandler,
  onClickCustomPage,
  total,
  align,
  limit,
}) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const pageSize =
    total % limit === 0 ? total / limit : Math.floor(total / limit) + 1;
  const end =
    (page + 1) * limit < pageSize * limit ? (page + 1) * limit : total;
  const maxPageNum = Math.floor(total / limit) + 1;
  return (
    <CustomPaginationWrapper>
      {isCustomPagiNation && (
        <CustomInputWrp>
          <InputBox
            type="text"
            name="custompage"
            placeholder=""
            value={customPageNum}
            onChange={(e) => cumstomPageHandler(e)}
            autoFocus
          />
          {/* {customPageNum !== '' && ( */}
          <Button
            title={'Go'}
            disable={
              customPageNum < 1 ||
              customPageNum > pageSize ||
              customPageNum > maxPageNum
            }
            backgroundColor={theme[selectedTheme].primary}
            disableStyle={{
              background: theme[selectedTheme].border,
              border: 'none',
              color: theme[selectedTheme].background,
            }}
            onClick={() => {
              onClickCustomPage();
            }}
          />
          {/* )} */}
        </CustomInputWrp>
      )}
      <PaginationWrapper>
        {total <= limit && (
          <div className="page-input">
            <PrevButton
              disabled={page === 0}
              onClick={() => {
                if (page !== 0) prevClick(page - 1);
              }}
              className="pageText prev"
            >
              <Iconwpr rotate="180">
                {' '}
                <ArrowLeft />
              </Iconwpr>{' '}
              Prev{' '}
            </PrevButton>
            <NumButton currpage={page + 1 === 1} onClick={() => handlePage(0)}>
              {1}
            </NumButton>
            <NextButton
              disabled={page + 1 === pageSize}
              onClick={() => {
                nextClick(page + 1);
              }}
              className="pageText next"
            >
              Next <Iconwpr> {/* <ArrowLeft /> */}</Iconwpr>
            </NextButton>
          </div>
        )}
        {false && (
          <Showtxt>
            Showing{' '}
            <span>
              {page * limit + 1}-{end}
            </span>
          </Showtxt>
        )}
        {total >= limit && (
          <div className="page-input">
            <PrevButton
              disabled={page === 0}
              onClick={() => {
                if (page !== 0) prevClick(page - 1);
              }}
              className="pageText prev"
            >
              <Iconwpr rotate="180"> {/* <ArrowLeft /> */}</Iconwpr> Prev{' '}
            </PrevButton>
            {/* <input
          type="number"
          value={page}
          onChange={updateGoToPage}
          class="pagination-current-page"
        /> */}
            <NumButton currpage={page + 1 === 1} onClick={() => handlePage(0)}>
              {1}
            </NumButton>
            {(((page + 2 === pageSize ||
              page === 1 ||
              page === pageSize - 1 ||
              page === 0) &&
              pageSize !== 2) ||
              pageSize === 3) && (
              <NumButton
                currpage={page + 1 === 2}
                onClick={() => handlePage(1)}
              >
                {2}
              </NumButton>
            )}
            {page > 1 && pageSize !== 3 && (
              <NumButton
                onClick={() => setIsCustomPagiNation(!isCustomPagiNation)}
              >
                ...
              </NumButton>
            )}
            {page + 2 < pageSize &&
              pageSize !== 2 &&
              pageSize !== 3 &&
              page > 1 && (
                <NumButton
                  currpage={page !== 0}
                  onClick={() => handlePage(page === 0 ? 1 : page)}
                >
                  {page === 0 ? 2 : page + 1}
                </NumButton>
              )}
            {page + 2 < pageSize && pageSize !== 3 && pageSize !== 4 && (
              <NumButton
                onClick={() => setIsCustomPagiNation(!isCustomPagiNation)}
              >
                ...
              </NumButton>
            )}

            {(page + 2 === pageSize ||
              page === 1 ||
              page === pageSize - 1 ||
              page === 0) &&
              pageSize !== 2 &&
              pageSize !== 3 && (
                <NumButton
                  currpage={pageSize - 2 === page}
                  onClick={() => handlePage(pageSize - 2)}
                >
                  {pageSize - 1}
                </NumButton>
              )}
            <NumButton
              currpage={pageSize - 1 === page}
              onClick={() => handlePage(pageSize - 1)}
            >
              {pageSize}
            </NumButton>
            <NextButton
              disabled={page + 1 === pageSize}
              onClick={() => {
                nextClick(page + 1);
              }}
              className="pageText next"
            >
              Next <Iconwpr> {/* <ArrowLeft /> */}</Iconwpr>
            </NextButton>
          </div>
        )}
      </PaginationWrapper>
    </CustomPaginationWrapper>
  );
};

Pagination.propTypes = {
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prevClick: PropTypes.func,
  nextClick: PropTypes.func,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  align: PropTypes.string,
  handlePage: PropTypes.func,
  limit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customPageNum: PropTypes.number,
  cumstomPageHandler: PropTypes.func,
  isCustomPagiNation: PropTypes.bool,
  setIsCustomPagiNation: PropTypes.func,
  onClickCustomPage: PropTypes.func,
};

export default Pagination;
