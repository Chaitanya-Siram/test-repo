import React, { useEffect, useRef, useState } from 'react';
import {
  ButtonText,
  CreateButton,
  CreatebtnTxt,
  DesText,
  DropButtonBox,
  DropDownwrpr,
  Line,
  PlusCircle,
  SubDesc,
  Wrpr,
} from './index.sc';
// import ChevronDown from '../../assets/icons/ChevronDown';
import Proptypes from 'prop-types';
import Plus from '../../assets/icons/Plus';
import DashboardPopup from '../dasboard-popup';
import { OverviewContent } from '../dasboard-popup/OverviewContent';
import Menu from '../../assets/icons/Menu';

const ButtonContainer = ({ Widget, height = '' }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <CreateButton style={{ height }} onClick={() => setShow(true)}>
        <PlusCircle>
          <Plus height="10px" width="10px" color="#675EF2" />
        </PlusCircle>
        <CreatebtnTxt>{Widget.type}</CreatebtnTxt>
      </CreateButton>
      <DashboardPopup
        popContent={<OverviewContent Widget={Widget} toggler={setShow} />}
        toggler={setShow}
        open={show}
      />
    </>
  );
};

ButtonContainer.propTypes = {
  Widget: Proptypes.object,
  height: Proptypes.string,
};

const OverviewDropdown = ({
  description = 'Create New Dashboard',
  subDes = 'Custom Dashboard',
  title = 'OVERVIEW',
  Widgets,
  AdvanceDashboard,
}) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <DropButtonBox open={show} ref={dropdownRef}>
      <Wrpr onClick={() => setShow(!show)}>
        <div style={{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          {/* <ChevronDown/> */}
          <Menu />
        </div>
        <ButtonText>{title}</ButtonText>
      </Wrpr>
      {show && (
        <DropDownwrpr>
          <DesText>{description}</DesText>
          {Widgets.map((Widget, i) => (
            <ButtonContainer key={i} Widget={Widget} />
          ))}
          <Line></Line>
          {AdvanceDashboard.map((ele, i) => (
            <ButtonContainer height="2.5rem" key={i} Widget={ele} />
          ))}
          <Line></Line>
          <SubDesc>{subDes}</SubDesc>
          <DesText style={{ height: 25 }}>Monthly Summary</DesText>
          <Line></Line>
          <CreateButton style={{ height: '2.5rem' }}>
            <PlusCircle>
              <Plus height="10px" width="10px" color="#675EF2" />
            </PlusCircle>
            <CreatebtnTxt>Create Newsletter</CreatebtnTxt>
          </CreateButton>
        </DropDownwrpr>
      )}
    </DropButtonBox>
  );
};

OverviewDropdown.propTypes = {
  description: Proptypes.string,
  subDes: Proptypes.oneOfType([Proptypes.string, Proptypes.node]),
  title: Proptypes.string,
  Widgets: Proptypes.array,
  AdvanceDashboard: Proptypes.array,
};

export default OverviewDropdown;
