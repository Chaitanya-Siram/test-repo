import React from 'react';
import AMXFadedLogo from '../../../assets/img/AMX-graphic-01.svg';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './index.css';




const Footer = (props) => {
    const {showFadedGraphic} = props;
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        if (path === 'privacy-policy') {
            navigate('/privacy-policy');
        } else if (path === 'terms-conditions') {
            navigate('/terms-conditions');
        }
        location?.pathname?.includes(path) ? window.scrollTo({
            top: 0,
            behavior: 'smooth',
        }) : window.scrollTo({
            top: 0,
        })
    }

    return (
        <div className='Section-footer'>
          {showFadedGraphic ? <div className='Amx-faded-graphic-con'>
                <img className='Amx-faded-graphic' src={AMXFadedLogo} alt='amx-faded-graphic' />
            </div>:null}

            <div className='Footer-Content'>

                <div className='Row-80'>
                    <div className='Col-50'>
                        <p className='Footer-Logo'>Alphametricx</p>
                        <p>Follow us on</p>
                        <div className='Social-Links'>
                            <a><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                                <path d='M23.4991 6.21703C23.3625 5.70821 23.0946 5.24419 22.7223 4.87142C22.35 4.49864 21.8863 4.23019 21.3777 4.09293C19.5054 3.58936 12 3.58936 12 3.58936C12 3.58936 4.49464 3.58936 2.62232 4.09025C2.11345 4.22707 1.64953 4.49537 1.27716 4.86821C0.904787 5.24105 0.637069 5.70531 0.500893 6.21436C-1.02179e-07 8.08936 0 12.0001 0 12.0001C0 12.0001 -1.02179e-07 15.9108 0.500893 17.7831C0.776786 18.817 1.59107 19.6313 2.62232 19.9072C4.49464 20.4108 12 20.4108 12 20.4108C12 20.4108 19.5054 20.4108 21.3777 19.9072C22.4116 19.6313 23.2232 18.817 23.4991 17.7831C24 15.9108 24 12.0001 24 12.0001C24 12.0001 24 8.08936 23.4991 6.21703ZM9.61607 15.5894V8.41078L15.8304 11.9733L9.61607 15.5894Z' fill='#969DA5' /></svg>
                            </a>
                            <a><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                                <path d='M12 8.42948C10.034 8.42948 8.42949 10.0339 8.42949 12C8.42949 13.9661 10.034 15.5706 12 15.5706C13.9661 15.5706 15.5706 13.9661 15.5706 12C15.5706 10.0339 13.9661 8.42948 12 8.42948ZM22.709 12C22.709 10.5214 22.7223 9.05627 22.6393 7.58037C22.5563 5.86609 22.1652 4.34466 20.9116 3.09109C19.6554 1.83484 18.1366 1.44644 16.4223 1.36341C14.9438 1.28037 13.4786 1.29377 12.0027 1.29377C10.5241 1.29377 9.05895 1.28037 7.58306 1.36341C5.86877 1.44644 4.34734 1.83752 3.09377 3.09109C1.83752 4.34734 1.44913 5.86609 1.36609 7.58037C1.28306 9.05894 1.29645 10.5241 1.29645 12C1.29645 13.4759 1.28306 14.9438 1.36609 16.4197C1.44913 18.1339 1.8402 19.6554 3.09377 20.9089C4.35002 22.1652 5.86877 22.5536 7.58306 22.6366C9.06163 22.7197 10.5268 22.7063 12.0027 22.7063C13.4813 22.7063 14.9465 22.7197 16.4223 22.6366C18.1366 22.5536 19.6581 22.1625 20.9116 20.9089C22.1679 19.6527 22.5563 18.1339 22.6393 16.4197C22.725 14.9438 22.709 13.4786 22.709 12ZM12 17.4938C8.95984 17.4938 6.50627 15.0402 6.50627 12C6.50627 8.95984 8.95984 6.50627 12 6.50627C15.0402 6.50627 17.4938 8.95984 17.4938 12C17.4938 15.0402 15.0402 17.4938 12 17.4938ZM17.7188 7.5643C17.009 7.5643 16.4357 6.99109 16.4357 6.28127C16.4357 5.57144 17.009 4.99823 17.7188 4.99823C18.4286 4.99823 19.0018 5.57144 19.0018 6.28127C19.002 6.44982 18.969 6.61675 18.9046 6.77251C18.8402 6.92827 18.7457 7.0698 18.6265 7.18898C18.5073 7.30816 18.3658 7.40266 18.21 7.46707C18.0543 7.53147 17.8873 7.56451 17.7188 7.5643Z' fill='#969DA5' />
                            </svg>
                            </a>
                            <a><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                                <path d='M21.8571 1.28564H2.14279C1.66868 1.28564 1.28564 1.66868 1.28564 2.14279V21.8571C1.28564 22.3312 1.66868 22.7142 2.14279 22.7142H21.8571C22.3312 22.7142 22.7142 22.3312 22.7142 21.8571V2.14279C22.7142 1.66868 22.3312 1.28564 21.8571 1.28564ZM19.3821 7.54011H17.6705C16.3285 7.54011 16.0687 8.17761 16.0687 9.11511V11.1803H19.2723L18.8544 14.4133H16.0687V22.7142H12.7285V14.416H9.93475V11.1803H12.7285V8.79636C12.7285 6.02939 14.4187 4.52136 16.8883 4.52136C18.0723 4.52136 19.0874 4.60975 19.3848 4.64993V7.54011H19.3821Z' fill='#969DA5' />
                            </svg>
                            </a>
                        </div>
                    </div>
                    <div className='Col-50'>
                        <p className='Footer-title'>Address</p>
                        <p>800 E Campbell Road, Suite 288 Richardson, Dallas, Texas - 75081
                            <br></br>
                            <br></br>
                            E: info@alphametricx.com</p>
                    </div>

                </div>
            </div>
            <div className='Row-80 Footer-Endline'>
                <div className='Col-50'>
                    <div className='Footer-Links'>
                        <p className='nav-link' onClick={() => handleNavigate('privacy-policy')} >Privacy Policy</p>
                        <p className='nav-link' onClick={() => handleNavigate('terms-conditions')} >Terms & Conditions</p>
                    </div>
                </div>
                <div className='Col-50'>
                    <div className='Footer-Links Footer-CopyRights'>
                        Alphametricx © 2024 . All rights reserved
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
