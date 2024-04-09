import styled from 'styled-components';

export const SectionWrapper = styled.div`
  display: block;
`;

export const SectionHeading = styled.textarea`
  font-family: Inter;
  width: 100%;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.125rem;
  letter-spacing: -0.01875rem;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  color: ${({ theme }) => theme.sectionColor || 'black'};
  &::placeholder {
    color: ${({ theme }) => theme.greyColor || 'black'};
  }
  overflow: hidden;
`;

export const SectionHeadingHoverContainer = styled.div`
  display: block;
  position: relative;
  &:hover .title-color {
    display: block;
  }
`;

export const SectionDescriptionHoverContainer = styled.div`
  display: block;
  position: relative;
  padding-top: 0.5rem;
  &:hover .description-color {
    display: block;
  }
`;
