pipeline {
  agent any
   options {
        parallelsAlwaysFailFast()
    }
  stages {
    stage('Build') { 
	  parallel {
       stage('Checkout') {
        steps{
        checkout scm
        }
    }

    stage('PreBuild Setup') {
	     steps{
        sh '''
          cd angular-seed
		  npm install -g  karma --no-optional
           
        '''
        }
	  }
	 }
	
	 stage('Compile') {
	   steps{
	      sh '''
	      cd /root/test2
          ng build --watch
		  '''
		}
    }      
   } 
    
   stage('Code Quality') { 
	  parallel {	  
	   stage('Lint Test') {
	    steps{
        sh '''
		cd /root/test2 
		npm run  lint
		'''
		}
       }
       stage('Unit Test') {
	    steps{
        sh '''
		  cd angular-seed
		  npm install karma-junit-reporter --save-dev
		  export CHROME_BIN=/usr/bin/google-chrome
          sh scripts/test.sh 
        '''        
		}
   	  }
	 }
	} 
	 
	 stage('Package') {
	   steps{
	      sh '''
	      cd /root/test2
          ng build --prod
		  '''
		}
       }
      
	
     
	   stage(' Deploy') {
	   steps{
        sh '''
        node scripts/web-server.js &
		'''
		} 
	   }	
	 Stage('Product Testing') {
	  parallel {
       	stage('Functional tests') {
	    steps{
        sh '''
		  cd angular-seed
		  export CHROME_BIN=/usr/bin/google-chrome
          sh scripts/e2e-test.sh &
        '''        
		 }
        }
	
	    stage('Regression tests') {
	    steps{
        sh '''
		  cd angular-seed
		  export CHROME_BIN=/usr/bin/google-chrome
          sh scripts/e2e-test.sh &
        '''
        
		}
       }
	
	    stage('Performance Test') {
	    steps{
        sh '''
		  cd angular-seed
		  export CHROME_BIN=/usr/bin/google-chrome
          sh scripts/e2e-test.sh &
            '''
        
		}
       }

        stage('Security Test') {
	     steps{
           sh '''
		    cd /root/test2 
		    retire --exitwith 0
		    '''
		    }
           }		
		stage('Acceptance Test') {
	     steps{
           sh '''
		    cd /root/test2 
		    retire --exitwith 0
		'''
		       }
		     }
		   
		  }
         }
		 
	    }
	   }
      
    
   
