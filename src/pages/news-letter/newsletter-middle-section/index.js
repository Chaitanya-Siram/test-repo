import React, {
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  HoverContainer,
  ImageUploadPopupOver,
  LogoHeaderDate,
  LogoText,
  NewsLetterBackground,
  NewsLetterBannerDescription,
  NewsLetterBannerInput,
  NewsLetterDescriptionHoverContainer,
  NewsLetterInputHoverContainer,
  NewsletterDateHoverContainer,
  NewsletterWrp,
  // NewsletterTitle,
  // NewsletterTitleText,
  TitleBox,
  TitleBoxBottomRightText,
  TitleBoxBottomText,
  TitleBoxBottomWrp,
  TitleBoxWrp,
} from './index.sc';
import Proptypes from 'prop-types';
import { formatDate } from '../../../utils';
import DashboardPopup from '../../../components/dasboard-popup';
import SelectTemplate from '../newsletter-add-section/add-item-component/select-template';
import SeletTempPopUpContent from '../newsletter-add-section/add-item-component/PopUpContent';
import ImageUploadIcon from '../../../assets/icons/ImageUpload';
import {
  CSVInput,
  CSVLabel,
  CSVWrp,
} from '../../../components/multiple-filter-component/index.sc';
import SectionColorPicker from '../newsletter-add-section/add-item-component/section-color-picker';
import { useFetchChartFileNewsLetter } from '../../../hooks/useSaveNewsLetter';
import toast from 'react-hot-toast';
import Spinner from '../../../components/spinner';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import Logo from '../../../assets/icons/Logo';

const NewsLetterMiddleSection = ({
  newsLetterData,
  editMode,
  activeElement,
  handleElementClick,
  handleBlur,
  setStateNewsLetterData,
}) => {
  const [bannerDetails, setBannerDetails] = useState({});

  const currentDate = useMemo(() => formatDate(new Date()), []);
  const textAreaTitleBox = useRef(null);
  const textAreaDesBox = useRef(null);
  const fileInputRef = useRef(null);

  const [showOpts, setShowOpts] = useState(false);
  const [showSelectTempPopup, setShowSelectTempPopup] = useState(false);
  const [showTempSettings, setShowTempSettings] = useState(false);

  const [titleColor, setTitleColor] = useState(
    newsLetterData?.title_color || '#000000'
  );
  const [descriptionColor, setDescriptionColor] = useState(
    newsLetterData?.content_color || '#000000'
  );
  const [bannerBackgroundColor, setBannerBackgroundColor] = useState(
    newsLetterData?.background_color || '#ffffff'
  );
  const [dateColor, setDateColor] = useState(
    newsLetterData?.date_color || '#000000'
  );
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    newsLetterData?.background_image || ''
  );
  const [logoUrl, setLogoUrl] = useState(newsLetterData?.logo_image || '');
  const [loading, setLoading] = useState(false);

  const dropDownList = ['Select Template'];

  const { mutateAsync: chartImgfunc } = useFetchChartFileNewsLetter();

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const onClickHandler = (data) => {
    if (data === 'Select Template') {
      setShowSelectTempPopup(true);
      setShowOpts(false);
    } else {
      setShowTempSettings(true);
      setShowOpts(false);
    }
  };

  const [bannerWrapperHover, setBannerWrapperHover] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [dateHover, setDateHover] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [descriptionHover, setDescriptionHover] = useState(false);

  // const currentDate = useMemo(() => new Date().toISOString(), []);

  useEffect(() => {
    setBannerDetails({
      bannerTitle: newsLetterData?.title,
      bannerDec: newsLetterData?.content,
    });
    // if (!newsLetterData?.publishedOn) {
    //   setStateNewsLetterData((prev) => ({ ...prev, publishedOn: currentDate }));
    // }
  }, [currentDate, newsLetterData, setStateNewsLetterData]);

  useEffect(() => {
    setTitleColor(newsLetterData?.title_color || '#000000');
    setDescriptionColor(newsLetterData?.content_color || '#000000');
    setBackgroundImageUrl(newsLetterData?.background_image || '');
    setBannerBackgroundColor(newsLetterData?.background_color || '#ffffff');
    setDateColor(newsLetterData?.date_color || '#000000');
    setLogoUrl(newsLetterData?.logo_image || '');
  }, [
    newsLetterData?.title_color,
    newsLetterData?.content_color,
    newsLetterData?.background_image,
    newsLetterData?.background_color,
    newsLetterData?.date_color,
    newsLetterData?.logo_image,
  ]);

  const changeBannerDetails = (e) => {
    const { name, value } = e.target;
    setBannerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setStateNewsLetterData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleToggleSelectTempPopup = () => {
    setShowSelectTempPopup((prev) => !prev);
  };

  const applyTemplate = (template) => {
    try {
      setTitleColor(template?.config?.titleColor);
      setDescriptionColor(template?.config?.descriptionColor);
      setDateColor(template?.config?.dateColor);
      setBannerBackgroundColor(template?.config?.backgroundColor);
      if (template?.config?.imageUrl) {
        setBackgroundImageUrl(template?.config?.imageUrl);
      } else {
        setBackgroundImageUrl('');
      }
      setStateNewsLetterData((prevData) => ({
        ...prevData,
        title_color: template?.config?.titleColor,
        content_color: template?.config?.descriptionColor,
        date_color: template?.config?.dateColor,
        background_color: template?.config?.backgroundColor,
        background_image:
          template?.config?.imageUrl && backgroundImageUrl
            ? backgroundImageUrl
            : template?.config?.imageUrl
            ? template?.config?.imageUrl
            : '',
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setShowSelectTempPopup((prev) => !prev);
    }
  };

  const calculateRows = (text, textareaWidth) => {
    // const lines = text?.split('\n')?.length;
    // return Math.max(lines, 1);
    const charactersPerLine = textareaWidth / 6; // Adjust this value based on your font size and layout
    const linesFromNewLines = text?.split('\n')?.length;
    const linesFromContinuedText = Math.ceil(text?.length / charactersPerLine);
    return Math.max(linesFromNewLines, linesFromContinuedText, 1);
  };

  const handleSaveOptionChange = async (
    option,
    setImageUrl,
    type,
    name,
    callBackFn
  ) => {
    setLoading(true);
    try {
      const chartFile = option.target.files[0];
      const formData = new FormData();
      formData.append('image_file', chartFile);
      formData.append('image_type', type);
      if (chartFile && chartFile.size <= 10 * 1024 * 1024) {
        const allowFiles = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowFiles.includes(chartFile?.type)) {
          toast.error('Only PNG, JPG and JPEG Files are allowed.');
        } else {
          const resp = await chartImgfunc(formData);
          if (resp?.data?.image_url) {
            setImageUrl(resp?.data?.image_url);
            setStateNewsLetterData((prevData) => ({
              ...prevData,
              [name]: resp?.data?.image_url,
            }));
          }
          if (resp?.data?.error) {
            toast.error(resp?.data?.error);
          }
        }
      } else if (chartFile && chartFile.size >= 10 * 1024 * 1024) {
        toast.error(
          'File size is greater than 10 MB. Kindly upload another file.'
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      if (fileInputRef?.current) {
        fileInputRef.current.value = '';
      }
      callBackFn && callBackFn();
    }
  };

  // console.log(showSelectTempPopup);

  return (
    <NewsLetterBackground id="newsletter-top">
      {loading && <Spinner />}
      <NewsletterWrp
        onMouseEnter={() => {
          setBannerWrapperHover(true);
        }}
        onMouseLeave={() => {
          setTimeout(() => {
            setBannerWrapperHover(false);
          }, 250);
        }}
      >
        <TitleBox
          backgroundColor={bannerBackgroundColor}
          backgroundImageUrl={backgroundImageUrl}
        >
          <TitleBoxWrp>
            <LogoHeaderDate>
              <HoverContainer
                onMouseLeave={() => {
                  setTimeout(() => {
                    setLogoHover(false);
                  }, 200);
                }}
                onMouseEnter={() => {
                  setLogoHover(true);
                }}
              >
                {!logoUrl && <Logo />}
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt="logo"
                    width={'100%'}
                    height={'40px'}
                  />
                )}
                <SectionColorPicker
                  showFontColor={false}
                  showBackground={false}
                  showImageUpload={true}
                  onChangeImage={(option, callBackFn) => {
                    handleSaveOptionChange(
                      option,
                      setLogoUrl,
                      'logo',
                      'logo_image',
                      callBackFn
                    );
                  }}
                  show={logoHover}
                  dimensionsText="500x500, 5MB"
                />
              </HoverContainer>
              <NewsletterDateHoverContainer
                onMouseLeave={() => {
                  setTimeout(() => {
                    setDateHover(false);
                  }, 200);
                }}
                onMouseEnter={() => {
                  setDateHover(true);
                }}
              >
                <TitleBoxBottomRightText dateColor={dateColor}>
                  {formatDate(currentDate, 'EEEE, MMMM d, yyyy')}
                </TitleBoxBottomRightText>

                <SectionColorPicker
                  onChangeColor={(color) => {
                    setDateColor(color);
                    setStateNewsLetterData((prevData) => ({
                      ...prevData,
                      date_color: color,
                    }));
                  }}
                  defaultColor={'#000000'}
                  color={dateColor}
                  show={dateHover}
                />
              </NewsletterDateHoverContainer>
            </LogoHeaderDate>
            {/* {editMode && activeElement === 'title' ? ( */}
            <NewsLetterInputHoverContainer
              onMouseLeave={() => {
                setTimeout(() => {
                  setInputHover(false);
                }, 300);
              }}
              onMouseEnter={() => {
                setInputHover(true);
              }}
            >
              <NewsLetterBannerInput
                ref={textAreaTitleBox}
                name="title"
                value={bannerDetails?.bannerTitle}
                placeholder="Newsletter Title"
                onChange={changeBannerDetails}
                onBlur={handleBlur}
                autoFocus
                titleColor={titleColor}
                rows={calculateRows(bannerDetails?.bannerTitle, 300)}
              />
              <SectionColorPicker
                onChangeColor={(color) => {
                  setTitleColor(color);
                  setStateNewsLetterData((prevData) => ({
                    ...prevData,
                    title_color: color,
                  }));
                }}
                defaultColor={'#000000'}
                color={titleColor}
                show={inputHover}
              />
            </NewsLetterInputHoverContainer>

            <NewsLetterDescriptionHoverContainer
              onMouseLeave={() => {
                setTimeout(() => {
                  setDescriptionHover(false);
                }, 250);
              }}
              onMouseEnter={() => {
                setDescriptionHover(true);
              }}
            >
              <NewsLetterBannerDescription
                name="content"
                placeholder="Banner Description"
                value={bannerDetails?.bannerDec}
                onChange={changeBannerDetails}
                onBlur={handleBlur}
                descriptionColor={descriptionColor}
                rows={calculateRows(bannerDetails?.bannerDec, 300)}
              ></NewsLetterBannerDescription>
              <SectionColorPicker
                onChangeColor={(color) => {
                  setDescriptionColor(color);
                  setStateNewsLetterData((prevData) => ({
                    ...prevData,
                    content_color: color,
                  }));
                }}
                defaultColor={'#000000'}
                color={descriptionColor}
                show={descriptionHover}
              />
            </NewsLetterDescriptionHoverContainer>

            {/* ) : ( */}
            {/* <NewsletterTitleText
              onClick={() => {
                handleElementClick('description');
              }}
              >
              {bannerDetails.bannerDec}
              </NewsletterTitleText>
            )} */}
          </TitleBoxWrp>
        </TitleBox>
        <DashboardPopup
          popContent={
            <SeletTempPopUpContent
              cancelToggler={handleToggleSelectTempPopup}
              applyTemplate={applyTemplate}
            />
          }
          padding="2rem"
          open={showSelectTempPopup}
          toggler={handleToggleSelectTempPopup}
          borderRadius="1.5rem"
          width={'30vw'}
          Cross={true}
        />
        <SelectTemplate
          dropDownList={dropDownList}
          onClickHandler={onClickHandler}
          setShowOpts={setShowOpts}
          showOpts={showOpts}
        />

        <SectionColorPicker
          onChangeBackgroundColor={(hex) => {
            setBannerBackgroundColor(hex);
            setBackgroundImageUrl('');
            setStateNewsLetterData((prevData) => ({
              ...prevData,
              background_color: hex,
              background_image: '',
            }));
          }}
          backgroundColor={bannerBackgroundColor}
          defaultBackgroundColor={'#ffffff'}
          showBackground={true}
          showFontColor={false}
          showImageUpload={true}
          onChangeImage={(option, callBackFn) =>
            handleSaveOptionChange(
              option,
              setBackgroundImageUrl,
              'background',
              'background_image',
              callBackFn
            )
          }
          show={bannerWrapperHover && !showOpts}
          dimensionsText="1920x1080, 10 MB"
        />
      </NewsletterWrp>
    </NewsLetterBackground>
  );
};
NewsLetterMiddleSection.propTypes = {
  newsLetterData: Proptypes.object,
  editMode: Proptypes.bool,
  activeElement: Proptypes.string,
  handleElementClick: Proptypes.func,
  handleBlur: Proptypes.func,
  setStateNewsLetterData: Proptypes.func,
};

export default NewsLetterMiddleSection;
