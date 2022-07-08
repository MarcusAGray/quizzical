<h1>Quizzical</h1>

<a href="https://quizzical-mag.herokuapp.com/"> Link </a>

A quiz based game built using React

<img src="https://user-images.githubusercontent.com/17533749/174472849-c87c2686-6417-47cd-be8c-d70f3aead5be.png" width="500">

<h2>Overview</h2>

Quizzical is a quiz game that uses the Trivia API from the <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.
A player can make choose settings for the quiz, such as the genre and difficulty of the questions. When the quiz ends the correct answers are revealed and a score is given.


<h2>Technologies Used</h2>
<ul>
  <li>Javascript</li>
  <li>CSS</li>
  <li>React</li>
  <li>Git</li>
  <li>External API</li>
  <li>React</li>
  <li>React Router</li>
</ul>

<h2>Approach Taken</h2>
I presented different options to the user that would customise a fetch call to the Trivia API that would be invoked when they started the quiz.

A user is then presented with questions, 5 per page. Their answers are highlighted. When they finish the quiz they are given a score. Their correct answers and incorrect answers are highlighted accordingly. They can choose to play again with different settings if they wish.

The fetch call has been configured with a session id. This prevents the player from being asked the same questions if they play the quiz multiple times.

<!-- ![image](https://user-images.githubusercontent.com/17533749/174472811-a4a8a725-2ed7-45c5-8ddb-60504fe81dec.png) -->
<img src="https://user-images.githubusercontent.com/17533749/174472811-a4a8a725-2ed7-45c5-8ddb-60504fe81dec.png" width="800">

<h2>Wins and Blockers</h2>
I have written this program so that I can easily scale the size of the quiz, or give additional choices to the user. 
I think it would be interesting to expand the quiz from a single API.

<h2>Scripts</h2>
To install all dependencies;

### npm install

In the project directory, you can run;

### npm start

Runs the app in the development mode.


