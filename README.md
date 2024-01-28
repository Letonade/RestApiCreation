## Description:
#### # @Letonade (Originally the kata needed a TestController (I renamed it RestController))
#### # @Letonade I'm using Jest for the test with a classic `npx jest`
In this kata you are going to mimic the behaviour of a backend framework by creating a RestController class.

The class can be constructed in any way you like as long as it meets the following criteria:

- The class must have a constructor that receives an array of objects; the array will act as the data source from which the class will perform the operations, it can be empty or filled. The structure of the objects it's described below.

- The class must have a <code>dispatch</code> method that receives an object containing the information about the request. The object will always have the same structure:

      {
        payload: {
          id: 1,
          name: "Ada",
          job: "Programmer"
        },
        query: "?id=1"|"?name=Ada"|"?job=Programmer",
        method: "GET"|"POST"|"PUT"|"DELETE"
      }

<code>payload</code> is an object representing a person that can be either empty or filled. It holds the data that needs to be saved (in the case of a <code>POST</code> request), or updated (in the case of a <code>PUT</code> request).

<code>query</code> is a query string. It will act as a filter (in the case of a <code>GET</code> request), or as a condition that needs to be fulfilled (in the case of a <code>PUT</code> or <code>DELETE</code> request)

<code>method</code> is a string with the name of the HTTP method.

- The <code>dispatch</code> method must return the proper response for each request in the form of a response object with the following structure:

      {
        status: 200|201|202|400,
        body: []
      }

If it was a <code>GET</code> request, the method must return a status code of 200 alongside an array of objects that matches the criteria passed in the query property, if no element matched, return an empty array. If the query string is empty, however, return ALL the objects.

If it was a <code>DELETE</code> request, it must return the <code>response</code> object with a status code of <code>200</code> and an empty body array.

If it was a <code>POST</code> request, it must return the <code>response</code> object with a status code of <code>201</code> and the <code>payload</code> object attached to the body array.

If it was a <code>PUT</code> request, it must return the <code>response</code> object with a status code of <code>202</code> and the <code>payload</code> object attached to the body array.

- If one of the following errors occurs, return the <code>response</code> object with a status of <code>400</code> (bad request) and an empty body array:

A <code>DELETE</code> request was made but no element matched the criteria or the query string was empty.

A <code>POST</code> or a <code>PUT</code> request was made but the payload object was empty.

A <code>PUT</code> request was made but there is no item matching the id passed in the <code>query</code> or the query string was empty.

### Constraints and Assumptions

- Objects send in the payload property are always going to be valid

- The id of each object (person) is unique

- The test cases are made such that only one property is evaluated in the query string at a time

