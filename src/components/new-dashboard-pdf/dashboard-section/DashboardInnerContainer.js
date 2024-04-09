import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import {
  // BackDrop,
  DashboardInnerSection,
} from '../index.sc';

import {
  brandWidgets,
  industryWidgets,
  overviewWidgets,
  people,
} from '../../../constants/widgets';
import ResultOverTime from './result-over-time';
import SlotPlaceHolder from '../slot-details/SlotPlaceHolder';
import {
  FullSlot,
  HalfSlot,
  SlotWrp,
  // UberTextTitle,
  UberTilesWrp,
  UserTilesMainWrp,
} from '../../search-result/index.sc';
import SlotDetails from '../../search-result/slot-details';
import UberTiles from '../../uber-tiles';

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
  actionOption = false,
}) => {
  const x = dashboardDetails.length;
  const [data, setData] = useState(new Array(x).fill(true));
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

  const handleOnClick = (event, d, widget, i) => {
    setResetSelection(false);
    setSelected(i);
    setArticleType((prev) => ({
      ...prev,
      widget: widget.title,
      graphSelection:
        d?.label ||
        d?.labelText ||
        d?.data?.rawdata?.label ||
        d?.properties?.NAME ||
        d?.properties.brk_name ||
        '',
    }));
    setClickedPosition(i);
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
  return (
    <DashboardInnerSection
      id="download-content"
      className="dash-scroll-container"
      articlePosition={articlePosition}
      // selected={selected !== null}   //enable this line to make the graphs not scroll - Sujay
    >
      {tileDetails && (
        <UserTilesMainWrp>
          {/* <UberTextTitle>Results In Figure</UberTextTitle> */}
          <UberTilesWrp>
            {tileDetails.map((tile, i) => (
              <UberTiles
                key={i}
                data={tile.data}
                change={tile.change}
                isIncreased={tile.isIncreased}
                title={tile.title}
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
        {customWidgetDetails && (
          <FullSlot
            className="graph-widget"
            // key={`custom-widget-${i}`}
            selected={selected === 0}
            // onClick={(e) => handleClick(0, e)}
          >
            <ResultOverTime
              widget={customWidgetDetails}
              loader={loader}
              legend={true}
              commentary={true}
              handleOnClick={(event, d, widget) =>
                handleOnClick(event, d, widget, 0)
              }
              resetSelection={resetSelection}
              actionOption={actionOption}
            />
          </FullSlot>
        )}
        {dashboardDetails?.length
          ? dashboardDetails.map((widget, j) => {
              const idx = customWidgetDetails ? j + 1 : j;
              if (
                overviewWidgets[widget.component]?.slotType === 'full' ||
                overRideSlot
              ) {
                return (
                  <FullSlot
                    className="graph-widget"
                    key={`widget-${idx}`}
                    selected={idx === selected}
                    // onClick={(e) => handleClick(idx, e)}
                  >
                    <SlotDetails
                      widget={widget}
                      loader={loader}
                      selected={idx === 0}
                      legend={!noLegends.includes(widget?.component)}
                      commentary={true}
                      handleOnClick={(event, d) =>
                        handleOnClick(event, d, widget, idx)
                      }
                      handleUpdatedChart={handleUpdatedChart}
                      resetSelection={resetSelection}
                      overRideSlot={overRideSlot}
                      editOption={editOption}
                      actionOption={actionOption}
                      handleShowDownloadPopUp={handleShowDownloadPopUp}
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
                    <SlotDetails
                      widget={widget}
                      loader={loader}
                      legend={!noLegends.includes(widget?.component)}
                      commentary={true}
                      handleOnClick={(event, d) => {
                        handleOnClick(event, d, widget, idx);
                      }}
                      handleUpdatedChart={handleUpdatedChart}
                      resetSelection={data[idx]}
                      editOption={editOption}
                      actionOption={actionOption}
                    />
                  </HalfSlot>
                );
              }
            })
          : dashboardType === 'custom'
          ? customCanvas &&
            Object.keys(customCanvas).map((board, i) => {
              return (
                <>
                  <>
                    {Object.keys(customCanvas[board]).map((item, j) => {
                      const idx = customWidgetDetails ? j + 1 : j;
                      if (!customCanvas[board][item].checked) return <></>;
                      if (customCanvas[board][item].slotType === 'full') {
                        return (
                          <FullSlot
                            className="graph-widget"
                            key={`widget-${idx}`}
                            selected={idx === selected}
                            // onClick={(e) => handleClick(idx, e)}
                          >
                            <SlotPlaceHolder
                              body={customCanvas[board][item].placeholder}
                              title={customCanvas[board][item]}
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
                              body={customCanvas[board][item].placeholder}
                              title={customCanvas[board][item].label}
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
                const idx = customWidgetDetails ? j + 1 : j;
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
  setArticleTypeClose: PropTypes.func,
  setArticlePosition: PropTypes.func,
  selectGraph: PropTypes.array,
  setSelectedGraph: PropTypes.any,
  handleShowDownloadPopUp: PropTypes.func,
  dashboardType: PropTypes.string,
  customCanvas: PropTypes.object,
};

export default DashboardInnerContainer;

const dashboardPlaceHolderMap = {
  brand: brandWidgets,
  industry: industryWidgets,
  people,
};
