import React, { useEffect, useState, useRef } from 'react';
import {
  BtnWrp,
  ButtonWpr,
  CrossButtonWrp,
  // TitleText,
  TitleTextInput,
  TopBarWrp,
  CircularLoadingWrap,
  DownloadingLoader,
  SaveNewsLetterwpr,
  HeaderWrp,
  Titlewpr,
  Labelbox,
  Labelwpr,
  Inputwpr,
  TextAreaContainer,
} from './index.sc';
import { Button } from '../../../../components/button';
import { useNavigate } from 'react-router';
import { theme } from '../../../../constants/theme';
import { useSelector } from 'react-redux';
import PublishButton from '../../../../assets/icons/PublishButton';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import Proptypes from 'prop-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosGet } from '../../../../service';
import { useLocation, useParams } from 'react-router-dom';
import DashboardPopup from '../../../../components/dasboard-popup';
import { IconWrp } from '../../newsletter-add-section/add-item-component/index.sc';
import Edit2 from '../../../../assets/icons/Edit2';
import Close from '../../../../assets/icons/Close';
import { ErrorTxt } from '../../../login/index.sc';
import {
  ButtonsContainer,
  FooterBoxwpr,
  LeftfootBoxwpr,
} from '../../../../components/custom-drawer/index.sc';
import {
  handlePublishDoc,
  handlePublishNewsletter,
  updateNewsletter,
  useCreateSaveNewsLetterData,
  useUpdateNewsletter,
} from '../../../../hooks/useSaveNewsLetter';
import { getTokenData } from '../../../../constants/validateToken';
import toast from 'react-hot-toast';
import fileDownload from 'js-file-download';
import AlertPopUp from '../../../../components/alert-popup';
import { DateTime } from 'luxon';
import Spinner from '../../../../components/spinner';
import {
  Btnwrp,
  ButtonText,
  DropDown,
  DropDownCont,
  DropDownWrp,
  DropdownForButton,
  SaveSearchBtn,
} from '../../../new-dashboard/index.sc';
import DropDownButton from '../../../../assets/icons/DropDownButton';
import { formatDate } from '../../../../utils';
import { format, parse } from 'date-fns';
import {
  convertDate,
  isCombinedDateTimeGreaterThanCurrent,
} from '../../../../constants/utils';

const NewsLetterTopBar = ({
  newsLetterData,
  editMode,
  activeElement,
  handleElementClick,
  handleBlur,
  setStateNewsLetterData,
  previousState,
  setPreviousState,
  setIsHandleCloseCalled,
  isHandleCloseCalled,
  setIsUpdated,
  isUpdated,
}) => {
  const [newsletterTitle, setNewsletterTitle] = useState('');
  const [newsletterTitleTemp, setNewsletterTitleTemp] = useState('');
  const [newsLetterDescp, setNewsLetterDescp] = useState('');
  const [newsletterDescpTemp, setNewsletterDescpTemp] = useState('');
  const [newsLetterPopup, setNewsLetterPopup] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');
  const [nameErrorTextDescp, setNameErrorTextDescp] = useState('');
  const [btnTxt, setBtnTxt] = useState('Save Newsletter');
  const [confimationAlertPopUp, setConfimationAlertPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef();
  const saveDropdownRef = useRef();
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [saveShowCustomComponentForSave, setSaveShowCustomComponent] =
    useState(false);
  const [showDropDownOpen, setshowDropdownOpen] = useState(false);

  const clickedOption = useRef('');

  const savePopupRef = useRef();

  const authInfo = getTokenData();

  const { newsLetterId } = useParams();

  const { pathname } = useLocation();

  // const queryClient = useQueryClient();

  const { mutateAsync: CreateSaveNewsletter } = useCreateSaveNewsLetterData(
    authInfo?.user_id
  );

  const { mutateAsync: updateNewsletterFunc } = useUpdateNewsletter();

  useEffect(() => {
    if (newsLetterId) {
      setNewsletterTitle(newsLetterData?.newsletter_title);
      setNewsLetterDescp(newsLetterData?.newsletter_content);
      setNewsletterTitleTemp(newsLetterData?.newsletter_title);
      setNewsletterDescpTemp(newsLetterData?.newsletter_content);
    }
  }, [newsLetterData, newsLetterId]);

  const getDownloadPdf = () => {
    return axiosGet('/downloadPdf', { page: 'news-letter', newsLetterId });
  };

  const handleOpenClick = () => {
    setShowCustomComponent(!showCustomComponent);
    setDropdownOpen(!dropdownOpen);
  };

  const handleOpenClickSave = () => {
    setSaveShowCustomComponent(!saveShowCustomComponentForSave);
    setshowDropdownOpen(!showDropDownOpen);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowCustomComponent(false);
      setDropdownOpen(false);
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

  const handleClickOutsideForSave = (event) => {
    // Check if the click is outside the dropdown container
    if (
      saveDropdownRef.current &&
      !saveDropdownRef.current.contains(event.target)
    ) {
      setSaveShowCustomComponent(false);
      setshowDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the dropdown container when the component mounts
    document.addEventListener('click', handleClickOutsideForSave);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutsideForSave);
    };
  }, []);

  const handleOpenSavePopup = () => {
    if (
      newsLetterData?.recipients?.length > 0 &&
      newsLetterData?.send_type_option?.length > 0 &&
      newsLetterData?.send_time !== '' &&
      newsLetterData?.publish_type !== '' &&
      !newsLetterId
    ) {
      if (
        newsLetterData?.send_type === 'onetime' &&
        !isCombinedDateTimeGreaterThanCurrent(
          convertDate(newsLetterData?.send_type_option?.[0]),
          newsLetterData?.send_time
        )
      ) {
        toast.error(
          'Time is already lapsed for selected Date. Kindly select new one'
        );
      } else {
        setNewsLetterPopup(true);
      }
    } else if (
      newsLetterData?.recipients?.length === 0 &&
      !(newsLetterData?.send_type_option?.length === 0) &&
      !(newsLetterData?.send_time === '') &&
      !(newsLetterData?.publish_type === '')
    ) {
      toast.error('Please Add The Recipients');
    } else if (
      newsLetterData?.send_type_option?.length === 0 &&
      !(newsLetterData?.publish_type === '') &&
      !(newsLetterData?.send_time === '') &&
      !(newsLetterData?.recipients?.length === 0)
    ) {
      toast.error('Please Select The Send Period');
    } else if (
      newsLetterData?.send_time === '' &&
      !(newsLetterData?.recipients?.length === 0) &&
      !(newsLetterData?.publish_type === '') &&
      !(newsLetterData?.send_type_option?.length === 0)
    ) {
      toast.error('Please Select The Send Time');
    } else if (
      newsLetterData?.publish_type === '' &&
      !(newsLetterData?.send_time === '') &&
      !(newsLetterData?.recipients?.length === 0) &&
      !(newsLetterData?.send_type_option === 0)
    ) {
      toast.error('Please Select The Publish Type');
    } else {
      toast.error(
        'Please Provide All fields which are empty Recipients, Send On, Send Time, and Publish As Values.'
      );
    }
  };

  const timezoneMappings = {
    // Due to bug in v8 Chrome Engine, it's still returning old one, it works fine for other engines
    // https://bugs.chromium.org/p/chromium/issues/detail?id=580195
    'Asia/Calcutta': 'Asia/Kolkata',
  };

  const handleSaveNewsLetter = async (e) => {
    e.preventDefault();
    const updatedPaylod = newsLetterData?.newsletter_body?.map(
      (item, index) => {
        const obj = {};
        obj.section_no = index + 1;
        if (item?.columnComponent?.componentType !== 'text') {
          obj.section_name = item?.columnComponent?.sectionData?.sectionTitle;
          obj.section_name_color =
            item?.columnComponent?.sectionData?.titleColor;
          obj.section_name_bgcolor =
            item?.columnComponent?.sectionData?.titleBackgroundColor;
          obj.section_description =
            item?.columnComponent?.sectionData?.sectionDescription;
          obj.section_description_color =
            item?.columnComponent?.sectionData?.descriptionColor;
          obj.section_description_bgcolor =
            item?.columnComponent?.sectionData?.descriptionBackgroundColor;
        }
        if (item?.columnComponent?.componentType === 'text') {
          obj.type = item?.columnComponent?.componentType;
          obj.title = item?.columnComponent?.componentData?.title;
          obj.description = item?.columnComponent?.componentData?.description;
          obj.searchid = '';
          obj.chart_type = '';
          // title: '',
          obj.image_url = '';
          obj.article_image_id = '';
          obj.article_csv_id = '';
          obj.count = '';
          obj.sortby = '';
          obj.filtertag = '';
          obj.section_name = item?.columnComponent?.componentData?.title;
          obj.section_description =
            item?.columnComponent?.componentData?.description;
          obj.section_name_color = '#000000';
          obj.section_name_bgcolor = '#ffffff';
          obj.section_description_color = '#000000';
          obj.section_description_bgcolor = '#ffffff';
        } else if (item?.columnComponent?.componentData?.type === 'article3') {
          const articleData = item?.columnComponent?.updatedArticleData?.map(
            (x, i) => {
              const parsedDate = parse(
                x.date.split('T')[0],
                'yyyy-MM-dd',
                new Date()
              );
              const formattedDate = format(parsedDate, 'MM/dd/yyyy');
              return {
                ...x,
                date: formattedDate,
                sr_no: i + 1,
                imagePublicUrl: x?.imagePublicUrl || x?.image,
                type: x?.newsType || x?.type,
                syndication_data: Array.isArray(x?.syndication_data)
                  ? x?.syndication_data
                      ?.filter(
                        (unrefinedData) =>
                          unrefinedData?.title || unrefinedData?.link
                      )
                      ?.map((y, yIndex) => {
                        return {
                          ...y,
                          sr_no: yIndex + 1,
                        };
                      })
                  : [],
              };
            }
          );
          obj.type = item?.columnComponent?.componentData?.type || item?.type;
          obj.title = '';
          obj.description = '';
          obj.searchid = item?.columnComponent?.componentData?.searchid;
          obj.chart_type = '';
          // title: '',
          obj.image_url = '';
          obj.article_image_id = '';
          obj.article_csv_id = '';
          obj.count = item?.columnComponent?.componentData?.count;
          obj.sortby = item?.columnComponent?.componentData?.sortby;
          obj.filtertag = item?.columnComponent?.componentData?.filterTag;
          obj.article_data = articleData;
          obj.modified = item?.columnComponent?.isModified;
          obj.article_media = item?.columnComponent?.articleMediaShow || false;
        } else if (item?.columnComponent?.type === 'article1') {
          // CSV
          const articleData = item?.columnComponent?.updatedArticleData?.map(
            (x, i) => {
              const parsedDate = parse(
                x.date.split('T')[0],
                'yyyy-MM-dd',
                new Date()
              );
              const formattedDate = format(parsedDate, 'MM/dd/yyyy');
              return {
                ...x,
                date: formattedDate,
                sr_no: i + 1,
                imagePublicUrl: x?.imagePublicUrl || x?.image,
                type: x?.newsType || x?.type,
                syndication_data: Array.isArray(x?.syndication_data)
                  ? x?.syndication_data
                      ?.filter(
                        (unrefinedData) =>
                          unrefinedData?.title || unrefinedData?.link
                      )
                      ?.map((y, yIndex) => {
                        return {
                          ...y,
                          sr_no: yIndex + 1,
                        };
                      })
                  : [],
              };
            }
          );
          obj.type = item?.columnComponent?.type || item?.type;
          obj.title = '';
          obj.description = '';
          obj.searchid = '';
          obj.chart_type = '';
          // title: '',
          obj.image_url = '';
          obj.article_image_id = '';
          obj.article_csv_id = item?.columnComponent?.article_csv_id;
          obj.count = item?.columnComponent?.count;
          obj.sortby = '';
          obj.filtertag = '';
          obj.article_data = articleData;
          obj.modified = item?.columnComponent?.isModified;
          obj.article_media = item?.columnComponent?.articleMediaShow || false;
        } else if (item?.columnComponent?.type === 'article2') {
          const articleData = item?.columnComponent?.updatedArticleData?.map(
            (x, i) => {
              const parsedDate = parse(
                x.date.split('T')[0],
                'yyyy-MM-dd',
                new Date()
              );
              const formattedDate = format(parsedDate, 'MM/dd/yyyy');
              return {
                ...x,
                date: formattedDate,
                sr_no: i + 1,
                imagePublicUrl: x?.imagePublicUrl || x?.image,
                type: x?.newsType || x?.type,
                syndication_data: Array.isArray(x?.syndication_data)
                  ? x?.syndication_data
                      ?.filter(
                        (unrefinedData) =>
                          unrefinedData?.title || unrefinedData?.link
                      )
                      ?.map((y, yIndex) => {
                        return {
                          ...y,
                          sr_no: yIndex + 1,
                        };
                      })
                  : [],
              };
            }
          );
          obj.type = item?.columnComponent?.type || item?.type;
          obj.title = '';
          obj.description = '';
          obj.searchid = '';
          obj.chart_type = '';
          // title: '',
          obj.image_url = '';
          obj.article_image_id = '';
          obj.article_csv_id = '';
          obj.newsletterId = item?.columnComponent?.newsletterId;
          obj.count = '';
          obj.sortby = '';
          obj.filtertag = '';
          obj.article_data = articleData;
          obj.modified = item?.columnComponent?.isModified;
          obj.article_media = item?.columnComponent?.articleMediaShow || false;
        } else if (item?.columnComponent?.componentData?.type === 'chart1') {
          obj.type = item?.columnComponent?.componentData?.type;
          obj.title =
            item?.columnComponent?.componentData?.articles?.title ||
            item?.columnComponent?.componentData?.title;
          obj.description = '';
          obj.searchid = '';
          obj.chart_type = '';
          // title: '',
          obj.image_url =
            item?.columnComponent?.componentData?.articles?.image_url;
          obj.article_csv_id = '';
          obj.article_image_id =
            item?.columnComponent?.componentData?.articles?.article_image_id;
          obj.newsletterId = '';
          obj.count = '';
          obj.sortby = '';
          obj.filtertag = '';
        } else if (item?.columnComponent?.componentData?.type === 'chart2') {
          // const updatedChartType = item?.columnComponent?.componentData?.chart_type?.map()
          obj.type = item?.columnComponent?.componentData?.type;
          obj.title = '';
          obj.description = '';
          obj.searchid = item?.columnComponent?.componentData?.searchid;
          obj.chart_type = item?.columnComponent?.componentData?.chart_type;
          // title: '',
          obj.image_url = '';
          obj.article_image_id = '';
          obj.article_csv_id = '';
          obj.newsletterId = '';
          obj.count = '';
          obj.sortby = '';
          obj.filtertag = '';
        }
        return obj;
      }
    );
    try {
      const userId = authInfo?.user_id;
      setBtnTxt('Saving...');
      // if (newsLetterData?.newsletter_body?.length > 0) {
      const payloadNewBody = updatedPaylod?.filter(
        (obj) => Object.keys(obj)?.length > 0
      );
      const ianaTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let timeZone = DateTime.local().setZone(ianaTimezone).toFormat('z');

      timeZone = timezoneMappings[timeZone] || timeZone;

      if (!newsLetterId) {
        if (newsletterTitleTemp !== '') {
          await CreateSaveNewsletter(
            {
              newsLetterData: {
                ...newsLetterData,
                newsletter_body: payloadNewBody,
                newsletter_title: newsletterTitleTemp,
                newsletter_content: newsletterDescpTemp,
                send_timezone: timeZone,
                is_published: !!(
                  newsLetterData?.is_published ||
                  clickedOption?.current === 'Publish'
                ),
              },
              userId,
            },
            {
              onSuccess: (newsData) => {
                if (newsData?.isSuccessful) {
                  setStateNewsLetterData((prev) => ({
                    ...prev,
                    // newsletter_body: updatedPaylod,
                    newsletter_title: newsletterTitleTemp,
                    newsletter_content: newsletterDescpTemp,
                    status: true,
                    is_published: !!(
                      newsLetterData?.is_published ||
                      clickedOption?.current === 'Publish'
                    ),
                  }));
                  setNewsLetterPopup(false);
                  toast.success(newsData?.data?.msg);
                  newsData?.data?.data?.id &&
                    navigate(`/news-letter/${newsData?.data?.data?.id}`);
                  if (isHandleCloseCalled && newsData?.data?.data?.id) {
                    newsData?.data?.data?.id
                      ? navigate('/news-letter')
                      : navigate(-1);
                    setIsHandleCloseCalled(false);
                    // setPreviousState(false);
                  }
                } else {
                  toast.error(newsData?.data?.message || newsData?.data?.error);
                }
              },
            }
          );
        } else {
          if (newsletterTitleTemp === '') {
            setNameErrorText('Please Provide The Title Before Saving');
          }
          // else {
          //   toast.error(
          //     'Please add at least one section body to save newsletter.'
          //   );
          // }
        }
      } else {
        if (newsletterTitleTemp !== '') {
          setIsLoading(true);
          if (
            newsLetterData?.send_type === 'onetime' &&
            !isCombinedDateTimeGreaterThanCurrent(
              convertDate(newsLetterData?.send_type_option?.[0]),
              newsLetterData?.send_time
            )
          ) {
            toast.error(
              'Time is already lapsed for selected Date. Kindly select new one'
            );
          } else {
            await updateNewsletterFunc(
              {
                ...newsLetterData,
                newsletter_body: payloadNewBody,
                newsletter_title: newsletterTitleTemp,
                newsletter_content: newsletterTitleTemp,
                send_timezone: timeZone,
                newsLetterId,
                is_published: !!(
                  newsLetterData?.is_published ||
                  clickedOption?.current === 'Publish'
                ),
              },
              {
                onSuccess: (newsData) => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  if (newsData?.isSuccessful) {
                    setStateNewsLetterData((prev) => ({
                      ...prev,
                      // newsletter_body: updatedPaylod,
                      newsletter_title: newsletterTitleTemp,
                      newsletter_content: newsletterDescpTemp,
                      status: true,
                      is_published: !!(
                        newsLetterData?.is_published ||
                        clickedOption?.current === 'Publish'
                      ),
                    }));
                    setNewsLetterPopup(false);
                    toast.success('Updated Successfully');
                    // handlePublishNewsletter({
                    //   newsLetterId: parseInt(newsLetterId),
                    //   export: 0,
                    //   sentmail: 0,
                    // });

                    if (newsData?.data?.data?.id) {
                      navigate(`/news-letter/${newsData?.data?.data?.id}`);
                    }
                    if (isHandleCloseCalled && newsData?.isSuccessful) {
                      newsLetterId ? navigate('/news-letter') : navigate(-1);
                      setIsHandleCloseCalled(false);
                      // setPreviousState(false);
                    }
                    setIsUpdated(true);

                    // queryClient.invalidateQueries(['newsletter']);
                  } else {
                    toast.error(
                      newsData?.data?.message || newsData?.data?.error
                    );
                  }
                },

                // onError: (error) => {},
              }
            );
          }
        } else {
          if (newsletterTitleTemp === '') {
            setNameErrorText('Please Provide The Title Before Saving');
          }
          // else {
          //   toast.error(
          //     'Please add at least one section body to save newsletter.'
          //   );
          // }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setBtnTxt('Save Newsletter');
      //  toggler(false);
      // setNameErrorText('');
    }
  };

  const handleExport = async (e, fileType) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resp = await handlePublishNewsletter({
        newsLetterId: parseInt(newsLetterId),
        export: fileType === 'pdf' ? 1 : 2,
        sentmail: 0,
      });
      if (resp?.isSuccessful) {
        toast.success('Download Successful');
        fileDownload(resp?.data, `${newsletterTitle}.${fileType}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportDoc = async (e, fileType) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resp = await handlePublishDoc({
        newsLetterId: parseInt(newsLetterId),
        export: 2,
        sentmail: 0,
      });
      if (resp?.isSuccessful) {
        toast.success('Download Successful');
        fileDownload(resp?.data?.file, `${newsletterTitle}.${fileType}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseEditPopup = () => {
    setNewsLetterPopup(false);
    if (newsLetterId) {
      setNewsletterTitle(newsLetterData?.newsletter_title);
      setNewsLetterDescp(newsLetterData?.newsletter_content);
      setNewsletterTitleTemp(newsLetterData?.newsletter_title);
      setNewsletterDescpTemp(newsLetterData?.newsletter_content);
    } else {
      setNewsletterTitle('');
      setNewsLetterDescp('');
      setNewsletterTitleTemp('');
      setNewsletterDescpTemp('');
    }
  };

  const { refetch, isFetching: isDownloading } = useQuery({
    queryKey: ['download-pdf'],
    queryFn: () => getDownloadPdf(),
    refetchOnWindowFocus: false,
    enabled: false,
    // onSuccess: (data) => {
    //   const downloadUrl = `${baseURL}/images/${data.data.pdfName}`;
    //   const anchor = document.createElement('a');
    //   anchor.href = downloadUrl;
    //   anchor.target = '_blank';
    //   anchor.style.display = 'none';
    //   anchor.download = true; // Set the download attribute to true
    //   document.body.appendChild(anchor);
    //   anchor.click();
    // },
  });
  const navigate = useNavigate();

  // Check if the current data is different from the initial data

  const isDataChanged =
    JSON.stringify(previousState) !== JSON.stringify(newsLetterData);
  const handleClose = () => {
    // if (isDataChanged) {
    if (isDataChanged && newsLetterId) {
      setConfimationAlertPopUp(isDataChanged);
      setIsHandleCloseCalled(true);
    } else if (
      newsLetterData?.newsletter_body?.length > 0 &&
      pathname === '/create-news-letter'
    ) {
      setConfimationAlertPopUp(isDataChanged);
      // setNewsLetterPopup(true);
      setIsHandleCloseCalled(true);
    } else {
      newsLetterId ? navigate('/news-letter') : navigate(-1);
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);

    const onBackButtonEvent = (e) => {
      e.preventDefault();
      if (isDataChanged && newsLetterId) {
        // if (window.confirm('Do you want to go back ?')) {
        setConfimationAlertPopUp(true);
        setIsHandleCloseCalled(true);
      } else if (
        newsLetterData?.newsletter_body?.length > 0 &&
        pathname === '/create-news-letter'
      ) {
        setConfimationAlertPopUp(isDataChanged);
        setIsHandleCloseCalled(true);
      } else {
        navigate('/news-letter');
      }
    };

    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
      // window.addEventListener('popstate', (e) => onBackButtonEvent(e));
    };
  }, [isDataChanged, newsLetterId]);

  useEffect(() => {
    if (isUpdated) {
      setPreviousState(newsLetterData);
      setIsUpdated(false);
    }
  }, [isUpdated]);

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const changeNewsLetterTitle = (e) => {
    setNewsletterTitle(e.target.value);
    // setStateNewsLetterData((prevData) => ({
    //   ...prevData,
    //   newLetterTitle: e.target.value,
    // }));
  };

  const handleAlertSaved = () => {
    setConfimationAlertPopUp(false);

    setNewsLetterPopup(true);
  };

  const handleOutsideClick = (event) => {
    if (savePopupRef.current && !savePopupRef.current.contains(event.target)) {
      setNewsLetterPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {
        <DashboardPopup
          popContent={
            <>
              <SaveNewsLetterwpr
                onSubmit={(e) => {
                  setNewsletterTitle(newsletterTitleTemp);
                  setNewsLetterDescp(newsletterDescpTemp);
                  handleSaveNewsLetter(e);
                }}
                ref={savePopupRef}
              >
                <HeaderWrp>
                  <Titlewpr>
                    {newsLetterId ? 'Rename Newsletter' : 'Save Newsletter'}
                  </Titlewpr>
                  <IconWrp onClick={handleCloseEditPopup}>
                    <Close
                      width="2.12rem"
                      height="2.12rem"
                      color={theme[selectedTheme].text}
                    />
                  </IconWrp>
                </HeaderWrp>
                <Labelbox>
                  <span>Title</span>
                  <Labelwpr htmlFor="NewsLetter Name">
                    <Inputwpr
                      value={newsletterTitleTemp}
                      onChange={(e) => {
                        setNewsletterTitleTemp(e.target.value);
                        e.target.value.length > 0 && setNameErrorText('');
                      }}
                      id="dashboardName"
                      placeholder="Newsletter Title"
                    />
                  </Labelwpr>
                  <ErrorTxt style={{ marginTop: '1em' }}>
                    {nameErrorText}
                  </ErrorTxt>
                </Labelbox>
                <Labelbox>
                  <span>Description</span>
                  <TextAreaContainer
                    value={newsletterDescpTemp}
                    onChange={(e) => {
                      setNewsletterDescpTemp(e.target.value);
                      e.target.value.length > 0 && setNameErrorTextDescp('');
                    }}
                    placeholder="Description"
                  />
                  <ErrorTxt style={{ marginTop: '1em' }}>
                    {nameErrorTextDescp}
                  </ErrorTxt>
                </Labelbox>
                <FooterBoxwpr mt={1.25} style={{ padding: 0 }}>
                  <LeftfootBoxwpr></LeftfootBoxwpr>
                  <ButtonsContainer>
                    <Button
                      title={'Cancel'}
                      backgroundColor={theme[selectedTheme].background}
                      color={theme[selectedTheme].primary}
                      onClick={handleCloseEditPopup}
                      border={theme[selectedTheme].primary}
                    />
                    <Button
                      type="submit"
                      title={newsLetterId ? 'Done' : btnTxt}
                      backgroundColor={theme[selectedTheme].primary}
                    />
                  </ButtonsContainer>
                </FooterBoxwpr>
              </SaveNewsLetterwpr>
            </>
          }
          padding="1.5rem"
          open={newsLetterPopup}
          borderRadius="0.625rem"
          width={'45vw'}
        />
      }
      <DashboardPopup
        open={confimationAlertPopUp}
        toggler={(flag) => {
          setConfimationAlertPopUp(flag);
          setIsHandleCloseCalled(flag);
        }}
        popContent={
          <AlertPopUp
            Heading={newsLetterId ? 'Save Changes?' : 'Save Newsletter?'}
            toggler={(flag) => {
              setConfimationAlertPopUp(flag);
              setIsHandleCloseCalled(flag);
            }}
            description={
              newsLetterId
                ? 'You have modified the newsletter. Would you like to save the changes?'
                : 'You are about to leave this page without saving. Would you like to save your current newsletter?'
            }
            handleSave={() => {
              handleAlertSaved();
            }}
            handleDontSave={() => {
              setConfimationAlertPopUp(false);
              // setChangeSaved(false);
              (newsLetterId && navigate('/news-letter')) ||
                (pathname === '/create-news-letter' &&
                  navigate('/news-letter'));
            }}
          />
        }
        padding="0"
        borderRadius="0.625rem"
        width="28rem"
      />
      <TopBarWrp>
        <ButtonWpr>
          <CrossButtonWrp onClick={handleClose}>
            <ArrowLeft color={'#656B8A'} width="2rem" />
          </CrossButtonWrp>
          {/* {editMode && activeElement === 'main-title' ? ( */}
          <TitleTextInput
            name="newLetterTitle"
            placeholder="Newsletter Title"
            value={newsletterTitle}
            onBlur={handleBlur}
            onChange={changeNewsLetterTitle}
          />
          {newsLetterId && (
            <IconWrp
              onClick={() => {
                setNewsLetterPopup(true);
              }}
            >
              <Edit2 size={'1.25rem'} />
            </IconWrp>
          )}
        </ButtonWpr>
        <BtnWrp>
          {/* {newsLetterId && (
            <>
              {isDownloading ? (
                <CircularLoadingWrap>
                  <DownloadingLoader />
                </CircularLoadingWrap>
              ) : (
                <Button
                  title={'Download Pdf'}
                  backgroundColor={theme[selectedTheme].background}
                  color={theme[selectedTheme].primary}
                  onClick={refetch}
                  border={theme[selectedTheme].primary}
                />
              )}
            </>
          )} */}
          {/* <Button
            title={'Export'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={handleExport}
            disable={!newsLetterId}
            border={theme[selectedTheme].primary}
            icon={<PublishButton color={theme[selectedTheme].primary} />}
          /> */}

          <DropdownForButton ref={dropdownRef}>
            <Btnwrp disabled={!newsLetterId}>
              <SaveSearchBtn
                onClick={() => {
                  toast.error(
                    'Select PDF or DOC from dropdown by clicking on the Arrow'
                  );
                }}
                className="save-btn"
                disabled={!newsLetterId}
              >
                <ButtonText>Export</ButtonText>
              </SaveSearchBtn>
              <DropDownWrp
                disabled={!newsLetterId}
                onClick={() => {
                  if (newsLetterId) {
                    handleOpenClick();
                  }
                }}
              >
                <DropDownButton
                  size={'1rem'}
                  color={'#ffffff'}
                  isOpen={dropdownOpen}
                />
              </DropDownWrp>
            </Btnwrp>
            {showCustomComponent && (
              <DropDownCont style={{ width: '9rem' }}>
                <DropDown onClick={(e) => handleExportDoc(e, 'docx')}>
                  <ButtonText dropDown={true}>Export as Doc</ButtonText>
                </DropDown>
                <DropDown onClick={(e) => handleExport(e, 'pdf')}>
                  <ButtonText dropDown={true}>Export as PDF</ButtonText>
                </DropDown>
              </DropDownCont>
            )}
          </DropdownForButton>

          <DropdownForButton ref={saveDropdownRef}>
            <Btnwrp>
              <SaveSearchBtn
                onClick={(e) => {
                  clickedOption.current = 'Save';
                  newsLetterId
                    ? handleSaveNewsLetter(e)
                    : handleOpenSavePopup(e);
                }}
                style={{ width: '5rem' }}
                className="save-btn"
              >
                <ButtonText>Save</ButtonText>
              </SaveSearchBtn>
              <DropDownWrp
                onClick={() => {
                  handleOpenClickSave();
                }}
              >
                <DropDownButton
                  size={'1rem'}
                  color={'#ffffff'}
                  isOpen={showDropDownOpen}
                />
              </DropDownWrp>
            </Btnwrp>
            {saveShowCustomComponentForSave && (
              <DropDownCont style={{ width: '9rem' }}>
                <DropDown
                  onClick={(e) => {
                    clickedOption.current = 'Publish';
                    newsLetterId
                      ? handleSaveNewsLetter(e)
                      : handleOpenSavePopup(e);
                  }}
                >
                  <ButtonText dropDown={true}>Save & Publish</ButtonText>
                </DropDown>
              </DropDownCont>
            )}
          </DropdownForButton>

          {/* <Button
            title={'Save'}
            backgroundColor={theme[selectedTheme].primary}
            onClick={(e) => {
              clickedOption.current = 'Save';
              newsLetterId ? handleSaveNewsLetter(e) : handleOpenSavePopup(e);
            }}
          />

          <Button
            title={'Save & Publish'}
            backgroundColor={theme[selectedTheme].primary}
            onClick={(e) => {
              clickedOption.current = 'Publish';
              newsLetterId ? handleSaveNewsLetter(e) : handleOpenSavePopup(e);
            }}
          /> */}
        </BtnWrp>
      </TopBarWrp>
    </>
  );
};
NewsLetterTopBar.propTypes = {
  newsLetterData: Proptypes.any,
  editMode: Proptypes.bool,
  activeElement: Proptypes.string,
  handleElementClick: Proptypes.func,
  handleBlur: Proptypes.func,
  setStateNewsLetterData: Proptypes.func,
  stateNewsLetterData: Proptypes.object,
  previousState: Proptypes.object,
  setPreviousState: Proptypes.func,
  setIsHandleCloseCalled: Proptypes.func,
  isHandleCloseCalled: Proptypes.bool,
  setIsUpdated: Proptypes.func,
  isUpdated: Proptypes.bool,
};
export default NewsLetterTopBar;
