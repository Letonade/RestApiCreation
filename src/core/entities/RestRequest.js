const RestPayload = require('./RestPayload');

class RestRequest {
  constructor(query, method, payload = [] ) {
    this.query = query;
    this.method = method;
    this.payload = payload;
  }
}

module.exports = RestRequest;