import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../button';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import X from '../../../assets/icons/X';
import { axiosPutRequest } from '../../../service';
import { useMutation } from '@tanstack/react-query';
import {
  useCreateTagsBySearchId,
  useDeleteArticleTagBySearchId,
  useUpdateArticleTags,
} from '../../../hooks/useSearch';
import toast from 'react-hot-toast';
// import { articleTags } from '../../../redux/slices/searchSlice';

const Boxwpr = styled.div`
  width: 15.25rem;
  height: 8.75rem;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Typetxt = styled.div`
  font-size: 0.75rem;
  width: 100%;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const LabelBox = styled.label`
  display: flex;
  flex-wrap: wrap;
  height: 6rem;
  width: 100%;
  margin-top: 0.4rem;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.25rem;
  overflow: auto;
`;

const Inputwpr = styled.input`
  outline: none;
  border: none;
  height: 1.25rem;
  display: flex;
  align-items: center;
  padding-top: 2px;
  font-size: 0.75rem;
  margin: 0;
  margin-top: 0.2rem;
  font-weight: 400;
  ${({ theme }) => theme.secondaryText};
`;

const Tagwpr = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.25rem 0.625rem 0.2rem;
  align-items: center;
  font-size: 0.75rem;
  height: fit-content;
  gap: 0.25rem;
  /* color: ${({ theme }) => theme.secondaryText}; */
  color: #fff;
  border-radius: 0.75rem;
  /* border: 1px solid; */
  background-color: ${({ theme }) => theme.tagsBorderColor};
  & > span {
    display: flex;
    align-items: center;
  }
`;

const CrossWrp = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid #fff;
  border-radius: 10px;
`;

const BtnWrp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ text }) =>
    text?.length > 0 ? 'space-between' : 'end'};
  width: 100%;
`;

const TagBox = ({
  data,
  setShow,
  setTriggerFetchUseEffect,
  storeArticleCommentsTags,
  setStoreTags,
}) => {
  // const [fetchTags, setFetchTags] = useState(true);

  // const tagValue = data?.storeTags?.find(
  //   (tag) => data?.ele?.articleId === tag?.article_id
  // );

  // const initialtagsArray = data?.ele?.tags
  //   ? data?.ele?.tags
  //   : tagValue
  //   ? tagValue?.tags.split(',')
  //   : [];
  const [text, setText] = useState('');
  const [tags, setTags] = useState(data?.tags || []);
  // const [tiggerTag, setTiggerTag] = useState(false);

  // const { state } = useLocation();

  // const savedSearchId = state?.savedSearchData?.id;
  const payload = {
    recent_search_id: data?.articlesRecentSearchId,
    article_id: data?.ele?.articleId,
    tags: tags?.toString() || '',
  };

  const addArticleTags = () => {
    return axiosPutRequest('/articles', {}, payload);
  };

  const { mutate: addTags } = useMutation({ mutationFn: addArticleTags }); // dummy
  const { mutateAsync: addTag } = useCreateTagsBySearchId();
  const { mutateAsync: deleteArticleTag } = useDeleteArticleTagBySearchId();
  // eslint-disable-next-line no-unused-vars
  const { mutateAsync: editArticleTag } = useUpdateArticleTags();

  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    // if (e.key === 'Backspace' && text.trim() === '') {
    //   setTags((prevTags) => {
    //     const updatedTags = [...prevTags];
    //     updatedTags.pop(); // Remove the last element
    //     return updatedTags;
    //   });
    // } else
    if (e.key === 'Enter' && text.trim() !== '') {
      setTags((prevTags) => [...(prevTags || []), text.trim()]);
      setText('');
    }
  };

  const handleClick = async () => {
    try {
      addTags(tags);
      // setTiggerTag(true);
      // if (tags?.length !== 0) {
      addTag(payload).then((data) => {
        if (data.isSuccessful) {
          toast.success('Tag Added');
          setTriggerFetchUseEffect((prev) => !prev);
        } else {
          toast.error('Error while adding Tag');
        }
      });
      storeArticleCommentsTags(payload, 'add', 'tags');
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setShow(false);
      // setTiggerTag(false);
    }
  };

  const removeTag = async (i) => {
    try {
      setTags(tags.filter((_, index) => index !== i));
      // if (tags?.length > 1) {
      //   await editArticleTag(
      //     {
      //       recent_search_id: data?.articlesRecentSearchId,
      //       article_id: data?.ele?.articleId,
      //       tags: tags.filter((_, index) => index !== i),
      //     },
      //     {
      //       onSuccess: () => {
      //         setTriggerFetchUseEffect((prev) => !prev);
      //         storeArticleCommentsTags(
      //           {
      //             recent_search_id: data?.articlesRecentSearchId,
      //             article_id: data?.ele?.articleId,
      //             tags: tags.filter((_, index) => index !== i),
      //           },
      //           'add',
      //           'tags'
      //         );
      //       },
      //     }
      //   );
      // } else {
      //   await deleteArticleTag(
      //     {
      //       recent_search_id: data?.articlesRecentSearchId,
      //       article_id: data?.ele?.articleId,
      //     },
      //     {
      //       onSuccess: () => {
      //         storeArticleCommentsTags(
      //           { article_id: data?.ele?.articleId },
      //           'delete',
      //           'tags'
      //         );
      //         setTriggerFetchUseEffect((prev) => !prev);
      //       },
      //     }
      //   );
      // }
      // if (data?.ele?.tags) {
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (i, tagValue) => {
    // try {
    //   setText(tagValue);
    //   await deleteArticleTag({
    //     savedSearchId: data?.articlesRecentSearchId,
    //     tagId,
    //   });
    //   setTags(tags.filter((tag, k) => i !== k));
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setTags(initialtagsArray);
    // }
  };

  const handleDeleteAllTags = async () => {
    try {
      deleteArticleTag({
        recent_search_id: data?.articlesRecentSearchId,
        article_id: data?.ele?.articleId,
      }).then((data) => {
        if (data.isSuccessful) {
          toast.success('Tags deleted successfully.');
          setTriggerFetchUseEffect((prev) => !prev);
        } else {
          toast.error('Error while deleting all tags.');
        }
      });
      storeArticleCommentsTags(
        { article_id: data?.articleId },
        'deleteAll',
        'tags'
      );
    } catch (err) {
      console.log(err);
    } finally {
      setShow(false);
    }
  };

  return (
    <Boxwpr>
      <Typetxt>Add Tags/Themes</Typetxt>
      <LabelBox htmlFor="tag">
        {tags?.reverse().map((tag, i) => (
          <Tagwpr key={i} onClick={() => handleEdit(i, tag)}>
            {tag}{' '}
            <span onClick={() => removeTag(i, tag)}>
              <CrossWrp>
                <X
                  size={15}
                  // color={theme[selectedTheme].primary}
                  color="#fff"
                  strokeWidth="2"
                />
              </CrossWrp>
            </span>
          </Tagwpr>
        ))}
        <Inputwpr
          id="tag"
          value={text}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          name="tag"
        />
      </LabelBox>
      <BtnWrp text={tags}>
        {tags.length > 0 && (
          <Button
            title="Remove All"
            backgroundColor="none"
            color={theme[selectedTheme].primary}
            onClick={handleDeleteAllTags}
          />
        )}
        <Button
          title="Done"
          color={theme[selectedTheme].background}
          backgroundColor={theme[selectedTheme].primary}
          disable={tags?.length === 0}
          disableStyle={{
            background: theme[selectedTheme].borders,
            border: 'none',
            color: '#999999',
          }}
          onClick={handleClick}
        />
      </BtnWrp>
    </Boxwpr>
  );
};
TagBox.propTypes = {
  data: PropTypes.shape({
    ele: PropTypes.any,
    type: PropTypes.string,
    page: PropTypes.number,
    storeTags: PropTypes.any,
    tags: PropTypes.any,
    articlesRecentSearchId: PropTypes.any,
    isSuccessful: PropTypes.bool,
    articleId: PropTypes.number,
  }),
  setShow: PropTypes.func,
  setTriggerFetchUseEffect: PropTypes.func,
  storeArticleCommentsTags: PropTypes.func,
  setStoreTags: PropTypes.func,
};

export default TagBox;
