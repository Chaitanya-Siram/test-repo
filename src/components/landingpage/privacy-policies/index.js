import React from 'react';
import Header from '../header';
import Footer from '../footer';
import './index.css';


const PrivacyPolicy = () => {
  return (
    <div>
      <div className='private-policy'>
        <div className='private-policy-header'>
          <Header />
          <h5 className='Policy-head'>Privacy Policy</h5>
        </div>
        <div className='policy-content-container'>
          <div>
            <p className='policy-content'>
              We respect the privacy of our customers and individuals who use our services. This SaaS Privacy Policy (“Policy”) is made available to describe how we collect, use, and share personal data that we process on behalf of our Customers when they use our hosted software applications (“Services,” “Software”). The policy also describes the choices that our Customers have regarding the use, access, and correction of Personal Information that we process in the course of fulfilling our obligations as a service provider/software provider according to the End User License Agreement (EULA) executed between the Company and our Customers.
            </p>
          </div>
          <div className='policy-wrapper'>
            <h2 className='policy-heading'>1.Information We Collect</h2>
            <p className='policy-text'>
              1.1 User Generated Data: We may collect information voluntarily provided by Customers such as usernames, email addresses, and any other information they choose to share.</p>
            <p className='policy-text'> 1.2 Publicly Available Data: We may collect and process publicly available data from various sources on the internet for analytics purposes.</p>
            <p className='policy-text'>  1.3 Automatically Collected Data: We may collect data about our Customer’s use of our service/software, including but not limited to IP address, device information, browser type, and usage patterns.
            </p>
          </div>
          <div className='policy-wrapper'>
            <h2 className='policy-heading'>2. How We Use Information</h2>
            <p className='policy-text'>
              2.1 Provide Service: We use the Personal Information collected to provide the service stated in the EULA. We use this information to provide the service, including to verify your identity when you log in, communicate with you about the service, prevent or address service or technical problems, respond to support issues, provide transaction histories, or otherwise operate, maintain, and improve the Services. We may also use Personal Information when responding to Customer’s instructions or as may be required by law in accordance with the EULA.
            </p>
            <p className='policy-text'>
              We analyze information about how Customers use our services to identify trends, usage, activity patterns, and to develop new products, features, and technologies that benefit our Customers. We also analyze certain new features with some Customers before rolling the feature out to all Customers.
              To provide certain features, we may create aggregated, anonymized data from Customer Data by removing, obfuscating, or otherwise anonymizing data components that make data personally identifiable. Our use of such anonymized data is not subject to this Policy.
            </p>
            <p className='policy-text'>
              2.2 To Secure Service: We use information about Customers and their use of the Services to verify accounts and activity and to detect, prevent, and respond to potential or actual security incidents. We also use Customer information to monitor and protect against other malicious, deceptive, fraudulent, or illegal activity, including violations of service policies.
            </p>
            <p className='policy-text'>  2.3 Protect Interests & Legal Rights:</p>
            <p className='policy-text'>  Where required by law or where we believe it is necessary to protect our legal rights, interests and the interests of others, including our Customers, we use such information. Customer information may be used in connection with legal claims, compliance, regulatory, and audit functions, and disclosures in connection with acquisition, merger, or sale of a business.</p>
            <p className='policy-text'>  We process Customer information only when:</p>
            <p className='policy-text'>  2.3.1 We need it to operate the Services, provide customer support and personalized features, and to protect security of the Services.
            </p>
            <p className='policy-text'>  2.3.2 It satisfies a legitimate interest (which is not overridden by Customer’s data protection interests).
            </p>
            <p className='policy-text'>  2.3.3 We have Customer consent to process the information for a specific purpose
            </p>
            <p className='policy-text'> 2.3.4 We need to process the information to comply with a legal obligation
              If a Customer has previously consented to use of their information and then later on change their mind, such change in stance shall not affect any processing that has already taken place. If a Customer objects to processing of their information by the Company or by a third party with legitimate interest, it may amount to mean no longer using the Services.
            </p>
          </div>
          <div className='policy-wrapper'>
            <h2 className='policy-heading'>3. Information Sharing</h2>
            <p className='policy-text'>
              3.1 Third Party Service Providers: We may share your information with third - party service providers to facilitate the provision of the Service and perform any business related functions.
            </p>
            <p className='policy-text'>  3.2 Legal Compliance: We may disclose your information to comply with legal obligations, enforce our policies, or respond to legal claims.</p>
          </div>

          <div className='policy-wrapper'>
            <h2 className='policy-heading'>4. Retention of Information</h2>
            <p className='policy-text'>We will retain your information as long as necessary to fulfill the purposes outlined in the Privacy Policy, unless a longer retention period is required or permitted by law.</p>
          </div>

          <div className='policy-wrapper'>
            <h2 className='policy-heading'>5. Customer Rights</h2>
            <p className='policy-text'>We acknowledge that Customer has the right to access their personal information and can request access or seek to correct, amend, or delete inaccurate Personal Information by contacting our support team.We shall process such Customer request as soon as reasonably practical, or within a reasonable timeframe, provided we are not otherwise prevented from doing so on legal grounds.If we are unable to meet such request, we shall let the Customer know the reason for it.</p>
          </div>

          <div className='policy-wrapper'>
            <h2 className='policy-heading'>6. Customer Obligations</h2>
            <p className='policy-text'>
              Through the Customer’s use of our services, we may collect information about the Customer’s personnel or someone else. In such cases, the information provider must ensure that they are authorized to disclose that information to us, and we are not required to take any further steps applicable under any applicable data protection or privacy laws.We may process such information for the purposes described in the sections above.
              The information provider must take reasonable steps to ensure the individual concerned is aware of and / or consents to the various matters detailed in this Policy, including the fact that their Personal Information is being collected, processed for purposes listed in the Policy, their rights to obtain access to this information, and how to contact our team to seek amendment or removal of this information.
              Where requested to do so, the information provider must also assist us with any requests by the individual to access or update the Personal Information it has collected from them.
              It will be information provider’s responsibility to ensure that the Personal Information provided to us is accurate, complete, and up to date.
            </p>
          </div>
          <div className='policy-wrapper'>
            <h2 className='policy-heading'>7. Personal Information Protection</h2>
            <p className='policy-text'>We are committed to protecting our Customer’s Personal Information and take all reasonable precautions to protect it from unauthorized access, modification, or disclosure.We maintain a security program that contains industry standard, administrative, technical, and physical safeguards designed to prevent unauthorized access to our Customer’s data.When the Personal Information is no longer needed, we will take all reasonable steps to de - identify or destroy it.</p>
          </div>
          <div className='policy-wrapper'>
            <h2 className='policy-heading'>8. Changes to Policy</h2>
            <p className='policy-text'>
              We may update this Privacy Policy from time to time to reflect the changes to our information practices.We will notify our Customers of any changes by posting the new Privacy Policy on the website.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default PrivacyPolicy;