// src/data/projectsData.js

import {
  imgDSCI531,
  imgDSCI531_2,
  imgDSCI531_report,
  imgDSCI550_corr1,
  imgDSCI550_corr2,
  imgDSCI550_predictPPI,
  imgDSCI551_arch,
  imgDSCI551_db,
  imgDSCI551_flow,
  imgDSCI551_ppt,
  imgDSCI551_web,
  imgDSCI554_report,
  imgDSCI554_slide9,
  imgDSCI554_slide10,
  imgEXCELLO,
  imgEXCELLO_2
} from "../assets";

export const projectsData = [
  {
    id: "usc-dsci553",
    company: "University of Southern California",
    title: "XGBoost-Based Recommendation System for Yelp Data Using Spark RDD",
    data: "",
    period: "",
    website: "",
    bullets: [
      "Built a hybrid recommendation system using Spark RDD and XGBoost",
      "Engineered features from Yelp user, business, and review datasets",
      "Improved RMSE over memory-based CF using metadata and model-based methods",
      "Handled cold-start and data sparsity issues through fallback logic",
    ],
    kpis: [
      "XGBoost Regressor",
      "100K+ Interactions",
      "Hybrid Recommendation",
      "Feature Engineering",
      "Memory-based CF",
      "Cold-start Handling"
    ],
    tech: ["Python", "Spark RDD", "XGBoost", "JSON"],
    img: []
  },
  {
    id: "usc-dsci552",
    company: "University of Southern California",
    title: "Sentiment Classification of Movie Reviews Using Deep Learning Models",
    data: "",
    period: "",
    website: "",
    bullets: [
      "Built and evaluated MLP, CNN, and LSTM models for movie review sentiment analysis",
      "Implemented custom embedding with Keras tokenizer and padded sequences",
      "Compared train/test accuracy across architectures",
      "Used Conv1D and MaxPooling for CNN, and temporal modeling with LSTM",
    ],
    kpis: [
      "MLP, CNN, LSTM",
      "IMDB Reviews",
      "Sentiment Analysis",
      "Custom Embedding",
      "Conv1D & MaxPooling"
    ],
    tech: ["Python", "Keras", "TensorFlow"],
    img: [imgDSCI531, imgDSCI531_2, imgDSCI531_report]
  },
  {
    id: "usc-dsci551",
    company: "University of Southern California",
    title: "Web-Based Application for U.S. Presidential Election Sentiment Analysis Using Reddit Data",
    data: "",
    period: "",
    website: "",
    bullets: [
      "Created a full-stack app with Flask and React to analyze Reddit sentiment",
      "Scraped election-related posts/comments with PRAW and stored them in Firebase",
      "Applied keyword-based sentiment scoring using NLTK",
      "Enabled live data insert/edit/delete via Firebase Realtime DB",
    ],
    kpis: [
      "NoSQL Realtime DB",
      "Full-stack App",
      "Web Scraping",
      "Keyword-based Scoring",
      "Realtime CRUD"
    ],
    tech: ["Python", "JavaScript", "Firebase", "React", "NLTK"],
    img: [imgDSCI551_web, imgDSCI551_arch, imgDSCI551_db, imgDSCI551_flow, imgDSCI551_ppt]
  },
  {
    id: "usc-dsci550",
    company: "University of Southern California",
    title: "Climate Impact on California Agriculture",
    data: "",
    period: "",
    website: "",
    bullets: [
      "Predicted PPI trends for lettuce using climate data from NOAA",
      "Aligned monthly PPI with prior weather windows based on crop cycles",
      "Trained LSTM model to capture long-term dependencies",
      "Compared with baseline linear regression using RMSE",
    ],
    kpis: [
      "PPI Forecast",
      "LSTM",
      "Time Series Forecasting",
      "Climate Impact Analysis",
      "Crop Sensitivity"
    ],
    tech: ["Python", "TensorFlow", "Pandas", "NOAA API"],
    img: [imgDSCI550_corr1, imgDSCI550_corr2, imgDSCI550_predictPPI]
  },
  {
    id: "usc-dsci554",
    company: "University of Southern California",
    title: "Neighborhood Visualization and Analysis: A Guide to Los Angeles for Travelers and Residents",
    data: "",
    period: "",
    website: "",
    bullets: [
      "Visualized crime, hotel, restaurant, and bike data for LA neighborhoods",
      "Implemented 3D crime heatmaps and restaurant density clustering using Deck.gl",
      "Built Vue.js dashboard and custom UI from Figma designs",
      "Utilized D3.js for interactive charts and filtering",
    ],
    kpis: [
      "Deck.gl + D3.js",
      "Vue.js",
      "3D Heatmaps",
      "Density Clustering",
      "Interactive Charts"
    ],
    tech: ["JavaScript", "Deck.gl", "D3.js", "Vue.js", "Figma"],
    img: [imgDSCI554_slide10, imgDSCI554_report, imgDSCI554_slide9]
  },
  {
    id: "usc-sepsis-bias",
    company: "University of Southern California",
    title: "Investigating Bias in AI for Sepsis Diagnosis: Analyzing Ethnic Disparities in ICU Decision-Making",
    data: "",
    period: "",
    website: "",
    bullets: [
        "Evaluated model performance disparities across ethnic groups using MIMIC-III ICU data with logistic regression, random forest, and MLP models.",
        "Applied SHAP and threshold adjustments to improve fairness in sepsis diagnosis."
    ],
    kpis: ["AI Fairness", "SHAP", "Logistic Regression", "Random Forest", "MLP", "MIMIC-III"],
    tech: ["Python", "Pandas", "Scikit-learn", "SHAP"],
    img: []
  },
  {
    id: "usc-electricity-forecast",
    company: "University of Southern California",
    title: "Forecasting Electricity Demand and Renewable Transition in Global Economies",
    data: "",
    period: "",
    website: "",
    bullets: [
        "Predicted future electricity usage, renewable transition rates, and pricing trends for major countries using statistical modeling.",
        "Assessed long-term sustainability and economic impact of renewable energy adoption."
    ],
    kpis: ["Statistical Modeling", "Time Series Forecasting", "Renewable Energy", "Economic Impact"],
    tech: ["Python", "Pandas", "Statsmodels"],
    img: []
  },
  {
    id: "excello-eaf",
    company: "EXCELLO",
    title: "Development of data-based energy efficiency optimization technology applicable to 70-ton Electric-Arc-Furnace in Steel making process.",
    data: "",
    period: "",
    website: "",
    bullets: [
      "Assigned as a project manager of EXCELLO and empowered with other involved companies for initiation of R&D.",
      "Internally supervised project timeline and communicated with consortium companies while the project was ongoing."
    ],
    kpis: ["Project Management", "Energy Efficiency", "70-ton EAF", "R&D"],
    tech: ["Python", "Energy Analytics", "Sensor Data", "Manufacturing AI"],
    img: [imgEXCELLO_2]
  },
  {
    id: "excello-burner",
    company: "EXCELLO",
    title: "Development of combustion burner design/manufacture for 3MW and demonstration.",
    data: "",
    period: "",
    website: "",
    bullets: [
      "Participated as a leading company project manager preparing for government agency project assessment on R&D necessity, budgeting, expected result, and project supervision while the project was ongoing."
    ],
    kpis: ["Project Management", "Combustion Burner Design", "3MW Demonstration", "R&D"],
    tech: ["Combustion Simulation", "Energy Analytics", "Sensor Data", "Manufacturing AI"],
    img: [imgEXCELLO]
  }
];

