// src/data/experienceData.js
import { logoFPM, logoExcello, logoKDB, logoROKAF, logoSYPM } from "../assets";

export const experienceData = [
  {
    id: "usc-fpm",
    company: "USC Facilities Planning & Management",
    logo: logoFPM,
    title: "Data Analyst",
    period: "2024.08 – 2025.05 (10m)",
    location: "Los Angeles, CA",
    website: "https://fpm.usc.edu/",
    bullets: [
      "Identified irrigation meters and integrated data from two monitoring systems",
      "Reconstructed database with Python-based automated update program",
      "Developed and deployed Power BI dashboards for leadership review",
      "Analyzed campus utility consumption and billing data",
    ],
    kpis: [
      { label: "Dashboards", value: "5+" },
      { label: "Update frequency", value: "Daily" },
    ],
    tech: ["Python", "Pandas", "SQL", "Power BI"],
  },
  {
    id: "excello",
    company: "EXCELLO",
    logo: logoExcello,
    title: "Project Manager | Strategic Planning Assistant Manager",
    period: "2021.04 – 2022.10 (1y 7m)",
    location: "Seoul, South Korea",
    website: "https://iexcello.com/",
    bullets: [
      "Analyzed business data and supported C-suite in investment and funding decisions",
      "Led national R&D digital transformation projects (~$25M) including planning, budgeting, proposals",
      "Managed digitalization projects at Hyundai Steel, POSCO, and SeAH CSS",
      "Defined optimization goals: 10% cost reduction, productivity increase, 25% energy efficiency improvement",
    ],
    kpis: [
      { label: "Cost Reduction Target", value: "10%" },
      { label: "Energy Efficiency Target", value: "25%" },
    ],
    tech: ["Project Management", "Budgeting", "R&D", "Energy Analytics"],
  },
  {
    id: "kdb",
    company: "Korea Development Bank",
    logo: logoKDB,
    title: "SME Banking Intern",
    period: "2019.08 – 2019.11 (4m)",
    location: "Seoul, South Korea",
    website: "https://www.kdb.co.kr/index.jsp",
    bullets: [
      "Conducted market research and analysis for SME financial evaluations",
      "Assisted communication with overseas clients (English/Korean)",
      "Participated in due diligence of loan usage",
    ],
    kpis: [
      { label: "Reports", value: "10+" },
    ],
    tech: ["Excel", "Market Research", "Communication"],
  },
  {
    id: "rokaf",
    company: "Republic of Korea Air Force",
    logo: logoROKAF,
    title: "Military Police Staff Sergeant",
    period: "2017.07 – 2019.06 (2y)",
    location: "South Korea",
    website: "https://www.airforce.mil.kr/user/indexMain.action?command=&siteId=airforce-eng",
    bullets: [
      "Led squad for base defense and search missions",
    ],
    kpis: [
      { label: "Personnel Led", value: "10+" },
    ],
    tech: ["Leadership", "Security Operations"],
  },
  {
    id: "sypm",
    company: "Shin Yeong Project Management",
    logo: logoSYPM,
    title: "Strategic Planning Intern",
    period: "2015.07 – 2015.12 (6m)",
    location: "Ho Chi Minh City, Vietnam",
    website: "https://www.sypm.com.vn/",
    bullets: [
      "Researched competitors, customers, and legal issues for subsidiary establishment project",
      "Created brochures, websites, and business cards for marketing and sales",
      "Collected and organized occupational accident data into company DB",
      "Facilitated communication across planning, admin, marketing, design, sales, and PM teams",
      "Prepared real estate market outlook reports using macro indicators (population, GDP, CPI, etc.)",
    ],
    kpis: [
      { label: "Reports", value: "5+" },
    ],
    tech: ["MS Office", "Market Research", "Communication"],
  },
];