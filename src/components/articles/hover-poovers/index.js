import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Popoverwpr = styled.div`
  width: fit-content;
  height: fit-content;
  box-shadow: 0px 0.25rem 1.25rem 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 1.75rem;
  top: -2px;
  padding: 0.8rem;
  z-index: 10;
  background-color: ${({ theme }) => theme.background};
  border-radius: 5px;
  cursor: auto;
`;

const Popover = ({
  data,
  InnerChild,
  setShow,
  setText,
  text,
  setTriggerFetchUseEffect,
  storeArticleCommentsTags,
  setStoreTags,
  setStoreComments,
}) => {
  return (
    <Popoverwpr onClick={(e) => e.stopPropagation()}>
      <InnerChild
        data={data}
        setShow={setShow}
        setText={setText}
        text={text}
        setTriggerFetchUseEffect={setTriggerFetchUseEffect}
        storeArticleCommentsTags={storeArticleCommentsTags}
        setStoreTags={setStoreTags}
        setStoreComments={setStoreComments}
      />
    </Popoverwpr>
  );
};

Popover.propTypes = {
  data: PropTypes.any,
  InnerChild: PropTypes.oneOfType([PropTypes.node, PropTypes.any]),
  setShow: PropTypes.func,
  setText: PropTypes.func,
  text: PropTypes.string,
  setTriggerFetchUseEffect: PropTypes.func,
  storeArticleCommentsTags: PropTypes.func,
  setStoreTags: PropTypes.func,
  setStoreComments: PropTypes.func,
};

export default Popover;
