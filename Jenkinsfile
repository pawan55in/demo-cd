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
    
   stage('Code Quality') { 
	  parallel {
    stage('Unit Test') {
	    steps{
        sh '''
		  cd angular-seed
		  npm install karma-junit-reporter --save-dev
		  export CHROME_BIN=/usr/bin/google-chrome
          sh scripts/test.sh &
        '''
        
		}
    }

    stage('Lint Test') {
	  steps{
        sh '''
		cd /root/test2 
		npm run  lint
		'''
		}
       }
	  }
	}
	
    stage('Product Quality') { 
	  parallel {
    stage('END to End Test') {
	    steps{
        sh '''
		  cd angular-seed
		  export CHROME_BIN=/usr/bin/google-chrome
          sh scripts/e2e-test.sh &
        '''
        
		}
    }

    stage(' security vulnerability Scaning') {
	  steps{
        sh '''
		cd /root/test2 
		retire
		'''
		}
       }
	  }
	}

    stage('Build') {
	   steps{
	      sh '''
	      cd /root/test2
          ng build --prod --build-optimizer
		  '''
		}
    }      
    
    stage ('build image') {
      steps{
        sh '''
          echo "Build Completed" 
          
        '''
      }
    }
     stage('Deploy') {
	   steps{
        sh '''
        node scripts/web-server.js &
		'''
		} 
       		
    }
   }
  }
 
