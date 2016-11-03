import request from 'superagent'
import BooktypeNetwork from './network'
class Booktype {
    constructor () {
      this.currentProject =  null;
      //  Book ID.
      this.currentBookID = null;
      //  Full title
      this.currentBook = null;
      //  URL title
      this.currentBookURL = null;
      this.clientID = null;
      this.licenses = null;
      this.network = new BooktypeNetwork()
    }

    csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    sameOrigin (url) {
      // test that a given url is a same-origin URL
      // url could be relative or scheme relative or absolute
      var host = document.location.host; // host + port
      var protocol = document.location.protocol;
      var sr_origin = '//' + host;
      var origin = protocol + sr_origin;
      // Allow absolute or scheme relative URLs to same origin
      return (url === origin || url.slice(0, origin.length + 1) === origin + '/') ||
          (url === sr_origin || url.slice(0, sr_origin.length + 1) === sr_origin + '/') ||
          // or any other URL that isn't scheme relative or absolute i.e relative.
          !(/^(\/\/|http:|https:).*/.test(url));
    }

    getCookie(name) {
      var cookie = new RegExp(name+'=(.*?)(?:$|;)')
      return document.cookie.match(cookie)[1]
    }

    initCSRF () {
      var csrftoken = this.getCookie('csrftoken');
      var end = request.Request.prototype.end;
      request.Request.prototype.end = function(fn) {
        this.set('X-CSRFToken', csrftoken);
        return end.call(this, fn);
      };
    }

    connect () {
      this.initCSRF();
      this.network.connect();
    }

    subscribeToChannel (channelName, callback) {
      this.network.subscribeToChannel(channelName, callback);
    }

    sendToChannel (channelName, message, callback, errback) {
      message['channel'] = channelName;
      this.network.sendMessage(message, callback, errback);
    }

    // Just a shortcut
    sendToCurrentBook (message, callback, errback) {
      return this.sendToChannel('/booktype/book/' +
        win.booktype.currentBookID + '/' + win.booktype.currentVersion +
        '/', message, callback, errback);
    }

    // FIXME not implemented
    unsubscribeFromChannel (channelName, someID) {
    }

    // Just a shortcut
    // '_' (a, b) { return win.booktype.i18n.translateText(a, b); },

    getBookURL (version) {
      var u = win.booktype.bookViewUrlTemplate.replace('XXX', win.booktype.currentBookURL);

      if (version) { u += '_v/' + version + '/'; }

      return u;
    }

    getBookDraftURL (version) {
      var u = win.booktype.bookDraftViewUrlTemplate.replace('XXX', win.booktype.currentBookURL);

      if (version) { u += '_v/' + version + '/'; }

      return u;
    }

}

export default Booktype;
