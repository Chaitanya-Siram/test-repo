import React, { useEffect, useState, useRef } from 'react';
import PropTypes, { object } from 'prop-types';
import {
  // BackDrop,
  DashboardInnerSection,
  FullSlot,
  HalfSlot,
  SlotWrp,
  // UberTextTitle,
  UberTilesWrp,
  UserTilesMainWrp,
} from '../index.sc';
import SlotDetails from '../slot-details';
import UberTiles from '../../uber-tiles';
import ResultOverTime from './result-over-time';
import SlotPlaceHolder from '../slot-details/SlotPlaceHolder';
import { axiosGet } from '../../../service';
import { useLocation, useParams } from 'react-router-dom';
// import { baseURL } from '../../../constants';
import { useQuery } from '@tanstack/react-query';
import CircularLoading from '../../../assets/icons/loading/circularLoading';
import { StatesWithMapData } from '../../../hooks/data/states';
import { toJpeg, toPng } from 'html-to-image';
import JsPDF from 'jspdf';
import { combineImagesWithLogo, dataURLtoBlob } from '../../../constants/utils';
import { useGetSavedChartNames } from '../../../hooks/useSearch';
import {
  brandWidgets,
  industryWidgets,
  overviewWidgets,
  standardDashboards,
  people,
} from '../../../constants/widgets';
// import LogoWithText from '../../../assets/img/bg/logoWithText.svg';
import AMXlogo from '../../../assets/img/app/Alphametricx-logo-mark-dark.png';
// import { Img } from '../../../assets/img';
import JournalistAndSourceGraph from '../../advanced-dashboard/author-impact';

const noLegends = ['top_source', 'top_author', 'volume_analysis'];

const DashboardInnerContainer = ({
  dashboardDetails,
  loader,
  tileDetails,
  setArticleType,
  articleType,
  overRideSlot = false,
  articlePosition,
  handleUpdatedChart = () => {},
  customWidgetDetails,
  setClickedPosition,
  resetSelection,
  setResetSelection,
  selected,
  setSelected,
  selectGraph,
  setSelectedGraph,
  handleShowDownloadPopUp = () => {},
  dashboardType,
  customCanvas,
  editOption = false,
  actionOption = true,
  showChangeGraphOptions = true,
  activeScreen = '',
  sentimeWidgetDetails,
  mediaTypeWidgetDetails,
  wordCloudWidgetDetails,
  topSourceWidgetDetails,
  topThemeWidgetDetails,
  topAuthorWidgetDetails,
  resultOverTimeWidgetDetails,
  outletMediaTypeWidgetDetails,
  geographicalWidgetDetails,
  resetData,
  volumeAnalysisWidgetDetails,
  sentimentAnalysisWidgetDetails,
  sentimeOverTimeWidgetDetails,
  topJournalistSentimentAnalysisWidgetDetails,
  coverageOverTimeBrandWidgetDetails,
  reachOvertimeBrandWidgetDetails,
  SOVWidgetDetails,
  peopleCoverageChartDataWidgetDetails,
  peopleThemeWidgetDetails,
  peopleMediaTypeWidgetDetails,
  coverageOverTimeCompWidgetDetails,
  mediaTypeLWidgetDetails,
  peopleVolumeAnalysisWidgetDetails,
  peopleSentimentAnalysisWidgetDetails,
  sentimentCompWidgetDetails,
  reachOvertimeCompWidgetDetails,
  mediaBreakdownWidgetDetails,
  journalistWidgetDetails,
  sourceCompWidgetDetails,
  industryVolumeAnalysisWidgetDetails,
  placeholderGraphs = true,
  handleGraphTitleUpdate,
  industrySentimentWidgetDetails,
  industryCoverageOverTimeWidgetDetails,
  industryCoverageBySourceWidgetDetails,
  industryCompaniesWidgetDetails,
  industryCoverageByJournalistsWidgetDetails,
  industryPublicationsWidgetDetails,
  savedSelectedChart,
  isLoading,
  isSavePopup,
}) => {
  const x = dashboardDetails.length;
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(new Array(x).fill(true));
  const [selectedComponent, setSelectedComponent] = useState('');
  const parentDivRef = useRef(null);
  const handleChildClick = (scrollPosition) => {
    if (location.pathname.includes('search-results')) {
      scrollPosition--;
    }
    const childDivId = `childDiv-${scrollPosition}`;
    const childDiv = document.getElementById(childDivId);

    if (childDiv) {
      childDiv.scrollIntoView({ block: 'center' });
    }
  };
  // const handleClick = (i, e) => {
  //   e.stopPropagation();
  //   if (setArticleType) {
  //     setArticleType((prev) => ({
  //       ...prev,
  //       widget: dashboardDetails[i]?.title,
  //     }));
  //     setSelected(i);
  //     setClickedPosition(i);
  //   }
  // };
  const { searchId, dashboardId } = useParams();

  const getDownloadPdf = () => {
    return axiosGet('/downloadPdf', {
      page: 'single-graph',
      dashboardType,
      searchId,
      dashboardId,
      component: selectedComponent,
    });
  };

  const { isLoading: graphDownloading } = useQuery({
    queryKey: ['download-graph-pdf'],
    queryFn: () => getDownloadPdf(),
    refetchOnWindowFocus: false,
    enabled: false,
    // onSuccess: (data) => {
    //   window.open(`${baseURL}/images/${data.data.pdfName}`, '_blank');
    // },
  });

  const { data: chartNames } = useGetSavedChartNames(searchId);

  const onDownload = async (option, containerRef, widget, chartName) => {
    if (!option || !option.type) {
      console.error('Invalid download option');
      return;
    }

    const containerElement = containerRef.current;

    // Set background color and padding for the container
    containerElement.style.backgroundColor = 'white';

    // Hide elements with the className 'hide-downloading'
    const elementsToHide =
      containerElement.getElementsByClassName('hide-downloading');
    Array.from(elementsToHide).forEach((element) => {
      element.style.display = 'none';
    });

    // Set opacity to 0 for elements with the className 'set-opacity-downloading'
    const elementsToSetOpacity = containerElement.getElementsByClassName(
      'set-opacity-downloading'
    );
    Array.from(elementsToSetOpacity).forEach((element) => {
      element.style.opacity = '0';
    });
    const logoUrl = AMXlogo; // Update with the correct path to your logo

    try {
      let dataUrl;

      if (option.type === 'Image') {
        dataUrl = await toPng(containerElement, { pixelRatio: 4 });
      } else if (option.type === 'PDF') {
        // Use html-to-image to capture the container as an image
        dataUrl = await toPng(containerElement, { pixelRatio: 4 });
      } else {
        throw new Error('Invalid download type. Use "Image" or "PDF".');
      }

      // Reset the styles to make the hidden portions visible again
      Array.from(elementsToHide).forEach((element) => {
        element.style.display = 'block';
      });

      // Reset opacity for elements with the className 'set-opacity-downloading'
      Array.from(elementsToSetOpacity).forEach((element) => {
        element.style.opacity = '1';
      });

      // Reset the background color of the container
      containerElement.style.backgroundColor = 'white';

      if (option.type === 'Image') {
        const imageDataUrlWithLogo = await combineImagesWithLogo(
          [dataUrl],
          logoUrl
        );
        // Convert the data URL to a Blob
        const blob = dataURLtoBlob(imageDataUrlWithLogo);

        // Create a Blob URL
        const blobUrl = URL.createObjectURL(blob);

        // Create an invisible anchor element
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', blobUrl);
        downloadLink.setAttribute(
          'download',
          `${
            chartName ||
            widget?.title ||
            widget?.area?.title ||
            widget?.column?.title ||
            'image'
          }.png`
        );
        document.body.appendChild(downloadLink);

        // Trigger a click on the anchor to start the download
        downloadLink.click();

        // Remove the download link from the document
        document.body.removeChild(downloadLink);
      } else if (option.type === 'PDF') {
        // Create a new jsPDF instance
        const pdf = new JsPDF('p', 'mm', 'a4');

        // Calculate the aspect ratio to fit the image width
        const aspectRatio =
          containerElement.offsetWidth / containerElement.offsetHeight;

        const imageDataUrlWithLogo = await combineImagesWithLogo(
          [dataUrl],
          logoUrl
        );
        // Add the image to the PDF
        pdf.addImage(
          imageDataUrlWithLogo,
          'JPEG',
          10,
          10,
          190,
          190 / aspectRatio
        ); // Assuming A4 size and margins

        // Save the PDF
        pdf.save(
          `${
            chartName ||
            widget?.title ||
            widget?.area?.title ||
            widget?.column?.title ||
            'document'
          }.pdf`
        );
      }
    } catch (error) {
      console.error('Error capturing or downloading:', error);
      // Reset the styles to make the hidden portions visible again
      Array.from(elementsToHide).forEach((element) => {
        element.style.display = 'block';
      });

      // Reset opacity for elements with the className 'set-opacity-downloading'
      Array.from(elementsToSetOpacity).forEach((element) => {
        element.style.opacity = '1';
      });
    }
  };

  const handleOnClick = (event, d, widget, i, uniqueId) => {
    setResetSelection(false);
    setSelected(i);
    resetData && resetData();
    let rawData;
    const graphSelection =
      d?.label ||
      d?.labelText ||
      d?.data?.rawdata?.label ||
      d?.properties?.NAME ||
      d?.properties.brk_name ||
      '';
    let title = graphSelection;
    if (widget?.title === 'Geographical Breakdown') {
      const statesData = StatesWithMapData?.find(
        (x) => x.label === d?.properties?.STATE
      );
      if (statesData) {
        rawData = statesData?.short;
      }
    } else if (widget?.title === 'Result Over Time') {
      title = d?.data?.label;
      if (widget?.graphType === 'result_over_time_column') {
        title = d?.date;
      }
    } else {
      rawData = d?.rawData || d?.data;
    }
    if (rawData && uniqueId) {
      rawData = {
        ...rawData,
        uniqueId,
      };
    }
    if (widget.graphType === 'word_cloud') {
      rawData = { label: d?.label };
    }
    if (
      dashboardType === 'brand' ||
      dashboardType === 'people' ||
      dashboardType === 'industry' ||
      dashboardType === 'custom'
    ) {
      title = rawData?.label;
    }
    if (uniqueId === 'coverage_by_source') {
      title = graphSelection || d?.parentData?.parentData?.label;
    }

    setArticleType((prev) => ({
      ...prev,
      widget: widget?.title,
      graphSelection: title,
      rawData,
      inSyndication: false,
      otherInfo: {
        d,
        widget,
        uniqueId,
      },
    }));
    setClickedPosition(i, uniqueId);
    handleChildClick(i);
  };
  useEffect(() => {
    if (selected === null) {
      setData(new Array(x).fill(true));
    }
  }, [x, selected]);
  useEffect(() => {
    if (selected !== null) {
      setData((prev) => {
        return prev?.map((item, index) => (index === selected ? !item : true));
      });
    } else {
      setData((prev) => prev.map((_) => true));
    }
  }, [selected, resetSelection, setSelectedGraph]);
  useEffect(() => {
    if (!articleType?.widget && !articleType?.graphSelection) {
      setResetSelection(true);
    }
  }, [articleType, setResetSelection]);

  const GetDashboardComponent = (widget, j, isLoading, data) => {
    let savedChartConfig = {};
    const savedChartsData = dashboardType
      ? savedSelectedChart
      : chartNames?.data?.data;
    if (dashboardType) {
      const chartData = savedChartsData?.find(
        (chart) => chart?.chartId === data?.customClassName
      );
      if (chartData) {
        savedChartConfig = {
          chartName: chartData?.chartName,
          chartType: chartData?.chartType
            ? chartData?.chartType
            : widget?.graphType,
        };
      } else {
        savedChartConfig = {
          chartName: widget?.title,
          chartType: widget?.graphType,
        };
      }
    } else {
      const chartData = savedChartsData?.find(
        (chart) => chart?.default_name === widget?.title
      );
      if (chartData) {
        savedChartConfig = {
          chartName: chartData?.provided_name,
          chartType: widget?.graphType,
        };
      } else {
        savedChartConfig = {
          chartName: widget?.title,
          chartType: widget?.graphType,
        };
      }
    }
    const idx = resultOverTimeWidgetDetails?.data ? j + 1 : j;
    if (isLoading) {
      if (
        overviewWidgets[widget?.component]?.slotType === 'full' ||
        overRideSlot
      ) {
        return (
          <FullSlot>
            <CircularLoading
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </FullSlot>
        );
      } else {
        return (
          <HalfSlot>
            <CircularLoading
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </HalfSlot>
        );
      }
    }
    if (!widget) {
      return <></>;
    }
    const widgetData = {
      ...widget,
      graphType: savedChartConfig.chartType || widget.graphType,
    };
    if (
      overviewWidgets[widget.component]?.slotType === 'full' ||
      overRideSlot
    ) {
      return (
        <FullSlot
          className="graph-widget"
          key={`widget-${idx}`}
          selected={idx === selected}
          id={`childDiv-${j}`}
          // onClick={(e) => handleClick(idx, e)}
        >
          <SlotDetails
            widget={widgetData}
            loader={loader}
            selected={idx === selected}
            legend={!noLegends.includes(widget?.component)}
            commentary={true}
            isSavePopup={isSavePopup}
            handleOnClick={(event, d) =>
              handleOnClick(event, d, widget, idx, data?.customClassName)
            }
            handleUpdatedChart={handleUpdatedChart}
            handleGraphTitleUpdate={handleGraphTitleUpdate}
            resetSelection={resetSelection}
            overRideSlot={overRideSlot}
            editOption={editOption}
            actionOption={actionOption}
            handleShowDownloadPopUp={handleShowDownloadPopUp}
            dashboardType={dashboardType}
            downloadFunction={onDownload}
            setSelectedComponent={setSelectedComponent}
            graphDownloading={graphDownloading}
            widgetClassName={data?.customClassName}
            chartNames={dashboardType ? savedSelectedChart : chartNames?.data}
            editChart={savedChartConfig}
            key={data?.customClassName}
          />
        </FullSlot>
      );
    } else {
      if (
        widget?.component === 'coverage_by_journalist' &&
        widget?.title === 'Coverage by Journalist'
      ) {
        return (
          <JournalistAndSourceGraph
            widget={widgetData}
            loader={isLoading}
            dashboardType={dashboardType}
            handleOnClick={(event, d) =>
              handleOnClick(event, d, widget, idx, data?.customClassName)
            }
            downloadFunction={onDownload}
            setSelectedComponent={setSelectedComponent}
            graphDownloading={graphDownloading}
            editChart={savedChartConfig}
            widgetClassName={data?.customClassName}
          />
        );
      }
      if (
        widget?.component === 'coverage_by_source' &&
        widget?.title === 'Coverage by Sources'
      ) {
        return (
          <JournalistAndSourceGraph
            widget={widgetData}
            loader={isLoading}
            dashboardType={dashboardType}
            handleOnClick={(event, d) =>
              handleOnClick(event, d, widget, idx, data?.customClassName)
            }
            downloadFunction={onDownload}
            setSelectedComponent={setSelectedComponent}
            graphDownloading={graphDownloading}
            editChart={savedChartConfig}
            widgetClassName={data?.customClassName}
          />
        );
      }
      return (
        <HalfSlot
          className="graph-widget"
          key={`widget-${idx}`}
          selected={idx === selected}
          id={`childDiv-${j}`}
          // onClick={(e) => handleClick(idx, e)}
        >
          <SlotDetails
            widget={widgetData}
            loader={loader}
            legend={!noLegends.includes(widget?.component)}
            commentary={true}
            isSavePopup={isSavePopup}
            handleOnClick={(event, d) =>
              handleOnClick(event, d, widget, idx, data?.customClassName)
            }
            handleUpdatedChart={handleUpdatedChart}
            handleGraphTitleUpdate={handleGraphTitleUpdate}
            resetSelection={resetSelection}
            editOption={editOption}
            actionOption={actionOption}
            dashboardType={dashboardType}
            setSelectedComponent={setSelectedComponent}
            downloadFunction={onDownload}
            graphDownloading={graphDownloading}
            widgetClassName={data?.customClassName}
            chartNames={dashboardType ? savedSelectedChart : chartNames?.data}
            editChart={savedChartConfig}
            key={data?.customClassName}
          />
        </HalfSlot>
      );
    }
  };
  return (
    <DashboardInnerSection
      ref={parentDivRef}
      id="download-content"
      className="dash-scroll-container"
      articlePosition={articlePosition}
      activeScreen={activeScreen}
      // selected={selected !== null}   //enable this line to make the graphs not scroll - Sujay
    >
      {tileDetails && (
        <UserTilesMainWrp id={'childDiv-01'}>
          {/* <UberTextTitle>Results In Figure</UberTextTitle> */}
          <UberTilesWrp activeScreen={activeScreen}>
            {tileDetails?.map((tile, i) => (
              <UberTiles
                key={i}
                data={tile.data}
                change={tile.change}
                isIncreased={tile.isIncreased}
                title={tile.title}
                isLoading={false}
              />
            ))}
          </UberTilesWrp>
        </UserTilesMainWrp>
      )}
      <SlotWrp>
        {/* {selected !== null && (
          <BackDrop
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
          />
        )} */}
        {resultOverTimeWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            id={'childDiv-02'}
            // key={`custom-widget-${i}`}
            selected={selected === 0}
            // onClick={(e) => handleClick(0, e)}
          >
            {resultOverTimeWidgetDetails?.isLoading && (
              <CircularLoading
                size="0.25rem"
                width="1.875rem"
                height="1.875rem"
              />
            )}
            {!resultOverTimeWidgetDetails?.isLoading && (
              <ResultOverTime
                widget={resultOverTimeWidgetDetails?.data}
                loader={resultOverTimeWidgetDetails?.isLoading}
                legend={true}
                commentary={true}
                handleOnClick={(event, d, widget) =>
                  handleOnClick(event, d, widget, 0)
                }
                resetSelection={resetSelection}
                actionOption={actionOption}
                showChangeGraphOptions={showChangeGraphOptions}
                downloadFunction={onDownload}
                setSelectedComponent={setSelectedComponent}
                graphDownloading={graphDownloading}
                widgetClassName={'resultovertime-graph-download'}
              />
            )}
          </FullSlot>
        )}
        {sentimeWidgetDetails?.show ? (
          GetDashboardComponent(
            sentimeWidgetDetails?.data,
            1,
            sentimeWidgetDetails?.isLoading,
            sentimeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {mediaTypeWidgetDetails?.show ? (
          GetDashboardComponent(
            mediaTypeWidgetDetails?.data,
            2,
            mediaTypeWidgetDetails?.isLoading,
            mediaTypeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {wordCloudWidgetDetails?.show ? (
          GetDashboardComponent(
            wordCloudWidgetDetails?.data,
            3,
            wordCloudWidgetDetails?.isLoading,
            wordCloudWidgetDetails
          )
        ) : (
          <> </>
        )}
        {topSourceWidgetDetails?.show ? (
          GetDashboardComponent(
            topSourceWidgetDetails?.data,
            4,
            topSourceWidgetDetails?.isLoading,
            topSourceWidgetDetails
          )
        ) : (
          <> </>
        )}
        {topThemeWidgetDetails?.show ? (
          GetDashboardComponent(
            topThemeWidgetDetails?.data,
            5,
            topThemeWidgetDetails?.isLoading,
            topThemeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {topAuthorWidgetDetails?.show ? (
          GetDashboardComponent(
            topAuthorWidgetDetails?.data,
            6,
            topAuthorWidgetDetails?.isLoading,
            topAuthorWidgetDetails
          )
        ) : (
          <> </>
        )}
        {outletMediaTypeWidgetDetails?.show ? (
          GetDashboardComponent(
            outletMediaTypeWidgetDetails?.data,
            7,
            outletMediaTypeWidgetDetails?.isLoading,
            outletMediaTypeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {geographicalWidgetDetails?.show ? (
          GetDashboardComponent(
            geographicalWidgetDetails?.data,
            8,
            geographicalWidgetDetails?.isLoading,
            geographicalWidgetDetails
          )
        ) : (
          <> </>
        )}
        {/* {sentimeWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 1}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={sentimeWidgetDetails?.data}
              loader={sentimeWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(sentimeWidgetDetails?.data?.component)
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, sentimeWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'sentiment-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {/* {mediaTypeWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 2}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={mediaTypeWidgetDetails?.data}
              loader={mediaTypeWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(mediaTypeWidgetDetails?.data?.component)
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, mediaTypeWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'media-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {/* {wordCloudWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 3}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={wordCloudWidgetDetails?.data}
              loader={wordCloudWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(wordCloudWidgetDetails?.data?.component)
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, wordCloudWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'wordcloud-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {/* {topSourceWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 4}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={topSourceWidgetDetails?.data}
              loader={topSourceWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(topSourceWidgetDetails?.data?.component)
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, topSourceWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'topsource-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {/* {topThemeWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 5}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={topThemeWidgetDetails?.data}
              loader={topThemeWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(topThemeWidgetDetails?.data?.component)
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, topThemeWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'toptheme-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {/* {topAuthorWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 6}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={topAuthorWidgetDetails?.data}
              loader={topAuthorWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(topAuthorWidgetDetails?.data?.component)
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, topAuthorWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'topauthor-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {/* {outletMediaTypeWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 7}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={outletMediaTypeWidgetDetails?.data}
              loader={outletMediaTypeWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(
                  outletMediaTypeWidgetDetails?.data?.component
                )
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, outletMediaTypeWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'outletmedia-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {/* {geographicalWidgetDetails?.data && (
          <FullSlot
            className="graph-widget"
            selected={selected === 8}
            id={'childDiv-1'}
            // onClick={(e) => handleClick(idx, e)}
          >
            <SlotDetails
              widget={geographicalWidgetDetails?.data}
              loader={geographicalWidgetDetails?.isLoading}
              legend={
                !noLegends.includes(geographicalWidgetDetails?.data?.component)
              }
              commentary={true}
              handleOnClick={(event, d) => {
                handleOnClick(event, d, geographicalWidgetDetails?.data, 1);
              }}
              handleUpdatedChart={handleUpdatedChart}
              handleGraphTitleUpdate={handleGraphTitleUpdate}
              resetSelection={resetSelection}
              editOption={editOption}
              actionOption={actionOption}
              dashboardType={dashboardType}
              setSelectedComponent={setSelectedComponent}
              downloadFunction={onDownload}
              graphDownloading={graphDownloading}
              widgetClassName={'geographical-graph-download'}
              searchId={searchId}
              chartNames={chartNames?.data}
            />
          </FullSlot>
        )} */}
        {volumeAnalysisWidgetDetails?.show ? (
          GetDashboardComponent(
            volumeAnalysisWidgetDetails?.data,
            7,
            volumeAnalysisWidgetDetails?.isLoading,
            volumeAnalysisWidgetDetails
          )
        ) : (
          <> </>
        )}
        {sentimentAnalysisWidgetDetails?.show ? (
          GetDashboardComponent(
            sentimentAnalysisWidgetDetails?.data,
            8,
            sentimentAnalysisWidgetDetails?.isLoading,
            sentimentAnalysisWidgetDetails
          )
        ) : (
          <> </>
        )}
        {sentimeOverTimeWidgetDetails?.show ? (
          GetDashboardComponent(
            sentimeOverTimeWidgetDetails?.data,
            9,
            sentimeOverTimeWidgetDetails.isLoading,
            sentimeOverTimeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {coverageOverTimeBrandWidgetDetails?.show ? (
          GetDashboardComponent(
            coverageOverTimeBrandWidgetDetails?.data,
            10,
            coverageOverTimeBrandWidgetDetails.isLoading,
            coverageOverTimeBrandWidgetDetails
          )
        ) : (
          <> </>
        )}
        {reachOvertimeBrandWidgetDetails?.show ? (
          GetDashboardComponent(
            reachOvertimeBrandWidgetDetails?.data,
            11,
            reachOvertimeBrandWidgetDetails.isLoading,
            reachOvertimeBrandWidgetDetails
          )
        ) : (
          <> </>
        )}
        {SOVWidgetDetails?.show ? (
          GetDashboardComponent(
            SOVWidgetDetails?.data,
            12,
            SOVWidgetDetails.isLoading,
            SOVWidgetDetails
          )
        ) : (
          <> </>
        )}
        {coverageOverTimeCompWidgetDetails?.show ? (
          GetDashboardComponent(
            coverageOverTimeCompWidgetDetails?.data,
            13,
            coverageOverTimeCompWidgetDetails.isLoading,
            coverageOverTimeCompWidgetDetails
          )
        ) : (
          <> </>
        )}
        {mediaTypeLWidgetDetails?.show ? (
          GetDashboardComponent(
            mediaTypeLWidgetDetails?.data,
            14,
            mediaTypeLWidgetDetails.isLoading,
            mediaTypeLWidgetDetails
          )
        ) : (
          <> </>
        )}
        {sentimentCompWidgetDetails?.show ? (
          GetDashboardComponent(
            sentimentCompWidgetDetails?.data,
            15,
            sentimentCompWidgetDetails.isLoading,
            sentimentCompWidgetDetails
          )
        ) : (
          <> </>
        )}
        {reachOvertimeCompWidgetDetails?.show ? (
          GetDashboardComponent(
            reachOvertimeCompWidgetDetails?.data,
            16,
            reachOvertimeCompWidgetDetails.isLoading,
            reachOvertimeCompWidgetDetails
          )
        ) : (
          <> </>
        )}
        {mediaBreakdownWidgetDetails?.show ? (
          GetDashboardComponent(
            mediaBreakdownWidgetDetails?.data,
            17,
            mediaBreakdownWidgetDetails.isLoading,
            mediaBreakdownWidgetDetails
          )
        ) : (
          <> </>
        )}
        {journalistWidgetDetails?.show ? (
          GetDashboardComponent(
            journalistWidgetDetails?.data,
            18,
            journalistWidgetDetails.isLoading,
            journalistWidgetDetails
          )
        ) : (
          <> </>
        )}
        {sourceCompWidgetDetails?.show ? (
          GetDashboardComponent(
            sourceCompWidgetDetails?.data,
            19,
            sourceCompWidgetDetails.isLoading,
            sourceCompWidgetDetails
          )
        ) : (
          <> </>
        )}
        {peopleVolumeAnalysisWidgetDetails?.show ? (
          GetDashboardComponent(
            peopleVolumeAnalysisWidgetDetails?.data,
            20,
            peopleVolumeAnalysisWidgetDetails?.isLoading,
            peopleVolumeAnalysisWidgetDetails
          )
        ) : (
          <> </>
        )}
        {peopleSentimentAnalysisWidgetDetails?.show ? (
          GetDashboardComponent(
            peopleSentimentAnalysisWidgetDetails?.data,
            21,
            peopleSentimentAnalysisWidgetDetails?.isLoading,
            peopleSentimentAnalysisWidgetDetails
          )
        ) : (
          <> </>
        )}
        {peopleCoverageChartDataWidgetDetails?.show ? (
          GetDashboardComponent(
            peopleCoverageChartDataWidgetDetails?.data,
            22,
            peopleCoverageChartDataWidgetDetails?.isLoading,
            peopleCoverageChartDataWidgetDetails
          )
        ) : (
          <> </>
        )}
        {topJournalistSentimentAnalysisWidgetDetails?.show ? (
          GetDashboardComponent(
            topJournalistSentimentAnalysisWidgetDetails?.data,
            23,
            topJournalistSentimentAnalysisWidgetDetails?.isLoading,
            topJournalistSentimentAnalysisWidgetDetails
          )
        ) : (
          <> </>
        )}
        {peopleThemeWidgetDetails?.show ? (
          GetDashboardComponent(
            peopleThemeWidgetDetails?.data,
            24,
            peopleThemeWidgetDetails?.isLoading,
            peopleThemeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {peopleMediaTypeWidgetDetails?.show ? (
          GetDashboardComponent(
            peopleMediaTypeWidgetDetails?.data,
            25,
            peopleMediaTypeWidgetDetails?.isLoading,
            peopleMediaTypeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {industryVolumeAnalysisWidgetDetails?.show ? (
          GetDashboardComponent(
            industryVolumeAnalysisWidgetDetails?.data,
            26,
            industryVolumeAnalysisWidgetDetails?.isLoading,
            industryVolumeAnalysisWidgetDetails
          )
        ) : (
          <> </>
        )}
        {industrySentimentWidgetDetails?.show ? (
          GetDashboardComponent(
            industrySentimentWidgetDetails?.data,
            27,
            industrySentimentWidgetDetails?.isLoading,
            industrySentimentWidgetDetails
          )
        ) : (
          <> </>
        )}
        {industryCoverageOverTimeWidgetDetails?.show ? (
          GetDashboardComponent(
            industryCoverageOverTimeWidgetDetails?.data,
            28,
            industryCoverageOverTimeWidgetDetails?.isLoading,
            industryCoverageOverTimeWidgetDetails
          )
        ) : (
          <> </>
        )}
        {industryCoverageBySourceWidgetDetails?.show ? (
          GetDashboardComponent(
            industryCoverageBySourceWidgetDetails?.data,
            29,
            industryCoverageBySourceWidgetDetails?.isLoading,
            industryCoverageBySourceWidgetDetails
          )
        ) : (
          <> </>
        )}
        {industryCompaniesWidgetDetails?.show ? (
          GetDashboardComponent(
            industryCompaniesWidgetDetails?.data,
            30,
            industryCompaniesWidgetDetails?.isLoading,
            industryCompaniesWidgetDetails
          )
        ) : (
          <> </>
        )}
        {industryCoverageByJournalistsWidgetDetails?.show ? (
          GetDashboardComponent(
            industryCoverageByJournalistsWidgetDetails?.data,
            31,
            industryCoverageByJournalistsWidgetDetails?.isLoading,
            industryCoverageByJournalistsWidgetDetails
          )
        ) : (
          <> </>
        )}
        {industryPublicationsWidgetDetails?.show ? (
          GetDashboardComponent(
            industryPublicationsWidgetDetails?.data,
            32,
            industryPublicationsWidgetDetails?.isLoading,
            industryPublicationsWidgetDetails
          )
        ) : (
          <> </>
        )}
        {placeholderGraphs ? (
          <>
            {' '}
            {dashboardDetails?.length
              ? dashboardDetails.map((widget, j) => {
                  const idx = resultOverTimeWidgetDetails?.data ? j + 100 : j;
                  if (
                    overviewWidgets[widget.component]?.slotType === 'full' ||
                    overRideSlot
                  ) {
                    return (
                      <FullSlot
                        className="graph-widget"
                        key={`widget-${idx}`}
                        selected={idx === selected}
                        id={`childDiv-${j}`}
                        // onClick={(e) => handleClick(idx, e)}
                      >
                        <SlotDetails
                          widget={widget}
                          loader={loader}
                          selected={idx === 0}
                          legend={!noLegends.includes(widget?.component)}
                          commentary={true}
                          isSavePopup={isSavePopup}
                          handleOnClick={(event, d) =>
                            handleOnClick(event, d, widget, idx)
                          }
                          handleUpdatedChart={handleUpdatedChart}
                          handleGraphTitleUpdate={handleGraphTitleUpdate}
                          resetSelection={resetSelection}
                          overRideSlot={overRideSlot}
                          editOption={editOption}
                          actionOption={actionOption}
                          handleShowDownloadPopUp={handleShowDownloadPopUp}
                          dashboardType={dashboardType}
                          downloadFunction={onDownload}
                          setSelectedComponent={setSelectedComponent}
                          graphDownloading={graphDownloading}
                        />
                      </FullSlot>
                    );
                  } else {
                    return (
                      <HalfSlot
                        className="graph-widget"
                        key={`widget-${idx}`}
                        selected={idx === selected}
                        id={`childDiv-${j}`}
                        // onClick={(e) => handleClick(idx, e)}
                      >
                        <SlotDetails
                          widget={widget}
                          loader={loader}
                          legend={!noLegends.includes(widget?.component)}
                          commentary={true}
                          isSavePopup={isSavePopup}
                          handleOnClick={(event, d) => {
                            handleOnClick(event, d, widget, idx);
                          }}
                          handleUpdatedChart={handleUpdatedChart}
                          handleGraphTitleUpdate={handleGraphTitleUpdate}
                          resetSelection={data[idx]}
                          editOption={editOption}
                          actionOption={actionOption}
                          dashboardType={dashboardType}
                          setSelectedComponent={setSelectedComponent}
                          downloadFunction={onDownload}
                          graphDownloading={graphDownloading}
                        />
                      </HalfSlot>
                    );
                  }
                })
              : customCanvas && Object.keys(customCanvas).length > 0
              ? Object.keys(customCanvas).map((board, i) => {
                  const dashboardWidget = standardDashboards.filter(
                    (ele) => ele.value === board
                  )[0].widgets;
                  return (
                    <>
                      <>
                        {Object.keys(customCanvas[board]).map((item, j) => {
                          const idx = resultOverTimeWidgetDetails?.data
                            ? j + 1
                            : j;
                          if (!customCanvas[board][item]) return <></>;
                          if (dashboardWidget[item]?.slotType === 'full') {
                            return (
                              <FullSlot
                                className="graph-widget"
                                key={`widget-${idx}`}
                                selected={idx === selected}
                                // onClick={(e) => handleClick(idx, e)}
                              >
                                <SlotPlaceHolder
                                  body={dashboardWidget[item]?.placeholder}
                                  title={dashboardWidget[item]}
                                />
                              </FullSlot>
                            );
                          } else {
                            return (
                              <HalfSlot
                                className="graph-widget"
                                key={`widget-${idx}`}
                                selected={idx === selected}
                                // onClick={(e) => handleClick(idx, e)}
                              >
                                <SlotPlaceHolder
                                  body={dashboardWidget[item]?.placeholder}
                                  title={dashboardWidget[item]?.label}
                                />
                              </HalfSlot>
                            );
                          }
                        })}
                      </>
                    </>
                  );
                })
              : dashboardPlaceHolderMap[dashboardType] &&
                Object.keys(dashboardPlaceHolderMap[dashboardType]).map(
                  (item, j) => {
                    const idx = resultOverTimeWidgetDetails?.data ? j + 1 : j;
                    if (
                      dashboardPlaceHolderMap[dashboardType][item].slotType ===
                      'full'
                    ) {
                      return (
                        <FullSlot
                          className="graph-widget"
                          key={`widget-${idx}`}
                          selected={idx === selected}
                          // onClick={(e) => handleClick(idx, e)}
                        >
                          <SlotPlaceHolder
                            body={
                              dashboardPlaceHolderMap[dashboardType][item]
                                .placeholder
                            }
                            title={dashboardPlaceHolderMap[dashboardType][item]}
                          />
                        </FullSlot>
                      );
                    } else {
                      return (
                        <HalfSlot
                          className="graph-widget"
                          key={`widget-${idx}`}
                          selected={idx === selected}
                          // onClick={(e) => handleClick(idx, e)}
                        >
                          <SlotPlaceHolder
                            body={
                              dashboardPlaceHolderMap[dashboardType][item]
                                .placeholder
                            }
                            title={
                              dashboardPlaceHolderMap[dashboardType][item].label
                            }
                          />
                        </HalfSlot>
                      );
                    }
                  }
                )}
          </>
        ) : (
          <></>
        )}
      </SlotWrp>
    </DashboardInnerSection>
  );
};

DashboardInnerContainer.propTypes = {
  dashboardDetails: PropTypes.arrayOf(object),
  tileDetails: PropTypes.arrayOf(object),
  selected: PropTypes.any,
  loader: PropTypes.bool,
  setSelected: PropTypes.func,
  setArticleType: PropTypes.func,
  articleType: PropTypes.object,
  overRideSlot: PropTypes.bool,
  setClickedPosition: PropTypes.func,
  articlePosition: PropTypes.string,
  handleUpdatedChart: PropTypes.func,
  customWidgetDetails: PropTypes.object,
  resetSelection: PropTypes.bool,
  editOption: PropTypes.bool,
  actionOption: PropTypes.bool,
  setResetSelection: PropTypes.func,
  setArticlePosition: PropTypes.func,
  selectGraph: PropTypes.array,
  setSelectedGraph: PropTypes.any,
  handleShowDownloadPopUp: PropTypes.func,
  dashboardType: PropTypes.string,
  customCanvas: PropTypes.object,
  showChangeGraphOptions: PropTypes.bool,
  activeScreen: PropTypes.string,
  sentimeWidgetDetails: PropTypes.object,
  mediaTypeWidgetDetails: PropTypes.object,
  wordCloudWidgetDetails: PropTypes.object,
  topSourceWidgetDetails: PropTypes.object,
  topThemeWidgetDetails: PropTypes.object,
  topAuthorWidgetDetails: PropTypes.object,
  resultOverTimeWidgetDetails: PropTypes.object,
  outletMediaTypeWidgetDetails: PropTypes.object,
  geographicalWidgetDetails: PropTypes.object,
  volumeAnalysisWidgetDetails: PropTypes.object,
  sentimentAnalysisWidgetDetails: PropTypes.object,
  sentimeOverTimeWidgetDetails: PropTypes.object,
  topJournalistSentimentAnalysisWidgetDetails: PropTypes.object,
  peopleCoverageChartDataWidgetDetails: PropTypes.object,
  coverageOverTimeBrandWidgetDetails: PropTypes.object,
  reachOvertimeBrandWidgetDetails: PropTypes.object,
  SOVWidgetDetails: PropTypes.object,
  coverageOverTimeCompWidgetDetails: PropTypes.object,
  mediaTypeLWidgetDetails: PropTypes.object,
  resetData: PropTypes.func,
  peopleThemeWidgetDetails: PropTypes.object,
  peopleMediaTypeWidgetDetails: PropTypes.object,
  peopleVolumeAnalysisWidgetDetails: PropTypes.object,
  peopleSentimentAnalysisWidgetDetails: PropTypes.object,
  sentimentCompWidgetDetails: PropTypes.object,
  reachOvertimeCompWidgetDetails: PropTypes.object,
  mediaBreakdownWidgetDetails: PropTypes.object,
  journalistWidgetDetails: PropTypes.object,
  sourceCompWidgetDetails: PropTypes.object,
  placeholderGraphs: PropTypes.bool || undefined || null,
  handleGraphTitleUpdate: PropTypes.func,
  industryVolumeAnalysisWidgetDetails: PropTypes.object,
  industrySentimentWidgetDetails: PropTypes.object,
  industryCoverageOverTimeWidgetDetails: PropTypes.object,
  industryCoverageBySourceWidgetDetails: PropTypes.object,
  industryCompaniesWidgetDetails: PropTypes.object,
  industryCoverageByJournalistsWidgetDetails: PropTypes.object,
  industryPublicationsWidgetDetails: PropTypes.object,
  savedSelectedChart: PropTypes.array,
  isLoading: PropTypes.bool,
  isSavePopup: PropTypes.bool,
};

export default DashboardInnerContainer;

const dashboardPlaceHolderMap = {
  brand: brandWidgets,
  industry: industryWidgets,
  people,
};
