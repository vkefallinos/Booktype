import request from 'superagent'

class BooktypeNetwork {
  constructor () {
    this._results = null;
    this._lastAccess = null;
    this._isInitialized = false;
    this._messages = null;
    this._uid = 1;
    this.options = {'poll': true, 'iteration': 5000 };
  }
  connect (_options) {
    if (this._isInitialized) { return; }
    this.interval();
    this._isInitialized = true;
    var channels = [];

    for (var key in this._subscribedChannels) {
      // this sux
      if (key !== 'isArray' && key !== 'contains' && key !== 'append') {
        channels.push(key);
      }
    }
    this._messages = this._messages.concat([{
      'channel': '/booktype/',
      'command': 'connect',
      'uid': this._uid,
      'channels': channels
    }])


    this._results[this._uid] = [(result) => {
      this.clientID = result.clientID;
      this.sendData();
    }, null];

    this._uid += 1;

    this.sendData();
  }
  
  interval () {
    if (!this.options['poll']) {
       return;
    }

    setInterval(() => {
      if (this.clientID && this._messages.length === 0) {
        this.sendMessage({'channel': '/booktype/', 'command': 'ping'}, function () {});
      }

      if (this.clientID) {
        this.sendData();
      }

      this._lastAccess = new Date();
    }, this.options['iteration']);
  }

  subscribeToChannel (channelName, callback) {
    var ch = this._subscribedChannels;

    if (!ch[channelName]) {
      ch[channelName] = [callback];
    } else {
      ch[channelName].push(callback);
    }

    if (this._isInitialized) {
      this.sendMessage({
        'channel': '/booktype/',
        'command': 'subscribe',
        'channels': [channelName]
      });
    }
  }

  receiveMessage (message, result) {
    if (message.uid) {
      var res = this._results[message.uid];

      if (res) {
        // 0 or 1 depending of the result
        res[0](message);
        delete this._results[message.uid];
      }
    } else {
      for (var a = 0; a < this._subscribedChannels[message.channel].length; a++) {
        this._subscribedChannels[message.channel][a](message);
      }
    }
  }

  sendMessage (message, callback, errback) {
    if (callback) {
      this._results[_uid] = [callback, errback];
    }

    message['uid'] = _uid;

    this._messages.push(message);
    this._uid += 1;

    if (this.clientID) {
      this.sendData();
    }
  }

  sendData () {
    if (!this._isInitialized) { return; }
    if (!this._messages.length) { return; }


    var msgs = JSON.stringify(this._messages);
    this._messages = [];

    request.post('/_sputnik')
    .send({'clientID': this.clientID, 'messages': msgs })
    .set('Accept', 'application/json')
    .end((err, res) =>{
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        res.body.messages.forEach((msg) => {
          this.receiveMessage(msg, res.body.result);
        })
      }
    });
  }
}

export default BooktypeNetwork;
