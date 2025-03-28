import React, { useState } from 'react';
import './HomePage.css'
const HomePage = (props) => {
const {value:toggleOn, function:handleToggle} = props

  return (
    <>
      <div className="container">
        <img src="/assets/icon/instyleSS.png" alt="Image" />
        <button className="switch" > hi </button>

        {/* <div className="toggle-button"> */}
          {/* <label className="switch">
            <input type="checkbox" checked={toggleOn} onChange={handleToggle} />
            <span className="slider round"></span>
          </label> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default HomePage;
