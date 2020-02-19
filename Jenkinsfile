pipeline {
  agent any
   options {
        parallelsAlwaysFailFast()
    }
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
          cd angular-seed
		  npm install --verbose -d 
           
        '''
        }
	  }
	 }
	} 
    
   
    stage('Unit Test') {
	    steps{
        sh '''
          sh scripts/test.sh
        '''
        junit '**/test-results.xml'
		}
    }

    stage('code quality') {
	  steps{
        sh '''
		npm run  lint
		'''
		}
    }

    stage('Build') {
	   steps{
          sh 'ng build --prod --build-optimizer'
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
        
        echo "Deploying..."
		}     
    }
   }
  }
 
