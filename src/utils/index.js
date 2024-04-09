import { format, parseISO } from 'date-fns';

const ranges = [
  { divider: 1e18, suffix: 'E', midSuffix: 'E', fullSuffix: 'Quintillion' },
  { divider: 1e15, suffix: 'P', midSuffix: 'P', fullSuffix: 'Quadrillion' },
  { divider: 1e12, suffix: 'T', midSuffix: 'T', fullSuffix: 'Trillion' },
  { divider: 1e9, suffix: 'G', midSuffix: 'B', fullSuffix: 'Billion' },
  { divider: 1e6, suffix: 'M', midSuffix: 'M', fullSuffix: 'Million' },
  { divider: 1e3, suffix: 'K', midSuffix: 'K', fullSuffix: 'Thousand' },
];

export const formatNumber = (n, fullSuffix = false, object = false) => {
  let suffix = '';
  let midSuffix = '';
  let FSuffix = '';
  let value = 0;

  if (n < 1000 || Number.isNaN(n)) {
    let value = n;
    if (!Number.isInteger(value)) {
      value = Number(n).toFixed(2);
    }
    if (object) {
      return {
        text: n.toString(),
        value,
        suffix,
        midSuffix,
        fullSuffix: FSuffix,
      };
    } else {
      return n;
    }
  }

  for (let i = 0; i < ranges.length; i++) {
    if (n < 0) {
      return '-' + formatNumber(-n);
    }
    if (n >= ranges[i].divider) {
      suffix = ranges[i].suffix;
      midSuffix = ranges[i].midSuffix;
      FSuffix = ranges[i].fullSuffix;
      value = (n / ranges[i].divider).toFixed(1);
      if (object) {
        return {
          text: n.toString(),
          value,
          suffix,
          midSuffix,
          fullSuffix: FSuffix,
        };
      } else {
        return value + (fullSuffix ? FSuffix : suffix);
      }
    }
  }
  return n.toString();
};

export const convertObjToString = (obj) => {
  if (typeof obj === 'string') {
    return obj;
  } else {
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  }
};

export const convertObjToExpression = (obj) => {
  if (typeof obj === 'string') {
    return obj;
  } else {
    const allArr = obj.all !== '' ? obj.all.split(',') : [];
    const noneArr = obj?.none !== '' ? obj.none.split(',') : [];
    const anyArr = obj?.any !== '' ? obj.any.split(',') : [];
    const andExpression =
      allArr.length > 0 ? `(${allArr?.map((item) => item).join(' AND ')})` : '';
    const orExpression = `${anyArr.map((item) => `${item}`).join(' OR ')}`;
    let result = '';
    if (allArr?.length && !noneArr.length && !anyArr?.length) {
      // case1: Only all of these
      result = `${andExpression}`;
    } else if (allArr?.length && noneArr?.length && !anyArr.length) {
      // case2: All of these and none of these
      result = `(${andExpression} AND (${noneArr
        .map((item) => `${item}`)
        .join(' OR ')}))`;
    } else if (allArr?.length && !noneArr?.length && anyArr?.length) {
      // case3: All of these and any one of these
      result = `(${andExpression} NOT (${orExpression}))`;
    } else if (!allArr?.length && noneArr?.length && anyArr.length) {
      // case4: None of these and any one of these
      result = `((${noneArr
        .map((item) => `${item}`)
        .join(' OR ')})) NOT (${orExpression}))`;
    } else if (!allArr?.length && !noneArr?.length && anyArr.length) {
      // case5 Only any one of these
      result = `(${orExpression})`;
    } else if (allArr?.length && noneArr?.length && anyArr?.length) {
      // case6: All of these , none of these and any one of these
      result = `(${andExpression} AND (${noneArr
        .map((item) => `${item}`)
        .join(' OR ')})) NOT (${orExpression}))`;
    }
    return result;
  }
};

export const getSearchParams = (searchParams) => {
  const dateTime = searchParams?.filters?.filter?.dateTime;
  let dateFilters = {};
  if (dateTime?.value === 'custom_range') {
    dateFilters = {
      ...dateTime,
      start: parseISO(dateTime?.start),
      end: parseISO(dateTime?.end),
      value: dateTime?.value,
    };
    searchParams.filters.filter.dateTime = dateFilters;
  } else {
    searchParams.filters.filter.dateTime = {
      value: searchParams.filters?.filter?.dateTime?.value,
      label: searchParams.filters?.filter?.dateTime?.label,
    };
  }
  return searchParams;
};

export const getDateParams = (dateTime) => {
  let dateFilters = {};
  if (dateTime?.value === 'custom_range') {
    dateFilters = {
      ...dateTime,
      start: parseISO(dateTime?.start),
      end: parseISO(dateTime?.end),
      value: dateTime?.value,
    };
    return dateFilters;
  } else {
    return {
      label: dateTime?.label,
      value: dateTime?.value,
    };
  }
};

export const timeAgo = (input) => {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (const key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
};

export const formatDate = (date, formatString = 'MM/dd/yyyy') => {
  try {
    const formattedDate = format(new Date(date), formatString);
    return formattedDate;
  } catch (error) {
    return 'Invalid date';
  }
};

export const trimmedData = (data, maxData) => {
  if (!maxData) {
    return data;
  }
  const tempData = JSON.parse(JSON.stringify(data));
  const tempDataArr = JSON.parse(JSON.stringify(data?.data || []));
  tempData.data = tempDataArr.splice(0, maxData);
  return tempData;
};
