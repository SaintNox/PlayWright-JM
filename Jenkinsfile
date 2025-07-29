pipeline {
    agent {
        docker { image 'mcr.microsoft.com/playwright:v1.54.0-noble' }
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('e2e-tests') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test --reporter=html'
            }
        }
    }
    post {
        always {
            publishHTML([
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])
        }
    }
}
