import React from 'react';
import logoMark from '../../../assets/img/Alphametricx-logo-mark-dark.png';
import Header from '../header';
import Footer from '../footer';
import './index.css';

const Login = () => {


    return (
        <div className='Login-Container'>
            <Header />
            <div class="login-modal-wrapper">
                <div>
                    <img src={logoMark} alt='logo-mark-preview' />
                </div>
                <div>
                    <p className='login-title'>Hello!</p>
                </div>
                <div>
                    <p className='login-message-text'>We are currently in beta testing.</p>
                    <p className='login-message-text'>Please request a demo for early access.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;



