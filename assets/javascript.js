var panel = $("#quiz-area");
var countStartNumber = 30;


var questions = [{
  question: "What was the name of the two kids in Wolf Children?",
  answers: ["Yuki & Ame", "Saki & Inu", "Yusuke & Hina", "Hana & Ame"],
  correctAnswer: "Yuki & Ame",
  image: "assets/images/wolfchildren.gif"
}, {
  question: "Which of these movies is about a Japanese World War 2 plane engineer?",
  answers: ["Finding the Sky", "As the Wind Blows", "Dreaming High", "The Wind Rises"],
  correctAnswer: "The Wind Rises",
  image: "assets/images/windrises.gif"
}, {
  question: "The movie Akira takes place after what incident?",
  answers: ["Godzilla", "World War 1", "The great depression", "Nuclear Bomb anihalating Tokyo"],
  correctAnswer: "Nuclear Bomb anihalating Tokyo",
  image: "assets/images/akira.gif"
}, {
  question: "Which movie uses a whale as symbolism?",
  answers: ["The Boy and The Beast", "The Wind on My Sail", "The Sailor and the Sea", "One Piece"],
  correctAnswer: "The Boy and The Beast",
  image: "assets/images/boybeast.gif"
}, {
  question: "Which movie features a dragon spirit of the Kohaku River?",
  answers: ["Spirited Away", "My Neighbor Totoro", "Howls Moving Castle", "The Boy and The Beast"],
  correctAnswer: "Spirited Away",
  image: "assets/images/spirited away.gif"
}, {
  question: "What movie beat spirited away for gross income, and had to do with a meteor shower that destroyed a city in Japan",
  answers: ["Your Name", "Wolf Children", "Akira", "Starry Night"],
  correctAnswer: "Your Name",
  image: "assets/images/your name.gif"
}, {
  question: "What movie describes the life of an actress finding her love and blurs cinema story with reality?",
  answers: ["A leap through time", "Your Name", "Millenium Actress", "Thin Lining"],
  correctAnswer: "Millenium Actress",
  image: "assets/images/milleniumactress.gif"
}, {
  question: "What movie starts off with a baseball scene?",
  answers: ["The Girl Who Lept Through Time", "Baseball", "Thin Lining", "Godzilla"],
  correctAnswer: "The Girl Who Lept Through Time",
  image: "assets/images/time.gif"
}];


var timer;
var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
  countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    
    if (this.counter === 0) {
        console.log("TIME UP");
        this.NoTime();
    }
  },

  loadQuestion: function() {
    timer = setInterval(this.countdown.bind(this), 1000);
    
    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
            
            for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
                    panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                     + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },
  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },
  NoTime: function() {
    clearInterval(window.timer);
    $("#counter-number").html(this.counter);
    panel.html("<h2>Time's Up!!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(window.timer);
    panel.html("<h2>Here are your results!</h2>");
    $("#counter-number").html(this.counter);
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },
  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    this.incorrect++;
    clearInterval(window.timer);
    panel.html("<h2>Sorry!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },
  answeredCorrectly: function() {
    clearInterval(window.timer);
    this.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },
  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};



$(document).on("click", "#start-over", game.reset.bind(game));
$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});
$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});