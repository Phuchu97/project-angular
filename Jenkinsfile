def serviceName = "ecom-web"
def dockerRepo = "smartgapjsc"
def dockerTag = ""
def dockerImage = ""
def dockerComposePath = "/home/devops/workspace/ecom"
def chatID = "-1001547311638"
def server = [
  "develop"   :  "192.168.0.21",
  "staging"   :  "192.168.0.22",
  "main"   :  "192.168.0.20"
]
def theLatestTag = ""


pipeline {
  agent any

  options {
    gitLabConnection('Gitlab server connection')
  }

  stages {
    stage('Initialization') {
      steps {
        script {
          withCredentials([gitUsernamePassword(credentialsId: 'devops',   gitToolName: 'git-tool')]) {
            theLatestTag = sh (returnStdout: true, script: "git ls-remote --tags --sort=committerdate | grep -Po '[0-9]+\\.[0-9]+\\.[0-9]+' | tail -n 1").trim()
          }
          if (env.BRANCH_NAME != "staging") {
            dockerTag = "${env.GIT_COMMIT.substring(0,8)}-${env.BRANCH_NAME}"
          } else {
            dockerTag = sh (returnStdout: true, script: "bash ${WORKSPACE}/scripts/bump_version.sh -c ${WORKSPACE}/CHANGELOG.md -v ${theLatestTag} | tail -n 1").trim()
          }
          currentBuild.displayName = "Tag: $dockerTag"
        }
      }
    }

    stage('Configure'){
      steps {
        //Docker Login
        withCredentials([usernamePassword(credentialsId: 'DockerHub_Account', usernameVariable: 'dockerHubAccount', passwordVariable: 'dockerHubPassword')]) {
          sh "docker login --username $dockerHubAccount --password $dockerHubPassword"
        }
      }

    }

    stage('Build Image') {
      steps {
        gitlabCommitStatus("Build") {
          script {
            if (env.BRANCH_NAME == "staging" || env.BRANCH_NAME == "main") {
              sh "docker build --build-arg env=prod -t $dockerRepo/$serviceName:$dockerTag ."
            } else {
              sh "docker build --build-arg env=dev -t $dockerRepo/$serviceName:$dockerTag ."
            }
          }
        }
      }
    }

    stage('Publish') {
      when {
        branch pattern: "^develop\$|^staging\$|^main\$", comparator: "REGEXP"
      }
      steps {
        gitlabCommitStatus("Publish") {
          script {
            sh "docker push $dockerRepo/$serviceName:$dockerTag"
          }
        }
      }
    }

    stage('Tag') {
      when {
        branch pattern: "^staging\$", comparator: "REGEXP"
      }
      steps {
        gitlabCommitStatus("Tag") {
          script {
            withCredentials([gitUsernamePassword(credentialsId: 'devops',   gitToolName: 'git-tool')]) {
              sh """
                git tag ${dockerTag} ${env.GIT_COMMIT}
                git push --tags
              """
            }
          }
        }
      }
    }

    stage('Deploy') {
      when {
        branch pattern: "^develop\$|^staging\$|^main\$", comparator: "REGEXP"
      }
      steps {
        gitlabCommitStatus("Deploy") {
          script {
            withCredentials([sshUserPrivateKey(credentialsId: 'devops-ssh-key', keyFileVariable: 'identity', passphraseVariable: 'passphrase', usernameVariable: 'userName')]) {
              IP = server."${env.BRANCH_NAME}"
              sh """
                sshpass -P "passphrase" -p '${passphrase}' \
                scp -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -P 26266 ${userName}@${IP}:~/workspace/ecom/docker-compose.yaml docker-compose-server.yaml

                yq eval-all '. as \$item ireduce ({}; . * \$item )' docker-compose.yaml docker-compose-server.yaml > docker-compose-merge.yaml

                sed -i 's#$dockerRepo/$serviceName:.*#$dockerRepo/$serviceName:$dockerTag#g' docker-compose-merge.yaml

                sshpass -P "passphrase" -p '${passphrase}' \
                scp -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -P 26266 docker-compose-merge.yaml ${userName}@${IP}:~/workspace/ecom/docker-compose.yaml

                sshpass -P "passphrase" -p '${passphrase}' \
                ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -p 26266 ${userName}@${IP} 'docker-compose -f ~/workspace/ecom/docker-compose.yaml up -d'
              """
            }
          }
        }
      }
    }
  }

  post {
    always {
      script {
        withCredentials([string(credentialsId: 'jenkins-telegram-bot', variable: 'botToken')]) {
          if (env.BRANCH_NAME == 'develop'){
            message = "URL: ${env.BUILD_URL}\nBuild ${env.GIT_COMMIT.substring(0,8)}-${env.BRANCH_NAME}\nBuild Status: ${currentBuild.currentResult}".replace("192.168.99.84","103.121.91.79").trim()
          } else {
            message = "URL: ${env.BUILD_URL}\nBuild ${env.GIT_COMMIT.substring(0,8)}-${env.BRANCH_NAME}\nEnv: ${env.BRANCH_NAME}\nBuild Status: ${currentBuild.currentResult}".replace("192.168.99.84","103.121.91.79").trim()
          }
          sh "curl -X POST 'https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatID\\&text=${URLEncoder.encode(message)}'"
        }
        echo "Clean Up environment"
        sh """
          docker rmi $dockerRepo/$serviceName:$dockerTag
          # Remove unused container
          docker container prune --force
          # Remove unused image
          docker images | grep '<none>' || true
          docker image prune --force
        """
      }
    }
  }
}
