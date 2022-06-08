import React, { useEffect } from "react";
import p5 from "p5";
import { rando } from "@nastyox/rando.js";
import Data from "./Data";
import "./visual.css";

var myP5 = null;
let numOfSliders = 0;

function Visual() {
  const Sketch = (p) => {
    var parentSlider;
    const sliders = [];
    var sliderHolder = null;
    var parentSliderValue = null;

    p.stopFrames = () => {
      if (p.isLooping()) {
        p.noLoop();
      } else {
        p.loop();
      }
    };

    p.setup = () => {
      p.createCanvas(1000, 350);
      p.colorMode("RGB", 255, 255, 255);
      p.frameRate(30);
      sliderHolder = p.createDiv("");
      let parentSliderHolder = p.createDiv("");
      parentSliderHolder.addClass("parentSliderHolder");
      let parentSliderLabel = p.createP("Number of sliders");
      parentSliderLabel.addClass("parentSliderLabel");
      parentSliderLabel.parent(parentSliderHolder);
      parentSlider = p.createSlider(2, 10, 10, 1);
      parentSlider.addClass("parentSlider");
      parentSlider.addClass("slider");
      parentSlider.parent(parentSliderHolder);
      parentSliderValue = p.createP("");
      parentSliderValue.addClass("parentSliderValue");
      parentSliderValue.parent(parentSliderHolder);
      sliderHolder.addClass("sliderHolderDiv");
      numOfSliders = parentSlider.value();
      generateSliders(0, numOfSliders);
      p.stroke(248, 181, 81);
    };

    p.draw = () => {
      p.background(27, 29, 57);
      parentSliderValue.html(numOfSliders);
      if (numOfSliders !== parentSlider.value()) {
        let prev = numOfSliders;
        numOfSliders = parentSlider.value();
        generateSliders(prev, numOfSliders);
      }
      for (let index = 1; index < numOfSliders; index++) {
        p.line(
          sliders[index - 1].position()["x"] - 120,
          p.map(sliders[index - 1].value(), 0, 300, 135, -135) + 178,
          sliders[index].position()["x"] - 120,
          p.map(sliders[index].value(), 0, 300, 135, -135) + 178
        );
      }
    };

    function generateSliders(prev, newVal) {
      if (newVal >= prev) {
        for (let index = prev; index < newVal; index++) {
          var newSlider = p.createSlider(0, 300, rando(0, 301), 1);
          newSlider.addClass("slider");
          newSlider.parent(sliderHolder);
          sliders.push(newSlider);
        }
      } else {
        for (let index = 0; index < prev - newVal; index++) {
          sliders.pop().remove();
        }
      }
    }

    p.getSliderValues = () => {
      let sliderValues = [];
      for (let i = 0; i < numOfSliders; i++) {
        sliderValues.push(sliders[i].value());
      }
      return sliderValues;
    };
  };

  useEffect(() => {
    if (myP5 === null) {
      myP5 = new p5(Sketch, myRef.current);
    }
  });

  var myRef = React.createRef();

  function getSliderValuesReact() {
    return myP5.getSliderValues();
  }

  return (
    <>
      <div className="canvasHolder" ref={myRef}></div>
      <Data getData={getSliderValuesReact} />
    </>
  );
}

export default Visual;
