# OnlineCarSale_GenAI_PhaseA
QHE4103 Phase-A Delivery 2 - GenAI Powered Online Car Sale Website

#  AutoElite - Professional Online Car Sales Platform

##  Project Overview
A fully responsive, frontend-only web application designed for an online car sales marketplace. Built as a coursework project for QHE4103 Fundamentals of Web Technology (Phase-A Delivery 2), this platform allows users to browse, search, and filter vehicles, while registered sellers can manage listings, add new cars, and track interactions.

##  Key Features
- Responsive Design: Fully optimized for Desktop (≥1200px), Laptop (992–1199px), Tablet (768–991px), and Mobile devices.
- Dynamic Content: Hero carousel with auto-rotation, "New Arrivals", and "Best Sellers" sections.
- Advanced Search & Filtering: Real-time filtering by model, year, brand, price range, fuel type, and transmission. Pagination & sorting included.
- Seller Authentication Flow: Client-side registration & login with strict regex validation. Protected routes (`seller-dashboard`, `add-car`) redirect unauthenticated users.
- Data Persistence: Uses `localStorage` to simulate backend functionality (user accounts, vehicle listings, favorites, viewed history).
- Multi-Directional Navigation: Seamless routing between all pages with active state indicators & breadcrumb trails.

##  Tech Stack
- Markup & Styling: HTML5, CSS3 (Flexbox, Grid, CSS Custom Properties, BEM-like naming)
- Interactivity: Vanilla JavaScript (ES6+), DOM Manipulation, Event Delegation, `URLSearchParams`
- Storage: `localStorage` for mock data & session management
- Version Control: Git & GitHub (Feature branch workflow, PR-based integration, semantic commits)

##  Project Structure
OnlineCarSale_GenAI_PhaseA/
├── css/ # Global & page-specific stylesheets
│ ├── base.css # Reset, variables, typography, container utilities
│ ├── layout.css # Header, navigation, grid systems, card styles
│ ├── components.css # Buttons, carousel, icons
│ ├── responsive.css # Breakpoints (1200px, 992px, 768px)
│ └── [page-specific].css # Modular page styling
├── js/ # Core functionality & validation
│ ├── search.js # Filter, sort, pagination, URL state sync
│ ├── seller-login.js # Auth validation & session handling
│ ├── seller-registration.js # Regex validation & user storage
│ ├── car-detail.js # Dynamic detail rendering & related cars
│ ├── seller-dashboard.js # Vehicle management & mock stats
│ └── [page-specific].js
├── images/ # Logos, background assets & vehicle images
├── pages/ # All HTML pages
│ ├── index.html # Homepage
│ ├── about.html # About Us
│ ├── search.html # Find Cars
│ ├── login.html / register.html
│ ├── seller-dashboard.html
│ ├── add-car.html / car-detail.html
│ └── [others]
└── README.md # Project documentation


##  Setup & Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/zzzzzzzjw/OnlineCarSale_GenAI_PhaseA.git
   cd OnlineCarSale_GenAI_PhaseA

2. Open pages/index.html directly in a modern browser, or use a local development server (e.g., VS Code Live Server) for optimal routing.
3. No build tools, npm, or external dependencies required. Pure vanilla web technologies.

## Team & Contributions
Member 1: Jingwen Zhang (2024213859) 
Member 2: Ziyi Li (2024213856)
Member 3: Xifei Wu (2024213908)

All members contributed equally through isolated feature branches. Code was integrated via peer-reviewed pull requests into the develop branch before final deployment to main.

## GenAI Usage Statement
This project was developed in accordance with Phase-A Delivery 2 requirements, utilizing Generative AI as a collaborative development tool:

1. Structured Prompt Engineering: Role-based, constraint-driven prompts were crafted to enforce vanilla stack usage, responsive breakpoints, regex validation, and WAI-ARIA accessibility standards.

2. Iterative Refinement & Critical Evaluation: AI-generated outputs were rigorously tested. Inconsistent styles, missing edge-case handling, and validation gaps were identified, documented, and corrected through refined prompts and manual refactoring.

3. Human-Centric Development: AI served as an accelerator for scaffolding and repetitive UI components. All core routing, data flow (localStorage integration), form validation logic, and final cross-page integration were manually reviewed, optimized, and validated by the team.

## Course Information
Module: QHE4103 Fundamentals of Web Technology
Institution: Queen Mary School of Engineering and Materials Science, Hainan
Instructor: Dr. Reza Moosaei
Phase: Phase-A Delivery 2 (GenAI-Powered Frontend Development)
Submission Deadline: 27th April 2026 (23:59 BST)

## Submission Details
Source Code PDF: Zhang Jingwen_2024213859_SC2.pdf
Progress Report: Zhang Jingwen_2024213859_PR2.pdf
Both files contain the complete GitHub repository link and are submitted via QMPlus.