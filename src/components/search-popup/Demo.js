// This is just to check the Component
import React from 'react';
import SearchPopup from './SearchPopContent';
import DashboardPopup from '../dasboard-popup';

const Demo = () => {
  const [show, setShow] = React.useState(false);
  return (
    <div style={{ margin: 200 }}>
      <button onClick={() => setShow(!show)}>Click here</button>
      <DashboardPopup
        toggler={setShow}
        open={show}
        popContent={<SearchPopup />}
        padding="0px"
        Cross={true}
      />
    </div>
  );
};

export default Demo;
