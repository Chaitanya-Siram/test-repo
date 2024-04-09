import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../../tabs';
import { dashboardTabs } from '../../../../constants/dashboard';
import {
  ComponentWrapper,
  ComponentWrp,
  TabContentContainer,
  TabsContainer,
} from './index.sc';
import Brand from './brand';
import Industry from './industry';
import People from './people';
import { DashboardTitle } from '../../../tabs/DashboardTitle';

const DashboardHeader = ({ selectedTab, handleTabChange, tabKeywords }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const tabs = dashboardTabs?.map((ele, i) => ({
    ...ele,
    title: (
      <DashboardTitle
        title={ele.label}
        arrow={true}
        isOpen={ele?.type === selectedTab && !isScrolled}
      />
    ),
    id: i,
  }));

  const handleTabs = (index) => {
    handleTabChange && handleTabChange(index);
    if (dashboardTabs[index]?.type === selectedTab) {
      setIsScrolled((old) => !old);
    } else {
      setIsScrolled(false);
    }
  };

  const componentConfig = {
    // overview: <></>,
    brand_competitive: Brand,
    industry: Industry,
    people: People,
    // advanced: <></>,
    // custom: <></>,
  };

  const getSelectedTabContent = () => {
    const Component = componentConfig[selectedTab];
    if (Component) {
      return (
        <ComponentWrp>
          <Component tabKeywords={tabKeywords} />
        </ComponentWrp>
      );
    }
    return <></>;
  };

  useEffect(() => {
    const container = document.querySelector('.dash-scroll-container');
    console.log(container, 'container');
    const handleScroll = () => {
      const scroll = container.scrollTop;
      console.log(scroll, 'scroll');
      if (scroll > 100) {
        setIsScrolled(scroll);
      }
    };
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ComponentWrapper>
      <TabsContainer>
        <Tabs
          items={!tabs ? [{}] : tabs}
          //   widthItem={'20%'}
          variant="underline"
          activeColor="#675EF2"
          inactiveColor="#000000"
          onChange={handleTabs}
          isContent={false}
          bottomBorderWidth="3px"
          paddingWrapper="1.2rem 1.25rem"
          inactiveFontWeight="700"
          arrow={true}
        />
      </TabsContainer>
      <TabContentContainer className={isScrolled ? 'fold' : ''}>
        {getSelectedTabContent()}
      </TabContentContainer>
    </ComponentWrapper>
  );
};

export default DashboardHeader;

DashboardHeader.propTypes = {
  selectedTab: PropTypes.string,
  handleTabChange: PropTypes.func,
  tabKeywords: PropTypes.any,
};
