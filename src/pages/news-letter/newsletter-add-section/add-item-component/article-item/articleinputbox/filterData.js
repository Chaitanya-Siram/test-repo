export const filterLabels = [
  { value: 'limit', label: 'No of Articles' },
  { value: 'sort', label: 'Sort Articles By' },
  // { value: 'display', label: 'Article Display' },
  // { value: 'theme', label: 'Tags/Themes' },
];
export const filterKeyOptions = {
  limit: [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
    { label: '40', value: 40 },
    { label: '50', value: 50 },
    { label: '60', value: 60 },
    { label: '70', value: 70 },
    { label: '80', value: 80 },
    { label: '90', value: 90 },
    { label: '100', value: 100 },
  ],
  sort: [
    { label: 'Relevance', value: '' },
    { label: 'Date Published', value: 'date' },
    { label: 'Reach', value: 'reach' },
    { label: 'AVE', value: 'ave' },
    { label: 'Sentiment', value: 'sentiment' },
    // 'BookMarked',
  ],
  // display: ['Relevancy', 'Newest', 'Oldest', 'Popular'],
  // theme: ['Theme 1', 'Theme 2', 'Theme 3', 'Theme 4'],
};
