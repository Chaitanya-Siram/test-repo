import React, { useEffect, useState, useCallback } from 'react';
import {
  BentoSectionWrp,
  Custombtntxt,
  Custombtnwpr,
  IconContDiv,
  // Imgwpr,
  // Imgwpr,
  TabAdd,
  // TabBtn,
  // TabBtnWrp,
  // TabIcon,
  TabSectionMainWrp,
  TabSectionWrp,
  Tabwpr,
} from './index.sc';
import BentoBox from '../../bento-box';
// import grid from '../../../assets/img/homePage/grid.svg';
import DashboardPopup from '../../dasboard-popup';
import CustomDrawer from '../../custom-drawer';
import Tabs from '../../tabs';
import CardTitle from '../../tabs/CardTitle';
import WorkSpot from '../../work-spot-slider/WorkSpot';
import AddBlue from '../../../assets/icons/AddBlue';
import ComponentIcon from '../../../assets/img/ComponentIcon';
import { axiosDelete, axiosGet } from '../../../service';
import SlotDetails from '../../search-result/slot-details';
import GraphSummaryView from '../../l0-view';
// import HalfFull from '../../half-full';
import { workspaceConfig } from '../../../constants/widgets';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import NewCanDrawer from '../../custom-drawer/new-canvas';
import { NewCanvas } from '../../custom-drawer/mock';
import Customize from '../../../assets/icons/Customize';
import VerticalLoading from '../../../assets/icons/loading/verticalLoading/index.js';
import CustomConfirmationPopUp from '../../customize-confirmation-popup';
import BentoPlaceholder from '../../bento-placeholder';
import { useMutation } from '@tanstack/react-query';
import Tooltip from '../../icon-tooltip';
import { getTokenData } from '../../../constants/validateToken';

const bentoColLimit = 4;

const TabSection = () => {
  const [showCustom, setShowCustom] = useState(false);
  const [newCanvaspop, setNewCanvaspop] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [tab, setTab] = useState('');
  const [tabSwithLoader, setTabSwitchLoader] = useState(false);
  const [cutomItems, setCustomItems] = useState([]);
  const loader = false;
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [selectedTab, setSelectedTab] = useState('my_workspace');
  const [canvasData, setCanvasData] = useState([]);
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const tokenData = getTokenData();
  function Gettingvalue(i) {
    if (i === 0 || i === 1) {
      return true;
    } else if (i % 3 === 0 || (i - 1) % 3 === 0) {
      return false;
    } else {
      return true;
    }
  }
  const getTabData = useCallback(
    (item) => {
      let res = [];
      const arrayLength = item.data.length;
      const isEvenLength = arrayLength % 2 === 0;
      switch (item.tabVale) {
        case 'spotlight':
          res = item?.data.map((ele, i) => {
            const ItemComponent = workspaceConfig[item?.component].component;
            const full = i % 5 === 0;
            return {
              id: Math.random().toString,
              data: <ItemComponent items={{ ...ele, full }} />,
            };
          });
          break;
        case 'my_workspace':
          res = item?.data.map((ele, i) => {
            const isGraphItem = ele?.dashboardType;
            const ItemComponent = workspaceConfig[ele?.component]?.component;
            const full = Gettingvalue(i);
            return {
              id: Math.random().toString,
              data: !isGraphItem ? (
                <ItemComponent items={{ ...ele, full }} />
              ) : (
                <SlotDetails widget={ele} loader={loader} />
              ),
            };
          });
          break;
        default:
          res = item.data.reduce((acc, curr, index) => {
            const transformedObject = {
              title: curr?.title,
              subTitle: curr?.subTitle,
              components: {
                l0: (
                  <GraphSummaryView
                    rawData={curr}
                    data={{
                      title: curr?.title,
                      subText:
                        curr?.data?.summary?.subtext ||
                        curr?.data?.summary?.label,
                      value: curr?.data?.summary?.value,
                    }}
                  />
                ),
                l1: (
                  <SlotDetails
                    widget={curr}
                    loader={loader}
                    type="l1"
                    dashboardType={item.dashboardType}
                    handleOnClick={() => {}}
                  />
                ),
                l2: (
                  <SlotDetails
                    widget={curr}
                    loader={loader}
                    type="l2"
                    canvas={true}
                    dashboardType={item.dashboardType}
                  />
                ),
              },
            };
            if (index % 2 === 0) {
              // Creating a new array for every even index
              acc.push([transformedObject]);
            } else {
              acc[acc.length - 1].push(transformedObject);
            }
            return acc;
          }, []);
          if (!isEvenLength) {
            // Adding dummy element to the last sub-array
            res[res.length - 1].push({
              label: 'Dummy',
              subLabel: 'Dummy',
              components: {
                l0: <BentoPlaceholder type={'l0'} />,
                l1: <BentoPlaceholder type={'l1'} />,
                l2: <BentoPlaceholder type={'l2'} />,
              },
            });
          }
          // Additional condition to check if length of res array is less than 8
          while (res.length < bentoColLimit) {
            res.push([
              {
                label: 'Dummy',
                subLabel: 'Dummy',
                components: {
                  l0: <BentoPlaceholder type={'l0'} />,
                  l1: <BentoPlaceholder type={'l1'} />,
                  l2: <BentoPlaceholder type={'l2'} />,
                },
              },
              {
                label: 'Dummy',
                subLabel: 'Dummy',
                components: {
                  l0: <BentoPlaceholder type={'l0'} />,
                  l1: <BentoPlaceholder type={'l1'} />,
                  l2: <BentoPlaceholder type={'l2'} />,
                },
              },
            ]);
          }
          break;
      }
      return res;
    },
    [loader]
  );

  const fetchTabsData = useCallback(async () => {
    try {
      const response = await axiosGet('/canvas-data', {}, {});
      setCanvasData(response.data);
      const data = response.data.data;
      const newData = data.map((item, index) => ({
        id: index,
        title: <CardTitle title={item?.tabLable} />,
        article: getTabData(item),
      }));
      setTabs(newData);
      setTab(newData[0]);
      setCustomItems(data);
    } catch (error) {
      console.error('Error fetching tabs data:', error);
    }
  }, [getTabData]);

  useEffect(() => {
    fetchTabsData();
  }, [fetchTabsData]);
  const handleTabs = (index) => {
    setTabSwitchLoader(true);
    setTab(tabs[index]);
    setTimeout(() => {
      setTabSwitchLoader(false);
    }, 500);
  };
  const handleSelectedTab = (value) => {
    setSelectedTab(value);
  };
  const handleDeleteFn = () => {
    console.log(canvasData);
    return axiosDelete('/canvas-data', selectedTab.split(' ').join(''));
  };
  const mutation = useMutation({
    mutationFn: handleDeleteFn,
    onSuccess: async () => {
      await axiosGet('/canvas-data');
      setConfirmationPopUp(false);
    },
  });
  const handleDeleteCanvas = () => {
    mutation.mutate({ id: selectedTab });
  };
  return (
    <TabSectionMainWrp>
      <TabSectionWrp>
        <Tabwpr>
          {/* <TabIcon src={grid} /> */}
          <Tooltip content="Canvas">
            <IconContDiv>
              <ComponentIcon color={'#fff'} size={'1.75rem'} />
            </IconContDiv>
          </Tooltip>

          {/* <TabBtnWrp>
            {[
              'Trending',
              'GUCCI',
              'CHANEL',
              'ROCKSTAR',
              'RED BULL',
              'SEPHORA',
            ].map((ele, i) => (
              <TabBtn key={`${ele}-${i}`}>{ele}</TabBtn>
            ))}
          </TabBtnWrp> */}
          <Tabs
            items={tabs}
            variant="card"
            activeColor={theme[selectedTheme].background}
            inactiveColor={theme[selectedTheme].primary}
            onChange={handleTabs}
            isContent={false}
            gapitems="0.5rem"
            bottomBorderWidth="0"
            wraperBorderWidth="0"
            activeCardBGColor={theme[selectedTheme].primary}
            inactiveCardBGColor={theme[selectedTheme].background}
            cardBorderRadius="0.375rem"
            paddingWrapper="0 .625rem"
          />
          <Tooltip content="Add Canvas">
            <TabAdd onClick={() => setNewCanvaspop(true)}>
              <AddBlue
                color={theme[selectedTheme].primary}
                width={'0.85rem'}
                height={'0.85rem'}
              />
            </TabAdd>
          </Tooltip>

          <DashboardPopup
            open={newCanvaspop}
            toggler={setNewCanvaspop}
            popContent={
              <NewCanDrawer NewCanvas={NewCanvas} toggler={setNewCanvaspop} />
            }
            padding="0"
            Cross={false}
            borderRadius="0.75rem"
            width="62.75rem"
          />
        </Tabwpr>
        <Custombtnwpr
          id="coach-customize-canvas"
          onClick={() => setShowCustom(true)}
        >
          <Customize
            color={theme[selectedTheme].primary}
            width="1.1rem"
            height="1.1rem"
          />
          <Custombtntxt>Customize</Custombtntxt>
        </Custombtnwpr>
        <DashboardPopup
          open={showCustom}
          toggler={setShowCustom}
          popContent={
            <CustomDrawer
              Items={cutomItems}
              toggler={setShowCustom}
              setConfirmationPopUp={setConfirmationPopUp}
              handleSelectedTab={handleSelectedTab}
              canvasData={canvasData}
              // isList={false}
            />
          }
          width="62.75rem"
          padding="0"
          borderRadius="0.75rem"
        />
        <DashboardPopup
          open={confirmationPopUp}
          toggler={setConfirmationPopUp}
          popContent={
            <CustomConfirmationPopUp
              Heading={'Delete Canvas'}
              SecondHeading={'Are you sure you want to delete?'}
              toggler={setConfirmationPopUp}
              handleDelete={handleDeleteCanvas}
            />
          }
          padding="0"
          borderRadius="0.625rem"
          width="35rem"
        />
      </TabSectionWrp>
      <BentoSectionWrp>
        {tab.id === 0 || tab.id === 1 ? (
          <WorkSpot
            isWorkspace={tab.id === 0 || tab.id === 1}
            activeTab={tab.id}
            workspotdata={tab.article}
          />
        ) : tabSwithLoader ? (
          // <LoadingWrp>
          <VerticalLoading
            bgColor={theme[selectedTheme].primary}
            size="0.25rem"
            width="1.875rem"
            height="1.875rem"
          />
        ) : (
          // </LoadingWrp>
          <BentoBox
            colWidth={22.5}
            colCount={6}
            gridGap={0.75}
            boxes={tab?.article || []}
          />
        )}
      </BentoSectionWrp>
    </TabSectionMainWrp>
  );
};

export default TabSection;
