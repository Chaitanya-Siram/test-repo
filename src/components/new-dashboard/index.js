import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { theme } from '../../constants/theme';
import { Button } from '../button';
import {
  // AddRemoveChartBtn,
  // Deswrpr,
  FooterBoxwpr,
  Graphwpr,
  Headerwpr,
  // Infowpr,
  NewDashboardwpr,
} from './index.sc';
// import Spinner from '../spinner';
import { useLocation, useParams } from 'react-router-dom';
// import { standardDashboards } from '../../constants/widgets';
import { useDownloadGraphsHook } from '../../hooks/common/useDownloadGraphHook';
import { axiosPostRequest } from '../../service';
import ArticleGraph, { dashboardConfig } from '../article-graphs';
import CustomDashboardCanvas from '../custom-dashboard-canvas';
import { TileComponent } from '../custom-drawer/tile-component';
import CustomPopupWrapper from '../custom-popup-wrapper';
import CustomConfirmationPopUp from '../customize-confirmation-popup';
import DashboardPopup from '../dasboard-popup';
import { ButtonBoxwpr, ButtonWrapper } from '../nav-section/index.sc';
import GraphIconBox from '../search-result/GraphIconBox';
import SortDropdown from '../search-result/SortDropdown';
import TileSelector from '../tile-selector';
import { allDashboards } from '../../pages/new-dashboard/utils';

const dashboardDetailFilter = (dashDetails, dashboardType, selectedItems) => {
  if (dashboardType === 'custom') {
    const combinedSelectedWidgets = {};
    Object.keys(selectedItems).forEach((ele) =>
      Object.keys(selectedItems[ele]).forEach((ele1) => {
        combinedSelectedWidgets[ele1] = selectedItems[ele][ele1];
      })
    );
    return (dashDetails || []).filter((item) =>
      Object.keys(combinedSelectedWidgets || {}).find(
        (ele) => combinedSelectedWidgets[ele] && ele === item.component
      )
    );
  } else {
    return (dashDetails || []).filter((item) =>
      Object.keys(selectedItems[dashboardType] || {}).find(
        (ele) => selectedItems[dashboardType][ele] && ele === item.component
      )
    );
  }
};

const NewDashboard = ({
  dashboardData,
  dashboardDataLoading,
  volumeAnalysisWidgetDetails,
  sentimentAnalysisWidgetDetails,
  sentimeOverTimeWidgetDetails,
  topJournalistSentimentAnalysisWidgetDetails,
  peopleCoverageChartDataWidgetDetails,
  coverageOverTimeBrandWidgetDetails,
  reachOvertimeBrandWidgetDetails,
  SOVWidgetDetails,
  peopleThemeWidgetDetails,
  peopleMediaTypeWidgetDetails,
  coverageOverTimeCompWidgetDetails,
  mediaTypeWidgetDetails,
  peopleVolumeAnalysisWidgetDetails,
  peopleSentimentAnalysisWidgetDetails,
  sentimentCompWidgetDetails,
  reachOvertimeCompWidgetDetails,
  mediaBreakdownWidgetDetails,
  journalistWidgetDetails,
  sourceCompWidgetDetails,
  placeholderGraphs,
  setSelectedGraphs,
  handleGraphTitleUpdate,
  searchFilters,
  customData,
  selectedGraphs,
  industryVolumeAnalysisWidgetDetails,
  industrySentimentWidgetDetails,
  industryCoverageOverTimeWidgetDetails,
  industryCoverageBySourceWidgetDetails,
  industryCompaniesWidgetDetails,
  industryCoverageByJournalistsWidgetDetails,
  industryPublicationsWidgetDetails,
  recentSearchId,
  isSavePopup
}) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const { dashboardType, dashboardId } = useParams();
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  const advancedWidgetDetails = dashboardData;
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [checkedItems, setCheckedItem] = useState([]);
  const [addCanvasConfirmationPopUp, setAddConfirmationPopUp] = useState(false);
  const [isDownloadOptionsOpen, setIsDownloadOptionOpen] = useState(false);

  const { onDownload } = useDownloadGraphsHook();

  const addRemoveConfig = ['brand', 'people', 'industry', 'custom'];
  const DownloadDropDownOptions = [
    {
      label: 'Download As Image',
      value: 'Image',
    },
    {
      label: 'Download as Pdf',
      value: 'PDF',
    },
  ];

  const handleCheckedItems = (data) => {
    setCheckedItem(data.filter((item) => item));
  };

  const handleSave = () => {
    const unChecked = dashboardDetails.map((item) => ({
      ...item,
      checked: checkedItems.some((obj) => obj.title === item.title),
    }));
    setDashboardDetails(unChecked);
    setCheckedItem((prev) => prev.filter((item) => item.checked));
    setShow(false);
  };
  const [showCustomize, setShowCustomize] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [isDocDownloading, setIsDocDownloading] = useState(false);

  // useEffect(() => {
  //   if (
  //     dashboardType === 'brand' ||
  //     dashboardType === 'people' ||
  //     dashboardType === 'industry'
  //   ) {
  //     if (!dashboardId) {
  //       const widgetsToBeSelected = standardDashboards.find(
  //         (widget) => widget.value === dashboardType
  //       ).widgets;
  //       if (widgetsToBeSelected) {
  //         const finalWidgets = JSON.parse(JSON.stringify(widgetsToBeSelected));
  //         for (const key in finalWidgets) {
  //           finalWidgets[key] = true;
  //         }
  //         const setObj = { [dashboardType]: finalWidgets };
  //         setSelectedItems(setObj);
  //         setStoreSelectedItems(setObj);
  //         setSelectedGraphs && setSelectedGraphs(setObj);
  //         sessionStorage.setItem('selectedWidgets', JSON.stringify(setObj));
  //       }
  //     }
  //   }
  // }, [dashboardId, dashboardType]);

  // for saved dashboard
  useEffect(() => {
    const apiResSelectedWidgets = selectedGraphs || {};
    setSelectedItems(apiResSelectedWidgets);
    setStoreSelectedItems(apiResSelectedWidgets);
  }, [selectedGraphs, dashboardId, dashboardType]);

  const [storeSelectedItems, setStoreSelectedItems] = useState({});
  const handleCheckedItemsAddRemove = (data) => {
    setStoreSelectedItems(data);
  };

  // const getDownloadPdf = () => {
  //   return axiosGet('/downloadPdf', {
  //     page: 'newdashboard',
  //     dashboardType,
  //     searchId,
  //     dashboardId,
  //   });
  // };

  // const { refetch, isFetching: isDownloading } = useQuery({
  //   queryKey: ['download-pdf'],
  //   queryFn: () => getDownloadPdf(),
  //   refetchOnWindowFocus: false,
  //   enabled: false,
  //   onSuccess: (data) => {
  //     window.open(`${baseURL}/images/${data.data.pdfName}`, '_blank');
  //   },
  // });

  // if (dashboardDataLoading) {
  //   return <Spinner />;
  // }
  const handleAddToCanvas = () => {
    axiosPostRequest('/create-canvas', {}, { searchId: dashboardId });
    setAddConfirmationPopUp(false);
  };
  return (
    <NewDashboardwpr dashboardType={dashboardType}>
      <Headerwpr>
        <div style={{ position: 'relative' }}>
          <GraphIconBox
            fixed={false}
            isAdvanced={dashboardConfig.advanced.includes(dashboardType)}
            downloadClickFunction={() => {
              setIsDownloadOptionOpen((prev) => !prev);
            }}
            downloading={isDocDownloading}
            handleShowAddToCanvas={() => setAddConfirmationPopUp(true)}
            setIsClickOutside={setIsDownloadOptionOpen}
          />
          <SortDropdown
            Open={isDownloadOptionsOpen}
            setIsDropdownOpen={(value) => {
              let graphCharts = allDashboards.map((x) => x.chartId);
              if (dashboardType === 'campaign') {
                graphCharts = ['campaign_analysis'];
              } else if (dashboardType === 'congruence') {
                graphCharts = ['congruence'];
              } else if (dashboardType === 'sentiments') {
                graphCharts = ['sentimentByTheme'];
              } else if (dashboardType === 'authorimpact') {
                graphCharts = ['authorimpact'];
              } else if (dashboardType === 'primpact') {
                graphCharts = ['primpact'];
              }
              onDownload(
                {
                  type: value,
                },
                graphCharts,
                {
                  title: 'All Graphs',
                },
                setIsDocDownloading
              );
              // setIsDownloadOptionOpen((prev) => !prev);
            }}
            setSortOrder={setIsDownloadOptionOpen}
            // sortOrder={''}
            dropdownOptions={DownloadDropDownOptions}
          />
        </div>
        {addRemoveConfig.includes(dashboardType) && (
          <Button
            coachMarkId='coach-add-remove-charts-wrap'
            title={'Add/Remove Charts'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={() => setShowCustomize(true)}
            border={theme[selectedTheme].primary}
          />
        )}
      </Headerwpr>

      <DashboardPopup
        open={show}
        toggler={setShow}
        popContent={
          <Graphwpr>
            {/* <ItemsBox
                setCheckedItems={() => {}}
                selectedItem={{ data: dashboardDetails || [] }}
                handleCheckedItems={handleCheckedItems}
                checkedPassed={true}
              /> */}
            <TileSelector
              handleCheck={handleCheckedItems}
              elements={dashboardDetails || []}
              board={{ label: '', value: '' }}
              InnerChild={TileComponent}
            />
            <FooterBoxwpr>
              <Button
                title="Save"
                color={theme[selectedTheme].background}
                backgroundColor={theme[selectedTheme].primary}
                onClick={() => handleSave()}
              />
            </FooterBoxwpr>
          </Graphwpr>
        }
        padding="1.5rem"
        borderRadius="0.75rem"
      />
      <DashboardPopup
        open={addCanvasConfirmationPopUp}
        toggler={setAddConfirmationPopUp}
        popContent={
          <CustomConfirmationPopUp
            Heading={'Add to Canvas'}
            SecondHeading={'Are you sure you want to add to canvas ?'}
            toggler={setAddConfirmationPopUp}
            handleDelete={handleAddToCanvas}
            actionLabel="Confirm"
          />
        }
        padding="0"
        borderRadius="0.625rem"
        width="35rem"
      />
      {/* {console.log(
        selectedItems,
        'selectedItems',
        (dashboardData?.dashboardDetails || []).filter((item) =>
          Object.keys(selectedItems[dashboardType] || {}).find(
            (ele) => selectedItems[dashboardType][ele] && ele === item.component
          )
        )
      )} */}
      <ArticleGraph
        recentSearchId={recentSearchId}
        handleGraphTitleUpdate={handleGraphTitleUpdate}
        searchFilters={searchFilters}
        dashboardDetails={dashboardDetailFilter(
          dashboardData?.dashboardDetails,
          dashboardType,
          selectedItems
        )}
        advancedWidgetDetails={advancedWidgetDetails || {}}
        customCanvas={selectedItems}
        selected={null}
        loader={false}
        setSelected={() => { }}
        volumeAnalysisWidgetDetails={volumeAnalysisWidgetDetails}
        sentimentAnalysisWidgetDetails={sentimentAnalysisWidgetDetails}
        sentimeOverTimeWidgetDetails={sentimeOverTimeWidgetDetails}
        topJournalistSentimentAnalysisWidgetDetails={
          topJournalistSentimentAnalysisWidgetDetails
        }
        peopleCoverageChartDataWidgetDetails={
          peopleCoverageChartDataWidgetDetails
        }
        coverageOverTimeBrandWidgetDetails={coverageOverTimeBrandWidgetDetails}
        reachOvertimeBrandWidgetDetails={reachOvertimeBrandWidgetDetails}
        SOVWidgetDetails={SOVWidgetDetails}
        peopleThemeWidgetDetails={peopleThemeWidgetDetails}
        peopleMediaTypeWidgetDetails={peopleMediaTypeWidgetDetails}
        coverageOverTimeCompWidgetDetails={coverageOverTimeCompWidgetDetails}
        sentimentCompWidgetDetails={sentimentCompWidgetDetails}
        mediaTypeWidgetDetails={mediaTypeWidgetDetails}
        peopleVolumeAnalysisWidgetDetails={peopleVolumeAnalysisWidgetDetails}
        peopleSentimentAnalysisWidgetDetails={
          peopleSentimentAnalysisWidgetDetails
        }
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
        customData={customData}
        storeSelectedItems={storeSelectedItems}
        isSavePopup={isSavePopup}
      />
      <DashboardPopup
        open={showCustomize}
        toggler={(e) => {
          setStoreSelectedItems(selectedItems);
          setShowCustomize(e);
        }}
        popContent={
          <CustomPopupWrapper
            heading="Add/Remove Charts"
            footer={
              <ButtonWrapper>
                <ButtonBoxwpr
                  onClick={() => {
                    setStoreSelectedItems(selectedItems);
                    setShowCustomize(false);
                  }}
                >
                  Cancel
                </ButtonBoxwpr>
                <ButtonBoxwpr
                  background={theme[selectedTheme].primary}
                  fontColor={'#fff'}
                  onClick={() => {
                    setSelectedItems(storeSelectedItems);
                    setSelectedGraphs && setSelectedGraphs(storeSelectedItems);
                    setShowCustomize(false);
                  }}
                >
                  Update
                </ButtonBoxwpr>
              </ButtonWrapper>
            }
            width={'100%'}
          >
            <CustomDashboardCanvas
              handleItemClick={handleCheckedItemsAddRemove}
              selectedItems={storeSelectedItems}
              dashType={dashboardType}
              subDashType={
                customData?.competitionData?.length > 0 &&
                  customData?.brandData?.length > 0
                  ? 'competition'
                  : 'brand'
              }
            ></CustomDashboardCanvas>
          </CustomPopupWrapper>
        }
        width={'1000px'}
        padding="0"
        Cross={true}
        borderRadius="0.75rem"
      />
    </NewDashboardwpr>
  );
};

NewDashboard.propTypes = {
  dashboardData: PropTypes.object,
  dashboardDataLoading: PropTypes.bool,
  volumeAnalysisWidgetDetails: PropTypes.object,
  sentimentAnalysisWidgetDetails: PropTypes.object,
  sentimeOverTimeWidgetDetails: PropTypes.object,
  topJournalistSentimentAnalysisWidgetDetails: PropTypes.object,
  coverageOverTimeBrandWidgetDetails: PropTypes.object,
  reachOvertimeBrandWidgetDetails: PropTypes.object,
  SOVWidgetDetails: PropTypes.object,
  peopleCoverageChartDataWidgetDetails: PropTypes.object,
  peopleThemeWidgetDetails: PropTypes.object,
  peopleMediaTypeWidgetDetails: PropTypes.object,
  coverageOverTimeCompWidgetDetails: PropTypes.object,
  mediaTypeWidgetDetails: PropTypes.object,
  peopleVolumeAnalysisWidgetDetails: PropTypes.object,
  peopleSentimentAnalysisWidgetDetails: PropTypes.object,
  sentimentCompWidgetDetails: PropTypes.object,
  reachOvertimeCompWidgetDetails: PropTypes.object,
  mediaBreakdownWidgetDetails: PropTypes.object,
  journalistWidgetDetails: PropTypes.object,
  sourceCompWidgetDetails: PropTypes.object,
  placeholderGraphs: PropTypes.bool,
  setSelectedGraphs: PropTypes.func,
  handleGraphTitleUpdate: PropTypes.func,
  searchFilters: PropTypes.object,
  customData: PropTypes.object,
  selectedGraphs: PropTypes.object,
  industryVolumeAnalysisWidgetDetails: PropTypes.object,
  industrySentimentWidgetDetails: PropTypes.object,
  industryCoverageOverTimeWidgetDetails: PropTypes.object,
  industryCoverageBySourceWidgetDetails: PropTypes.object,
  industryCompaniesWidgetDetails: PropTypes.object,
  industryCoverageByJournalistsWidgetDetails: PropTypes.object,
  industryPublicationsWidgetDetails: PropTypes.object,
  recentSearchId: PropTypes.number,
  isSavePopup: PropTypes.bool
};

export default NewDashboard;
