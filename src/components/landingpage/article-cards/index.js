import React, { useEffect, useState } from 'react';
import { articleData } from '../../../constants/mock';
import { useNavigate } from 'react-router-dom';
import './index.css';


const ArticleCards = () => {
  const [articleList, setArticleList] = useState([])
   const navigate = useNavigate()

  useEffect(() => {
    setArticleList(articleData)
  }, [])

  const handleArticleNavigate = (article) => {
    navigate(`/article-details/article-id?${article?.id}`)
    localStorage.setItem('articleDetailsObj', JSON.stringify(article));
  }

  return (
    <div className='Article-cards-con'>
      {articleList?.map((article, index) => {
        return (
          <div className='Article-cards' onClick={() => handleArticleNavigate(article)}>
            <img className='Article-cards-img' src={article?.imageUrl} alt='article-preview' />
            <div className='Article-cards-category' style={{backgroundColor: article?.bgColor}}>{article?.category?.toUpperCase()}</div>
            <div className='Article-cards-title'>{article?.articleHeading}</div>
            <div className='Article-cards-sub-info'>
              {/* <span>By {article?.authorname}</span>/ */}
              <br />
              <span>{article?.date}</span></div>
          </div>
        )
      })}
    </div>
  );
}

export default ArticleCards;

