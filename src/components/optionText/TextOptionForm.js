import React, { useState, useEffect } from "react";
import styles from "./TextOptionForm.module.css";
import { HiTrash } from "react-icons/hi";

const TextOptionForm = ({
  optionType,
  questions,
  setQuestions,
  selectedCount,
  formType,
}) => {
  const [options, setOptions] = useState([1, 2]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionsText, setOptionsText] = useState({});

  useEffect(() => {
    setOptionsText(questions[selectedCount].options);
  }, [selectedCount]);

  useEffect(() => {
    questions[selectedCount].options = optionsText;
  }, [optionsText]);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions((prevOptions) => [...prevOptions, options.length + 1]);
    }
  };

  const handleRemoveOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((i) => i !== index));
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setQuestions[selectedCount].correctOption = index;
  };

  console.log("optionsText", optionsText);
  const handleOptionTextChange = (index, text) => {
    if (optionType !== "Text & ImageURL")
      setOptionsText({
        ...optionsText,
        [index]: text,
      });
  };

  return (
    <div className={styles.optionsContainer}>
      {options.map((index) => (
        <div key={index} className={styles.optionContainer}>
          {formType !== "Pool Type" && (
            <input
              type="radio"
              name="option"
              // value={ optionsText[selectedCount]?.[index] || ""}
              className={styles.optionRadio}
              onClick={() => handleOptionClick(index)}
            />
          )}
          <input
            type="text"
            placeholder={optionType.split(" ")[0]}
            className={`${styles.optionText} ${
              selectedOption === index && styles.selectedOption
            }`}
            value={optionsText[index] || ""}
            onChange={(e) => handleOptionTextChange(index, e.target.value)}
          />
          {optionType === "Text & ImageURL" && (
            <input
              type="text"
              placeholder={optionType.split(" ")[2]}
              className={`${styles.optionText} ${
                selectedOption === index && styles.selectedOption
              }`}
            />
          )}
          {index > 2 && (
            <HiTrash
              color="#D60000"
              className={styles.trash}
              onClick={() => handleRemoveOption(index)}
            />
          )}
        </div>
      ))}

      {options.length < 4 && (
        <div className={styles.optionContainer}>
          <button className={styles.addOption} onClick={handleAddOption}>
            Add option
          </button>
        </div>
      )}
    </div>
  );
};

export default TextOptionForm;
