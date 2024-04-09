import React, { useState } from 'react';
import {
  ButtonBoxwpr,
  ButtonsContainer,
  DrawerContentBox,
  FooterBoxwpr,
  Headerleftwpr,
  Headerwrap,
  Heaerlblwrp,
  Iconwpr,
  ItemBoxwpr,
  ItemContainer,
  ItemDeswpr,
  ItemLabelwpr,
  LeftfootBoxwpr,
  WriteIconwpr,
} from '../custom-drawer/index.sc';
import Proptypes, { object } from 'prop-types';
import X from '../../assets/icons/X';
import { theme } from '../../constants/theme';
import WriteIcon from '../../assets/icons/WriteIcon';

const QuickLnkDrwr = ({
  items,
  heading = 'Manage Quick Links',
  toggle,
  checknumber,
  setNavMenu,
}) => {
  const [checknum, setchecknum] = useState(checknumber);
  const [uItems, setUItems] = useState(JSON.parse(JSON.stringify(items)));
  const handleItemClick = (i) => {
    const varItem = uItems;
    if (checknum < 4) {
      varItem[i].menuItem = !varItem[i].menuItem;
      if (varItem[i].menuItem) setchecknum(checknum + 1);
      else setchecknum(checknum - 1);
    } else if (varItem[i].menuItem) {
      varItem[i].menuItem = !varItem[i].menuItem;
      setchecknum(checknum - 1);
    }
    setUItems([...varItem]);
  };
  const handleToggle = () => {
    toggle(false);
  };

  const handleUpdate = () => {
    /** uncommit/commit below line to show/hide changes in home search respectively */
    const checkeditems = uItems.filter((item) => item.menuItem);
    setNavMenu(uItems);
    console.log(checkeditems);
    toggle(false);
  };

  return (
    <DrawerContentBox>
      <Headerwrap>
        <Headerleftwpr>
          <Heaerlblwrp>{heading}</Heaerlblwrp>
        </Headerleftwpr>
        <Iconwpr onClick={handleToggle}>
          <X color={theme.dark.primary} size={28} />
        </Iconwpr>
      </Headerwrap>
      <ItemContainer style={{ padding: '1.75rem' }}>
        {uItems.map((item, i) => (
          <ItemBoxwpr
            checked={item.menuItem}
            onClick={() => handleItemClick(i)}
            key={i}
          >
            <WriteIconwpr className="writeicon">
              <WriteIcon />
            </WriteIconwpr>
            <ItemLabelwpr>{item.label}</ItemLabelwpr>
            <ItemDeswpr>
              {item.description ||
                'This is a placeholder text used for demonstration purposes.'}
            </ItemDeswpr>
          </ItemBoxwpr>
        ))}
      </ItemContainer>
      <FooterBoxwpr>
        <LeftfootBoxwpr>
          Add up to <span>4</span> quick links.
        </LeftfootBoxwpr>
        <ButtonsContainer>
          <ButtonBoxwpr
            onClick={handleToggle}
            fontColor={theme.dark.secondaryText}
            background={theme.dark.secondaryBackground}
          >
            Cancel
          </ButtonBoxwpr>
          <ButtonBoxwpr
            fontColor={theme.dark.text}
            background={theme.dark.primary}
            onClick={handleUpdate}
          >
            Update
          </ButtonBoxwpr>
        </ButtonsContainer>
      </FooterBoxwpr>
    </DrawerContentBox>
  );
};

QuickLnkDrwr.propTypes = {
  items: Proptypes.arrayOf(object).isRequired,
  heading: Proptypes.string,
  toggle: Proptypes.func.isRequired,
  checknumber: Proptypes.number.isRequired,
  setNavMenu: Proptypes.func.isRequired,
};

export default QuickLnkDrwr;
