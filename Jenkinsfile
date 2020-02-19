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
        sh '''
          npm install --verbose -d 
          npm install --save classlist.js
        '''
        }
	  }
	 }
	} 
    
   
    stage('Test') {
	    steps{
        sh '''
          $(npm bin)/ng test --single-run --browsers Chrome_no_sandbox
        '''
        junit '**/test-results.xml'
		}
    }

    stage('code quality') {
	  steps{
        sh 'ng lint'
		}
    }

    stage('Build') {
	   steps{
        milestone()
        sh 'ng build --prod --build-optimizer'
		}
    }
	
	
      post {
          always {
            junit "test-results.xml"
          }
      }
       
    
    stage ('build image') {
      steps{
        sh '''
          rm -rf node_modules
          oc start-build angular-5-example --from-dir=. --follow
        '''
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
 
