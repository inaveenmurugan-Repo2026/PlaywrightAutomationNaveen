# 🚀 Playwright Automation Framework

A robust end-to-end Playwright Automation Framework built using JavaScript with support for:

- ✅ UI Automation
- ✅ API Automation
- ✅ Page Object Model (POM)
- ✅ Fixtures
- ✅ Jenkins CI/CD
- ✅ Allure Reporting
- ✅ Email Notifications
- ✅ Smoke & Regression Execution
- ✅ Cross Browser Execution

---

# 📂 Project Structure

```
PlaywrightAutomation
│
├── pageobjects/          # Page Object classes
├── tests/
│   ├── web/              # UI Test Cases
│   ├── api/              # API Test Cases
│   ├── framework/        # End-to-End Framework Tests
│   └── experiments/      # Practice/POC Tests
│
├── utils/                # Utilities (API Utils, Base Fixtures)
├── testdata/             # Test Data (JSON)
├── screenshots/          # Failure Screenshots
├── playwright-report/    # HTML Report
├── allure-results/       # Allure Results
├── allure-report/        # Generated Allure Report
│
├── playwright.config.js //- Retry Mechanism
├── package.json
└── Jenkinsfile
```

---

# 🛠 Tech Stack

- Playwright
- JavaScript
- Node.js
- Git
- GitHub
- Jenkins
- Allure Reports

---

# 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to project

```bash
cd PlaywrightAutomation
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# ▶ Running Tests

### Execute all tests

```bash
npm test
```

### Execute Smoke Tests

```bash
npm run webTests
```

### Execute API Smoke Tests

```bash
npm run APITests
```

### Execute Regression Suite

```bash
npm run regression
```

---

# 🌍 Browser Execution

Run on Chrome

```bash
npx playwright test
```

Run on Safari

```bash
npm run safariNewConfig
```

---

# 📊 Reports

### Playwright HTML Report

```bash
npx playwright show-report
```

### Generate Allure Report

```bash
allure generate allure-results --clean -o allure-report
```

### Open Allure Report

```bash
allure open allure-report
```

---

# 🔄 Jenkins CI/CD

Framework is integrated with Jenkins Pipeline.

Pipeline Stages

- Checkout Source Code
- Install Dependencies
- Execute Smoke Tests
- Generate Allure Report
- Publish Allure Report
- Send Email Notification

Triggers Supported

- Poll SCM
- Build Periodically
- Manual Build

---

# 📌 Framework Features

- Page Object Model
- Reusable Utility Classes
- API Utility Layer
- JSON Test Data
- Fixtures
- Assertions using Playwright Expect
- Network Interception
- Cross Browser Support
- Screenshot Capture
- Data-driven execution from Excel
- HTML Reporting
- Allure Reporting
- Jenkins Pipeline Integration
- Automated Email Notifications

---

# 📈 Future Enhancements

- Docker Integration
- GitHub Actions CI
- Parallel Execution
- Azure DevOps Pipeline
- Database Validation
- Environment Configuration (.env)
- Slack Notifications

---

"QE Repo Github webhook Test"

# 👨‍💻 Author

**Naveen Murugan**

GitHub:
https://github.com/inaveenmurugan-Repo2026