// ports are interfaces, repository ones is used as interface of databases, for exemple MongoDBRestRepository will have getDataSample
class RestRepository {
  // Method to get a data sample
  getDataSample() {
    throw new Error('Method not implemented');
  }
}

module.exports = RestRepository;