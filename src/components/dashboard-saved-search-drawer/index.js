import { format } from 'date-fns';
import Proptypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Close from '../../assets/icons/Close';
import { sentiment, volume } from '../../constants';
import { theme } from '../../constants/theme';
import { getDateRange } from '../../constants/utils';
import { getTokenData } from '../../constants/validateToken';
import { useCreateSaveSearchData } from '../../hooks/useSaveSearch';
import { getSearchParams } from '../../utils';
import { Button } from '../button';
import {
  // ButtonBoxwpr,
  ButtonsContainer,
  FooterBoxwpr,
  LeftfootBoxwpr,
} from '../custom-drawer/index.sc';
import {
  BoldBoxwpr,
  Boldtxt,
  CheckBox,
  CheckBoxesContainer,
  Contentwpr,
  DescpWrp,
  Descwpr,
  HeaderWrp,
  IconWrp,
  Inputwpr,
  Labelbox,
  Labelwpr,
  MidBoxLeftWrap,
  MidBoxwpr,
  Midtxt,
  PercBoxwpr,
  PercInputwpr,
  SwitchBoxwpr,
  SwitchContainer,
  Switchwpr,
  TextAreaContainer,
  Titlewpr,
} from './index.sc';

const SwitchBox = ({
  headline = 'Alert Me for Changes in Volume',
  label1 = 'Search volume increases by',
  label2 = 'Search volume decreases by',
  description = 'Alerts are based on Search Volumes. You will receive alerts when the volume crosses 15% within the next 24 hours.',
  increase = 25,
  decrease = 25,
  setData,
  onHandleDataChange,
  name,
}) => {
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (checked) setShow(true);
    }, 350);
    setShow(false);
  }, [checked]);
  const handleCheckBox = () => {
    setChecked(!checked);
    onHandleDataChange &&
      onHandleDataChange(
        {
          inc: per1,
          dec: per2,
          incEnabled: check1,
          decEnabled: check2,
          isEnabled: !checked,
        },
        name
      );
  };
  const [per1, setPer1] = useState(increase);
  const [per2, setPer2] = useState(decrease);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const setDataCallback = useCallback(
    (data) => {
      setData(data);
    },
    [setData]
  );

  useEffect(() => {
    setDataCallback({
      increase: per1,
      decrease: per2,
    });
  }, [per1, per2, setDataCallback]);

  return (
    <SwitchBoxwpr checked={checked}>
      <BoldBoxwpr>
        <Boldtxt>{headline}</Boldtxt>
        <Switchwpr type="checkbox" id="switch" onChange={handleCheckBox} />
      </BoldBoxwpr>
      {show && checked && (
        <CheckBoxesContainer>
          <MidBoxwpr>
            <MidBoxLeftWrap>
              <CheckBox
                checked={check1}
                onChange={() => {
                  setCheck1(!check1);
                  onHandleDataChange &&
                    onHandleDataChange(
                      {
                        inc: per1,
                        dec: per2,
                        incEnabled: !check1,
                        decEnabled: check2,
                        isEnabled: !checked,
                      },
                      name
                    );
                }}
              />
              <Midtxt>{label1}</Midtxt>
            </MidBoxLeftWrap>

            <PercBoxwpr>
              <PercInputwpr
                value={per1}
                onChange={(e) => {
                  setPer1(e.target.value);
                  onHandleDataChange &&
                    onHandleDataChange(
                      {
                        inc: e.target.value,
                        dec: per2,
                        incEnabled: check1,
                        decEnabled: check2,
                        isEnabled: !checked,
                      },
                      name
                    );
                }}
                type="number"
                disabled={!check1}
              />
              %
            </PercBoxwpr>
          </MidBoxwpr>
          <MidBoxwpr>
            <MidBoxLeftWrap>
              <CheckBox
                checked={check2}
                onChange={() => {
                  setCheck2(!check2);
                  onHandleDataChange &&
                    onHandleDataChange(
                      {
                        inc: per1,
                        dec: per2,
                        incEnabled: check1,
                        decEnabled: !check2,
                        isEnabled: !checked,
                      },
                      name
                    );
                }}
              />
              <Midtxt>{label2}</Midtxt>
            </MidBoxLeftWrap>

            <PercBoxwpr>
              <PercInputwpr
                value={per2}
                onChange={(e) => {
                  setPer2(e.target.value);
                  onHandleDataChange &&
                    onHandleDataChange(
                      {
                        inc: per1,
                        dec: e.target.value,
                        incEnabled: !check1,
                        decEnabled: check2,
                        isEnabled: !checked,
                      },
                      name
                    );
                }}
                type="number"
                disabled={!check2}
              />
              %
            </PercBoxwpr>
          </MidBoxwpr>
          <Descwpr>{description}</Descwpr>
        </CheckBoxesContainer>
      )}
    </SwitchBoxwpr>
  );
};

SwitchBox.propTypes = {
  headline: Proptypes.string,
  label1: Proptypes.string,
  label2: Proptypes.string,
  description: Proptypes.string,
  increase: Proptypes.number,
  decrease: Proptypes.number,
  setData: Proptypes.func,
  onHandleDataChange: Proptypes.func,
  name: Proptypes.string,
};

const DashSearchDrwr = ({
  toggler,
  heading = 'Save Search',
  onHandleData,
  filters,
  guidedSection,
  query,
  recentSearchArticlesId,
  getUpdatedFilterData,
  setOverViewClick,
  overviewClick,
  pathName,
  selectedPath = '',
  handleSaveSearchData,
  selectedSavedSearch,
  selectedDashboardItems,
  eventCycle,
}) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const handleToggle = () => {
    toggler(false);
  };

  const authInfo = getTokenData();
  const { searchId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [volumebox, setVolumebox] = useState();
  // eslint-disable-next-line no-unused-vars
  const [sentimentbox, setSentimentbox] = useState();
  const [btnTxt, setBtnTxt] = useState(
    overviewClick && searchId === 'custom-search'
      ? 'Save & Continue'
      : 'Save Search'
  );
  const [volumePreference, setVolumePreference] = useState({});
  const [sentimentPreference, setSentimentPreference] = useState({});
  const { mutateAsync: CreateSaveSearch } = useCreateSaveSearchData(
    authInfo?.user_id
  );
  const Navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Title is required.');
      return;
    }
    // eslint-disable-next-line no-debugger

    let dateTimeFilters = {};

    const filterQuery = getUpdatedFilterData(filters);

    if (filters?.dateTime?.end) {
      dateTimeFilters = {
        ...filters?.dateTime,
        end: format(filters?.dateTime?.end, 'yyyy-MM-dd'),
        start: format(filters?.dateTime?.start, 'yyyy-MM-dd'),
        value: 'custom_range',
      };
    } else {
      const dateRange = getDateRange(filters?.dateTime?.value);
      const startDate = dateRange?.startDate;
      const endDate = dateRange?.endDate;
      dateTimeFilters = {
        ...filters?.dateTime,
        end: endDate,
        start: startDate,
      };
    }

    const payload = {
      title,
      description,
      alert_volume_enabled: volumePreference?.isEnabled ?? false,
      alert_volume_increase_enabled: volumePreference?.incEnabled ?? false,
      alert_volume_increase_by: parseInt(volumePreference?.inc) || 25,
      alert_volume_decrease_enabled: volumePreference?.decEnabled ?? false,
      alert_volume_decrease_by: parseInt(volumePreference?.dec) || 25,
      alert_sentiment_increase_enabled:
        sentimentPreference?.incEnabled ?? false,
      alert_sentiment_increase_by: parseInt(sentimentPreference?.inc) || 25,
      alert_sentiment_decrease_enabled:
        sentimentPreference?.decEnabled ?? false,
      alert_sentiment_decrease_by: parseInt(sentimentPreference?.dec) || 25,
      alert_sentiment_enabled: sentimentPreference?.isEnabled ?? false,
      created_by: authInfo?.user_id,
      search_params: JSON.stringify({
        filters: {
          filter: {
            ...filterQuery,
            dateTime: {
              ...dateTimeFilters,
            },
          },
          query,
        },
        isGuidedSearch: guidedSection,
      }),
      recent_search_id: recentSearchArticlesId,
    };
    try {
      setBtnTxt('Saving...');
      if (searchId === 'custom-search') {
        await CreateSaveSearch(payload, {
          onSuccess: (searchData) => {
            const item = searchData?.data?.data;
            let searchParams = JSON.parse(item?.search_params);
            searchParams = getSearchParams(searchParams);
            toast.success('Saved Successfully');
            item?.id &&
              Navigate(
                `/search-results/${item.id}/overview/${item.recent_search_id}`,
                {
                  state: {
                    data: null,
                    filters: searchParams?.filters,
                    isGuidedSearch: searchParams?.isGuidedSearch,
                    savedSearchData: item,
                    isCreatedFresh: !eventCycle,
                  },
                }
              );
            if ((overviewClick || selectedPath === '/') && item?.id) {
              Navigate(
                selectedPath?.includes('dashboard')
                  ? `/dashboard/${item.id}/${pathName}`
                  : selectedPath,
                {
                  state: {
                    filters: { ...filters, query },
                    search_name: item?.title,
                    recent_searchId: item?.recent_searchId,
                    // selectedItems: JSON.stringify(item),
                    selectedItems:
                      selectedPath.split('/')[3] === 'custom'
                        ? JSON.stringify(selectedDashboardItems)
                        : JSON.stringify(item),
                  },
                }
              );
              setOverViewClick(false);
            }
          },
        });
      } else {
        handleSaveSearchData();
      }
    } catch (error) {
      toast.error(
        'Failed to save the search query. Search query with this name already exists. Please use a different name to save the search.',
        {
          duration: 7000,
        }
      );
      console.log(error);
    } finally {
      setBtnTxt('Save Search');
      toggler(false);
    }
    onHandleData && onHandleData(payload);
    // DetailSearchUpdate({});
  };

  // const handleDetailSearchUpdate = (payload) => {
  //   return axiosPostRequest(
  //     '/detail-save-search',
  //     {},
  //     {
  //       title,
  //       description,
  //       setVolumebox,
  //       setSentimentbox,
  //     }
  //   );
  // };

  // const { mutate: DetailSearchUpdate } = useMutation({
  //   mutationFn: handleDetailSearchUpdate,
  //   onSuccess: () => {},
  // });

  const onHandleDataChange = (data, name) => {
    if (name === sentiment) {
      setSentimentPreference(data);
    } else if (name === volume) {
      setVolumePreference(data);
    }
  };

  useEffect(() => {
    if (searchId !== 'custom-search') {
      setTitle(selectedSavedSearch?.title);
      setDescription(selectedSavedSearch?.description);
    }
  }, [searchId, selectedSavedSearch]);

  return (
    <Contentwpr onSubmit={submitHandler}>
      {/* <Infowpr>
        <InfoIcon />
        <Infotxt>Save this search before creating dashboard</Infotxt>
      </Infowpr> */}
      <HeaderWrp>
        <Titlewpr>
          {overviewClick && searchId === 'custom-search'
            ? 'Save to continue'
            : heading}
        </Titlewpr>
        <IconWrp onClick={handleToggle}>
          <Close
            width="1.5rem"
            height="1.5rem"
            color={theme[selectedTheme].text}
          />
        </IconWrp>
      </HeaderWrp>
      {overviewClick && searchId === 'custom-search' && (
        <DescpWrp>
          {' '}
          Your search has to be saved to create Dashboards or Newsletters.
          Please save your search and continue.
        </DescpWrp>
      )}
      <Labelbox>
        <span>Title</span>
        <Labelwpr htmlFor="title">
          <Inputwpr
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </Labelwpr>
      </Labelbox>
      <Labelbox>
        <span>Description</span>
        <TextAreaContainer
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Labelbox>
      <SwitchContainer>
        <SwitchBox
          setData={setVolumebox}
          onHandleDataChange={onHandleDataChange}
          name={volume}
        />
        <SwitchBox
          setData={setSentimentbox}
          headline="Alert Me for Changes in Sentiment"
          label1="Net sentiment increases by"
          label2="Net sentiment decreases by"
          description="Alerts are based on Search Volumes. You will receive alerts when the volume crosses 15% within the next 24 hours."
          onHandleDataChange={onHandleDataChange}
          name={sentiment}
        />
      </SwitchContainer>
      <FooterBoxwpr mt={1.5} style={{ padding: '0.75rem 0 0rem' }}>
        <LeftfootBoxwpr></LeftfootBoxwpr>
        <ButtonsContainer>
          <Button
            title={'Cancel'}
            backgroundColor={theme[selectedTheme].background}
            color={theme[selectedTheme].primary}
            onClick={handleToggle}
            border={theme[selectedTheme].primary}
          />
          <Button
            type="submit"
            title={btnTxt}
            backgroundColor={theme[selectedTheme].primary}
            // disable={!title.length || !description.length}
            // onClick={handleSubmit}
            disableStyle={{
              background: theme[selectedTheme].borders,
              border: 'none',
              color: theme[selectedTheme].background,
            }}
          />
        </ButtonsContainer>
      </FooterBoxwpr>
    </Contentwpr>
  );
};

DashSearchDrwr.propTypes = {
  toggler: Proptypes.func.isRequired,
  heading: Proptypes.string,
  onHandleData: Proptypes.func,
  filters: Proptypes.object,
  guidedSection: Proptypes.bool,
  query: Proptypes.string || Proptypes.object,
  recentSearchArticlesId: Proptypes.string,
  getUpdatedFilterData: Proptypes.func,
  setOverViewClick: Proptypes.func,
  overviewClick: Proptypes.bool,
  pathName: Proptypes.string,
  selectedPath: Proptypes.string,
  handleSaveSearchData: Proptypes.func,
  selectedSavedSearch: Proptypes.any,
  selectedDashboardItems: Proptypes.object,
  eventCycle: Proptypes.string,
};

// this is the formate how we have to use this component

// const Howtouse = () => {
// const [show, setShow] = useState(false);
// return (
//   <>
//     <button onClick={() => setShow(true)}>click</button>
//     <DashboardPopup
//       popContent={<DashSearchDrwr toggler={setShow} />}
//       padding="1.75rem"
//       open={show}
//       toggler={setShow}
//       borderRadius="1rem"
//     />
//   </>
// );
// };

export default DashSearchDrwr;
