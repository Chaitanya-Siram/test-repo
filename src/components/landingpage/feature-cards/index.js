import React, {useState, useEffect} from 'react';
import { featureData } from '../../../constants/mock';
import { useNavigate } from 'react-router-dom';


const FeatureCards = () => {
  const [featuresList, setFeaturesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFeaturesList(featureData);
  }, [])
  
    useEffect(() => {
      const handleScroll = () => {
        const targetElement = document.getElementById('Feature-cards-con');
  
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          const cardArray = targetElement.querySelectorAll('.Feature-cards')
  
          if (targetPosition < windowHeight * 0.75) {
           cardArray.forEach((element, i) => {
            element.classList.add('animated-reveal-slide');
            element.setAttribute('style', `animation-delay:${i * 0.1}s;-webkit-animation-delay:${i * 0.1}s;`)
          });
          } else {
            return;
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleNavigateFeature =(featureObj) => {
      navigate(`/features-details/id:?${featureObj?.id}`,{
        state: featureObj,
      })
      window.scrollTo({
        top: 0,
      })
    }


  return (
    <div className='Feature-cards-con' id='Feature-cards-con'>
      {featuresList?.map((item, index) => (
        <div className='Feature-cards' onClick={() => handleNavigateFeature(item)}>
          <div className='Feature-cards-title'>{item.title}</div>
          <img className='Feature-cards-img' src={item.image} alt='feature-card-preview' />
          <div className='Feature-cards-description'>{item.description}</div>
        </div>
      ))}
    </div>
  );
}

export default FeatureCards;