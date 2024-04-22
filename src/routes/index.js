import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from '../hooks/useAuth';
import { roles } from '../constants';
import Unauthorized from '../components/unauthorized';
import { profile } from '../components/media-database-page/mock';
import DashboardIcon from '../assets/icons/DashboardIcon';
import NewslettersIcon from '../assets/icons/NewslettersIcon';
import MediaDatabashIcon from '../assets/icons/MediaDatabashIcon';
import SettingIcon from '../assets/icons/SettingIcon';
// temp
// import TermsAndConditions from '../components/terms-and-conditions-privacy-policy';
// import FAQpt2 from '../components/FAQ-component/Part2';

// import ContactUs from '../components/contact-us';
// import Advanced from '../components/search-result/dashboard-section/dashboard-header/advanced';
// import DateRangeComp from '../components/Calendar/Calendar';
// import DownLoadPdf from '../pages/download-pdf';
// import GraphTest from '../components/graph-test';
import CircularLoading from '../assets/icons/loading/circularLoading';
import { theme } from '../constants/theme';
import { PageLoadingWrp } from '../assets/icons/loading/circularLoading.sc';
// const LazyPageNotFound = lazy(() => import());
import Proptypes from 'prop-types';
// import OTPVerificationLogin from '../pages/otp-verification-login';
// import ForgotPassword from '../pages/forgot-password';
// import CreatePassword from '../pages/create-password';
// import CreatePasswordReset from '../pages/create-password-reset';
import WrapperCompoent from '../pages/new-dashboard/wrapper-compoent';
// import LoginPage from '../pages/login';

const Error = lazy(() => import('../components/error'));
const LoginPage = lazy(() => import('../pages/login'));

const DateRangeComp = lazy(() => import('../components/Calendar/Calendar'));
const Advanced = lazy(() =>
  import(
    '../components/search-result/dashboard-section/dashboard-header/advanced'
  )
);
const ContactUs = lazy(() => import('../components/contact-us'));
const TermsAndConditions = lazy(() =>
  import('../components/terms-and-conditions-privacy-policy')
);
const FAQpt2 = lazy(() => import('../components/FAQ-component/Part2'));
const DownLoadPdf = lazy(() => import('../pages/download-pdf'));
const GraphTest = lazy(() => import('../components/graph-test'));
const OTPVerificationLogin = lazy(() =>
  import('../pages/otp-verification-login')
);
const ForgotPassword = lazy(() => import('../pages/forgot-password'));

const CreatePassword = lazy(() => import('../pages/create-password'));
const CreatePasswordReset = lazy(() =>
  import('../pages/create-password-reset')
);

const LazyHome = lazy(() => import('../pages/home'));
const LazyPageNotFound = lazy(() => import('../components/page-not-fount'));
const LazySearchResults = lazy(() => import('../pages/search-results'));
// const LazyPopup = lazy(() => import('../components/map-popups/Demo'));
const LazyPopup = lazy(() => import('../components/new-dashboard'));
const LazyMediaDatabase = lazy(() => import('../pages/media-database/index'));
const LazyProfilePage = lazy(() => import('../pages/profile-page/index'));
const LazySettings = lazy(() => import('../pages/settings'));
const LazyNewsLetter = lazy(() => import('../pages/news-letter'));
const LazyNewsLetterList = lazy(() =>
  import('../pages/news-letter/newsletter-table')
);
const LazyDashoboard = lazy(() => import('../pages/dashboard'));
const LazyCreateDashboard = lazy(() => import('../pages/new-dashboard'));
const LazyAllWidgets = lazy(() => import('../pages/all-widgets'));

export const navMenu = [
  {
    label: 'Login',
    path: '/login',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LoginPage />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: false,
  },
  {
    label: 'Login',
    path: '/reset-password',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <CreatePasswordReset />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: false,
  },
  {
    label: 'Login',
    path: '/otp-verification-login',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <OTPVerificationLogin />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: false,
  },
  {
    label: 'Login',
    path: '/forgot-password',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <ForgotPassword />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: false,
  },
  {
    label: 'Create Password',
    path: '/create-password',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <CreatePassword />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: false,
  },
  {
    label: 'Home',
    path: '/',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyHome />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'Dashboards',
    path: 'dashboards',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyDashoboard />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: true,
    protected: true,
    icon: <DashboardIcon />,
  },

  {
    label: 'Newsletters',
    path: 'news-letter',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyNewsLetterList />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: true,
    protected: true,
    icon: <NewslettersIcon />,
  },
  {
    label: 'News Letter',
    path: 'news-letter/:newsLetterId',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyNewsLetter />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: false,
    protected: true,
  },
  {
    label: 'News Letter',
    path: 'create-news-letter/:searchId',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyNewsLetter />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: false,
    protected: true,
  },
  {
    label: 'Download PDF',
    path: 'download-pdf',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <DownLoadPdf />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: false,
    protected: true,
  },
  {
    label: 'News Letter',
    path: 'create-news-letter',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        {/* <LazyNewsLetterList /> */}
        <LazyNewsLetter />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: false,
    protected: true,
  },
  {
    label: 'Media Database',
    path: 'media-database',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyMediaDatabase />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: true,
    protected: true,
    icon: <MediaDatabashIcon />,
  },

  {
    label: 'Search Results',
    path: 'search-results/',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazySearchResults />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: false,
    protected: true,
  },
  {
    label: 'Search Results',
    path: 'search-results/:searchId/overview/:savedSearchId?',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazySearchResults />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'Profile Page',
    path: 'media-database/:profileId',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyProfilePage profile={profile} />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'Alerts',
    path: 'settings',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazySettings />
      </Suspense>
    ),
    errorElement: <Error />,
    menuItem: true,
    icon: <SettingIcon />,
  },
  // {
  //   label: 'Alerts',
  //   path: 'alerts',
  //   element: (
  //     <Suspense fallback={<div>Loading</div>}>
  //       <h1>Alerts</h1>
  //     </Suspense>
  //   ),
  //   errorElement: <Error />,
  //   menuItem: true,
  // },
  {
    label: 'Settings',
    path: 'settings/:tab1?',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazySettings />
      </Suspense>
    ),
    errorElement: <Error />,
    icon: <SettingIcon />,
    protected: true,
  },
  {
    label: 'Settings',
    path: 'settings/:tab1?/:tab2?',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazySettings />
      </Suspense>
    ),
    errorElement: <Error />,
    icon: <SettingIcon />,
    protected: true,
  },
  {
    label: 'Popup',
    path: 'popup',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyPopup />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'AllWidget',
    path: 'all-widgets',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <LazyAllWidgets />
      </Suspense>
    ),
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'Admin',
    path: 'admin',
    element: <></>,
    errorElement: <Error />,
    protected: true,
    role: ['admin'],
  },
  // temp
  {
    label: 'Terms and conditions',
    path: 'terms-and-conditions',
    element: <TermsAndConditions />,
    errorElement: <Error />,
    protected: false,
  },
  {
    label: 'Contact Us',
    path: 'contact-us',
    element: <ContactUs />,
    errorElement: <Error />,
    protected: false,
  },
  {
    label: 'Create Dashboard',
    path: 'dashboard/:searchId/:dashboardType/:dashboardId?',
    element: (
      <Suspense
        fallback={
          <PageLoadingWrp>
            <CircularLoading
              bgColor={theme.light.primary}
              size="0.25rem"
              width="1.875rem"
              height="1.875rem"
            />
          </PageLoadingWrp>
        }
      >
        <WrapperCompoent>
          <LazyCreateDashboard />
        </WrapperCompoent>
      </Suspense>
    ),
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'Tabs',
    path: 'advanced',
    element: <Advanced />,
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'Calendar',
    path: 'calendar',
    element: <DateRangeComp />,
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'GraphTest',
    path: 'GraphTest',
    element: <GraphTest />,
    errorElement: <Error />,
    protected: true,
  },
  {
    label: 'FAQsection',
    path: 'faq',
    element: <FAQpt2 />,
    errorElement: <Error />,
    protected: false,
  },
];

const AMXRoutes = ({ isAuthenticated }) => {
  // const token = useSelector((store) => {
  //   return store?.user?.data?.token || '';
  // });

  return (
    <Routes>
      {/* Unprotected routes */}
      {navMenu
        .filter((ele) => ele.protected === isAuthenticated)
        .map((ele, i) => (
          <Route
            key={`${ele.path}-${i}`}
            path={ele.path}
            element={ele.element}
            errorElement={ele.errorElement}
          />
        ))}

      {/* Protected routes with roles */}
      {roles.map((role, i) => (
        <Route
          key={`access-control-routes-${i}`}
          element={<RequireAuth allowedRoles={[role.access_type]} />}
        >
          {navMenu
            .filter((ele) => ele.protected === isAuthenticated)
            .map((ele, i) => (
              <Route
                key={`${ele.path}-${i}`}
                path={ele.path}
                element={ele.element}
                errorElement={ele.errorElement}
              />
            ))}
        </Route>
      ))}

      {/* Protected routes all roles allowed */}
      <Route
        element={
          <RequireAuth allowedRoles={roles.map((role) => role.access_type)} />
        }
      >
        {navMenu
          .filter((ele) => ele.protected === isAuthenticated)
          .map((ele, i) => (
            <Route
              key={`${ele.path}-${i}`}
              path={ele.path}
              element={ele.element}
              errorElement={ele.errorElement}
            />
          ))}
      </Route>
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      {isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}

      <Route
        label={'Unauthorized'}
        path="/Unauthorized"
        element={<Unauthorized />}
        errorElement={<Error />}
      />
      <Route
        label={'Page Not Fount'}
        path="*"
        element={
          <Suspense fallback={<div>Loading</div>}>
            <LazyPageNotFound />
          </Suspense>
        }
        errorElement={<Error />}
      />
    </Routes>
  );
};

AMXRoutes.propTypes = {
  isAuthenticated: Proptypes.bool,
};

export default AMXRoutes;
