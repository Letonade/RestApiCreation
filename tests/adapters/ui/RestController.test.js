// @letonade Write the main test of this kata..
// @letonade I took those test from another kata and completed a few things
const RestController = require('../../../src/adapters/ui/RestController');
const RestUseCase = require('../../../src/core/usecases/RestUseCase');
const assert = require('assert');

describe('Example Test Cases', function() {
  const dataSample = [
    {
      id: 1,
      name: "Ada",
      job: "Programmer"
    },
    {
      id: 2,
      name: "Kyle",
      job: "Programmer"
    },
    {
      id: 3,
      name: "Adam",
      job: "QA Engineer"
    },
  ];

  let request, response;
  const restUseCase = new RestUseCase(dataSample);
  const controller = new RestController(restUseCase);

  it("GET Requests", function() {
    request = {
      payload: {},
      query: "?job=Programmer",
      method: "GET"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 200,
      body: [
        {
          id: 1,
          name: "Ada",
          job: "Programmer"
        },
        {
          id: 2,
          name: "Kyle",
          job: "Programmer"
        }
      ]
    });

    request = {
      payload: {},
      query: "?id=1",
      method: "GET"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 200,
      body: [
        {
          id: 1,
          name: "Ada",
          job: "Programmer"
        }
      ]
    });

    request = {
      payload: {},
      query: "?name=Lex",
      method: "GET"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 200,
      body: []
    });
  });

  it("POST Requests", function() {
    request = {
      payload: {
        id: 4,
        name: "George",
        job: "Beta Tester"
      },
      query: "",
      method: "POST"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 201,
      body: [
        {
          id: 4,
          name: "George",
          job: "Beta Tester"
        }
      ]
    });
  });

  it("PUT Requests", function() {
    request = {
      payload: {
        id: 2,
        name: "Adam",
        job: "UX Designer"
      },
      query: "?id=2",
      method: "PUT"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 202,
      body: [
        {
          id: 2,
          name: "Adam",
          job: "UX Designer"
        }
      ]
    });
  });

  it("DELETE Requests", function() {
    request = {
      payload: {},
      query: "?name=Adam",
      method: "DELETE"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 200,
      body: []
    });
  });

  it("GET Requests", function() {
    request = {
      payload: {},
      query: "",
      method: "GET"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 200,
      body: [
        {
          id: 1,
          name: "Ada",
          job: "Programmer"
        },
        {
          id: 4,
          name: "George",
          job: "Beta Tester"
        }
      ]
    });
  });
});

describe('Example Edge Cases', function() {
  const dataSample = [
    {
      id: 1,
      name: "Ada",
      job: "Programmer"
    }
  ];

  const controller = new RestController(dataSample);
  let request, response;

  it("POST Requests", function() {
    request = {
      payload: {},
      query: "",
      method: "POST"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 400,
      body: []
    });
  });

  it("PUT Requests", function() {
    request = {
      payload: {
        id: 2,
        name: "Adam",
        job: "UX Designer"
      },
      query: "?id=2",
      method: "PUT"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 400,
      body: []
    });

    request = {
      payload: {
        id: 2,
        name: "Adam",
        job: "UX Designer"
      },
      query: "",
      method: "PUT"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 400,
      body: []
    });
  });

  it("DELETE Requests", function() {
    request = {
      payload: {},
      query: "?name=Adam",
      method: "DELETE"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 400,
      body: []
    });

    request = {
      payload: {},
      query: "",
      method: "DELETE"
    }

    response = controller.dispatch(request);
    assert.deepEqual(response, {
      status: 400,
      body: []
    });
  });
});

class Solution {
  constructor(dataSample) {
    this.data = dataSample;
  }

  dispatch(obj) {
    const {payload, query, method} = obj;
    if (method === "GET") return this.get(query);
    else if (method === "POST") return this.post(payload);
    else if (method === "PUT") return this.put(payload, query);
    else if (method === "DELETE") return this.delete(query);
  }

  get(query) {
    let response = [ ...this.data ];
    if (query !== "") {
      response = [];
      query = query.match(/\?([a-z]+)\=\'?([\w\d\s]+)\'?/);
      const [property, value] = [query['1'], query['2']];
      for (let i = 0; i < this.data.length; i++) {
        const person = this.data[i];
        if ([value, parseInt(value)].includes(person[property])) {
          response.push(person);
        }
      }
    }

    return {
      status: 200,
      body: [ ...response ],
    };
  }

  post(payload) {
    if (!this.isEmpty(payload)) {
      this.data.push(payload);
      return {
        status: 201,
        body: [payload],
      };
    }

    return {
      status: 400,
      body: [],
    };
  }

  put(payload, query) {
    if (query !== "" && !this.isEmpty(payload)) {
      let found = false;
      query = query.match(/\?([a-z]+)\=\'?([\w\d\s]+)\'?/);
      const [property, value] = [query['1'], query['2']];
      for (let i = 0; i < this.data.length; i++) {
        const person = this.data[i];
        if ([value, parseInt(value)].includes(person[property])) {
          this.data[i] = payload;
          found = true;
          break;
        }
      }

      if (found) {
        return {
          status: 202,
          body: [payload],
        }
      }
    }

    return {
      status: 400,
      body: [],
    };
  }

  delete(query) {
    let response = {
      status: 400,
      body: []
    };

    if (query !== "") {
      query = query.match(/\?([a-z]+)\=\'?([\w\d\s]+)\'?/);
      const [property, value] = [query['1'], query['2']];
      let prevLength = this.data.length;
      this.data = this.data.filter(e => ![value, parseInt(value)].includes(e[property]));
      let diff = prevLength - this.data.length;
      if (diff !== 0) {
        response = { ...response, status: 200 };
      }
    }

    return response;
  }

  isEmpty(obj) {
    return Object.entries(obj).length === 0
  }
}

describe('Random Test Cases', function() {
  const persons = [
    {
      id: 0,
      name: "Michael",
      job: "Lawyer"
    },
    {
      id: 1,
      name: "Mabel",
      job: "Artist"
    },
    {
      id: 2,
      name: "Kelly",
      job: "Nurse"
    },
    {
      id: 3,
      name: "Kelly",
      job: "Impressionist"
    },
    {
      id: 4,
      name: "Ronson",
      job: "Programmer"
    },
    {
      id: 5,
      name: "Gustav",
      job: "Announcer"
    },
    {
      id: 6,
      name: "Jason",
      job: "Blacksmith"
    },
    {
      id: 7,
      name: "Jason",
      job: "Programmer"
    },
    {
      id: 8,
      name: "Adam",
      job: "QA Engineer"
    },
    {
      id: 9,
      name: "Bruce",
      job: "Vigilante"
    }
  ];

  let dataSample = [], aux = [], request, resController, resSolution;
  for (let i = 0; i < 3; i++) {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * 10);
    } while (aux.includes(randomIndex));
    aux.push(randomIndex);
    dataSample.push({ ...persons[randomIndex] });
  }

  const controller = new RestController([...dataSample]);
  const solution = new Solution([...dataSample]);
  it("GET Requests", function() {
    request = {
      payload: {},
      query: "",
      method: "GET"
    }

    resController = controller.dispatch(request);
    resSolution = solution.dispatch(request);
    resController.body = sortById(resController.body);
    resSolution.body = sortById(resSolution.body);
    assert.deepEqual(resController, resSolution);
  });

  it("POST Requests", function() {
    for (let i = 0; i < 3; i++) {
      let randomIndex = 0;
      do {
        randomIndex = Math.floor(Math.random() * 10);
      } while (aux.includes(randomIndex));
      aux.push(randomIndex);
      request = {
        payload: { ...persons[randomIndex] },
        query: "",
        method: "POST"
      }

      resController = controller.dispatch(request);
      resSolution = solution.dispatch(request);
      resController.body = sortById(resController.body);
      resSolution.body = sortById(resSolution.body);
      assert.deepEqual(resController, resSolution);
    }
  });

  it("DELETE Requests", function() {
    for (let i = 0; i < 3; i++) {
      let _id = aux[Math.floor(Math.random() * aux.length)];
      aux.splice(aux.indexOf(_id), 1);
      request = {
        payload: {},
        query: getRandomQuery(_id, persons),
        method: "DELETE"
      }

      resController = controller.dispatch(request);
      resSolution = solution.dispatch(request);
      resController.body = sortById(resController.body);
      resSolution.body = sortById(resSolution.body);
      assert.deepEqual(resController, resSolution);
    }
  });

  it("PUT Requests", function() {
    for (let i = 0; i < 3; i++) {
      let _id = aux[Math.floor(Math.random() * aux.length)];
      let randomIndex = 0;
      do {
        randomIndex = Math.floor(Math.random() * 10);
      } while (aux.includes(randomIndex));
      request = {
        payload: {
          ...persons[randomIndex],
          id: _id
        },
        query: `?id=${_id}`,
        method: "PUT"
      }

      resController = controller.dispatch(request);
      resSolution = solution.dispatch(request);
      resController.body = sortById(resController.body);
      resSolution.body = sortById(resSolution.body);
      assert.deepEqual(resController, resSolution);
    }
  });

  it("GET Requests", function() {
    request = {
      payload: {},
      query: "",
      method: "GET"
    }

    resController = controller.dispatch(request);
    resSolution = solution.dispatch(request);
    resController.body = sortById(resController.body);
    resSolution.body = sortById(resSolution.body);
    assert.deepEqual(resController, resSolution);
  });
});

function getRandomQuery(id, persons) {
  let r = Math.random();
  if (r === 0) return `?id=${id}`;
  else if (r < 0.5) return `?name=${persons[id].name}`;
  else if (r > 0.5) return `?job=${persons[id].job}`;
}

function sortById(array) {
  return array.sort((a, b) => a.id - b.id);
}

describe('Random Edge Cases', function() {
  const persons = [
    {
      id: 1,
      name: "Mabel",
      job: "Artist"
    },
    {
      id: 2,
      name: "Kelly",
      job: "Nurse"
    },
    {
      id: 3,
      name: "Kelly",
      job: "Impressionist"
    }
  ];

  let dataSample = [
    {
      id: 0,
      name: "Michael",
      job: "Lawyer"
    }
  ];

  let request, resController, resSolution;
  const controller = new RestController([...dataSample]);
  const solution = new Solution([...dataSample]);

  it("GET Requests", function() {
    request = {
      payload: {},
      query: "",
      method: "GET"
    }

    resController = controller.dispatch(request);
    resSolution = solution.dispatch(request);
    resController.body = sortById(resController.body);
    resSolution.body = sortById(resSolution.body);
    assert.deepEqual(resController, resSolution);
  });

  it("POST/PUT Requests", function() {
    for (let i = 0; i < 5; i++) {
      request = {
        payload: {},
        query: "?id=1",
        method: (Math.random() > 0.5 ? "POST" : "PUT")
      }

      resController = controller.dispatch(request);
      resSolution = solution.dispatch(request);
      assert.deepEqual(resController, resSolution);
    }
  });

  it("DELETE/PUT Requests", function() {
    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.floor(Math.random() * 3) + 1;
      request = {
        payload: { ...persons[randomIndex] },
        query: `?id=${randomIndex}`,
        method: (Math.random() > 0.5 ? "DELETE" : "PUT")
      }

      resController = controller.dispatch(request);
      resSolution = solution.dispatch(request);
      assert.deepEqual(resController, resSolution);
    }
  });
});
