export const COLORS = {
  background: '#323437',
  text: '#646669',
  active: '#e2b714',
  correct: '#d1d0c5',
  incorrect: '#ca4754',
  error: '#ff0000',
  success: '#28a745',
  cursor: '#e2b714',
  highlight: 'rgba(226, 183, 20, 0.2)',
  wordError: 'rgba(202, 71, 84, 0.2)',
};

export const TEST_CONFIG = {
  wordCount: 25,
  timeLimit: 5,
};

export const WORD_LIST = `
  the be to of and a in that have I
  it for not on with he as you do
  at this but his by from they we
  say her she or an will my one all
  would there their what up out if
  about who get which go me when make
  can like time no just him know take`.split(/\s+/).filter(Boolean);
