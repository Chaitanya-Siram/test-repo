import React from 'react';
import Mediatypepop from './Mediatypepop';
import AutherImpactPop from './AutherImpactPop';
import CampagnPop from './CampagnPop';
import MessageConfigPop from './MessageConfigPop';
import OutletPop from './OutletPop';
import TopSourcePop from './TopSourcePop';
const mediaType = {
  title: 'Title',
  label: 'Label',
  subLabel: 'SubLable',
  infoArray: [
    { color: 'pink', label: 'Label2', subLabel: 'Sub 2' },
    { color: 'voilet', label: 'Label2', subLabel: 'Sub 2' },
    { color: 'green', label: 'Label2', subLabel: 'Sub 2' },
  ],
};

const MessageConfig = {
  title: 'Title',
  label: 'Label',
  subLabel: 'Sub Label',
  description: 'Description',
  infoArray: [
    { color: 'pink', label: 'Label2', subLabel: 'Sub 2' },
    { color: 'voilet', label: 'Label2', subLabel: 'Sub 2' },
    { color: 'green', label: 'Label2', subLabel: 'Sub 2' },
  ],
};

const authorImpact = {
  label: 'Label',
  subLabel: 'SubLabel',
  isReverse: false,
  color: 'red',
};

const campagn = {
  date: 'JUNE 12',
  firstInfo: {
    color: 'red',
    label: 'Label',
    subLabel: 'Sub Label',
    type: 'type',
  },
  secondInfo: {
    color: 'green',
    label: 'Label',
    subLabel: 'Sub Label',
    type: 'type',
  },
};

const outlet = {
  title: 'Title',
  label: 'Label',
  subLabel: 'Sub Label',
  squareColor: 'hotpink',
  triangleColor: 'red',
};

const topSource = {
  label: 'Label',
  subLabel: 'Sub Label',
  info: 'Information',
};

const Demo = () => {
  return (
    <div
      style={{ margin: 30, display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <Mediatypepop
        title={mediaType.title}
        label={mediaType.label}
        subLabel={mediaType.subLabel}
        infoArray={mediaType.infoArray}
      />
      <AutherImpactPop
        label={authorImpact.label}
        subLabel={authorImpact.subLabel}
        isReverse={authorImpact.isReverse}
        color={authorImpact.color}
      />
      <CampagnPop
        date={campagn.date}
        firstInfo={campagn.firstInfo}
        secondInfo={campagn.secondInfo}
      />
      <MessageConfigPop
        title={MessageConfig.title}
        label={MessageConfig.label}
        subLabel={MessageConfig.subLabel}
        description={MessageConfig.description}
        infoArray={MessageConfig.infoArray}
      />
      <OutletPop
        title={outlet.title}
        label={outlet.label}
        subLabel={outlet.subLabel}
        squareColor={outlet.squareColor}
        triangleColor={outlet.triangleColor}
      />
      <TopSourcePop
        label={topSource.label}
        subLabel={topSource.subLabel}
        info={topSource.info}
      />
    </div>
  );
};

export default Demo;
