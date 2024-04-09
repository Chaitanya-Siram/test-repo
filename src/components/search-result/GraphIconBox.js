import React, { useEffect, useRef } from 'react';
import { GraphIconBoxwpr, Iconwpr } from './index.sc';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import Share from '../../assets/icons/Share';
import PropTypes from 'prop-types';
import CircularLoading from '../../assets/icons/loading/circularLoading';
import Tooltip from '../icon-tooltip';
const GraphIconBox = ({
  fixed = true,
  downloadClickFunction,
  downloading,
  handleShowAddToCanvas = () => {},
  isAdvanced = false,
  setIsClickOutside,
}) => {
  const graphRef = useRef();

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (graphRef.current && !graphRef.current.contains(event.target)) {
      setIsClickOutside && setIsClickOutside(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <GraphIconBoxwpr fixed={fixed} ref={graphRef}>
      <Tooltip content="Download">
        <Iconwpr onClick={downloadClickFunction}>
          {downloading ? (
            <CircularLoading
              bgColor="#ffffff"
              size="0.25rem"
              width="1rem"
              height="1rem"
            />
          ) : (
            <DownloadIcon color="white" />
          )}
        </Iconwpr>
      </Tooltip>

      <Tooltip content="Share">
        <Iconwpr>
          <Share color="white" />
        </Iconwpr>
      </Tooltip>
      {/* {!isAdvanced && (
        <Tooltip content="Add to Canvas">
          <Iconwpr onClick={handleShowAddToCanvas}>
            <AddCanvasIcon color="white" />
          </Iconwpr>
        </Tooltip>
      )} */}
    </GraphIconBoxwpr>
  );
};

GraphIconBox.propTypes = {
  fixed: PropTypes.bool,
  downloadClickFunction: PropTypes.func,
  downloading: PropTypes.bool,
  handleShowAddToCanvas: PropTypes.func,
  isAdvanced: PropTypes.bool,
  setIsClickOutside: PropTypes.func,
};
export default GraphIconBox;
