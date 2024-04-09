import styled from 'styled-components';

export const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

export const ChipLabel = styled.span`
  display: block;
  white-space: nowrap;
  padding: 0 0.6rem 0 0.6rem;
`;

export const CloseIcon = styled.img`
  cursor: pointer;
  opacity: 0.7;
  margin: 0 0.37rem 0 0;
  width: 1.3rem;

  &:hover {
    opacity: 1;
  }
`;
export const ChipBox = styled.div`
  font-weight: 500;
  font-size: ${(props) => (props.type === 'small' ? '0.5rem' : '0.8rem')};
  outline: none;
  text-align: center;
  text-transform: capitalize;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center; /* Add align-items property */
  padding: ${(props) =>
    props.type === 'small' ? '0.16rem 0.25rem' : '0.32rem 0.5rem'};
  border-radius: ${(props) => (props.box ? '4px' : '30px')};
  gap: ${(props) => (props.type === 'small' ? '0.4rem' : '0.625rem')};
  height: 'auto';
  background: #fff;
  border: 1px solid #a1a5b7;
  cursor: pointer;

  span {
    text-align: initial;
  }
`;

export const Icon = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;

  svg {
    width: inherit;
    height: inherit;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem; // Adjust the margin as needed
`;
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.type === 'small' ? '0.725rem' : '0.8rem')};
  width: ${(props) => (props.type === 'small' ? '0.725rem' : '0.8rem')};
  svg {
    height: 100%;
    max-width: 100%;
    width: auto;
  }
`;
export const TitleContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;
export const TitleSpanText = styled.span`
  max-width: 7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
