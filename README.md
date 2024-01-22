<div align="center">
  <img src="https://github.com/MuhannadQ/cloudaxes/blob/master/client/public/vite.svg" >
  <h1>Cloudaxes</h1>
</div>

<p align="center">
  ⚡️ <a href="https://cloudaxes.hashtag.dev""><i><strong>Demo</strong></i></a> •
  🔥 <a href="http://cloudaxes-app-dev.s3-website.eu-central-1.amazonaws.com"><i><strong>Bucket Demo</strong></i></a>
</p>

<p align="center">
  <i>Username</i>: <code>user-{i}-dev</code> • <i>Password</i>: <code>user{i}Dev</code>
  </br>
  <i>1 < i < 10</i>
</p>

<br />
<br />

#### To get started with Cloudaxes, follow these instructions for <u>first time deployment</u>:

**Notice:** All build and deploy scripts can be found in the `server` folder's `package.json`.

## 1. Server

### Installation

```bash
cd server
npm install
```

### Configuration (environment variables)

Create a `.env` or `.env.{stage}` file in the `server` folder. See [Resolution of environment variables in serverless framework](https://www.serverless.com/framework/docs/environment-variables) for more details about setting up environment variables for a specific deployment stage.

Refer to `.env.template` in the `server` folder for details.

### Deployment

Run server deployment script to build and deploy the backend infrastructure to AWS.

```bash
npm run deploy:server
```

Which deploys to the `dev` stage. You can specify the stage like this:

```bash
npm run deploy:server -- --stage <stage>
```

Successful deployment outputs values that we need for the client configuration.

## 2. Client

### Installation

```bash
cd client
npm install
```

### Configuration (environment variables)

Create `.env` file in the `client` folder.
Use values from the output of the server deployment. Currently you can't use `.env.{stage}` files here **directly** like in the server, so you need to change `.env` for each stage when deploying. It can be done with [Vite modes](https://vitejs.dev/guide/env-and-mode#env-files) but it requires some changes in the scripts.

Refer to `.env.template` in the `client` folder for details.

### Deployment

Run client deployment script to build and deploy the frontend to AWS S3.
Ensure that the server is deployed first.

**Notice:** Make sure you deploy the client to the same stage as the server.

```bash
npm run deploy:client
```

```bash
npm run deploy:client -- --stage <stage>
```

---

## Building and Deploying After Initial Setup

After setting up the project for the first time, the initial deployment for each stage can be a bit involved. However, subsequent deployments to the same stage can be simplified.

You can deploy both server and client together using `npm run deploy` (`npm run deploy -- --stage <stage>`), this would work only after the initial deployment to the same stage since client was already configured in the first one.

You can deploy the server only, using `npm run deploy:server` to deploy changes in the backend code or AWS resources.

You can deploy the client only, using `npm run deploy:client` to deploy frontend changes quickly to the hosting S3 bucket (Skipping server deployment).

If needed you can **build** and **sync** the frontend separately, using `npm run build:client` _then_ `npm run sync:client` (`npm run sync:client -- --stage <stage>`) only when you need to update the hosting S3 bucket.

---

## Usage

You can access the web app in 2 ways:

1. via the cloudfront CDN: using the cloudfront domain name `CloudFrontDistributionDomainName` from the server deployment outputs, or using an [alternate domain name](#setting-up-alternate-domain-for-cloudfront) if you provided one.
2. by accessing the hosting s3 bucket directly: using the s3 bucket website url `AppBucketWebsiteURL` from the server deployment outputs.

Cloudaxes leverages Cognito for authentication and authorization. It is invite-only; users need to be created in the Cognito AWS console by the admin.
Once created, users can change their password and access the app after logging in with a new password.
The backend authorizes requests using the JWT token returned by Cognito after successful authentication.

---

## Setting up Alternate Domain for CloudFront

To use a custom domain with CloudFront, follow these steps:

**1. Create an SSL/TLS Certificate:**

- Request a certificate from AWS Certificate Manager.

**2. Add a CAA Record in your DNS Provider:**

- Add a CAA Record with "amazon.com" in your DNS provider.

**3. Validate Certificate:**

- Validate the certificate by adding a CNAME Record with values from the ACM request: (`CNAME name` - `CNAME value`)

**4. Add a CNAME Record with your Domain Name.**

- Add a CNAME Record with your domain name and CloudFront domain name "db4321example0m.cloudfront.net" as the target.

**5. Set related environment variables in `server/.env` and deploy server.**

---

## Development and Testing

Cloudaxes uses tRPC for server and client communication which provides end-to-end typesafety while developing.

For local development run `npm run dev` in the server or client.
`npm run dev` in the server simulates serverless offline without authorization.

You can test the backend using vitest by running `npm run test` in the server folder.

<!--
## Future Work/Improvements
- Migrations, API documentation, acm certificate, route53
-->
