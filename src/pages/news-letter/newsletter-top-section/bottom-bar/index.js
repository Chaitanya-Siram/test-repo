import React, { useEffect, useRef, useState } from 'react';
import {
  AllDaysText,
  AllDaysWrap,
  Boldtxtwpr,
  BottomBarWrp,
  BtnWrp,
  CustomCheckbox,
  DailyDateWrapper,
  DateForm,
  DateLabelsWrp,
  DatePopUp,
  DaysContWrp,
  DaysTab,
  DropDownButton,
  EmailBox,
  EmailPop,
  ErrorText,
  InputDate,
  Inputwpr,
  LabelCustm,
  LabelInputCont,
  Lightwpr,
  ListContainer,
  ListItems,
  PopUpMiddleWrap,
  Popbtnwpr,
  PopupBottomWrap,
  PopupBottonWrp,
  Popupheader,
  RadioBtnCustm,
  SelectedDatePickerWrp,
  SelectedPopupText,
  SelectedPopupWrap,
  SelectedText,
  SelectedWrp,
  // SubmitButton,
  // SubmitButtonText,
  SubmitButtonWrapper,
  SwichBox,
  TimePopUp,
  UnorderedList,
} from './index.sc';
// import DashboardPopup from '../../../../components/dasboard-popup';
import Nwsbtnpop from '../../../../components/icon-popup';
import {
  // Frames,
  Times,
  Types,
  convertTo12HourFormat,
  // contents,
} from '../../../../components/search-popup/contents';
import Proptypes from 'prop-types';
// import SearchPopup from '../../../../components/search-popup/SearchPopContent';
import Close from '../../../../assets/icons/Close';
import { theme } from '../../../../constants/theme';
import { useSelector } from 'react-redux';
import { Button } from '../../../../components/button';

// my code
import { Days } from './Days';
import { Dates } from './Dates';
import { HorizontalLine } from '../../../../components/tabs/index.sc';
import { formatDate } from '../../../../utils';
import { format } from 'date-fns';
import { convertDate } from '../../../../constants/utils';
// import { useLocation } from 'react-router-dom';

const NewsLetterBottomBar = ({
  searchSelect,
  setSearchSelect,
  newsLetterData,
  savedSearchData,
  setSelectedSearchData,
  selectedSearchData,
  setStateNewsLetterData,
}) => {
  // const [openSearch, setopenSearch] = useState(false);
  const [time, setTime] = useState();
  const [type, setType] = useState();

  const [emailPop, setEmailPop] = useState(false);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const handleTime = (id) => {
    const item = Times.filter((item) => item.id === id)[0];
    setTime(item);
  };

  const handleType = (id) => {
    const item = Types.filter((item) => item.id === id)[0];
    setType(item?.value);
    setStateNewsLetterData((prev) => ({ ...prev, publish_type: item?.value }));
  };

  // Just Commented for the future reference
  // const handleSearched = (content) => {
  //   setSelectedSearchData(content);
  //   setSelectedSearch(content.title);
  // };

  const [isValidEmail, setIsValidEmail] = useState(true);

  // const handleEmails = (e) => {
  //   e.stopPropagation();
  //   if (validateEmail(email)) {
  //     setEmails([...emails, email]);
  //     setEmail('');
  //     setIsValidEmail(true);
  //     setEmailPop(false);
  //   } else {
  //     setIsValidEmail(false);
  //     setEmailPop(true);
  //     setTimeout(() => {
  //       setIsValidEmail(true);
  //     }, 5000);
  //   }
  // };

  const handleEmails = (e) => {
    e.stopPropagation();
    const enteredEmails = email.split(',').map((email) => email.trim());
    const validEnteredEmails = enteredEmails.filter((email) =>
      validateEmail(email)
    );

    if (validEnteredEmails.length > 0) {
      setEmails([...emails, ...validEnteredEmails]);
      setStateNewsLetterData((prev) => ({
        ...prev,
        recipients: [...emails, ...validEnteredEmails],
      }));
      setEmail('');
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
      setEmailPop(true);
      setTimeout(() => {
        setIsValidEmail(true);
      }, 5000);
    }
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[\w+.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}(?:,[\w+.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})*$/;
    return emailRegex.test(email);
  };

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const emailPopRef = useRef(null);
  const datePopRef = useRef(null);
  const timePopRef = useRef(null);

  const handleClickOutside = (event) => {
    if (emailPopRef.current && !emailPopRef.current.contains(event.target)) {
      setEmailPop(false);
    }
    if (datePopRef.current && !datePopRef.current.contains(event.target)) {
      setShowDateComponent(false);
    }
    if (timePopRef.current && !timePopRef.current.contains(event.target)) {
      setShowTimeComponent(false);
    }
  };

  const handleEmailInputClick = (e) => {
    e.stopPropagation();
  };

  const handleCancel = (e, type, emailToRemove) => {
    e.stopPropagation();
    if (type === 'search') {
      setSearchSelect(null);
    } else if (type === 'time') {
      setTime(null);
    } else if (type === 'type') {
      setType(null);
      setStateNewsLetterData((prev) => ({ ...prev, publish_type: '' }));
    } else if (type === 'email') {
      setEmails(emails.filter((email) => email !== emailToRemove));
      setStateNewsLetterData((prev) => ({
        ...prev,
        recipients: emails.filter((email) => email !== emailToRemove),
      }));
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // My code
  const [showDateComponent, setShowDateComponent] = useState(false);
  const [showTimeComponent, setShowTimeComponent] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedDate, setSelectedDate] = useState('daily');
  const [selectedDateValue, setSelectedDateValue] = useState('');
  const [daysSelected, setDaysSelected] = useState([]);
  const [sendTime, setSendTime] = useState('');
  const [showIconPop, setShowIconPop] = useState(false);
  // const [selectedSearch, setSelectedSearch] = useState('');

  const [isCheckedAllDays, setIsCheckedAllDays] = useState(false);
  // const location = useLocation();

  // const searchId = location?.state?.searchId;

  useEffect(() => {
    const allDaysLabels = Days.map((day) => day.value);
    setIsCheckedAllDays(
      daysSelected.length === allDaysLabels.length &&
        daysSelected.every((day) => allDaysLabels.includes(day))
    );
  }, [daysSelected]);

  const handleDateClick = (e) => {
    setShowDateComponent(!showDateComponent);
    setShowTimeComponent(false);
    setShowIconPop(false);
    setEmailPop(false);
    e.stopPropagation();
  };
  const handleDropDownClick = (e) => {
    e.stopPropagation();
    setShowDropDown(!showDropDown);
    setShowTimeComponent(false);
  };

  const handleDailyClick = (e, value, valueObj) => {
    e.stopPropagation();
    setDaysSelected((prev) => {
      const prevValueString = prev?.map((item) => item.toString());
      const newValue = [valueObj]?.map((item) => item?.value).toString();
      if (!prev.includes(value) && !prevValueString.includes(newValue)) {
        setStateNewsLetterData((prevData) => ({
          ...prevData,
          sendOn_dateType: selectedDate,
          send_type: selectedDate,
          sendOn_value: [...prev, valueObj],
          send_type_option: [...prevValueString, newValue],
        }));
        return [...prevValueString, newValue];
      } else {
        setStateNewsLetterData((prevData) => ({
          ...prevData,
          sendOn_dateType: selectedDate,
          send_type: selectedDate,
          sendOn_value: prev.filter((item) => item !== valueObj),
          send_type_option: prevValueString.filter((item) => item !== newValue),
        }));

        return prevValueString.filter((item) => item !== newValue);
      }
    });

    // const selectedDaysArr = daysSelected;
    // if (!daysSelected.includes(i)) {
    //   selectedDaysArr.push(i);
    // } else {
    //   const index = selectedDaysArr.indexOf(i);
    //   selectedDaysArr.splice(index, 1);
    // }
    // setDaysSelected(selectedDaysArr);
    // const selectedDaysLabel = selectedDaysArr.map((ele) => Days[ele].label);
    // setSelectedDateValue(selectedDaysLabel.join(', '));
  };
  const handleOneTimeClick = (e, selected) => {
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}`;
    setSelectedDateValue(e.target.value);
    setSelectedDate(selected);

    setStateNewsLetterData((prev) => ({
      ...prev,
      send_on: formatDate(new Date()),
      sendOn_dateType: selected,
      send_type: 'onetime',
      send_type_option: [e.target.value],
    }));
    e.stopPropagation();
  };

  const onDateClick = (e, day) => {
    e.stopPropagation();
    setSelectedDateValue(day);
    setShowDropDown(false);
    setShowIconPop(false);
    setEmailPop(false);
    setStateNewsLetterData((prev) => ({
      ...prev,
      send_on: formatDate(new Date()),
      sendOn_dateType: day,
      send_type: 'monthly',
      send_type_option: [day],
    }));
  };

  const onTimeChange = (event) => {
    event.stopPropagation();
    setSendTime(event.target.value);
    setTime(event.target.value);
    setStateNewsLetterData((prev) => ({
      ...prev,
      send_time: event.target.value,
    }));
  };
  const handleRadio = (e, selected) => {
    e.stopPropagation();
    if (selected !== 'monthly') {
      setShowDropDown(false);
      setSelectedDateValue('');
    }
    if (selected !== 'onetime') {
      setSelectedDateValue('');
    }
    setSelectedDate(selected);
    if (selected === 'monthly') {
      setSelectedDateValue('1');
      // setSelectedDateValue(selected === 'monthly' ? '1 st' : '');
      setStateNewsLetterData((prev) => ({
        ...prev,
        send_on: formatDate(new Date()),
        sendOn_dateType: selected,
        send_type: 'monthly',
        send_type_option: [selectedDateValue || '1'],
      }));
    } else if (selected === 'onetime') {
      const date = format(new Date(), 'yyyy-MM-dd');
      setSelectedDateValue(date);
      setStateNewsLetterData((prev) => ({
        ...prev,
        send_on: formatDate(new Date()),
        sendOn_dateType: selected,
        send_type: 'onetime',
        send_type_option: [date],
      }));
    }
    // if (selected === 'Send Now') {
    //   const currentDate = new Date();
    //   const year = currentDate.getFullYear();
    //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    //   const day = currentDate.getDate().toString().padStart(2, '0');
    //   const formattedDate = `${year}-${month}-${day}`;

    //   setSelectedDateValue(formatDate(new Date()));
    //   setStateNewsLetterData((prev) => ({
    //     ...prev,
    //     send_on: formatDate(new Date()),
    //     sendOn_dateType: selected,
    //     send_type: 'SendNow',
    //     send_type_option: [formattedDate],
    //   }));
    // }
    setDaysSelected([]);
  };

  const [showSelectedTime, setShowSelectedTime] = useState(false);

  const handleTimeClick = (e) => {
    e.stopPropagation();
    setShowTimeComponent(!showTimeComponent);
    setShowDateComponent(false);
    setShowIconPop(false);
    setEmailPop(false);
  };

  const handleCheckboxOnchange = () => {
    setIsCheckedAllDays((prev) => !prev);
    if (!isCheckedAllDays) {
      const allDaysLabels = Days.map((day) => day.label);
      const allDaysObj = Days.map((day) => day?.value);
      setDaysSelected(allDaysObj);
      setStateNewsLetterData((prev) => ({
        ...prev,
        sendOn_dateType: selectedDate,
        send_type: selectedDate,
        sendOn_value: [...allDaysObj],
        send_type_option: [...allDaysObj],
      }));
    } else {
      setDaysSelected([]);
      setStateNewsLetterData((prev) => ({
        ...prev,
        sendOn_value: [],
        send_type_option: [],
      }));
    }
  };

  const handleTimeSubmit = (e) => {
    e.stopPropagation();
    setShowSelectedTime(true);
    setShowTimeComponent(false);
    setTime(sendTime);
    setStateNewsLetterData((prev) => ({ ...prev, send_time: sendTime }));
  };
  useEffect(() => {
    if (newsLetterData) {
      if (newsLetterData?.send_type === 'Send Now') {
        // setSelectedDate(newsLetterData.send_on ? 'Send Now' : 'Daily');
        setSelectedDate('now');
        setSelectedDateValue(newsLetterData?.send_type_option);
      }
      // if (newsLetterData.sendOn) {
      //   setDateType(newsLetterData.sendOn?.dateType);
      // }
      if (newsLetterData?.send_type === 'daily') {
        if (newsLetterData?.send_type_option?.length > 0) {
          setSelectedDate('daily');
          const selectedDays = newsLetterData?.send_type_option?.map(
            (day) => day
          );
          setDaysSelected([...selectedDays]);
        }
        // else {
        //   setSelectedDateValue(newsLetterData?.send_type);
        // }
      } else if (newsLetterData?.send_type === 'onetime') {
        setSelectedDate('onetime');
        setSelectedDateValue(
          newsLetterData?.send_type_option[0] ??
            format(new Date(), 'yyyy-MM-dd')
        );
      } else if (
        newsLetterData?.send_type === 'monthly' &&
        newsLetterData?.id
      ) {
        setSelectedDate('monthly');
        setSelectedDateValue(
          newsLetterData?.id ? newsLetterData?.send_type_option[0] : '1'
        );
      }
      // if (newsLetterData?.send_type !== ('onetime' || 'daily')) {
      //   setSelectedDateValue('1 st');
      // }

      if (newsLetterData.publish_type) {
        setType(newsLetterData.publish_type);
      }
      if (newsLetterData.statusActive) {
        setType(newsLetterData.statusActive);
      }

      if (newsLetterData.recipients && newsLetterData.recipients.length > 0) {
        setEmails(newsLetterData.recipients);
      }

      if (newsLetterData?.send_time) {
        setSendTime(newsLetterData.send_time);
        setShowSelectedTime(true);
      }
    }
    // Just Commented for the future reference

    // if (searchId && !selectedSearchData) {
    //   const details = savedSearchData?.data?.data?.filter(
    //     (el, index) => el?.id === searchId
    //   );
    //   if (details) {
    //     setSelectedSearch(details[0]?.title);
    //     setSelectedSearchData(details[0]);
    //   }
    // } else {
    //   setSelectedSearchData(selectedSearchData);
    // }
  }, [
    newsLetterData,
    savedSearchData,
    // searchId,
    // setSelectedSearchData,
    // selectedSearchData,
  ]);

  return (
    <BottomBarWrp>
      {/* // Just Commented for the future reference */}
      {/* <SwichBox width="20%">
        <Boldtxtwpr>Select Search</Boldtxtwpr>
        <Lightwpr
          opacity={selectedSearch}
          onClick={() => {
            setopenSearch(true);
            setShowTimeComponent(false);
            setShowDateComponent(false);
            setShowIconPop(false);
            setEmailPop(false);
          }}
        >
          {selectedSearch ? (
            <>
              <SelectedWrp>
                <SelectedText>{selectedSearch}</SelectedText>
                <BtnWrp onClick={(e) => handleCancel(e, 'search')}>
                  <Close
                    color={theme[selectedTheme].text}
                    height="16"
                    width="16"
                  />
                </BtnWrp>
              </SelectedWrp>
            </>
          ) : (
            <Popbtnwpr>
              <span>{'Select'}</span>
            </Popbtnwpr>
          )}
        </Lightwpr>
        <DashboardPopup
          toggler={setopenSearch}
          open={openSearch}
          popContent={
            <SearchPopup
              toggler={setopenSearch}
              Frames={Frames}
              handleClick={handleSearched}
              // isNewsletter={true}
              isIcons={false}
              isCheckBox={false}
              showChip={false}
            />
          }
          padding="0"
          Cross={true}
          borderRadius="0.75rem"
        />
      </SwichBox> */}
      <SwichBox width="25%">
        <Boldtxtwpr>Add Recipients</Boldtxtwpr>
        <Lightwpr
          ref={emailPopRef}
          onClick={() => {
            setEmailPop(!emailPop);
            setShowDateComponent(false);
            setShowTimeComponent(false);
            setShowIconPop(false);
          }}
          opacity={emails.length}
        >
          <EmailBox>
            {emails.length ? (
              <>
                <SelectedWrp>
                  <SelectedText>{emails[0]}</SelectedText>
                </SelectedWrp>
                {emails.length > 1 && (
                  <SelectedWrp>
                    <SelectedText>+ {emails.length - 1} more</SelectedText>
                  </SelectedWrp>
                )}
              </>
            ) : (
              <Popbtnwpr>
                <span id="coach-add-recipients-wrp">{'Add Email IDs'}</span>
              </Popbtnwpr>
            )}
          </EmailBox>
        </Lightwpr>
        {emailPop && (
          <EmailPop emailCount={emails.length} isVisible={emailPop}>
            <Popupheader>Enter Email Address</Popupheader>
            <PopUpMiddleWrap>
              <Inputwpr
                onClick={handleEmailInputClick}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              <PopupBottonWrp>
                <Button
                  title="Add"
                  backgroundColor={theme[selectedTheme].primary}
                  onClick={(e) => handleEmails(e)}
                ></Button>
              </PopupBottonWrp>
            </PopUpMiddleWrap>
            {!isValidEmail && (
              <ErrorText>Please enter a valid email address</ErrorText>
            )}
            {emails.length ? <HorizontalLine /> : <></>}

            <PopupBottomWrap>
              {emails.map((email, i) => (
                <SelectedPopupWrap key={i}>
                  <SelectedPopupText>{email}</SelectedPopupText>
                  <BtnWrp onClick={(e) => handleCancel(e, 'email', email)}>
                    <Close
                      color={theme[selectedTheme].text}
                      height="16"
                      width="16"
                    />
                  </BtnWrp>
                </SelectedPopupWrap>
              ))}
            </PopupBottomWrap>
          </EmailPop>
        )}
      </SwichBox>
      <SwichBox width="25%" ref={datePopRef}>
        <Boldtxtwpr>Send On</Boldtxtwpr>
        <Lightwpr opacity={'a'} onClick={handleDateClick}>
          <SelectedWrp>
            <SelectedText id="coach-send-date-wrp">
              {selectedDate === 'onetime'
                ? 'One Time '
                : selectedDate === 'daily'
                ? 'Daily'
                : 'Monthly'}{' '}
              {''} &nbsp;
              {selectedDate === 'daily'
                ? daysSelected
                    .map(
                      (day) =>
                        `${' '}  ${
                          day.charAt(0).toUpperCase() + day.substring(1, 3)
                        }`
                    )
                    .join(',')
                : selectedDate === 'onetime'
                ? selectedDate === 'onetime'
                  ? convertDate(selectedDateValue)
                  : selectedDateValue
                : Dates?.find(
                    (x) =>
                      String(x.value) === String(selectedDateValue) ||
                      String(x.label) === String(selectedDateValue)
                  )?.label}
            </SelectedText>
            <BtnWrp onClick={(e) => handleCancel(e, 'day')}></BtnWrp>
          </SelectedWrp>
        </Lightwpr>
        {/* My code */}
        {showDateComponent && (
          <DatePopUp>
            <DateForm>
              <DateLabelsWrp>
                {/* <LabelCustm>
                  <RadioBtnCustm
                    type="radio"
                    value="Send Now"
                    name="btn"
                    onChange={(e) => handleRadio(e, 'Send Now')}
                    checked={selectedDate === 'Send Now'}
                  />
                  Send Now
                </LabelCustm> */}

                <LabelCustm>
                  <RadioBtnCustm
                    type="radio"
                    value="onetime"
                    name="btn"
                    onChange={(e) => handleRadio(e, 'onetime')}
                    checked={selectedDate === 'onetime'}
                  />
                  One-time
                </LabelCustm>
                <LabelCustm>
                  <RadioBtnCustm
                    type="radio"
                    value="daily"
                    name="btn"
                    checked={selectedDate === 'daily'}
                    onChange={(e) => handleRadio(e, 'daily')}
                  />
                  Daily
                </LabelCustm>
                <LabelCustm>
                  <RadioBtnCustm
                    type="radio"
                    value="monthly "
                    name="btn"
                    onChange={(e) => handleRadio(e, 'monthly')}
                    checked={selectedDate === 'monthly'}
                  />
                  Monthly-on
                </LabelCustm>
              </DateLabelsWrp>
              <HorizontalLine />
              <SelectedDatePickerWrp>
                {selectedDate === 'Send Now' ? (
                  <>
                    <InputDate
                      type="text"
                      value={formatDate(new Date())}
                      disabled={false}
                      hasTime={true}
                    />
                  </>
                ) : selectedDate === 'onetime' ? (
                  <>
                    <InputDate
                      type="date"
                      value={
                        // Dates.find(
                        //   (x) =>
                        //     x.value === selectedDateValue ||
                        //     x.label === selectedDateValue
                        // )?.label
                        selectedDateValue
                      }
                      disabled={selectedDate !== 'onetime'}
                      onChange={(e) => handleOneTimeClick(e, 'onetime')}
                      hasTime={selectedDateValue !== ''}
                    />
                  </>
                ) : selectedDate === 'daily' ? (
                  <DailyDateWrapper>
                    <AllDaysWrap>
                      <CustomCheckbox
                        checked={isCheckedAllDays}
                        checkColor="#fff"
                        backgroundColor="#675EF2"
                        onChange={handleCheckboxOnchange}
                      />
                      <AllDaysText>All Days</AllDaysText>
                    </AllDaysWrap>
                    <DaysContWrp>
                      {Days.map((option, index) => {
                        return (
                          <DaysTab
                            key={index}
                            disabled={selectedDate !== 'daily'}
                            onClick={(e) =>
                              selectedDate === 'daily'
                                ? handleDailyClick(e, option.label, option)
                                : () => {}
                            }
                            selected={daysSelected.includes(option?.value)}
                          >
                            {option.label}
                          </DaysTab>
                        );
                      })}
                    </DaysContWrp>
                  </DailyDateWrapper>
                ) : selectedDate === 'monthly' ? (
                  <DropDownButton
                    onClick={(e) => {
                      if (selectedDate === 'monthly') {
                        handleDropDownClick(e);
                      }
                    }}
                  >
                    {selectedDate === 'monthly'
                      ? Dates.find(
                          (x) =>
                            x.value === selectedDateValue ||
                            x.label === selectedDateValue
                        )?.label
                      : 'Select Date'}
                  </DropDownButton>
                ) : (
                  <></>
                )}
              </SelectedDatePickerWrp>
              {showDropDown && (
                <ListContainer>
                  <UnorderedList type="none">
                    {Dates.map((option, index) => {
                      return (
                        <ListItems
                          onClick={(e) => onDateClick(e, option.value)}
                          key={index}
                        >
                          {option.label}
                        </ListItems>
                      );
                    })}
                  </UnorderedList>
                </ListContainer>
              )}
            </DateForm>
          </DatePopUp>
        )}
      </SwichBox>
      <SwichBox width="25%" ref={timePopRef}>
        <Boldtxtwpr>Send Time</Boldtxtwpr>
        <Lightwpr opacity={time} onClick={handleTimeClick}>
          {showSelectedTime ? (
            <SelectedWrp>
              <SelectedText>
                {sendTime && convertTo12HourFormat(sendTime)}
              </SelectedText>
              <BtnWrp onClick={(e) => handleCancel(e, 'time')}></BtnWrp>
            </SelectedWrp>
          ) : (
            <Popbtnwpr>
              <span id="coach-send-time-wrp">{'Select'}</span>
            </Popbtnwpr>
          )}
        </Lightwpr>

        {showTimeComponent && (
          <TimePopUp>
            <LabelInputCont>
              <LabelCustm>Select Time</LabelCustm>
              <InputDate
                onChange={onTimeChange}
                type="time"
                value={sendTime}
                hasTime={sendTime !== ''}
              />
            </LabelInputCont>
            <SubmitButtonWrapper>
              <Button
                title="Set"
                backgroundColor={theme[selectedTheme].primary}
                onClick={handleTimeSubmit}
                disable={sendTime === ''}
                disableStyle={{
                  background: theme[selectedTheme].borders,
                  border: 'none',
                  color: theme[selectedTheme].background,
                }}
              />
            </SubmitButtonWrapper>
          </TimePopUp>
        )}
      </SwichBox>
      <SwichBox width="25%">
        <Boldtxtwpr>Publish as</Boldtxtwpr>
        <Nwsbtnpop
          handleClick={handleType}
          Items={Types}
          currentItem={type}
          show={showIconPop}
          setShow={setShowIconPop}
        >
          <Lightwpr opacity={type} handleClick={handleTime}>
            {type ? (
              <>
                <SelectedWrp>
                  <SelectedText>{type?.toUpperCase()}</SelectedText>
                  <BtnWrp onClick={(e) => handleCancel(e, 'type')}>
                    <Close
                      color={theme[selectedTheme].text}
                      height="16"
                      width="16"
                    />
                  </BtnWrp>
                </SelectedWrp>
              </>
            ) : (
              <Popbtnwpr>
                <span id="coach-publish-wrp">{'Select'}</span>
              </Popbtnwpr>
            )}
          </Lightwpr>
        </Nwsbtnpop>
      </SwichBox>
    </BottomBarWrp>
  );
};

NewsLetterBottomBar.propTypes = {
  setSearchSelect: Proptypes.func.isRequired,
  searchSelect: Proptypes.any,
  newsLetterData: Proptypes.object,
  savedSearchData: Proptypes.object,
  setSelectedSearchData: Proptypes.func,
  selectedSearchData: Proptypes.object,
  setStateNewsLetterData: Proptypes.func,
};

export default NewsLetterBottomBar;
