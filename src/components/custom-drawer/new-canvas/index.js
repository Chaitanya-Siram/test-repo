import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { Imgwpr } from '../../home-page/tab-section/index.sc';
import {
  // ButtonBoxwpr,
  ButtonsContainer,
  DrawerContentBox,
  FooterBoxwpr,
  Headerleftwpr,
  Headerwrap,
  Heaerlblwrp,
  Iconwpr,
  LeftfootBoxwpr,
  MainBoxwpr,
  // WriteIconwpr,
} from '../index.sc';
import X from '../../../assets/icons/X';
import NpCustomis from '../../../assets/img/np_customize.svg';
import {
  // CanvasBoxwpr,
  // CanvasContainer,
  CanvasDescriptionwpr,
  CanvasTitlewpr,
  // CanvasTypelabelwpr,
  CavasTypewpr,
  // InputLabelBox,
  // InputLabelwpr,
  // Inputwpr,
  // SubTitlewpr,
  // Sublablewpr,
  RadioLabel,
  RadioInput,
  MainRadioWrp,
  TopWrp,
  ChipText,
} from './index.sc';
import { theme } from '../../../constants/theme';
import { axiosGet, axiosPostRequest } from '../../../service';
import { useQuery } from '@tanstack/react-query';
import TileSelector from '../../tile-selector';
// import { formatNumber } from '../../../utils';
import { useSelector } from 'react-redux';
import { dashboardChips } from '../../../constants/dashboard';
import { Button } from '../../button';
import toast from 'react-hot-toast';
// import WriteIcon from '../../../assets/icons/WriteIcon';
// import TileSelector from '../../tile-selector';
// import { giveCheckedfor2dArr } from '../utility';

// const getCheckItems = (data) => {
//   console.log('data which i selected', data, '--->', data['saved-search']);
//   // return [
//   //  'saved-dashboard': [...data['saved-dashboard'].filter((obj) => obj.checked)],
//   //   ...data['saved-search']?.filter((obj) => obj.checked),
//   // ];
//   // return {
//   //   'saved-search': [...data['saved-dashboard'].filter((obj) => obj.checked)],
//   //   'saved-dashboard': [...data['saved-search'].filter((obj) => obj.checked)],
//   // };
// };

const InnerChild = ({ data }) => {
  return (
    <>
      <TopWrp>
        <CanvasTitlewpr>{data.title || data.label}</CanvasTitlewpr>
        <ChipText bgcolor={dashboardChips[data?.dashboardType]?.color}>
          {dashboardChips[data?.dashboardType]?.label}
        </ChipText>
      </TopWrp>
      <CanvasDescriptionwpr>
        {data.description || data.des}
      </CanvasDescriptionwpr>
      {/* <SubTitlewpr fontWeight={600}> */}
      {/* {data.updateOn} */}
      {/* {formatNumber(data.results)} <span>Results</span> */}
      {/* </SubTitlewpr> */}
    </>
  );
};

InnerChild.propTypes = {
  data: Proptypes.object.isRequired,
};

const NewCanDrawer = ({
  toggler,
  heading = 'Create New Canvas',
  showEditIcon = false,
}) => {
  const handleToggle = () => {
    toggler(false);
  };

  const [checkedItems, setCheckedItems] = useState({});
  const [selectedType, setSelectedType] = useState('saved-search');
  const getSavedSearchData = () => {
    return axiosGet('/saved-search', {
      limit: 1000,
      page: 1,
    });
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const getSavedDashboard = ({ pageParam, fiterType = '' }) => {
    return axiosGet('/saved-dashboard', {
      limit: 15,
      page: pageParam,
      fiterType,
    });
  };

  const { data: savedDashboardData } = useQuery({
    queryKey: ['saved-dashboard-list'],
    queryFn: ({ pageParam = 1 }) => getSavedDashboard({ pageParam }),
    refetchOnWindowFocus: false,
  });

  const { data: savedSearchData } = useQuery({
    queryKey: ['saved-search-data'],
    queryFn: () => getSavedSearchData(),
    refetchOnWindowFocus: false,
  });

  const type = [
    { label: 'saved-search', value: 'Saved Searches' },
    { label: 'saved-dashboard', value: 'Saved Dashboard' },
  ];

  const [items, setItems] = useState({
    'saved-search': [],
    'saved-dashboard': [],
  });

  useEffect(() => {
    setItems({
      'saved-dashboard': savedDashboardData?.data?.data,
      'saved-search': savedSearchData?.data?.data,
    });
  }, [
    savedDashboardData?.data?.data,
    savedSearchData?.data?.data,
    selectedType,
  ]);

  // useEffect(() => {
  //   if (items['saved-dashboard'] && items['saved-search']) {
  //     setCheckedItems(getCheckItems(items));
  //   }
  // }, [items]);

  const handleCheckItems = (checkedList, board) => {
    console.log(board, savedSearchData);
    // setItems({
    //   ...items,
    //   [board.label]: checkedList,
    // });
    setCheckedItems({ [board.label]: checkedList });
  };

  const handleSubmit = () => {
    axiosPostRequest('/create-canvas', {}, checkedItems);
    toast.success('New Canvas created successfully !');
    toggler(false);
  };
  return (
    <DrawerContentBox>
      <Headerwrap>
        <Headerleftwpr>
          {showEditIcon && <Imgwpr src={NpCustomis} alt="" />}
          <Heaerlblwrp>{heading}</Heaerlblwrp>
        </Headerleftwpr>
        <Iconwpr onClick={handleToggle}>
          <X color={theme[selectedTheme].primary} size={25} />
        </Iconwpr>
      </Headerwrap>
      <MainBoxwpr>
        {/* <InputLabelBox>
          <Sublablewpr>Canvas Name</Sublablewpr>
          <InputLabelwpr>
            <Inputwpr placeholder="Enter Canvas Name" required />
          </InputLabelwpr>
        </InputLabelBox> */}
        <MainRadioWrp onChange={(e) => setSelectedType(e.target.value)}>
          {type?.map((ele, i) => (
            <RadioLabel key={i} checked={ele.label === selectedType}>
              <RadioInput
                type="radio"
                value={ele.label}
                defaultChecked={ele.label === selectedType}
                checked={ele.label === selectedType}
              />
              {ele.value}
            </RadioLabel>
          ))}
        </MainRadioWrp>
        {type?.map(
          (ele, i) =>
            ele?.label === selectedType && (
              <CavasTypewpr key={i}>
                <TileSelector
                  isMultiselect={false}
                  elements={items[ele.label] ? items[ele.label] : []}
                  board={ele}
                  handleCheck={handleCheckItems}
                  InnerChild={InnerChild}
                />
              </CavasTypewpr>
            )
        )}
      </MainBoxwpr>
      <FooterBoxwpr>
        <LeftfootBoxwpr></LeftfootBoxwpr>
        <ButtonsContainer>
          <Button
            title={'Cancel'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={handleToggle}
            border={theme[selectedTheme].primary}
          />
          <Button
            title={'Submit'}
            backgroundColor={theme[selectedTheme].primary}
            onClick={handleSubmit}
          />
        </ButtonsContainer>
      </FooterBoxwpr>
    </DrawerContentBox>
  );
};

NewCanDrawer.propTypes = {
  toggler: Proptypes.func.isRequired,
  heading: Proptypes.string,
  showEditIcon: Proptypes.bool,
};

export default NewCanDrawer;
