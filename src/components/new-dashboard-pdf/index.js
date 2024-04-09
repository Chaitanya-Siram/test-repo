import React, { useState } from 'react';
import {
  DashboardTypeDiv,
  DashboardTypeDivText,
  SearchSection,
  SearchText,
  SearchTextWrp,
  SearchWrp,
  SectionBody,
  SectionHeader,
  MainPageWrap,
} from './index.sc';

import DashboardPopup from '../../components/dasboard-popup';
import SearchPopup from '../../components/search-popup/SearchPopContent';
import { Frames } from '../../components/search-popup/contents';
import Brand from '../../components/search-result/dashboard-section/dashboard-header/brand';
import Industry from '../../components/search-result/dashboard-section/dashboard-header/industry';
import People from '../../components/search-result/dashboard-section/dashboard-header/people';
import { useDashboardData, useSearchData } from '../../hooks/useSearch';
import Advanced from '../../components/search-result/dashboard-section/dashboard-header/advanced';

import Custom from '../../components/search-result/dashboard-section/dashboard-header/custom';

import { axiosPostRequest } from '../../service';

import DashboardSectionPdf from './dashboard-section';

const CreateDashboard = () => {
  const [showSaved, setShowSaved] = useState(false);
  // const [filter, setFilter] = useState();
  const { searchId, dashboardType, dashboardId } = Object.fromEntries(
    new URLSearchParams(window.location.search)
  );

  const {
    // isLoading: searchDataLoading,
    // error: searchError,
    data: searchData,
    // isFetching,
  } = useSearchData(searchId);

  const dashboardKeyConfig = {
    // overview: <></>,
    brand: Brand,
    industry: Industry,
    people: People,
    campaign: Advanced,
    authorimpact: Advanced,
    sentiments: Advanced,
    congruence: Advanced,
    primpact: Advanced,
    custom: Custom,
  };
  const analyzeKeywords = (keywordsObj) => {
    return axiosPostRequest(
      '/analyze-keywords',
      { searchId, dashboardType },
      { keywordsObj, searchData: searchData.data }
    );
  };
  const [analyzedData, setAnalyzedData] = useState({});

  const handleAnalyze = async (keywordsObj) => {
    try {
      const { data } = await analyzeKeywords(keywordsObj);
      setAnalyzedData(data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const {
    isLoading: dashboardDataLoading,
    // error: searchError,
    data: dashboardData,
    // isFetching,
  } = useDashboardData(searchId, dashboardType, false, dashboardId);

  const getSelectedTabContent = () => {
    const Component = dashboardKeyConfig[dashboardType];

    if (Component) {
      return (
        <Component
          handler={handleAnalyze}
          tabKeywords={
            dashboardId || Object.keys(analyzedData)?.length
              ? dashboardData?.data?.data?.keywords
              : {}
          }
          hideAnalyze={true}
        />
      );
    }
    return <></>;
  };

  return (
    <MainPageWrap>
      <SearchSection>
        <SearchWrp>
          <SectionHeader>
            <SearchTextWrp>
              {/* <DashboardType>{dashboardType} Dashboard</DashboardType> */}
              <SearchText>
                {dashboardId ? dashboardData?.data?.data.title : 'Untitled'}
              </SearchText>
            </SearchTextWrp>
            <DashboardTypeDiv>
              <DashboardTypeDivText>{dashboardType}</DashboardTypeDivText>
            </DashboardTypeDiv>
          </SectionHeader>
          <SectionBody>{getSelectedTabContent()}</SectionBody>
        </SearchWrp>
        <DashboardPopup
          toggler={setShowSaved}
          open={showSaved}
          popContent={<SearchPopup Frames={Frames} />}
          padding="0px"
          Cross={true}
          borderRadius="0.75rem"
        />
      </SearchSection>
      <DashboardSectionPdf
        dashboardDataLoading={dashboardDataLoading}
        dashboardData={
          dashboardId
            ? dashboardData?.data?.data
            : Object.keys(analyzedData).length
            ? analyzedData
            : undefined
        }
      />
    </MainPageWrap>
  );
};

export default CreateDashboard;
