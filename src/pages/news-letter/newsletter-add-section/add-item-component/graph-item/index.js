import React from 'react';
import { GraphContainer, GraphImage, GraphWrp, ImageTitle } from './index.sc';
import SlotDetails from '../../../../../components/search-result/slot-details';
import PropTypes from 'prop-types';
import NewsLetterSection from '../section';

const GraphItem = ({
  graph,
  split,
  elementId,
  rowId,
  newsLetter,
  setPreviousState,
  setNewsLetter,
  data,
}) => {
  return (
    <GraphWrp id={elementId} graphType={graph?.type}>
      <GraphContainer>
        <NewsLetterSection
          setPreviousState={setPreviousState}
          newsLetter={newsLetter}
          setNewsLetter={setNewsLetter}
          rowId={rowId}
          data={data}
        />
        {split ? (
          <div>Loading</div>
        ) : graph?.type === 'chart2' ? (
          <>
            <SlotDetails widget={graph} legend={true} />
          </>
        ) : (
          <>
            <ImageTitle>{graph?.title}</ImageTitle>
            <GraphImage
              src={
                graph?.articles?.image_url
                  ? graph?.articles?.image_url
                  : graph?.image_url
              }
            />
          </>
        )}
      </GraphContainer>
    </GraphWrp>
  );
};

GraphItem.propTypes = {
  graph: PropTypes.object.isRequired,
  split: PropTypes.bool,
  rowId: PropTypes.number,
  newsLetter: PropTypes.any,
  setPreviousState: PropTypes.func,
  elementId: PropTypes.string,
  setNewsLetter: PropTypes.func,
  data: PropTypes.object,
};

export default GraphItem;
