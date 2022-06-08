import React, { useState } from "react";
import { rando } from "@nastyox/rando.js";
import Modal from "./Modal";
import "./data.css";
import { ReactComponent as CopyLogo } from "./../images/copyLogo.svg";
import { ReactComponent as RandomLogo } from "./../images/randomLogo.svg";

const inputPattern = new RegExp(/^-?\d{1,10}$/);

function Data({ getData }) {
  const [text, setText] = useState("Click on generate!");
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(10000);
  const [count, setCount] = useState(100);
  const [modal, setModal] = useState({ showModal: false, modalContent: "" });

  const closeModal = () => {
    setModal({ ...modal, showModal: false });
  };

  function kUniqInRange(a, b, k) {
    let total_possible = b - a + 1;
    let output_array = [];
    if (k >= total_possible / 2) {
      let req_set = new Set();
      while (req_set.size < total_possible - k) {
        let rand_number = rando(a, b);
        req_set.add(rand_number);
      }
      for (let i = a; i <= b; i++) {
        if (!req_set.has(i)) {
          output_array.push(i);
        }
      }
    } else {
      let req_set = new Set();
      while (req_set.size < k) {
        let rand_number = rando(a, b);
        req_set.add(rand_number);
      }
      for (let reqSetElement of req_set) {
        output_array.push(reqSetElement);
      }
      output_array.sort((a, b) => a - b);
    }
    return output_array;
  }

  function generateNumbersInText(frozenSliderValues, a, b, c) {
    let uniqValues = kUniqInRange(a, b, c);
    let sliderValues = chooseSliderValues(frozenSliderValues, uniqValues, c);
    let ansArr = spreadRemainingValues(sliderValues, uniqValues);
    var ansString = "";
    for (let currVal of ansArr) {
      ansString += currVal.toString();
      ansString += " ";
    }
    return ansString;
  }

  function chooseSliderValues(frozenSliderValues, uniqValues, k) {
    let sliderOrdering = [];
    let ans = [];
    for (let index = 0; index < frozenSliderValues.length; index++) {
      sliderOrdering.push([frozenSliderValues[index], index]);
      ans.push(0);
    }
    sliderOrdering.sort((a, b) => a[0] - b[0]);
    let sliderMappedValues = [uniqValues[0]];
    uniqValues[0] = NaN;
    let chosenIndices = kUniqInRange(1, k - 2, frozenSliderValues.length - 2);
    for (const currMappedIndex of chosenIndices) {
      sliderMappedValues.push(uniqValues[currMappedIndex]);
      uniqValues[currMappedIndex] = NaN;
    }
    sliderMappedValues.push(uniqValues[k - 1]);
    uniqValues[k - 1] = NaN;
    for (let index = 0; index < frozenSliderValues.length; index++) {
      ans[sliderOrdering[index][1]] = sliderMappedValues[index];
    }
    return ans;
  }

  function spreadRemainingValues(sliderValues, uniqValues) {
    let twoDArray = [];
    let len = sliderValues.length;
    for (let i = 0; i < len - 1; i++) {
      twoDArray.push([]);
    }
    let pointer = 0;
    for (let currVal of uniqValues) {
      if (isNaN(currVal)) {
        continue;
      }

      while (true) {
        if (sliderValues[pointer] < sliderValues[pointer + 1]) {
          if (
            sliderValues[pointer] < currVal &&
            currVal < sliderValues[pointer + 1]
          ) {
            twoDArray[pointer].push(currVal);
            pointer = (pointer + 1) % (len - 1);
            break;
          } else {
            pointer = (pointer + 1) % (len - 1);
          }
        } else {
          if (
            sliderValues[pointer] > currVal &&
            currVal > sliderValues[pointer + 1]
          ) {
            twoDArray[pointer].push(currVal);
            pointer = (pointer + 1) % (len - 1);
            break;
          } else {
            pointer = (pointer + 1) % (len - 1);
          }
        }
      }
    }
    let ans = [];
    for (let i = 0; i < len - 1; i++) {
      ans.push(sliderValues[i]);
      if (sliderValues[i] > sliderValues[i + 1]) {
        twoDArray[i].reverse();
      }
      ans = ans.concat(twoDArray[i]);
    }
    ans.push(sliderValues[len - 1]);
    return ans;
  }

  function ensureInputValidity(numOfSliders) {
    if (
      !(
        inputPattern.test(lower.toString()) &&
        inputPattern.test(upper.toString()) &&
        inputPattern.test(count.toString())
      )
    ) {
      setModal({
        showModal: true,
        modalContent: "Limit inputs between -10^9 to 10^9",
      });
      return [false];
    }
    let a = Number(lower);
    let b = Number(upper);
    let c = Number(count);
    if (a >= b) {
      setModal({
        showModal: true,
        modalContent: "Lower bound has to be strictly less than upper bound",
      });
      return [false];
    }
    if (b - a + 1 < c) {
      setModal({
        showModal: true,
        modalContent: "Count is too larger than range",
      });
      return [false];
    }
    if (c < numOfSliders) {
      setModal({
        showModal: true,
        modalContent: "Count is less than number of sliders",
      });
      return [false];
    }
    if (c > 50000) {
      setModal({
        showModal: true,
        modalContent: "Count is limited to 50000",
      });
      return [false];
    }
    return [true, a, b, c];
  }

  function generateValuesButton() {
    let frozenSliderValues = getData();
    let validityResult = ensureInputValidity(frozenSliderValues.length);
    if (!validityResult[0]) {
      setText("Try again!");
      return;
    }
    setText(
      generateNumbersInText(
        frozenSliderValues,
        validityResult[1],
        validityResult[2],
        validityResult[3]
      )
    );
  }

  function copyResult() {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <div className="inputLabelDivContainer">
        <div className="inputLabelDiv">
          <label className="inputLabel" htmlFor="lowerBound">
            Lower Bound :
          </label>
          <input
            type="number"
            name="Lower Bound"
            id="lowerBound"
            value={lower}
            onChange={(e) => setLower(e.target.value)}
            className="numericalInput"
          />
        </div>
        <div className="inputLabelDiv">
          <label className="inputLabel" htmlFor="upperBound">
            Upper Bound (inclusive) :
          </label>
          <input
            type="number"
            name="Upper Bound"
            id="upperBound"
            value={upper}
            onChange={(e) => setUpper(e.target.value)}
            className="numericalInput"
          />
        </div>
        <div className="inputLabelDiv">
          <label className="inputLabel" htmlFor="count">
            Count :
          </label>
          <input
            type="number"
            name="Count"
            id="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="numericalInput"
          />
        </div>
      </div>
      <button className="generateButton" onClick={generateValuesButton}>
        Generate
        <RandomLogo className="randomLogo" />
      </button>
      <div className="resultDiv">
        <p className="generatedText">{text}</p>
        <button className="copyButton" onClick={copyResult}>
          <CopyLogo className="copyLogo" />
        </button>
      </div>
      {modal.showModal && (
        <Modal
          closeModal={closeModal}
          modalContent={modal.modalContent}
          classname={""}
        />
      )}
    </>
  );
}

export default Data;
