import React, { useState, useEffect } from 'react';
import toolPreview from '../../assets/img/tool-preview-01.png'
import './index.css';
import FeatureCards from './feature-cards';
import ArticleCards from './article-cards';
import HeroInteractive from './hero-inter-active';
import RequestDemo from './request-demo-modal';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';


const LandingPage = () => {

  const [showDemoForm, setDemoForm] = useState(false);
  const navigate = useNavigate();

  const playAnimations = event => {
    const titleSplit = document.querySelectorAll('.animated-title');
    titleSplit.forEach((element, i) => {
      element.setAttribute('style', `animation-delay:${i * 0.1}s;-webkit-animation-delay:${i * 0.1}s;`)
    });
    console.log(titleSplit)
  };



  useEffect(() => {
    window.addEventListener('load', playAnimations)
  }, []);

  const handleNavigate = () => {
    navigate('/request-demo')
  }

  return (
    <div className='App'>
      {showDemoForm && <RequestDemo />}
      <Header />
      <div className='Hero'>
        <HeroInteractive />
        <div className='Hero-content'>

          <div className='Hero-title'>

            <div className='title-line'>
              <div className='animated-title'>AI</div>

            </div>

            <div className='title-line'>

              <div className='animated-title'>Powered</div>
            </div>

            <div className='title-line'>
              <div className='animated-title'>Media</div>
            </div>

            <div className='title-line'>
              <div className='animated-title'>Intelligence</div>
            </div>

          </div>
          <div className='Hero-button-con animated-title' onClick={handleNavigate}>
            <button className='Hero-button' >Request Demo</button>
          </div>
        </div>
      </div>

      <div className='Section1 Margin-T100 Margin-B100'>
        <div className='Row-80'>
          <div className='Col-50'>
            <div className='Dynamic-text'>Smarter Listening & Monitoring With <br></br>  AlphametricX’s AI</div>
          </div>
          <div className='Col-50'>
            <div className='Brief-description'>Get a holistic view of your brand across print, social, broadcast, and digital media channels. Track your brand mentions in real time for faster decision-making. Cut through the noise with our 90% accurate reports on your brand’s media presence.</div>
          </div>
        </div>
      </div>

      <div className='Section2'>
        <div className='Row-80'>
          <div className='Preview-elements'>
            <div className='Circle-element-01'></div>
            <div className='Circle-element-02'></div>
            <img className='Tool-preview' src={toolPreview} alt='preview' />
          </div>
        </div>
      </div>

      <div className='Section3'>
        <div className='Row-80'>
          <div className='Section-title'>Spotlight On Key Features
          </div>

        </div>
        <div className='Row-80'>
          <div className='Section-description'>Unlock excellence with AlphametricX’s key feature that enable you to quantify your PR efforts and their impact.</div>
        </div>

        <div>
          <FeatureCards />
        </div>
      </div>

      <div className='Section4'>
        <div className='Rectangle-elements'>
          <div className='Rectangle-elem-01'></div>
          <div className='Rectangle-elem-02'></div>
        </div>
        <div className='Row-80'>
          <div className='Section-title'>The Latest from AlphametricX</div>
        </div>
        <div className='Row-80'>
          <div className='Section-description'>Find out more about our latest product updates, announcements, and how we are trying to make AlphametricX better for you.</div>
        </div>

        <div>
          <ArticleCards />
        </div>
      </div>

      <div className='Section5'>

        <div className='Row-80'>

          <div className='Col-50'>
            <div className='S5-title'><h1>Interested? <br></br>Request a <br></br>Live Demo</h1></div>
          </div>
          <div className='Col-50'>
            <div className='Testimonial-slider-con'>
              <div className='Testimonial-text'>See AlphametricX in action and get a no cost custom trial for your team today.</div>
              <div className='Testimonial-subtext'>
                <div className='Hero-button-con' onClick={handleNavigate}>
                  <button className='Hero-button'>Request Demo</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer showFadedGraphic={true}/>
    </div>
  );
}

export default LandingPage;