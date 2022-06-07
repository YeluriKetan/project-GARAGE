import React, { useState } from "react";
import { rando } from "@nastyox/rando.js";
import Modal from "./components/Modal";

const inputPattern = new RegExp(/^-?\d{1,10}$/);

function Data({ getData }) {
  const [text, setText] = useState("");
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(10000);
  const [count, setCount] = useState(100);
  const [modal, setModal] = useState({ showModal: false, modalContent: "" });

  const closeModal = () => {
    setModal({ ...modal, showModal: false });
  };

  function generateNumbers(frozenSliderValues, frozenNumOfSliders, a, b, c) {
    var arr = [],
      arr2 = [],
      arr3 = [];
    for (let index = 0; index < frozenNumOfSliders; index++) {
      arr.push(rando(a, b));
      arr2.push([frozenSliderValues[index], index]);
      arr3.push(0);
    }
    arr.sort((a, b) => a - b);
    arr2.sort((a, b) => a[0] - b[0]);
    for (let index = 0; index < frozenNumOfSliders; index++) {
      arr3[arr2[index][1]] = arr[index];
    }

    var ans = "";
    for (let index = 0; index < frozenNumOfSliders; index++) {
      ans += arr3[index].toString();
      ans += " ";
    }
    return ans;
  }

  function ensureInputValidity() {
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
        modalContent: "Count is too big",
      });
      return [false];
    }
    return [true, a, b, c];
  }

  function generateValuesButton() {
    let validityResult = ensureInputValidity();
    if (!validityResult[0]) {
      return;
    }
    let frozenSliderValues = getData();
    setText(
      generateNumbers(
        frozenSliderValues,
        frozenSliderValues.length,
        validityResult[1],
        validityResult[2],
        validityResult[3]
      ).toString()
    );
  }

  function copyResult() {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <div>
        <input
          type="number"
          name="Lower Bound"
          value={lower}
          onChange={(e) => setLower(e.target.value)}
        />
        <input
          type="number"
          name="Upper Bound"
          value={upper}
          onChange={(e) => setUpper(e.target.value)}
        />
        <input
          type="number"
          name="Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>
      <button className="generateButton" onClick={generateValuesButton}>
        Generate
      </button>
      <p className="generatedText">{text}</p>
      <button className="copyButton" onClick={copyResult}>
        Copy to clipboard
      </button>
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
