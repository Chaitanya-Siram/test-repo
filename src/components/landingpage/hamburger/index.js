import React from 'react';
 import Hamburger from 'hamburger-react'

 const HamburgerComp = ({
    isOpen,
    setOpen
 }) => {

    return(
    <Hamburger toggled={isOpen} toggle={setOpen} duration={0.3}/>
    )

 }

 export default HamburgerComp;