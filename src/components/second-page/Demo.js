import React, { useState } from 'react';
import DashboardPopup from '../dasboard-popup';
import SecondPage from '.';

const Demo = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>click</button>
      <DashboardPopup
        open={show}
        toggler={setShow}
        popContent={<SecondPage />}
      />
    </div>
  );
};

export default Demo;
