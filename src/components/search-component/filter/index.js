import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularLoadingWrapper, FiltersContainer } from './index.sc';
import MultiselectDropdown from '../../dropdown';
import {
  useSearchFilterData,
  useSourceFilterData,
} from '../../../hooks/useSearch';
import FilterSources from '../../advanced-filters/filter-sources';
// import FilterSpamExclusion from '../../advanced-filters/filter-spam-exclusion';
import FilterKeywords from '../../advanced-filters/filter-keywords';
import FilterDateTime from '../../advanced-filters/filter-datetime';
import MediaType from '../../../assets/icons/filter/MediaType';
import Language from '../../../assets/icons/filter/Language';
import Location from '../../../assets/icons/filter/Location';
import Source from '../../../assets/icons/filter/Source';
import SpamExclusion from '../../../assets/icons/filter/SpamExclusion';
import Keyword from '../../../assets/icons/filter/Keyword';
import Sentiment from '../../../assets/icons/filter/Sentiment';
import Datetime from '../../../assets/icons/filter/Datetime';
import CircularLoading from '../../../assets/icons/loading/circularLoading';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import { getTokenData } from '../../../constants/validateToken';

const filterConfig = {
  simpleSelect: {
    dateTime: FilterDateTime,
  },
  multiSelect: [
    'mediaTypes',
    'languages',
    'locations',
    'spam_exclusions',
    'sentiment',
  ],
  advanced: {
    sources: FilterSources,
    // spam_exclusions: FilterSpamExclusion,
    keywords: FilterKeywords,
  },
};

const iconConfig = {
  mediaTypes: <MediaType />,
  languages: <Language />,
  locations: <Location />,
  sentiment: <Sentiment />,
  sources: <Source />,
  spam_exclusions: <SpamExclusion />,
  keywords: <Keyword />,
  dateTime: <Datetime />,
};

const getFilterComponent = (value, dropdownConfig) => {
  // console.log(dropdownConfig, 'dropDown');
  const isMultiSelect = filterConfig.multiSelect.includes(value);
  const isSimpleSelect = Object.hasOwn(filterConfig.simpleSelect, value);
  const isAdvanced = Object.hasOwn(filterConfig.advanced, value);

  const {
    title,
    name,
    newWidth,
    borderWidth,
    options,
    onSelect,
    selected,
    applyDisabled,
    icon,
    count,
  } = dropdownConfig;
  if (isMultiSelect) {
    return <MultiselectDropdown {...dropdownConfig} />;
  } else if (isSimpleSelect) {
    const config = {
      title,
      name,
      newWidth,
      borderWidth,
      options,
      selected,
      handleSelectFilter: onSelect,
      // ...(value === 'dateTime' && { newWidth: '12' }),
      icon,
      applyDisabled,
    };
    const Component = filterConfig.simpleSelect[value];
    return <Component {...config} />;
  } else if (isAdvanced) {
    const config = {
      title,
      name,
      newWidth,
      borderWidth,
      options,
      handleSelectFilter: onSelect,
      selected,
      applyDisabled,
      ...(value === 'sources' && { newWidth: '10' }),
      icon,
      count,
    };
    const Component = filterConfig.advanced[value];
    return <Component {...config} />;
  } else {
    return <></>;
  }
};

const FilterComponent = ({
  searchFilter,
  handleFilterChange,
  editMode = false,
  searchResult = false,
  createDashboard = '',
  createSearch = false,
}) => {
  const [filter, setFilter] = useState({});

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const [searchFilterOptions, setSearchFilterOptions] = useState([]);

  useEffect(() => {
    if (searchFilter) {
      setFilter(searchFilter);
    }
  }, [searchFilter, editMode]);

  const handleSelect = (name, selectedOptions) => {
    setFilter({
      ...filter,
      [name]: selectedOptions,
    });
    if (handleFilterChange) {
      handleFilterChange(
        {
          ...filter,
          [name]: selectedOptions,
        },
        name
      );
    }
  };

  const authInfo = getTokenData();

  const {
    // isLoading,
    // error,
    data,
    isFetching,
  } = useSearchFilterData(authInfo?.user_id);
  const { data: sourceData, isFetching: isFetchingSources } =
    useSourceFilterData('');

  useEffect(() => {
    if (data && sourceData) {
      const newArray = [...data?.data];
      const indexOfSpamExclusions = data?.data.findIndex(
        (obj) => obj.value === 'spam_exclusions'
      );
      if (indexOfSpamExclusions !== -1) {
        const newObj = {
          label: 'Keywords',
          value: 'keywords',
          options: [
            {
              label: '',
              value: '',
            },
          ],
        };
        // Insert the new object after the object with value "spam_exclusions"
        newArray.splice(indexOfSpamExclusions + 1, 0, newObj);
      }

      const indexOfLocations = data?.data?.findIndex(
        (x) => x.value === 'locations'
      );
      if (indexOfLocations !== -1) {
        const newObj = {
          label: 'Sources',
          value: 'sources',
          options: sourceData?.data?.data,
        };
        newArray.splice(indexOfLocations + 1, 0, newObj);
      }

      setSearchFilterOptions(
        [...newArray].map((x) => {
          if (x.value === 'sentiment') {
            return {
              ...x,
              options: x.options?.map((y) => {
                if (y.value === 'NEU') {
                  // The below advanceDashboard variable is used to disable the neutral checkbox if it has the below mentioned dashboard types.
                  const advanceDashboard = [
                    'authorimpact',
                    'campaign',
                    'sentiments',
                    'congruence',
                    'primpact',
                  ].includes(createDashboard);
                  return {
                    ...y,
                    disable: advanceDashboard,
                  };
                }
                return {
                  ...y,
                  disable: false,
                };
              }),
            };
          }
          return {
            ...x,
          };
        })
      );
    }
  }, [data, sourceData, createDashboard]);

  const filterOptions = createDashboard
    ? ['sources', 'spam_exclusions', 'keywords']
    : [];
  const finalFilterOptions = searchFilterOptions?.filter(
    (option) => !filterOptions.includes(option?.value)
  );

  return (
    <FiltersContainer>
      {!isFetching && !isFetchingSources ? (
        finalFilterOptions?.map((option, i) => {
          const selectedValue = filter?.[option?.value]
            ? filter?.[option?.value]
            : option?.value === 'spam_exclusions'
            ? []
            : null;
          const dropdownConfig = {
            title: option?.label,
            name: option?.value,
            options: option?.options,
            selected: selectedValue,
            onSelect: handleSelect,
            count: true,
            // newWidth: searchResult ? '9.9' : '10.5',
            borderWidth: '0',
            key: i,
            isEditMode: editMode,
            applyDisabled: createSearch,
            icon: iconConfig[option?.value],
            newSearch: createSearch,
          };
          return (
            <React.Fragment key={i}>
              {getFilterComponent(option?.value, dropdownConfig)}
            </React.Fragment>
          );
        })
      ) : (
        <CircularLoadingWrapper>
          <CircularLoading
            bgColor={theme[selectedTheme].primary}
            size="0.25rem"
            width="1.875rem"
            height="1.875rem"
          />
        </CircularLoadingWrapper>
      )}
    </FiltersContainer>
  );
};

export default FilterComponent;

FilterComponent.propTypes = {
  searchFilter: PropTypes.object,
  handleFilterChange: PropTypes.func,
  editMode: PropTypes.bool,
  searchResult: PropTypes.bool,
  createDashboard: PropTypes.string,
  createSearch: PropTypes.bool,
};
