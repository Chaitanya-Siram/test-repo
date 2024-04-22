import React, { useState, useRef, useEffect } from 'react';
import Proptypes from 'prop-types';

import { Bottomkeys } from '../../../../constants';

import {
  ActicleContentDescription,
  ActicleContentTitle,
  ArticleContentWrap,
  ArticleDefaultIconLetter,
  ArticleDescriptionWrap,
  ArticleHoverContainer,
  ArticleIcon,
  ArticleImageWrap,
  // ArticleLink,
  ArticleLinkWrp,
  ArticleWrap,
  ArticleWrapContainer,
  Articlekeytxt,
  ArticlewprZ,
  BoxArticlewpr,
  EditOption,
  SyndicationTextHover,
  ToolBarWrp,
} from './index.sc';
import ToolBar from '../add-item-component/toolbar';
import ArticleImageNAImg from '../../../../assets/img/NA for no image.svg';
import ArticleTools from '../add-item-component/article-toolbar';
import NewsLetterSection from '../add-item-component/section';
import AddArticleComponent from '../add-item-component/add-article';
import { v4 as uuidv4 } from 'uuid';
import EditArticle from '../add-item-component/edit-article';
import SelectTemplate from '../add-item-component/select-template';
import { FullTextWrapper } from '../index.sc';
import {
  DropDownCheckBox,
  DropDownValue,
  DropDownValueWrp,
} from '../add-item-component/article-toolbar/index.sc';
import EditIcon from '../../../../assets/icons/EditIcon';
import { LinkInput } from '../../../../components/edit-article-filter-component/index.sc';

// import { bottomDetails } from '../../../../constants';
// import SentimentComponent from '../../../../components/sentiment';

const NewsArticle = ({
  articles = [],
  setNewsLetter,
  newsLetter,
  rowId,
  setPreviousState,
  elementId,
  data,
  setStateNewsLetter,
  newsLetterData,
}) => {
  const [showToolBar, setShowToolbar] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(false);
  const [hideImages, setHideImages] = useState(
    !data?.columnComponent?.articleMediaShow
  );
  const [showArticlePopup, setShowArticlePopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const isModified = useRef(data?.columnComponent?.isModified || false);
  const [showInputForSyndication, setShowInputForSyndication] = useState(false);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef();
  const articlesData = () => {
    if (Array.isArray(articles?.articles)) {
      return articles?.articles?.map((x) => {
        return {
          ...x,
          uniqueId: uuidv4(),
        };
      });
    } else if (Array.isArray(articles)) {
      return articles?.map((x) => {
        return {
          ...x,
          uniqueId: uuidv4(),
        };
      });
    } else {
      return [
        {
          ...articles,
          uniqueId: uuidv4(),
        },
      ];
    }
  };
  const [mediaArticles, setMediaArticles] = useState(
    data?.columnComponent?.updatedArticleData?.map((x) => {
      return {
        ...x,
        uniqueId: uuidv4(),
      };
    }) || articlesData()
  );

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      showInputForSyndication && setShowInputForSyndication(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getOnlyValues = (Bottomkeys, ele) => {
    return Bottomkeys.map(
      (item, i) => (item?.func && item.func(ele)) || ele[item.value]
    )?.filter((x) => !!x);
  };

  function moveObjectInArray(
    obj,
    arrayOfObjects,
    type,
    uniqueProperty = 'uniqueId'
  ) {
    const index = arrayOfObjects.findIndex(
      (item) => item[uniqueProperty] === obj[uniqueProperty]
    );
    if (
      index === -1 ||
      (type === 'UP' && index === 0) ||
      (type === 'DOWN' && index === arrayOfObjects.length - 1)
    ) {
      return arrayOfObjects;
    }
    const newArray = [...arrayOfObjects];
    if (type === 'UP') {
      newArray.splice(index, 1);
      newArray.splice(index - 1, 0, obj);
    } else if (type === 'DOWN') {
      newArray.splice(index, 1);
      newArray.splice(index + 1, 0, obj);
    }

    return newArray;
  }

  const onClickOption = (option, isChecked) => {
    if (option?.value === 'remove_image_article') {
      setHideImages(isChecked);
    }
  };

  const handleClose = () => {
    setShowArticlePopup(false);
    setSelectedIndex(null);
    setInitialData(null);
  };

  const onSubmitData = (data, isEdit) => {
    const articles = [...mediaArticles];
    isModified.current = true;
    if (!isEdit) {
      articles.splice(selectedIndex + 1, 0, data);
      setMediaArticles(articles);
      updateComponentDataForRow(articles, rowId, 'updatedArticleData');
    } else {
      articles[selectedIndex] = data;
      setMediaArticles(articles);
      updateComponentDataForRow(articles, rowId, 'updatedArticleData');
    }
    handleClose();
  };

  const updateComponentDataForRow = (newComponentData, rowId, propertyName) => {
    const rowIndex = newsLetter.findIndex((row) => row.rowId === rowId);
    if (rowIndex !== -1) {
      const updatedNewsLetter = [...newsLetter];
      // Ensure rowItems array is present
      if (!updatedNewsLetter[rowIndex]) {
        updatedNewsLetter[rowIndex] = [];
      }

      // Ensure columnComponent object is present
      if (!updatedNewsLetter[rowIndex]?.columnComponent) {
        updatedNewsLetter[rowIndex] = {
          columnId: 'a', // Adjust as needed
          columnComponent: {},
        };
      }

      // Update componentData
      updatedNewsLetter[rowIndex].columnComponent[propertyName] =
        newComponentData;
      updatedNewsLetter[rowIndex].columnComponent.isModified =
        isModified.current;

      setNewsLetter(updatedNewsLetter);
      setPreviousState((prev) => ({
        ...prev,
        newsletter_body:
          updatedNewsLetter[rowIndex].columnComponent.componentData,
      }));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setStateNewsLetter &&
        setStateNewsLetter((prev) => ({
          ...prev,
          syndication_label: inputText,
        }));
      setShowInputForSyndication(false);
    }
  };

  useEffect(() => {
    setInputText(newsLetterData?.syndication_label || 'Also appeared in');
  }, [newsLetterData?.syndication_label]);

  return (
    <>
      <ArticleWrapContainer
        id={elementId}
        onMouseEnter={() => {
          setShowToolbar(true);
          setShowAddIcon(true);
        }}
        onMouseLeave={() => {
          setShowToolbar(null);
          setShowAddIcon(null);
        }}
      >
        <NewsLetterSection
          setPreviousState={setPreviousState}
          newsLetter={newsLetter}
          setNewsLetter={setNewsLetter}
          rowId={rowId}
          data={data}
          key={elementId}
        />

        {mediaArticles &&
          mediaArticles?.map((ele, i) => (
            <>
              <ArticleHoverContainer
                idx={i}
                onMouseEnter={() => {
                  setShowToolbar(i);
                }}
                onMouseLeave={() => {
                  setShowToolbar(null);
                }}
              >
                {showToolBar === i && (
                  <ArticleTools
                    wrapperClassName={'article-tool-bar'}
                    onDelete={() => {
                      isModified.current = true;
                      const articles = mediaArticles?.filter(
                        (article) => !(article?.uniqueId === ele?.uniqueId)
                      );
                      setMediaArticles(articles);
                      updateComponentDataForRow(
                        articles,
                        rowId,
                        'updatedArticleData'
                      );
                    }}
                    onClickDown={() => {
                      isModified.current = true;
                      const articles = moveObjectInArray(
                        ele,
                        mediaArticles,
                        'DOWN'
                      );
                      setMediaArticles(articles);
                      updateComponentDataForRow(
                        articles,
                        rowId,
                        'updatedArticleData'
                      );
                    }}
                    onClickUp={() => {
                      isModified.current = true;
                      const articles = moveObjectInArray(
                        ele,
                        mediaArticles,
                        'UP'
                      );
                      setMediaArticles(articles);
                      updateComponentDataForRow(
                        articles,
                        rowId,
                        'updatedArticleData'
                      );
                    }}
                    onClickEdit={() => {
                      setInitialData({
                        ...ele,
                        newsType: ele?.newsType || ele?.type,
                        imagePublicUrl: ele?.imagePublicUrl || ele?.image,
                        date: ele?.date?.split('T')[0],
                      });
                      setSelectedIndex(i);
                      setShowArticlePopup(true);
                    }}
                    onClickOption={onClickOption}
                  />
                )}
                {i === 0 && (
                  <AddArticleComponent
                    onClickAdd={() => {
                      setSelectedIndex(-1);
                      setShowArticlePopup(true);
                    }}
                    show={showAddIcon && i === 0}
                    idx={i}
                  />
                )}

                <ArticleWrap
                  key={i}
                  articleType={ele?.newsletterid ? 'manual-article' : ''}
                >
                  <ArticleContentWrap hideImages={hideImages}>
                    <ArticlewprZ>
                      <ArticleLinkWrp>
                        {/* {ele?.icon && <ArticleIcon key={i} src={ele?.icon} />}
                    {!ele.icon && (
                      <ArticleDefaultIconLetter>
                        {ele?.publication?.[0]}
                      </ArticleDefaultIconLetter>
                    )}{' '}
                    &nbsp; */}
                      </ArticleLinkWrp>
                    </ArticlewprZ>
                    <ArticleDescriptionWrap>
                      <ActicleContentTitle
                        to={ele.link}
                        target="_blank"
                        rel={ele.title}
                      >
                        {ele.title}
                      </ActicleContentTitle>
                      <ArticleLinkWrp>
                        {getOnlyValues(Bottomkeys, ele).map(
                          (item, i, array) => (
                            <BoxArticlewpr key={i}>
                              <Articlekeytxt>
                                {item}
                                {i !== array.length - 1 &&
                                  (item ? ',' : '')}{' '}
                                &nbsp;
                              </Articlekeytxt>
                            </BoxArticlewpr>
                          )
                        )}
                      </ArticleLinkWrp>
                      <ActicleContentDescription
                        articleType={ele?.newsletterid ? 'manual-article' : ''}
                      >
                        {ele.content}
                      </ActicleContentDescription>
                      {Array.isArray(ele?.syndication_data) &&
                        ele?.syndication_data?.length > 0 && (
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                            ref={inputRef}
                          >
                            {!showInputForSyndication && (
                              <SyndicationTextHover>
                                <p
                                  style={{
                                    margin: '0',
                                    fontWeight: 700,
                                    fontSize: '0.939rem',
                                  }}
                                >
                                  {inputText || 'Also appeared in'} :
                                </p>
                                <EditOption
                                  className="syndication-text"
                                  onClick={() => {
                                    setShowInputForSyndication(true);
                                  }}
                                >
                                  <EditIcon />
                                </EditOption>
                              </SyndicationTextHover>
                            )}
                            {showInputForSyndication && (
                              <LinkInput
                                type="text"
                                value={inputText}
                                onChange={(e) => {
                                  setInputText(e.target?.value);
                                }}
                                onKeyDown={handleKeyDown}
                                style={{ width: '30%' }}
                              />
                            )}
                            <div style={{ marginLeft: '0.5rem' }}>
                              {Array.isArray(ele?.syndication_data) &&
                                ele?.syndication_data
                                  ?.filter((item) => {
                                    return item?.title && item?.link;
                                  })
                                  ?.map((x, xIndex, array) => (
                                    <React.Fragment
                                      key={x?.title + x?.link + String(xIndex)}
                                    >
                                      <a
                                        style={{
                                          color: '#0563C1',
                                          fontWeight: '600',
                                          textDecoration: 'none',
                                        }}
                                        href={x?.link}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {x?.title}
                                      </a>
                                      {xIndex !== array.length - 1 && (
                                        <span
                                          style={{
                                            margin: '0 0.5rem',
                                            fontSize: '12px',
                                          }}
                                        >
                                          |
                                        </span>
                                      )}
                                    </React.Fragment>
                                  ))}
                            </div>
                          </div>
                        )}
                    </ArticleDescriptionWrap>
                  </ArticleContentWrap>
                  {!hideImages && (
                    <NewsRenderImage
                      key={i}
                      url={
                        (ele.image === 'NA' ||
                        ele.image === 'nan' ||
                        ele.image === ''
                          ? ArticleImageNAImg
                          : ele.image) ||
                        (ele.imagePublicUrl === 'NA' ||
                        ele.imagePublicUrl === 'nan' ||
                        ele.imagePublicUrl === ''
                          ? ArticleImageNAImg
                          : ele.imagePublicUrl)
                      }
                    />
                  )}
                  {/* <ArticleImageWrap
                imageUrl={
                  ele.image ||
                  (ele.imagePublicUrl === 'NA'
                    ? Img.ArticlePlaceholder
                    : ele.imagePublicUrl)
                }
              ></ArticleImageWrap> */}
                </ArticleWrap>
                <div style={{ marginTop: '0.5rem' }}></div>

                <AddArticleComponent
                  onClickAdd={() => {
                    setSelectedIndex(i);
                    setShowArticlePopup(true);
                  }}
                  show={showAddIcon}
                  idx={i}
                />
              </ArticleHoverContainer>

              <hr
                style={{
                  margin: 0,
                  opacity: showAddIcon ? 0 : 0.3,
                }}
              />
            </>
          ))}
        {showArticlePopup && (
          <EditArticle
            onSubmit={onSubmitData}
            handleClose={handleClose}
            btnTxt={'Done'}
            initialData={initialData}
          />
        )}
        {/* <BackToTop /> */}
      </ArticleWrapContainer>
      {mediaArticles?.length > 0 && (
        <FullTextWrapper className="show-text">
          <DropDownValueWrp
          // onClick={(e) => onClickOption(dropdown, e.target.checked, e)}
          >
            <DropDownCheckBox
              type="checkbox"
              checked={hideImages}
              onChange={(e) => {
                setHideImages(e.target.checked);
                updateComponentDataForRow(
                  !e.target.checked,
                  rowId,
                  'articleMediaShow'
                );
              }}
            />
            <DropDownValue>Full Text</DropDownValue>
          </DropDownValueWrp>
        </FullTextWrapper>
      )}
    </>
  );
};

NewsArticle.propTypes = {
  articles: Proptypes.any,
  setNewsLetter: Proptypes.func,
  rowId: Proptypes.number,
  newsLetter: Proptypes.any,
  setPreviousState: Proptypes.func,
  elementId: Proptypes.string,
  data: Proptypes.object,
  setStateNewsLetter: Proptypes.func,
  newsLetterData: Proptypes.any,
};

const NewsRenderImage = ({ url }) => {
  const [_isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  return (
    <ArticleImageWrap
      src={`${hasError ? ArticleImageNAImg : url}`}
      alt="article thumbnail"
      onLoad={handleImageLoad}
      onError={handleImageError}
      // style={{
      //   width: '100%',
      //   height: '100%',
      //   objectFit: 'cover',
      // }}
    />
  );
};

NewsRenderImage.propTypes = {
  url: Proptypes.string,
};
export default NewsArticle;
