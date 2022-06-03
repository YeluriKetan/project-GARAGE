import "./App.css";
import p5 from "p5";
import React, { useEffect } from "react";
// import { rando } from "@nastyox/rando.js";

function App() {
  let numOfSliders = 0;
  const Sketch = (p) => {
    var parentSlider;
    const sliders = [];

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
      parentSlider = p.createSlider(2, 10, 10, 1);
      parentSlider.addClass("parentSlider");
      numOfSliders = parentSlider.value();
      generateSliders(0, numOfSliders);
    };

    p.draw = () => {
      p.background(27, 29, 0);
      p.stroke(255);
      if (numOfSliders !== parentSlider.value()) {
        let prev = numOfSliders;
        numOfSliders = parentSlider.value();
        generateSliders(prev, numOfSliders);
      }
      for (let index = 1; index < numOfSliders; index++) {
        p.line(
          100 * index - 45,
          p.map(sliders[index - 1].value(), 0, 300, 142, -142) + 178,
          100 * (index + 1) - 50,
          p.map(sliders[index].value(), 0, 300, 142, -142) + 178
        );
      }
      // if (p.frameCount === 100) {
      //   for (const iterator of sliders) {
      //     console.log(iterator.value());
      //   }
      //   console.log("new data");
      //   generateNumbers();
      // }
    };

    function generateSliders(prev, newVal) {
      if (newVal >= prev) {
        for (let index = prev; index < newVal; index++) {
          var newSlider = p.createSlider(0, 300, p.random(0, 301), 1);
          newSlider.position(65 + 100 * (index + 1), 320);
          newSlider.addClass("slider");
          newSlider.size(300, 20);
          sliders.push(newSlider);
        }
      } else {
        for (let index = 0; index < prev - newVal; index++) {
          sliders.pop().remove();
        }
      }
    }

    function generateNumbers() {
      var arr = [],
        arr2 = [],
        arr3 = [];
      for (let index = 0; index < numOfSliders; index++) {
        arr.push(p.random(0, 1000000000));
        arr2.push([sliders[index].value(), index]);
        arr3.push(0);
      }
      arr.sort((a, b) => a - b);
      arr2.sort((a, b) => a[0] - b[0]);
      for (let index = 0; index < numOfSliders; index++) {
        arr3[arr2[index][1]] = arr[index];
      }

      var ans = "";
      for (let index = 0; index < numOfSliders; index++) {
        ans += arr3[index].toString();
        ans += " ";
      }
      console.log(ans);
    }
  };

  var myRef = React.createRef();
  var myP5;

  useEffect(() => {
    myP5 = new p5(Sketch, myRef.current);
  });

  function stopFramesInReact() {
    myP5.stopFrames();
  }

  return (
    <main className="main">
      <div className="canvasHolder" ref={myRef}></div>
      <button className="customButton" onClick={stopFramesInReact}>
        Hello
      </button>
    </main>
  );
}

export default App;
