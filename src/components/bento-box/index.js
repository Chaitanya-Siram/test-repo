/* eslint-disable indent */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import LeftIcon from './assets/icons/LeftIcon';
// import RightIcon from './assets/icons/RightIcon';
import {
  BoxBody,
  // BoxHeader,
  // BoxTitle,
  GridBox,
  GridCol,
  GridContainer,
  GridContainerWrapper,
  // IconButton,
  Wrapper,
} from './index.sc';
import DelayLoading from './DelayLoading';

export const getComponent = (ele, activeBox, index, i) => {
  const invertIndex = index === 1 ? 0 : 1;
  return activeBox.row === index && activeBox.col === i
    ? ele[index]?.components?.l2
    : activeBox.row === invertIndex && activeBox.col === i
    ? ele[index]?.components?.l0
    : ele[index]?.components?.l1;
};

const BentoBox = ({ colWidth, colCount, gridGap, boxes }) => {
  const activeColWidth = colWidth * 1.75;
  // const boxes = [...Array(colCount).keys()];
  const [activeBox, setActiveBox] = useState({
    col: 0,
    row: 0,
  }); // [col, row]
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [hideLeftArrow, setHideLeftArrow] = useState(true);
  // const [hideRightArrow, setHideRightArrow] = useState(false);

  const handlePartialBoxVisibility = (boxIndex) => {
    const container = containerRef.current;
    const colContainer = container.children[0];
    const box = colContainer.children[boxIndex];
    const containerRect = container.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();

    if (boxRect.left < containerRect.left) {
      container.scrollTo({
        left: box.offsetLeft - 100,
        behavior: 'smooth',
      });
    } else if (boxRect.right > containerRect.right) {
      container.scrollTo({
        left: box.offsetLeft + box.offsetWidth - container.offsetWidth + 100,
        behavior: 'smooth',
      });
    }
  };

  // const handleScroll = (direction) => {
  //   const container = containerRef.current;

  //   if (direction === 'left') {
  //     container.scrollTo({
  //       left: container.scrollLeft - colWidth * 16,
  //       behavior: 'smooth',
  //     }); // Adjust the scroll amount as needed
  //   } else if (direction === 'right') {
  //     container.scrollTo({
  //       left: container.scrollLeft + colWidth * 16,
  //       behavior: 'smooth',
  //     }); // Adjust the scroll amount as needed
  //   }

  //   // setScrollPosition(container.scrollLeft);
  // };
  const [transEnd, setTransEnd] = useState(true);
  const [transEndi, setTransEndi] = useState(0);
  const [transEndp, setTransEndp] = useState(0);

  const handleBoxClick = (col, row) => {
    if (activeBox.row !== row || transEndi !== col) {
      setTransEnd(false);
      setTransEndp(transEndi);
      setTransEndi(col);
    }
    setActiveBox({
      col,
      row,
    });
    handlePartialBoxVisibility(col);
  };

  const handleTransitionEnd = (i) => {
    setTransEnd(true);
  };

  return (
    <Wrapper>
      <GridContainerWrapper
        ref={containerRef}
        className="grid-container-wrapper"
      >
        <GridContainer gridGap={gridGap} className="grid-container">
          {boxes.map((ele, i) => {
            return (
              <GridCol
                key={`grid-col-${i}`}
                className={`col ${activeBox.col === i ? 'active' : ''}`}
                colWidth={colWidth}
                activeColWidth={activeColWidth}
                gridGap={gridGap}
                ref={boxRef}
                onTransitionEnd={() => handleTransitionEnd(i)}
              >
                {!(ele[0].label === 'Dummy') ? (
                  <GridBox
                    gridGap={gridGap}
                    className={`box ${
                      activeBox.row === 0 ? 'active' : 'inactive'
                    }`}
                    onClick={() => handleBoxClick(i, 0)}
                  >
                    {/* <BoxHeader>
                    <BoxTitle>{ele[0]?.label}</BoxTitle>
                  </BoxHeader> */}
                    <BoxBody>
                      {transEndi === i || transEndp === i ? (
                        transEnd &&
                        (ele[0]?.title === 'Geographical Breakdown' ? (
                          <DelayLoading
                            ele={ele}
                            activeBox={activeBox}
                            row={0}
                            i={i}
                          />
                        ) : (
                          getComponent(ele, activeBox, 0, i)
                        ))
                      ) : ele[0]?.title === 'Geographical Breakdown' ? (
                        <DelayLoading
                          ele={ele}
                          activeBox={activeBox}
                          row={0}
                          i={i}
                        />
                      ) : (
                        getComponent(ele, activeBox, 0, i)
                      )}
                    </BoxBody>
                  </GridBox>
                ) : (
                  ''
                )}
                {!(ele[1].label === 'Dummy') ? (
                  <GridBox
                    gridGap={gridGap}
                    className={`box ${
                      activeBox.row === 1 ? 'active' : 'inactive'
                    }`}
                    onClick={() => handleBoxClick(i, 1)}
                  >
                    {/* <BoxHeader>
                    <BoxTitle>{ele[1]?.label}</BoxTitle>
                  </BoxHeader> */}
                    <BoxBody>
                      {transEndi === i || transEndp === i ? (
                        transEnd &&
                        (ele[1]?.title === 'Geographical Breakdown' ? (
                          <DelayLoading
                            ele={ele}
                            activeBox={activeBox}
                            row={1}
                            i={i}
                          />
                        ) : (
                          getComponent(ele, activeBox, 1, i)
                        ))
                      ) : ele[1]?.title === 'Geographical Breakdown' ? (
                        <DelayLoading
                          ele={ele}
                          activeBox={activeBox}
                          row={1}
                          i={i}
                        />
                      ) : (
                        getComponent(ele, activeBox, 1, i)
                      )}
                    </BoxBody>
                  </GridBox>
                ) : (
                  ''
                )}
              </GridCol>
            );
          })}
        </GridContainer>
      </GridContainerWrapper>
      {/* <IconButton
        className="scroll-arrow left-arrow"
        onClick={() => handleScroll('left')}
      >
        <LeftIcon />
      </IconButton>
      <IconButton
        className="scroll-arrow right-arrow"
        onClick={() => handleScroll('right')}
      >
        <RightIcon />
      </IconButton> */}
    </Wrapper>
  );
};

export default BentoBox;

BentoBox.propTypes = {
  colWidth: PropTypes.number,
  colCount: PropTypes.number,
  gridGap: PropTypes.number,
  boxes: PropTypes.array,
};
