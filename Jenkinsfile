pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "jayanthnj"
        IMAGE_NAME     = "${DOCKERHUB_USER}/cicd-demo-api"
        DOCKER_CREDS   = credentials('my-fourth-project-creds')
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('2. Run Automated Tests (CI)') {
            steps {
                sh 'docker build --target test -t ${IMAGE_NAME}:test-${BUILD_NUMBER} .'
            }
        }

        stage('3. Build Production Image') {
            steps {
                sh 'docker build --target production -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('4. Push to Docker Hub (CD)') {
            steps {
                sh '''
                    echo "$DOCKER_CREDS_PSW" | docker login -u "$DOCKER_CREDS_USR" --password-stdin
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker push ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rmi ${IMAGE_NAME}:test-${BUILD_NUMBER} || true'
            sh 'docker logout || true'
        }
        success {
            echo "SUCCESS: Tests passed and pushed ${IMAGE_NAME}:${BUILD_NUMBER} to Docker Hub"
        }
        failure {
            echo "FAILED: Pipeline aborted. Check Stage logs above."
        }
    }
}
