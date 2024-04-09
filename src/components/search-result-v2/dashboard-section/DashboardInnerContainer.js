import React, { useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import {
  // BackDrop,
  DashboardInnerSection,
  FullSlot,
  HalfSlot,
  SlotWrp,
  UberTextTitle,
  UberTilesWrp,
  UserTilesMainWrp,
} from '../index.sc';
import SlotDetails from '../slot-details';
import UberTiles from '../../uber-tiles';
import { overviewWidgets } from '../../../constants/widgets';

const DashboardInnerContainer = ({
  dashboardDetails,
  loader,
  tileDetails,
  setArticleType,
  articleType,
  overRideSlot = false,
  setClickedPosition,
  articlePosition,
}) => {
  const [selected, setSelected] = useState(null);
  const [resetSelection, setResetSelection] = useState(true);

  const handleClick = (i, e) => {
    e.stopPropagation();
    if (setArticleType) {
      setArticleType((prev) => ({
        ...prev,
        widget: dashboardDetails[i]?.title,
      }));
      setSelected(i);
      setClickedPosition(i);
    }
  };

  const handleOnClick = (event, d, widget, i) => {
    // console.log('handleOnClick', event, d, widget);
    setResetSelection(false);
    setSelected(i);
    setArticleType((prev) => ({
      ...prev,
      widget: widget.title,
      graphSelection: d?.labelText || d?.data?.rawdata?.label || '',
    }));
  };

  useEffect(() => {
    if (!articleType?.widget && !articleType?.graphSelection) {
      setResetSelection(true);
    }
  }, [articleType]);
  console.log(overviewWidgets);
  return (
    <DashboardInnerSection
      id="download-content"
      className="dash-scroll-container"
      articlePosition={articlePosition}
      // selected={selected !== null}   //enable this line to make the graphs not scroll - Sujay
    >
      {tileDetails && (
        <UserTilesMainWrp>
          <UberTextTitle>Results In Figure</UberTextTitle>
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
        {dashboardDetails.map((widget, i) =>
          overviewWidgets[widget.component]?.slotType === 'full' ? (
            <FullSlot
              className="graph-widget"
              key={`widget-${i}`}
              selected={i === selected}
              onClick={(e) => handleClick(i, e)}
            >
              <SlotDetails
                widget={widget}
                loader={loader}
                selected={i === 0}
                legend={true}
                commentary={true}
                handleOnClick={(event, d) => handleOnClick(event, d, widget, i)}
                resetSelection={resetSelection}
              />
            </FullSlot>
          ) : (
            <HalfSlot
              className="graph-widget"
              key={`widget-${i}`}
              selected={i === selected}
              onClick={(e) => handleClick(i, e)}
            >
              <SlotDetails
                widget={widget}
                loader={loader}
                legend={true}
                commentary={true}
                handleOnClick={(event, d) => handleOnClick(event, d, widget, i)}
                resetSelection={resetSelection}
              />
            </HalfSlot>
          )
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
};

export default DashboardInnerContainer;
