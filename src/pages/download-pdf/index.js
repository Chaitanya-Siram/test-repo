import React, { useEffect, useState } from 'react';

import { DownLoadPdfPageWrapper, MainWrp } from './index.sc';

import NewsLetterPdf from '../../components/news-letter-pdf';
import NewDashboardPdf from '../../components/new-dashboard-pdf';
import SearchResultPdf from '../../components/search-results-pdf';
import ShowSingleGraphPdf from '../../components/show-single-graph-pdf';

const DownLoadPdf = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  const [currentPage, setCurrentPage] = useState(page);
  console.log(page);
  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }
  }, [page]);

  return (
    <>
      <DownLoadPdfPageWrapper>
        {/* <PdfHeader bg1h={'15.5%'} bg1={bgsr} /> */}
        <MainWrp>
          {currentPage === 'news-letter' && <NewsLetterPdf />}
          {currentPage === 'newdashboard' && <NewDashboardPdf />}
          {currentPage === 'search-results' && <SearchResultPdf />}
          {currentPage === 'single-graph' && <ShowSingleGraphPdf />}
        </MainWrp>

        {/* <PdfFooter /> */}
      </DownLoadPdfPageWrapper>
    </>
  );
};

export default DownLoadPdf;
