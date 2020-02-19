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
		  npm install -g  karma --no-optional
           
        '''
        }
	  }
	 }
	} 
    
   
    stage('Unit Test') {
	    steps{
        sh '''
          sh angular-seed/scripts/test.sh
        '''
        junit '**/test-results.xml'
		}
    }

    stage('code quality') {
	  steps{
        sh '''
		cd /root/test2 
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
 
