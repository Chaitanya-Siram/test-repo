import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AlertMsg,
  AllWrp,
  CSVInput,
  CSVLabel,
  CSVWrp,
  DropdownContainer,
  DropdownListItem,
  DropdownOptionsList,
  ErrorMessage,
  ImgInput,
  ImgWrp,
  Label,
  LimitInput,
  LinkButton,
  LinkButtonWrp,
  LinkDetailLabelFieldWrp,
  LinkDetailSection,
  LinkDetailWrpFields,
  LinkInput,
  LinkMsg,
  LinkSubmit,
  LinkWrp,
  MultiFilterContainer,
  OptCheckBox,
  OptWrp,
  OptionTitle,
  SelectOptionComponent,
  SelectedOption,
  SingleFilterWrapper,
  TagWrp,
} from './index.sc';
import ArrowIcon from './assets/Arrow';
import {
  useGetArticleLinkDataNewsletter,
  useGetTagsData,
  useSaveExternalLink,
} from '../../hooks/useSaveNewsLetter';
import { getParsedDate } from '../../constants';
import toast from 'react-hot-toast';
import SimilarData from '../../pages/news-letter/newsletter-add-section/add-item-component/edit-article/SimilarData';
import { LinkTextArea } from '../edit-article-filter-component/index.sc';

const MultiFilter = ({
  filterLabels = [],
  filterKeyOptions = {},
  onChange,
  selectLabel,
  savedSearchData,
  selectedSearchDetails,
  setSelectedSearchDetails,
  selectedCompOption,
  canvas,
  setSelectedGraph,
  selectedGraph,
  submitStatus,
  articleCount,
  fetchArticles,
  selectedFileName,
  setGraphImageTitle,
  graphImageTitle,
  setLinkText,
  linkText,
  rowIndex,
  setTotalAddedLinks,
  errorMessage,
  setErrorMessage,
  setAddNewLink,
  addNewLink,
  setSelectedTag,
  selectedTag,
  selectedSearchID,
  setSelectedSearchID,
  isEdit,
  filterData,
  titleRequired,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    isEdit ? filterData : {}
  );
  const [dropdownOpenStates, setDropdownOpenStates] = useState({});
  const [selectSaveSearch, setSelectSaveSearch] = useState(false);
  const [selectSaveGraph, setSelectSaveGraph] = useState(false);
  const [selectSaveSearchLabel, setSelectSaveSearchLabel] = useState(
    isEdit ? selectedSearchDetails?.title : ''
  );
  const [articleLinkFetch, setArticleLinkFetch] = useState(
    isEdit ? Array(addNewLink?.length).fill(true) : [false]
  );
  const [showDataLazy, setShowDataLazy] = useState(true);
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);
  const [selectTagsFlag, setSelectTagsFlag] = useState(false);
  const [fetchButton, setFetchButton] = useState('Fetch Article');

  const [fileValidation, setFileValidation] = useState('');
  const [inputValue, setInputValue] = useState(isEdit ? filterData?.limit : 5);

  const dropdownRefs = useRef({});
  const fileInputRef = useRef(null);
  const selectRef = useRef();
  const chartsRef = useRef();

  const graphTitle = JSON.parse(JSON.stringify(canvas));
  // const toggleDropdown = (label) => {
  //   setDropdownOpenStates((prevDropdownOpenStates) => ({
  //     ...prevDropdownOpenStates,
  //     [label]: !prevDropdownOpenStates[label],
  //   }));
  // };

  const { data: tagsData } = useGetTagsData(selectedSearchID?.recent_search_id);

  const toggleDropdown = (label) => {
    setDropdownOpenStates((prevDropdownOpenStates) => {
      const updatedDropdownOpenStates = {};
      for (const key in prevDropdownOpenStates) {
        updatedDropdownOpenStates[key] = false;
      }
      return {
        ...updatedDropdownOpenStates,
        [label]: !prevDropdownOpenStates[label],
      };
    });
  };
  const handleSortOptionChange = (label, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [label]: selectedOption,
    }));
    setDropdownOpenStates((prevDropdownOpenStates) => ({
      ...prevDropdownOpenStates,
      [label]: false,
    }));
    if (onChange) {
      if (label === 'limit') {
        setInputValue(selectedOption);
      }
      onChange(label, selectedOption);
    }
  };

  const handleSaveOptionChange = (option) => {
    if (
      selectedCompOption === 'saved_search' ||
      selectedCompOption === 'saved_graph'
    ) {
      fetchArticles(option);
      setSelectedSearchDetails(option);
      setSelectSaveSearchLabel(option.title);
      setSelectSaveSearch(false);
    } else if (
      selectedCompOption === 'csv' ||
      selectedCompOption === 'upload_image'
    ) {
      const file = option.target.files[0];

      if (selectedCompOption === 'csv') {
        const allowFile = ['text/csv'];
        if (!allowFile.includes(file?.type)) {
          setFileValidation('Only CSV File is allowed.');
        } else {
          fetchArticles(option);
        }
      } else if (selectedCompOption === 'upload_image') {
        const allowFiles = ['image/jpeg', 'image/png'];
        if (!allowFiles.includes(file?.type)) {
          setFileValidation('Only PNG and JPEG Files are allowed.');
        } else {
          fetchArticles(option);
        }
      } else {
        setFileValidation('');
        fetchArticles(option);
      }
    }
  };

  const handleGraphChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGraph((prev) => {
      const { component } = prev;
      if (checked) {
        return { component: [...component, value] };
      } else {
        return { component: component.filter((e) => e !== value) };
      }
    });
  };

  const { mutateAsync: articleLinkDataFunc } =
    useGetArticleLinkDataNewsletter();

  const { mutateAsync: externalLinkFunc } = useSaveExternalLink();

  const getData = (prev, index, filterData, addedNewObj) => {
    let data = [];
    if (prev.length === 1) {
      data = [{ ...addedNewObj, newsletterid: addedNewObj?.newsletterId }];
    } else if (index) {
      data = filterData?.map((x, i) => {
        if (i === index) {
          return {
            ...addedNewObj,
            newsletterid: addedNewObj?.newsletterId,
          };
        }
        return x;
      });
    } else {
      data = [
        ...filterData,
        { ...addedNewObj, newsletterid: addedNewObj?.newsletterId },
      ];
    }
    return data;
  };

  const handleFetchArticles = async (index) => {
    try {
      // const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      // let newData = [];
      setErrorMessage('');
      const link = addNewLink[index]?.link;
      if (link) {
        setFetchButton('Please wait...');
        const response = await articleLinkDataFunc(link);
        setArticleLinkFetch((latestData) =>
          latestData.map((x, i) => (i === selectedTabIndex - 1 ? true : x))
        );
        if (response?.isSuccessful) {
          setAddNewLink((prev) => {
            // const filterDuplicateData = Array.from(
            //   new Set(prev.map((item) => item.link))
            // ).map((link) => prev.find((item) => item.link === link));
            // const filterData = filterDuplicateData.filter(
            //   (obj) => Object.keys(obj).length !== 0
            // );

            const addedNewObj = {
              ...response?.data?.data,
              date: getParsedDate(
                response?.data?.data?.date,
                'MM/dd/yyyy',
                'yyyy-MM-dd'
              ),
              similarData: [],
            };
            return prev.map((item, i) => {
              if (i === index) {
                // const indexOfLink = Math.max(
                //   response?.data?.data?.link.indexOf('.com'),
                //   response?.data?.data?.link.indexOf('.net'),
                //   response?.data?.data?.link.indexOf('.org')
                // ); // Math max is given because if the string don't have any of the extensions it is giving as -1 else the actual lenght of it till the extention.
                const choppedUrl =
                  response?.data?.data?.publication_url !== null
                    ? response?.data?.data?.publication_url
                    : link;
                // : response?.data?.data?.link.substring(0, indexOfLink + 4); // Add 4 to include ".com" or ".net"

                return {
                  ...addedNewObj,
                  publication_url: choppedUrl,
                  newsletterid: addedNewObj?.newsletterId,
                };
              }
              return item;
            });
          });
        } else {
          toast.error(
            'Article information could not be fetched. Please enter the details and add the article.'
          );
          setAddNewLink((prev) => {
            // const filterDuplicateData = Array.from(
            //   new Set(prev.map((item) => item.link))
            // ).map((link) => prev.find((item) => item.link === link));
            // const filterData = filterDuplicateData.filter(
            //   (obj) => Object.keys(obj).length !== 0
            // );
            const addedNewObj = {
              ...response?.data?.data,
              publication_url: response?.data?.data?.link,
              imagePublicUrl: 'NA',
              similarData: [],
            };
            return prev.map((item, i) => {
              if (i === index) {
                return {
                  ...addedNewObj,
                  newsletterid: addedNewObj?.newsletterId,
                };
              }
              return item;
            });
          });
        }
        // await articleLinkDataFunc(linkText, {
        //   onSuccess: async (articleData) => {
        //     setArticleLinkFetch(true);
        //     setAddNewLink((prev) => {
        //       const filterDuplicateData = Array.from(
        //         new Set(prev.map((item) => item.link))
        //       ).map((link) => prev.find((item) => item.link === link));
        //       const filterData = filterDuplicateData.filter(
        //         (obj) => Object.keys(obj).length !== 0
        //       );
        //       newData = [...filterData, articleData?.data?.data];
        //       return [...filterData, articleData?.data?.data];
        //     });
        //     console.log(newData);
        //     const newObj = newData?.map((obj) => ({
        //       ...obj,
        //       newsType: 'das',
        //       place: 'asd',
        //       author: 'asd',
        //     }));
        //     const resp = await externalLinkFunc(newObj[selectedTabIndex - 1]);
        //     console.log(resp);
        //     setTotalAddedLinks((prev) => [...prev, resp?.data?.data]);
        //     setLinkText('');
        //   },
        //   onError: (err) => {
        //     console.log(err);
        //   },
        // });
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setFetchButton('Fetch Article');
    }
  };

  const handleRemoveLinkArticles = (index) => {
    // setArticleLinkFetch(false);
    if (selectedTabIndex === 1 && addNewLink.length === 1) {
      setArticleLinkFetch([false]);
      setAddNewLink([
        {
          newsletterId: '',
          title: '',
          content: '',
          publication: '',
          publication_url: '',
          imagePublicUrl: '',
          date: '',
          place: '',
          author: '',
          type: '',
          link: '',
          similarData: [],
        },
      ]);
    } else {
      setAddNewLink((prev) => prev.filter((_, i) => i !== index));
      setTotalAddedLinks((prev) => prev.filter((_, i) => i !== index));
      setArticleLinkFetch((prev) => prev.filter((_, i) => i !== index));
      if (selectedTabIndex !== 1) {
        setSelectedTabIndex((prev) => prev - 1);
      }
    }
  };
  const defaultValues = {
    author: '',
    content: '',
    date: '',
    imagePublicUrl: '',
    link: '',
    newsType: '',
    place: '',
    publication: '',
    title: '',
  };
  const handleAddNewLink = async (data = {}) => {
    // setAddNewLink([...addNewLink, linkArticle]);
    // setArticleLinkFetch(false);
    // const fieldDataForValidation = Object.values(data).every(
    //   (value) => value !== null && value !== ''
    // );

    const fieldDataForValidation = Object.keys(defaultValues)?.every(
      (key) =>
        data[key] || (key === 'newsType' && (data?.type || data?.newsType))
    );

    setErrorMessage('');
    const validationForAllObjects = addNewLink?.every((item) =>
      Object.keys(defaultValues).every(
        (key) =>
          item[key] || (key === 'newsType' && (item?.type || item?.newsType))
      )
    );
    if (
      validationForAllObjects &&
      fieldDataForValidation &&
      Object.entries(data).length > 0
    ) {
      setAddNewLink((prev) => {
        const filterData = Array.from(
          new Set(prev.map((item) => item.link))
        ).map((link) => prev.find((item) => item.link === link));
        return [
          // data,
          ...filterData,
          {
            newsletterId: '',
            title: '',
            content: '',
            publication: '',
            publication_url: '',
            imagePublicUrl: '',
            date: '',
            place: '',
            author: '',
            type: '',
            link: '',
            similarData: [],
          },
          // ...filterData,
        ];
      });
      setSelectedTabIndex((prev) => {
        return prev + 1;
      });
      setArticleLinkFetch((latestData) => [...latestData, false]);
      try {
        const newObj =
          addNewLink?.length >= 1 &&
          addNewLink?.map((obj) => ({
            ...obj,
            newsType: obj.type,
          }));
        const payload = newObj[selectedTabIndex - 1];
        if (payload?.id) {
          setTotalAddedLinks((prev) => [...prev, payload]);
        } else {
          const updatedData = newObj[selectedTabIndex - 1];
          const resp = await externalLinkFunc({
            ...updatedData,
            newsletter_id:
              updatedData?.newsletterId || updatedData?.newsletterid,
            article_id: updatedData?.newsletterId || updatedData?.newsletterid,
            syndication_data: updatedData?.shouldShowOption
              ? updatedData?.similarData
              : [],
          });
          setTotalAddedLinks((prev) => [
            ...prev,
            {
              ...resp?.data?.data,
              syndication_data: updatedData?.shouldShowOption
                ? updatedData?.similarData
                : [],
              shouldShowOption: updatedData?.shouldShowOption,
            },
          ]);
        }
      } catch (error) {
        console.log('Error');
      }
      // const newObj = response?.data?.data;
      // Object.keys(newObj).forEach((key) => {
      //   console.log(key);
      //   if (newObj[key] === ('' || null)) {
      //     // eslint-disable-next-line no-undef
      //     key === 'type' ? (newsType = key) : (newObj[key] = key);
      //   }
      // });
      // console.log(newObj);
      // const resp = await externalLinkFunc(data);
      // setTotalAddedLinks((prev) => [...prev, resp?.data?.data]);
    } else {
      setErrorMessage('Kindly fill in all the missing fields in added links.');
    }
  };

  const handleTabChange = (index) => {
    // eslint-disable-next-line no-debugger
    if (index > 0) setSelectedTabIndex(index + 1);
    else setSelectedTabIndex(1);
  };

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setSelectSaveSearch(false);
    }
    if (chartsRef.current && !chartsRef.current.contains(event.target)) {
      setSelectSaveGraph(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (index, field, value) => {
    setAddNewLink((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const defaultData = [{ title: '', link: '' }];

  return (
    <>
      <MultiFilterContainer>
        <SingleFilterWrapper>
          {selectedCompOption !== 'link' && <Label>{selectLabel}</Label>}
          {(selectedCompOption === 'saved_search' ||
            selectedCompOption === 'saved_graph') && (
            <DropdownContainer ref={selectRef}>
              <SelectOptionComponent
                // active={dropdownOpenStates[0]}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectSaveSearch(!selectSaveSearch);
                  setSelectSaveGraph(false);
                  setSelectTagsFlag(false);
                }}
              >
                <SelectedOption>
                  {selectSaveSearchLabel || 'Select'}
                </SelectedOption>
                <ArrowIcon />
              </SelectOptionComponent>
              <DropdownOptionsList open={selectSaveSearch}>
                {savedSearchData?.data?.map((option, i) => (
                  <DropdownListItem
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveOptionChange(option);
                      setSelectedSearchID(option);
                      setSelectedTag('');
                    }}
                  >
                    <OptionTitle>{option?.title}</OptionTitle>
                  </DropdownListItem>
                ))}
              </DropdownOptionsList>
            </DropdownContainer>
          )}
          {articleCount && selectedCompOption === 'saved_search' && (
            <AlertMsg>
              {articleCount.toLocaleString('en-US')} Articles Available
            </AlertMsg>
          )}
          {/* {!articleCount && (
          <AlertMsg>Please Select a Saved Search before Clicking Add </AlertMsg>
        )} */}
          {selectedCompOption === 'saved_graph' && (
            <SingleFilterWrapper graph={true}>
              <Label>Available Charts</Label>
              <DropdownContainer ref={chartsRef}>
                <SelectOptionComponent
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectSaveGraph(!selectSaveGraph);
                  }}
                >
                  <SelectedOption>
                    {selectedGraph?.component[0]}{' '}
                    {selectedGraph?.component.length > 1
                      ? `, +${selectedGraph?.component.length - 1} more`
                      : selectedGraph?.component.length === 0
                      ? 'Select'
                      : ''}
                  </SelectedOption>
                  <ArrowIcon />
                </SelectOptionComponent>
                <DropdownOptionsList open={selectSaveGraph}>
                  {graphTitle?.map((option, i) => (
                    <DropdownListItem key={option?.id}>
                      <OptWrp>
                        <OptCheckBox
                          onChange={handleGraphChange}
                          type="checkbox"
                          value={option?.label}
                          key={i}
                          checked={selectedGraph.component.some(
                            (ele) => ele === option.label
                          )}
                        />
                        <OptionTitle>{option?.label}</OptionTitle>
                      </OptWrp>
                    </DropdownListItem>
                  ))}
                </DropdownOptionsList>
              </DropdownContainer>
            </SingleFilterWrapper>
          )}
          {selectedCompOption === 'csv' && (
            <>
              <CSVWrp>
                <CSVInput
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleSaveOptionChange}
                />
                <CSVLabel onClick={() => fileInputRef.current.click()}>
                  {selectedFileName || 'Select File to Upload'}
                </CSVLabel>
              </CSVWrp>
              {articleCount && selectedFileName && (
                <AlertMsg>{articleCount} Articles Available</AlertMsg>
              )}
              {selectedCompOption === 'csv' &&
                fileValidation &&
                !articleCount && <AlertMsg>{fileValidation}</AlertMsg>}
            </>
          )}
          {selectedCompOption === 'link' && (
            <>
              <LinkButtonWrp>
                {addNewLink.length > 1 &&
                  addNewLink.map((_, index) => (
                    <LinkButton
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTabChange(index);
                      }}
                      active={index === selectedTabIndex - 1}
                    >
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </LinkButton>
                  ))}
              </LinkButtonWrp>
              <LinkWrp length={articleLinkFetch[selectedTabIndex - 1]}>
                {addNewLink?.length ? (
                  addNewLink
                    // .filter((obj) => Object.keys(obj).length !== 0)
                    .map(
                      (singleItem, index) =>
                        index === selectedTabIndex - 1 && (
                          <React.Fragment key={index}>
                            <Label select={selectedCompOption}>
                              {selectLabel}
                            </Label>
                            <LinkDetailLabelFieldWrp>
                              <LinkInput
                                type="text"
                                value={singleItem?.link || ''}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    'link',
                                    e.target.value
                                  )
                                }
                              />
                              <LinkSubmit
                                onClick={() => handleFetchArticles(index)}
                              >
                                {fetchButton}
                              </LinkSubmit>
                              <LinkMsg>
                                Once the article is fetched, you can verify the
                                details.
                              </LinkMsg>
                              {/* {errorMessage && !articleLinkFetch && (
                                <ErrorMessage>{errorMessage}</ErrorMessage>
                              )} */}
                            </LinkDetailLabelFieldWrp>

                            {articleLinkFetch[index] && (
                              <React.Fragment key={index}>
                                <LinkDetailLabelFieldWrp>
                                  <SelectedOption>Article Title</SelectedOption>
                                  <LinkTextArea
                                    type="text"
                                    name="title"
                                    value={singleItem?.title}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        'title',
                                        e.target.value
                                      )
                                    }
                                    rows={2}
                                  />
                                </LinkDetailLabelFieldWrp>

                                <LinkDetailLabelFieldWrp>
                                  <SelectedOption>
                                    Article Description
                                  </SelectedOption>
                                  <LinkTextArea
                                    rows={5}
                                    type="text"
                                    value={singleItem?.content}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        'content',
                                        e.target.value
                                      )
                                    }
                                  />
                                </LinkDetailLabelFieldWrp>

                                <LinkDetailLabelFieldWrp>
                                  <Label>Image URL</Label>
                                  <LinkInput
                                    type="text"
                                    name="imagePublicUrl"
                                    value={singleItem?.imagePublicUrl || ''}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        'imagePublicUrl',
                                        e.target.value
                                      )
                                    }
                                  />
                                </LinkDetailLabelFieldWrp>

                                <LinkDetailLabelFieldWrp>
                                  <SelectedOption>
                                    Publication Name
                                  </SelectedOption>
                                  <LinkInput
                                    type="text"
                                    value={singleItem?.publication}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        'publication',
                                        e.target.value
                                      )
                                    }
                                  />
                                </LinkDetailLabelFieldWrp>

                                <LinkDetailWrpFields>
                                  <LinkDetailSection>
                                    <SelectedOption>
                                      Date of Publication
                                    </SelectedOption>
                                    <LinkInput
                                      type="date"
                                      placeholder="mm/dd/yyyy"
                                      value={singleItem?.date}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          'date',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </LinkDetailSection>

                                  <LinkDetailSection>
                                    <SelectedOption>Location</SelectedOption>
                                    <LinkInput
                                      type="text"
                                      placeholder="Enter location"
                                      value={singleItem?.place}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          'place',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </LinkDetailSection>

                                  <LinkDetailSection>
                                    <SelectedOption>Author</SelectedOption>
                                    <LinkInput
                                      type="text"
                                      placeholder="Enter Author"
                                      value={singleItem?.author}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          'author',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </LinkDetailSection>

                                  <LinkDetailSection>
                                    <SelectedOption>
                                      Article Type
                                    </SelectedOption>
                                    <LinkInput
                                      type="text"
                                      placeholder="Enter Article Type"
                                      value={singleItem?.type}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          'type',
                                          e.target.value
                                        )
                                      }
                                    />
                                  </LinkDetailSection>
                                  <SimilarData
                                    onChange={(name, data, e) => {
                                      if (name === 'similarNews') {
                                        handleInputChange(
                                          index,
                                          'shouldShowOption',
                                          data
                                        );
                                        if (data) {
                                          handleInputChange(
                                            index,
                                            'similarData',
                                            [...defaultData]
                                          );
                                        }
                                      } else {
                                        handleInputChange(
                                          index,
                                          'similarData',
                                          data
                                        );
                                      }
                                    }}
                                    similarNewsData={
                                      singleItem?.similarData || []
                                    }
                                    shouldShowSimilarNews={
                                      singleItem?.shouldShowOption
                                    }
                                  />
                                  <LinkDetailLabelFieldWrp>
                                    <LinkSubmit
                                      onClick={() => {
                                        if (articleLinkFetch[index]) {
                                          handleAddNewLink(singleItem);
                                        } else {
                                          setErrorMessage(
                                            'Kindly fetch the article and then click on Add button.'
                                          );
                                        }
                                      }}
                                    >
                                      Add Another Link
                                    </LinkSubmit>

                                    <LinkSubmit
                                      onClick={() =>
                                        handleRemoveLinkArticles(index)
                                      }
                                    >
                                      Remove this Article
                                    </LinkSubmit>
                                  </LinkDetailLabelFieldWrp>
                                </LinkDetailWrpFields>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )
                    )
                ) : (
                  <>
                    {/* <Label select={selectedCompOption}>{selectLabel}</Label>
                    <LinkDetailLabelFieldWrp>
                      <LinkInput
                        type="text"
                        value={linkText || ''}
                        onChange={(e) => setLinkText(e.target.value)}
                      />
                      <LinkSubmit onClick={() => handleFetchArticles()}>
                        Fetch Article
                      </LinkSubmit>
                      <LinkMsg>
                        Once the article is fetched, you can verify the details.
                      </LinkMsg>
                    </LinkDetailLabelFieldWrp> */}
                  </>
                )}
              </LinkWrp>
            </>
          )}
          {selectedCompOption === 'upload_image' && (
            <>
              <CSVWrp>
                <CSVInput
                  type="file"
                  accept=".png,.jpeg"
                  ref={fileInputRef}
                  onChange={handleSaveOptionChange}
                />
                <CSVLabel onClick={() => fileInputRef.current.click()}>
                  {selectedFileName || 'Select File to Upload'}
                </CSVLabel>
              </CSVWrp>
              {selectedCompOption === 'upload_image' &&
                fileValidation &&
                !selectedFileName && <AlertMsg>{fileValidation}</AlertMsg>}
              <ImgWrp>
                <Label>Add Title</Label>
                <ImgInput
                  type="text"
                  placeholder="Title"
                  value={graphImageTitle}
                  onChange={(e) => setGraphImageTitle(e.target.value)}
                  name="title"
                />
              </ImgWrp>
              {graphImageTitle === '' &&
                selectedCompOption === 'upload_image' && (
                  <AlertMsg>{titleRequired}</AlertMsg>
                )}
            </>
          )}
        </SingleFilterWrapper>
        {filterLabels?.map((filter, i) => {
          const { value, label } = filter;
          const selectedOption = selectedOptions[value];
          const options = filterKeyOptions[value];
          const defaultOption = options[0]?.label;
          return (
            // eslint-disable-next-line react/jsx-key
            <AllWrp index={i} addType={selectedCompOption}>
              <SingleFilterWrapper key={value}>
                <Label>
                  {(selectedCompOption === 'csv' && label === 'Tags/Themes') ||
                  (selectedCompOption === 'csv' &&
                    label === 'Sort Articles By') ||
                  selectedCompOption === 'link' ||
                  selectedCompOption === 'upload_image' ||
                  selectedCompOption === 'saved_graph'
                    ? ''
                    : label}
                </Label>
                {(selectedCompOption === 'csv' && label === 'Tags/Themes') ||
                (selectedCompOption === 'csv' &&
                  label === 'Sort Articles By') ||
                selectedCompOption === 'link' ||
                selectedCompOption === 'upload_image' ||
                selectedCompOption === 'saved_graph' ? (
                  ''
                ) : (
                  <DropdownContainer
                    ref={(el) => (dropdownRefs.current[value] = el)}
                  >
                    <SelectOptionComponent
                      active={dropdownOpenStates[value]}
                      onClick={() => toggleDropdown(value)}
                    >
                      {label === 'No of Articles' && (
                        <LimitInput
                          placeholder="Enter number within 100"
                          type="number"
                          value={
                            // options?.find((x) => x?.value === selectedOption)
                            //   ?.label
                            inputValue
                          }
                          onChange={(e) => {
                            const inputNumber = e.target.value;
                            if (
                              inputNumber === '' ||
                              (parseInt(inputNumber) >= 0 &&
                                parseInt(inputNumber) <= 100)
                            ) {
                              setInputValue(inputNumber);
                              if (inputNumber) {
                                onChange('limit', inputNumber);
                              }
                            }
                          }}
                        />
                      )}
                      {label !== 'No of Articles' && (
                        <SelectedOption>
                          {options?.find((x) => x?.value === selectedOption)
                            ?.label ||
                            (label === 'No of Articles' && inputValue) ||
                            defaultOption}
                        </SelectedOption>
                      )}
                      <ArrowIcon isOpen={dropdownOpenStates[value]} />
                    </SelectOptionComponent>
                    <DropdownOptionsList open={dropdownOpenStates[value]}>
                      {/* {label === 'No of Articles' && (
                        <LimitInput
                          placeholder="Enter number within 100"
                          type="number"
                          value={inputValue}
                          onChange={(e) => {
                            const inputNumber = e.target.value;
                            if (
                              inputNumber === '' ||
                              (parseInt(inputNumber) >= 0 &&
                                parseInt(inputNumber) <= 100)
                            ) {
                              setInputValue(inputNumber);
                              if (inputNumber) {
                                onChange('limit', inputNumber);
                              }
                            }
                          }}
                        />
                      )} */}
                      {options?.map((option, i) => (
                        <DropdownListItem
                          key={option?.value}
                          onClick={() =>
                            handleSortOptionChange(value, option?.value)
                          }
                        >
                          <OptionTitle>{option?.label}</OptionTitle>
                        </DropdownListItem>
                      ))}
                    </DropdownOptionsList>
                  </DropdownContainer>
                )}
              </SingleFilterWrapper>
            </AllWrp>
          );
        })}
      </MultiFilterContainer>
      {selectedCompOption === 'saved_search' && (
        <TagWrp>
          <Label grayedOut={!tagsData?.data?.distinct_tags?.length > 0}>
            Tags/Themes
          </Label>
          <DropdownContainer>
            <SelectOptionComponent
              // active={dropdownOpenStates[0]}
              onClick={(e) => {
                e.preventDefault();
                tagsData?.data?.distinct_tags?.length &&
                  setSelectTagsFlag(!selectTagsFlag);
                setSelectSaveSearch(false);
              }}
            >
              <SelectedOption
                grayedOut={!tagsData?.data?.distinct_tags?.length > 0}
              >
                {selectedTag || 'Select'}
              </SelectedOption>
              <ArrowIcon />
            </SelectOptionComponent>
            <DropdownOptionsList open={selectTagsFlag}>
              {selectSaveSearchLabel &&
                tagsData?.data?.distinct_tags?.map((option, i) => (
                  <DropdownListItem
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTag(option);
                      setSelectTagsFlag(false);
                    }}
                  >
                    <OptionTitle>{option}</OptionTitle>
                  </DropdownListItem>
                ))}
            </DropdownOptionsList>
          </DropdownContainer>
        </TagWrp>
      )}
    </>
  );
};
MultiFilter.propTypes = {
  filterLabels: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  filterKeyOptions: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onChange: PropTypes.func,
  selectLabel: PropTypes.string,
  savedSearchData: PropTypes.array,
  selectedSearchDetails: PropTypes.object,
  setSelectedSearchDetails: PropTypes.func,
  selectedCompOption: PropTypes.string,
  canvas: PropTypes.array,
  setSelectedGraph: PropTypes.func,
  selectedGraph: PropTypes.object,
  submitStatus: PropTypes.bool,
  articleCount: PropTypes.string,
  fetchArticles: PropTypes.func,
  selectedFileName: PropTypes.string,
  setGraphImageTitle: PropTypes.func,
  graphImageTitle: PropTypes.string,
  setLinkText: PropTypes.func,
  linkText: PropTypes.string,
  rowIndex: PropTypes.string,
  setTotalAddedLinks: PropTypes.func,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
  setAddNewLink: PropTypes.func,
  addNewLink: PropTypes.array,
  setSelectedTag: PropTypes.func,
  selectedTag: PropTypes.string,
  selectedSearchID: PropTypes.any,
  setSelectedSearchID: PropTypes.func,
  isEdit: PropTypes.bool,
  filterData: PropTypes.object,
  titleRequired: PropTypes.string,
};
export default MultiFilter;
