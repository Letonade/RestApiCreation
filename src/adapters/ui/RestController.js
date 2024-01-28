const RestUseCase = require('../../core/usecases/RestUseCase');

const SUCCESS = 200, POST_SUCCESS = 201, PUT_SUCCESS = 202, BAD_REQUEST = 400;
const isValidString = str => typeof str === 'string' && str.trim().length !== 0;
const assumedBaseResponse = () => ({ status: BAD_REQUEST, body: [] });

class RestController  {
// @letonade I like to use happy path, if you want to know why, come here => https://maelvls.dev/go-happy-line-of-sight/
    constructor(restUseCase) {
        this.restUseCase = restUseCase;
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

    get(request) {
        let response = assumedBaseResponse();
        response.status = SUCCESS;

        return this.restUseCase.matchDataSampleToGet(request, response)
    }

    post(request) {
        if (this.isEmpty(request.payload)){
            return assumedBaseResponse();
        }
        let response = assumedBaseResponse();
        return this.restUseCase.postDataSample(request, response)
    }

    put(request) {
        if (this.isEmpty(request.payload)) {
            return assumedBaseResponse();
        }
        let response = assumedBaseResponse();
        return this.restUseCase.putDataSample(request, response)
    }

    delete(request) {
        if (!isValidString(request.query)) {
            return assumedBaseResponse();
        }
        let response = assumedBaseResponse();
        return this.restUseCase.deleteSingleData(request, response)
    }

    isEmpty(object)
    {
        return Object.keys(object).length === 0;
    }

}

module.exports = RestController;