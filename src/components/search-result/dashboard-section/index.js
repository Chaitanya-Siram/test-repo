import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  // BackDrop,
  // DashboardInnerSection,
  DashboardSection,
  // articleWdth,
  // DropHeader,
  // FullSlot,
  // HalfSlot,
  // Iconwpr,
  // SlotWrp,
  // UberTextTitle,
  // UberTilesWrp,
  // UserTilesMainWrp,
} from '../index.sc';
// import OverviewDropdown from '../../overview-dropdown';
// import IconPop from '../../icon-popup';
// import DownloadIcon from '../../../assets/icons/DownloadIcon';
// import { AdvanceDashboard, Widgets } from '../../../constants/overview';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useDashboardData } from '../../../hooks/useSearch';
// import { useParams } from 'react-router';
// import Spinner from '../../spinner';
import DashboardInnerContainer from './DashboardInnerContainer';
// import DashboardHeader from './dashboard-header';
// import { dashboardTabs } from '../../../constants/dashboard';

import DashboardHeaderV2 from './dashboard-header-v2/index.js';
import GraphIconBox from '../GraphIconBox';
import { useLocation } from 'react-router-dom';

// const downloadList = [
//   {
//     id: 0,
//     label: 'PDF',
//   },
//   {
//     id: 1,
//     label: 'Excel',
//   },
//   {
//     id: 2,
//     label: 'CSV',
//   },
// ];

const findIndexByTitle = (arr = [], title = '') =>
  [...arr].findIndex((obj) => obj?.title === title);

const updateState = (stateArray, newState, index) =>
  index === -1
    ? stateArray
    : [...stateArray.slice(0, index), newState, ...stateArray.slice(index + 1)];

const DashboardSectionComponent = ({
  setSyndicationClick,
  activeScreen,
  loader,
  setArticleType,
  articleType,
  tileDetails,
  dashboardDetails,
  overView = true,
  setClickedPosition,
  articlePosition,
  customWidgetDetails,
  setResetSelection,
  setSelected,
  selected,
  setArticleTypeClose,
  resetSelection,
  setArticlePosition,
  setSelectedGraph,
  selectGraph,
  dashboardType,
  customCanvas,
  editOption,
  volumeAnalysisWidgetDetails,
  sentimentAnalysisWidgetDetails,
  sentimeOverTimeWidgetDetails,
  topJournalistSentimentAnalysisWidgetDetails,
  coverageOverTimeBrandWidgetDetails,
  reachOvertimeBrandWidgetDetails,
  SOVWidgetDetails,
  coverageOverTimeCompWidgetDetails,
  mediaTypeWidgetDetails,
  peopleCoverageChartDataWidgetDetails,
  peopleThemeWidgetDetails,
  peopleMediaTypeWidgetDetails,
  peopleVolumeAnalysisWidgetDetails,
  peopleSentimentAnalysisWidgetDetails,
  sentimentCompWidgetDetails,
  reachOvertimeCompWidgetDetails,
  mediaBreakdownWidgetDetails,
  journalistWidgetDetails,
  sourceCompWidgetDetails,
  placeholderGraphs,
  handleGraphTitleUpdate,
  industryVolumeAnalysisWidgetDetails,
  industrySentimentWidgetDetails,
  industryCoverageOverTimeWidgetDetails,
  industryCoverageBySourceWidgetDetails,
  industryCompaniesWidgetDetails,
  industryCoverageByJournalistsWidgetDetails,
  industryPublicationsWidgetDetails,
  isSavePopup
}) => {
  // const [selectedTab, setSelectedTab] = useState('overview');
  // const createPdf = async () => {
  //   // eslint-disable-next-line new-cap
  //   const pdf = new jsPDF('portrait', 'pt', 'a4');
  //   const contentElement = document.querySelector('#download-content');
  //   const graphElements = contentElement.querySelectorAll('.graph-widget');

  //   const capturePromises = Array.from(graphElements).map(
  //     async (graphElement) => {
  //       contentElement.scrollTo(0, graphElement.offsetTop);
  //       const data = await html2canvas(graphElement);
  //       return data.toDataURL('image/png');
  //     }
  //   );

  //   const graphImages = await Promise.all(capturePromises);

  //   graphImages.forEach((img, index) => {
  //     const imgProperties = pdf.getImageProperties(img);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  //     const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
  //     const y = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;
  //     pdf.addImage(img, 'PNG', x, y, pdfWidth, pdfHeight);

  //     if (index < graphImages.length - 1) {
  //       pdf.addPage();
  //     }
  //   });

  //   // Save the PDF
  //   pdf.save('search_result.pdf');
  // };

  // const handleDownload = (id) => {
  //   const downloadOption = downloadList.find(
  //     (download) => download.id === id
  //   ).label;
  //   if (downloadOption.toLowerCase() === 'pdf') {
  //     createPdf();
  //   }
  // };

  // const handleTabChange = (index) => {
  //   setSelectedTab(dashboardTabs[index]?.type);
  // };

  // if (dashboardDataLoading) {
  //   return <Spinner />;
  // }

  const [showFeatures, SetShowFeature] = useState(false);

  const [dashboardState, setDashboardState] = useState([...dashboardDetails]);
  const location = useLocation();
  const savedSelectedChart =
    location?.state?.savedDashboardData?.chart_field?.selectedChart;

  const handleSaveDashboard = () => {
    console.log('save dashboard', [...dashboardState]);
  };

  const handleUpdatedChart = (data) => {
    const { chartType: updatedChartType, chartName: chartTitle } = data;

    let objIndex = -1;
    let updatedDashState = [];

    objIndex = findIndexByTitle(dashboardState, chartTitle);
    if (objIndex !== -1) {
      const updatedObj = {
        ...dashboardState[objIndex],
        graphType: updatedChartType,
      };
      updatedDashState = updateState(dashboardState, updatedObj, objIndex);
      setDashboardState(updatedDashState);
    }
  };
  const handleShowDownloadPopUp = () => {
    SetShowFeature((prev) => !prev);
  };

  return (
    <DashboardSection
      activeScreen={activeScreen}
      className={activeScreen === 'dashboard' ? 'active' : ''}
      articlePosition={articlePosition}
    >
      {overView && (
        <DashboardHeaderV2
          handleSaveDashboard={handleSaveDashboard}
        ></DashboardHeaderV2>
      )}
      {/* <DropHeader>
        <DashboardHeader
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
          tabKeywords={tabKeywords}
        />
      </DropHeader> */}
      <DashboardInnerContainer
        resetData={() => {
          setSyndicationClick &&
            setSyndicationClick({
              widget: undefined,
              graphSelection: undefined,
              rawData: null,
            });
        }}
        isSavePopup={isSavePopup}
        handleGraphTitleUpdate={handleGraphTitleUpdate}
        dashboardDetails={dashboardState}
        tileDetails={tileDetails}
        customWidgetDetails={customWidgetDetails}
        loader={loader}
        articleType={articleType}
        setArticleType={setArticleType}
        overRideSlot={activeScreen !== 'dashboard'}
        setClickedPosition={setClickedPosition}
        articlePosition={''}
        handleUpdatedChart={handleUpdatedChart}
        setResetSelection={setResetSelection}
        setSelected={setSelected}
        selected={selected}
        setArticlePosition={setArticlePosition}
        resetSelection={resetSelection}
        setArticleTypeClose={setArticleTypeClose}
        selectGraph={selectGraph}
        setSelectedGraph={setSelectedGraph}
        handleShowDownloadPopUp={handleShowDownloadPopUp}
        dashboardType={dashboardType}
        customCanvas={customCanvas}
        editOption={editOption}
        volumeAnalysisWidgetDetails={volumeAnalysisWidgetDetails}
        sentimentAnalysisWidgetDetails={sentimentAnalysisWidgetDetails}
        sentimeOverTimeWidgetDetails={sentimeOverTimeWidgetDetails}
        topJournalistSentimentAnalysisWidgetDetails={
          topJournalistSentimentAnalysisWidgetDetails
        }
        coverageOverTimeBrandWidgetDetails={coverageOverTimeBrandWidgetDetails}
        reachOvertimeBrandWidgetDetails={reachOvertimeBrandWidgetDetails}
        SOVWidgetDetails={SOVWidgetDetails}
        coverageOverTimeCompWidgetDetails={coverageOverTimeCompWidgetDetails}
        mediaTypeLWidgetDetails={mediaTypeWidgetDetails}
        peopleCoverageChartDataWidgetDetails={
          peopleCoverageChartDataWidgetDetails
        }
        peopleThemeWidgetDetails={peopleThemeWidgetDetails}
        peopleMediaTypeWidgetDetails={peopleMediaTypeWidgetDetails}
        peopleVolumeAnalysisWidgetDetails={peopleVolumeAnalysisWidgetDetails}
        peopleSentimentAnalysisWidgetDetails={
          peopleSentimentAnalysisWidgetDetails
        }
        sentimentCompWidgetDetails={sentimentCompWidgetDetails}
        reachOvertimeCompWidgetDetails={reachOvertimeCompWidgetDetails}
        mediaBreakdownWidgetDetails={mediaBreakdownWidgetDetails}
        journalistWidgetDetails={journalistWidgetDetails}
        sourceCompWidgetDetails={sourceCompWidgetDetails}
        industryVolumeAnalysisWidgetDetails={
          industryVolumeAnalysisWidgetDetails
        }
        industrySentimentWidgetDetails={industrySentimentWidgetDetails}
        industryCoverageOverTimeWidgetDetails={
          industryCoverageOverTimeWidgetDetails
        }
        industryCoverageBySourceWidgetDetails={
          industryCoverageBySourceWidgetDetails
        }
        industryCompaniesWidgetDetails={industryCompaniesWidgetDetails}
        industryCoverageByJournalistsWidgetDetails={
          industryCoverageByJournalistsWidgetDetails
        }
        industryPublicationsWidgetDetails={industryPublicationsWidgetDetails}
        placeholderGraphs={placeholderGraphs}
        savedSelectedChart={savedSelectedChart}
      />
      {showFeatures && <GraphIconBox />}
    </DashboardSection>
  );
};

export default DashboardSectionComponent;

DashboardSectionComponent.propTypes = {
  activeScreen: PropTypes.string,
  loader: PropTypes.bool,
  setArticleType: PropTypes.func,
  articleType: PropTypes.object,
  tileDetails: PropTypes.array,
  dashboardDetails: PropTypes.array,
  customWidgetDetails: PropTypes.object,
  overView: PropTypes.bool,
  setClickedPosition: PropTypes.func,
  articlePosition: PropTypes.string,
  setResetSelection: PropTypes.func,
  setSelected: PropTypes.func,
  selected: PropTypes.any,
  setArticlePosition: PropTypes.func,
  resetSelection: PropTypes.bool,
  setArticleTypeClose: PropTypes.func,
  setSelectedGraph: PropTypes.func,
  selectGraph: PropTypes.object,
  dashboardType: PropTypes.string,
  customCanvas: PropTypes.object,
  editOption: PropTypes.bool,
  volumeAnalysisWidgetDetails: PropTypes.object,
  sentimentAnalysisWidgetDetails: PropTypes.object,
  sentimeOverTimeWidgetDetails: PropTypes.object,
  topJournalistSentimentAnalysisWidgetDetails: PropTypes.object,
  coverageOverTimeBrandWidgetDetails: PropTypes.object,
  reachOvertimeBrandWidgetDetails: PropTypes.object,
  SOVWidgetDetails: PropTypes.object,
  coverageOverTimeCompWidgetDetails: PropTypes.object,
  mediaTypeWidgetDetails: PropTypes.object,
  peopleCoverageChartDataWidgetDetails: PropTypes.object,
  peopleThemeWidgetDetails: PropTypes.object,
  peopleMediaTypeWidgetDetails: PropTypes.object,
  peopleVolumeAnalysisWidgetDetails: PropTypes.object,
  peopleSentimentAnalysisWidgetDetails: PropTypes.object,
  sentimentCompWidgetDetails: PropTypes.object,
  reachOvertimeCompWidgetDetails: PropTypes.object,
  mediaBreakdownWidgetDetails: PropTypes.object,
  journalistWidgetDetails: PropTypes.object,
  sourceCompWidgetDetails: PropTypes.object,
  placeholderGraphs: PropTypes.bool,
  handleGraphTitleUpdate: PropTypes.func,
  industryVolumeAnalysisWidgetDetails: PropTypes.object,
  industrySentimentWidgetDetails: PropTypes.object,
  industryCoverageOverTimeWidgetDetails: PropTypes.object,
  industryCoverageBySourceWidgetDetails: PropTypes.object,
  industryCompaniesWidgetDetails: PropTypes.object,
  industryCoverageByJournalistsWidgetDetails: PropTypes.object,
  industryPublicationsWidgetDetails: PropTypes.object,
  setSyndicationClick: PropTypes.func,
  isSavePopup: PropTypes.bool
};
