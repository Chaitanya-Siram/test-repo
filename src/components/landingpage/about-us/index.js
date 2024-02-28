import React from 'react';
import Header from '../header';
import Footer from '../footer';
import './index.css';
import Accuracy from '../../../assets/icons/accuracy';
import Relevance from '../../../assets/icons/Relevance';
import Innovation from '../../../assets/icons/Innovation';
import Excellence from '../../../assets/icons/Excellence';


const AboutUs = () => {


  return (
    <div>
      <div className='about-us'>
        <div className='about-us-header'>
          <Header />
          <h5 className='about-head'>About Us</h5>
        </div>
        <div className='content-wrapper'>
          <div>
            <p className='content'>
              AlphametricX is the brainchild of media analytics experts with 20+ years of industry experience who were passionate about overcoming the challenges posed by existing tools in the market. One of the most advanced media tool with AI capabilities, AlphametricX aims to deliver efficiency, accuracy, and relevancy to its users. We are driven by our passion to increase end-to-end efficiencies of media listening teams.
            </p>
          </div>
          <div className='vision-wrapper'>
            <h2 className='heading'>Our Vision</h2>
            <p className='text'>Our mission is to revolutionize the landscape of media monitoring for business leaders by providing them unparalleled, almost real-time insights from integrated data sets. We are bridging the gap between different media sources to create a holistic view of a brand in an ever evolving digital landscape.</p>
          </div>
          <div className='mission-wrapper'>
            <h2 className='heading'>Our Mission</h2>
            <p className='text'>Our mission is to revolutionize the landscape of media monitoring for business leaders by providing them unparalleled, almost real-time insights from integrated data sets. We are bridging the gap between different media sources to create a holistic view of a brand in an ever evolving digital landscape.</p>
          </div>
          <div className='stand-wrapper'>
            <h2 className='heading'>What we stand for</h2>
            <div className='icon-container'>
              <div className='icon-wrapper'>
                <Accuracy />
                <p className='stand-text'>Accuracy</p>
              </div>
              <div className='icon-wrapper'>
                <Relevance />
                <p className='stand-text'>Relevance</p>
              </div>
              <div className='icon-wrapper'>
                <Innovation />
                <p className='stand-text'>Innovation</p>
              </div>
              <div className='icon-wrapper'>
                <Excellence />
                <div className='delivery-wrapper'>
                <span className='stand-text'>Delivery </span>
                <span className='stand-text'> Excellence</span>
                </div>
              </div>
            </div>
          </div>
          <div className='value-wrapper'>
            <h2 className='heading'>Our Values</h2>
            <div className='value-sub-wrapper'>
              <div className='value-content'>
                <p className='sub-head'>Honest</p>
                <p className='sub-text'>
                  This is the cornerstone of our principles upon which we build all our meaningful connections.</p>
              </div>
              <div className='value-content'>
                <p className='sub-head'>Transparent</p>
                <p className='sub-text'>
                  We foster a culture of transparency and integrity in all our interactions, both internally and externally.</p>
              </div>
            </div>
            <div className='value-sub-wrapper'>
              <div className='value-content'>
                <p className='sub-head'>Creative</p>
                <p className='sub-text'>
                  This is the cornerstone of our principles upon which we build all our meaningful connections.</p>
              </div>
              <div className='value-content'>
                <p className='sub-head'>Supportive</p>
                <p className='sub-text'>
                  We foster a culture of transparency and integrity in all our interactions, both internally and externally.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;

