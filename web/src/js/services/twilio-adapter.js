(function($, window) {
  'use strict';

  function TwilioAdapter(onError, onConversationStarted) {
    this.setup(onError, onConversationStarted);
  }

  TwilioAdapter.prototype = {

    conversationsClient : undefined,
    activeConversation : undefined,
    previewMedia : undefined,
    onError: undefined,

    setup: function(onError, onConversationStarted) {
      if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
        alert('WebRTC is not available in your browser.');
        return;
      }

      this.onError = onError;
      this.onConversationStarted = onConversationStarted;

      var accessToken = 'ACCESS_TOKEN_HERE';
      if (accessToken === 'ACCESS_TOKEN_HERE') {
        alert('You need to set your accessToken first!\nSee the README for help.');
        return;
      }

      var accessManager = new Twilio.AccessManager(accessToken);

      // create a Conversations Client and connect to Twilio
      this.conversationsClient = new Twilio.Conversations.Client(accessManager);
      var self = this;
      this.conversationsClient.listen().then(
        $.proxy(this.clientConnected, this),
        function (error) {
          self.log('Could not connect to Twilio: ' + error.message, error);
        }
      );

      // force close any existing feeds
      this.closeFeed();
    },

    closeFeed: function() {
      if (this.previewMedia) {
        this.previewMedia.stop();
        this.previewMedia = null;
      }

      if (this.activeConversation) {
        this.activeConversation.localMedia.stop();
        this.activeConversation.disconnect();
        this.activeConversation = null;
      }
    },

    previewFeed: function() {
      if (!this.previewMedia) {
        this.previewMedia = new Twilio.Conversations.LocalMedia();
        var self = this;
        Twilio.Conversations.getUserMedia().then(
          function (mediaStream) {
            self.previewMedia.addStream(mediaStream);
            self.previewMedia.attach('.feed-preview');
          },
          function (error) {
            console.error('Unable to access local media', error);
            self.log('Unable to access Camera and Microphone', error);
          }
        );
      }
    },

    clientConnected: function() {
      this.log('Connected to Twilio. Listening for incoming Invites as \'' + this.conversationsClient.identity + '\'');

      var self = this;
      this.conversationsClient.on('invite', function (invite) {
        self.log('Incoming invite from: ' + invite.from);
        invite.accept().then($.proxy(self.conversationStarted, self));
      });
    },

    invite: function(inviteTo) {
      if (this.activeConversation) {
        // add a participant
        this.activeConversation.invite(inviteTo);
      } else {
        // create a conversation
        var options = {};
        if (this.previewMedia) {
          options.localMedia = this.previewMedia;
        }

        var self = this;
        this.conversationsClient.inviteToConversation(inviteTo, options).then(
          $.proxy(self.conversationStarted, self),
          function (error) {
            self.log('Unable to create conversation', error);
            console.error('Unable to create conversation', error);
          }
        );
      }
    },

    conversationStarted: function (conversation) {
      this.log('In an active Conversation');
      this.activeConversation = conversation;

      // when a participant joins, draw their video on screen
      var self = this;
      conversation.on('participantConnected', function (participant) {
        self.log('Participant \'' + participant.identity + '\' connected');
        participant.media.attach('.home .feed');
      });

      // when a participant disconnects, note in log
      conversation.on('participantDisconnected', function (participant) {
        self.log('Participant \'' + participant.identity + '\' disconnected');
      });

      // when the conversation ends, stop capturing local video
      conversation.on('ended', function (conversation) {
        self.log('Connected to Twilio. Listening for incoming Invites as \'' + this.conversationsClient.identity + '\'');
        conversation.localMedia.stop();
        conversation.disconnect();
        self.activeConversation = null;
      });

      if (this.onConversationStarted) {
        this.onConversationStarted(conversation);
      }
    },

    log: function(message, error) {
      if (error) {
        $('.log-content').html(message).parent().addClass('error');
        this.onError(error);
      } else {
        $('.log-content').html(message).parent().removeClass('error');
      }
    }
  };

  window.TwilioAdapter = TwilioAdapter;

})(jQuery, window);