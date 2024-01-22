<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS with Typescript'
description: 'This template demonstrates how to make a simple HTTP API with Node.js and Typescript running on AWS Lambda and API Gateway using the Serverless Framework v3.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node with Typescript HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js and Typescript running on AWS Lambda and API Gateway using the Serverless Framework v3.

## Setup

Run this command to initialize a new project in a new working directory.

```
npm install
```

## Usage

**Deploy**

```
$ serverless deploy
```

**Invoke the function locally.**

```
serverless invoke local --function trpc
```

The Serverless Framework uses your AWS profile to deploy your resources on your behalf. But while developing on your local using the serverless invoke local command things are a little different.

In this case your Lambda function is run locally and has not been deployed yet. So any calls made in your Lambda function to any other AWS resources on your account will use the **default AWS profile** that you have.

<!-- `AWS_PROFILE=newUser serverless invoke local --function hello` -->

<!-- ---
TODO: add this note:
I had an error with `createTRPCReact<AppRouter>()` that AppRouter type is not compatible and other errors like with `httpBatchLink` when @trpc/client version was 11 but @trpc/server version was 10.
So, need to make sure @trpc/server and @trpc/client versions are compatible (same versions). -->
