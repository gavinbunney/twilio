# Twilio Demo Web App

This is an quick demo app to demonstrate Twilio Programmable Video.

It's a quick reworking of the quickstart app from Twilio, wrapping it in a more user friendly interface and modular style :thumbsup:

### Default view waiting for a conversation

![Default View](https://raw.githubusercontent.com/gavinbunney/twilio/master/assets/screenshot-01.jpg)

### Having a conversation with myself

![Conversation](https://raw.githubusercontent.com/gavinbunney/twilio/master/assets/screenshot-02.jpg)


## Access Token

You'll need a valid `accessToken` from Twilio to self identify. This would normally be handled by a server, but this project just relies on them already being created. So jump over  to [Twilio](https://www.twilio.com/user/account/video/getting-started?step=2&platform=javascript&environment=maclinux) and generate one.

Replace the `accessToken` variable in: `src/js/services/twilio-adapter.js`

```
var accessToken = 'ACCESS_TOKEN_HOME';
```

Once you've done that, you're ready to rebuild and run the demo app.

## Starting a Conversation

This demo relies on some testing tools from Twilio to start an actual conversation [here](https://www.twilio.com/user/account/video/getting-started?platform=javascript&step=3). Assuming you have your local environment up and running, you should be able to click the `Create Conversation` button on the Twilio testing tools and start a video chat.

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