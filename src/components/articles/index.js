/* eslint-disable array-callback-return */
// import React from 'react';
// import { ArticleComponent } from 'article-component';
// import ArticleImg from './assets/img2.jpg';
// import {
//   SectionSubContent,
//   SentimentContainer,
// } from 'article-component/src/index.sc';

// const title =
//   'Few Parents intend to have very Young Children Vaccinated Against Covid';

// const content =
//   'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti magnam aspernatur perspiciatis, minus ex est quis. Consequatur dolor earum unde ex sit labore iste, praesentium mollitia. Ullam non possimus totam? Eum sapiente vel nisi minima itaque! Consequatur laborum odio fugiat nisi, quas at non impedit. Deleniti, fugiat ea, ex, sint omnis culpa alias esse quidem natus ducimus maiores. Ducimus, enim? Doloribus adipisci soluta earum labore ut quis aliquid quas eos esse. Minus quod quidem obcaecati, cum, tempora ad ex expedita quis in voluptatibus sit sequi deleniti? Consectetur qui veniam aperiam Omnis, culpa. Eum aperiam modi consequuntur? Quae nulla rerum sit commodi. Ad commodi doloremque suscipit praesentium, soluta ullam, consequatur tempore, ut animi natus officia dolore hic voluptate sit odio reiciendis';

// const footerDescription = [
//   {
//     name: 'www.wsj.com',
//     url: 'http://www.wsj.com',
//   },
//   {
//     name: 'Publised on 05 June 2021',
//   },
//   {
//     name: 'New York, US',
//   },
//   {
//     name: '12 Matching Keywords',
//   },
//   {
//     name: 'Online News',
//   },
// ];
// // const footerDescription =
// //   "www.wsj.com | Published on 05 June 2021 | New York, US | 12 Matching Keywords | Online News";
// const info = [
//   { heading: 'Matches', value: 'Covid Vaccine' },
//   { heading: 'Reach', value: '1.6M' },
//   { heading: 'AVE', value: '~ $1.5M' },
//   { heading: 'Syndication', value: '1.6M' },
// ];
// const menuOptions = [
//   'Option1',
//   'Option2',
//   'Option3',
//   'Option4',
//   'Option5',
//   'Option6',
//   'Option7',
// ];

// const FooterComponent = ({ footerContent = [] }) => {
//   return (
//     <SectionSubContent>
//       {footerContent.map((content, i) => {
//         return (
//           <span key={i}>
//             {content.name} {' | '}
//           </span>
//         );
//       })}
//     </SectionSubContent>
//   );
// };

// const handleAction = (value) => {
//   console.log(value, ' -- value');
// };

// const ArticleComponentViewer = () => {
//   return (
//     <div style={{ width: '42.93rem', height: '220px' }}>
//       <ArticleComponent
//         title={title}
//         content={content}
//         footer={<FooterComponent footerContent={footerDescription} />}
//         articleImg={ArticleImg}
//         info={info}
//         menuOptions={menuOptions}
//         handleAction={handleAction}
//         sentiment={<SentimentComponent icon="😊" sentiment="Positive" />}
//       />
//     </div>
//   );
// };
// export default ArticleComponentViewer;

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import Comment from '../../assets/icons/Comment';
import { Bottomkeys, bottomDetails } from '../../constants';
import SentimentComponent from '../sentiment';
import TagIcon from '../../assets/icons/TagIcon';
// import ThemeIcon from '../../assets/icons/ThemeIcon';
import { useSelector } from 'react-redux';
import { theme } from '../../constants/theme';
// import GrowthIcon from '../../assets/icons/GrowthIcon';
import CommentBox from './hover-poovers/CommentBox';
import Popover from './hover-poovers';
import TagBox from './hover-poovers/TagBox';
// import CheckboxIcon from '../../assets/icons/CheckboxIcon';
// import CheckboxV2 from '../../assets/icons/CheckboxV2';
import KeywordPopover from '../keyword-popover';
import CheckboxIcon from '../../assets/icons/CheckboxIcon';
import { formatNumber } from '../../utils';
import PortalTooltip from '../portal-tooltip';
import Tooltip from '../icon-tooltip';
import BookMarkIcon2 from '../../assets/icons/BookMarkIcon2';
import toast from 'react-hot-toast';
import { axiosPostRequestAPI, axiosDeleteAPI } from '../../service';
import { useMutation } from '@tanstack/react-query';
import ArticleImageNAImg from '../../assets/img/NA for no image.svg';
import { VerticleDots } from '../../assets/icons/VerticleDots';
import SimpleReusableDropDown from '../simple-dropdown';
import {
  // useGetCreateCommentBySearchId,
  // useGetCreateTagBySearchId,
  useHiddenArticlesByArticleId,
  useUnHideArticlesById,
} from '../../hooks/useSearch';
// import { getTokenData } from '../../constants/validateToken';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

const ArticlesWrp = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100% - 2rem);
  overflow: auto;
  padding-bottom: 4.3rem;
  justify-content: space-between;
  ${({ articleView }) =>
    articleView &&
    css`
      width: 100%;
      gap: 1rem;
      margin: auto;
      flex-direction: row;
      flex-wrap: wrap;
    `}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArticleMainWrp = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #ccc;
  /* padding-bottom: 0.25rem; */
  ${({ articleView }) =>
    articleView &&
    css`
      display: flex;
      gap: 1rem;
      width: calc(50% - 1rem);
      min-height: 13rem;
    `}/* &:hover > .article-bottom {
    opacity: 1;
  } */
`;
const ArticleWrp = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const ArticlewrpBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  padding: 0.5rem 0 0.7rem 0;
`;

export const ArticleAndIconWrp = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ArticleLinkSection = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 0 0 0.8rem 0;
`;

const ArticleWrpL = styled.div`
  margin-left: auto;
  width: 6.8125rem;
  height: 6.8125rem;
  ${({ articleView }) =>
    articleView &&
    css`
      width: 7rem;
      height: 7rem;
    `}
`;
const ArticleWrpR = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  /* ${({ articleView }) =>
    articleView &&
    css`
      width: calc(100% - 8rem);
    `} */
`;

const ArticlewprZ = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// const ArticleImg = styled.div`
//   width: 100%;
//   height: 100%;
//   background-image: ${({ src }) => `url(${src})`};
//   background-size: cover;
//   background-position: inherit;
// `;
const ArticleTextImgWrp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;

const ArticleTitletWrp = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const ArticleTitle = styled(Link)`
  font-weight: 600;
  display: -webkit-box;
  font-size: 1rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.secondaryText};
  font-family: Inter;
  font-style: normal;
  line-height: 1.5rem;
  letter-spacing: -0.32px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.primary};
  }
`;
const ArticleBody = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.closeButton};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: 1.1875rem;
  letter-spacing: -0.24px;
`;
const ArticleLinkWrp = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.3rem;
  width: 100%;
  flex-wrap: wrap;
`;

const Articlekeytxt = styled.div`
  text-decoration: none;
  margin-right: 0.1rem;
  color: ${({ theme }) => theme.closeButton};
  font-weight: 500;
  font-size: 0.75rem;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 8rem;
  font-family: Inter;
  font-style: normal;
  line-height: 1rem;
  letter-spacing: -0.24px;
`;

const ArticleIcon = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
`;

const ArticleDefaultIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #c3cce8; */
  background: linear-gradient(180deg, #b5c1e5 0%, #a8afce 100%);
  color: white;
  border-radius: 6px;
  text-transform: uppercase;
`;

const BoxArticlewpr = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.closeButton};
  font-weight: 500;
  font-size: 0.75rem;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 10rem;
  font-family: Inter;
  font-style: normal;
  line-height: 1rem;
  letter-spacing: -0.24px;
  display: inline-block;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const ArticleBottomWrp = styled.div`
  /* opacity: ${({ articleView }) => (articleView ? '1' : '0')}; */
  /* position: ${({ articleView }) =>
    articleView ? 'relative' : 'absolute'}; */
  /* width: 1.25rem; */
  /* height: 100%; */
  /* padding: 0.5rem; */
  background: #ffffff;
  ${({ articleView }) =>
    !articleView &&
    css`
      /* bottom: 0; */
      /* border-top: 1px solid #ccc; */
      /* border-bottom: 1px solid #ccc; */
    `}

  display: flex;
  /* flex-direction: column; */
  /* gap: 0.5rem; */
  transition: all 400ms ease-in-out;
  /* position: relative; */
`;
const ArticleTextDetailsWrp = styled.div`
  display: flex;
  gap: 0.25rem 0.5rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  /* overflow-x: scroll; */
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ articleView }) =>
    articleView &&
    css`
      flex-wrap: wrap;
      gap: 1rem;
    `}
`;
const IconBoxwpr = styled.div`
  align-items: center;
  gap: 0.125rem;
  display: flex;
  background-color: #fff;
  border-radius: 0.3rem;
  min-width: fit-content;
  width: fit-content;
  overflow: hidden;
`;
const ArticleActionDetailsWrp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
`;
const ArticleTextWrp = styled.div`
  display: flex;
  font-size: 0.75rem;
  align-items: center;
  gap: 0.25rem;
`;
const ArticleTextLabel = styled.div`
  color: ${({ theme }) => theme.closeButton};
  font-family: Inter;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.26px;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
`;
const ArticleTextValue = styled.div`
  position: relative;
  color: ${({ theme, itemType }) =>
    itemType === 'syndication' || itemType === 'matches'
      ? theme.primary
      : theme.closeButton};
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  &:hover {
    cursor: ${({ itemType }) =>
      (itemType === 'syndication' || itemType === 'matches') && 'pointer'};
  }
`;

const SyndicationButton = styled.button`
  color: ${({ theme, isZero }) =>
    isZero ? theme.disabledBtnBackground : theme.primary};
  background: transparent;
  border: none;
  outline: none;
  font-weight: 700;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const KeywordPopoverWrap = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ArticleIconWrp = styled.div`
  position: relative;
  cursor: pointer;
  svg {
    width: 100%;
  }
`;
const IconMarker = styled.div`
  position: absolute;
  top: -5px;
  right: 0;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  height: 0.4rem;
  width: 0.4rem;
`;

const CheckBoxWrp = styled.div`
  padding-top: 0.2rem;
  &:hover {
    cursor: pointer;
  }
`;

// const ArticleWrpR = styled.div``;

const ArticleCmtWrp = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  gap: ${({ bg }) => (bg ? '0.5rem' : '1.5rem')};
  background-color: ${({ bg }) => bg || '#fffeee'};
`;

const ArticleCmt = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 12px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: -0.02em;
  text-align: left;
`;

const ArticleTags = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.25rem 0.625rem 0.2rem;
  align-items: center;
  font-size: 0.75rem;
  height: fit-content;
  /* color: ${({ theme }) => theme.secondaryText}; */
  color: #fff;
  border-radius: 0.75rem;
  /* border: 1px solid; */
  background-color: ${({ theme }) => theme.tagsBorderColor};
`;

const IconsPop = ({
  Icon,
  PopContent,
  data,
  width,
  height,
  tooltipText,
  mark,
  setTriggerFetchUseEffect,
  storeArticleCommentsTags,
  setStoreTags,
  setStoreComments,
}) => {
  const textData = () => {
    if (data?.ele?.comment) {
      return data?.ele?.comment;
    } else if (data?.storeComments) {
      const filteredComment = data?.storeComments.filter(
        (comment) => comment?.article_id === data?.article_id
      );
      return filteredComment?.content;
    }
    return null;
  };
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const iconPopRef = useRef(null);

  useEffect(() => {
    setText(textData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.ele]);

  // const selectedTheme = useSelector((store) => {
  //   return store?.theme.theme || {};
  // });

  const handleClickOutside = (event) => {
    if (iconPopRef.current && !iconPopRef.current.contains(event.target)) {
      setShow(false);
      document.removeEventListener('click', handleClickOutside);
    }
  };
  document.addEventListener('click', handleClickOutside);
  const handleShow = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  return (
    <>
      <ArticleIconWrp onClick={handleShow} ref={iconPopRef}>
        {show && (
          <Popover
            InnerChild={PopContent}
            data={data || {}}
            setShow={setShow}
            setText={setText}
            text={text}
            setTriggerFetchUseEffect={setTriggerFetchUseEffect}
            storeArticleCommentsTags={storeArticleCommentsTags}
            setStoreTags={setStoreTags}
            setStoreComments={setStoreComments}
          />
        )}
        <Tooltip content={tooltipText}>
          <Icon
            color={data?.tagData || show ? '#cf326b' : '#fff'}
            width={width}
            height={height}
            istrue={data?.commentData || show}
            fill={data?.tagData || show ? '#cf326b' : '#585858'}
            fill2={data?.tagData || show ? '#fff' : '#585858'}
          />
        </Tooltip>

        {mark && <IconMarker />}
      </ArticleIconWrp>
    </>
  );
};

IconsPop.propTypes = {
  Icon: PropTypes.any,
  PopContent: PropTypes.any,
  data: PropTypes.any,
  width: PropTypes.string,
  height: PropTypes.string,
  tooltipText: PropTypes.string,
  mark: PropTypes.bool,
  setTriggerFetchUseEffect: PropTypes?.func,
  storeArticleCommentsTags: PropTypes?.func,
  setStoreTags: PropTypes.func,
  setStoreComments: PropTypes.func,
  hiddenArticleTigger: PropTypes.bool,
};

const Articles = ({
  syndicationClickData,
  articles,
  articleView,
  page,
  type,
  showTab,
  floatingPagination,
  handleChecked,
  checked,
  savedSearchId,
  allChecked,
  setSydicationActive,
  setSydicationArticles,
  sydicationActive,
  sydicationArticles,
  allHiddenArticles,
  articlesRecentSearchId,
  setSyndicationClick,
  setClickedPosition,
  setTriggerFetchUseEffect,
  storeArticleCommentsTags,
  storeComments,
  setStoreComments,
  storeTags,
  hiddenArticleTigger,
  setHiddenArticle,
  hiddenArticle,
  setStoreTags,
  name,
  refetchHiddleArticles,
  showFullTitle = true,
  bookmarksLocal,
  hiddenArticlesLocal,
}) => {
  // const queryClient = useQueryClient();
  // const userReqDetails = getTokenData();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [openActionDropdown, setOpenActionDropDown] = useState(false);
  const [openedArticleData, setOpenedArticleData] = useState({});
  const [hoveredArticle, setHoveredArticle] = useState(null);

  const showOptRef = useRef();

  const { state } = useLocation();

  const handlePopoverEnter = (event, articleIndex) => {
    const { top, left } = event?.target?.getBoundingClientRect();
    setShowPopover(true);
    setHoveredArticle(articleIndex);
    setPopoverPosition({
      left: left + 20,
      top: top + 5,
    });
  };

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 210,
    minHeight: 210,
  });

  //   const updateBookmark = (payload) => {
  //   return axiosPutRequest('/articles', {}, payload);
  // };

  // const { mutate: addBookmark } = useMutation({ mutationFn: updateBookmark });

  // const handleBookmark = (ele) => {
  //   const { bookmark, id } = ele;
  //   const payload = {
  //     bookmark: !bookmark,
  //     id,
  //   };
  //   addBookmark(payload);
  // };
  // const { mutate: addBookmark } = useMutation({ updateBookmark, { onSuccess: () => { queryClient.invalidateQueries('getArticleData')}} });

  const updateBookmark = (payload) => {
    return axiosPostRequestAPI('/search-articles/bookmark', {}, payload);
  };

  const removeBookmark = (payload) => {
    return axiosDeleteAPI('/search-articles/bookmark', {}, payload);
  };

  const { mutateAsync: addBookmark } = useMutation({
    mutationFn: updateBookmark,
  });
  const { mutateAsync: deleteBookmark } = useMutation({
    mutationFn: removeBookmark,
  });

  const handleBookmark = async (ele) => {
    try {
      const { articleId } = ele;
      const bookmarked = getIsBookmarked(ele);
      const payload = {
        recent_search_id: recentSearchId || articlesRecentSearchId,
        article_id: articleId,
      };
      if (bookmarked) {
        storeArticleCommentsTags &&
          storeArticleCommentsTags(
            { ...payload, bookmarked: false },
            'add',
            'bookmarks'
          );
        deleteBookmark(payload)
          .then(() => {
            toast.success('Bookmarked the article');
          })
          .catch((error) => {
            console.log(error);
            toast.error('Error while bookmarking the article');
          });
      } else {
        storeArticleCommentsTags &&
          storeArticleCommentsTags(
            { ...payload, bookmarked: true },
            'add',
            'bookmarks'
          );
        addBookmark(payload)
          .then(() => {
            toast.success('Bookmarked the article');
          })
          .catch((error) => {
            console.log(error);
            toast.error('Error while bookmarking the article');
          });
      }
      setTriggerFetchUseEffect((old) => !old);
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while handling the bookmark.');
    }
  };

  const handlePopoverLeave = () => {
    setShowPopover(false);
    setHoveredArticle(null);
  };

  const handleFormatNumber = (num) => {
    const { value, suffix } = formatNumber(num, true, true);
    return value + suffix;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(openedArticleData?.link);
    toast.success('Copied to clipboard!');
  };

  const { mutateAsync: hideArticle } = useHiddenArticlesByArticleId();
  const { mutateAsync: unhideArticle } = useUnHideArticlesById();

  const handleHiddenArticle = (triggerMode) => {
    const payload = {
      recent_search_id: recentSearchId || articlesRecentSearchId,
      article_id: openedArticleData?.articleId,
    };
    if (triggerMode) {
      try {
        storeArticleCommentsTags &&
          storeArticleCommentsTags(
            { ...payload, hidden: false },
            'add',
            'hidden-articles'
          );
        unhideArticle(payload)
          .then(() => {
            toast.success('Article successfully removed from the hidden list!');
            setTriggerFetchUseEffect &&
              setTriggerFetchUseEffect((prev) => !prev);
            refetchHiddleArticles && refetchHiddleArticles();
          })
          .catch((error) => {
            console.log(error);
            toast.error('Unable to Hide Article at this moment');
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        storeArticleCommentsTags &&
          storeArticleCommentsTags(
            { ...payload, hidden: true },
            'add',
            'hidden-articles'
          );
        hideArticle(payload, {
          onError: () => {},
        })
          .then(() => {
            toast.success('Hidden Article added successfully');
            refetchHiddleArticles && refetchHiddleArticles();
            setTriggerFetchUseEffect &&
              setTriggerFetchUseEffect((prev) => !prev);
          })
          .catch((error) => {
            console.log(error);
            toast.error('Unable to Hide Article at this moment');
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const actionDropDownOptions = [
    {
      label: 'Copy Link',
      clickFunction: () => handleCopyLink(),
    },
    {
      label: hiddenArticleTigger ? 'Unhide Article' : 'Hide Article',
      clickFunction: () => handleHiddenArticle(hiddenArticleTigger),
    },
  ];

  const handleClickOutside = (event) => {
    if (showOptRef.current && !showOptRef.current.contains(event.target)) {
      setOpenActionDropDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleOptionIcon = (e, content) => {
    e.stopPropagation();
    // setSelectedComponent(componentName);
    setOpenActionDropDown((prev) => {
      if (prev && openedArticleData === content) {
        setOpenedArticleData({});
        return false;
      } else {
        setOpenedArticleData(content);
        return true;
      }
    });
  };

  // const handleSydication = (value) => {
  //   setSydicationActive(true);
  //   setSydicationArticles(value);
  // };

  const recentSearchId = state?.savedSearchData?.recent_search_id;

  const articlesToMap = hiddenArticleTigger
    ? allHiddenArticles?.data?.data
    : savedSearchId === 'custom-search'
    ? hiddenArticle
    : articles;
  const getOnlyValues = (Bottomkeys, ele) => {
    return Bottomkeys.map(
      (item, i) => (item?.func && item.func(ele)) || ele[item.value]
    )?.filter((x) => !!x);
  };
  // const animations = {
  //   initial: { scale: 0, opacity: 0 },
  //   animate: { scale: 1, opacity: 1 },
  //   exit: { scale: 0, opacity: 0 },
  //   transition: { type: 'spring', stiffness: 900, damping: 40 },
  // };

  const animations = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -150, opacity: 0 },
    transition: {
      type: 'spring',
      stiffness: 900,
      damping: 40,
      duration: 0.7,
    },
  };

  const getComment = (ele) => {
    const comment = storeComments?.find(
      (x) => x?.article_id === ele?.articleId
    );
    if (comment) {
      return comment?.content;
    }
    return ele?.comment || '';
  };

  const getTags = (ele) => {
    const tagLocalInfo = storeTags?.find(
      (x) => x?.article_id === ele?.articleId
    );
    if (tagLocalInfo) {
      return typeof tagLocalInfo?.tags === 'string'
        ? tagLocalInfo?.tags?.split(',')
        : tagLocalInfo?.tags;
    }
    return ele?.tags;
  };

  const getIsBookmarked = (ele) => {
    const bookMarksData = bookmarksLocal?.find(
      (x) => x?.article_id === ele?.articleId
    );
    if (bookMarksData) {
      return bookMarksData?.bookmarked;
    }
    return ele?.bookmarked;
  };

  const getArticlesLocal = (articles) => {
    const filteredArticles = articles?.filter(
      (x) => !hiddenArticlesLocal?.some((y) => y?.article_id === x?.articleId)
    );
    return filteredArticles;
  };

  const renderRow = ({ index: i, key, style, parent }) => {
    const ele = getArticlesLocal(articlesToMap)[i] ?? {};
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={i}
      >
        {({ registerChild }) => (
          <ArticleMainWrp
            articleView={articleView}
            key={key}
            style={style}
            ref={registerChild}
          >
            <ArticlewrpBox>
              <ArticleWrp articleView={articleView} key={`${ele.title}-i`}>
                <ArticleWrpR articleView={articleView}>
                  <ArticleAndIconWrp>
                    <ArticleLinkSection>
                      {ele?.icon && <ArticleIcon key={i} src={ele.icon} />}
                      {!ele.icon && (
                        <ArticleDefaultIcon>
                          {ele?.publication?.[0]}
                        </ArticleDefaultIcon>
                      )}
                      <ArticleLinkWrp articleView={articleView}>
                        {Bottomkeys.filter(
                          (items) => items.value === 'link'
                        )?.map((item, i) => (
                          <BoxArticlewpr key={i}>
                            <ArticleLink
                              to={ele[item.value]}
                              target="_blank"
                              rel={ele.title}
                            >
                              {ele.link}
                            </ArticleLink>
                          </BoxArticlewpr>
                        ))}
                        {getOnlyValues(
                          Bottomkeys.filter((item) => item.value !== 'link'),
                          ele
                        )?.map((item, i, array) => (
                          <BoxArticlewpr key={i}>
                            <Articlekeytxt>
                              {item}
                              {i !== array.length - 1 && (item ? ',' : '')}
                            </Articlekeytxt>
                          </BoxArticlewpr>
                        ))}
                      </ArticleLinkWrp>
                    </ArticleLinkSection>
                    {showTab && (
                      <ArticleBottomWrp
                        articleView={articleView}
                        className="article-bottom"
                      >
                        <ArticleActionDetailsWrp>
                          {!hiddenArticleTigger && (
                            <IconsPop
                              Icon={Comment}
                              PopContent={CommentBox}
                              data={{
                                ele,
                                type,
                                page,
                                commentData: ele?.comment,
                                articlesRecentSearchId,
                                savedSearchId,
                                storeComments,
                              }}
                              setTriggerFetchUseEffect={
                                setTriggerFetchUseEffect
                              }
                              storeArticleCommentsTags={
                                storeArticleCommentsTags
                              }
                              setStoreComments={setStoreComments}
                              // data={{ ele, type, page }}
                              width="1.75rem"
                              height="1.75rem"
                              tooltipText="Comment"
                              // mark={ele.comment !== ''}
                            />
                          )}
                          {!hiddenArticleTigger && (
                            <IconsPop
                              key={ele?.articleId}
                              Icon={TagIcon}
                              PopContent={TagBox}
                              data={{
                                ele,
                                type,
                                page,
                                tagData: ele?.tags,
                                articlesRecentSearchId,
                                savedSearchId,
                                tags: ele?.tags,
                              }}
                              setTriggerFetchUseEffect={
                                setTriggerFetchUseEffect
                              }
                              storeArticleCommentsTags={
                                storeArticleCommentsTags
                              }
                              setStoreTags={setStoreTags}
                              tooltipText="Tags"
                            />
                          )}

                          {!hiddenArticleTigger && (
                            <ArticleIconWrp
                              onClick={() => {
                                handleBookmark(ele);
                              }}
                            >
                              <Tooltip content="Bookmark">
                                <BookMarkIcon2
                                  color={
                                    getIsBookmarked(ele) ? '#675ef2' : 'white'
                                  }
                                  stroke={
                                    getIsBookmarked(ele) ? '#675ef2' : '#585858'
                                  }
                                  width="1.5rem"
                                  height="1.5rem"
                                />
                              </Tooltip>
                            </ArticleIconWrp>
                          )}

                          <CheckBoxWrp onClick={() => handleChecked(i)}>
                            <CheckboxIcon
                              width="1.5rem"
                              height="1.5rem"
                              checked={allChecked}
                              color={
                                checked.includes(i)
                                  ? theme[selectedTheme].primary
                                  : 'white'
                              }
                              borderColor={
                                checked.includes(i)
                                  ? theme[selectedTheme].primary
                                  : '#5C5E60'
                              }
                            />
                          </CheckBoxWrp>

                          <IconBoxwpr
                            width={'1.5rem'}
                            height={'1.5rem'}
                            onClick={(e) => handleOptionIcon(e, ele)}
                            ref={showOptRef}
                            className="hide-downloading"
                          >
                            <VerticleDots
                              color={openActionDropdown ? '#675ef2' : '#5C5E60'}
                            />
                            <SimpleReusableDropDown
                              isOpen={
                                openActionDropdown && openedArticleData === ele
                              }
                              options={actionDropDownOptions}
                              setIsOpen={setOpenActionDropDown}
                            />
                          </IconBoxwpr>
                        </ArticleActionDetailsWrp>
                      </ArticleBottomWrp>
                    )}
                  </ArticleAndIconWrp>
                  <ArticleTextImgWrp>
                    <ArticleTitletWrp>
                      <ArticleTitle
                        to={ele.link}
                        target="_blank"
                        rel={ele.title}
                      >
                        {ele.title}
                      </ArticleTitle>
                      <ArticleBody>{ele.content}</ArticleBody>
                    </ArticleTitletWrp>
                    <ArticleWrpL articleView={articleView}>
                      <RenderImage url={ele?.image} />
                    </ArticleWrpL>
                  </ArticleTextImgWrp>
                </ArticleWrpR>
              </ArticleWrp>
              <ArticlewprZ>
                <ArticleTextDetailsWrp
                  articleView={articleView}
                  floatingPagination={floatingPagination}
                >
                  {bottomDetails?.map((item, j) => (
                    <ArticleTextWrp
                      onClick={() => {
                        if (
                          item.value === 'syndication' &&
                          ele.syndication > 0 &&
                          syndicationClickData.graphSelection &&
                          !hiddenArticleTigger
                        ) {
                          !hiddenArticleTigger &&
                            setClickedPosition &&
                            setClickedPosition(1);
                          setSyndicationClick &&
                            setSyndicationClick({
                              widget: 'Syndication',
                              graphSelection: 'Syndication',
                              rawData: ele,
                              inSyndication: true,
                              otherInfo: { uniqueId: 'Syndication' },
                              name,
                            });
                        }
                      }}
                      onMouseEnter={
                        item?.value === 'matches'
                          ? (e) => handlePopoverEnter(e, i)
                          : () => {}
                      }
                      onMouseLeave={
                        item?.value === 'matches'
                          ? (e) => handlePopoverLeave(e, i)
                          : () => {}
                      }
                      key={j}
                      articleView={articleView}
                    >
                      <ArticleTextLabel>
                        {showFullTitle !== 'Syndication' && item?.icon}
                      </ArticleTextLabel>
                      <ArticleTextValue
                        articleView={articleView}
                        itemType={item.value}
                      >
                        {item.value === 'matches' && (
                          <KeywordPopoverWrap>
                            {ele[item.value].length || ''}
                          </KeywordPopoverWrap>
                        )}
                        {item.value === 'sentiment' && (
                          <SentimentComponent sentiment={ele[item.value]} />
                        )}
                        {item.value === 'syndication' &&
                          showFullTitle !== 'Syndication' && (
                            <SyndicationButton
                              isZero={
                                ele[item.value] === 0 ||
                                syndicationClickData?.graphSelection
                              }
                              onClick={() => {
                                if (
                                  setSyndicationClick &&
                                  ele.syndication > 0 &&
                                  !syndicationClickData.graphSelection
                                ) {
                                  setSyndicationClick &&
                                    setSyndicationClick({
                                      widget: 'Syndication',
                                      graphSelection: 'Syndication',
                                      rawData: ele,
                                      inSyndication: true,
                                      otherInfo: { uniqueId: 'Syndication' },
                                      name,
                                    });
                                  !hiddenArticleTigger &&
                                    setClickedPosition &&
                                    setClickedPosition(1);
                                }
                              }}
                              disabled={syndicationClickData?.graphSelection}
                            >
                              <span
                                style={{
                                  color:
                                    ele[item.value] === 0 ||
                                    syndicationClickData?.graphSelection
                                      ? theme[selectedTheme]?.darkText
                                      : theme[selectedTheme]?.primary,
                                  opacity:
                                    ele[item.value] === 0 ||
                                    syndicationClickData?.graphSelection
                                      ? '0.5'
                                      : 1,
                                }}
                              >
                                {String(handleFormatNumber(ele[item.value]))}{' '}
                              </span>
                              <ArticleTextLabel
                                style={{ display: 'inline-block' }}
                                // style={{ color: theme[selectedTheme].closeButton }}
                              >
                                {item.label}
                              </ArticleTextLabel>
                            </SyndicationButton>
                          )}
                        {item.value !== 'matches' &&
                          item.value !== 'sentiment' &&
                          item.value !== 'syndication' &&
                          handleFormatNumber(ele[item.value])}
                        {item?.value === 'matches' ? (
                          <PortalTooltip
                            isOpen={showPopover && hoveredArticle === i}
                            pos={popoverPosition}
                            align={
                              popoverPosition?.left > window?.innerWidth / 2
                                ? 'left'
                                : 'right'
                            }
                            vAlign={
                              popoverPosition?.top > window?.innerHeight / 2
                                ? 'top'
                                : 'bottom'
                            }
                            boxShadow="0px 0px 0px rgba(0, 0, 0, 0.20)"
                            borderRadius="0.3125rem"
                          >
                            <KeywordPopover items={ele[item.value]} />
                          </PortalTooltip>
                        ) : (
                          <></>
                        )}
                      </ArticleTextValue>
                      {item.value !== 'sentiment' &&
                        item.value !== 'syndication' && (
                          <ArticleTextLabel>{item.label}</ArticleTextLabel>
                        )}
                    </ArticleTextWrp>
                  ))}
                </ArticleTextDetailsWrp>

                {getComment(ele) && (
                  <ArticleCmtWrp>
                    <Comment istrue={true} />
                    <ArticleCmt key={ele.comment_id}>
                      {getComment(ele)}
                    </ArticleCmt>
                  </ArticleCmtWrp>
                )}

                {getTags(ele) && (
                  <ArticleCmtWrp bg={'#F9F9FC'} key={ele.tag_id}>
                    <TagIcon color="#CF326B" fill="#CF326B" fill2="#fff" />
                    {/* {JSON.parse(ele?.tags?.replace(/'/g, '"'))?.map( */}
                    {getTags(ele)?.map((tag, index) => (
                      <ArticleTags key={index} bgc={' #CF326B'}>
                        {tag || ''}
                      </ArticleTags>
                    ))}
                  </ArticleCmtWrp>
                )}
              </ArticlewprZ>
            </ArticlewrpBox>
          </ArticleMainWrp>
        )}
      </CellMeasurer>
    );
  };

  return (
    <ArticlesWrp articleView={articleView}>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <List
              width={width}
              height={height}
              rowHeight={cache.rowHeight}
              rowRenderer={renderRow}
              rowCount={getArticlesLocal(articlesToMap)?.length ?? 0}
              overscanRowCount={3}
            />
          );
        }}
      </AutoSizer>
      {getArticlesLocal(articlesToMap)?.map((ele, i) => {})}
    </ArticlesWrp>
  );
};

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      link: PropTypes.string,
      icon: PropTypes.string,
      image: PropTypes.string,
      matches: PropTypes.arrayOf(PropTypes.string),
      reach: PropTypes.number,
      syndication: PropTypes.number,
      ave: PropTypes.number,
      sentiment: PropTypes.string,
    })
  ).isRequired,
  articleView: PropTypes.bool,
  page: PropTypes.number,
  type: PropTypes.string,
  showTab: PropTypes.bool,
  floatingPagination: PropTypes.bool,
  tooltipText: PropTypes.string,
  handleChecked: PropTypes.func,
  checked: PropTypes.func,
  savedSearchId: PropTypes.number,
  allChecked: PropTypes.bool,
  setSydicationActive: PropTypes.func,
  setSydicationArticles: PropTypes.func,
  sydicationActive: PropTypes.bool,
  sydicationArticles: PropTypes.array,
  allHiddenArticles: PropTypes.any,
  articlesRecentSearchId: PropTypes.string,
  setSyndicationClick: PropTypes.func,
  setClickedPosition: PropTypes.func,
  setTriggerFetchUseEffect: PropTypes.func,
  storeArticleCommentsTags: PropTypes.func,
  storeComments: PropTypes.array,
  setStoreComments: PropTypes.func,
  storeTags: PropTypes.array,
  hiddenArticleTigger: PropTypes.bool,
  setHiddenArticle: PropTypes.func,
  hiddenArticle: PropTypes.array,
  setStoreTags: PropTypes.func,
  syndicationClickData: PropTypes.object,
  name: PropTypes.string,
  refetchHiddleArticles: PropTypes.func,
  showFullTitle: PropTypes.any,
  bookmarksLocal: PropTypes.array,
  hiddenArticlesLocal: PropTypes.array,
};

const RenderImage = ({ url }) => {
  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  return (
    <img
      src={`${hasError ? ArticleImageNAImg : url}`}
      alt="article thumbnail"
      onLoad={handleImageLoad}
      onError={handleImageError}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      loading="lazy"
    />
  );
};

RenderImage.propTypes = {
  url: PropTypes.string,
};

export default Articles;
