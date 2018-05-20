// @flow

/**
* Returns the response or throws an error if there was a problem with the request.
*
* @param response object The response object from the fetch request.
* @return response object The response object from the fetch request if not an error
* @throws errro An error to catch with the status text as the error message.
*/
export function handleErrors(response: Object) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

/**
* Returns an object of request options.
*
* @return object An init object for the fetch request.
*/
export default function getInitOpts(requestType: string) {
  switch (requestType) {
    case 'json':
      return {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

    default:
      return {};
  }
}
