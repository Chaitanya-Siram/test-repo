import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Proptypes from 'prop-types';
import ChevronRight from '../../assets/icons/ChevronRight';
import Plus from '../../assets/icons/Plus';
import Advanced from '../../assets/icons/create-dashboard/dropdown/advanced.svg';
import Brand from '../../assets/icons/create-dashboard/dropdown/brand.svg';
import Custom from '../../assets/icons/create-dashboard/dropdown/custom.svg';
import Industry from '../../assets/icons/create-dashboard/dropdown/industry.svg';
import People from '../../assets/icons/create-dashboard/dropdown/people.svg';
import { theme } from '../../constants/theme';
import { navMenu } from '../../routes';
import { axiosGet } from '../../service';
import { getSearchParams } from '../../utils';
import Popover from '../Drop-down-reusable/Popover';
import CustomDashboardCanvas from '../custom-dashboard-canvas';
import CustomPopupWrapper from '../custom-popup-wrapper';
import DashboardPopup from '../dasboard-popup';
import { LoadingSpin } from '../loading-spinner/index.sc';
import SearchPopup from '../search-popup/SearchPopContent';
import { Frames } from '../search-popup/contents';
import { useSavedDashboardQueryCount } from '../../hooks/useSaveDashboard';
import {
  BottomWrapper,
  ButtonBoxwpr,
  ButtonWrapper,
  IconText,
  InnerWrapper,
  Link,
  MainWrapper,
  NavWrp,
  OuterWrapper,
  // PlusButton,
  SaveCount,
  SavedContainer,
  // TileBottomwpr,
  TileHeader,
  TileLabel,
  TileValue,
} from './index.sc';
import toast from 'react-hot-toast';
import { useGetSavedNewsletterCount } from '../../hooks/useSaveNewsLetter';
import { getTokenData } from '../../constants/validateToken';

const NavSection = ({ handleNotificationClick }) => {
  const [showCreateDashboard, setShowCreateDashboard] = useState(false);
  const tokenData = getTokenData();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const getTabCount = () => {
    return axiosGet('/tabs-count', {}, {});
  };

  const { data: totalSavedDashboards } = useSavedDashboardQueryCount();
  const { data: totalSavedNewsletters } = useGetSavedNewsletterCount();

  const { isLoading, data } = useQuery({
    queryKey: ['tabCount'],
    queryFn: () => getTabCount(),
    refetchOnWindowFocus: false,
  });
  const getTileValue = (label) => {
    if (label === 'Dashboards') {
      return totalSavedDashboards?.data?.total_count;
    } else if (label === 'Newsletters') {
      return totalSavedNewsletters?.data?.total_count;
    }
    const countObj = data?.data?.data.find((item) => item.label === label);
    return countObj ? countObj.count : 0;
  };

  const navigate = useNavigate();

  const handleAdd = (e, label) => {
    if (label === 'Dashboards') {
      e.preventDefault();
      setShowCreateDashboard(true);
    }
    if (label === 'Newsletters') {
      e.preventDefault();
      navigate('create-news-letter');
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDiv, setIsHoveredDiv] = useState(null);
  const [isHoveredMainDiv, setHoveredMainDiv] = useState(null);
  const [lastHoverd, setLashovered] = useState(null);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setIsHoveredDiv(index);
    setHoveredMainDiv(null);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsHoveredDiv(null);
    setHoveredMainDiv(() => lastHoverd);
    setIsHovered(true);
  };
  const handleMouseEntered = (index) => {
    setIsHovered(true);
    setHoveredMainDiv(index);
    setLashovered(index);
  };

  const handleMouseLeaved = () => {
    setIsHovered(false);
    setHoveredMainDiv(null);
  };

  const elements = navMenu.filter((item) => item.menuItem);

  const dropdownOptions = [
    {
      label: 'Brand & Competition',
      value: 'brand',
      // path: `${searchId}/brand`,
      icon: Brand,
      subText: '13 Charts',
    },
    {
      label: 'People',
      value: 'people',
      // path: `${searchId}/people`,
      icon: People,
      subText: '6 Charts',
    },
    {
      label: 'Industry',
      value: 'industry',
      // path: `${searchId}/industry`,
      icon: Industry,
      subText: '7 Charts',
    },
    {
      label: 'Advanced',
      value: 'advanced',
      // path: `${searchId}/advanced`,
      icon: Advanced,
      subText: '5 Charts',
      children: [
        {
          label: 'Campaign Monitor',
          value: 'campaign',
          // path: `${searchId}/campaign`,
        },
        {
          label: 'Author Impact',
          value: 'authorimpact',
          // path: `${searchId}/authorimpact`,
        },
        {
          label: 'Sentiments By Themes',
          value: 'sentiments',
          // path: `${searchId}/sentiments`,
        },
        {
          label: 'Message Congruence',
          value: 'congruence',
          // path: `${searchId}/congruence`,
        },
        {
          label: 'PR Impact',
          value: 'primpact',
          // path: `${searchId}/primpact`,
        },
      ],
    },
    {
      label: 'Custom',
      value: 'custom',
      // path: `${searchId}/custom`,
      icon: Custom,
      subText: '26 Charts',
    },
  ];

  const handleCreateOption = (e) => {
    setCurrentStep(1);
    setSelectedDashboard(e);
  };
  const handleCreateAdvancedOption = (e) => {
    setCurrentStep(1);
    setSelectedDashboard(e);
  };
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    setCurrentStep(0);
  }, [showCreateDashboard]);

  const [selectedDashboard, setSelectedDashboard] = useState('');
  const [selectedCustomSearch, setSelectedCustomSearch] = useState('');
  const handleSearchForCustom = (e) => {
    if (selectedDashboard === 'custom') {
      setCurrentStep(2);
      setSelectedCustomSearch(e);
    } else {
      let searchParams = JSON.parse(e?.search_params);
      searchParams = getSearchParams(searchParams);
      const advancedDashboards = dropdownOptions.find(
        (x) => x.value === 'advanced'
      )?.children;
      if (advancedDashboards.some((x) => x.value === selectedDashboard)) {
        if (
          searchParams?.filters?.filter?.sentiment &&
          searchParams?.filters?.filter?.sentiment?.length === 1 &&
          searchParams?.filters?.filter?.sentiment[0]?.value === 'NEU'
        ) {
          toast.error(
            'The saved search is based on neutral sentiment. Please unselect the sentiment filter in the Saved Search query.'
          );
          return;
        }
      }
      navigate(`/dashboard/${e.id}/${selectedDashboard}/`, {
        state: {
          filters: {
            ...searchParams?.filters?.filter,
            query: searchParams?.filters?.query,
            guidedSection: searchParams?.isGuidedSearch,
          },
          recent_searchId: e.recent_search_id,
          search_name: e?.title,
        },
      });
    }
  };
  const [selectedItems, setSelectedItems] = useState({});
  const handleCheckedItems = (e) => {
    setSelectedItems(e);
  };

  const HandleNavigate = (ele) => {
    ele.label === 'Alerts' && handleNotificationClick();
  };

  return (
    <NavWrp>
      {elements.slice(0, 5).map((ele, i) => (
        <Link
          index={i}
          key={`${ele.path}-${i}`}
          to={ele.label !== 'Alerts' && ele.path}
          onClick={() => HandleNavigate(ele)}
          onMouseEnter={() => handleMouseEntered(i)}
          onMouseLeave={handleMouseLeaved}
          role={ele.label !== 'Newsletters' ? tokenData?.role : ''}
        >
          <TileHeader>
            {/* {ele.icon} */}
            <TileLabel>{ele.label}</TileLabel>
            {(ele.label === 'Dashboards' || ele.label === 'Newsletters') && (
              <SaveCount onClick={(e) => handleAdd(e, ele?.label)}>
                <MainWrapper
                  active={isHoveredDiv === i}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <OuterWrapper />
                  <InnerWrapper
                    id={
                      ele.label === 'Dashboards'
                        ? 'coach-create-dashboard-wrp'
                        : ele.label === 'Newsletters'
                        ? 'coach-create-news-letters-wrp'
                        : ''
                    }
                    active={isHoveredDiv === i}
                  >
                    <Plus
                      width="2rem"
                      height="2rem"
                      color={
                        isHovered && i === isHoveredDiv
                          ? 'white'
                          : theme[selectedTheme].primary
                      }
                    />
                  </InnerWrapper>
                </MainWrapper>
              </SaveCount>
            )}
          </TileHeader>
          {/* <TileBottomwpr> */}
          {isLoading ? (
            <LoadingSpin />
          ) : (
            // ) : ele.label === 'Alerts' ? (
            //   <SavedContainer>
            //     <TileValue >{getTileValue(ele.label)}</TileValue>
            //     {/* {getTileValue(ele.label) !== 0 && ( */}
            //       <IconText alert={true}>Saved</IconText>
            //     {/* )} */}
            //   </SavedContainer>
            // ) : (
            <SavedContainer>
              <TileValue>{getTileValue(ele.label)}</TileValue>
              <IconText>
                {ele.label === 'Alerts' ? 'Active Alerts' : 'Saved'}
              </IconText>
            </SavedContainer>
          )}
          {/* </TileBottomwpr> */}
          <BottomWrapper>
            <MainWrapper active={isHoveredMainDiv === i}>
              <OuterWrapper />
              <InnerWrapper active={isHoveredMainDiv === i}>
                <ChevronRight
                  width="1rem"
                  height="1rem"
                  color={
                    isHovered && i === isHoveredMainDiv
                      ? 'white'
                      : theme[selectedTheme].primary
                  }
                />
              </InnerWrapper>
            </MainWrapper>
          </BottomWrapper>
        </Link>
      ))}
      <DashboardPopup
        open={showCreateDashboard}
        toggler={setShowCreateDashboard}
        width={
          currentStep === 1 ? '940px' : currentStep === 2 ? '1000px' : 'auto'
        }
        popContent={
          currentStep === 0 ? (
            <Popover
              navigation={handleCreateOption}
              childNavigation={handleCreateAdvancedOption}
              dropdownArray={dropdownOptions}
              closeButton={false}
            />
          ) : currentStep === 1 ? (
            <SearchPopup
              Frames={Frames}
              handleClick={handleSearchForCustom}
              isCheckBox={false}
              isIcons={false}
              showChip={false}
              isTriangle={true}
            />
          ) : (
            <CustomPopupWrapper
              heading="Select Charts for Dashboard"
              footer={
                <ButtonWrapper>
                  <ButtonBoxwpr
                    onClick={() => {
                      setSelectedItems({});
                      setShowCreateDashboard(false);
                    }}
                    border="1px solid #535770"
                  >
                    Cancel
                  </ButtonBoxwpr>
                  <ButtonBoxwpr
                    background={theme[selectedTheme].primary}
                    fontColor={'#fff'}
                    onClick={() => {
                      if (
                        !Object.keys(selectedItems).filter(
                          (items) =>
                            Object.keys(selectedItems[items]).filter(
                              (item) => selectedItems[items][item]
                            ).length
                        ).length
                      ) {
                        return;
                      }
                      let searchParams = JSON.parse(
                        selectedCustomSearch?.search_params
                      );
                      searchParams = getSearchParams(searchParams);
                      navigate(
                        `/dashboard/${selectedCustomSearch?.id}/${selectedDashboard}/`,
                        {
                          state: {
                            filters: {
                              ...searchParams?.filters?.filter,
                              query: searchParams?.filters?.query,
                              guidedSection: searchParams?.isGuidedSearch,
                            },
                            selectedItems: JSON.stringify(selectedItems),
                            recent_searchId:
                              selectedCustomSearch?.recent_search_id,
                            search_name: selectedCustomSearch?.title,
                          },
                        }
                      );
                      setShowCreateDashboard(false);
                    }}
                    disabled={
                      !Object.keys(selectedItems).filter(
                        (items) =>
                          Object.keys(selectedItems[items]).filter(
                            (item) => selectedItems[items][item]
                          ).length
                      ).length
                    }
                  >
                    Create Dashboard
                  </ButtonBoxwpr>
                </ButtonWrapper>
              }
              width={'100%'}
            >
              <CustomDashboardCanvas
                handleItemClick={handleCheckedItems}
                selectedItems={selectedItems}
              ></CustomDashboardCanvas>
            </CustomPopupWrapper>
          )
        }
        padding="0"
        Cross={true}
        borderRadius="0.75rem"
      />
    </NavWrp>
  );
};

NavSection.propTypes = {
  handleNotificationClick: Proptypes.func,
};
export default NavSection;
