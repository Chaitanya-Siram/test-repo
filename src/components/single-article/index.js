import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ArticleWrp,
  MainWrapper,
  HeaderWrp,
  TimeText,
  DescriptWrp,
  FooterTag,
  ImageWrp,
  ArticleLink,
  CircleIcon,
  Hoverwpr,
  PopItem,
  Popoverwpr,
  UpperRight,
  Iconwpr,
  MainArticleWrapper,
} from './index.sc';
import Growellips from '../../assets/icons/Growellips';
import { VerticleDots } from '../../assets/icons/VerticleDots';

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
  showPop: PropTypes.bool,
};

const SingleArticle = ({ items }) => {
  const data = items?.data;
  const [showPop, setShowPop] = useState(false);
  const [hoverEff, sethoverEff] = useState(false);
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
    sethoverEff(true);
  };

  const handleCircleIconLeave = () => {
    sethoverEff(false);
    setShowPop(false);
  };
  return (
    <MainArticleWrapper>
      <ArticleWrp
        full={items?.full}
        onMouseEnter={handleCircleIconEnter}
        onMouseLeave={handleCircleIconLeave}
      >
        <MainWrapper>
          <HeaderWrp>
            <TimeText>12:05 PM, JUL 22</TimeText>
            <UpperRight show={hoverEff}>
              <CircleIcon>
                <Growellips />
                <Hoverwpr target="_blank" to={data?.url}>
                  Analyze Story
                </Hoverwpr>
              </CircleIcon>
              <Iconwpr ref={popRef} onClick={() => setShowPop(!showPop)}>
                <VerticleDots color="#5C5E60" />
                <Popover showPop={showPop} />
              </Iconwpr>
            </UpperRight>
          </HeaderWrp>
          <ArticleLink to={data?.url} target="_blank" rel="noopener noreferrer">
            <DescriptWrp show={hoverEff}>{data?.description}</DescriptWrp>
          </ArticleLink>
        </MainWrapper>
        <FooterTag>{data?.publisher}</FooterTag>
      </ArticleWrp>
      {items?.full && (
        <ImageWrp full={items?.full} src={data?.imgURL} alt="Image" />
      )}
    </MainArticleWrapper>
  );
};

SingleArticle.propTypes = {
  items: PropTypes.object,
};

export default SingleArticle;
