import React, { useState } from 'react';
import TypingTest from '../components/typingbox/TypingTest';
import { WORD_LIST, TEST_CONFIG } from '../constants';

const TypingTestPage = () => {
	const [wordList, setWordList] = useState(() => 
		[...WORD_LIST].sort(() => Math.random() - 0.5).slice(0, TEST_CONFIG.wordCount)
	);

	const handleRestart = () => {
		setWordList([...WORD_LIST].sort(() => Math.random() - 0.5).slice(0, TEST_CONFIG.wordCount));
	};

	return (
		<div>
			<TypingTest
				initialWords={wordList}
				timeLimit={TEST_CONFIG.timeLimit}
				onComplete={handleRestart} // restart callback handed over if needed
			/>
		</div>
	);
};

export default TypingTestPage;
