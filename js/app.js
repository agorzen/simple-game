document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed!");

  ///////////////////////////////////////////////////////////////////////////////

  //buttons - overlays
  let overlayStart = document.getElementById("start");
  let btnEasyStart = document.querySelector(".easy-start");
  let btnEasy = document.querySelector(".easy");
  btnEasyStart.addEventListener("click", easySet);

  function easySet() {
    btnEasyStart.classList.add("active");

    setTimeout(() => {
      overlayStart.classList.remove("visible");
      btnEasy.classList.add("active");
      startSound.play();
      inOrderToReplace();
      easyGame();
    }, 800);
  }
  ////////////////////////////////////////////////////////////////////
  let btnMediumStart = document.querySelector(".medium-start");
  let btnMedium = document.querySelector(".medium");
  btnMediumStart.addEventListener("click", mediumSet);

  function mediumSet() {
    btnMediumStart.classList.add("active");
    setTimeout(() => {
      overlayStart.classList.remove("visible");
      btnMedium.classList.add("active");
      startSound.play();
      inOrderToReplace();
      mediumGame();
    }, 800);
  }
  /////////////////////////////////////////////////////////////////////
  let btnMasterStart = document.querySelector(".master-start");
  let btnMaster = document.querySelector(".master");
  btnMasterStart.addEventListener("click", masterSet);

  function masterSet() {
    btnMasterStart.classList.add("active");
    setTimeout(() => {
      overlayStart.classList.remove("visible");
      btnMaster.classList.add("active");
      startSound.play();
      inOrderToReplace();
      masterGame();
    }, 800);
  }
  /////////////////////buttons - basic
  btnEasy.addEventListener("click", easySetTwo);

  function easySetTwo() {
    inOrderToReplace();
    easyGame();
    setTimeout(() => {
      btnEasy.classList.add("active");
      btnMedium.classList.remove("active");
      btnMaster.classList.remove("active");
    }, 100);
  }

  btnMedium.addEventListener("click", mediumSetTwo);
  function mediumSetTwo() {
    // window.location.reload(true); ----------------------
    // overlayStart.classList.remove("visible");
    inOrderToReplace();
    mediumGame();
    setTimeout(() => {
      btnEasy.classList.remove("active");
      btnMedium.classList.add("active");
      btnMaster.classList.remove("active");
      // randomizeImage();
    }, 100);
    //wywołanie funkcji gry na danym poziomie
  }
  btnMaster.addEventListener("click", masterSetTwo);
  function masterSetTwo() {
    inOrderToReplace();

    setTimeout(() => {
      btnEasy.classList.remove("active");
      btnMedium.classList.remove("active");
      btnMaster.classList.add("active");
      masterGame();
    }, 100);
  }
  let overlayVictory = document.getElementById("victory");
  // console.log(overlayVictory);
  let overlayGameOver = document.getElementById("game-over");
  // console.log(overlayGameOver);

  let tryAgainBtns = document.querySelectorAll(".try-again");
  tryAgainBtns.forEach(element => {
    element.addEventListener("click", tryAgainSet);
  });

  function tryAgainSet() {
    //default na easy!
    overlayVictory.classList.remove("visible");
    overlayGameOver.classList.remove("visible");
    btnEasy.classList.add("active");
    inOrderToReplace();
    easyGame();
  }

  function inOrderToReplace() {
    // btnMedium.removeEventListener("click", mediumSetTwo);
    // btnMaster.removeEventListener("click", masterSetTwo);

    randomizeImage();
    //////////////////////////////////////cleaning function
    let score = 0;
    let points = `${score}`;
    let nodeOne = document.getElementById("score");
    nodeOne.innerHTML = points;

    let moves = 0;
    let uMoves = `${moves}`;
    let node = document.getElementById("moves");
    node.innerHTML = uMoves;
    node.classList.remove("neon-over");

    cards.forEach(element => {
      element.classList.remove("hidden");
      element.classList.remove("matched");
      element.classList.remove("flip");
    });
  }

  const cards = document.querySelectorAll(".card");
  const imagesId = [];
  imagesId[0] = "1";
  imagesId[1] = "1";
  imagesId[2] = "2";
  imagesId[3] = "2";
  imagesId[4] = "3";
  imagesId[5] = "3";
  imagesId[6] = "4";
  imagesId[7] = "4";
  imagesId[8] = "5";
  imagesId[9] = "5";
  imagesId[10] = "6";
  imagesId[11] = "6";
  imagesId[12] = "7";
  imagesId[13] = "7";
  imagesId[14] = "8";
  imagesId[15] = "8";
  imagesId[16] = "9";
  imagesId[17] = "9";
  imagesId[18] = "10";
  imagesId[19] = "10";
  imagesId[20] = "11";
  imagesId[21] = "11";
  imagesId[22] = "12";
  imagesId[23] = "12";
  ///randomize function - changing the order of cards id
  function randomizeImage() {
    cards.forEach(element => {
      const singleImage = Math.floor(Math.random() * imagesId.length);
      let dataId = imagesId[singleImage];
      element.style.order = dataId;
      // console.log(dataId);
      // element.dataset.id = dataId;
      // imagesId.splice(singleImage, 1);-----tablica
    });
  }
  ////////////////////////////////////////////////////////////////////music
  const gameOverSound = new Audio(
    "music/255937__jagadamba__robot-laughing-robotic-vocal-laugh.mp3"
  );
  const gameWinSound = new Audio(
    "music/130326__dianadesim__clapping-and-yelling.wav"
  );
  const startSound = new Audio(
    "music/339822__inspectorj__hand-bells-cluster.wav"
  );
  ////////////////////////////////////////////////////////////////////////////////////first level
  function easyGame() {
    ///FLIPPING CARDS FUNCTION

    cards.forEach(element => {
      element.addEventListener("click", flipCard);
    });

    let alreadyFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let score = 0;
    let moves = 0;

    function flipCard() {
      // this.classList.toggle("flip");
      if (lockBoard) return;

      if (this === firstCard) return;
      this.classList.add("flip");
      //extra flipping security
      if (!alreadyFlippedCard) {
        alreadyFlippedCard = true;
        firstCard = this;
        return;
      } else {
        alreadyFlippedCard = false;
        secondCard = this;
        checkForMatch();
        moves++;
        userMoves();
      }
      console.log(firstCard, secondCard);
      return;
    }

    //cards checking
    function checkForMatch() {
      let matchThis = firstCard.dataset.id === secondCard.dataset.id;
      matchThis ? matchDoneCards() : unflippedCard();
      //doubleCheckForMatch ();!! to 3
      // function doubleCheckForMatch() {
      //   let secondMatchThis = firstCard.dataset.id === thirdCard.dataset.id;
      //   secondMatchThis ? disableCards() : unflippedCard();
      // }
    }

    function matchDoneCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      setTimeout(() => {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        setTimeout(() => {
          firstCard.classList.add("hidden");
          secondCard.classList.add("hidden");
        }, 1000);
      }, 900);
      score++;
      moves--;
      userScore();
    }

    function unflippedCard() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
      }, 2000);
    }

    function userScore() {
      console.log(score);
      let points = `${score}`;
      let nodeOne = document.getElementById("score");
      nodeOne.innerHTML = points;

      if (points == 12) {
        overlayVictory.classList.add("visible");
        gameWinSound.play();
        theGameOver();
        return;
      } else if (points > 9) {
        nodeOne.classList.add("active");
      }
    }

    function userMoves() {
      console.log(moves);
      let uMoves = `${moves}`;
      let node = document.getElementById("moves");
      node.innerHTML = uMoves;

      if (uMoves == 24) {
        overlayGameOver.classList.add("visible");
        gameOverSound.play();
        theGameOver();
        btnEasy.classList.remove("active");
      } else if (uMoves == 12) {
        node.classList.add("neon-over");
      }
    }

    function theGameOver() {
      randomizeImage();

      score = 0;
      let points = `${score}`;
      let nodeOne = document.getElementById("score");
      nodeOne.innerHTML = points;
      console.log(score);
      console.log(moves);
      moves = 0;
      let uMoves = `${moves}`;
      let node = document.getElementById("moves");
      node.innerHTML = uMoves;
      node.classList.remove("neon-over");

      cards.forEach(element => {
        element.classList.remove("hidden");
        element.classList.remove("matched");
        element.classList.remove("flip");
      });
    }
  }
  ///////////////////////////////////////////////////////////second level
  function mediumGame() {
    ///FLIPPING CARDS FUNCTION
    (function() {
      cards.forEach(element => {
        element.addEventListener("click", flipCard);
      });

      let alreadyFlippedCard = false;
      let firstCard, secondCard;
      let lockBoard = false;
      let score = 0;
      let moves = 20;

      let uMoves = `${moves}`;
      let node = document.getElementById("moves");
      node.innerHTML = uMoves;

      function flipCard() {
        // this.classList.toggle("flip");
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add("flip");

        if (!alreadyFlippedCard) {
          alreadyFlippedCard = true;
          firstCard = this;
          return;
        } else {
          alreadyFlippedCard = false;
          secondCard = this;
          checkForMatch();
          moves--;
          userMoves();
        }
        console.log(firstCard, secondCard);
      }

      function checkForMatch() {
        let matchThis = firstCard.dataset.id === secondCard.dataset.id;
        matchThis ? matchDoneCards() : unflippedCard();
      }

      function matchDoneCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        setTimeout(() => {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          setTimeout(() => {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
          }, 1000);
        }, 900);
        score++;
        moves++;
        userScore();
      }

      function unflippedCard() {
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          lockBoard = false;
        }, 2000);
      }

      function userScore() {
        console.log(score);
        let points = `${score}`;
        let nodeOne = document.getElementById("score");
        nodeOne.innerHTML = points;

        if (points == 12) {
          overlayVictory.classList.add("visible");
          gameWinSound.play();
          theGameOver();
        } else if (points > 9) {
          node.classList.add("active");
        }
      }

      function userMoves() {
        console.log(moves);
        let uMoves = `${moves}`;
        let node = document.getElementById("moves");
        node.innerHTML = uMoves;

        if (uMoves == 0) {
          overlayGameOver.classList.add("visible");
          theGameOver();
          btnMedium.classList.remove("active");
          gameOverSound.play();
        } else if (uMoves <= 9) {
          node.classList.add("neon-over");
        }
      }

      function theGameOver() {
        randomizeImage();

        score = 0;
        let points = `${score}`;
        let nodeOne = document.getElementById("score");
        nodeOne.innerHTML = points;
        console.log(score);
        console.log(moves);
        moves = 0;
        node.classList.remove("neon-over");

        cards.forEach(element => {
          element.classList.remove("hidden");
          element.classList.remove("matched");
          element.classList.remove("flip");
        });
      }
    })();
  }
  ///////////////////////////////////////////////////////////third level
  function masterGame() {
    ///FLIPPING CARDS FUNCTION
    (function() {
      cards.forEach(element => {
        element.addEventListener("click", flipCard);
      });

      let alreadyFlippedCard = false;
      let firstCard, secondCard;
      let lockBoard = false;
      let score = 0;
      let moves = 12;

      let uMoves = `${moves}`;
      let node = document.getElementById("moves");
      node.innerHTML = uMoves;

      function flipCard() {
        // this.classList.toggle("flip");

        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add("flip");
        //extra flipping security
        if (!alreadyFlippedCard) {
          alreadyFlippedCard = true;
          firstCard = this;
          return;
        } else {
          alreadyFlippedCard = false;
          secondCard = this;
          checkForMatch();
          moves--;
          userMoves();
        }
        console.log(firstCard, secondCard);
      }

      function checkForMatch() {
        let matchThis = firstCard.dataset.id === secondCard.dataset.id;
        matchThis ? matchDoneCards() : unflippedCard();
      }

      function matchDoneCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        setTimeout(() => {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          setTimeout(() => {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
          }, 1000);
        }, 900);
        score++;
        moves++;
        userScore();
      }

      function unflippedCard() {
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          lockBoard = false;
        }, 2000);
      }

      function userScore() {
        console.log(score);
        let points = `${score}`;
        let nodeOne = document.getElementById("score");
        nodeOne.innerHTML = points;

        if (points == 12) {
          overlayVictory.classList.add("visible");
          gameWinSound.play();
          theGameOver();
        } else if (points > 9) {
          node.classList.add("active");
        }
      }

      function userMoves() {
        console.log(moves);
        let uMoves = `${moves}`;
        let node = document.getElementById("moves");
        node.innerHTML = uMoves;

        if (uMoves == 0) {
          overlayGameOver.classList.add("visible");
          theGameOver();
          btnMaster.classList.remove("active");
          gameOverSound.play();
        } else if (uMoves <= 9) {
          node.classList.add("neon-over");
        }
      }

      function theGameOver() {
        randomizeImage();

        score = 0;
        let points = `${score}`;
        let nodeOne = document.getElementById("score");
        nodeOne.innerHTML = points;
        console.log(score);
        console.log(moves);
        moves = 0;
        node.classList.remove("neon-over");

        cards.forEach(element => {
          element.classList.remove("hidden");
          element.classList.remove("matched");
          element.classList.remove("flip");
        });
      }
    })();
  }
});
