import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  ArticlesSecHeader,
  ArticlesSection,
  ArticlesWrp,
  ChartSec,
  ChartSecHeader,
  ContentLeftSecWrp,
  ContentRightSecWrp,
  ContentWrp,
  DropdownOption,
  DropdownWrp,
  Dropdowntext,
  GraphWrp,
  GraphWrpRight,
  JournalistText,
  JournalistWrp,
  LeftSec,
  MainWrp,
  NameText,
  NameWrp,
  OccupationText,
  ProfileImage,
  ProfileTopWrp,
  ReachnNbr,
  Reachtext,
  RightSec,
  SectionWrp,
  TabsWrp,
  TagWrp,
  TopAuthorText,
  TopAuthorWrp,
  TopWrp,
  TwitterSec,
} from './index.sc';

import MediaDatabaseMiddle from '../../components/media-database-middle';
import TopAuthorStar from '../../assets/icons/TopAuthorStar';
import JournalistScoreCard from '../../components/profile-pg/journalist-score-card';
import ArticlesCard from '../../components/profile-pg/articles-card';
import ProfileTagsCard from '../../components/profile-pg/profile-tags-card';
import ProfileButtonCard from '../../components/profile-pg/profile-button-card';
import DownPolygon from '../../assets/icons/DownPolygon';
import { formatNumber } from '../../utils';
import AboutCard from '../../components/profile-pg/about-card';
import ArticleCard from '../../components/profile-pg/article-card';
import AppHeader from '../../components/app-header';
import AppBG from '../../components/app-bg';
import { useParams } from 'react-router';
import { axiosGet } from '../../service';
import { useQuery } from '@tanstack/react-query';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import Tabs from '../../components/tabs';
import { TitleBox } from '../../components/tabs/TabTitle';
import AppFooter from '../../components/app-footer';
import { DropDownWrp } from '../media-database/media-database-bottom/profile-relevance-section/index.sc';
import { LinearLine, Radar } from '../../graphs';
import { areaConfig, radarConfig } from './constants';

const months = [
  {
    type: 'three',
    label: '3 Months',
  },
  {
    type: 'six',
    label: '6 Months',
  },
  {
    type: 'twelve',
    label: '12 Months',
  },
];

const articleSort = [
  {
    type: 'reach',
    label: 'Reach',
  },
  {
    type: 'popular',
    label: 'Popular',
  },
  {
    type: 'top',
    label: 'Top',
  },
];

const TabOptions = [
  {
    id: 0,
    content: '',
    label: 'Articles',
    type: 'articles',
  },
  {
    id: 1,
    content: '',
    label: 'Twitter Feed',
    type: 'twitter_feed',
  },
];
const ProfilePage = () => {
  const param = useParams();

  const [socialLinks, setSocialLinks] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const [sort, setSort] = useState(months[0]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const [articlesSort, setArticlesSort] = useState(articleSort[0]);
  const [articleDropdownIsOpen, setArticleDropdownIsOpen] = useState(false);

  const [graphDropDown, setGraphDropDown] = useState(months[0]);
  const [graphDropDownIsOpen, setGraphDropDownIsOpen] = useState(false);

  function handleDropdownClick() {
    setDropdownIsOpen(!dropdownIsOpen);
  }

  function handleSelect(type) {
    setSort(type);
    setDropdownIsOpen(false);
  }
  function handleArticleDropdownClick() {
    setArticleDropdownIsOpen(!articleDropdownIsOpen);
  }

  function handleArticleSelect(type) {
    setArticlesSort(type);
    setArticleDropdownIsOpen(false);
  }

  function handleGraphDropDownClick() {
    setGraphDropDownIsOpen(!graphDropDownIsOpen);
  }

  function handlGraphDropDownSelect(type) {
    setGraphDropDown(type);
    setGraphDropDownIsOpen(false);
  }

  const [profile, setProfile] = useState(null);
  const [noDataFromResponse, setNoDataFromResponse] = useState(true);
  const dropDownRef = useRef(null);
  const articleRef = useRef(null);
  const graphRef = useRef(null); // Ref to store the reference of the dropdown container

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setDropdownIsOpen(false);
    }
    if (articleRef.current && !articleRef.current.contains(event.target)) {
      setArticleDropdownIsOpen(false);
    }
    if (graphRef.current && !graphRef.current.contains(event.target)) {
      setGraphDropDownIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getProfileData = () => {
    return axiosGet(`/profiles/${param.profileId}`, {}, {});
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const {
    // isLoading - initial fetch
    isLoading,
    // isFetching - every api call
    isFetching,
  } = useQuery({
    queryKey: ['profile', param.profileId],
    queryFn: () => getProfileData(),
    refetchOnWindowFocus: false,
    // onSuccess: (data) => {
    //   if (data?.data?.data.length === 0) {
    //     setNoDataFromResponse(true);
    //   } else {
    //     setProfile(...data?.data?.data);
    //   }
    // },
  });

  const generateLinks = useCallback(() => {
    const tempArr = [];
    for (let index = 0; index < 5; index++) {
      if (profile.socials[index]?.name) {
        tempArr.push(profile.socials[index]);
      } else {
        tempArr.push({});
      }
    }
    setSocialLinks(tempArr);
  }, [profile]);

  useEffect(() => {
    if (profile) {
      generateLinks();
    }
  }, [profile, generateLinks]);

  const [index, setIndex] = useState(0);

  const tabs = TabOptions?.map((ele, i) => ({
    ...ele,
    title: <TitleBox title={ele.label} />,
    id: i,
  }));

  const handleTabs = (index) => {
    setIndex(index);
  };

  if (isLoading || isFetching) {
    return <div>Loading</div>;
  }

  if (noDataFromResponse) {
    return <div>Sorry, No data found</div>;
  }
  if (profile) {
    return (
      <>
        <AppBG />
        <AppHeader />
        <SectionWrp>
          <MediaDatabaseMiddle name={profile.name} />
          <MainWrp>
            <ProfileTopWrp>
              <ProfileImage image={profile.profilePicture} />
              <TopWrp>
                <NameWrp>
                  <NameText>{profile.name}</NameText>
                  <OccupationText>{profile.occupation}</OccupationText>
                </NameWrp>
                <TagWrp>
                  <JournalistWrp>
                    <JournalistText>Journalist</JournalistText>
                  </JournalistWrp>
                  <TopAuthorWrp>
                    <TopAuthorStar />
                    <TopAuthorText>Top Author</TopAuthorText>
                  </TopAuthorWrp>
                </TagWrp>
              </TopWrp>
            </ProfileTopWrp>
            <ContentWrp>
              <ContentLeftSecWrp>
                <JournalistScoreCard
                  journalistScore={profile.journalistScore}
                />
                <ArticlesCard articles={profile.articles} />
                <ProfileTagsCard
                  tags={profile.tags}
                  socialLinks={socialLinks}
                />
                <ProfileButtonCard
                  isConnected={isConnected}
                  setIsConnected={setIsConnected}
                />
              </ContentLeftSecWrp>
              <ContentRightSecWrp>
                <AboutCard name={profile.name} about={profile.about} />
                <ArticlesWrp>
                  <TabsWrp>
                    <Tabs
                      activeColor={theme[selectedTheme].primary}
                      inactiveColor={theme[selectedTheme].tabInactive}
                      items={!tabs ? [{}] : tabs}
                      onChange={handleTabs}
                      paddingWrapper="0"
                      wraperBorderWidth="0"
                      gapitems="1rem"
                      bottomBorderWidth="3px"
                    />
                  </TabsWrp>
                  {index === 0 ? (
                    <ArticlesSection>
                      <LeftSec>
                        <ChartSec left={true}>
                          <ChartSecHeader>
                            <Reachtext>
                              Total Reach{' '}
                              <ReachnNbr>
                                {formatNumber(profile.reach)}
                              </ReachnNbr>
                            </Reachtext>
                            <DropdownWrp ref={dropDownRef}>
                              <Dropdowntext onClick={handleDropdownClick}>
                                {sort.label}
                              </Dropdowntext>
                              {dropdownIsOpen && (
                                <DropDownWrp>
                                  {months.map((item, i) => {
                                    return (
                                      <DropdownOption
                                        key={i}
                                        onClick={() => handleSelect(item)}
                                      >
                                        {item.label}
                                      </DropdownOption>
                                    );
                                  })}
                                </DropDownWrp>
                              )}
                              <DownPolygon
                                isOpen={dropdownIsOpen}
                                fill={theme[selectedTheme].tableHeaderColor}
                              />
                            </DropdownWrp>
                          </ChartSecHeader>
                          <GraphWrp>
                            {/* <SlotDetails
                              widget={profile?.graphLeft}
                              dashboardType="profile"
                            /> */}
                            <LinearLine
                              data={profile?.graphLeft?.data || {}}
                              config={areaConfig}
                            />
                          </GraphWrp>
                        </ChartSec>
                        <ArticlesSecHeader>
                          <Reachtext>
                            Total Articles{' '}
                            <ReachnNbr>{profile.articlePosts.length}</ReachnNbr>
                          </Reachtext>
                          <DropdownWrp ref={articleRef}>
                            <Dropdowntext onClick={handleArticleDropdownClick}>
                              {articlesSort.label}
                            </Dropdowntext>
                            {articleDropdownIsOpen && (
                              <DropDownWrp>
                                {articleSort.map((item, i) => {
                                  return (
                                    <DropdownOption
                                      key={i}
                                      onClick={() => handleArticleSelect(item)}
                                    >
                                      {item.label}
                                    </DropdownOption>
                                  );
                                })}
                              </DropDownWrp>
                            )}
                            <DownPolygon
                              isOpen={articleDropdownIsOpen}
                              fill={theme[selectedTheme].tableHeaderColor}
                            />
                          </DropdownWrp>
                        </ArticlesSecHeader>
                        {profile.articlePosts.map((item, i) => {
                          return (
                            <ArticleCard
                              key={i}
                              title={item.title}
                              content={item.content}
                              link={item.link}
                              date={item.date}
                              country={item.country}
                              reach={item.reach}
                            />
                          );
                        })}
                      </LeftSec>
                      <RightSec>
                        <ChartSec left={false}>
                          <ChartSecHeader>
                            <Reachtext>Articles By Topic</Reachtext>
                            <DropdownWrp ref={graphRef}>
                              <Dropdowntext onClick={handleGraphDropDownClick}>
                                {graphDropDown.label}
                              </Dropdowntext>
                              {graphDropDownIsOpen && (
                                <DropDownWrp>
                                  {months.map((item, i) => {
                                    return (
                                      <DropdownOption
                                        key={i}
                                        onClick={() =>
                                          handlGraphDropDownSelect(item)
                                        }
                                      >
                                        {item.label}
                                      </DropdownOption>
                                    );
                                  })}
                                </DropDownWrp>
                              )}
                              <DownPolygon
                                isOpen={graphDropDownIsOpen}
                                fill={theme[selectedTheme].tableHeaderColor}
                              />
                            </DropdownWrp>
                          </ChartSecHeader>
                          <GraphWrpRight>
                            <Radar
                              data={profile?.graphRight?.data || {}}
                              config={radarConfig}
                            />
                          </GraphWrpRight>
                        </ChartSec>
                      </RightSec>
                    </ArticlesSection>
                  ) : (
                    <TwitterSec>Twitter</TwitterSec>
                  )}
                </ArticlesWrp>
              </ContentRightSecWrp>
            </ContentWrp>
          </MainWrp>
        </SectionWrp>
        <AppFooter />
      </>
    );
  }
};

export default ProfilePage;
