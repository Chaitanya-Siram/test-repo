import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import logoLight from '../../../assets/img/Alphametricx-logo.png';
import logoMark from '../../../assets/img/Alphametricx-logo-mark-dark.png';
import HamburgerComp from '../hamburger';
import './index.css';
import { featureData } from '../../../constants/mock';


const Header = () => {
  const [header, setHeader] = useState('header');
  const [buttonLinks, setButtonLinks] = useState('Button-links');
  const [isOpen, setOpen] = useState(false)
  const [logo, setLogo] = useState(logoLight);
  const navigate = useNavigate()
  const location = useLocation();
  const isMobile = useMediaQuery({
    query: '(max-width: 960px)'
  })

  const listenScrollEvent = event => {
    if (window.scrollY < 533) {
      return (setHeader('header'), setLogo(logoLight), setButtonLinks('Button-links'))
    } else if (window.scrollY > 530) {
      return (setHeader('header2'), setLogo(logoMark), setButtonLinks('Button-links2'))
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  const handleNavigate = (path) => {
    if (path === 'home') {
      navigate('/')
    } else if (path === 'request-demo') {
      navigate('/request-demo')
    } else if (path === 'about-us') {
      navigate('/about-us')
      location?.pathname?.includes(path) ?
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }) : window.scrollTo({
          top: 0,
        })
    } else if (path === 'features-details') {
      navigate(`/features-details/id:?${featureData[0]?.id}`,{
        state: featureData[0],
      })
      location?.pathname?.includes(path) ?
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      }) : window.scrollTo({
        top: 0,
      })
    } else if(path === 'pricing'){
      navigate('/pricing')
    }  else if (path === 'login') {
      // navigate('/request-login')
      // const url = 'https://dev.devamx.com/login';
      const url = 'https://app.alphametricx.com/login';
      const win = window.open(url, '_blank');
      win?.focus();
    }
  }
  return (
    <header className={header}>
      {!isMobile ?
        <>
          <div className='Header-L' onClick={() => handleNavigate('home')}>
            <img className='Amx-logo' src={logo} alt='amx-logo' />
          </div>
          <div className='Header-R'>
            <button className={buttonLinks} onClick={() => handleNavigate('about-us')} >About Us</button>
            <button className={buttonLinks} onClick={() => handleNavigate('features-details')} >Features</button>
            <button className={buttonLinks} onClick={() => handleNavigate('pricing')} >Pricing</button>
            {/* <button className={buttonLinks}>Tutorials</button> */}
            <button className={buttonLinks} onClick={() => handleNavigate('request-demo')}>Request Demo</button>
            <button className={buttonLinks} onClick={() => handleNavigate('login')}>Login</button>
          </div>
        </>
        :
        <div className='mobile-view'>
          <img className='Amx-logo' src={logo} alt='amx-logo' onClick={() => handleNavigate('home')} />
          <div className='mobile-hambur-view'>

            <div style={{ transform: 'scale(0.75)' }}>
              <HamburgerComp
                isOpen={isOpen}
                setOpen={setOpen}
              />
            </div>
          </div>
          <div className='mobile-view-list'>
            {isOpen ?
              <div className='hambur-view'>
                <button className='buttonLinks-m' onClick={() => handleNavigate('about-us')} >About Us</button>
                <button className='buttonLinks-m' onClick={() => handleNavigate('features-details')} >Features</button>
                <button className='buttonLinks-m' onClick={() => handleNavigate('pricing')} >Pricing</button>
                {/* <button className='buttonLinks-m'>Tutorials</button> */}
                <button className='buttonLinks-m' onClick={() => handleNavigate('request-demo')}>Request Demo</button>
                <button className='buttonLinks-m' onClick={() => handleNavigate('login')}>Login</button>
              </div> :
              <div className='hide'></div>

            }
          </div>
        </div>
      }
    </header>
  );
}

export default Header;

