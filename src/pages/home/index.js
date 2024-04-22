// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { userName } from '../../redux/slices/userSlice';
// import Carousel from '../../components/carousel';
// import { Link } from '../../components/nav-section/index.sc';
// import { Image } from '../../assets/img/image.svg';
// import PropTypes from 'prop-types';
// import {
//   BoldText,
//   BoxWrapper,
//   ContentWrapper,
//   ImgWrapper,
//   LightText,
//   TextWrapper,
//   TitleWrapper,
// } from './index.sc';

// const Compoarr = ({ title, lightText, boldText }) => {
//   return (
//     <>
//       <ContentWrapper className="child">
//         <TitleWrapper>{title} </TitleWrapper>
//         <BoxWrapper>
//           <ImgWrapper src={Image} />{' '}
//           <TextWrapper>
//             <BoldText>{boldText}</BoldText>
//             <LightText>{lightText}</LightText>
//           </TextWrapper>
//         </BoxWrapper>
//       </ContentWrapper>
//     </>
//   );
// };

// const Childs = [
//   <Compoarr
//     key={1}
//     boldText={'Rihanna Can’t Stop Carrying This Bag'}
//     lightText={
//       'It’s no surprise that Rihanna was one of the first to fall for Gucci’s new season Horsebit bags.'
//     }
//     title={'Trending'}
//   />,
//   <Compoarr
//     key={2}
//     boldText={'Rihanna Can’t Stop Carrying This Bag'}
//     lightText={
//       'It’s no surprise that Rihanna was one of the first to fall for Gucci’s new season Horsebit bags.'
//     }
//     title={'Trending'}
//   />,
//   <Compoarr
//     key={3}
//     boldText={'Rihanna Can’t Stop Carrying This Bag'}
//     lightText={
//       'It’s no surprise that Rihanna was one of the first to fall for Gucci’s new season Horsebit bags.'
//     }
//     title={'Trending'}
//   />,
// ];

// Compoarr.propTypes = {
//   i: PropTypes.number,
//   title: PropTypes.string,
//   lightText: PropTypes.string,
//   boldText: PropTypes.string,
//   img: PropTypes.string,
// };

// const Home = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((store) => {
//     return store?.user?.data?.firstName || '';
//   });

//   const user = useSelector((store) => {
//     return store?.user?.name || '';
//   });

//   const changeName = () => {
//     dispatch(userName('Bro'));
//   };

//   return (
//     <div>
//       <div>user: {user}</div>
//       <div>user name: {data}</div>
//       {[1, 2, 3, 4, 5, 6].map((ele) => (
//         <Link key={ele} to={`search-results/${ele}`}>
//           dash{ele}
//         </Link>
//       ))}
//       <button onClick={changeName}>change user</button>
//       <div style={{ display: 'flex' }}>
//         <Carousel
//           handleClick={() => console.log('clicked')}
//           slides={Childs}
//           width={300}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import AppHeader from '../../components/app-header';
import { HomeWrp, Wrapper } from './index.sc';
import AppBG from '../../components/app-bg';
import SearchSection from '../../components/home-page/search-section';
import TabSection from '../../components/home-page/tab-section';
import AppFooter from '../../components/app-footer';
import UserSection from '../../components/home-page/user-section';
import { getTokenData } from '../../constants/validateToken';

const Home = () => {
  const tokenData = getTokenData();
  return (
    <>
      <HomeWrp>
        <AppBG bg1h={'100%'} />
        <AppHeader />
        <Wrapper>
          <UserSection />
          <SearchSection />
          {tokenData?.role !== 'Analyst' && <TabSection />}
          <AppFooter />
        </Wrapper>
      </HomeWrp>
    </>
  );
};

export default Home;
