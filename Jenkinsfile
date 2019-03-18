#!/usr/bin/env groovy
pipeline{
    agent any

    //Define stages for the build process
    stages{
        //Define the deploy stage
        stage('Deploy'){
            steps{
                script{
                    docker.withRegistry('https://build.hdap.gatech.edu'){
                        //Build and push the database image
                        //Params to -f are location of Dockerfile in project directory and context to run the Dockerfile
                        //The example below looks for a Dockerfile in the same directory as this Jenkinsfile and runs the Dockerfile from the current directory
                        //Please change MY_IMAGE_NAME to something that identifies your project
                        def myImage = docker.build("PDMP_SMART_ON_FHIR:${env.BUILD_NUMBER}", "-f ./Dockerfile .")
                        //push image to docker registry
                        myImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
        //Define stage to notify rancher
        stage('Notify'){
            steps{
                script{
                    //Notify rancher to pull down the image
                    //UNIQUE_NAME_FOR_SERVICE_STACK/NAME_FOR_CONTAINER tells rancher to create a service stack in the swarm named UNIQUE_NAME_FOR_SERVICE_STACK that contains your application container named NAME_FOR_CONTAINER 
                    //Please change UNIQUE_NAME_FOR_SERVICE_STACK/NAME_FOR_CONTAINER to something unique for your project
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'https://rancher.hdap.gatech.edu/v2-beta', environmentId: '1a7', environments: '', image: "build.hdap.gatech.edu/PDMP_SMART_ON_FHIR:${env.BUILD_NUMBER}", ports: '', service: 'PDMP_SMART_ON_FHIR_SERVICE/PDMP_SMART_ON_FHIR', timeout: 60
                }
            }
        }
    }
}