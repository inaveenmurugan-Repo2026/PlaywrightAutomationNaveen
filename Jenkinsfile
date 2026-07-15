/*
----------------------------------------------------
Jenkins Pipeline for Playwright Automation Framework

Stages:
1. Checkout Source Code
2. Install Dependencies
3. Install Playwright Browsers
4. Execute Playwright Framework Tests
5. Generate Allure Report

Post Actions:
- Publish Allure Report
- Send HTML Email Notification
----------------------------------------------------
*/

pipeline {

    agent any

    stages {

        stage('Checkout Code') {
            steps {
                // Clone latest source code from GitHub
                git branch: 'main',
                    url: 'https://github.com/inaveenmurugan-Repo2026/PlaywrightAutomationNaveen.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                bat 'npm ci'
                // If npm ci fails because package-lock.json is missing,
                // replace it with:
                // bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Install required Playwright browsers
                bat 'npx playwright install'
            }
        }

        stage('Run Framework Tests') {
            steps {
                // Execute Playwright End-to-End framework tests
                bat 'npm run FrameworkTest'
            }
        }

        stage('Generate Allure Report') {
            steps {
                // Generate Allure HTML report
                bat 'allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {

        always {

            // Publish Allure Report in Jenkins
            allure(
                commandline: 'Allure',
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            )

            // Send execution email
            emailext(
                to: 'inaveenmurugan@gmail.com,itsmenaveen1126@gmail.com',
                subject: "${currentBuild.currentResult} | ${env.JOB_NAME} | Build #${env.BUILD_NUMBER}",
                mimeType: 'text/html',

                body: """
                <html>
                <body style="font-family: Arial, sans-serif;">

                <h2>🚀 Playwright Automation Execution Report</h2>

                <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">

                    <tr style="background-color:#f2f2f2;">
                        <td><b>Job Name</b></td>
                        <td>${env.JOB_NAME}</td>
                    </tr>

                    <tr>
                        <td><b>Build Number</b></td>
                        <td>${env.BUILD_NUMBER}</td>
                    </tr>

                    <tr>
                        <td><b>Build Status</b></td>
                        <td><b>${currentBuild.currentResult}</b></td>
                    </tr>

                    <tr>
                        <td><b>Build URL</b></td>
                        <td>
                            <a href="${env.BUILD_URL}">
                                🔗 Open Build
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Console Output</b></td>
                        <td>
                            <a href="${env.BUILD_URL}console">
                                📜 View Console
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Allure Report</b></td>
                        <td>
                            <a href="${env.JOB_URL}lastBuild/allure/">
                                📊 View Allure Report
                            </a>
                        </td>
                    </tr>

                </table>

                <br><br>

                Regards,<br>
                <b>Naveen QA Automation Framework</b>

                </body>
                </html>
                """
            )
        }
    }
}