pipeline {
  agent any
  stages {
    stage('Provisioning') {
      
	  
	parallel {
    stage('Checkout') {
        steps{
        checkout scm
        }
    }

    stage('NPM Install') {
	     steps{
        withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
            sh 'npm install'
        }
	  }
    }
   }
    stage('Test') {
	    steps{
        withEnv(["CHROME_BIN=/usr/bin/chromium-browser"]) {
          sh 'ng test --progress=false --watch false'
        }
        junit '**/test-results.xml'
		}
    }

    stage('Lint') {
	  steps{
        sh 'ng lint'
		}
    }

    stage('Build') {
	   steps{
        milestone()
        sh 'ng build --prod --aot --sm --progress=false'
		}
    }

    

    stage('Deploy') {
	   steps{
        milestone()
        echo "Deploying..."
		}     
    }
   }
  }
 }
