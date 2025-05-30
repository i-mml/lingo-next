// Contraction mapping for English contractions and their expansions
const contractionMap: { [key: string]: string } = {
  "you're": "you are",
  youre: "you are",
  "you are": "you're",
  "i'm": "i am",
  im: "i am",
  "i am": "i'm",
  "don't": "do not",
  dont: "do not",
  "do not": "don't",
  "can't": "cannot",
  cant: "cannot",
  cannot: "can't",
  "won't": "will not",
  wont: "will not",
  "will not": "won't",
  "it's": "it is",
  its: "it is",
  "it is": "it's",
  "that's": "that is",
  thats: "that is",
  "that is": "that's",
  "what's": "what is",
  whats: "what is",
  "what is": "what's",
  "who's": "who is",
  whos: "who is",
  "who is": "who's",
  "where's": "where is",
  wheres: "where is",
  "where is": "where's",
  "when's": "when is",
  whens: "when is",
  "when is": "when's",
  "why's": "why is",
  whys: "why is",
  "why is": "why's",
  "how's": "how is",
  hows: "how is",
  "how is": "how's",
};

export default contractionMap;
