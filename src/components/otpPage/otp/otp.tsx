import React, { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import styles from "./Otp.module.css";



const Otp: React.FC<{length:number}> = ({ length }) => {
  const [inputs, setInputs] = useState(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) { // Only allow single-digit numbers
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus(); // Focus next input if not last
      } else {
        inputRefs.current[index]?.blur(); // Remove focus if last input
      }
    }
  };

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newInputs = [...inputs];
      if (inputs[index]) {
        newInputs[index] = ""; // Clear current input if not empty
      } else if (index > 0) {
        newInputs[index - 1] = ""; // Move to previous input if empty
        inputRefs.current[index - 1]?.focus();
      }
      setInputs(newInputs);
    }
  };
  

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, startIndex: number) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length - startIndex);
    const newInputs = [...inputs];
    let currentIndex = startIndex;

    for (let i = 0; i < pasteData.length && currentIndex < length; i++) {
      if (/^\d$/.test(pasteData[i]) && newInputs[currentIndex] === "") {
        newInputs[currentIndex] = pasteData[i];
        currentIndex++;
      }
    }
    setInputs(newInputs);
    inputRefs.current[Math.min(currentIndex, length - 1)]?.focus();
  };

  return (
    <div className={styles.container}>
      {inputs.map((input, index) => (
        <input
          ref={(element) => {
            if (element) {
              inputRefs.current[index] = element;
            }
          }}
          key={index}
          value={input}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default Otp;