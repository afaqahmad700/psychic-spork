(function() {
  var questions = [{
    question: "8 * 8 + ? = 66",
    choices: [12, 5, 2, 15, 10],
    correctAnswer: 2
  }, {
    question: "22 + ? = 40",
    choices: [13, 16, 19, 12, 18],
    correctAnswer: 4
  }, {
    question: "580 - (85 + 95) =",
    choices: [400, 480, 380, 390, 300],
    correctAnswer: 0
  }, {
    question: "615 - (225 + 67) =",
    choices: [321, 333, 313, 323, 208],
    correctAnswer: 3
  }, {
    question: "There are 434 worker ants and 323 warrior ants in an anthill. If 23 more workers and 45 more warriors are born, how many ants will there be in an anthill?",
    choices: [757, 780, 802, 825, 604],
    correctAnswer: 3
  }, {
    question: "Is 15 x 2 even or odd? ",
    choices: ['even', 'odd', 'prime', 'non of these'],
    correctAnswer: 0
  }, {
    question: "Compare 6 x 8 and 9 x 5",
    choices: ['6 x 8 < 9 x 5', '6 x 8 > 9 x 5', '6 x 8 = 9 x 5'],
    correctAnswer: 1
  }, {
    question: "How do you write this number using words? <6,629> ",
    choices: ['six thousand, twenty-nine', 'six thousand, six hundred twenty-nine', 'six thousand, six hundred nince', 'six thousand, two hundred'],
    correctAnswer: 1
  }, {
    question: "Which season comes before spring?",
    choices: ['winter', 'fall', 'spring'],
    correctAnswer: 1
  }, {
    question: "Which season comes after summer?",
    choices: ['spring', 'winter', 'fall'],
    correctAnswer: 2
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();
