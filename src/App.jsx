import { useState } from 'react';
import './App.css';
import { questions } from './questions';

const App = () => {
	const [step, setStep] = useState(0);
	const [correct, setCorrect] = useState(0);

	const question = questions[step];

	const progressPercentage = (step / questions.length) * 100;

	const handleNextQuestion = i => {
		if (i === question.correct_answer) {
			setCorrect(correct + 1);
		}
		setStep(step + 1);
	};

	return (
		<div className="app">
			{questions.length !== step ? (
				<Game
					question={question}
					onNextQuestion={handleNextQuestion}
					progressPercentage={progressPercentage}
				/>
			) : (
				<Result correct={correct} />
			)}
		</div>
	);
};

const Game = ({ question, onNextQuestion, progressPercentage }) => {
	return (
		<>
			<div className="progressBar">
				<div
					style={{ width: `${progressPercentage}%` }}
					className="progressBarInner"
				></div>
			</div>
			<h1 className="title">{question.question_text}</h1>
			<ul>
				{question.options.map((option, i) => (
					<li key={i} onClick={() => onNextQuestion(i)}>
						{option}
					</li>
				))}
			</ul>
		</>
	);
};

const Result = ({ correct }) => {
	return (
		<div className="result">
			<img src="https://media.tenor.com/sZAFBih2R54AAAAC/minions.gif" alt="" />
			<h1>
				Ви Відгадали {correct} із {questions.length}
			</h1>
			<a href="/">Спробувати знову</a>
		</div>
	);
};

export default App;
