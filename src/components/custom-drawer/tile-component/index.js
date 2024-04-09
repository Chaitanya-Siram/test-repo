import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';

const ItemLabelWrp = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.secondaryText};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  // display: inline-block;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  width: 85%;
`;

const ItemDesWrp = styled.div`
  font-weight: 400;
  font-size: 0.6rem;
  color: #999999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TileComponent = ({ data }) => {
  return (
    <>
      <ItemLabelWrp>{data.title || data.label}</ItemLabelWrp>
      <ItemDesWrp>
        {data.description || data.data.description || data.des}
      </ItemDesWrp>
    </>
  );
};

TileComponent.propTypes = {
  data: Proptypes.object.isRequired,
};
