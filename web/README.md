# Twilio Demo Web App

This is an quick demo app to demonstrate Twilio Programmable Video.

It's a quick reworking of the quickstart app from Twilio, wrapping it in a more user friendly interface and modular style :thumbsup:

## Access Token

You'll need a valid `accessToken` from Twilio to self identify. This would normally be handled by a server, but this project just relies on them already being created. So jump over  to []() and generate one.

Replace the `accessToken` variable in: `src/js/services/twilio-adapter.js`

```
var accessToken = 'ACCESS_TOKEN_HOME';
```

Once you've done that, you're ready to rebuild and run the demo app.

## Development Environment

This project follows my quick web-app structure, [Treble](https://github.com/gavinbunney/treble), and as such uses `grunt` for most of the heavy lifting.

### Install bower components and node modules

```
$ bower install && bower prune
$ npm install && npm prune
```

### Quick Start

To compile, lint, dist and start a local server, simply run `grunt`.

```
$ grunt
```

A test server will then be available at `http://localhost:1337/`.

Running this default `grunt` task will also monitor for any file changes, then run the appropriate part of the build process.

## Distribution

After running `grunt`, a `dist` directory is created with all the files needed to deploy this demo app. Just upload them to your favorite static host server and you're done!