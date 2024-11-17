# To-do List Application
- This project is aimed to implement a to-do list application utilizing AWS cloud services and employing agile development practices. 
- The resulting web application enables users to authenticate through AWS Cognito and manage their personal to-do’s through an user-friendly UI. 
- The application allows users to create to-do’s with titles, descriptions, images, categories, priorities, set deadlines and completion status. Users can update or delete specific to-do item, and on the to-do’s dashboard, can view all to-do’s in an organized way, apply filters and sort their to-do’s based on criterias including creation date, deadline, category, priority and completion status.

## Sprints Overview
The project is completed in two sprints focusing on different aspects of the application:
### Sprint 1: Infrastructure Setup and Authentication:
 This sprint focused on setting up the cloud infrastructure using AWS services and implementing user authentication using AWS Cognito.
### Sprint 2: Core To-Do Management Features:
 The second sprint focused on developing the core functionality of the to-do list application, including CRUD operations for to-do items and frontend-backend integration.
## Epics and User Stories
The project was divided into three main epics:
### Epic: Application Design
- TODOAPP-1: Create application architecture diagram
- TODOAPP-15: Backend application deployment and configuration on cloud
- TODOAPP-16: CI/CD and IAC script generation using Terraform
### Epic: IDP Login
- TODOAPP-4: Allow users to authenticate via AWS Cognito (IDP Login)
### Epic: Application Functions Development
- TODOAPP-7: Allow users to add new to-do items and the details including title, description, priority, and an image
- TODOAPP-9: Allow users to view their to-do items in an organized way enabling them to filter, sort, and group them
- TODOAPP-8: Allow users to change details of to-do items such as title, description, status, deadline, and priority

## Definition of Ready  and Definition of Done 
	To ensure that stories were well-defined before work began and properly completed once development was finished, stated standards for Definition of Ready (DoR) and Definition of Done (DoD) as below:

### Definition of Ready (DoR):
- Explicit Title: Each task had a clear, concise title that described the task or feature.
- Clear Description: Each task included a user story written in the format: "As a ..., I want to ..., so that...".
- Story Points Estimation: Each task was estimated using story points to indicate complexity and effort.
- No Blockers: Tasks were only marked as ready if there were no blockers preventing them from being started.

### Definition of Done (DoD):
- Implemented: The feature was fully developed and integrated into the application.
- Documented: The feature was documented, ensuring clarity and ease of understanding.
- Passes CI and Build: The feature passed all CI pipeline checks and build steps.

## CI / CD
The project utilizes an automated CI/CD pipeline using GitHub Actions, DockerHub, and Terraform. The pipeline has two parts, first, build and deploy image whenever changes were pushed to the master branch, second, use the latest docker image on Task Definiton part of the Terraform script and integrate other infrastructure elements.
### GitHub Actions: 
The pipeline was triggered on code pushes to the master branch. The GitHub Actions workflow was responsible for:
- Checking out the latest code.
- Building the Spring Boot application using Maven with tests.
- Building a Docker image of the application.
- Pushing the Docker image to DockerHub.
### DockerHub: 
The Docker image generated by the GitHub Actions pipeline was stored in a public DockerHub repository, from where it could be pulled by AWS ECS during deployment.
### Terraform: 
Terraform is used to define and provision the AWS infrastructure. It managed the creation of the VPC, subnets, route tables, gateways, security groups, ECS cluster, RDS MySQL instance, Cognito client, ELB and API Gateway. When creating containers, Terraform uses the latest image that is pushed via Github Actions to DockerHub.

## Application Architecture Diagram

```mermaid
graph TB
    %% Style definitions
    classDef aws fill:#EB8317,stroke:#FF9900,color:white,stroke-width:2px
    classDef vpc fill:#31511E,stroke:#2196F3,stroke-width:5px
    classDef subnet fill:#BBDEFB,stroke:#1976D2,stroke-width:2px
    classDef rds fill:#5C6BC0,stroke:#283593,color:white,stroke-width:2px
    classDef container fill:#FFB74D,stroke:#F57C00,color:black,stroke-width:2px
    classDef alb fill:#EC407A,stroke:#C2185B,color:white,stroke-width:2px
    classDef gateway fill:#7E57C2,stroke:#4527A0,color:white,stroke-width:2px
    classDef cognito fill:#257180,stroke:#232F3E,color:white,stroke-width:2px
    classDef ui fill:#219B9D,stroke:#232F3E,color:white,stroke-width:2px

    subgraph CLIENT[Client Browser]
        REACTUI((React UI on S3 and Vercel))
    end

    subgraph AWS[AWS Cloud us-east-1]
        APIGW((API Gateway))
        COGNITO[Cognito User Pool <br> Cognito Hosted UI]
        
        subgraph VPC[Project VPC]
            subgraph PUBLIC[Public Subnets]
                PS1[Subnet 1 us-east-1a]
                PS2[Subnet 2 us-east-1b]
                ALB((Application <br>Load Balancer))
            end
            subgraph PRIVATE[Private Subnets]
                subgraph ECS[ECS Cluster]
                    subgraph PRS2[Subnet 3 - us-east-1a]
                        DB[RDS/ MYSQL DB<br/>Instance: db.t3.micro]
                        TASK2[Container 2<br/>Spring Boot App - API <br/> Port: 8080]
                    end      
                    subgraph PRS1[Subnet 4 - us-east-1b]
                        TASK1[Container 1<br/>Spring Boot App - API <br/> Port: 8080]
                    end   
                end
            end
            IGW[Internet Gateway]
            NAT[NAT Gateway]
        end
    end

    %% Authentication Flow
    REACTUI -->|#1 Login via Hosted UI| COGNITO
    COGNITO -->|#2 Callback with Auth Code| REACTUI
    REACTUI -->|#3 Exchange Access Token| APIGW
    REACTUI -->|#4 API Call with Token| APIGW
    APIGW -->|#5 Validate Token via Authorizer| COGNITO
    
    %% Application Flow
    APIGW -->|#6 Forward Request| ALB
    APIGW -->|#7 Proxy Responses| REACTUI
    ALB -->|Route Traffic| TASK1
    ALB -->|Route Traffic| TASK2
    TASK1 -->|DB Ops| DB
    TASK2 -->|DB Ops| DB
    
    %% Network Flow
    IGW --> PUBLIC
    NAT --> PRIVATE
    PUBLIC --> NAT

    %% Apply styles
    class AWS aws
    class REACTUI ui
    class COGNITO cognito
    class APIGW gateway
    class VPC vpc
    class ALB alb
    class TASK1,TASK2 container
    class DB rds
    class IGW,NAT gateway
```