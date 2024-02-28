
import React, { useState, useEffect } from 'react';
import './index.css';

const HeroInteractive = () => {

  // const [heroOffset, setHeroOffset] = useState('Hero-Container');


  // const listenScrollEvent = event => {
  //   if (window.scrollY < 533) {
  //     return (setHeroOffset('Hero-Container'))
  //   } else if (window.scrollY > 530) {
  //     return (setHeroOffset('Hero-Container-Fixed'))
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', listenScrollEvent);

  //   return () => window.removeEventListener('scroll', listenScrollEvent);
  // }, []);


  return (
    <div className='Hero-Container'>
      <div className='Hero-layer1'></div>
      <div className='Hero-layer2'></div>
      <div className='Hero-layer3'></div>
      <div className='Hero-layer4'></div>
    </div>

  );
}

export default HeroInteractive;

