import {useState, useEffect} from 'react';
import axios from 'axios';
import CountdownTimer from '../components/countDownTimer';
import {Link} from 'react-router-dom';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=10&category=27&type=multiple'
        );
        setQuestions(
          response.data.results.map((question) => ({
            ...question,
            // Randomly shuffle the answer choices
            answers: shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
          }))
        );
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleAnswer = (answer) => {
    // Update user's answer for the current question
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      [currentIndex]: answer,
    }));

    // Set the selected answer
    setSelectedAnswer(answer);

    // Move to the next question if there are more questions available
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(''); // Reset selected answer for the next question
    } else {
      // Calculate score if all questions are answered
      calculateScore();
    }
  };

  // const handleNextQuestion = () => {
  //   if (currentIndex < questions.length - 1) {
  //     setCurrentIndex((prevIndex) => prevIndex + 1);
  //     setSelectedAnswer('');
  //   } else {
  //     calculateScore();
  //   }
  // };

  const calculateScore = () => {
    let correctCount = 0;
    console.log('userAnswers', userAnswers);
    Object.keys(userAnswers).forEach((index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = questions[index].correct_answer;
      if (userAnswer === correctAnswer) {
        correctCount++;
      }
    });
    const wrongCount = questions.length - correctCount;
    localStorage.setItem(
      'score',
      JSON.stringify({correct: correctCount, wrong: wrongCount})
    );
    setScore({correct: correctCount, wrong: wrongCount});
  };

  const handleTimeOut = () => {
    calculateScore();
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-r from-sky-500 to-indigo-500">
      {score ? (
        <div className="w-full flex flex-col items-center justify-center my-8 mx-24 bg-white shadow-2xl rounded-2xl p-8">
          <div className="flex flex-col p-8 gap-2 items-center justify-center border-2 border-blue-400 rounded-2xl w-1/3">
            <div className="text-4xl font-bold">Quiz Result</div>
            <div className="text-xl">Correct Answer : {score.correct}</div>
            <div className="text-xl">Wrong Answer : {score.wrong}</div>
            <Link
              to={'/home'}
              className="text-white cursor-pointer rounded-xl bg-blue-500 hover:bg-blue-600 p-3 "
            >
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col my-8 mx-24 bg-white shadow-2xl rounded-2xl p-8">
          <div className="flex flex-row justify-between">
            <div>
              Question {currentIndex + 1} of {questions.length}
            </div>
            <CountdownTimer initialSeconds={60} onTimeout={handleTimeOut} />
          </div>
          <span className="border-b border-black my-4"></span>
          <div>
            {currentIndex + 1}. {questions[currentIndex]?.question}
          </div>
          <div className="flex flex-col w-full gap-2 mt-3">
            {questions[currentIndex]?.answers.map((answer, index) => (
              <div
                key={index}
                className={`hover:bg-blue-500 focus:bg-blue-500 focus:text-white cursor-pointer hover:text-white px-4 py-2 rounded-lg border-2 border-blue-400 ${
                  selectedAnswer === answer ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => handleAnswer(answer)}
              >
                {answer}
              </div>
            ))}
            {/* {selectedAnswer && (
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                onClick={handleNextQuestion}
              >
                {currentIndex < questions.length - 1
                  ? 'Next Question'
                  : 'Finish Quiz'}
              </button>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
