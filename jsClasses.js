// Define a Word class that represents a single word in the game.
class Word {
    constructor(word) {
      this.word = word;
      this.definition = null;
      this.isCorrect = false;
    }
  
    // Method to get the definition of the word using the API.
    async getDefinition() {
      try {
        const response = await fetch(apiUrl + this.word);
        const data = await response.json();
        this.definition = data[0].meanings[0].definitions[0].definition;
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  // Define a Game class that represents the overall game and its state.
  class Game {
    constructor() {
      this.words = [];
      this.currentWord = null;
      this.wordOptions = [];
    }
  
    // Method to get a set of random words using the API.
    async getRandomWords() {
      try {
        const response = await fetch('https://random-word-form.herokuapp.com/random/adjective?count=4');
        const data = await response.json();
        this.words = data.map(word => new Word(word));
        this.currentWord = this.words[0];
        await this.currentWord.getDefinition();
        this.wordOptions = this.getWordOptions();
        this.displayWords();
        this.displayDefinition();
        this.displayWordOptions();
      } catch (error) {
        console.log(error);
      }
    }
  
    // Method to get the possible word options for the current word.
    getWordOptions() {
      const allWords = this.words.map(word => word.word);
      const correctWord = this.currentWord.word;
      const incorrectWords = allWords.filter(word => word !== correctWord);
      const shuffledWords = shuffleArray([...incorrectWords, correctWord]);
      return shuffledWords;
    }
  
    // Method to check if the player has selected the correct word option.
    checkAnswer(selectedWord) {
      if (selectedWord === this.currentWord.word) {
        this.currentWord.isCorrect = true;
        return true;
      } else {
        return false;
      }
    }
  
    // Method to display the words in the game container.
    displayWords() {
      const wordsContainer = document.getElementById('game-container');
      wordsContainer.innerHTML = '';
      this.words.forEach(word => {
        const wordItem = document.createElement('div');
        wordItem.textContent = word.word;
        if (word.isCorrect) {
          wordItem.classList.add('correct');
        }
        wordsContainer.appendChild(wordItem);
      });
    }
  
    // Method to display the definition of the current word.
    displayDefinition() {
      const definitionDiv = document.getElementById('definition');
      definitionDiv.innerHTML = `
        <h2>${this.currentWord.word}</h2>
        <p>${this.currentWord.definition}</p>
      `;
    }
  
    // Method to display the possible word options.
    displayWordOptions() {
      const wordOptionsList = document.getElementById('word-options');
      wordOptionsList.innerHTML = '';
      this.wordOptions.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        listItem.addEventListener('click', () => {
          const isCorrect = this.checkAnswer(word);
          if (isCorrect) {
            this.displayWords();
            this.displayDefinition();
            this.displayWordOptions();
          } else {
            listItem.classList.add('incorrect');
          }
        });
        wordOptionsList.appendChild(listItem);
      });
    }
  }
  
  export { Word, Game };
  