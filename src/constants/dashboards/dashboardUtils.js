import { format } from 'date-fns';
import { getDateRange, replaceOperators } from '../utils';

export const getPayloadForSearch = (
  query,
  filters,
  searchFilterOptions,
  guidedSection
) => {
  const filter = filters;
  let searchFilters = {};
  let filterData = searchFilterOptions?.find(
    (filter) => filter.value === 'mediaTypes'
  );
  if (
    filter?.mediaTypes === undefined ||
    filter?.mediaTypes.length === filterData?.options?.length
  ) {
    searchFilters = { ...searchFilters };
  } else {
    const mediaTypes = filter?.mediaTypes?.map((x) => x.value);
    searchFilters = { ...searchFilters, media_types: mediaTypes };
  }
  filterData = searchFilterOptions?.find(
    (filter) => filter.value === 'languages'
  );
  if (
    filter?.languages === undefined ||
    filter?.languages?.length === filterData?.options?.length
  ) {
    searchFilters = { ...searchFilters };
  } else {
    const languages = filter?.languages?.map((x) => x.value);
    searchFilters = { ...searchFilters, languages };
  }

  filterData = searchFilterOptions?.find(
    (filter) => filter.value === 'locations'
  );
  if (
    filter?.locations === undefined ||
    filter?.locations?.length === filterData?.options?.length
  ) {
    searchFilters = { ...searchFilters };
  } else {
    const locations = filter?.locations?.map((x) => x.value);
    searchFilters = { ...searchFilters, countries: locations };
  }

  filterData = searchFilterOptions?.find(
    (filter) => filter.value === 'sentiment'
  );
  if (
    filter?.sentiment === undefined ||
    filter?.sentiment?.length === filterData?.options?.length
  ) {
    searchFilters = { ...searchFilters };
  } else {
    const sentiment = filter?.sentiment?.map((x) => x.value);
    searchFilters = { ...searchFilters, sentiments: sentiment };
  }

  if (filter?.dateTime === undefined) {
    searchFilters = { ...searchFilters, dateTime: '' };
  } else {
    const dateTime = filter?.dateTime?.value;
    searchFilters = {
      ...searchFilters,
      dateTime: filter?.dateTime?.end ? 'custom_range' : dateTime,
    };
  }
  filterData = searchFilterOptions?.find(
    (filter) => filter.value === 'spam_exclusions'
  );
  if (filter?.spam_exclusions === undefined) {
    searchFilters = { ...searchFilters };
  } else {
    const spamExclusions = filter?.spam_exclusions?.map((x) => x.value);
    searchFilters = { ...searchFilters, spam_exclusions: spamExclusions };
  }
  if (filter?.keywords) {
    const keywords = filter?.keywords;
    if (keywords?.placement?.query) {
      searchFilters = {
        ...searchFilters,
        keyword_placement: keywords?.placement?.query,
        keyword_placement_range:
          keywords?.placement?.range?.defaultValue?.length > 0
            ? keywords?.placement?.range?.defaultValue[1]
            : 100,
        keywords_includes: keywords.include.query?.split(' '),
        keywords_includes_case_sensitive: keywords.include?.caseSensitive,
      };
    }
    if (keywords?.include?.query) {
      searchFilters = {
        ...searchFilters,
        keywords_includes: keywords.include.query?.split(','),
        keywords_includes_case_sensitive: keywords.include?.caseSensitive,
      };
    }

    if (keywords?.exclude?.query) {
      searchFilters = {
        ...searchFilters,
        keywords_excludes: keywords.exclude.query?.split(','),
        keywords_excludes_case_sensitive: keywords.exclude?.caseSensitive,
      };
    }
  }

  if (filter?.sources) {
    const sources = filter?.sources;
    if (
      sources?.include ||
      (Array.isArray(sources?.include) && sources?.include > 0)
    ) {
      searchFilters = {
        ...searchFilters,
        source_includes: sources.include?.map((x) => x.value),
      };
    }

    if (
      sources?.exclude ||
      (Array.isArray(sources?.exclude) && sources?.exclude > 0)
    ) {
      searchFilters = {
        ...searchFilters,
        source_excludes: sources.exclude?.map((x) => x.value),
      };
    }
  }

  let startDate, endDate;
  if (searchFilters?.dateTime === 'custom_range') {
    endDate = format(filter?.dateTime?.end, 'yyyy-MM-dd');
    startDate = format(filter?.dateTime?.start, 'yyyy-MM-dd');
  } else {
    const dateRange = getDateRange(searchFilters?.dateTime);
    startDate = dateRange?.startDate;
    endDate = dateRange?.endDate;
  }

  searchFilters = {
    ...searchFilters,
    start_date: startDate,
    end_date: endDate,
    search_type: guidedSection ? 'guided' : 'simple',
    simple_query: guidedSection ? '' : replaceOperators(query)?.trim(),
    page_number: 1,
    page_size: 50,
    // user_id: authInfo?.user_id,
  };
  if (guidedSection) {
    searchFilters = {
      ...searchFilters,
      guided_all_of_these: query?.all?.split(',').map((x) => x.trim()),
      guided_none_of_these: query?.none?.split(',').map((x) => x.trim()),
      guided_any_of_these: query?.any?.split(',').map((x) => x.trim()),
    };
  }
  return searchFilters;
};

export function convertValuesToInt(inputArray, propertiesToSkip = []) {
  return inputArray.map((obj) => {
    const newObj = { ...obj };

    for (const key in newObj) {
      if (!propertiesToSkip.includes(key)) {
        newObj[key] = parseInt(newObj[key], 10);
      }
    }

    return newObj;
  });
}
