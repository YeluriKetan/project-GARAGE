import React, { useState } from "react";
import "./tutorial.css";
import { ReactComponent as HelpLogo } from "./../images/helpLogo.svg";
import { ReactComponent as CloseLogo } from "./../images/closeLogo.svg";
import Step1 from "./../images/step1.png";
import Step2 from "./../images/step2.png";
import Step3 from "./../images/step3.png";

function Tutorial() {
  const [dialogOpen, setDialogOpen] = useState(true);

  return (
    <>
      <button className="openTutorial" onClick={() => setDialogOpen(true)}>
        <HelpLogo className="helpLogo" />
      </button>
      {dialogOpen ? (
        <div className="containerDiv">
          <div className="closeArea" onClick={() => setDialogOpen(false)}></div>
          <div className="tutorialContent">
            <section>
              <h2>Step 1</h2>
              <p>Adjust the sliders to create a graph</p>
              <img src={Step1} alt="step 1" className="step1img" />
            </section>
            <section>
              <h2>Step 2</h2>
              <p>Input the bounds and count</p>
              <img src={Step2} alt="step 2" className="step2img" />
            </section>
            <section>
              <h2>Step 3</h2>
              <p>Click on generate and copy!</p>
              <img src={Step3} alt="step 3" className="step3img" />
            </section>
            <CloseLogo
              className="closeLogo"
              onClick={() => setDialogOpen(false)}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Tutorial;
