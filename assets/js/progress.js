"use strict";

/* =========================================
   PIPELINE DATA
========================================= */

const mlStages = [

  {
    title: "Data Collection",
    icon: "🗄️",
    color: "#2878c7",
    background: "#e3efff",

    description:
      "The project combines Western Australian red meat industry " +
      "techno-economic assessment (TEA) parameters with real " +
      "anaerobic digester observations to establish a " +
      "data-informed foundation for predictive modelling.",

    cards: [
      {
        title: "WA Industry TEA",
        text:
          "Feedstock characteristics, waste quantities, " +
          "volatile solids content, and energy conversion parameters."
      },
      {
        title: "US Digester Database",
        text:
          "Operational records from two anaerobic digesters, " +
          "providing real feedstock and methane-yield observations."
      },
      {
        title: "104 Reactor Observations",
        text:
          "Cleaned observations used to estimate the relationship " +
          "between organic loading rate, feed concentration, " +
          "and methane yield."
      }
    ]
  },

  {
    title: "Synthetic Data Generation",
    icon: "🧬",
    color: "#31934b",
    background: "#e2f3e5",

    description:
      "A synthetic dataset was generated to address the limited " +
      "availability of large-scale Western Australian operational " +
      "data. The generation process combines industry-informed " +
      "feedstock parameters with relationships derived from " +
      "real anaerobic digester observations.",

    cards: [
      {
        title: "800 Simulated Facilities",
        text:
          "Generate 800 synthetic facility observations with " +
          "variations in feedstock quantities and operating conditions."
      },
      {
        title: "Feedstock Variation",
        text:
          "Scale WA feedstock quantities and sample organic " +
          "loading rate (OLR) and diluted feed volatile solids (VS%)."
      },
      {
        title: "Operational Outcomes",
        text:
          "Generate methane yield, electricity generation, " +
          "and carbon emission reduction values for each facility."
      }
    ]
  },

  {
    title: "Data Preparation",
    icon: "⚙️",
    color: "#c8871d",
    background: "#fff0dc",

    description:
      "The synthetic dataset undergoes preprocessing and " +
      "exploratory analysis to ensure that the observations " +
      "are suitable for machine learning model development.",

    cards: [
      {
        title: "Data Quality",
        text:
          "Check missing values, identify outliers, and examine " +
          "the distributions of operational variables."
      },
      {
        title: "Feature Engineering",
        text:
          "Prepare numerical and categorical variables through " +
          "scaling, encoding, and feature construction."
      },
      {
        title: "Dataset Splitting",
        text:
          "Divide observations into 70% training, " +
          "15% validation, and 15% testing datasets."
      }
    ]
  },

  {
    title: "Machine Learning Model Training",
    icon: "🧠",
    color: "#6b63bd",
    background: "#e9e9fa",

    description:
      "Three machine learning architectures were developed " +
      "and compared to predict biogas-related operational " +
      "outcomes. A linear regression baseline was also " +
      "included to assess whether more complex algorithms " +
      "provide meaningful improvements.",

    cards: [
      {
        title: "Random Forest",
        text:
          "An ensemble of decision trees designed to capture " +
          "nonlinear relationships between feedstock " +
          "characteristics and operational outcomes."
      },
      {
        title: "XGBoost",
        text:
          "A gradient-boosting algorithm that sequentially " +
          "improves decision trees to reduce prediction errors."
      },
      {
        title: "LSTM Neural Network",
        text:
          "A recurrent neural network evaluated to investigate " +
          "whether sequence-oriented modelling offers benefits " +
          "for the synthetic facility dataset."
      },
      {
        title: "Linear Regression Baseline",
        text:
          "A simpler benchmark model used to evaluate whether " +
          "the additional complexity of the three machine " +
          "learning architectures improves prediction accuracy."
      }
    ]
  },

  {
    title: "Predictions",
    icon: "📊",
    color: "#cf6262",
    background: "#ffe5e5",

    description:
      "The trained models generate predictions for three " +
      "operational outcomes relevant to renewable energy " +
      "production and sustainability planning.",

    cards: [
      {
        title: "Methane Yield",
        text:
          "Estimate methane production potential based on " +
          "feedstock characteristics and operating conditions."
      },
      {
        title: "Electricity Generation",
        text:
          "Predict electricity generation associated with " +
          "methane production and the amount of organic " +
          "material processed."
      },
      {
        title: "Carbon Emission Reduction",
        text:
          "Estimate avoided emissions associated with " +
          "renewable electricity generation using " +
          "the assumed grid emission factor."
      }
    ]
  },

  {
    title: "Model Evaluation",
    icon: "🎯",
    color: "#9864bd",
    background: "#efe5f7",

    description:
      "Model performance is assessed using regression metrics " +
      "and comparative analysis. The evaluation examines " +
      "prediction accuracy, error distributions, and the " +
      "limitations of learning from synthetic data.",

    cards: [
      {
        title: "Mean Absolute Error (MAE)",
        text:
          "Measures the average absolute difference between " +
          "predicted and observed values."
      },
      {
        title: "Root Mean Squared Error (RMSE)",
        text:
          "Measures prediction error while assigning " +
          "greater penalties to larger deviations."
      },
      {
        title: "Coefficient of Determination (R²)",
        text:
          "Measures the proportion of variation in " +
          "the target variable explained by the model."
      },
      {
        title: "Comparative Analysis",
        text:
          "Compare Random Forest, XGBoost, LSTM, and " +
          "linear regression to identify strengths, " +
          "limitations, and opportunities for improvement."
      }
    ]
  }

];


/* =========================================
   ELEMENT REFERENCES
========================================= */

const mlButtons = document.querySelectorAll("#ml-progress [data-stage]");

const mlDetail = document.getElementById("mlDetail");
const mlDetailIcon = document.getElementById("mlDetailIcon");
const mlDetailLabel = document.getElementById("mlDetailLabel");
const mlDetailTitle = document.getElementById("mlDetailTitle");

const mlDynamicContent =
  document.getElementById("mlDynamicContent");

const mlProgress = document.getElementById("mlProgress");

const mlPrev = document.getElementById("mlPrev");
const mlNext = document.getElementById("mlNext");

let currentMLStage = 0;


/* =========================================
   RENDER STAGE
========================================= */

function renderMLStage(index) {

  if (!Number.isInteger(index) || index < 0 || index >= mlStages.length) {
    return;
  }
  currentMLStage = index;
  const stage = mlStages[index];

  /* Update selected stage */
  mlButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("active", isActive);
    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );

  });

  /* Update panel colours */

  mlDetail.style.setProperty(
    "--detail-color",
    stage.color
  );

  mlDetail.style.setProperty(
    "--detail-bg",
    stage.background
  );

  /* Update heading */

  mlDetailIcon.textContent = stage.icon;

  mlDetailLabel.textContent =
    `Stage ${String(index + 1).padStart(2, "0")}`;

  mlDetailTitle.textContent = stage.title;

  /* Generate information cards safely */

  mlDynamicContent.replaceChildren();

  const description = document.createElement("p");
  description.className = "ml-description";
  description.textContent = stage.description;

  const grid = document.createElement("div");
  grid.className = "ml-info-grid";

  stage.cards.forEach(card => {

    const cardElement = document.createElement("div");
    cardElement.className = "ml-info-card";

    const heading = document.createElement("h4");
    heading.textContent = card.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = card.text;

    cardElement.append(heading, paragraph);
    grid.appendChild(cardElement);

  });

  mlDynamicContent.append(description, grid);

  /* Animate updated content */
  mlDynamicContent.classList.remove("ml-fade");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    void mlDynamicContent.offsetWidth;
    mlDynamicContent.classList.add("ml-fade");
  }

  /* Update navigation */
  mlProgress.textContent =
    `Stage ${index + 1} of ${mlStages.length}`;

  mlPrev.disabled = index === 0;
  mlNext.disabled = index === mlStages.length - 1;

}


/* =========================================
   STAGE CLICK HANDLERS
========================================= */

mlButtons.forEach(button => {

  button.addEventListener("click", () => {

    const index = Number(button.dataset.stage);

    renderMLStage(index);

  });

});


/* =========================================
   PREVIOUS / NEXT
========================================= */

mlPrev.addEventListener("click", () => {

  renderMLStage(currentMLStage - 1);

});

mlNext.addEventListener("click", () => {

  renderMLStage(currentMLStage + 1);

});


/* =========================================
   INITIALISE
========================================= */

renderMLStage(0);

const assignmentModal =
  document.getElementById("assignmentModal");

const assignmentFrame =
  document.getElementById("assignmentFrame");

const openAssignmentPDF =
  document.getElementById("openAssignmentPDF");

const closeAssignmentModal =
  document.getElementById("closeAssignmentModal");


let assignmentTrigger;

document.querySelectorAll(".assignment-button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const pdfPath = button.dataset.pdf;
      assignmentTrigger = button;

      assignmentFrame.src = pdfPath;

      openAssignmentPDF.href = pdfPath;

      assignmentModal.showModal();

    });

  });


closeAssignmentModal.addEventListener("click", () => {
  assignmentModal.close();
});


assignmentModal.addEventListener("close", () => {
  assignmentFrame.removeAttribute("src");
  assignmentTrigger?.focus();
});


assignmentModal.addEventListener("click", event => {
  const bounds = assignmentModal.getBoundingClientRect();
  if (event.target === assignmentModal &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
       event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    assignmentModal.close();
  }
});

/* =========================================
   OPTIMISATION PIPELINE DATA
========================================= */

const optimisationStages = [

  {
    title: "Data Integration",
    icon: "🗄️",
    color: "#2878c7",
    background: "#e3efff",

    description:
      "Integrate spatial, feedstock, experimental and " +
      "techno-economic datasets to establish a consistent " +
      "foundation for regional biogas hub modelling.",

    tags: [
      "Spatial Data",
      "Digester Data",
      "Techno-Economic Data"
    ]
  },

  {
    title: "Regional System",
    icon: "🗺️",
    color: "#31934b",
    background: "#e2f3e5",

    description:
      "Develop realistic synthetic regional systems representing " +
      "feedstock suppliers, candidate biogas hubs, transport " +
      "networks and operating conditions.",

    tags: [
      "Feedstock Supply",
      "Facility Locations",
      "Transport Networks"
    ]
  },

  {
    title: "Process Prediction",
    icon: "🧠",
    color: "#c8871d",
    background: "#fff0dc",

    description:
      "Incorporate predictive models to estimate methane yield " +
      "and biogas production from feedstock composition " +
      "and anaerobic digester operating conditions.",

    tags: [
      "Machine Learning",
      "Methane Yield",
      "Process Performance"
    ]
  },

  {
    title: "Techno-Economic Modelling",
    icon: "📈",
    color: "#6b63bd",
    background: "#e9e9fa",

    description:
      "Translate predicted process performance into energy " +
      "production, investment requirements, operating costs " +
      "and financial indicators to evaluate economic viability.",

    tags: [
      "CAPEX & OPEX",
      "Energy Revenue",
      "Net Present Value"
    ]
  },

  {
    title: "Risk-Aware Optimisation",
    icon: "⚙️",
    color: "#cf6262",
    background: "#ffe5e5",

    description:
      "Identify economically viable and resilient biogas hub " +
      "configurations by optimising facility locations, " +
      "capacities, feedstock allocation and operations " +
      "under uncertain conditions.",

    tags: [
      "Hub Location",
      "Feedstock Allocation",
      "Uncertainty & Risk"
    ]
  },

  {
    title: "Evaluation",
    icon: "🎯",
    color: "#9864bd",
    background: "#efe5f7",

    description:
      "Evaluate economic, environmental and operational " +
      "performance through scenario analysis and stress " +
      "testing, including comparisons between Australian " +
      "and US regional systems.",

    tags: [
      "Economic Performance",
      "Environmental Impact",
      "Risk & Resilience"
    ]
  }

];


/* =========================================
   ELEMENT REFERENCES
========================================= */

const optSection =
  document.getElementById("optimisation-progress");

const optButtons =
  optSection.querySelectorAll("[data-opt-stage]");

const optDetail =
  document.getElementById("optDetail");

const optDetailIcon =
  document.getElementById("optDetailIcon");

const optDetailLabel =
  document.getElementById("optDetailLabel");

const optDetailTitle =
  document.getElementById("optDetailTitle");

const optDescription =
  document.getElementById("optDescription");

const optTags =
  document.getElementById("optTags");

const optProgress =
  document.getElementById("optProgress");

const optPrev =
  document.getElementById("optPrev");

const optNext =
  document.getElementById("optNext");

let currentOptStage = 0;


/* =========================================
   RENDER SELECTED STAGE
========================================= */

function renderOptStage(index) {

  if (!Number.isInteger(index) || index < 0 || index >= optimisationStages.length) {
    return;
  }

  currentOptStage = index;

  const stage = optimisationStages[index];

  /* Highlight active stage */

  optButtons.forEach((button, buttonIndex) => {

    const active = buttonIndex === index;

    button.classList.toggle("active", active);

    button.setAttribute(
      "aria-pressed",
      String(active)
    );

  });

  /* Update colours */

  optDetail.style.setProperty(
    "--detail-color",
    stage.color
  );

  optDetail.style.setProperty(
    "--detail-bg",
    stage.background
  );

  /* Update heading */

  optDetailIcon.textContent = stage.icon;

  optDetailLabel.textContent =
    `Stage ${String(index + 1).padStart(2, "0")}`;

  optDetailTitle.textContent = stage.title;

  /* Update description */

  optDescription.textContent = stage.description;

  /* Update tags */

  optTags.replaceChildren();

  stage.tags.forEach(tag => {

    const element = document.createElement("span");

    element.className = "opt-tag";
    element.textContent = tag;

    optTags.appendChild(element);

  });

  /* Update navigation */

  optProgress.textContent =
    `Stage ${index + 1} of ${optimisationStages.length}`;

  optPrev.disabled = index === 0;

  optNext.disabled =
    index === optimisationStages.length - 1;

}


/* =========================================
   EVENT LISTENERS
========================================= */

optButtons.forEach(button => {

  button.addEventListener("click", () => {

    renderOptStage(Number(button.dataset.optStage));

  });

});


optPrev.addEventListener("click", () => {

  renderOptStage(currentOptStage - 1);

});


optNext.addEventListener("click", () => {

  renderOptStage(currentOptStage + 1);

});


/* =========================================
   INITIALISE
========================================= */

renderOptStage(0);

/* =========================================
   PHASE 6: TESTIMONIAL DATA
========================================= */

const evaluationTestimonials = [

  {
    quote:
      "This is indeed a good initiative since students are " +
      "experiencing a real-world development scenario.",

    campus: "Curtin Mauritius",
    role: "Lecturer · COMP1002/5008",
    initials: "👱‍♂️",
    category: "Real-World Learning"
  },

  {
    quote:
      "I like the idea of restricting them for a standard, " +
      "actual data set so that students get exposed to work " +
      "around proper data. It changes the monotonous nature " +
      "of previous semester assessments.",

    campus: "Curtin Colombo",
    role: "Lecturer · COMP1002/5008",
    initials: "👩‍🦱",
    category: "Authentic Datasets"
  },

  {
    quote:
      "Incorporating a real-world scenario and dataset is " +
      "an interesting approach, as it makes the assignment " +
      "more practical and relevant to the students,",

    campus: "Curtin Malaysia",
    role: "Lecturer · COMP1002/5008",
    initials: "👩‍🦰",
    category: "Practical Relevance"
  },

  {
    quote:
      "The design and framing are excellent. The anaerobic " +
      "digestion scenario at the Western Australian " +
      "meat-processing facility offers an authentic, " +
      "high-impact context for sustainability, clearly " +
      "demonstrating how AI applies to real-world " +
      "environmental engineering and resource recovery.",

    campus: "Curtin Dubai",
    role: "Lecturer · COMP6009",
    initials: "👨🏼",
    category: "Sustainability & AI"
  }

];


/* =========================================
   ELEMENT REFERENCES
========================================= */

const evalSection =
  document.getElementById("evaluation-progress");

const evalQuote =
  evalSection.querySelector("#evalQuote");

const evalCampus =
  evalSection.querySelector("#evalCampus");

const evalRole =
  evalSection.querySelector("#evalRole");

const evalAvatar =
  evalSection.querySelector("#evalAvatar");

const evalBadge =
  evalSection.querySelector("#evalFeedbackBadge");

const evalDots =
  evalSection.querySelector("#evalDots");

const evalCount =
  evalSection.querySelector("#evalCount");

const evalPrev =
  evalSection.querySelector("#evalPrev");

const evalNext =
  evalSection.querySelector("#evalNext");

let currentEvalIndex = 0;


/* =========================================
   CREATE CAROUSEL INDICATORS
========================================= */

evaluationTestimonials.forEach((testimonial, index) => {

  const dot = document.createElement("button");

  dot.type = "button";
  dot.className = "eval-dot";

  dot.setAttribute(
    "aria-label",
    `Show testimonial from ${testimonial.campus}`
  );

  dot.addEventListener("click", () => {
    renderEvaluationTestimonial(index);
  });

  evalDots.appendChild(dot);

});


/* =========================================
   RENDER TESTIMONIAL
========================================= */

function renderEvaluationTestimonial(index) {

  const total = evaluationTestimonials.length;

  currentEvalIndex = (index + total) % total;

  const testimonial =
    evaluationTestimonials[currentEvalIndex];

  evalQuote.textContent = `“${testimonial.quote}”`;

  evalCampus.textContent = testimonial.campus;

  evalRole.textContent = testimonial.role;

  evalAvatar.textContent = testimonial.initials;

  evalBadge.textContent = testimonial.category;

  evalCount.textContent =
    `${String(currentEvalIndex + 1).padStart(2, "0")} / ` +
    `${String(total).padStart(2, "0")}`;

  /* Update active indicator */

  const dots = evalDots.querySelectorAll(".eval-dot");

  dots.forEach((dot, dotIndex) => {

    const active = dotIndex === currentEvalIndex;

    dot.classList.toggle("active", active);

    dot.setAttribute(
      "aria-current",
      active ? "true" : "false"
    );

  });

}


/* =========================================
   NAVIGATION
========================================= */

evalPrev.addEventListener("click", () => {

  renderEvaluationTestimonial(currentEvalIndex - 1);

});

evalNext.addEventListener("click", () => {

  renderEvaluationTestimonial(currentEvalIndex + 1);

});


/* =========================================
   INITIALISE
========================================= */

renderEvaluationTestimonial(0);

// Native details retain keyboard support; close the mobile menu after navigation.
const phaseMenu = document.querySelector('.mobile-phase-nav');
phaseMenu.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  phaseMenu.open = false;
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && phaseMenu.open) {
    phaseMenu.open = false;
    phaseMenu.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (!phaseMenu.contains(event.target)) phaseMenu.open = false;
});

const phaseDropdown = document.querySelector('.phase-dropdown');
phaseDropdown.addEventListener('click', event => {
  if (event.target.closest('a[href^="#"]')) phaseDropdown.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && phaseDropdown.open) {
    phaseDropdown.open = false;
    phaseDropdown.querySelector('summary').focus();
  }
});
document.addEventListener('click', event => {
  if (!phaseDropdown.contains(event.target)) phaseDropdown.open = false;
});
