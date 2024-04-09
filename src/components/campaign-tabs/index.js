import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CustomTab, TabsContainer } from './index.sc';
import { useNavigate, useParams } from 'react-router-dom';

const TabComponent = ({
  tabList = [
    { id: 1, label: 'Campaign Monitor', path: 'campaign' },
    { id: 2, label: 'Author Impact', path: 'authorimpact' },
    { id: 3, label: 'Sentiments By Themes', path: 'sentiments' },
    { id: 4, label: 'Message Congruence', path: 'congruence' },
    { id: 5, label: 'PR Impact', path: 'primpact' },
  ],
}) => {
  const { searchId, dashboardType } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(dashboardType);

  useEffect(() => {
    setSelectedTab(dashboardType);
  }, [dashboardType]);

  return (
    <TabsContainer>
      {tabList.map((tab) => (
        <CustomTab
          key={tab.id}
          style={{
            ...(selectedTab === tab.path && {
              background: 'var(--primary-8676-ff, #675EF2)',
              border: '1px solid var(--border-2, #3763D3)',
              color: '#ffffff',
            }),
          }}
          onClick={() => {
            navigate(`/dashboard/${searchId}/${tab.path}`);
          }}
        >
          {tab.label}
        </CustomTab>
      ))}
    </TabsContainer>
  );
};

TabComponent.propTypes = {
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export default TabComponent;
