pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "hossammoh/tmdb-devops-challenge"
        DOCKER_REGISTRY = "index.docker.io"
        DOCKER_CREDENTIALS_ID = "dockerhub-credentials"
    }

    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/hossam692/tmdb-devops-challenge.git', branch: "${env.BRANCH_NAME}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint and Test') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Test') {
                    steps {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_ID}").push("${env.BUILD_ID}")
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline succeeded!'
            // Add Slack or email notification here
        }
        failure {
            echo 'Pipeline failed!'
            // Add Slack or email notification here
        }
        always {
            cleanWs()
        }
    }
}