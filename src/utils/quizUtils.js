import toast from "react-hot-toast";

export const createQuizData = (quizInfo, selectedTime, questions, optionType) => {
  // Validation checks
  console.log("qiozInfo", quizInfo)
  // console.log("top questions", questions)
  const isValid = validateQuizData(questions, quizInfo.quizType);

  if (!isValid) {
    // toast.error('Invalid quiz data. Please check your questions and options.');
    return null;
  }

  const quizData = {
    quizName: `${quizInfo.quizName}`,
    quizType: `${quizInfo.quizType}`,
    timeLimit: selectedTime,
    questions: questions.map((question, questionIndex) => ({
      id: question.id, // Use the application-level ID
      questionText: question.questionText,
      options: question.options.map((option, optionIndex) => ({
        id: option.id, // Use the application-level ID
        type: optionType.toLowerCase(),
        optionText: option.optionText,
        ...(optionType === 'Text & ImageURL' && {
          imageUrl: option.imageUrl || null, // Use the imageUrl instead of optionText
        }),
        ...(quizInfo.quizType !== 'Poll' && {
          correct: option.correct || false,
        }),
      })),
    })),
  };
  

  return quizData;
};

const validateQuizData = (questions, quizType) => {
  console.log("quiztype validate : ", quizType)
  let isValid = true; // Initialize isValid to true

  for (const question of questions) {
    // Check if every question has a question text
    if (!question.questionText) {
      toast.error('Each question must have a question text.');
      isValid = false;
      break;
    }

    // Check if every question has at least two options
    if (question.options.length < 2) {
      toast.error('Each question must have at least two options.');
      isValid = false;
      break;
    }

    // Check if the number of options doesn't exceed the maximum allowed
    if (question.options.length > 4) {
      toast.error('Each question can have a maximum of 4 options.');
      isValid = false;
      break;
    }

    // Check if there is at least one correct option when quiz type is not Poll
    if (quizType !== 'Poll') {
      const correctOptions = question.options.filter((option) => option.correct);
      if (correctOptions.length !== 1) {
        toast.error('Each question must have exactly one correct option.');
        isValid = false;
        break;
      }
    }

    // Check if every option has optionText
    for (const option of question.options) {
      if (!option.optionText) {
        toast.error('Each option must have an option text.');
        isValid = false;
        break;
      }
    }
  }

  return isValid;
};
