import React from 'react';
import Header from '../header';
import Footer from '../footer';
import './index.css';
import { PricingData } from '../../../constants/mock';
import PricingTick from '../../../assets/icons/PricingTick';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/request-demo')
  }


  return (
    <div className='pricing-Con'>
      <Header />
      <div className='pricing-Modal'>
      <div className='pricing-Modal-info'>
        <h2 className='pricing-heading'>Pricing</h2>
        <p className='pricing-des'>Why settle for a one-size-fits-all kind of price when you can have a custom subscription price? Tell us your requirements and we will customize the price for you.</p>
        <div className='pricing-btn-wrapper'>
          <button className='get-in-touch-btn' onClick={handleNavigate}>Get in Touch</button>
        </div>
        </div>
        <div className='pricing-info-container'>
        <div className='pricing-info-list'>
          {
            PricingData?.map((item, index) => {
              return(
                <div className='pricing-info-item'>
                  <span><PricingTick /></span><p className='pricing-info-text'>{item?.des}</p>
                </div>
              )
            })
          }

        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pricing;

