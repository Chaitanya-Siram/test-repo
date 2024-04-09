import React, { useState } from 'react';
import ToolBarTrash from '../../../../../assets/icons/ToolBarTrash';
import NewsletterArticlesArrowUp from '../../../../../assets/icons/NewsletterArticleArrowUp';
import NewsletterArticlesMoreOpt from '../../../../../assets/icons/NewsletterArticlesMoreOpt';
import NewsletterArticleEdit from '../../../../../assets/icons/NewsletterArticleEdit';
import {
  ArticleRotateWrp,
  ArticleToolWrp,
  DropDownCheckBox,
  DropDownValue,
  DropDownValueWrp,
  DropDownWrp,
  IconWrp,
} from './index.sc';
import Proptypes from 'prop-types';

const ArticleTools = ({
  wrapperClassName,
  onDelete,
  onClickUp,
  onClickDown,
  onClickEdit,
  onClickOption,
}) => {
  const [showMoreOpts, setShowMoreOpts] = useState(false);
  const dropDownValue = [
    {
      id: 1,
      label: 'Full Text',
      value: 'remove_image_article',
    },
  ];

  return (
    <>
      <ArticleToolWrp className={wrapperClassName}>
        <IconWrp onClick={onDelete}>
          <ToolBarTrash />
        </IconWrp>
        <IconWrp onClick={onClickDown}>
          <NewsletterArticlesArrowUp />
        </IconWrp>
        <ArticleRotateWrp onClick={onClickUp}>
          <NewsletterArticlesArrowUp />
        </ArticleRotateWrp>
        <IconWrp onClick={onClickEdit}>
          <NewsletterArticleEdit />
        </IconWrp>
        {false && (
          <IconWrp onClick={() => setShowMoreOpts(!showMoreOpts)}>
            <NewsletterArticlesMoreOpt />
          </IconWrp>
        )}
      </ArticleToolWrp>

      {showMoreOpts && (
        <DropDownWrp>
          {dropDownValue?.map((dropdown, index) => (
            <DropDownValueWrp
              key={index}
              onClick={(e) => onClickOption(dropdown, e.target.checked, e)}
            >
              <DropDownCheckBox type="checkbox" />
              <DropDownValue>{dropdown?.label}</DropDownValue>
            </DropDownValueWrp>
          ))}
        </DropDownWrp>
      )}
    </>
  );
};
ArticleTools.propTypes = {
  wrapperClassName: Proptypes.string,
  onDelete: Proptypes.func,
  onClickUp: Proptypes.func,
  onClickDown: Proptypes.func,
  onClickEdit: Proptypes.func,
  onClickOption: Proptypes.func,
};

export default ArticleTools;
