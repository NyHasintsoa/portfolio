(function () {
  "use strict";

  const wait = (duration = 2000) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration);
    });
  };

  const iconTheme = document.querySelector("#text-theme > i");
  const textTheme = document.querySelector("#text-theme > span");
  const themes = document.querySelectorAll(".theme-list li");
  const themeList = document.querySelector(".theme-list");
  const themeBar = document.querySelector(".theme-bar");
  const storedTheme = localStorage.getItem("theme");

  /**
   * Get the Default Theme or the selected theme
   * @return {string} dark | light
   */
  const getPreferedTheme = () => {
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (event) => {
    if (getPreferedTheme() === "dark") {
      document.body.classList.add("dark");
      iconTheme.classList.value = "fa-solid fa-xl fa-moon";
      textTheme.textContent = "Dark";
      if (storedTheme) activeTheme(1, "Dark", "fa-solid fa-xl fa-moon");
    } else {
      document.body.classList.remove("dark");
      iconTheme.classList.value = "fa-solid fa-xl fa-sun";
      textTheme.textContent = "Light";
      if (storedTheme) activeTheme(0, "Light", "fa-solid fa-xl fa-sun");
    }
    if (!storedTheme) activeTheme(2, "System", "fa-solid fa-xl fa-desktop");
  };

  setTheme();

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", async () => {
      await wait(450);
      preloader.remove();
    });
  }

  document
    .querySelector(".show-theme-btn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      themeList.classList.toggle("show");
      themeBar.classList.toggle("show");
    });
  function activeTheme(index, text, classTheme) {
    themes.forEach((theme) => {
      theme.classList.remove("active");
    });
    themes[index].classList.add("active");
    themeList.classList.remove("show");
    themeBar.classList.remove("show");
    iconTheme.classList.value = classTheme;
    textTheme.textContent = text;
  }
  document.querySelector(".sun-btn").addEventListener("click", () => {
    document.body.classList.remove("dark");
    activeTheme(0, "Light", "fa-solid fa-xl fa-sun");
    localStorage.setItem("theme", "light");
  });
  document.querySelector(".moon-btn").addEventListener("click", () => {
    document.body.classList.add("dark");
    activeTheme(1, "Dark", "fa-solid fa-xl fa-moon");
    localStorage.setItem("theme", "dark");
  });
  document.querySelector(".default-btn").addEventListener("click", () => {
    activeTheme(2, "System", "fa-solid fa-xl fa-desktop");
    localStorage.removeItem("theme");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  });

  const scrollToTopBtn = document.querySelector(".scrollToTop-btn");
  window.addEventListener("scroll", () => {
    document
      .querySelector("header")
      .classList.toggle("active-shadow", window.scrollY > 0);

    scrollToTopBtn.classList.toggle("active", window.scrollY > 500);

    themeBar.classList.toggle("hide", window.scrollY > 1000);

    document.querySelector(".t").style.visibility =
      window.scrollY > 1000 ? "hidden" : "visible";

    const sections = document.querySelectorAll("section");
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      let sectionHeight = section.offsetHeight;
      let sectionTop = section.offsetTop - 50;
      let id = section.getAttribute("id");
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
        document
          .querySelector(`.nav-item a[href*=${id}]`)
          .classList.add("active");
      else
        document
          .querySelector(`.nav-item a[href*=${id}]`)
          .classList.remove("active");
    });
  });

  scrollToTopBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  const serviceModals = document.querySelectorAll(".service-modal");
  const learnMoreBtns = document.querySelectorAll(".learn-more-btn");
  const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

  const modal = function (modalClick) {
    serviceModals[modalClick].classList.add("active");
  };

  learnMoreBtns.forEach((learnMoreBtn, index) => {
    learnMoreBtn.addEventListener("click", () => {
      modal(index);
    });
  });

  modalCloseBtns.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener("click", () => {
      serviceModals.forEach((serviceModal) => {
        serviceModal.classList.remove("active");
      });
    });
  });

  const portfolioModals = document.querySelectorAll(".portfolio-modal");
  const imgCards = document.querySelectorAll(".img-card");
  const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");

  const modalPortfolio = function (modalClick) {
    portfolioModals[modalClick].classList.add("active");
  };

  imgCards.forEach((imgCard, index) => {
    imgCard.addEventListener("click", () => {
      modalPortfolio(index);
    });
  });

  portfolioCloseBtns.forEach((portfolioCloseBtn) => {
    portfolioCloseBtn.addEventListener("click", () => {
      portfolioModals.forEach((portfolioModal) => {
        portfolioModal.classList.remove("active");
      });
    });
  });

  const navOpenBtn = document.querySelector(".nav-open-btn");
  const navCloseBtn = document.querySelector(".nav-close-btn");
  const navigation = document.querySelector(".navigation");
  const navItems = document.querySelectorAll(".nav-item a");

  navOpenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigation.classList.add("show");
  });

  navCloseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigation.classList.remove("show");
  });

  navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      navigation.classList.remove("show");
    });
  });

  ScrollReveal({
    reset: false,
    distance: "50px",
    duration: 2000,
    delay: 100
  });

  ScrollReveal().reveal("#home .info h2", {
    delay: 500,
    origin: "top"
  });
  ScrollReveal().reveal("#home .info h3", {
    delay: 500,
    origin: "left"
  });
  ScrollReveal().reveal("#home .info p", {
    delay: 500,
    origin: "right"
  });
  ScrollReveal().reveal(".icon-link a", {
    delay: 500,
    origin: "bottom",
    interval: 50
  });

  const toastMessage = document.querySelector("#toastMessage");
  const submitBtn = document.querySelector("#submitBtn");
  const toastContent = document.querySelector("#toastContent");
  const toastContainer = document.querySelector(".toast-container");
  const contactForm = document.querySelector(".contact-form");
  const namelInput = document.querySelector("#inputName");
  const subjectInput = document.querySelector("#inputSubject");
  const emailInput = document.querySelector("#inputEmail");
  const messageInput = document.querySelector("#inputMessage");
  /**
   * Show Toast Notification
   * @param {boolean} isError Check if the toast is an error
   * @param {string} titleMessage Title of the toast
   * @param {string} contentMessage Content of the toast
   */
  function showToast(isError, titleMessage, contentMessage) {
    toastContainer.classList.remove("invisible");
    toastContent.innerHTML = `<div class="shrink-0">
      ${
        isError
          ? '<i class="fa-solid fa-md fa-times-circle text-[#dc3545]"></i>'
          : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="w-6 h-6 text-success"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>'
      }
    </div>
    <div class="pt-0.5 flex-grow shrink basis-0 ml-3">
        <p class="text-primary font-medium text-sm">${titleMessage}</p>
        <p class="text-third text-sm mt-1">${contentMessage}</p>
    </div>`;
    toastMessage.classList.add("show");
    setTimeout(() => {
      toastMessage.classList.remove("show");
      toastContainer.classList.add("invisible");
    }, 5000);
  }

  /**
   * Check if the string is an email
   * @param {string} email Email string
   * @return {boolean}
   */
  function isEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/.test(email);
  }

  /**
   * Check if the value of the html element is non null
   * @param {HTMLElement} input Html Element
   * @return {boolean}
   */
  function isNonNull(input) {
    return input.value.trim().length > 3;
  }

  /**
   * Check if these input are not blanks and fullfill the conditions
   * @return {boolean}
   */
  function checkInput() {
    return (
      isNonNull(namelInput) &&
      isNonNull(subjectInput) &&
      isEmail(emailInput.value.trim()) &&
      isNonNull(messageInput)
    );
  }

  document.querySelector("#closeToastBtn").addEventListener("click", () => {
    toastMessage.classList.remove("show");
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (checkInput()) {
      try {
        submitBtn.innerHTML =
          '<span class="mr-3">Sending</span> <div class="spinner-border"></div>';
        submitBtn.setAttribute("disabled", "true");
        emailjs.init({
          publicKey: "3EAXJ_3ZbOLgcmmPi"
        });
        await emailjs
          .send("service_69jjcqv", "template_upayxu2", {
            name: namelInput.value.trim(),
            subject: subjectInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
          })
          .then(
            function (response) {
              showToast(
                false,
                "Success Message",
                "Email sended successfully !"
              );
            },
            function (error) {
              showToast(
                true,
                "Error Sending Message",
                "Error sending email : " + JSON.stringify(error)
              );
            }
          );
      } catch (error) {
        showToast(
          true,
          "Error Send Message",
          "Error sending email : " + error.message
        );
      }
      submitBtn.innerHTML =
        '<span class="mr-3">Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
      submitBtn.removeAttribute("disabled");
    } else {
      showToast(true, "Error Form", "Please complete form correctly !");
    }
  });
})();
