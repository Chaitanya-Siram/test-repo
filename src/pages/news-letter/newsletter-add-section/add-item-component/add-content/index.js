import React from 'react';
import {
  AddContentTxt,
  AddNewsletterContentWrp,
  AddNewsletterWrp,
  IconAddWrp,
} from './index.sc';
import NewsletterAddCricle from '../../../../../assets/icons/NewsletterAddCricle';

const AddContent = () => {
  return (
    <>
      <AddNewsletterContentWrp>
        <AddNewsletterWrp>
          <IconAddWrp>
            <NewsletterAddCricle />
          </IconAddWrp>
          <AddContentTxt>Add Content</AddContentTxt>
        </AddNewsletterWrp>
      </AddNewsletterContentWrp>
    </>
  );
};

export default AddContent;
