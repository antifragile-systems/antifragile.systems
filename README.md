# :hatching_chick: Antifragile Systems :earth_africa: website

[![Build Status](https://travis-ci.org/antifragile-systems/as-web.svg?branch=master)](https://travis-ci.org/antifragile-systems/as-web)
[![Coverage Status](https://coveralls.io/repos/github/antifragile-systems/as-web/badge.svg?branch=master)](https://coveralls.io/github/antifragile-systems/as-web?branch=master)
[![](https://img.shields.io/github/release/antifragile-systems/as-web.svg)](https://github.com/antifragile-systems/as-web/releases)

> Antifragile Systems website

<p align="center"><img src="share/github/overview.gif" width="720"></p>

### Features
* Host files on a [AWS S3](https://aws.amazon.com/s3) bucket and deliver them :globe_with_meridians: worldwide through [AWS CloudFront](https://aws.amazon.com/cloudfront) :white_check_mark:

### How to develop
Clone the GitHub repo
```
git clone https://github.com/antifragile-systems/as-web.git
```

Change current directory
```
cd as-web
```

Run the NPM script that will deploy
```
npm run start
```

#### Available environment variables
Variable | Description | Required | Default value
:---:|:---:|:---:|:---:
WEBPACK_DEV_PORT | The port be used by the Webpack development server. | false | `3000`
ENVIRONMENT | The environment the app is running on. | false | `production`

### How to deploy
Clone the GitHub repo
```
git clone https://github.com/antifragile-systems/as-web.git
```

Change current directory
```
cd as-web
```

Run the NPM script that will deploy
```
npm run deploy
```

#### Available environment variables
Variable | Description | Required | Default value
:---:|:---:|:---:|:---:
AWS_CLOUDFRONT_DISTRIBUTION_ID | The CloudFront distribution ID to be invalidated. | true | 'undefined'
ENVIRONMENT | The environment the app is running on. | false | `production`
