import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import {
  BoxWrp,
  ItemTypeBoxWrp,
  //  ItemTypeWrp
} from './index.sc';
import TileSelector from '../../tile-selector';
import { TileComponent } from '../tile-component';
import {
  getDashboardWidgets,
  standardDashboards,
  dashboards,
} from '../../../constants/widgets';

const getCheckedBoardList = (boardData, board) => {
  const widgetsList = [];
  const boardWidgets = getDashboardWidgets(board);
  const boardDataComponentList = boardData.map((ele) => ele.component);
  boardWidgets.forEach((ele) => {
    widgetsList.push({
      ...ele,
      checked: boardDataComponentList.includes(ele.value),
    });
  });

  return widgetsList;
};

const getCheckedCount = (data) => {
  let cc = 0;
  data.forEach((ele) => {
    const checkedFilter = ele.filter((item) => item.checked);
    cc += checkedFilter.length;
  });
  return cc;
};

const ItemsBox = ({
  itemIndex,
  setCheckedItems,
  selectedItem,
  canvasData,
  BydefaultChecked = false,
  border = '',
}) => {
  const [items, setItems] = useState();
  const [isCanvas, setIsCanvas] = useState();
  const [boardCheckedList, setBoardCheckedList] = useState({});
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    setItems(JSON.parse(JSON.stringify(selectedItem.data)));
    setIsCanvas(
      selectedItem.tabVale !== 'spotlight' &&
        selectedItem.tabVale !== 'my_workspace'
    );
  }, [selectedItem]);

  useEffect(() => {
    if (isCanvas) {
      const tempObj = {};
      standardDashboards.forEach((board, i) => {
        tempObj[board.value] = getCheckedBoardList(items, board.value);
      });

      setBoardCheckedList(tempObj);
    }
  }, [isCanvas, items, selectedItem.data]);

  useEffect(() => {
    if (isCanvas) {
      setCheckedCount(getCheckedCount(Object.values(boardCheckedList)));
    } else {
      if (items) setCheckedCount(getCheckedCount([items]));
    }
  }, [boardCheckedList, isCanvas, items]);

  useEffect(() => {
    setCheckedItems(checkedCount);
  }, [checkedCount, setCheckedItems]);

  const handleItemClick = (checkedList, board) => {
    if (isCanvas) {
      setBoardCheckedList({
        ...boardCheckedList,
        [board.value]: checkedList,
      });
    } else {
      setItems(checkedList);
    }
  };
  const myDashboardType = canvasData?.data
    ?.find((items) => items.tabVale === selectedItem?.tabVale)
    ?.data.map((items) =>
      items.title
        .split(' ')
        ?.map((word) => word.toLowerCase())
        .join('')
    );

  const myboard = standardDashboards?.filter(
    (items) => items.value === selectedItem?.dashboardType
  );
  const wid = myboard[0]?.widgets;
  const updateWidgets = {};
  for (const k in wid) {
    if (myDashboardType.includes(k)) {
      updateWidgets[k] = wid[k];
    }
  }
  const finalBoard = [{ ...myboard[0], widgets: { ...updateWidgets } }];
  const elementdata =
    selectedItem?.dashboardType === 'overview'
      ? Object.values(dashboards[0]?.widgets)
      : boardCheckedList[selectedItem?.dashboardType];

  const updatedData1 = elementdata?.filter((items) =>
    myDashboardType.includes(
      items.label
        ?.split(' ')
        ?.map((word) => word.toLowerCase())
        .join('')
    )
  );

  return (
    <ItemTypeBoxWrp border={border}>
      {!isCanvas ? (
        <BoxWrp>
          <TileSelector
            elements={items || []}
            InnerChild={TileComponent}
            handleCheck={handleItemClick}
            board={{ label: '', value: '' }}
          />
        </BoxWrp>
      ) : (
        finalBoard?.map((board, i) => (
          <BoxWrp key={`board-${i}`}>
            {/* <ItemTypeWrp>{board.label}</ItemTypeWrp> */}
            <TileSelector
              board={board}
              elements={updatedData1 || []}
              InnerChild={TileComponent}
              handleCheck={handleItemClick}
              disableSelection={true}
              BydefaultChecked={BydefaultChecked}
            />
          </BoxWrp>
        ))
      )}
    </ItemTypeBoxWrp>
  );
};

ItemsBox.propTypes = {
  itemIndex: Proptypes.number,
  setCheckedItems: Proptypes.func,
  selectedItem: Proptypes.object,
  BydefaultChecked: Proptypes.bool,
  canvasData: Proptypes.any,
  border: Proptypes.string,
};

export default React.memo(ItemsBox);
