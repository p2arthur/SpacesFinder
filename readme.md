# Project Documentation: Serverless Application with AWS CDK

Introduction
Welcome to the project "Serverless Application with AWS CDK." This project is an experimental endeavor to integrate CloudFormation stacks in order to develop a serverless application on AWS. The project is divided into three main stacks: ApiStack, DataStack, and LambdaStack.

## Project Overview

The project aims to create a serverless application using AWS CDK. Here is an overview of each stack's purpose:

### ApiStack

#### Composition: AWS API Gateway

Purpose: This stack sets up the API Gateway, which serves as the entry point to the serverless application.
DataStack

#### Composition: DynamoDB Instance

Purpose: The DataStack is responsible for managing data storage and utilizes DynamoDB as the primary data store for the application.
LambdaStack

#### Composition: Lambda Functions and Integrations

Purpose: The LambdaStack contains all Lambda functions and their integrations with other AWS services. Lambda functions serve as the business logic for the serverless application.
Getting Started
Follow the steps below to set up and deploy the serverless application:

## Clone the Repository

#### Clone this repository to your local development environment.

Install Dependencies

Ensure you have Node.js and AWS CDK installed.
Run npm install to install project dependencies.
Configure AWS Credentials

Configure your AWS credentials using the AWS CLI or environment variables.
Deploy Stacks

### Use the AWS CDK commands to deploy each stack:

cdk deploy ApiStack
cdk deploy DataStack
cdk deploy LambdaStack
Access the Application

Once the stacks are deployed successfully, you can access the serverless application via the provided endpoints in the ApiStack.
Project Structure
The project structure includes the following components:

api-stack/: Contains the AWS CDK code for the ApiStack.
data-stack/: Contains the AWS CDK code for the DataStack.
lambda-stack/: Contains the AWS CDK code for the LambdaStack.
src/: This directory may contain Lambda function source code and additional application code.
Additional Information
Project Author: [Your Name]
GitHub Repository: [Link to the GitHub Repository]
Conclusion
Thank you for exploring this experimental project for building a serverless application with AWS CDK. If you have any questions or feedback, please feel free to reach out to the project author.

#### Happy coding! 🚀👩‍💻👨‍💻
