import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import logoLight from '../../../assets/img/Alphametricx-logo.png';
import * as Yup from 'yup';
import logoMark from '../../../assets/img/Alphametricx-logo-mark-dark.png'
import Header from '../header';
import Footer from '../footer';
import './index.css';
import { countries, solutions } from '../../../constants/mock';
import { db } from '../../../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import SuccessTick from '../../../assets/icons/tick.png';
import { useNavigate } from 'react-router';

const RequestDemo = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [header, setHeader] = useState('header');
  const [buttonLinks, setButtonLinks] = useState('Button-links');
  const [logo, setLogo] = useState(logoLight);

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required.'),
    email: Yup.string().required('Email is required').email('Email is invalid.'),
    phone: Yup.string().required('Phone number is required.')
      .matches(/^\d{10}$/,
        'Phone number should be 10 digits.'
      ),
    country: Yup.string().required('Country is required.'),
    companyname: Yup.string().required('Company name is required.'),
    jobtitle: Yup.string().required('Job title is required.'),
    // solution: Yup.string().required('Solution is required.'),
  });
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      country: '',
      companyname: '',
      jobtitle: '',
      solution: '',
      createdAt: new Date().toISOString(),
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (data) => {
      try {
        await addDoc(collection(db, 'requestdemo'), data);
        setIsSuccess(true)
        formik.handleReset()
      } catch (e) {
        setIsError(true);
        console.error("Error adding document: ", e);
      }
    },
  });

  const handleCancel = () => {
    formik.handleReset()
    navigate('/')
  }
  const listenScrollEvent = event => {
    if (window.scrollY < 533) {
      return (setHeader('header'), setLogo(logoLight), setButtonLinks('Button-links'));
    } else if (window.scrollY > 530) {
      return (setHeader('header2'), setLogo(logoMark), setButtonLinks('Button-links2'));
    }
  };
  const handleOnSelect = (name, item) => {
    if (name === 'country') {
      formik.values.country = item?.value;
      formik?.setValues(formik?.values);
    } else if (name === 'solution') {
      formik.values.solution = item?.value;
      formik?.setValues(formik?.values);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);

  const handlePhoneNumber = (e) => {
    let value = e.target.value
    let pattern = /^^[0-9-!@#$%*?]/;
    if (value.match(pattern)) {
      formik.values.phone = value;
      formik?.setValues(formik?.values);
    } else {
      formik.values.phone = '';
      formik?.setValues(formik?.values);
    }

  }

  return (
    <div className='Request-Demo-Con'>
      <Header />
      <div className={isSuccess ? 'Req-demo-success' : 'Req-Demo-Modal'}>
        {isError && <span className='error-message'>Something went wrong please try again later.</span>}
        {isSuccess ?
          <>
            <img src={SuccessTick} alt='success-tick-preview' />
            <p className='success-message'>Thank you!</p>
            <p className='success-message-text'>We have recieved your request.
              Our team will get in touch with you.</p>          </>
          :
          <>
            <h2>Request Demo</h2>
            <p className='req-demo-des'>Please fill out the form and our experts will get in touch with you!</p>

            <div className='AMX-from'>
              <form className='form-fields-container' onSubmit={formik?.handleSubmit}>
                <div className='Input-col'>
                  <div className='Input-row'>
                    <label>First Name</label>
                    <input
                      className='AMX-input'
                      type='text'
                      name='firstname'
                      placeholder='Enter First Name'
                      value={formik?.values?.firstname}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                    />
                    <span className='error-message'>
                      {formik?.errors?.firstname && formik?.touched?.firstname
                        ? formik?.errors?.firstname
                        : null}
                    </span>
                  </div>
                  <div className='Input-row'>
                    <label>Last Name</label>
                    <input
                      className='AMX-input'
                      type='text'
                      name='lastname'
                      placeholder='Enter Last Name'
                      value={formik?.values?.lastname}
                      onChange={formik?.handleChange}
                    />
                    <span className='error-message'>
                      {formik?.errors?.lastname && formik?.touched?.lastname
                        ? formik?.errors?.lastname
                        : null}
                    </span>
                  </div>
                </div>
                <div className='Input-row'>
                  <label>Corporate Email</label>
                  <input
                    className='AMX-input'
                    type='text'
                    name='email'
                    placeholder='Enter Your Corporate Email Id'
                    value={formik?.values?.email}
                    onChange={formik?.handleChange}
                    touched={formik?.handleBlur}
                  />
                  <span className='error-message'>
                    {formik?.errors?.email && formik?.touched?.email
                      ? formik?.errors?.email
                      : null}
                  </span>
                </div>
                <div className='Input-row'>
                  <label>Phone Number</label>
                  <input
                    className='AMX-input'
                    type='text'
                    name='phone'
                    placeholder='Enter your phone number'
                    value={formik?.values?.phone}
                    onChange={(e) => handlePhoneNumber(e)}
                  />
                  <span className='error-message'>
                    {formik?.errors?.phone && formik?.touched?.phone
                      ? formik?.errors?.phone
                      : null}
                  </span>
                </div>
                <div className='Input-row'>
                  <label>Country</label>
                  {/* <SearchAutocomplete
                    items={countries}
                    handleSelect={(name, item) => handleOnSelect(name, item)}
                    name="country"
                  />
                  <span className='error-message'>
                    {formik?.errors?.country || formik?.touched?.country
                      ? formik?.errors?.country
                      : null}
                  </span> */}
                  <select
                    className={formik?.values?.country !== '' ? 'AMX-input' : 'AMX-input select-wrapper'}
                    name='country'
                    value={formik?.values?.country}
                    onChange={formik?.handleChange}
                  >
                    <option value={''} className='option-item'>Select</option>
                    {countries?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          className='option-item'
                          value={item.name}>
                          {item?.name}
                        </option>
                      )
                    })}
                  </select>
                  <span className='error-message'>
                    {formik?.errors?.country || formik?.touched?.country
                      ? formik?.errors?.country
                      : null}
                  </span>
                </div>
                <div className='Input-col'>
                  <div className='Input-row'>
                    <label>Company Name</label>
                    <input
                      className='AMX-input'
                      type='text'
                      name='companyname'
                      placeholder='Enter Your Company Name'
                      value={formik?.values?.companyname}
                      onChange={formik?.handleChange}
                    />
                    <span className='error-message'>
                      {formik?.errors?.companyname && formik?.touched?.companyname
                        ? formik?.errors?.companyname
                        : null}
                    </span>
                  </div>
                  <div className='Input-row'>
                    <label>Job Title</label>
                    <input
                      className='AMX-input'
                      type='text'
                      name='jobtitle'
                      placeholder='Enter Your Job Title'
                      value={formik?.values?.jobtitle}
                      onChange={formik?.handleChange}
                    />
                    <span className='error-message'>
                      {formik?.errors?.jobtitle && formik?.touched?.jobtitle
                        ? formik.errors.jobtitle
                        : null}
                    </span>
                  </div>
                </div>
                {/* <div className='Input-row'>
                  <label>Solutions you are interested in</label>
                  <SearchAutocomplete
                    items={solutions}
                    handleSelect={(name, item) => handleOnSelect(name, item)}
                    name="solution"
                  />
                  <select
                    className={formik?.values?.solution !== '' ? 'AMX-input' : 'AMX-input select-wrapper'}
                    name='solution'
                    value={formik?.values?.solution}
                    onChange={formik?.handleChange}
                  >
                    <option value={''} className='option-item'>Select</option>
                    {solutions?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          className='option-item'
                          value={item.value}>
                          {item?.label}
                        </option>
                      )
                    })}
                  </select>
                  <span className='error-message'>
                    {formik?.errors?.solution && formik?.touched?.solution
                      ? formik?.errors?.solution
                      : null}
                  </span>
                </div> */}
                <div className='Input-col Justify-Right col-m-reverse'>
                  <button className='AMX-secondary-btn' onClick={handleCancel}>Cancel</button>
                  <button type='submit' className='AMX-primary-btn'>Submit</button>
                </div>
              </form>
            </div>
          </>
        }
      </div>
      <Footer />
    </div>
  );
}

export default RequestDemo;

