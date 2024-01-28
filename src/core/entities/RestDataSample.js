class RestDataSample {
  constructor(query, method, payload = { id: null, name: '', job: '' }) {
    this.query = query;
    this.method = method;
    this.payload = payload;
  }
}

module.exports = RestDataSample;