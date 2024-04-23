import React, { useState } from 'react';
import Proptypes, { object } from 'prop-types';
// import { ButtonBoxwpr } from './index.sc';
import {
  ButtonsContainer,
  DrawerContentBox,
  FooterBoxwpr,
  Headerleftwpr,
  Headerwrap,
  Heaerlblwrp,
  Iconwpr,
  LeftfootBoxwpr,
  MainBoxwpr,
} from '../custom-drawer/index.sc';
import { Imgwpr } from '../home-page/tab-section/index.sc';
import X from '../../assets/icons/X';
import {
  CanvasTypelabelwpr,
  CavasTypewpr,
} from '../custom-drawer/new-canvas/index.sc';
import { theme } from '../../constants/theme';

import { Img } from '../../assets/img';
import TileSelector from '../tile-selector';
import { TileComponent } from '../custom-drawer/tile-component';
import { useSelector } from 'react-redux';
import { axiosGet } from '../../service';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../button';

const AddGraphpop = ({
  toggler,
  heading = 'Add Graph',
  canvas,
  showEditIcon = false,
  onSubmit,
}) => {
  const { newsLetterId } = useParams();
  const handleToggle = () => {
    toggler(false);
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const [checkedItem, setCheckedItem] = useState();

  const getgraphData = (newsLetterId, checkedItem) => {
    return axiosGet('/selected-graph', {
      newsLetterId,
      component: checkedItem?.component,
    });
  };

  const {
    refetch,
    // isLoading,
    // error: articleerror,
    data: graphData,
    // isFetching,
  } = useQuery({
    queryKey: ['selected-graph', newsLetterId, checkedItem],
    queryFn: () => getgraphData(newsLetterId, checkedItem),
    refetchOnWindowFocus: false,
  });

  const handleClick = (item) => {
    if (item.checked) {
      setCheckedItem(item);
      refetch();
    } else {
      setCheckedItem(null);
    }
  };

  const handleSubmit = () => {
    if (checkedItem) {
      onSubmit({ checkedItem, ...graphData?.data?.data });
      toggler(false);
    }
  };

  return (
    <DrawerContentBox>
      <Headerwrap>
        <Headerleftwpr>
          {showEditIcon && <Imgwpr src={Img.NpCustomis} alt="" />}
          <Heaerlblwrp>{heading}</Heaerlblwrp>
        </Headerleftwpr>
        <Iconwpr onClick={handleToggle}>
          <X color={theme[selectedTheme].primary} size={34} />
        </Iconwpr>
      </Headerwrap>
      <MainBoxwpr>
        <CavasTypewpr>
          <CanvasTypelabelwpr>Choose Graph</CanvasTypelabelwpr>
          <TileSelector
            elements={canvas}
            InnerChild={TileComponent}
            handleCheck={handleClick}
            isMultiselect={false}
            board={{ label: '', value: '' }}
          />
        </CavasTypewpr>
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
            title={'Add'}
            backgroundColor={theme[selectedTheme].primary}
            onClick={handleSubmit}
          />
        </ButtonsContainer>
      </FooterBoxwpr>
    </DrawerContentBox>
  );
};

AddGraphpop.propTypes = {
  toggler: Proptypes.func.isRequired,
  heading: Proptypes.string,
  canvas: Proptypes.arrayOf(object),
  showEditIcon: Proptypes.bool,
  onSubmit: Proptypes.func.isRequired,
};

export default AddGraphpop;
