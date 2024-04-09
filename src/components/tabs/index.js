import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styles from './index.sc';
import { theme } from '../../constants/theme';

const Tabs = ({
  items,
  onChange,
  variant,
  activeColor,
  inactiveColor,
  widthItem,
  isContent,
  paddingWrapper = '1rem',
  wraperBorderWidth = '1px 0 ',
  bottomBorderWidth = '0',
  gapitems = '0',
  activeCardBGColor,
  inactiveCardBGColor,
  cardBorderRadius,
  inactiveFontWeight,
  currentTab,
  defaultActive = true,
  currentTabList,
  resetTab = false,
}) => {
  const [activeTab, setActiveTab] = useState([]);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const tabsRef = useRef(null);
  const activeTabRef = useRef(null);

  // Check if there's overflow on mount and on resize

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeTab]);
  // const observeIntersection = () => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const itemsAfterFilter = entries.map((entry, index) => {
  //         if (entry.isIntersecting) {
  //           return { ...items[index], visible: true };
  //         } else {
  //           return { ...items[index], visible: false };
  //         }
  //       });
  //       setMenuItems(itemsAfterFilter.filter((item) => !item.visible));
  //     },
  //     { root: tabsRef.current, threshold: 1 }
  //   );
  //   const tabs = Array.from(tabsRef.current.children);
  //   tabs.forEach((tab) => observer.observe(tab));
  //   return () => {
  //     observer.disconnect();
  //   };
  // };

  const onChangeTab = (item, index) => {
    // if (resetTab && activeTab === item) {
    //   setActiveTab(null);
    //   onChange && onChange(index, item);
    // } else {
    setActiveTab((prev) => {
      if (prev.includes(item?.props?.title)) {
        return prev.filter((val) => val !== item?.props?.title);
      } else {
        return [...prev, item?.props?.title];
      }
    });
    onChange && onChange(index, item);
    // }
  };
  useEffect(() => {
    if (defaultActive) {
      setActiveTab([0]);
    } else {
      // setActiveTab(currentTab);
      if (currentTabList) {
        setActiveTab([...currentTabList]);
      } else {
        setActiveTab([currentTab]);
      }
    }
  }, [defaultActive, currentTab, currentTabList]);

  const handleScroll = () => {
    setShowLeftShadow(tabsRef.current.scrollLeft > 0);
    setShowRightShadow(
      tabsRef.current.scrollLeft <
        tabsRef.current.scrollWidth - tabsRef.current.clientWidth
    );
  };

  return (
    <Styles.Container className="tabs-asmtabs">
      <Styles.TabsWrapper
        showLeftShadow={showLeftShadow}
        showRightShadow={showRightShadow}
        paddingWrapper={paddingWrapper}
        wraperBorderWidth={wraperBorderWidth}
      >
        <Styles.TabsContainer
          gapitems={gapitems}
          ref={tabsRef}
          onScroll={handleScroll}
          // borderTopExists={'2px solid #eceff3'}
        >
          {items.map((item, i) => (
            <Styles.TabContainer
              key={i}
              ref={item.id === activeTab ? activeTabRef : null}
              // active={item?.props?.title === activeTab}
              active={activeTab.includes(i)}
              onClick={(e) => {
                e.preventDefault();
                !item.title.props.title.isDisabled &&
                  onChangeTab(item.title, i);
              }}
              isDisabled={item.isDisabled}
              variant={variant}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              theme={theme.light}
              width={item?.width || widthItem}
              bottomBorderWidth={bottomBorderWidth}
              inactiveCardBGColor={inactiveCardBGColor}
              activeCardBGColor={activeCardBGColor}
              cardBorderRadius={cardBorderRadius}
              inactiveFontWeight={inactiveFontWeight}
              activeTab={activeTab}
            >
              <Styles.Title className="titleWrappewr">
                {item.title}
              </Styles.Title>
            </Styles.TabContainer>
          ))}
        </Styles.TabsContainer>
      </Styles.TabsWrapper>
      {/* {variant !== 'underline' && <Styles.HorizontalLine />} */}
      {isContent && (
        <Styles.TabContent variant={variant}>
          {items[activeTab].content}
        </Styles.TabContent>
      )}
    </Styles.Container>
  );
};

Tabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      content: PropTypes.oneOfType([PropTypes.node || PropTypes.string]),
      isDisabled: PropTypes.bool,
    })
  ).isRequired,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['underline', 'card']),
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  widthItem: PropTypes.string,
  isContent: PropTypes.bool,
  paddingWrapper: PropTypes.string,
  wraperBorderWidth: PropTypes.string,
  bottomBorderWidth: PropTypes.string,
  gapitems: PropTypes.string,
  inactiveCardBGColor: PropTypes.string,
  activeCardBGColor: PropTypes.string,
  cardBorderRadius: PropTypes.string,
  inactiveFontWeight: PropTypes.string,
  currentTab: PropTypes.any,
  defaultActive: PropTypes.bool,
  resetTab: PropTypes.bool,
  currentTabList: PropTypes.array,
};

Tabs.defaultProps = {
  variant: 'underline',
};

export default Tabs;
