import React from 'react';
import PropTypes from 'prop-types';
import {
  // BackDrop,
  // DashboardInnerSection,
  DashboardSection,
  // DropHeader,
  // FullSlot,
  // HalfSlot,
  // Iconwpr,
  // SlotWrp,
  // UberTextTitle,
  // UberTilesWrp,
  // UserTilesMainWrp,
} from '../index.sc';
// import OverviewDropdown from '../../overview-dropdown';
// import IconPop from '../../icon-popup';
// import DownloadIcon from '../../../assets/icons/DownloadIcon';
// import { AdvanceDashboard, Widgets } from '../../../constants/overview';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useDashboardData } from '../../../hooks/useSearch';
// import { useParams } from 'react-router';
// import Spinner from '../../spinner';
import DashboardInnerContainer from './DashboardInnerContainer';
// import DashboardHeader from './dashboard-header';
// import { dashboardTabs } from '../../../constants/dashboard';
// import DashboardInnerContainer from '../../';

import DashboardHeaderV2 from './dashboard-header-v2/index.js';

// const downloadList = [
//   {
//     id: 0,
//     label: 'PDF',
//   },
//   {
//     id: 1,
//     label: 'Excel',
//   },
//   {
//     id: 2,
//     label: 'CSV',
//   },
// ];

const DashboardSectionComponent = ({
  activeScreen,
  loader,
  setArticleType,
  tileDetails,
  dashboardDetails,
  overView = true,
  setClickedPosition,
  articlePosition,
}) => {
  // const [selectedTab, setSelectedTab] = useState('overview');

  // const createPdf = async () => {
  //   // eslint-disable-next-line new-cap
  //   const pdf = new jsPDF('portrait', 'pt', 'a4');
  //   const contentElement = document.querySelector('#download-content');
  //   const graphElements = contentElement.querySelectorAll('.graph-widget');

  //   const capturePromises = Array.from(graphElements).map(
  //     async (graphElement) => {
  //       contentElement.scrollTo(0, graphElement.offsetTop);
  //       const data = await html2canvas(graphElement);
  //       return data.toDataURL('image/png');
  //     }
  //   );

  //   const graphImages = await Promise.all(capturePromises);

  //   graphImages.forEach((img, index) => {
  //     const imgProperties = pdf.getImageProperties(img);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  //     const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
  //     const y = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;
  //     pdf.addImage(img, 'PNG', x, y, pdfWidth, pdfHeight);

  //     if (index < graphImages.length - 1) {
  //       pdf.addPage();
  //     }
  //   });

  //   // Save the PDF
  //   pdf.save('search_result.pdf');
  // };

  // const handleDownload = (id) => {
  //   const downloadOption = downloadList.find(
  //     (download) => download.id === id
  //   ).label;
  //   if (downloadOption.toLowerCase() === 'pdf') {
  //     createPdf();
  //   }
  // };

  // const handleTabChange = (index) => {
  //   setSelectedTab(dashboardTabs[index]?.type);
  // };

  // if (dashboardDataLoading) {
  //   return <Spinner />;
  // }
  return (
    <DashboardSection
      activeScreen={activeScreen}
      className={activeScreen === 'dashboard' ? 'active' : ''}
    >
      {overView && <DashboardHeaderV2></DashboardHeaderV2>}
      {/* <DropHeader>
        <DashboardHeader
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
          tabKeywords={tabKeywords}
        />
      </DropHeader> */}
      <DashboardInnerContainer
        dashboardDetails={dashboardDetails}
        tileDetails={tileDetails}
        loader={loader}
        setArticleType={setArticleType}
        overRideSlot={activeScreen !== 'dashboard'}
        setClickedPosition={setClickedPosition}
        articlePosition={articlePosition}
      />
    </DashboardSection>
  );
};

export default DashboardSectionComponent;

DashboardSectionComponent.propTypes = {
  activeScreen: PropTypes.string,
  loader: PropTypes.bool,
  setArticleType: PropTypes.func,
  tileDetails: PropTypes.array,
  dashboardDetails: PropTypes.array,
  overView: PropTypes.bool,
  setClickedPosition: PropTypes.func,
  articlePosition: PropTypes.string,
};
