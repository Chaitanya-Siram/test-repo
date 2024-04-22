import React, { useState } from 'react';
import Proptypes, { object } from 'prop-types';
import NpCustomis from '../../assets/img/np_customize.svg';
import X from '../../assets/icons/X';
import Tabs from '../tabs';
import { PoptabTitleBox } from './mock';
import {
  // ButtonBoxwpr,
  ButtonsContainer,
  DrawerContentBox,
  FooterBoxwpr,
  Headerleftwpr,
  Headerwrap,
  HeadingBoxwpr,
  // Headingwpr,
  Heaerlblwrp,
  Iconwpr,
  // ItemDeswpr,
  // ItemLabelwpr,
  MainBoxwpr,
  TabsBox,
  // TransBtnbox,
  // TransBtntxt,
  LeftfootBoxwpr,
  ListBoxwpr,
  SortInfotxt,
} from './index.sc';
// import Plus from '../../assets/icons/Plus';
import Trash from '../../assets/icons/Trash';
import { ListBox } from './ListBox';
import { theme } from '../../constants/theme';
// import { giveCheckedfor2dArr } from './utility';
import ItemsBox from './item-box';
import { useSelector } from 'react-redux';
import { Button } from '../button';
import toast from 'react-hot-toast';

const CustomDrawer = ({
  toggler = () => {},
  heading = 'Customize Canvas',
  showEditIcon = false,
  isList = false,
  Items,
  CanvasList,
  listInfo = 'Choose Canvas to add article',
  listClick,
  setConfirmationPopUp = () => {},
  handleSelectedTab = () => {},
  canvasData,
}) => {
  const Titletabs = Items.map((item, i) => ({
    ...item,
    id: i,
    title: <PoptabTitleBox title={item.tabLable} />,
    content: <></>,
  }));

  const [itemIndex, setItemIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState(0);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const handleClick = (index) => {
    setItemIndex(index);
    handleSelectedTab(Titletabs[index].title?.props.title);
  };

  const handleToggle = () => {
    toggler(false);
  };

  const handleSubmit = () => {
    toast.success(`${heading} successfull !`);
    toggler(false);
  };
  return (
    <>
      <DrawerContentBox>
        <Headerwrap>
          <Headerleftwpr>
            {showEditIcon && <img src={NpCustomis} alt="" />}
            <Heaerlblwrp>{heading}</Heaerlblwrp>
          </Headerleftwpr>
          <Iconwpr onClick={handleToggle}>
            <X />
          </Iconwpr>
          {/* <TransBtnbox isList={isList}>
            {!isList && (
              <Iconwpr>
                <Plus color={theme.primary} />
              </Iconwpr>
            )}
            <TransBtntxt>
              {isList ? 'CREATE NEW CANVAS' : 'Create New'}
            </TransBtntxt>
          </TransBtnbox> */}
        </Headerwrap>
        <MainBoxwpr>
          {isList && (
            <>
              <SortInfotxt>{listInfo}</SortInfotxt>
              <ListBoxwpr>
                {isList &&
                  CanvasList.map((list, i) => (
                    <ListBox
                      key={i}
                      item={{ title: list.listName, date: list.created }}
                      handleClick={listClick}
                    />
                  ))}
              </ListBoxwpr>
            </>
          )}
          {!isList && (
            <>
              <TabsBox>
                <Tabs
                  activeColor={theme[selectedTheme].primary}
                  inactiveColor={theme[selectedTheme].secondaryText}
                  items={Titletabs}
                  paddingWrapper="0"
                  wraperBorderWidth="0"
                  gapitems="1rem"
                  onChange={handleClick}
                  bottomBorderWidth="3px"
                />
                {/* <TransBtnbox isList={isList}>
                  {!isList && (
                    <Iconwpr>
                      <Plus color={theme.primary} />
                    </Iconwpr>
                  )}
                  <TransBtntxt>
                    {isList ? 'CREATE NEW CANVAS' : 'Create New'}
                  </TransBtntxt>
                </TransBtnbox> */}
              </TabsBox>
              <div>
                <HeadingBoxwpr>
                  {/* <span>Canvas Name</span>
                  <Headingwpr>{Items[itemIndex].tabLable}</Headingwpr> */}
                  <div className="yshj">
                    {itemIndex !== 0 && itemIndex !== 1
                      ? Items[itemIndex]?.data?.length
                      : checkedItems}{' '}
                    items
                    <span>Selected</span>
                  </div>
                </HeadingBoxwpr>
                <ItemsBox
                  border={'none'}
                  setCheckedItems={setCheckedItems}
                  itemIndex={itemIndex}
                  selectedItem={Items[itemIndex]}
                  canvasData={canvasData}
                  BydefaultChecked={
                    itemIndex !== 0 || (itemIndex !== 1 && true)
                  }
                />
              </div>
            </>
          )}
        </MainBoxwpr>
        <FooterBoxwpr>
          {!isList && (
            <>
              <LeftfootBoxwpr onClick={() => setConfirmationPopUp(true)}>
                {Items[itemIndex].tabVale !== 'spotlight' &&
                  Items[itemIndex].tabVale !== 'my_workspace' && (
                    <>
                      <Trash />
                      <span>Delete this Canvas</span>
                    </>
                  )}
              </LeftfootBoxwpr>
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
            </>
          )}
        </FooterBoxwpr>
      </DrawerContentBox>
    </>
  );
};

CustomDrawer.propTypes = {
  toggler: Proptypes.func,
  heading: Proptypes.string,
  showEditIcon: Proptypes.bool,
  isList: Proptypes.bool,
  Items: Proptypes.arrayOf(object),
  CanvasList: Proptypes.arrayOf(object),
  canvasData: Proptypes.any,
  listInfo: Proptypes.string,
  listClick: Proptypes.func,
  setConfirmationPopUp: Proptypes.func,
  handleSelectedTab: Proptypes.func,
};

export default CustomDrawer;
