/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
/* ========================= */
/* MEMORY GAME — LAB 12      */
/* ========================= */

// Card data - 6 unique emojis (will be doubled automatically)
const cardData = ["🎨", "🌟", "🍇", "🍓", "🍊", "🥝"];

// Difficulty settings
const difficultySettings = {
  easy: { rows: 3, cols: 4 },  // 12 cards (6 pairs)
  hard: { rows: 4, cols: 6 }   // 24 cards (12 pairs)
};

// Game state
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let gameStarted = false;

// Timer state (OPTIONAL TASK)
let timerInterval = null;
let seconds = 0;

// DOM elements
const gameBoard = document.getElementById("gameBoard");
const movesEl = document.getElementById("moves");
const matchesEl = document.getElementById("matches");
const winMessage = document.getElementById("winMessage");
const timerEl = document.getElementById("timer");
const bestEasyEl = document.getElementById("bestEasy");
const bestHardEl = document.getElementById("bestHard");

const startBtn = document.getElementById("startGame");
const restartBtn = document.getElementById("restartGame");
const difficultySelect = document.getElementById("difficulty");

// Shuffle array
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ========================= */
/* TIMER FUNCTIONS           */
/* ========================= */

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerEl.textContent = "00:00";

  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function formatTime(sec) {
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  return `${min.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

/* ========================= */
/* BEST SCORE FUNCTIONS      */
/* ========================= */

function loadBestScores() {
  const bestEasy = localStorage.getItem("best-easy");
  const bestHard = localStorage.getItem("best-hard");

  bestEasyEl.textContent = bestEasy ? bestEasy : "-";
  bestHardEl.textContent = bestHard ? bestHard : "-";
}

function saveBestScore() {
  const difficulty = difficultySelect.value;
  const key = `best-${difficulty}`;
  const best = localStorage.getItem(key);

  if (!best || moves < best) {
    localStorage.setItem(key, moves);
    loadBestScores();
  }
}

/* ========================= */
/* GAME LOGIC (UNCHANGED)    */
/* ========================= */

// Initialize game
function initGame() {
  // Reset game state
  gameBoard.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matches = 0;
  gameStarted = true;

  // Update UI
  movesEl.textContent = "0";
  matchesEl.textContent = "0";
  winMessage.textContent = "";

  // Start timer (OPTIONAL TASK)
  startTimer();

  // Get difficulty
  const difficulty = difficultySelect.value;
  const { rows, cols } = difficultySettings[difficulty];
  const totalCards = rows * cols;

  // Create card pairs
  const pairsNeeded = totalCards / 2;
  let gameCards = [];

  for (let i = 0; i < pairsNeeded; i++) {
    const emoji = cardData[i % cardData.length];
    gameCards.push(emoji, emoji);
  }

  // Shuffle cards
  gameCards = shuffle(gameCards);

  // Set grid layout
  gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  // Create card elements
  gameCards.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.value = emoji;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card logic
function flipCard() {
  if (!gameStarted) return;
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  movesEl.textContent = moves;

  checkMatch();
}

// Check if cards match
function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();
    matches++;
    matchesEl.textContent = matches;
    checkWin();
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}

// Unflip cards if no match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset board state
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Check if game is won
function checkWin() {
  const totalPairs = gameBoard.children.length / 2;

  if (matches === totalPairs) {
    stopTimer();
    saveBestScore();

    setTimeout(() => {
      winMessage.textContent =
        `🎉 You Won! Moves: ${moves} | Time: ${formatTime(seconds)}`;
    }, 500);
  }
}

/* ========================= */
/* EVENT LISTENERS           */
/* ========================= */

startBtn.addEventListener("click", initGame);
restartBtn.addEventListener("click", initGame);

difficultySelect.addEventListener("change", () => {
  if (gameStarted) {
    initGame();
  }
});

// Load best scores on page load
loadBestScores();






(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  /**
 * CONTACT FORM HANDLING (LAB TASK)
 */
const contactForm = document.getElementById("contactForm");
const formResult = document.getElementById("formResult");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload
    const formData = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      rating1: Number(document.getElementById("rating1").value),
      rating2: Number(document.getElementById("rating2").value),
      rating3: Number(document.getElementById("rating3").value)
    };

    console.log(formData);
        formResult.innerHTML = `
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Surname:</strong> ${formData.surname}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone number:</strong> ${formData.phone}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
    `;
        const average =
      (formData.rating1 + formData.rating2 + formData.rating3) / 3;

    const roundedAverage = average.toFixed(1);
        let avgColor = "red";

    if (average >= 7) {
      avgColor = "green";
    } else if (average >= 4) {
      avgColor = "orange";
    }

    formResult.innerHTML += `
      <p>
        <strong>${formData.name} ${formData.surname} average:</strong>
        <span style="color:${avgColor}; font-weight:bold;">
          ${roundedAverage}
        </span>
      </p>
    `;
        alert("Form submitted successfully!");
    contactForm.reset();
  });
}
function validateField(input, regex, errorEl, message) {
  if (!regex.test(input.value)) {
    input.classList.add("input-error");
    errorEl.textContent = message;
    return false;
  } else {
    input.classList.remove("input-error");
    errorEl.textContent = "";
    return true;
  }
}
const submitBtn = document.getElementById("submitBtn");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");

nameInput.addEventListener("input", () => {
  validateField(nameInput, /^[A-Za-z]+$/, document.getElementById("nameError"), "Only letters allowed");
  checkFormValidity();
});

surnameInput.addEventListener("input", () => {
  validateField(surnameInput, /^[A-Za-z]+$/, document.getElementById("surnameError"), "Only letters allowed");
  checkFormValidity();
});

emailInput.addEventListener("input", () => {
  validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, document.getElementById("emailError"), "Invalid email");
  checkFormValidity();
});

addressInput.addEventListener("input", () => {
  validateField(addressInput, /.+/, document.getElementById("addressError"), "Address required");
  checkFormValidity();
});
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "");

  if (value.startsWith("370")) value = value.slice(3);
  value = value.slice(0, 8);

  let formatted = "+370 ";
  if (value.length > 1) {
    formatted += value[0] + value.slice(1, 3) + " " + value.slice(3);
  }

  phoneInput.value = formatted;
});
function checkFormValidity() {
  const errors = document.querySelectorAll(".input-error");
  submitBtn.disabled = errors.length > 0;
}


})();