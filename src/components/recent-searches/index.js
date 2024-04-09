import React from 'react';
import {
  TabSection,
  TabSectionWrp,
  LabelText,
  SubTextWrp,
  SubText,
  BoldText,
  TabsWrp,
  MainWrp,
  TabTitle,
  TimeText,
  ChipText,
} from './index.sc';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { dashboardChips } from '../../constants/dashboard';
// import { formatTimestamp } from '../../constants/timeChanger';

const data = [
  {
    checked: false,
    title: 'Big Four Tax',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '11 DEC 2023',
    updateOn: '11 DEC 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'brand',
    id: 825490464,
    searchId: 622248391,
    bookmarked: true,
  },
  {
    checked: false,
    title: 'Electrify America',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '03 DEC 2023',
    updateOn: '05 DEC 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'people',
    id: 305988908,
    searchId: 595521126,
    bookmarked: true,
  },
  {
    checked: false,
    title: 'J&J',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '03 NOV 2023',
    updateOn: '05 NOV 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'industry',
    id: 803609026,
    searchId: 320658091,
    bookmarked: true,
  },
  {
    checked: false,
    title: 'Huggies',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '03 NOV 2023',
    updateOn: '05 NOV 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'campaign',
    id: 552295455,
    searchId: 396937695,
  },
  {
    checked: false,
    title: 'Asus',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '06 OCT 2023',
    updateOn: '02 OCT 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'authorimpact',
    id: 384914462,
    searchId: 910492888,
  },
  {
    checked: false,
    title: 'Gucci',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '06 OCT 2023',
    updateOn: '02 OCT 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'sentiments',
    id: 262554262,
    searchId: 933061751,
  },
  {
    checked: false,
    title: 'Anti-ageing',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '06 OCT 2023',
    updateOn: '02 OCT 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'congruence',
    id: 10072193,
    searchId: 649240886,
  },
  {
    checked: false,
    title: 'Allogene',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '06 OCT 2023',
    updateOn: '02 OCT 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'primpact',
    id: 613229539,
    searchId: 569603403,
  },
  {
    checked: false,
    title: 'Chipotle',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '06 OCT 2023',
    updateOn: '02 OCT 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'custom',
    id: 645905930,
    searchId: 154777058,
  },
  {
    checked: false,
    title: 'Cybertruck',
    des: 'This is a placeholder text used for demonstration purposes. Please replace this text with your own content when you are ready.',
    createBy: 'N Harish',
    createOn: '06 JAN 2023',
    updateOn: '02 JAN 2023',
    sharedwith: [
      {
        key: 0,
        content: 'NA',
      },
      {
        key: 1,
        content: 'NA',
      },
      {
        key: 2,
        content: 'NA',
      },
      {
        key: 3,
        content: 'NA',
      },
      {
        key: 4,
        content: 'NA',
      },
    ],
    savedSearchId: 100,
    dashboardType: 'brand',
    id: 987857758,
    searchId: 839742189,
  },
];
export const routes = {
  recent_searches: 'search-results',
  recent_newsletters: 'news-letter',
  recent_dashboards: 'dashboard',
};

// const searchedOn = [
//   {
//     day: 'Today',
//     recentSearch: [],
//   },
//   {
//     day: 'Yesterday',
//     recentSearch: [],
//   },
// ];

const RecentSearches = ({ items }) => {
  // const [currentData, setCurrentData] = useState(searchedOn);
  const navigate = useNavigate();
  // const data = items?.data;
  // console.log(items, 'inside reach-search');
  // useEffect(() => {
  //   const updatedData = searchedOn.map((element) => {
  //     return {
  //       ...element,
  //       recentSearch: data.filter((item) => {
  //         const day = checkTimestamp(item.timeStamp);
  //         return (
  //           (day === 'today' && element.day === 'Today') ||
  //           (day === 'yesterday' && element.day === 'Yesterday')
  //         );
  //       }),
  //     };
  //   });

  //   setCurrentData(updatedData);
  // }, [data]);

  // function checkTimestamp(date) {
  //   const currentDate = new Date();

  //   const timestampDate = new Date(date);

  //   currentDate.setHours(0, 0, 0, 0);
  //   timestampDate.setHours(0, 0, 0, 0);

  //   const timeDiff = currentDate.getTime() - timestampDate.getTime();

  //   const oneDay = 24 * 60 * 60 * 1000;

  //   if (timeDiff < oneDay && timeDiff >= 0) {
  //     return 'today';
  //   } else if (timeDiff < 2 * oneDay && timeDiff >= oneDay) {
  //     return 'yesterday';
  //   } else {
  //     return 'Neither today nor yesterday';
  //   }
  // }
  function formatNumber(number) {
    if (typeof number !== 'number') {
      return 'NA';
    }

    let formattedValue = '';
    let suffix = '';

    switch (true) {
      case number >= 1e9:
        formattedValue = (number / 1e9).toFixed(1);
        suffix = ' B';
        break;
      case number >= 1e6:
        formattedValue = (number / 1e6).toFixed(1);
        suffix = ' M';
        break;
      case number >= 1e3:
        formattedValue = (number / 1e3).toFixed(1);
        suffix = ' K';
        break;
      default:
        formattedValue = number.toString();
    }
    return formattedValue + suffix;
  }

  const modifiedItems = { ...items, data };

  return (
    <MainWrp>
      <TabTitle>{modifiedItems.title}</TabTitle>
      <TabSectionWrp>
        <TabsWrp>
          {modifiedItems?.data.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <TabSection
                  onClick={() =>
                    navigate(
                      routes[items?.type] === 'dashboard'
                        ? `${routes[items?.type]}/${item.id}/${
                            item.dashboardType
                          }/${item.searchId}`
                        : routes[items?.type] === 'news-letter'
                        ? `${routes[items?.type]}/${item.newsLetterId}`
                        : `${routes[items?.type]}/${item.id}/overview/${
                            item.savedSearchId
                          }`
                    )
                  }
                  key={i}
                >
                  <div>
                    <LabelText>{item.title}</LabelText>
                    <TimeText>{item.createOn}</TimeText>
                  </div>
                  <SubTextWrp>
                    <SubText>{item.lastSearchOn}</SubText>
                    <SubText>
                      {modifiedItems.title === 'Recent Searches' ? (
                        <BoldText>{formatNumber(item.id)}</BoldText>
                      ) : modifiedItems.title !== 'Newsletters' ? (
                        <ChipText
                          bgcolor={dashboardChips[item.dashboardType]?.color}
                        >
                          {dashboardChips[item.dashboardType]?.label}
                        </ChipText>
                      ) : null}
                    </SubText>
                  </SubTextWrp>
                </TabSection>
              </React.Fragment>
            );
          })}
        </TabsWrp>
      </TabSectionWrp>
    </MainWrp>
  );
};

RecentSearches.propTypes = {
  items: PropTypes.object,
};

export default RecentSearches;
