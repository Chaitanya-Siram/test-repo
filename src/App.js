import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/landingpage';
import RequestDemo from './components/landingpage/request-demo-modal';
import AboutUs from './components/landingpage/about-us';
import PrivacyPolicy from './components/landingpage/privacy-policies';
import TermsConditions from './components/landingpage/terms-conditions';
import ArticleDetails from './components/landingpage/article-details';
import Login from './components/landingpage/login';
import FeatureDetails from './components/landingpage/feature-details';
import Pricing from './components/landingpage/pricing';
const  App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={LandingPage} />
          <Route path='/request-demo' Component={RequestDemo} />
          <Route path='/about-us' Component={AboutUs} />
          <Route path='/features-details/:id' Component={FeatureDetails} />
          <Route path='/pricing' Component={Pricing} />
          <Route path='/privacy-policy' Component={PrivacyPolicy} />
          <Route path='/terms-conditions' Component={TermsConditions} />
          <Route path='/article-details/:id' Component={ArticleDetails} />
          <Route path='/request-login' Component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
