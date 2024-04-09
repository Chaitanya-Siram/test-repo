import React, { useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import AddItem from './add-item-component';
import TextItem from './add-item-component/text-item';
import NewsArticle from './news-article';
import ToolBar from './add-item-component/toolbar';
import {
  AddRowWrp,
  FullTextWrapper,
  NewsLetterComponentWrp,
  NewsLetterRow,
  NewsLetterWrp,
  SectionLink,
  SectionWrapper,
  ToolBarWrp,
} from './index.sc';
import GraphItem from './add-item-component/graph-item';
// import { useParams } from 'react-router-dom';
// import { handlePublishNewsletter } from '../../../hooks/useSaveNewsLetter';
import {
  // addCountPrefix,
  // calculatePercentage,
  generateUniqueId,
} from '../../../constants/utils';
// import {
// geographicalWorldMapData,
// mediaTypeChartMapData,
// outletBreakdownMapData,
// resultOverTimeMapData,
// sentimentChartMapData,
// topAuthorChartMapData,
// topThemeChartMapData,
// wordCloudChartMapData,
// } from '../../../hooks/data/chartData';
// import { format, parseISO } from 'date-fns';
// import { colors } from '../../../hooks/data/colors';
import DashboardPopup from '../../../components/dasboard-popup';
import CustomConfirmationPopUp from '../../../components/customize-confirmation-popup';
import BackToTop from './add-item-component/back-to-top';
import NewsLetterSection from './add-item-component/section';
import NewsletterFooter from './add-item-component/newsletter-footer';
import {
  DropDownCheckBox,
  DropDownValue,
  DropDownValueWrp,
} from './add-item-component/article-toolbar/index.sc';
// import HalfNewsArticle from './half-news-article';

const NewsLetterAddSection = ({
  searchSelect,
  newsLetterData,
  editMode,
  activeElement,
  handleElementClick,
  handleBlur,
  setStateNewsLetterData,
  selectedSearchData,
  setPreviousState,
  newsLetter,
  setNewsLetter,
}) => {
  // const [newsLetter, setNewsLetter] = useState([]);
  const [loader, setLoader] = useState(false);
  const [typeAdded, setTypeAdded] = useState('');
  // const { newsLetterId } = useParams();
  const [editIndex, setIsEditIndex] = useState(null);
  const [selectedSectionConfig, setSelectedSectionConfig] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState(null);
  const [selectedEle, setSelectedEle] = useState({});
  const refs = useRef([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // useEffect(() => {
  // if (newsLetterId) {
  // handlePublishResponse();
  // }
  // }, [newsLetterId]);

  const splitRow = (i) => {
    setNewsLetter((prev) => {
      const temp = [...prev];
      // loader for graph item
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 500);

      if (!temp[i].rowSplit) {
        temp[i].push({
          columnId: 'b',
          componentType: 'add',
          columnComponent: <div>add</div>,
        });
        temp[i].rowSplit = true;
      }
      return temp;
    });
  };

  const addRow = (data, row, column, selectedCompOption) => {
    if (editIndex >= 0 && editIndex != null) {
      if (selectedCompOption === 'saved_graph') {
        const dataToPush = data?.map((x, i) => {
          return {
            rowId: editIndex + i,
            uniqueId: generateUniqueId(),
            rowSplit: false,
            columnId: 'a',
            columnComponent: {
              ...x,
            },
          };
        });
        setNewsLetter((prev) => {
          const newsData = [...prev];
          const newArray = [];

          // Iterate through the original array
          for (let i = 0; i < newsData.length; i++) {
            // Insert the new value at the specified index
            if (i === editIndex) {
              newArray.push(...dataToPush);
            } else {
              // Copy the existing elements
              newArray.push(newsData[i]);
            }
          }

          // If the new value is to be inserted at the end
          if (editIndex >= newsData.length) {
            newArray.push(...dataToPush);
          }
          setStateNewsLetterData((prev) => ({
            ...prev,
            newsletter_body: newArray,
            status: true,
          }));
          return newArray;
        });
        return;
      }
      const updatedData = {
        rowId: editIndex,
        uniqueId: generateUniqueId(),
        rowSplit: false,
        columnId: 'a',
        columnComponent: {
          ...data,
        },
      };

      // it means it is a saved graph

      setNewsLetter((prev) => {
        const data = [...prev];
        const updatedArray = data.map((x, i) => {
          if (i === editIndex) {
            updatedData.columnComponent.sectionData =
              x?.columnComponent?.sectionData || {};
            return updatedData;
          } else {
            return x;
          }
        });
        setStateNewsLetterData((prev) => ({
          ...prev,
          newsletter_body: updatedArray,
          status: true,
        }));
        return updatedArray;
      });
      return;
    }
    setNewsLetter((prev) => {
      const temp = [...prev];
      if (row < temp.length) {
        temp[row].rowItems[column] = {
          columnId: column,
          columnComponent: <div>content</div>,
          ...data,
        };
      } else {
        temp.push({
          rowId: temp.length,
          uniqueId: generateUniqueId(),
          rowSplit: false,
          // rowItems: [

          columnId: 'a',
          columnComponent: {
            ...data,
            sectionData: {
              sectionTitle: `Section ${temp?.length + 1}`,
              sectionDescription: '',
              titleColor: '#000000',
              titleBackgroundColor: '#ffffff',
              descriptionColor: '#000000',
              descriptionBackgroundColor: '#ffffff',
            },
          },

          // ],
        });
      }

      // const newsLetterDataWithoutEmptyRowItems = temp.map((item) => {
      // // Create a copy of the item to avoid modifying the original
      // const newItem = { ...item };

      // // If rowItems is an array with a single object, replace it with that object directly
      // if (newItem.columnComponent.componentData.articles) {
      // delete newItem.columnComponent.componentData.articles;
      // }

      // return newItem;
      // });

      setStateNewsLetterData((prev) => ({
        ...prev,
        newsletter_body: temp,
        status: true,
      }));

      return temp;
    });
  };

  const dataNewLetter = [];
  newsLetter?.forEach((newsData) => {
    const component = newsData.rowItems;
    // if (component?.componentData?.articles) {
    // delete component?.componentData?.articles;
    // }
    dataNewLetter.push(component);
  });

  const arrowClick = (row, direction) => {
    setNewsLetter((prev) => {
      const temp = [...prev];
      if (direction === 'up' && row <= 0) {
        setStateNewsLetterData((prev) => ({
          ...prev,
          newsletter_body: temp,
          status: true,
        }));
        return temp;
      } else if (direction === 'down' && row >= temp.length) {
        setStateNewsLetterData((prev) => ({
          ...prev,
          newsletter_body: temp,
          status: true,
        }));
        return temp;
      } else {
        const itemIndex = row; // Index of the item you want to change
        const newIndex = direction === 'up' ? row - 1 : row + 1; // Desired new index for the item
        const item = temp[itemIndex]; // Retrieve the item
        temp.splice(itemIndex, 1); // Remove the item from the original index
        temp.splice(newIndex, 0, item); // Insert the item at the new index
        setStateNewsLetterData((prev) => ({
          ...prev,
          newsletter_body: temp,
          status: true,
        }));
        return temp;
      }
    });
  };

  const onDelete = () => {
    setNewsLetter((prev) => {
      const temp = [...prev];

      const itemIndex = row; // Index of the item you want to change
      temp.splice(itemIndex, 1); // Remove the item from the original index
      setStateNewsLetterData((prev) => ({ ...prev, newsletter_body: temp }));
      return temp;
    });
    setIsOpen(false);
  };

  const onClickDeleteModal = (ele, index) => {
    setRow(index);
    setSelectedEle(ele);
    setIsOpen(true);
  };

  const onEdit = (i) => {
    const data = JSON.parse(JSON.stringify(newsLetter[i]));
    if (
      data.columnComponent.componentType !== 'text' &&
      data.columnComponent.componentType !== undefined
    ) {
      setSelectedSectionConfig({ ...data });
      setIsEditIndex(i);
    }
  };

  const handleEditMode = () => {
    setIsEditIndex(null);
    setSelectedSectionConfig(null);
  };

  const capitalizeText = (str) => str && str[0].toUpperCase() + str.slice(1);

  const getSectionsData = () => {
    return newsLetter;
  };

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NewsLetterWrp id="newsletter-container">
      {newsLetter && getSectionsData()?.length > 0 && (
        <>
          <NewsLetterRow style={{ paddingBottom: '1rem', paddingTop: '1rem' }}>
            <SectionWrapper>
              {getSectionsData()?.map((section, i, array) => {
                return (
                  <React.Fragment key={section?.uniqueId}>
                    <SectionLink
                      onClick={() => handleClickScroll(section?.uniqueId)}
                    >
                      {(section?.columnComponent?.componentType === 'text'
                        ? section?.columnComponent?.componentData?.title
                        : section?.columnComponent?.sectionData
                            ?.sectionTitle) ||
                        `Section ${section?.rowId + 1 || 1}`}
                    </SectionLink>
                    {i !== array?.length - 1 && (
                      <span style={{ margin: 0, padding: '0.5rem' }}>|</span>
                    )}
                  </React.Fragment>
                );
              })}
            </SectionWrapper>
          </NewsLetterRow>
        </>
      )}
      {newsLetter &&
        newsLetter?.map((ele, i) => (
          <>
            <NewsLetterRow
              split={ele.rowSplit}
              key={`news-letter-row-${ele.uniqueId}`}
            >
              {/* Access the single object directly */}
              <NewsLetterComponentWrp key={`news-letter-row-${i}-column-0`}>
                {ele?.columnComponent?.componentType === 'text' ? (
                  <TextItem
                    title={ele?.columnComponent?.componentData?.title}
                    description={
                      ele?.columnComponent?.componentData?.description
                    }
                    editMode={editMode}
                    activeElement={activeElement}
                    handleElementClick={handleElementClick}
                    handleBlur={handleBlur}
                    setNewsLetter={setNewsLetter}
                    rowId={ele?.rowId}
                    newsLetter={newsLetter}
                    setPreviousState={setPreviousState}
                    data={ele}
                  />
                ) : ele?.columnComponent.componentType === 'article' ? (
                  <>
                    {/* Adjust as needed */}
                    <NewsArticle
                      articles={ele?.columnComponent.componentData}
                      setNewsLetter={setNewsLetter}
                      rowId={ele?.rowId}
                      newsLetter={newsLetter}
                      setPreviousState={setPreviousState}
                      elementId={ele?.uniqueId}
                      setStateNewsLetter={setStateNewsLetterData}
                      newsLetterData={newsLetterData}
                      data={ele}
                    />
                  </>
                ) : ele?.columnComponent.componentType === 'graph' ? (
                  <>
                    <GraphItem
                      graph={ele?.columnComponent.componentData}
                      split={loader}
                      setPreviousState={setPreviousState}
                      elementId={ele?.uniqueId}
                      newsLetter={newsLetter}
                      rowId={ele?.rowId}
                      setNewsLetter={setNewsLetter}
                      data={ele}
                    />
                  </>
                ) : ele.columnComponent.componentType === 'add' ? (
                  <>
                    <AddItem
                      rowIndex={i}
                      columnIndex={0}
                      addRow={addRow}
                      setTypeAdded={setTypeAdded}
                      typeAdded={typeAdded}
                    />
                  </>
                ) : (
                  <></>
                )}
              </NewsLetterComponentWrp>
              <ToolBarWrp className="tool-bar-wrp">
                <ToolBar
                  arrowClick={(direction) => arrowClick(i, direction)}
                  splitRow={() => splitRow(i)}
                  deleteClick={() => onClickDeleteModal(ele, i)}
                  type="newsletter-row"
                  title={ele}
                  onClickEdit={() => onEdit(i)}
                />
              </ToolBarWrp>
            </NewsLetterRow>
            <div
              style={{
                backgroundColor: 'white',
                width: '100%',
                position: 'relative',
              }}
            >
              <BackToTop />
            </div>
          </>
        ))}
      <DashboardPopup
        open={isOpen}
        toggler={setIsOpen}
        popContent={
          <CustomConfirmationPopUp
            Heading={`${capitalizeText(
              selectedEle?.columnComponent?.componentType
            )} - Section`}
            SecondHeading={'Are you sure you want to delete?'}
            toggler={setIsOpen}
            handleDelete={onDelete}
          />
        }
        padding="0"
        borderRadius="0.625rem"
        width="35rem"
      />
      <AddRowWrp style={{ padding: '2rem', backgroundColor: 'white' }}>
        <AddItem
          searchSelect={searchSelect}
          rowIndex={newsLetter?.length}
          columnIndex={0}
          addRow={addRow}
          selectedSearchData={selectedSearchData}
          setTypeAdded={setTypeAdded}
          isEdit={editIndex >= 0 && editIndex !== null}
          selectedConfig={selectedSectionConfig}
          handleEditMode={handleEditMode}
        />
      </AddRowWrp>
      <NewsLetterRow
        style={{ marginBottom: '4rem', borderRadius: '0 0 0.75rem 0.75rem' }}
      >
        <NewsletterFooter
          newsLetterData={newsLetterData}
          setNewsLetterData={setStateNewsLetterData}
        />
      </NewsLetterRow>
    </NewsLetterWrp>
  );
};

NewsLetterAddSection.propTypes = {
  data: Proptypes.array,
  searchSelect: Proptypes.any,
  newsLetterData: Proptypes.object,
  editMode: Proptypes.bool,
  activeElement: Proptypes.string,
  handleElementClick: Proptypes.func,
  handleBlur: Proptypes.func,
  setStateNewsLetterData: Proptypes.func,
  selectedSearchData: Proptypes.object,
  setPreviousState: Proptypes.func,
  setNewsLetter: Proptypes.func,
  newsLetter: Proptypes.array,
};

export default NewsLetterAddSection;
