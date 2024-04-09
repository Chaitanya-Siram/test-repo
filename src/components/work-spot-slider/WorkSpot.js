import React, { useEffect, useRef } from 'react';
import { WorkSpotwpr } from './WorkSpot.sc';
import PropTypes, { object } from 'prop-types';
import {
  WorkspaceContainer,
  MainWrp,
  TabSectionWrp,
  TabTitle,
  TabsWrp,
  TabSection,
  EmptyWrp,
  EmptySubText,
  LinkText,
} from '../half-full/index.sc';
import RecentEmptySearch from '../../assets/icons/RecentEmptySearchIcon';
import RecentEmptyDashboard from '../../assets/icons/RecentEmptyDashboardIcon';
import RecentEmptyNewsletter from '../../assets/icons/RecentEmptyNewsletterIcon';
import { RecentFirstTimeUserList } from '../custom-drawer/mock';

const WorkSpot = ({ workspotdata, isWorkspace, activeTab }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.scrollTo({
      left: 0,
    });
  }, [workspotdata]);

  const handleClick = (index) => {
    const container = containerRef.current;
    const elements = container.children;

    if (elements && elements[index]) {
      const element = elements[index];
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const elementLeft = elementRect.left - containerRect.left + scrollLeft;
      const elementRight = elementRect.right - containerRect.left + scrollLeft;
      const containerWidth = containerRect.width;
      const elementWidth = element.offsetWidth;

      if (elementLeft < scrollLeft) {
        container.scrollTo({
          left: elementLeft - (elementWidth - 12) * 0.4,
          behavior: 'smooth',
        });
      } else if (elementRight > scrollLeft + containerWidth) {
        container.scrollTo({
          left: elementRight - containerWidth + (elementWidth - 12) * 0.4,
          behavior: 'smooth',
        });
      }
    }
  };
  function Gettingvalue(i) {
    if (i === 0 || i === 1 || i === 2) {
      return true;
    } else if (i % 3 === 0 || (i - 1) % 3 === 0) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <WorkSpotwpr
      isWorkspace={isWorkspace}
      isEmptyState={workspotdata?.length > 0}
      ref={containerRef}
    >
      {workspotdata?.length > 0
        ? workspotdata.map((data, i) => (
            <WorkspaceContainer
              isWorkspace={isWorkspace}
              onClick={() => handleClick(i)}
              full={activeTab === 0 ? Gettingvalue(i) : i % 5 === 0}
              key={i}
            >
              {data.data || 'label'}
            </WorkspaceContainer>
          ))
        : RecentFirstTimeUserList?.map((item, index) => {
            return (
              <>
                <WorkspaceContainer full={true} isWorkspace={isWorkspace}>
                  <MainWrp>
                    <TabTitle>{item?.title}</TabTitle>
                    <TabSectionWrp>
                      <TabsWrp>
                        <React.Fragment>
                          <TabSection isEmptyState={true}>
                            {item?.title === 'Recent Searches' && (
                              <EmptyWrp>
                                <RecentEmptySearch size="1.5rem" />
                                <EmptySubText>{item?.description}</EmptySubText>
                                <LinkText>{item.subText}</LinkText>
                              </EmptyWrp>
                            )}
                            {item?.title === 'Recent Dashboards' && (
                              <EmptyWrp>
                                <RecentEmptyDashboard size="1.5rem" />
                                <EmptySubText>{item?.description}</EmptySubText>
                                <LinkText>{item?.subText}</LinkText>
                              </EmptyWrp>
                            )}
                            {item?.title === 'Recent Newsletter' && (
                              <EmptyWrp>
                                <RecentEmptyNewsletter size="1.5rem" />
                                <EmptySubText>{item.description}</EmptySubText>
                                <LinkText>{item.subText}</LinkText>
                              </EmptyWrp>
                            )}
                          </TabSection>
                        </React.Fragment>
                      </TabsWrp>
                    </TabSectionWrp>
                  </MainWrp>
                </WorkspaceContainer>
              </>
            );
          })}
    </WorkSpotwpr>
  );
};

WorkSpot.propTypes = {
  workspotdata: PropTypes.arrayOf(object).isRequired,
  isWorkspace: PropTypes.bool.isRequired,
  activeTab: PropTypes.number,
};

export default WorkSpot;
