(function($, window, TwilioAdapter) {
  'use strict';

  function HomeView() {
    this.setup();
  }

  HomeView.prototype = {

    setup: function () {

      $('#main').html(JST.home({}));

      this.options = {
        preview: false,
        started: false
      };

      this.views = {
        feedPreview : $('.feed .feed-preview'),
        feedPreviewBtn : $('.feed-controls .preview'),
        closeFeedBtn: $('.feed .close'),
        feedStartBtn: $('.feed-controls .start'),
        feedEndBtn: $('.feed-controls .end'),

        closeModalBtn: $('.modal-close'),

        feedInviteBtn: $('.feed-controls .invite'),
        feedInviteModal: $('#inviteModal'),
        connectionErrorModal: $('#connectionErrorModal'),
        inviteToInput: $('#inviteTo'),
        sendInviteBtn: $('.sendInviteBtn')
      };

      this.TwilioAdapter = new TwilioAdapter($.proxy(this.handleTwilioError, this));

      this.refresh();
      this.views.feedPreviewBtn.click($.proxy(this.previewFeedClicked, this));
      this.views.feedStartBtn.click($.proxy(this.feedStartClicked, this));
      this.views.feedEndBtn.click($.proxy(this.feedEndClicked, this));
      this.views.closeFeedBtn.click($.proxy(this.closeFeedClicked, this));
      this.views.sendInviteBtn.click($.proxy(this.sendInviteClicked, this));
      this.views.closeModalBtn.click($.proxy(this.closeModalClicked, this));

      // delegate directly to lean modal for inviting
      this.views.feedInviteBtn.leanModal();
    },

    refresh: function () {
      if (this.options.started) {
        this.views.feedStartBtn.hide();
        this.views.feedEndBtn.show();
        this.views.closeFeedBtn.show();
      } else {
        this.views.feedStartBtn.show();
        this.views.feedEndBtn.hide();
        this.views.closeFeedBtn.hide();
      }

      if (this.options.preview) {
        this.views.feedPreview.show();
        this.views.feedPreviewBtn.hide();
      } else {
        this.views.feedPreview.hide();
        this.views.feedPreviewBtn.show();
      }
    },

    previewFeedClicked: function() {
      this.options.preview = true;
      this.TwilioAdapter.previewFeed();
      this.refresh();
    },

    feedStartClicked: function() {
      if (!this.options.preview) {
        this.options.preview = true;
        this.TwilioAdapter.previewFeed();
      }

      this.options.started = true;
      this.refresh();
    },

    feedEndClicked: function() {
      this.TwilioAdapter.closeFeed();
      this.options.preview = false;
      this.options.started = false;
      this.refresh();
    },

    closeFeedClicked: function() {
      this.feedEndClicked();
    },

    closeModalClicked: function() {
      $('#lean_overlay').fadeOut(200);
      this.views.feedInviteModal.css('display', 'none');
      this.views.connectionErrorModal.css('display', 'none');
    },

    sendInviteClicked: function() {
      var inviteTo = this.views.inviteToInput.val() || '';
      if (!inviteTo || inviteTo.trim() === '') {
        alert('Sorry, you need to tell who to invite!');
        return;
      }

      this.TwilioAdapter.invite(inviteTo);
      this.closeModalClicked();
    },

    handleTwilioError: function(error) {
      if (!error) {
        return;
      }

      if (error.name === 'LISTEN_FAILED') {
        $('#connectionErrorModal').find('.modal-body').html(
          '<strong>Yikes! There was a problem connecting to Twilio</strong>' +
          '<br/>Check the accessToken is still valid - testing ones tend to expire!'
        );
        $('.log-content').attr('href', '#connectionErrorModal').leanModal().click();
      } else if (error.name === 'CONVERSATION_INVITE_FAILED') {
        $('#connectionErrorModal').find('.modal-body').html(
          '<strong>Yikes! There was a problem sending that invite</strong>' +
          '<br/>Perhaps you\'re not actually connected to Twilio?'
        );
        $('.log-content').attr('href', '#connectionErrorModal').leanModal().click();
      }
    }
  };

  window.HomeView = HomeView;

})(jQuery, window, window.TwilioAdapter);