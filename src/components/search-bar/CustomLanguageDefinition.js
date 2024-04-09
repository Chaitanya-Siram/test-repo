import Prism from 'prismjs';

Prism.languages.customLanguage = {
  string: {
    pattern: /(["].*?["])/gi,
    alias: 'custom-string', // Assign your own CSS class name
  },
  operator: {
    pattern:
      /(?:^|\s)(AND|OR|NOT)(?=\s|$)(?=(?:(?:[^"]*"){2})*[^"]*$|[^"]*"[^"]*$)/g,
    alias: 'custom-operator',
    replaceWith: (match) => match.toUpperCase(),
  },
};
