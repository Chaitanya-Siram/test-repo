/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  DownloadBtnWrp,
  DownloadDescp,
  DownloadTitle,
  DownloadWrp,
} from './index.sc';
import { Button } from '../button';
import { theme } from '../../constants/theme';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  useDownloadAllCSVData,
  useDownloadPDF,
  useDownloadSelectedCSVData,
} from '../../hooks/useSearch';
import toast from 'react-hot-toast';

const DownloadArticlePopup = ({
  toggler,
  checked,
  totalArticles,
  downloadType,
  getPayloadForSearch,
  query,
  articlesInfo,
  sortOrder,
}) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const [loadingCSV, setLoadingCSV] = useState('Download CSV');
  const [loadingPDF, setLoadingPDF] = useState(
    checked && downloadType === 'selected'
      ? 'Download PDF'
      : 'Download PDF (First 100)'
  );
  const pdfTEXT = () => {
    if (checked && downloadType === 'selected') {
      return 'Download PDF';
    } else {
      return 'Download PDF (First 100)';
    }
  };

  //   const downLoadFunction = (value) => {
  //     mutateFunction({
  //       downloadType: value,
  //       selectedArticles:
  //         value === 'selected'
  //           ? checked
  //           : value === 'bookmarked'
  //           ? bookMarkedArticles
  //           : value === 'tagged'
  //           ? taggedArticles
  //           : [],
  //     });
  //   };

  const {
    mutateAsync: postDownloadAllCSVArticles,
    // data: allCSVData,
    // isSuccess,
    // isError,
    // error,
  } = useDownloadAllCSVData();

  const {
    mutateAsync: postDownloadSelectedCSVArticles,
    // data: selectedCSVData,
    // isSuccess,
    // isError,
    // error,
  } = useDownloadSelectedCSVData();

  const {
    mutateAsync: postDownloadPDF,
    // data: pdfData,
    // isSuccess,
    // isError,
    // error,
  } = useDownloadPDF();

  const downloadSelectedPDFArticles = (downloadType) => {
    try {
      const filteredData = articlesInfo
        ?.map((data, i) => (checked.includes(i) ? data : null))
        .filter((data) => data !== null);
      const articleId = filteredData.map((data) => data?.articleId);
      if (downloadType === 'selected' && articleId.length === 0) {
        toast.error(
          'Please select alteast one article to download the  articles.'
        );
        toggler((prev) => !prev);
      } else {
        setLoadingPDF('Loading...');
        const payload = () => {
          if (checked && downloadType === 'selected') {
            return {
              ...getPayloadForSearch(query),
              article_id_checks: articleId,
              sort: sortOrder,
            };
          } else {
            return {
              ...getPayloadForSearch(query),
              page_size: 100,
              sort: sortOrder,
            };
          }
        };
        toggler((prev) => !prev);

        postDownloadPDF(
          // {
          // ...newData,
          // article_id_checks: articleId,
          // ...getPayloadForSearch(query),
          // }
          payload()
        ).then((resp) => {
          if (resp?.status === 'pending') {
            toast.loading('Downloading');
          } else if (resp?.status === 'success') {
            toast.success('Please Check your registered email for download');
            // toggler((prev) => !prev);
            setLoadingPDF(pdfTEXT());
          }
        });
      }
    } catch (error) {
      console.log(error);
      toggler((prev) => !prev);
      setLoadingPDF(pdfTEXT());
    }
  };

  const downloadAllCSV = () => {
    try {
      setLoadingCSV('Loading...');
      const { page_size, page_number, ...newData } = getPayloadForSearch(query);
      toggler((prev) => !prev);

      postDownloadAllCSVArticles({
        // ...getPayloadForSearch(query),
        ...newData,
        page_size: 2000,
        sort: sortOrder,
      })
        .then((resp) => {
          if (resp?.status === 'pending') {
            toast.loading('Downloading');
            // toggler((prev) => !prev);
          } else if (resp?.status === 'success') {
            toast.success('Please Check your registered email for download');
            // toggler((prev) => !prev);
            setLoadingCSV('Download CSV');
          } else {
            toast.error('Error While Downloading');
            setLoadingCSV('Download CSV');
            // toggler((prev) => !prev);
          }
        })
        .catch((errMsg) => {
          toast.error('Error While Downloading');
          toggler((prev) => !prev);
          setLoadingCSV('Download CSV');
        });
    } catch (error) {
      console.log(error);
    }
  };
  const downloadSelectedCSV = () => {
    try {
      const filteredData = articlesInfo
        ?.map((data, i) => (checked.includes(i) ? data : null))
        .filter((data) => data !== null);

      const articleId = filteredData.map((data) => data?.articleId);
      const payload = () => {
        if (checked && downloadType === 'selected') {
          return {
            ...getPayloadForSearch(query),
            article_id_checks: articleId,
            sort: sortOrder,
          };
        } else {
          return { ...getPayloadForSearch(query), sort: sortOrder };
        }
      };
      if (articleId?.length > 0) {
        setLoadingCSV('Loading...');
        toggler((prev) => !prev);
        postDownloadSelectedCSVArticles(payload()).then((resp) => {
          if (resp?.status === 'pending') {
            toast.loading('Downloading');
          } else if (resp?.status === 'success') {
            toast.success('Please Check your registered email for download');
            // toggler((prev) => !prev);
            setLoadingCSV('Download CSV');
          } else {
            toast.error('Error While Downloading');
            setLoadingCSV('Download CSV');
            toggler((prev) => !prev);
          }
        });
      } else {
        toast.error(
          'Please select alteast one article to download the  articles.'
        );
        toggler((prev) => !prev);
        setLoadingCSV('Download CSV');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const pdfButtonTitle = () => {
  // };

  const handleDownloadClickCSV = () => {
    if (downloadType === 'downloadAll') {
      downloadAllCSV();
    } else if (checked && downloadType === 'selected') {
      downloadSelectedCSV();
    }
  };

  return (
    <DownloadWrp>
      <DownloadTitle>Confirm Download</DownloadTitle>
      {checked && downloadType === 'selected' ? (
        <DownloadDescp>
          You have selected {checked?.length} articles. Select a format to begin
          download.
        </DownloadDescp>
      ) : downloadType === 'downloadAll' && totalArticles > 10000 ? (
        <DownloadDescp>
          You can download a sampled data set as the data is too huge to
          download. Select a format to begin download.
        </DownloadDescp>
      ) : (
        <DownloadDescp>
          Download {totalArticles} articles. Select a format to begin download.
        </DownloadDescp>
      )}
      <DownloadBtnWrp>
        <Button
          title={loadingCSV}
          backgroundColor={theme[selectedTheme].primary}
          color={theme[selectedTheme].background}
          onClick={() => handleDownloadClickCSV(downloadType)}
          border={theme[selectedTheme].background}
          disable={downloadType === 'selected' && checked.length === 0}
        />
        <Button
          type="submit"
          title={loadingPDF}
          backgroundColor={theme[selectedTheme].primary}
          color={theme[selectedTheme].background}
          onClick={() => downloadSelectedPDFArticles(downloadType)}
          border={theme[selectedTheme].primary}
          disable={downloadType === 'selected' && checked.length === 0}
        />
      </DownloadBtnWrp>
    </DownloadWrp>
  );
};

export default DownloadArticlePopup;

DownloadArticlePopup.propTypes = {
  toggler: PropTypes.func,
  checked: PropTypes.array,
  totalArticles: PropTypes.string,
  downloadType: PropTypes.string,
  getPayloadForSearch: PropTypes.func,
  query: PropTypes?.string,
  articlesInfo: PropTypes?.array,
  sortOrder: PropTypes.string,
};
