/**
 * Filters out properties from an object based on a set of criteria.
 *
 * @param {Object} inputData - The input data object to be filtered
 * @returns {Object} The filtered data object
 * Example: it will filter out properties from the input data object where it is false.
 */
export function refineSelectedGraphs(inputData) {
  // Filter out properties with true values and non-empty objects
  return Object.fromEntries(
    Object.entries(inputData).filter(([key, value]) => {
      return (
        Object.values(value).some((v) => v === true) &&
        Object.keys(value).length > 0
      );
    })
  );
}

/**
 * This function takes an array of charts and returns an object with the categories as keys and the chart IDs as values.
 * The value for each key-value pair is always set to true.
 *
 * @param {Array} chartsArray - An array of charts
 * @returns {Object} An object with the categories as keys and the chart IDs as values
 * example: {
    "industry": {
        "industry_volume_analysis": true,
        "industry_sentiment_analysis": true,
        // ... other industry charts
    }}
 */
export function convertToSelectedGraphsFormat(chartsArray) {
  const result = {};

  // Helper function to determine the category
  function getCategory(chart) {
    if (chart.chartId.startsWith('industry')) {
      return 'industry';
    } else if (chart.chartId.startsWith('people')) {
      return 'people';
    } else {
      return 'brand';
    }
  }

  // Helper function to add entries to the result object
  function addEntry(category, chartId, value) {
    if (!result[category]) {
      result[category] = {};
    }
    result[category][chartId] = value;
  }

  // Process charts
  chartsArray.forEach((chart) => {
    const category = getCategory(chart);
    addEntry(category, chart.chartId, true);
  });

  return result;
}

export function countTruthyValues(inputObject) {
  const result = {};

  for (const category in inputObject) {
    // Check if the property is present and is an object (to avoid issues with prototype properties)
    if (inputObject[category] && typeof inputObject[category] === 'object') {
      const categoryData = inputObject[category];

      // Count truthy values
      let totalCount = 0;

      // Separate count for brandOriginal and brandComp
      let brandOriginalCount = 0;
      let brandCompCount = 0;

      for (const key in categoryData) {
        // Using truthy check to include values like 0, false, empty strings
        if (categoryData[key]) {
          totalCount++;

          // Special handling for "brand" property
          if (category === 'brand') {
            const chartId = key; // Remove 'brand_' prefix

            if (brandCharts.some((chart) => chart.chartId === chartId)) {
              brandOriginalCount++;
            } else if (
              competitionCharts.some((chart) => chart.chartId === chartId)
            ) {
              brandCompCount++;
            }
          }
        }
      }

      // Include the category even if there are no truthy values
      result[category] = totalCount;

      // Add counts for brandOriginal and brandComp
      if (category === 'brand') {
        result.brandNotcomp = brandOriginalCount;
        result.brandComp = brandCompCount;
      }
    }
  }

  return result;
}

export const brandCharts = [
  { chartId: 'volume_analysis', chartName: 'Volume Analysis' },
  { chartId: 'sentiment_analysis', chartName: 'Sentiment Analysis' },
  { chartId: 'sentiment_over_time', chartName: 'Sentiment Over Time' },
  { chartId: 'coverage_over_time', chartName: 'Coverage Over Time' },
  { chartId: 'reach_over_time', chartName: 'Reach Over Time' },
  { chartId: 'media_type', chartName: 'Media Type' },
];

export const competitionCharts = [
  { chartId: 'sov', chartName: 'SOV' },
  { chartId: 'article_sentiment', chartName: 'Article Sentiment' },
  {
    chartId: 'competitive_coverage_over_time',
    chartName: 'Coverage Over Time',
  },
  { chartId: 'competitive_reach_over_time', chartName: 'Reach Over Time' },
  { chartId: 'coverage_by_journalist', chartName: 'Coverage by Journalist' },
  { chartId: 'coverage_by_source', chartName: 'Coverage by Sources' },
  { chartId: 'breakdown_by_media_type', chartName: 'Breakdown By Media Type' },
];

export const peopleCharts = [
  { chartId: 'people_volume_analysis', chartName: 'Volume Analysis' },
  { chartId: 'people_coverage_over_time', chartName: 'Coverage Over Time' },
  {
    chartId: 'people_top_journalist_by_sentiment',
    chartName: 'Top Journalist by Sentiment',
  },
  {
    chartId: 'people_top_source_by_sentiment',
    chartName: 'Top Source by Sentiment',
  },
  { chartId: 'people_popular_topics', chartName: 'Popular Topics' },
  { chartId: 'people_media_type', chartName: 'Media Type' },
];

export const industryCharts = [
  { chartId: 'industry_volume_analysis', chartName: 'Volume Analysis' },
  { chartId: 'industry_sentiment_analysis', chartName: 'Sentiment Analysis' },
  {
    chartId: 'industry_coverage_by_journalist',
    chartName: 'Coverage by Journalist',
  },
  { chartId: 'industry_coverage_by_source', chartName: 'Coverage by Source' },
  { chartId: 'industry_companies_mentioned', chartName: 'Campanies Mentioned' },
  { chartId: 'industry_coverage_over_time', chartName: 'Coverage Over Time' },
  {
    chartId: 'industry_coverage_by_top_publications',
    chartName: 'Coverage by top Publications',
  },
];

export const dashboardWidgets = {
  brand: [...brandCharts, ...competitionCharts],
  industry: industryCharts,
  people: peopleCharts,
};

export const dashboardCharts = {
  brand: brandCharts,
  competition: competitionCharts,
  industry: industryCharts,
  people: peopleCharts,
};

export const allDashboards = [
  ...brandCharts,
  ...competitionCharts,
  ...industryCharts,
  ...peopleCharts,
];
