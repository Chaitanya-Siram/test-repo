import styled from 'styled-components';

export const TagSecWrp = styled.div`
  display: flex;
  padding: 1.5625rem 1.375rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: #fff;
  border-radius: 0.3125rem;
  border-bottom: ${({ theme }) => `2px solid ${theme.newsLetterBackground}`};

  /* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08); */
`;

export const TagsWrp = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.375rem;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

export const TagContainer = styled.div`
  display: flex;
  padding: 0.375rem 0.625rem;
  align-items: flex-start;
  height: fit-content;
  border-radius: 0.313rem;
  background-color: ${(props) =>
    props.id === 0 ? 'rgba(103, 94, 242, 0.1)' : '#F3F4F8'};
  cursor: pointer;
`;

export const TagText = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  margin: 0;
  padding: 0;
  color: ${({ id, theme }) => (id === 0 ? theme.primary : '#555')};
`;

export const TagLengthContainer = styled.div`
  padding: 0.375rem 0.625rem;
  background-color: #f3f4f8;
  border-radius: 0.313rem;
`;

export const ExtraTagText = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  margin: 0;
  padding: 0;
  color: #555;
`;

export const SocialLinksWrp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
  gap: 0.625rem;
`;

export const SocialIcon = styled.a`
  background: url(${(props) => props.image}),
    lightgray 0px -13.494px / 100% 139.714% no-repeat;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-size: contain;
`;
