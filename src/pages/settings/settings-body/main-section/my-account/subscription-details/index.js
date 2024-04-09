import React from 'react';
import {
  BottomWrp,
  CountWrp,
  DateWrp,
  DescWrp,
  ExpWrp,
  HeadingWrp,
  LabelWrp,
  MainHeading,
  MainWrapper,
  PlainDetailsWrp,
  StatusWrp,
  SubTypeWrp,
  TopWrapper,
  TotalWrp,
  ValueWrp,
} from './index.sc';
import { axiosGetAPI } from '../../../../../../service';
import { useQuery } from '@tanstack/react-query';
import Proptypes from 'prop-types';

const SubscriptionTab = ({ orgId }) => {
  const getUserData = async () => {
    // return axiosGetAPI('/subscription-details', {});
    if (orgId) {
      return axiosGetAPI(
        `/setting-subscription/get-subscription/${orgId}/`,
        {}
      );
    }
  };
  const { data: userData } = useQuery({
    queryKey: ['subscription-data', orgId],
    queryFn: getUserData,
    refetchOnWindowFocus: false,
  });
  const userDetails = userData?.data?.data;
  return (
    <MainWrapper>
      <TopWrapper>
        <HeadingWrp>
          {/* <MainHeading>{userDetails?.plan_name}</MainHeading> */}
          <MainHeading>{userDetails?.subscription_type}</MainHeading>
          {/* <SubTypeWrp>{userDetails?.plan_type}</SubTypeWrp> */}
          <SubTypeWrp>Traditional Media</SubTypeWrp>
          <DescWrp>{userDetails?.description}</DescWrp>
        </HeadingWrp>
        <PlainDetailsWrp>
          <StatusWrp activ={userDetails?.active || true}>
            {userDetails?.active ? 'Active' : 'Expired'}
          </StatusWrp>
          <ExpWrp>
            Expiry Date :<DateWrp> {userDetails?.expiry_date}</DateWrp>
          </ExpWrp>
        </PlainDetailsWrp>
      </TopWrapper>
      <BottomWrp>
        {userDetails?.user_data?.map((items, index) => (
          <CountWrp key={index}>
            <ValueWrp>
              {items?.current}
              <TotalWrp>/{items?.total}</TotalWrp>
            </ValueWrp>
            <LabelWrp>{items?.label}</LabelWrp>
          </CountWrp>
        ))}
      </BottomWrp>
    </MainWrapper>
  );
};

SubscriptionTab.propTypes = {
  orgId: Proptypes.string,
};

export default SubscriptionTab;
