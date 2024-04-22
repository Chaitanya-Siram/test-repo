import React, { useState, useEffect, useCallback } from 'react';
import {
  BoldBoxwpr,
  Boldtxt,
  CheckBox,
  CheckBoxesContainer,
  Contentwpr,
  Descwpr,
  HeaderWrp,
  IconWrp,
  // Inputwpr,
  Labelbox,
  // Labelwpr,
  MidBoxLeftWrap,
  MidBoxwpr,
  Midtxt,
  PauseOptionLabel,
  PercBoxwpr,
  PercInputwpr,
  SwitchBoxwpr,
  SwitchContainer,
  Switchwpr,
  TextAreaContainer,
  Titlewpr,
  TogglePauseWrap,
} from './index.sc';
import Proptypes from 'prop-types';
import {
  // ButtonBoxwpr,
  ButtonsContainer,
  FooterBoxwpr,
  LeftfootBoxwpr,
} from '../custom-drawer/index.sc';
import { theme } from '../../constants/theme';
import Close from '../../assets/icons/Close';
import { useSelector } from 'react-redux';
import { Button } from '../button';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axiosPutRequest } from '../../service';

const SwitchBox = ({
  headline = 'Alert Me for Changes in Volume',
  label1 = 'Search volume increases by',
  label2 = 'Search volume decreases by',
  description = 'Alerts are based on Search Volumes. You will receive alerts when the volume crosses 15% within the next 24 hours.',
  increase = 25,
  decrease = 25,
  setData,
}) => {
  const [checked, setChecked] = useState(true);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (checked) setShow(true);
    }, 350);
    setShow(false);
  }, [checked]);
  const handleCheckBox = () => {
    setChecked(!checked);
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
        <Switchwpr
          type="checkbox"
          id="switch"
          onChange={handleCheckBox}
          checked={checked}
        />
      </BoldBoxwpr>
      {show && checked && (
        <CheckBoxesContainer>
          <MidBoxwpr>
            <MidBoxLeftWrap>
              <CheckBox checked={check1} onChange={() => setCheck1(!check1)} />
              <Midtxt>{label1}</Midtxt>
            </MidBoxLeftWrap>

            <PercBoxwpr>
              <PercInputwpr
                value={per1}
                onChange={(e) => setPer1(e.target.value)}
                type="number"
                disabled={!check1}
              />
              %
            </PercBoxwpr>
          </MidBoxwpr>
          <MidBoxwpr>
            <MidBoxLeftWrap>
              <CheckBox checked={check2} onChange={() => setCheck2(!check2)} />
              <Midtxt>{label2}</Midtxt>
            </MidBoxLeftWrap>
            <PercBoxwpr>
              <PercInputwpr
                value={per2}
                onChange={(e) => setPer2(e.target.value)}
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
};

const EditAlertsPopup = ({ toggler, heading = 'Edit Alert', selectedItem }) => {
  const queryClient = useQueryClient();
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });
  const handleToggle = () => {
    toggler(false);
  };

  const updateAlertDetails = (data) => {
    return axiosPutRequest('/alerts', {}, { data });
  };
  const { mutate: updateFunc } = useMutation({
    mutationFn: updateAlertDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  // const [title, setTitle] = useState(selectedItem.title);
  const title = selectedItem.title;
  const [description, setDescription] = useState(selectedItem.description);
  const [volumebox, setVolumebox] = useState();
  const [sentimentbox, setSentimentbox] = useState();
  const [data, setData] = useState();
  const [playAlert, setPlayAlert] = useState(selectedItem.alertIsActive);
  console.log(playAlert);
  const handleAlertPlay = () => {
    setPlayAlert((prev) => !prev);
  };

  const submitHandler = (e) => {
    console.log('editing');
    e.preventDefault();
    if (!data) {
      setData({
        volumebox,
        sentimentbox,
        title,
        description,
      });
      updateFunc({
        volumebox,
        sentimentbox,
        title,
        description,
      });
    }
    toggler(false);
  };

  return (
    <Contentwpr onSubmit={submitHandler}>
      {/* <Infowpr>
        <InfoIcon />
        <Infotxt>Save this search before creating dashboard</Infotxt>
      </Infowpr> */}
      <HeaderWrp>
        <Titlewpr>{heading}</Titlewpr>
        <IconWrp onClick={handleToggle}>
          <Close
            width="1.5rem"
            height="1.5rem"
            color={theme[selectedTheme].text}
          />
        </IconWrp>
      </HeaderWrp>
      <Labelbox>
        <BoldBoxwpr>
          <Boldtxt>{title}</Boldtxt>
        </BoldBoxwpr>
        {/* <Labelwpr htmlFor="title">
          <Inputwpr
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </Labelwpr> */}
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
          increase={selectedItem.volumebox.increase}
          decrease={selectedItem.volumebox.decrease}
        />
        <SwitchBox
          setData={setSentimentbox}
          headline="Alert Me for Changes in Sentiment"
          label1="Net sentiment increases by"
          label2="Net sentiment decreases by"
          description="Alerts are based on Search Volumes. You will receive alerts when the volume crosses 15% within the next 24 hours."
          increase={selectedItem.sentimentbox.increase}
          decrease={selectedItem.sentimentbox.decrease}
        />
      </SwitchContainer>
      <TogglePauseWrap>
        <PauseOptionLabel>
          {playAlert ? 'Pause Alert' : 'Play Alert'}
        </PauseOptionLabel>
        <Switchwpr
          type="checkbox"
          id="switch"
          onChange={handleAlertPlay}
          checked={playAlert}
        />
      </TogglePauseWrap>

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
            title={'Update'}
            backgroundColor={theme[selectedTheme].primary}
            // onClick={handleSubmit}
          />
        </ButtonsContainer>
      </FooterBoxwpr>
    </Contentwpr>
  );
};

EditAlertsPopup.propTypes = {
  toggler: Proptypes.func.isRequired,
  heading: Proptypes.string,
  selectedItem: Proptypes.any,
  deleteFunction: Proptypes.func,
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

export default EditAlertsPopup;
