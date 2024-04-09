import React, { useEffect, useState } from 'react';
import { useNewsLetterData } from '../../hooks/useSearch';
import styled from 'styled-components';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import Proptypes from 'prop-types';
import NewsArticle from '../../pages/news-letter/newsletter-add-section/news-article';
import GraphItem from '../../pages/news-letter/newsletter-add-section/add-item-component/graph-item';
import TextItem from '../../pages/news-letter/newsletter-add-section/add-item-component/text-item';
import { formatDate } from '../../utils';
import { useNewsLetterDataById } from '../../hooks/useSaveNewsLetter';
export const TopBarWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightblue;
  padding: 0.5rem 0.9375rem;
  border: 1px solid ${({ theme }) => theme.borders};
  background: ${({ theme }) => theme.background};
`;
export const ButtonWpr = styled.div`
  display: flex;
  gap: 0.6875rem;
  align-items: center;
`;
export const CrossButtonWrp = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  transform: rotate(180deg);
`;
export const TitleText = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02875rem;
  margin: 0;
  padding: 0;
`;

// NewsLetterMiddleBar
export const NewsLetterBackground = styled.div`
  height: 17.45rem;
  background: #c3c7d9;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  margin: 0 auto;
`;

export const TitleBox = styled.div`
  height: 15rem;
  background: ${({ theme }) => theme.primary};
  padding: 2rem 3.94rem 2.21rem 2.44rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.875rem;
  width: 80vw;
`;

export const NewsletterTitle = styled.h3`
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  line-height: 2.5rem;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

export const TitleBoxWrp = styled.div``;

export const NewsletterTitleText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.188rem;
  letter-spacing: -0.02rem;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

export const TitleBoxBottomWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleBoxBottomText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 1;
  line-height: 1.188rem;
  letter-spacing: -0.02rem;
  color: #ffffff;
  margin: 0;
  padding: 0;
`;

// Newsletter Add section
export const NewsLetterWrp = styled.div`
  width: 80vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.25rem;
`;

export const NewsLetterRow = styled.div`
  background-color: #fff;
  padding: 1.25rem;

  position: relative;
  display: ${(props) => (props.split ? 'grid' : 'flex')};
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  margin-bottom: 1rem;
  gap: 0rem 1rem;
  &:hover .tool-bar-wrp {
    visibility: visible;
  }
`;
export const NewsLetterComponentWrp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AddRowWrp = styled.div`
  position: relative;
  width: 100%;
  height: 16.625rem;
  margin-bottom: 4rem;
`;

export const ToolBarWrp = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0px;
  right: -2.625rem;
  width: 2.5rem;
  height: 8rem;
  display: flex;
  justify-content: flex-end;
`;

const NewsLetterTopBar = ({ newsLetterData }) => {
  return (
    <TopBarWrp>
      <ButtonWpr>
        <CrossButtonWrp>
          <ArrowLeft color={'#656B8A'} width="2rem" />
        </CrossButtonWrp>
        <TitleText>{newsLetterData?.newLetterTitle}</TitleText>
      </ButtonWpr>
    </TopBarWrp>
  );
};

const NewsLetterMiddleSection = ({ newsLetterData }) => {
  return (
    <NewsLetterBackground>
      <TitleBox>
        <TitleBoxWrp>
          <NewsletterTitle>{newsLetterData?.bannerTitle}</NewsletterTitle>
          <NewsletterTitleText>
            This is a placeholder text used for demonstration purposes. Please
            replace this text with your own content when you are ready.
          </NewsletterTitleText>
        </TitleBoxWrp>
        <TitleBoxBottomWrp>
          <TitleBoxBottomText>AlphametricX</TitleBoxBottomText>
          <TitleBoxBottomText>
            Published On:{newsLetterData?.publishedOn}
          </TitleBoxBottomText>
        </TitleBoxBottomWrp>
      </TitleBox>
    </NewsLetterBackground>
  );
};

const NewsLetterAddSection = ({ data, searchSelect, newsLetterData }) => {
  const [newsLetter, setNewsLetter] = useState([]);

  useEffect(() => {
    if (newsLetterData) {
      setNewsLetter(newsLetterData.newsletter_body);
    }
  }, [newsLetterData]);

  return (
    <NewsLetterWrp>
      {newsLetter?.map((ele, i) => (
        <NewsLetterRow split={ele.rowSplit} key={`news-letter-row-${i}`}>
          {ele.rowItems.map((rowItem, j) => (
            <NewsLetterComponentWrp key={`news-letter-row-${i}-column-${j}`}>
              {rowItem.componentType === 'text' ? (
                <TextItem
                  title={rowItem.componentData.title}
                  description={rowItem.componentData.description}
                />
              ) : rowItem.componentType === 'article' ? (
                <NewsArticle
                  articles={rowItem.componentData}
                  searchSelect={searchSelect}
                />
              ) : rowItem.componentType === 'graph' ? (
                <GraphItem graph={rowItem.componentData} />
              ) : (
                <></>
              )}
            </NewsLetterComponentWrp>
          ))}
        </NewsLetterRow>
      ))}
    </NewsLetterWrp>
  );
};

NewsLetterAddSection.propTypes = {
  data: Proptypes.array,
  searchSelect: Proptypes.string,
  newsLetterData: Proptypes.object,
};

const NewsLetterPdf = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const newsLetterId = urlParams.get('newsLetterId');
  // const { data: newsLetterData } = useNewsLetterData(newsLetterId);
  const { data: newsLetterData } = useNewsLetterDataById(newsLetterId);
  const [stateNewsLetter, setStateNewsLetter] = useState({});
  const [searchSelect, setSearchSelect] = useState('');
  useEffect(() => {
    if (newsLetterData?.data) {
      setStateNewsLetter(newsLetterData?.data?.data);
    }
    if (newsLetterData?.data?.data?.searchId) {
      setSearchSelect(newsLetterData?.data?.data?.searchId);
    }
  }, [newsLetterData]);

  return (
    <>
      {/* <NewsLetterTopBar newsLetterData={stateNewsLetter} /> */}
      <NewsLetterMiddleSection newsLetterData={stateNewsLetter} />
      <NewsLetterAddSection
        newsLetterData={stateNewsLetter}
        searchSelect={searchSelect}
      />
    </>
  );
};

NewsLetterPdf.propTypes = {};
NewsLetterTopBar.propTypes = {
  newsLetterData: Proptypes.any,
};
NewsLetterMiddleSection.propTypes = {
  newsLetterData: Proptypes.object,
};

export default NewsLetterPdf;
