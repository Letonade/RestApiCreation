const SUCCESS = 200, POST_SUCCESS = 201, PUT_SUCCESS = 202, BAD_REQUEST = 400;
const isValidString = str => typeof str === 'string' && str.trim().length !== 0;
const assumedBaseResponse = () => ({ status: BAD_REQUEST, body: [] });

class RestController  {
// @letonade I like to use happy path, if you want to know why, come here => https://maelvls.dev/go-happy-line-of-sight/
    constructor(dataSample) {
        this.dataSample= dataSample;
    }

    dispatch(request) {
        switch (request.method) {
            case "GET":     return this.get(request);
            case "POST":    return this.post(request);
            case "PUT":     return this.put(request);
            case "DELETE":  return this.delete(request);
            default:      return assumedBaseResponse();
        }
    }

    parseQuery(query) {
        if (!query){
            return {}
        }
        query = query.replace(/^\?/, "");
        let splittedQuery = query.split("&");
        return this.composeParsedQuery(splittedQuery);
    }

    composeParsedQuery(splittedQuery){
        let parsedQuery = {}
        splittedQuery.forEach((query) => {
            const queryPair = query.split('=');
            parsedQuery[queryPair[0]] = queryPair[1];
        });
        return parsedQuery
    }

    get(request) {
        let response = assumedBaseResponse();
        response.status = SUCCESS;
        let query = this.parseQuery(request.query);
        this.dataSample.forEach(singleData => {
            let match = true;
            for (let key in query) {
                if (singleData[key] != query[key]) {
                    match = false;
                    break;
                }
            }
          if (match) response.body.push(singleData);
        });
        return response;
    }

    post(request) {
        if (this.isEmpty(request.payload)){
            return assumedBaseResponse();
        }
        let response = assumedBaseResponse();
        response.status = POST_SUCCESS;
        response.body.push(request.payload);
        this.dataSample.push(request.payload);
        return response;
    }

    put(request) {
        if (this.isEmpty(request.payload)) {
            return assumedBaseResponse();
        }
        const indexToUpdate = this.dataSample.findIndex(singleData => singleData.id === request.payload.id);
        if (indexToUpdate == -1) {
            return assumedBaseResponse();
        }
        let response = assumedBaseResponse();
        response.status = PUT_SUCCESS;
        response.body.push(request.payload);
        this.dataSample[indexToUpdate] = request.payload;
        return response;
    }

    delete(request) {
        if (!isValidString(request.query)) {
            return assumedBaseResponse();
        }
        let response = assumedBaseResponse();
        let query = this.parseQuery(request.query);
        this.dataSample = this.dataSample.filter(singleData => {
          const match = Object.keys(query).every(key => singleData[key] === query[key]);
          if (match) {
            response.status = SUCCESS;
            return false;
          }
          return true;
        });
        return response;
    }

    isEmpty(object)
    {
        return Object.keys(object).length === 0;
    }

}

module.exports = RestController;