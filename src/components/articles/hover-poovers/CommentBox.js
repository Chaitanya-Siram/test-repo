import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../../button';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import { axiosPutRequest } from '../../../service';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  useCreateCommentBySearchId,
  useDeleteArticleComment,
} from '../../../hooks/useSearch';
// import { articlesComments } from '../../../redux/slices/searchSlice';

const Boxwpr = styled.div`
  width: 15.5rem;
  height: 8.75rem;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

const Inputwpr = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 0.625rem;
  background: ${({ theme }) => theme.background};
  height: 6rem;
  resize: none;
  outline: none;
  border: none;
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BtnWrp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ text }) =>
    text?.length > 0 ? 'space-between' : 'end'};
  width: 100%;
`;

const CommentBox = ({
  data,
  setShow,
  setText,
  text,
  setTriggerFetchUseEffect,
  storeArticleCommentsTags,
  setStoreComments,
}) => {
  const selectedTheme = useSelector((store) => {
    return store?.theme.theme || {};
  });

  const payload = {
    recent_search_id: data?.articlesRecentSearchId,
    article_id: data?.ele?.articleId,
    content: text,
  };

  const { mutateAsync: addComment } = useCreateCommentBySearchId();
  const { mutateAsync: deleteArticleComment } = useDeleteArticleComment();

  const addArticleTags = () => {
    return axiosPutRequest('/articles', {}, payload);
  };

  const { mutate: addText } = useMutation({
    mutationFn: addArticleTags,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['articles', 0, 'totalArticles'],
    //   });
    // },
  });

  const handleClick = () => {
    try {
      addText(text);
      // if (data?.savedSearchId !== 'custom-search') {
      addComment(payload).then((data) => {
        if (data.isSuccessful) {
          toast.success('Comment Added Successfully');
          setTriggerFetchUseEffect((prev) => !prev);
        } else {
          toast.success('Error while adding comment');
        }
      });
      storeArticleCommentsTags(payload, 'add', 'comments');
    } catch (err) {
      console.log(err);
    } finally {
      setShow(false);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await deleteArticleComment(
        {
          recent_search_id: data?.articlesRecentSearchId,
          article_id: data?.ele?.articleId,
        },
        {
          onSuccess: () => {
            setText('');
            setTriggerFetchUseEffect((prev) => !prev);
            storeArticleCommentsTags(
              {
                recent_search_id: data?.articlesRecentSearchId,
                article_id: data?.ele?.articleId,
                content: '',
              },
              'delete',
              'comments'
            );
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Boxwpr>
      <Inputwpr
        placeholder="Add note"
        onChange={(e) => setText(e.target.value)}
        value={text}
        maxLength={500}
      />
      <BtnWrp text={text}>
        {text && (
          <Button
            title="Delete Note"
            backgroundColor="none"
            color={theme[selectedTheme].primary}
            onClick={handleDeleteNote}
          />
        )}
        <Button
          title="Done"
          backgroundColor={theme[selectedTheme].primary}
          onClick={handleClick}
          disable={!text}
          disableStyle={{
            background: theme[selectedTheme].borders,
            border: 'none',
            color: theme[selectedTheme].background,
          }}
        />
      </BtnWrp>
    </Boxwpr>
  );
};

CommentBox.propTypes = {
  data: PropTypes.any,
  setShow: PropTypes.func,
  setText: PropTypes.func,
  text: PropTypes.string,
  setTriggerFetchUseEffect: PropTypes.func,
  storeArticleCommentsTags: PropTypes.func,
  setStoreComments: PropTypes.func,
};

export default CommentBox;
