class Fetcher {

	fetch() {
		console.log("Fetching...");
	}

}

exports.Fetcher = Fetcher;

/*


Functions:

- Given a list of dates
- Build a request
- Execute the request
- Return the data

Objects:

RequestBuilder
e.g buildUrl - Given a date, generate query string (return url)

RequestExecuter
- Reads in RequestBuilder object, makes request, returns data
- Can use promise library
- Get a good http library with promises (or q

*/