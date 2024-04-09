import React, { useState, useEffect } from 'react';
import {
  // ButtonBoxwpr,
  ButtonWrp,
  ContentWrp,
  HeaderDespWrp,
  HeaderTandDWrap,
  InputWrp,
  MainWrp,
} from './index.sc';
import { filterLabels, filterKeyOptions } from './filterData';
import PropTypes from 'prop-types';
import { theme } from '../../../../../../constants/theme';
import MultiFilter from '../../../../../../components/multiple-filter-component';
import {
  Headerleftwpr,
  Headerwrap,
  Heaerlblwrp,
  Iconwpr,
} from '../../../../../../components/custom-drawer/index.sc';
import { useSelector } from 'react-redux';
import X from '../../../../../../assets/icons/X';
import { Button } from '../../../../../../components/button';
import { ErrorMessage } from '../../../../../../components/multiple-filter-component/index.sc';

const ArticleInputBox = ({
  handleClose,
  onSubmit,
  filterData,
  setFilterData,
  refetch,
  heading = 'Add Article',
  selectedCompOption,
  selectedSearchDetails,
  setSelectedSearchDetails,
  canvas,
  handleGraphSubmit,
  setSelectedGraph,
  selectedGraph,
  setSubmitStatus,
  submitStatus,
  articleCount,
  fetchArticles,
  selectedFileName,
  setGraphImageTitle,
  graphImageTitle,
  setTotalAddedLinks,
  totalAddedLinks,
  setLinkText,
  linkText,
  rowIndex,
  errorMessage,
  setErrorMessage,
  addNewLink,
  setAddNewLink,
  setSelectedTag,
  selectedTag,
  selectedSearchID,
  setSelectedSearchID,
  isEdit,
  savedSearchData,
  isLoading,
  btnTxt,
  setBtnTxt,
}) => {
  const handleFilterChange = (label, selectedOption) => {
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      [label]: selectedOption,
    }));
  };

  const [descp, setDescp] = useState('');
  const [selectLabel, setSelectLabel] = useState('');
  const [titleRequired, setTitleRequired] = useState('');

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const handleToggle = () => {
    handleClose();
  };

  function handleUrlSubmit() {
    // refetch();
    // eslint-disable-next-line no-debugger
    // Only when there is search Id it should executive next steps
    setErrorMessage('');
    if (fetchArticles && selectedCompOption === 'saved_graph') {
      if (selectedSearchDetails?.id && selectedGraph?.component?.length > 0) {
        setSubmitStatus((prev) => !prev);
        // setBtnTxt('Please wait...');
      } else {
        setErrorMessage('Kindly select the related fields.');
      }
    } else if (fetchArticles && selectedCompOption === 'saved_search') {
      if (selectedSearchDetails?.id) {
        setSubmitStatus((prev) => !prev);
        // setBtnTxt('Please wait...');
      } else {
        setErrorMessage('Kindly select the related fields.');
      }
    } else if (selectedCompOption === 'csv') {
      if (selectedFileName) {
        setSubmitStatus((prev) => !prev);
      } else {
        setErrorMessage('Kindly select the CSV file to upload.');
      }
    } else if (selectedCompOption === 'upload_image') {
      if (selectedFileName && graphImageTitle) {
        setSubmitStatus((prev) => !prev);
      } else if (!graphImageTitle) {
        setErrorMessage('Kindly fill in the Title.');
      } else {
        setErrorMessage('Kindly Select the Image to upload.');
      }
    } else if (
      selectedCompOption === 'link' &&
      addNewLink?.length >= 1 &&
      totalAddedLinks?.length >= 0
    ) {
      if (addNewLink?.some(checkIfItHasEmptyFields)) {
        setErrorMessage(
          'Kindly enter Publication Names and Links in all tabs.'
        );
      } else {
        setSubmitStatus((prev) => !prev);
      }
      // setBtnTxt('Please wait...');
    } else {
      setSubmitStatus(false);
      setBtnTxt('Add');
    }
  }

  const checkIfItHasEmptyFields = (linkData) => {
    if (linkData?.similarData?.length > 0) {
      return linkData?.similarData
        ?.filter((x) => x?.link || x?.title)
        ?.some((x) => !x?.title || !x?.link);
    }
    return false;
  };

  useEffect(() => {
    if (submitStatus) {
      if (
        selectedCompOption === 'saved_graph' ||
        (selectedCompOption === 'upload_image' && graphImageTitle)
      ) {
        handleGraphSubmit();
        setSubmitStatus(false);
      } else if (
        selectedCompOption === 'saved_search' ||
        selectedCompOption === 'csv' ||
        selectedCompOption === 'link'
      ) {
        onSubmit();
        setSubmitStatus(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitStatus, selectedCompOption]);

  useEffect(() => {
    if (selectedCompOption === 'saved_search') {
      setDescp('Select a saved search to add articles to the Newsletter');
      setSelectLabel('Saved Search');
    } else if (selectedCompOption === 'csv') {
      setDescp('Upload CSV file to add articles to the Newsletter.');
      setSelectLabel('Select CSV');
    } else if (selectedCompOption === 'saved_graph') {
      setDescp('Select a saved search to add charts to the Newsletter');
      setSelectLabel('Saved Search');
    } else if (selectedCompOption === 'upload_image') {
      setDescp(
        'To add chart view, please upload JPEG or PNG files to the Newsletter.'
      );
      setSelectLabel('Select JPEG or PNG File');
    } else {
      setDescp('Paste the links to add article to the Newsletter');
      setSelectLabel('Article Link');
    }
  }, [selectedCompOption]);

  const downloadCsv = (e) => {
    e.preventDefault();
    try {
      // Path to the dummy CSV file
      // const csvFilePath = '/dummy.csv';

      // Create a link element
      const link = document.createElement('a');

      // Set the download attribute and file path
      link.download = 'sample_CSV.csv';
      link.href = process.env.REACT_APP_CSV_FILE;

      // Trigger a click event to start the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log('Download failed', error);
    }
  };

  return (
    <MainWrp
      onClick={() => {
        handleClose();
      }}
    >
      <InputWrp
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Headerwrap addArticle={true}>
          <HeaderTandDWrap>
            <Headerleftwpr>
              <Heaerlblwrp>
                {selectedCompOption === 'saved_graph' ||
                selectedCompOption === 'upload_image'
                  ? 'Add Charts'
                  : heading}
              </Heaerlblwrp>
            </Headerleftwpr>
            <HeaderDespWrp>
              {descp}{' '}
              {selectedCompOption === 'csv' ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#" onClick={(e) => downloadCsv(e)}>
                  Download sample CSV format
                </a>
              ) : (
                ''
              )}
            </HeaderDespWrp>
          </HeaderTandDWrap>
          <Iconwpr onClick={handleToggle}>
            <X color={theme[selectedTheme].primary} size={28} />
          </Iconwpr>
        </Headerwrap>
        <ContentWrp>
          {/* <InputBoxTitle>URL Link</InputBoxTitle>
          <InputBox ref={linkRef} placeholder="Add url link here" /> */}
          <MultiFilter
            filterLabels={filterLabels}
            filterKeyOptions={filterKeyOptions}
            onChange={handleFilterChange}
            selectLabel={selectLabel}
            savedSearchData={savedSearchData?.data}
            isLoading={isLoading}
            selectedCompOption={selectedCompOption}
            selectedSearchDetails={selectedSearchDetails}
            setSelectedSearchDetails={setSelectedSearchDetails}
            canvas={canvas}
            setSelectedGraph={setSelectedGraph}
            selectedGraph={selectedGraph}
            submitStatus={submitStatus}
            articleCount={articleCount}
            fetchArticles={fetchArticles}
            selectedFileName={selectedFileName}
            setGraphImageTitle={setGraphImageTitle}
            graphImageTitle={graphImageTitle}
            setTotalAddedLinks={setTotalAddedLinks}
            setLinkText={setLinkText}
            linkText={linkText}
            rowIndex={rowIndex}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setAddNewLink={setAddNewLink}
            addNewLink={addNewLink}
            setSelectedTag={setSelectedTag}
            selectedTag={selectedTag}
            selectedSearchID={selectedSearchID}
            setSelectedSearchID={setSelectedSearchID}
            isEdit={isEdit}
            filterData={filterData}
            titleRequired={titleRequired}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </ContentWrp>
        <ButtonWrp>
          <Button
            title={'Cancel'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={handleClose}
            border={theme[selectedTheme].primary}
          />
          <Button
            title={btnTxt}
            backgroundColor={theme[selectedTheme].primary}
            onClick={handleUrlSubmit}
          />
        </ButtonWrp>
      </InputWrp>
    </MainWrp>
  );
};

ArticleInputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  filterData: PropTypes.any,
  setFilterData: PropTypes.any,
  refetch: PropTypes.any,
  heading: PropTypes.string,
  selectedCompOption: PropTypes.string,
  setSelectedSearchDetails: PropTypes.func,
  selectedSearchDetails: PropTypes.object,
  canvas: PropTypes.array,
  handleGraphSubmit: PropTypes.func.isRequired,
  setSelectedGraph: PropTypes.func,
  selectedGraph: PropTypes.object,
  setSubmitStatus: PropTypes.func,
  submitStatus: PropTypes.bool,
  articleCount: PropTypes.string,
  fetchArticles: PropTypes.func,
  selectedFileName: PropTypes.string,
  setGraphImageTitle: PropTypes.func,
  graphImageTitle: PropTypes.string,
  setTotalAddedLinks: PropTypes.func,
  totalAddedLinks: PropTypes.array,
  setLinkText: PropTypes.func,
  linkText: PropTypes.string,
  rowIndex: PropTypes.string,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
  setAddNewLink: PropTypes.func,
  addNewLink: PropTypes.array,
  selectedTag: PropTypes.string,
  setSelectedTag: PropTypes.func,
  selectedSearchID: PropTypes.any,
  setSelectedSearchID: PropTypes.func,
  isEdit: PropTypes.bool,
  savedSearchData: PropTypes.object,
  isLoading: PropTypes.bool,
  setBtnTxt: PropTypes.func,
  btnTxt: PropTypes.string,
};

export default ArticleInputBox;
