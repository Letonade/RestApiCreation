Description:

In this kata you are going to mimic the behaviour of a backend framework by creating a TestController class.

The class can be constructed in any way you like as long as it meets the following criteria:

    The class must have a constructor that receives an array of objects; the array will act as the data source from which the class will perform the operations, it can be empty or filled. The structure of the objects it's described below.

    The class must have a dispatch method that receives an object containing the information about the request. The object will always have the same structure:

{
  payload: {
    id: 1,
    name: "Ada",
    job: "Programmer"
  },
  query: "?id=1"|"?name=Ada"|"?job=Programmer",
  method: "GET"|"POST"|"PUT"|"DELETE"
}

payload is an object representing a person that can be either empty or filled. It holds the data that needs to be saved (in the case of a POST request), or updated (in the case of a PUT request).

query is a query string. It will act as a filter (in the case of a GET request), or as a condition that needs to be fulfilled (in the case of a PUT or DELETE request)

method is a string with the name of the HTTP method.

    The dispatch method must return the proper response for each request in the form of a response object with the following structure:

{
  status: 200|201|202|400,
  body: []
}

If it was a GET request, the method must return a status code of 200 alongside an array of objects that matches the criteria passed in the query property, if no element matched, return an empty array. If the query string is empty, however, return ALL the objects.

If it was a DELETE request, it must return the response object with a status code of 200 and an empty body array.

If it was a POST request, it must return the response object with a status code of 201 and the payload object attached to the body array.

If it was a PUT request, it must return the response object with a status code of 202 and the payload object attached to the body array.

    If one of the following errors occurs, return the response object with a status of 400 (bad request) and an empty body array:

A DELETE request was made but no element matched the criteria or the query string was empty.

A POST or a PUT request was made but the payload object was empty.

A PUT request was made but there is no item matching the id passed in the query or the query string was empty.
Constraints and Assumptions

    Objects send in the payload property are always going to be valid
    The id of each object (person) is unique
    The test cases are made such that only one property is evaluated in the query string at a time

