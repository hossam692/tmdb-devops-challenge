pipeline {
    agent any

    environment {
        IMAGE_NAME = "hossammoh/tmdb-devops-challenge:${env.BRANCH_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('node_modules')) {
                        echo "Skipping npm install since node_modules already exists."
                    } else {
                        sh 'npm ci'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('TypeScript') {
            steps {
                sh 'npx tsc --noEmit'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test -- --watchAll=false'
                junit 'junit.xml'
            }
        }

        stage('Package') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://${DOCKER_REGISTRY}', 'docker-credentials-id') {
                        def app = docker.build("${env.IMAGE_NAME}")
                        app.push()
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed."
        }
    }
}