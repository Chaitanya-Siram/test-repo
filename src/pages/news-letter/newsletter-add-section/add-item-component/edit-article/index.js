import React, { useState } from 'react';
import {
  // ButtonBoxwpr,
  ButtonWrp,
  ContentWrp,
  HeaderDespWrp,
  HeaderTandDWrap,
  InputWrp,
  MainWrp,
} from './index.sc';
import PropTypes from 'prop-types';
import { theme } from '../../../../../constants/theme';
import MultiFilter from '../../../../../components/edit-article-filter-component';
import {
  Headerleftwpr,
  Headerwrap,
  Heaerlblwrp,
  Iconwpr,
} from '../../../../../components/custom-drawer/index.sc';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../components/button';
import { ErrorMessage } from '../../../../../components/multiple-filter-component/index.sc';
import Close from '../../../../../assets/icons/Close';
import { useGetArticleLinkDataNewsletter } from '../../../../../hooks/useSaveNewsLetter';
import { getParsedDate } from '../../../../../constants';
import { LinkMsg } from '../../../../../components/edit-article-filter-component/index.sc';
import toast from 'react-hot-toast';
import SimilarData from './SimilarData';

const EditArticle = ({ handleClose, btnTxt, initialData, onSubmit }) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchButtonText, setButtonText] = useState('Fetch Link');
  const [showFields, setShowFields] = useState(!!initialData);
  const defaultValues = {
    author: '',
    content: '',
    date: '',
    imagePublicUrl: '',
    link: '',
    newsType: '',
    place: '',
    publication: '',
    title: '',
  };

  const defaultData = [{ title: '', link: '' }];

  const [entryData, setEntryData] = useState(initialData || defaultValues);
  const [similarNewsData, setSimilarNewsData] = useState(
    initialData && Array?.isArray(initialData?.syndication_data)
      ? initialData?.syndication_data
      : [...defaultData]
  );
  const [showSimilarNews, setShowSimilarNews] = useState(
    initialData &&
      Array?.isArray(initialData?.syndication_data) &&
      initialData?.syndication_data?.length > 0
  );
  const { mutateAsync: articleLinkDataFunc } =
    useGetArticleLinkDataNewsletter();
  const handleToggle = () => {
    handleClose();
  };

  const fetchArticle = async () => {
    try {
      setButtonText('Fetching...');
      const response = await articleLinkDataFunc(entryData?.link);
      if (!response?.isSuccessful) {
        toast.error('Error while fetching the Article.');
      }
      const addedNewObj = {
        ...response?.data?.data,
        date: getParsedDate(
          response?.data?.data?.date,
          'MM/dd/yyyy',
          'yyyy-MM-dd'
        ),
      };
      setEntryData({
        ...addedNewObj,
        newsType: addedNewObj?.type,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setButtonText('Fetch Link');
      setShowFields(true);
    }
  };

  const FormTexts = {
    title: initialData ? 'Edit Article' : 'Add Article',
    description: 'Edit Article Details',
  };

  return (
    <MainWrp>
      <InputWrp>
        <Headerwrap addArticle={true}>
          <HeaderTandDWrap>
            <Headerleftwpr>
              <Heaerlblwrp isEdit={true}>{FormTexts?.title}</Heaerlblwrp>
            </Headerleftwpr>
            <HeaderDespWrp>{FormTexts?.description}</HeaderDespWrp>
          </HeaderTandDWrap>
          <Iconwpr onClick={handleToggle}>
            <Close color={'#1C1B1F'} width="20" height="20" />
          </Iconwpr>
        </Headerwrap>
        <ContentWrp>
          <MultiFilter
            entryData={entryData}
            setEntryData={setEntryData}
            onLinkFetch={fetchArticle}
            fetchButtonText={fetchButtonText}
            showFields={showFields}
            similarNewsData={similarNewsData}
            setSimilarNewsData={setSimilarNewsData}
            setShowSimilarNews={setShowSimilarNews}
            showSimilarNews={showSimilarNews}
          />

          {/* <LinkMsg>
            Once the article is fetched, you can verify the details.
          </LinkMsg> */}
        </ContentWrp>
        {errorMessage && (
          <ErrorMessage style={{ alignSelf: 'start' }}>
            {errorMessage}
          </ErrorMessage>
        )}

        <ButtonWrp>
          <Button
            title={'Cancel'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={handleClose}
            border={theme[selectedTheme].primary}
          />
          <Button
            title={btnTxt}
            backgroundColor={theme[selectedTheme].primary}
            onClick={() => {
              setErrorMessage('');
              if (Object.keys(defaultValues).some((x) => !entryData[x])) {
                setErrorMessage('Kindly fill in the all missing fields.');
              } else if (
                showSimilarNews &&
                similarNewsData
                  ?.filter((x) => x?.link || x?.title)
                  ?.some((x) => !x?.title || !x?.link)
              ) {
                setErrorMessage('Kindly enter Publication Names and Links.');
              } else {
                onSubmit &&
                  onSubmit(
                    {
                      ...entryData,
                      shouldShowOption: showSimilarNews,
                      syndication_data: showSimilarNews ? similarNewsData : [],
                    },
                    !!initialData
                  );
              }
            }}
            type="submit"
          />
        </ButtonWrp>
      </InputWrp>
    </MainWrp>
  );
};

EditArticle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  btnTxt: PropTypes.string,
  initialData: PropTypes.object,
};

export default EditArticle;
