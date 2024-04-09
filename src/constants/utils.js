import {
  format,
  addDays,
  addMonths,
  addYears,
  // startOfMonth,
  // endOfMonth,
  getDaysInMonth,
  parse,
  isWithinInterval,
} from 'date-fns';
import isAfter from 'date-fns/isAfter';

import { mediaTabData } from '../hooks/data/chartData';

function convertToHHMM(timeString) {
  const timeComponents = timeString.split(':');
  const hours = parseInt(timeComponents[0], 10);
  const minutes = parseInt(timeComponents[1], 10);
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
  return formattedTime;
}

export function isCombinedDateTimeGreaterThanCurrent(dateString, timeString) {
  const parseTimeString = convertToHHMM(timeString ?? '');
  const combinedDateTime = parse(
    `${dateString} ${parseTimeString}`,
    'MM/dd/yyyy HH:mm',
    new Date()
  );

  // Ensure combinedDateTime is in UTC
  const combinedDateTimeInUTC = new Date(
    combinedDateTime.getTime() - combinedDateTime.getTimezoneOffset() * 60000
  );

  const currentTimeInUTC = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  );

  return isAfter(combinedDateTimeInUTC, currentTimeInUTC);
}

export function convertDate(dateString) {
  const [year, month, day] = dateString.split('-');

  const paddedMonth = month.padStart(2, '0');
  const paddedDay = day.padStart(2, '0');
  const paddedYear = year.padStart(4, '0');

  return `${paddedMonth}/${paddedDay}/${paddedYear}`;
}

export const getDateRange = (selectedValue) => {
  const inputDate = new Date();

  switch (selectedValue) {
    case 'today':
      return {
        startDate: format(inputDate, 'yyyy-MM-dd'),
        endDate: format(inputDate, 'yyyy-MM-dd'),
      };

    case 'yesterday': {
      const yesterday = addDays(inputDate, -1);
      return {
        startDate: format(yesterday, 'yyyy-MM-dd'),
        endDate: format(yesterday, 'yyyy-MM-dd'),
      };
    }

    case 'last_1_week': {
      const lastWeek = addDays(inputDate, -7);
      return {
        startDate: format(lastWeek, 'yyyy-MM-dd'),
        endDate: format(inputDate, 'yyyy-MM-dd'),
      };
    }

    case 'last_1_month': {
      const lastMonth = addMonths(inputDate, -1);
      return {
        startDate: format(lastMonth, 'yyyy-MM-dd'),
        endDate: format(inputDate, 'yyyy-MM-dd'),
      };
    }

    case 'last_3_months': {
      const last3Months = addMonths(inputDate, -3);
      return {
        startDate: format(last3Months, 'yyyy-MM-dd'),
        endDate: format(inputDate, 'yyyy-MM-dd'),
      };
    }

    case 'last_6_months': {
      const last6Months = addMonths(inputDate, -6);
      return {
        startDate: format(last6Months, 'yyyy-MM-dd'),
        endDate: format(inputDate, 'yyyy-MM-dd'),
      };
    }

    case 'last_1_year': {
      const lastYear = addYears(inputDate, -1);
      return {
        startDate: format(lastYear, 'yyyy-MM-dd'),
        endDate: format(inputDate, 'yyyy-MM-dd'),
      };
    }

    default: {
      const lastWeek = addDays(inputDate, -7);
      return {
        startDate: format(lastWeek, 'yyyy-MM-dd'),
        endDate: format(inputDate, 'yyyy-MM-dd'),
      };
    }
  }
};

export const getDateMonthFirstLastDate = (dateString) => {
  const firstDayOfMonth = dateString + '-01';

  // Get the last day of the month
  const lastDayOfMonth =
    dateString + `-${getDaysInMonth(new Date(dateString + '-01'))}`;
  return { firstDayOfMonth, lastDayOfMonth };
};

const convertTimeHours = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

const getStartAndEndDate = (selectedDate, searchFilters) => {
  const dateFormat = identifyDateFormat(selectedDate);
  if (dateFormat === 'Hour') {
    const date = selectedDate?.slice(0, 11);
    const hours = selectedDate?.slice(11);
    const convertHours = convertTimeHours(hours);
    const updatedSelectedText = `${date?.trim()}T${convertHours}`;
    const updatedEndDate = updatedSelectedText.slice(0, -2) + '59';
    return {
      start_date: updatedSelectedText,
      end_date: updatedEndDate,
    };
  } else if (dateFormat === 'Month') {
    const monthRange = getDateMonthFirstLastDate(selectedDate);
    const filterData = {
      startDate: searchFilters?.start_date,
      endDate: searchFilters?.end_date,
    };
    const { firstDayOfMonth, lastDayOfMonth } = filterDates(
      filterData,
      monthRange
    );
    return {
      start_date: firstDayOfMonth,
      end_date: lastDayOfMonth,
    };
  } else if (dateFormat === 'Day') {
    return {
      start_date: selectedDate,
      end_date: selectedDate,
    };
  }
};

export function searchQueryForGraph(
  widget,
  selectedText,
  rawData,
  otherInfo,
  searchFilters
) {
  const defaultFilter = {
    save_recent_search: false,
  };

  switch (widget) {
    case 'Geographical Breakdown':
      return {
        ...defaultFilter,
        // state: rawData,
        countries: [otherInfo?.d?.properties?.iso_a2.toLowerCase()],
      };
    case 'Media Type':
      return {
        ...defaultFilter,
        media_types: [selectedText.toLowerCase()],
      };
    case 'Sentiment':
      return {
        ...defaultFilter,
        sentiments: [
          selectedText === 'Positive'
            ? 'POS'
            : selectedText === 'Negative'
            ? 'NEG'
            : 'NEU',
        ],
      };
    case 'Top Source':
      return {
        ...defaultFilter,
        source_includes: [selectedText],
      };
    case 'Result Over Time': {
      const dateFormat = identifyDateFormat(otherInfo?.d?.data?.date);
      if (dateFormat === 'Hour') {
        const date = otherInfo?.d?.data?.date?.slice(0, 11);
        const hours = otherInfo?.d?.data?.date?.slice(11);
        const convertHours = convertTimeHours(hours);
        const updatedSelectedText = `${date?.trim()}T${convertHours}`;
        const updatedEndDate = updatedSelectedText.slice(0, -2) + '59';
        return {
          ...defaultFilter,
          start_date: updatedSelectedText,
          end_date: updatedEndDate,
        };
      } else if (dateFormat === 'Month') {
        const monthRange = getDateMonthFirstLastDate(otherInfo?.d?.data?.date);
        const filterData = {
          startDate: searchFilters?.start_date,
          endDate: searchFilters?.end_date,
        };
        const { firstDayOfMonth, lastDayOfMonth } = filterDates(
          filterData,
          monthRange
        );
        return {
          ...defaultFilter,
          start_date: firstDayOfMonth,
          end_date: lastDayOfMonth,
        };
      } else if (dateFormat === 'Day') {
        return {
          ...defaultFilter,
          start_date: otherInfo?.d?.data?.date,
          end_date: otherInfo?.d?.data?.date,
        };
      }
      break;
    }
    case 'Word Cloud':
      return {
        ...defaultFilter,
        wordcloud: selectedText,
      };
    case 'Top Themes':
      return {
        ...defaultFilter,
        theme: selectedText,
      };
    case 'Top Author':
      return {
        ...defaultFilter,
        author: selectedText,
        author_id: rawData?.author_id,
      };
    case 'Outlet Breakdown':
      return {
        ...defaultFilter,
        sub_media: selectedText,
      };
    case 'Syndication': {
      return {
        ...defaultFilter,
        syndication_article_title: rawData?.title,
        syndication_article_id: rawData?.articleId,
      };
    }
    default:
      return {
        save_recent_search: true,
      };
  }
}

export function filterDates(filterData, monthRange) {
  const { startDate, endDate } = filterData;
  const { firstDayOfMonth, lastDayOfMonth } = monthRange;

  const startOfRange = parse(startDate, 'yyyy-MM-dd', new Date());
  const endOfRange = parse(endDate, 'yyyy-MM-dd', new Date());
  const startOfMonthDate = parse(firstDayOfMonth, 'yyyy-MM-dd', new Date());
  const endOfMonthDate = parse(lastDayOfMonth, 'yyyy-MM-dd', new Date());

  // Check if the entire month range is within the filter range
  if (
    isWithinInterval(startOfMonthDate, {
      start: startOfRange,
      end: endOfRange,
    }) &&
    isWithinInterval(endOfMonthDate, { start: startOfRange, end: endOfRange })
  ) {
    return monthRange; // Entire month range is within filter range
  }

  // Check if start of the month is within the filter range
  const minDate = isWithinInterval(startOfMonthDate, {
    start: startOfRange,
    end: endOfRange,
  })
    ? startOfMonthDate
    : startOfRange;

  // Check if end of the month is within the filter range
  const maxDate = isWithinInterval(endOfMonthDate, {
    start: startOfRange,
    end: endOfRange,
  })
    ? endOfMonthDate
    : endOfRange;

  return {
    firstDayOfMonth: format(minDate, 'yyyy-MM-dd'),
    lastDayOfMonth: format(maxDate, 'yyyy-MM-dd'),
  };
}

export function identifyDateFormat(dateString) {
  if (dateString.includes('AM') || dateString.includes('PM')) {
    return 'Hour';
  }

  if (/\d{4}-\d{2}-\d{2}/.test(dateString)) {
    return 'Day';
  }

  if (/\d{4}-\d{2}/.test(dateString)) {
    return 'Month';
  }
  throw Error('Unkown format');
}

export function removeQuotesFromObjectKeys(obj) {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/^"(.*)"$/, '$1');
    newObj[newKey] = obj[key];
  });

  return newObj;
}

export function getDashboardSearchQuery(
  widget,
  selectedText,
  rawData,
  otherInfo,
  searchFilters
) {
  const defaultFilter = {
    save_recent_search: false,
  };
  switch (otherInfo?.uniqueId) {
    case 'sentiment_analysis':
      return {
        ...defaultFilter,
        sentiments: [
          selectedText === 'Positive'
            ? 'POS'
            : selectedText === 'Negative'
            ? 'NEG'
            : 'NEU',
        ],
      };
    case 'reach_over_time':
    case 'coverage_over_time':
    case 'sentiment_over_time':
    case 'people_coverage_over_time':
    case 'industry_coverage_over_time': {
      const filters = getStartAndEndDate(rawData?.date, searchFilters);
      return {
        ...defaultFilter,
        ...filters,
      };
    }
    case 'competitive_coverage_over_time':
    case 'competitive_reach_over_time': {
      const filters = getStartAndEndDate(rawData?.date, searchFilters);
      return {
        ...defaultFilter,
        ...filters,
        brand_keywords: [],
        competition_keywords: [
          ...searchFilters?.competition_keywords,
          ...searchFilters?.brand_keywords,
        ],
      };
    }
    case 'media_type': {
      const filters = getStartAndEndDate(rawData?.date, searchFilters);
      return {
        ...defaultFilter,
        ...filters,
        media_types: [otherInfo?.d?.labelText?.toLowerCase()],
      };
    }
    case 'article_sentiment': {
      return {
        ...defaultFilter,
        competition_keywords: [rawData?.label],
        brand_keywords: [rawData?.label],
        sentiments: [
          otherInfo?.d?.labelText === 'Positive'
            ? 'POS'
            : otherInfo?.d?.labelText === 'Negative'
            ? 'NEG'
            : 'NEU',
        ],
      };
    }
    case 'sov': {
      return {
        ...defaultFilter,
        competition_keywords: [rawData?.label],
        brand_keywords: [rawData?.label],
      };
    }
    case 'breakdown_by_media_type': {
      return {
        ...defaultFilter,
        competition_keywords: [otherInfo?.d?.labelText],
        brand_keywords: [otherInfo?.d?.labelText],
        media_types: [rawData?.label?.toLowerCase()],
      };
    }
    case 'coverage_by_journalist': {
      // console.log({ rawData });
      return {
        ...defaultFilter,
        competition_keywords: [otherInfo?.d?.labelText],
        brand_keywords: [otherInfo?.d?.labelText],
        author: rawData?.label,
        author_id: rawData?.author_id,
      };
    }

    case 'coverage_by_source': {
      return {
        ...defaultFilter,
        competition_keywords: [otherInfo?.d?.parentData?.label],
        brand_keywords: [otherInfo?.d?.parentData?.label],
        source_includes: [otherInfo?.d?.parentData?.parentData?.label],
      };
    }

    case 'people_top_source_by_sentiment': {
      return {
        ...defaultFilter,
        source_includes: [selectedText],
        sentiments: [
          otherInfo?.d?.labelText === 'Positive'
            ? 'POS'
            : otherInfo?.d?.labelText === 'Negative'
            ? 'NEG'
            : 'NEU',
        ],
      };
    }

    case 'people_top_journalist_by_sentiment': {
      return {
        ...defaultFilter,
        sentiments: [
          otherInfo?.d?.labelText === 'Positive'
            ? 'POS'
            : otherInfo?.d?.labelText === 'Negative'
            ? 'NEG'
            : 'NEU',
        ],
        author: rawData?.label,
        author_id: rawData?.author_id,
      };
    }

    case 'people_popular_topics': {
      return {
        ...defaultFilter,
        theme: rawData?.label,
      };
    }

    case 'people_media_type': {
      const filters = getStartAndEndDate(rawData?.date, searchFilters);
      return {
        ...defaultFilter,
        media_types: [otherInfo?.d?.labelText?.toLowerCase()],
        ...filters,
      };
    }
    case 'industry_sentiment_analysis':
      return {
        ...defaultFilter,
        sentiments: [
          selectedText === 'Positive'
            ? 'POS'
            : selectedText === 'Negative'
            ? 'NEG'
            : 'NEU',
        ],
      };
    case 'industry_coverage_by_source': {
      const filters = getStartAndEndDate(otherInfo?.d?.date, searchFilters);
      return {
        ...defaultFilter,
        ...filters,
      };
    }
    case 'industry_companies_mentioned':
      return {
        ...defaultFilter,
        company: otherInfo?.d?.label,
      };
    case 'industry_coverage_by_journalist': {
      return {
        ...defaultFilter,
        author: rawData?.label,
        author_id: rawData?.author_id,
      };
    }
    case 'industry_coverage_by_top_publications': {
      return {
        ...defaultFilter,
        source_includes: rawData?.label,
      };
    }
    case 'Syndication': {
      return {
        ...defaultFilter,
        syndication_article_title: rawData?.title,
        syndication_article_id: rawData?.articleId,
      };
    }
    default:
      return {
        save_recent_search: true,
      };
  }
}

export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const combineImagesVertical = (imageUrls) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Load the first image to get its dimensions
    const firstImage = new Image();
    firstImage.onload = () => {
      const aspectRatios = [firstImage.width / firstImage.height];

      // Load the rest of the images and get their aspect ratios
      const promises = imageUrls.slice(1).map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            aspectRatios.push(aspectRatio);
            resolve();
          };
          img.onerror = (error) => {
            reject(new Error(`Failed to load image: ${imageUrl}. ${error}`));
          };
          img.src = imageUrl;
        });
      });

      // Wait for all images to load and get their aspect ratios
      Promise.all([firstImage].concat(promises))
        .then(() => {
          // Calculate the total height needed for vertical stacking
          const totalHeight = aspectRatios.reduce(
            (sum, ratio) => sum + firstImage.width / ratio,
            0
          );

          // Set canvas dimensions
          canvas.width = firstImage.width;
          canvas.height = totalHeight;

          // Draw each image onto the canvas with vertical stacking
          let yOffset = 0;
          for (let i = 0; i < imageUrls.length; i++) {
            const imageUrl = imageUrls[i];
            const img = new Image();
            // eslint-disable-next-line no-loop-func
            img.onload = () => {
              const aspectRatio = img.width / img.height;
              const height = firstImage.width / aspectRatio;

              // Draw the image onto the canvas
              ctx.drawImage(img, 0, yOffset, firstImage.width, height);

              // Update the yOffset for the next image
              yOffset += height;

              // If this is the last image, resolve the promise
              if (i === imageUrls.length - 1) {
                resolve(canvas.toDataURL('image/png'));
              }
            };
            img.src = imageUrl;
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    firstImage.src = imageUrls[0];
  });
};

export const combineImagesWithLogo = async (
  imageUrls,
  logoUrl,
  padding = 30
) => {
  // Combine images vertically with padding
  const combinedImage = await combineImagesVertical(imageUrls);

  // Load the combined image
  const img = new Image();
  img.src = combinedImage;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  // Load the logo image
  const logoImage = new Image();
  logoImage.src = logoUrl;

  await new Promise((resolve) => {
    logoImage.onload = resolve;
  });

  // Calculate dimensions for the canvas including padding
  const canvasWidth = img.width + 2 * padding;
  const canvasHeight = img.height + 2 * padding;

  // Create a new canvas for combining with the logo
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  // Draw a white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Draw the logo in the top-left corner with padding
  ctx.drawImage(
    logoImage,
    padding,
    padding,
    logoImage.width * 3,
    logoImage.height * 3
  );

  // Draw the combined image below and to the right of the logo
  ctx.drawImage(
    img,
    padding,
    logoImage.height + 5 * padding,
    img.width,
    img.height
  );

  // Convert the combined image with the logo to a data URL
  const combinedImageWithLogoDataURL = canvas.toDataURL('image/png');
  return combinedImageWithLogoDataURL;
};

export const dataURLtoBlob = (dataUrl) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export function toCamelCase(inputString) {
  if (!inputString) return '';
  return inputString;
}

export function replaceOperators(sentence) {
  if (!sentence) {
    return '';
  }
  let stack = [];
  let replacedSentence = '';

  let characters = [];
  let doublQuoteString = [];

  for (let i = 0; i < sentence.length; i++) {
    const currentChar = sentence[i];

    if (currentChar === '"') {
      if (stack.length === 0) {
        stack = [i];
      } else {
        replacedSentence += replaceOperatorsInSentence(characters.join(''));
        replacedSentence += doublQuoteString.join('') + '"';
        characters = [];
        doublQuoteString = [];
        stack = [];
      }
    }

    if (stack.length === 0 && currentChar !== '"') {
      // Replace operators outside of double quotes
      characters.push(currentChar);
    } else if (stack.length > 0) {
      doublQuoteString.push(currentChar);
    }
  }

  return (
    replacedSentence +
    replaceOperatorsInSentence(characters.join('')) +
    doublQuoteString.join('')
  );
}

function replaceOperatorsInSentence(sentence) {
  const replacedSentence = sentence
    ?.replace(/\bAnd\b/gi, 'AND')
    ?.replace(/\bOR\b/gi, 'OR')
    ?.replace(/\bNOT\b/gi, 'NOT');
  return replacedSentence;
}

export function checkMismatchedQuotes(sentence) {
  const stack = [];

  for (const char of sentence) {
    if (char === '"') {
      if (stack.length > 0 && stack[stack.length - 1] === '"') {
        stack.pop();
      } else {
        stack.push(char);
      }
    }
  }
  return stack.length === 0;
}
export function isCorrectParenthesisOrder(sentence) {
  const stack = [];

  for (const char of sentence) {
    if (char === '(') {
      stack.push('(');
    } else if (char === ')') {
      if (stack.length === 0 || stack.pop() !== '(') {
        return false; // Closing parenthesis without a matching opening parenthesis
      }
    }
  }

  // Check if there are any unmatched opening parentheses
  return stack.length === 0;
}

export function addCountPrefix(number) {
  if (!number) {
    return '0';
  }

  const formatter = new Intl.NumberFormat('en-US');

  if (number < 1000) {
    return formatter.format(number);
  }

  const suffixes = ['K', 'M', 'B', 'T'];
  const suffixNum = Math.floor(Math.log10(Math.abs(number)) / 3) - 1;
  const shortValue = number / Math.pow(1000, suffixNum + 1);
  const roundedValue =
    shortValue % 1 === 0 ? shortValue : shortValue.toFixed(1);

  return formatter.format(roundedValue) + ' ' + suffixes[suffixNum];
}

export function calculatePercentageIncrease(currentCount, previousCount) {
  if (previousCount === 0) {
    // Avoid division by zero
    return {
      isIncreased: currentCount > 0,
      percentageIncrease: currentCount === 0 ? 0 : 100,
    };
  }

  const increase = currentCount - previousCount;
  const percentageIncrease = Math.round(
    (increase / Math.abs(previousCount)) * 100
  );

  return {
    isIncreased: increase > 0,
    percentageIncrease:
      percentageIncrease >= 0
        ? percentageIncrease
        : Math.abs(percentageIncrease),
  };
}

export function calculatePercentage(
  data,
  positiveProperty,
  negativeProperty,
  neutralProperty
) {
  if (!data) {
    return {
      Positive: 0,
      Negative: 0,
      Neutral: 0,
    };
  }

  // Set default property names if not provided
  positiveProperty = positiveProperty || 'sentiment_positive';
  negativeProperty = negativeProperty || 'sentiment_negative';
  neutralProperty = neutralProperty || 'sentiment_neutral';

  // Create the sentiment percentages object
  const sentimentPercentages = {
    Positive: data[positiveProperty],
    Negative: data[negativeProperty],
    Neutral: data[neutralProperty],
  };

  // Return the sentiment percentages
  return sentimentPercentages;
}

export function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000); // Adjust the range based on your needs
  const uniqueId = `id_${timestamp}_${random}`;
  return uniqueId;
}

export const getMediaCountDataUTIL = (data) => {
  const mediaTypesFromRes = data || [];
  const updatedMediaCountData = mediaTabData?.map((x) => {
    const mdDataForMap = mediaTypesFromRes.find((mdData) =>
      mdData?.key?.toLowerCase().includes(x.label?.toLowerCase())
    );
    if (mdDataForMap) {
      return {
        ...x,
        count: mdDataForMap?.doc_count,
      };
    } else if (x.value === 'totalArticles') {
      return {
        ...x,
        count: mediaTypesFromRes.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.doc_count;
        }, 0),
      };
    }
    return {
      ...x,
      count: 0,
    };
  });
  return updatedMediaCountData;
};
