import React from 'react';
import PropTypes from 'prop-types';

import CampaignMonitor from '../../advanced-dashboard/campaign-monitor';
import AuthorImpact from '../../advanced-dashboard/author-impact';
import Sentiments from '../../advanced-dashboard/sentiments';
import PRImpact from '../../advanced-dashboard/pr-impact';
import Congruence from '../../advanced-dashboard/congruence';
import SlotPlaceHolder from '../../search-result/slot-details/SlotPlaceHolder';
import { DashboardSection } from '../../advanced-dashboard/index.sc';
import DashboardHeaderV2 from '../../search-result/dashboard-section/dashboard-header-v2';
import CampaignPlaceholder from '../../../assets/icons/create-dashboard/campaign_monitor.svg';
import AuthorPlaceholder from '../../../assets/icons/create-dashboard/author_impact.svg';
import SentimentPlaceholder from '../../../assets/icons/create-dashboard/sentiment_by_themes.svg';
import PrPlaceholder from '../../../assets/icons/create-dashboard/pr_impact_scale.svg';
import CongruencePlaceholder from '../../../assets/icons/create-dashboard/message_congruence.svg';
import { FullSlot } from '../../advanced-dashboard/campaign-monitor/index.sc';
const AdvancedDashboard = ({
  activeScreen,
  loader,
  setArticleType,
  articleType,
  advancedWidgetDetails,
  overView = true,
  setClickedPosition,
  articlePosition,
}) => {
  const urlParams = new URLSearchParams(window.location.search);
  const dashboardType = urlParams.get('dashboardType');

  const advancedDashboardConfig = {
    campaign: CampaignMonitor,
    authorimpact: AuthorImpact,
    sentiments: Sentiments,
    primpact: PRImpact,
    congruence: Congruence,
  };

  const placeholderConfig = {
    campaign: CampaignPlaceholder,
    authorimpact: AuthorPlaceholder,
    sentiments: SentimentPlaceholder,
    primpact: PrPlaceholder,
    congruence: CongruencePlaceholder,
  };

  const placeholderTitleConfig = {
    campaign: 'Campaign Monitor',
    authorimpact: 'Author Impact',
    sentiments: 'Sentiment By Themes',
    primpact: 'PR Impact Scale',
    congruence: 'Message Congruence',
  };

  const getAdvancedDashboard = () => {
    const Component = advancedDashboardConfig[dashboardType];
    const componentData = advancedWidgetDetails[dashboardType];
    if (Component && componentData) {
      return <Component widget={componentData} loader={loader} />;
    } else {
      return (
        <FullSlot className="graph-widget">
          <SlotPlaceHolder
            body={placeholderConfig[dashboardType]}
            title={placeholderTitleConfig[dashboardType]}
          />
        </FullSlot>
      );
    }
  };

  return (
    <DashboardSection
      activeScreen={activeScreen}
      className={activeScreen === 'dashboard' ? 'active' : ''}
      articlePosition={articlePosition}
    >
      {overView && <DashboardHeaderV2></DashboardHeaderV2>}
      <div>{getAdvancedDashboard()}</div>
      {/* <DashboardInnerContainer
        dashboardDetails={dashboardState}
        tileDetails={tileDetails}
        customWidgetDetails={customWidgetDetails}
        loader={loader}
        articleType={articleType}
        setArticleType={setArticleType}
        overRideSlot={activeScreen !== 'dashboard'}
        setClickedPosition={setClickedPosition}
        articlePosition={articlePosition}
        handleUpdatedChart={handleUpdatedChart}
      /> */}
    </DashboardSection>
  );
};

export default AdvancedDashboard;

AdvancedDashboard.propTypes = {
  activeScreen: PropTypes.string,
  loader: PropTypes.bool,
  setArticleType: PropTypes.func,
  articleType: PropTypes.object,
  advancedWidgetDetails: PropTypes.object,
  overView: PropTypes.bool,
  setClickedPosition: PropTypes.func,
  articlePosition: PropTypes.string,
};
