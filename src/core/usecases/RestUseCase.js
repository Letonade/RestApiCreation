const Rest = require('../entities/RestDataSample');
const RestRepository = require('../ports/RestRepository');

const SUCCESS = 200, POST_SUCCESS = 201, PUT_SUCCESS = 202, BAD_REQUEST = 400;

class RestUseCase {
    constructor(dataSample) {
        this.dataSample = dataSample;
    }

    matchDataSampleToGet = function(request, response) {
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

    postDataSample(request, response) {
        response.status = POST_SUCCESS;
        response.body.push(request.payload);
        this.dataSample.push(request.payload);
        return response;
    }

    putDataSample(request, response) {
        const indexToUpdate = this.dataSample.findIndex(singleData => singleData.id === request.payload.id);
        if (indexToUpdate == -1) {
            return response;
        }
        response.status = PUT_SUCCESS;
        response.body.push(request.payload);
        this.dataSample[indexToUpdate] = request.payload;
        return response;
    }

    deleteSingleData(request, response) {
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

    parseQuery(query) {
        if (!query){
            return {}
        }
        query = query.replace(/^\?/, "");
        let splittedQuery = query.split("&");
        return this.composeParsedQuery(splittedQuery);
    }

    composeParsedQuery(splittedQuery) {
        let parsedQuery = {}
        splittedQuery.forEach((query) => {
            const queryPair = query.split('=');
            parsedQuery[queryPair[0]] = queryPair[1];
        });
        return parsedQuery
    }

    isEmpty(object)
    {
        return Object.keys(object).length === 0;
    }

}

module.exports = RestUseCase;