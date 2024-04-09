import React, { useState, useEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import {
  Bottomwpr,
  CircleIcon,
  Containerwpr,
  Descwpr,
  Hoverwpr,
  Iconwpr,
  Infowpr,
  PopItem,
  Popoverwpr,
  UpperRight,
  Upperleft,
  Upperwpr,
} from './index.sc';
import { VerticleDots } from '../../assets/icons/VerticleDots';
import Growellips from '../../assets/icons/Growellips';

const Popover = ({ showPop = false }) => {
  const handlePopoverClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Popoverwpr show={showPop} onClick={handlePopoverClick}>
      <PopItem>Hide this article</PopItem>
      <PopItem>Remove from Canvas</PopItem>
    </Popoverwpr>
  );
};

Popover.propTypes = {
  showPop: Proptypes.bool,
};

const HalfFull = ({ data, full, onClick }) => {
  console.log(data, full);
  const [showPop, setShowPop] = useState(false);
  const [hoverEff, sethoverEff] = useState(false);
  const [hoverEff2, sethoverEff2] = useState(false);
  const popRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popRef.current && !popRef.current.contains(event.target)) {
      setShowPop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleCircleIconEnter = () => {
    sethoverEff2(true);
    setTimeout(() => {
      sethoverEff(true);
    }, 300);
  };

  const handleCircleIconLeave = () => {
    sethoverEff2(false);
    setTimeout(() => {
      sethoverEff(false);
    }, 300);
  };

  return (
    <Containerwpr imgURL={data.imgURL} onClick={onClick}>
      <Upperwpr>
        <Upperleft>
          {/* {data.full && <FulLabelwpr>{data.labelfull}</FulLabelwpr>}
          {data.full && <FullTitlewpr>{data.titlefull}</FullTitlewpr>} */}
        </Upperleft>
        <UpperRight>
          <CircleIcon
            onMouseEnter={handleCircleIconEnter}
            onMouseLeave={handleCircleIconLeave}
          >
            <Growellips />
            {hoverEff && hoverEff2 && (
              <Hoverwpr target="_blank" to={data.url} show={hoverEff2}>
                Analyze story
              </Hoverwpr>
            )}
          </CircleIcon>
          <Iconwpr ref={popRef} onClick={() => setShowPop(!showPop)}>
            <VerticleDots color="#ffffff" />
            <Popover showPop={showPop} />
          </Iconwpr>
        </UpperRight>
      </Upperwpr>
      <Bottomwpr>
        <Descwpr>{data.description}</Descwpr>
        <Infowpr>
          {data.publisher} | {data.author} | {data.date} | {data.place} |{' '}
          {data.newstype}{' '}
        </Infowpr>
      </Bottomwpr>
    </Containerwpr>
  );
};

HalfFull.propTypes = {
  data: Proptypes.object,
  full: Proptypes.bool,
  onClick: Proptypes.func,
};

export default HalfFull;
