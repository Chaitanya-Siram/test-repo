import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../header';
import Footer from '../footer';
import './index.css';
import { featureData } from '../../../constants/mock';
import { useLocation } from 'react-router-dom';


const FeatureDetails = () => {
  const [featuresList, setFeaturesList] = useState([]);
  const elementRef = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState({});
  const [checkedValue, setCheckedValue] = useState('');
  const params = useLocation()
  const { state } = params
  const isMobile = useMediaQuery({
    query: '(max-width: 960px)'
  })


  useEffect(() => {
    setFeaturesList(featureData);
  }, [])

  useEffect(() => {
    if (state?.id) {
      setSelectedFeature(state);
    }
  }, [state])

  const handleFeatureDetails = (featureObj, value) => {
    setCheckedValue(value)
    setSelectedFeature(featureObj)
  }
  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math?.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  useEffect(() => {
    if (featuresList?.length) {
      const lastElement = featuresList[featuresList.length - 1];
      if ((lastElement?.id === selectedFeature?.id) || (lastElement?.id === selectedFeature?.id && checkedValue !== '')) {
        isMobile ? handleHorizantalScroll(elementRef.current, 25, 100, 500) : handleHorizantalScroll(elementRef.current, 25, 100, 10);
      } else if (featuresList[0]?.id === selectedFeature?.id) {
        isMobile ? handleHorizantalScroll(elementRef.current, 25, 100, 500) : handleHorizantalScroll(elementRef.current, 0, 100, -25)
      }
    }
  }, [state, featuresList, isMobile, selectedFeature, checkedValue]);

  return (
    <div>
      <div className='feature-details'>
        <div className='feature-details-header'>
          <Header />
          <h5 className='feature-details-head'>Features</h5>
        </div>

        <div className='feature-details-content-container'>
          <div className='feature-chips-list-container'>
            <div className='feature-chips-list' ref={elementRef}>
              {featuresList?.map((item => {
                return (
                  <div className={item?.id === parseInt(selectedFeature?.id) ? 'feature-chip-acitve' :   'feature-chip' } onClick={() => handleFeatureDetails(item, 'isCheck')}>
                  {/* // <div className={item?.id === parseInt(selectedFeature?.id) ? 'feature-chip-acitve' :   `feature-chip ${featuresList[featuresList.length -1] || featuresList[0] ? 'liner' : ''}` } onClick={() => handleFeatureDetails(item, 'isCheck')}> */}
                    {item?.title}
                  </div>
                )
              }))}
            </div>
          </div>
          <div className='feature-details-wrapper'>
            <div className='feature-details-description'>
              {selectedFeature?.description}
            </div>
            <div className='feature-details-chart-image'>
              <img src={selectedFeature?.image} alt='feature-preview-chart' />
            </div>
          </div>
          {selectedFeature?.title === 'Sentiment Analysis'
            &&
            <div className='feature-content-wrapper'>
              <div className='feature-details-content'>
                <p className='feature-head-text'>
                  Stay in tune with the public sentiment and the emotional tone of your target audience. Make data driven strategies to shape public perception.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  AlphametricX enables you to monitor sentiment of different stakeholders and track it closely as it evolves with time. Our tool uses advanced methods to analyze the tone, context, and emotion to enhance the accuracy of your sentiment tracking. You can also create customized metrics to tailor your sentiment analysis to specific needs.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  You can use AlphametricX’s sentiment analysis to understand the opinions and narratives about your brand, product, and services. It can help you closely watch your brand’s reputation so that you can take timely correction action if needed. Your corporate communications and PR teams can realign their approach and strategies as and when needed for favorable sentiment of your brand. You can further compare sentiment trends for your brand versus competitors and make data driven strategies to stay ahead in the game.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  Ready to leverage the sentiment analysis insights for your brand? Request a free demo today.
                </p>
              </div>
            </div>
          }
          {selectedFeature?.title === 'Competitor Tracking'
            &&
            <div className='feature-content-wrapper'>
              <div className='feature-details-content'>
                <p className='feature-head-text'>
                  Know your competition like the back of your hand. Monitor, benchmark, and outpace them through data-driven strategies.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  AlphametricX’s competitor tracking feature gives you a comprehensive view of your competitor’s online presence and performance. You can monitor them across different channels and evaluate their brand mentions and engagement numbers. AlphametricX can also help you deconstruct the content and campaign strategies of your competitors and adapt your own by making data-driven decisions. You can also identify influencers discovered by your competitors for your niche and explore potential collaboration.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  Competition tracking with AlphametricX can help you identify gaps and opportunities that you can leverage for your own benefit. You can set up custom alerts to notify you about spikes or dips in conversation volumes around your competitors. You can further benchmark your own brand performance against competitor performance by using KPIs
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  Interested in stepping up your game and staying ahead of the pack? Ask for a free demo of AlphametricX’s competitor tracking.
                </p>
              </div>
            </div>
          }
          {selectedFeature?.title === 'Custom Dashboards'
            &&
            <div className='feature-content-wrapper'>
              <div className='feature-details-content'>
                <p className='feature-head-text'>
                  Create, customize, and manage your dashboards. Visualize data and metrics of your choice and personalize insights.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  AlphametricX gives you the power to personalize your dashboards. You can use our tool’s easy-to-use interface to create, customize, and manage your own custom dashboards with data and analytics of your choice. You can get metrics and insights that matter the most to you from AlphametricX. You can also create your own data visualization by choosing the widgets of charts, graphs, and data tables. You can also build comparative view dashboards to assist you in benchmarking.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  AlphametricX’s custom dashboards help you simplify data interpretation so that you can focus on what really matters. You can concentrate on KPIs of interest to monitor the progress and align your strategies accordingly. You can further share the insights with your team and collaborate better.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  Want to know how to build custom dashboards? Ask for a demo of AlphametricX today.
                </p>
              </div>
            </div>
          }
          {selectedFeature?.title === 'Automate Newsletters'
            &&
            <div className='feature-content-wrapper'>
              <div className='feature-details-content'>
                <p className='feature-head-text'>
                  Create and distribute engaging newsletters to your leadership team. Personalize newsletters for different stakeholder groups based on their areas of interest.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  AlphametricX empowers you to build visually engaging newsletters and send them directly to your select stakeholders. Convert your media monitoring dashboards into newsletters that highlight the positives, draw attention to the areas of improvement, and keep the stakeholders informed about key metrics. You can further fetch important details directly into the newsletter by using URL of the media story or making manual edits.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  The customizable templates with rich visuals can be used to make professional looking newsletters with minimal intervention from the creative team. The delivery of the newsletters can further be automated for a specific time of the day.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  See how easy it is to create newsletters in AlphametricX. Book your demo today.
                </p>
              </div>
            </div>
          }
          {selectedFeature?.title === 'Corporate Reputation'
            &&
            <div className='feature-content-wrapper'>
              <div className='feature-details-content'>
                <p className='feature-head-text'>
                  Take control of your corporate narrative and manage your reputation proactively. Capitalize on positive opportunities and mitigate risks in timely manner.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  AlphametricX enables you to scour the online news to have a more comprehensive overview of your company’s reputation. Monitor, track, and analyze every mention, review, or opinion about your company and understand the sentiment associated with your brand. You can also compare your corporate reputation against your competition and identify areas that need improvement.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  AlphametricX can help you identify the positives that can be amplified to cultivate trust and credibility with targeted stakeholder groups. You can build data-driven narratives that help you engage with your audience more authentically.
                </p>
              </div>
              <div className='feature-details-content'>
                <p className='feature-text'>
                  Want to leverage data for corporate reputation strategies? Ask for a demo of AlphametricX today.
                </p>
              </div>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default FeatureDetails;
