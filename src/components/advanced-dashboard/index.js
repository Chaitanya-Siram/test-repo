import React from 'react';
import PropTypes from 'prop-types';
import { DashboardSection } from './index.sc';
import DashboardHeaderV2 from '../search-result/dashboard-section/dashboard-header-v2';
import { useParams } from 'react-router-dom';
import CampaignMonitor from './campaign-monitor';
import AuthorImpact from './author-impact';
import Sentiments from './sentiments';
import PRImpact from './pr-impact';
import Congruence from './congruence';
import CampaignPlaceholder from '../../assets/icons/create-dashboard/campaign_monitor.svg';
import AuthorPlaceholder from '../../assets/icons/create-dashboard/author_impact.svg';
import SentimentPlaceholder from '../../assets/icons/create-dashboard/sentiment_by_themes.svg';
import PrPlaceholder from '../../assets/icons/create-dashboard/pr_impact_scale.svg';
import CongruencePlaceholder from '../../assets/icons/create-dashboard/message_congruence.svg';
import SlotPlaceHolder from '../search-result/slot-details/SlotPlaceHolder';
import { FullSlot } from './campaign-monitor/index.sc';

const AdvancedDashboard = ({
  activeScreen,
  loader,
  setArticleType,
  articleType,
  advancedWidgetDetails,
  overView = true,
  setClickedPosition,
  articlePosition,
  overviewDashboard,
}) => {
  const { dashboardType } = useParams();

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
    const Component =
      advancedDashboardConfig[dashboardType || overviewDashboard];
    const componentData =
      advancedWidgetDetails[dashboardType || overviewDashboard];
    if (Component && componentData?.show) {
      return (
        <Component
          widget={componentData?.data}
          loader={componentData?.isLoading}
          customClassName={componentData?.customClassName}
        />
      );
    } else {
      return (
        <FullSlot className="graph-widget">
          <SlotPlaceHolder
            body={placeholderConfig[dashboardType || overviewDashboard]}
            title={placeholderTitleConfig[dashboardType] || overviewDashboard}
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
      // style={{ width: !dashboardType && '100%' }}
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
  overviewDashboard: PropTypes.string,
};
