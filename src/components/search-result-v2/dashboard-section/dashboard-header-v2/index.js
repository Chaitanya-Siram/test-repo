import React from 'react';
import ReusableDropDown from '../../../Drop-down-reusable';
import {
  ButtonText,
  // ButtonTextTwo,
  // CreateDashboardButton,
  // DropdownCont,
  // DropdownItems,
  // DropdownSecondaryItem,
  // DropdownWrap,
  Heading,
  NewsLetterButton,
  Wrpr,
} from './index.sc';
import Add2 from '../../../../assets/icons/Add2';
// import DropDownButton from '../../../../assets/icons/DropDownButton';

import { useNavigate, useParams } from 'react-router-dom';
import { getSearchParams } from '../../../../utils';
// import { CustomListItem } from './CustomListItem';

export default function DashboardHeaderV2() {
  const { searchId } = useParams();

  const dropdownOptions = [
    {
      label: 'Brand & Competition',
      value: 'brand',
      path: `${searchId}/brand`,
    },
    {
      label: 'People',
      value: 'people',
      path: `${searchId}/people`,
    },
    {
      label: 'Industry',
      value: 'industry',
      path: `${searchId}/industry`,
    },
    {
      label: 'Advanced',
      value: 'advanced',
      path: `${searchId}/advanced`,
      children: [
        {
          label: 'Campaign Monitor',
          value: 'campaign',
          path: `${searchId}/campaign`,
        },
        {
          label: 'Author Impact',
          value: 'authorimpact',
          path: `${searchId}/authorimpact`,
        },
        {
          label: 'Sentiments By Themes',
          value: 'sentiments',
          path: `${searchId}/sentiments`,
        },
        {
          label: 'Message Congruence',
          value: 'congruence',
          path: `${searchId}/congruence`,
        },
        {
          label: 'PR Impact',
          value: 'primpact',
          path: `${searchId}/primpact`,
        },
      ],
    },
    {
      label: 'Custom',
      value: 'custom',
      path: `${searchId}/custom`,
    },
  ];

  const navigate = useNavigate();
  const navigateNewsletter = () => {
    navigate('/news-letter');
  };

  const createDashboard = (path) => {
    navigate(`/dashboard/${path}`);
  };

  const childNavigation = (path) => {
    navigate(`/dashboard/${path}`);
  };

  return (
    <>
      <Wrpr>
        <Heading>Overview</Heading>
        <NewsLetterButton onClick={navigateNewsletter}>
          <Add2 height={'1rem'} color={'#675ef2'} />
          <ButtonText>Create Newsletter</ButtonText>
        </NewsLetterButton>
        <ReusableDropDown
          dropdownArray={dropdownOptions}
          label="Create Dashboard"
          frontIcon={<Add2 height={'1rem'} color={'#fff'}></Add2>}
          navigation={createDashboard}
          childNavigation={childNavigation}
        ></ReusableDropDown>
      </Wrpr>
    </>
  );
}
