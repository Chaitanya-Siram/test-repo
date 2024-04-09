import React from 'react';
import PropTypes from 'prop-types';
import {
  ArticleWrapper,
  Heading,
  ImgSection,
  InfoSection,
  Row,
  SectionA,
  SectionB,
  SectionContent,
  SectionTitle,
  Value,
  MenuOption,
} from './index.sc';
import MenuComponent from './menu-component';

const ArticleComponent = ({
  title = '',
  content = '',
  footer,
  articleImg,
  info,
  menuOptions,
  handleAction,
  sentiment,
}) => {
  const words = content.split(' ');
  const limitedDescription = words.slice(0, 25).join(' ');
  return (
    <ArticleWrapper>
      <SectionA>
        <SectionTitle>{title}</SectionTitle>
        <SectionContent>{limitedDescription}...</SectionContent>
        {footer}
      </SectionA>
      <SectionB>
        <ImgSection imgSrc={articleImg} />
        <InfoSection>
          {info.map((ele, i) => {
            return (
              <Row key={i}>
                <Heading>{ele.heading} : </Heading>
                <Value>{ele.value}</Value>
              </Row>
            );
          })}
          {sentiment}
        </InfoSection>
      </SectionB>
      {menuOptions.length && (
        <MenuOption>
          <MenuComponent options={menuOptions} handleAction={handleAction} />
        </MenuOption>
      )}
    </ArticleWrapper>
  );
};

export { ArticleComponent };

// Define prop types for ArticleComponent
ArticleComponent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  footer: PropTypes.node,
  sentiment: PropTypes.node,
  articleImg: PropTypes.string,
  info: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  menuOptions: PropTypes.arrayOf(PropTypes.string),
  handleAction: PropTypes.func,
};
