const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

function getDefinition(word) {
  fetch(apiUrl + word)
    .then(response => response.json())
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      displayDefinition(word, definition);
    })
    .catch(error => console.log(error));
}

function getRandomWord() {
  fetch('https://random-word-form.herokuapp.com/random/adjective?count=4')
    .then(response => response.json())
    .then(data => {
      const randomWord = data[0];
      getDefinition(randomWord);
      getWordOptions(randomWord);
    })
    .catch(error => console.log(error));
}

function getRandomWord() {
  fetch('https://random-word-form.herokuapp.com/random/adjective?count=4')
    .then(response => response.json())
    .then(data => {
      const randomWords = data;
      displayWords(randomWords);
      getDefinition(randomWords[0]);
      getWordOptions(randomWords[0], randomWords);
    })
    .catch(error => console.log(error));
}

function displayWords(words) {
  const wordsContainer = document.getElementById('words');
  wordsContainer.innerHTML = '';
  words.forEach(word => {
    const wordItem = document.createElement('div');
    wordItem.textContent = word;
    wordsContainer.appendChild(wordItem);
  });
}



function displayDefinition(word, definition) {
  const definitionDiv = document.getElementById('definition');
  definitionDiv.innerHTML = `
    <h2>${word}</h2>
    <p>${definition}</p>
  `;
}

function displayWordOptions(wordOptions) {
  const wordOptionsList = document.getElementById('word-options');
  wordOptionsList.innerHTML = '';
  wordOptions.forEach(word => {
    const listItem = document.createElement('li');
    listItem.textContent = word;
    wordOptionsList.appendChild(listItem);
  });
}

document.getElementById('start-btn').addEventListener('click', getRandomWord);
