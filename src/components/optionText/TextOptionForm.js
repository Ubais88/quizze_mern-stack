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
  const initialOptions = [
    { id: 1, optionText: "", correct: false },
    { id: 2, optionText: "", correct: false },
  ];
  const [totalOptions , setTotalOptions] = useState(2)
  const [options, setOptions] = useState(initialOptions);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionsText, setOptionsText] = useState({});

  useEffect(() => {
    setOptionsText(questions[selectedCount].options);
  }, [selectedCount]);

  useEffect(() => {
    questions[selectedCount].options = optionsText;
  }, [optionsText]);

  const handleAddOption = (e) => {
    e.preventDefault();
    if (options.length < 4) {
      setOptions((prevOptions) => [
        ...prevOptions,
        {
          id: totalOptions+1,
          optionText: "",
          correct: false,
        },
      ]);
    }
    setTotalOptions(totalOptions+1);
  };


  const handleRemoveOption = (id) => {
    // e.preventDefault();
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
    setTotalOptions(totalOptions - 1);
  };
  

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  console.log("optionsText", optionsText);

  const handleOptionTextChange = (id, text) => {
    // e.preventDefault();
    console.log("textoption", id, text);
    console.log("textoptionq", optionsText);
    if (optionType !== "Text & ImageURL") {
      setTotalOptions((prevOpt) =>
        prevOpt.map((option) =>
          option.id === id ? { ...option, optionText: text } : option
        )
      );
    }
  };


  return (
    <form className={styles.optionsContainer}>
      {options.map((option) => (
        <div key={option.id} className={styles.optionContainer}>
          {formType !== "Poll" && (
            <input
              type="radio"
              name="option"
              className={styles.optionRadio}
              onClick={() => handleOptionClick(option.id)}
            />
          )}

          <input
            type="text"
            placeholder={optionType.split(" ")[0]}
            className={`${styles.optionText} ${
              selectedOption === option.id && styles.selectedOption
            }`}
            // value={optionsText[option.id].optionText || ""}
            onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
          />
          {optionType === "Text & ImageURL" && (
            <input
              type="text"
              placeholder={optionType.split(" ")[2]}
              className={`${styles.optionText} ${
                selectedOption === option.id && styles.selectedOption
              }`}
            />
          )}
          {option.id > 2 && (
            <HiTrash
              color="#D60000"
              className={styles.trash}
              onClick={() => handleRemoveOption(option.id)}
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
    </form>
  );
};

export default TextOptionForm;
