/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getComponent } from '.';
import { BoxLoadingWrp } from './index.sc';
import CircularLoading from '../../assets/icons/loading/circularLoading';

const DelayLoading = ({ ele, activeBox, row, i }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    let unmounted = false;

    setTimeout(() => {
      if (!unmounted) {
        setData(true);
      }
    }, 1000);
    return () => (unmounted = true);
  }, []);

  return data ? (
    <>{getComponent(ele, activeBox, row, i)}</>
  ) : (
    <BoxLoadingWrp>
      <CircularLoading size="0.25rem" width="1.875rem" height="1.875rem" />
    </BoxLoadingWrp>
  );
};

export default DelayLoading;
