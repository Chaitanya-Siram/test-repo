import React from 'react';
import {
  CoverupWrp,
  CutIcon,
  HeadingContainer,
  HeadingContainerHeading,
  // HeadingContainerHeadingtwo,
  // HeadingContainertwo,
  MajorDetails,
  MajorDetailsHeading,
  MajorDetailsHeadingContainer,
  MajorDetailsText,
  Mastercontainer,
  Unorderedlist,
  UnorderedlistItems,
  UpdationInfo,
  UpdationInfoBold,
  UpdationInfoNormal,
} from './index.sc';
import X from '../../assets/icons/X';

// import AppBG from '../app-bg';
// import bgsr from '../../assets/img/bg/bg_sr.svg';
// import AppHeader from '../app-header';
// import AppFooter from '../app-footer';

// Used for navigation
// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { CrossButtonWrp } from '../../pages/news-letter/newsletter-top-section/top-bar/index.sc';
// import ArrowLeft from '../../assets/icons/ArrowLeft';

export default function TermsAndConditions({ updateParentState, heading }) {
  // the onclick funtion to navigate
  // const navigate = useNavigate();
  const handleButtonClick = () => {
    updateParentState(false);
  };

  return (
    <>
      {/* <AppBG bg1h={'11.5%'} bg1={bgsr} />
      <AppHeader /> */}
      <CoverupWrp>
        <Mastercontainer>
          <HeadingContainer>
            {/* <CrossButtonWrp onClick={handleButtonClick}>
              <ArrowLeft color={'#656B8A'} width="2rem" />
            </CrossButtonWrp> */}
            <HeadingContainerHeading>{heading}</HeadingContainerHeading>
            <CutIcon onClick={handleButtonClick}>
              <X color="#cdcdcd"></X>
            </CutIcon>
          </HeadingContainer>
          {/* <HeadingContainertwo>
            <HeadingContainerHeadingtwo>
              Privacy Policy
            </HeadingContainerHeadingtwo>
          </HeadingContainertwo> */}
          <UpdationInfo>
            <UpdationInfoBold>Last updated: January 24, 2023</UpdationInfoBold>
            <UpdationInfoNormal>
              This Privacy Policy includes important information about your
              personal data and we encourage you to read it carefully.
            </UpdationInfoNormal>
          </UpdationInfo>
          <Unorderedlist>
            <UnorderedlistItems>
              Personal Data that we collect and how we use and share it
            </UnorderedlistItems>
            <UnorderedlistItems>
              More ways we collect, use and share Personal Data
            </UnorderedlistItems>
            <UnorderedlistItems>
              Legal bases for processing data
            </UnorderedlistItems>
            <UnorderedlistItems>Your rights and choices</UnorderedlistItems>
            <UnorderedlistItems>Security and retention</UnorderedlistItems>
            <UnorderedlistItems>
              PInternational data transfers
            </UnorderedlistItems>
            <UnorderedlistItems>Updates and notifications</UnorderedlistItems>
            <UnorderedlistItems>
              Jurisdiction-specific provisions
            </UnorderedlistItems>
            <UnorderedlistItems>Contact us</UnorderedlistItems>
          </Unorderedlist>
          <MajorDetails>
            <MajorDetailsHeadingContainer>
              <MajorDetailsHeading>
                Personal Data that we collect and how we use and share
              </MajorDetailsHeading>
            </MajorDetailsHeadingContainer>
            <MajorDetailsText>
              Lorem ipsum dolor sit amet consectetur. Urna porttitor nam in eu
              aliquam. Justo aenean elit tortor ipsum aliquet vel. Sodales ut
              nibh aliquam ac eleifend velit posuere. Donec pellentesque
              maecenas tempus ipsum diam hendrerit et. Ac praesent enim
              fermentum ut nec egestas. Turpis velit enim nisi sagittis
              nascetur. Consectetur risus interdum feugiat risus lobortis sem mi
              quis adipiscing. Morbi aliquet lacus volutpat in. Mauris et
              placerat in tellus est lorem nullam tempor. Ut varius et magna
              amet semper est viverra. Neque a vitae cras vitae odio. Cras
              tristique in blandit faucibus leo. Convallis id arcu quisque nisi
              purus leo eu vel sagittis. Aliquam nulla sed nunc est tortor
              aliquam nibh volutpat. Pellentesque id a pulvinar enim non nulla
              integer scelerisque etiam. Mattis faucibus hac justo adipiscing
              euismod duis mauris odio. Nibh egestas tellus nec etiam auctor
              integer enim elementum. Consectetur turpis mus lacus urna tellus.
              Neque quis integer morbi rhoncus malesuada urna aenean eget. Odio
              morbi sagittis blandit ullamcorper sit. Augue mattis vitae sed
              urna. Eget quisque vel a risus facilisis id. Vehicula quisque sem
              tincidunt tortor sit nunc adipiscing quam convallis. Cursus
              adipiscing scelerisque aliquet mauris elit. Mauris egestas dui
              aliquet netus quis faucibus ornare. Pretium dolor sed netus dictum
              mus pretium mi elementum. Malesuada id augue nunc integer
              tincidunt nunc est risus. Elementum sed nec dolor aenean.
            </MajorDetailsText>
            <MajorDetailsText>
              Lorem ipsum dolor sit amet consectetur. Morbi nibh mattis
              dignissim eget. Integer molestie facilisis congue sed imperdiet
              nulla proin nulla. Orci venenatis sed commodo vel. Amet non
              adipiscing nunc viverra lobortis dictum ac. Nisi sagittis
              elementum fringilla aenean ut et nibh lectus arcu. Tortor maecenas
              sit sit diam condimentum. Viverra velit libero euismod augue.
              Dictumst morbi tincidunt arcu at platea. Elementum fames feugiat.
            </MajorDetailsText>
            <MajorDetailsText>
              Lorem ipsum dolor sit amet consectetur. Urna porttitor nam in eu
              aliquam. Justo aenean elit tortor ipsum aliquet vel. Sodales ut
              nibh aliquam ac eleifend velit posuere. Donec pellentesque
              maecenas tempus ipsum diam hendrerit et. Ac praesent enim
              fermentum ut nec egestas. Turpis velit enim nisi sagittis
              nascetur. Consectetur risus interdum feugiat risus lobortis sem mi
              quis adipiscing. Morbi aliquet lacus volutpat in. Mauris et
              placerat in tellus est lorem nullam tempor. Ut varius et magna
              amet semper est viverra. Neque a vitae cras vitae odio. Cras
              tristique in blandit faucibus leo. Convallis id arcu quisque nisi
              purus leo eu vel sagittis. Aliquam nulla sed nunc est tortor
              aliquam nibh volutpat. Pellentesque id a pulvinar enim non nulla
              integer scelerisque etiam. Mattis faucibus hac justo adipiscing
              euismod duis mauris odio. Nibh egestas tellus nec etiam auctor
              integer enim elementum. Consectetur turpis mus lacus urna tellus.
              Neque quis integer morbi rhoncus malesuada urna aenean eget. Odio
              morbi sagittis blandit ullamcorper sit. Augue mattis vitae sed
              urna. Eget quisque vel a risus facilisis id. Vehicula quisque sem
              tincidunt tortor sit nunc adipiscing quam convallis. Cursus
              adipiscing scelerisque aliquet mauris elit. Mauris egestas dui
              aliquet netus quis faucibus ornare. Pretium dolor sed netus dictum
              mus pretium mi elementum. Malesuada id augue nunc integer
              tincidunt nunc est risus. Elementum sed nec dolor aenean.
            </MajorDetailsText>
            <MajorDetailsHeadingContainer>
              <MajorDetailsHeading>Title</MajorDetailsHeading>
            </MajorDetailsHeadingContainer>
            <MajorDetailsText>
              Lorem ipsum dolor sit amet consectetur. Urna porttitor nam in eu
              aliquam. Justo aenean elit tortor ipsum aliquet vel. Sodales ut
              nibh aliquam ac eleifend velit posuere. Donec pellentesque
              maecenas tempus ipsum diam hendrerit et. Ac praesent enim
              fermentum ut nec egestas. Turpis velit enim nisi sagittis
              nascetur. Consectetur risus interdum feugiat risus lobortis sem mi
              quis adipiscing. Morbi aliquet lacus volutpat in. Mauris et
              placerat in tellus est lorem nullam tempor. Ut varius et magna
              amet semper est viverra. Neque a vitae cras vitae odio. Cras
              tristique in blandit faucibus leo. Convallis id arcu quisque nisi
              purus leo eu vel sagittis. Aliquam nulla sed nunc est tortor
              aliquam nibh volutpat. Pellentesque id a pulvinar enim non nulla
              integer scelerisque etiam. Mattis faucibus hac justo adipiscing
              euismod duis mauris odio. Nibh egestas tellus nec etiam auctor
              integer enim elementum. Consectetur turpis mus lacus urna tellus.
              Neque quis integer morbi rhoncus malesuada urna aenean eget. Odio
              morbi sagittis blandit ullamcorper sit. Augue mattis vitae sed
              urna. Eget quisque vel a risus facilisis id. Vehicula quisque sem
              tincidunt tortor sit nunc adipiscing quam convallis. Cursus
              adipiscing scelerisque aliquet mauris elit. Mauris egestas dui
              aliquet netus quis faucibus ornare. Pretium dolor sed netus dictum
              mus pretium mi elementum. Malesuada id augue nunc integer
              tincidunt nunc est risus. Elementum sed nec dolor aenean.
            </MajorDetailsText>
          </MajorDetails>
        </Mastercontainer>
      </CoverupWrp>
      {/* <AppFooter /> */}
    </>
  );
}

TermsAndConditions.propTypes = {
  updateParentState: PropTypes.func,
  heading: PropTypes.string,
};
