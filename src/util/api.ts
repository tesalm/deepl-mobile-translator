import { API_URL, API_KEY } from "@env";

interface Response {
  translations: Array<Translation>;
  message?: string;
}

interface Translation {
  detected_source_language: string;
  text: string;
}

const deepL_TranslationRequest = async (
  text: string,
  target: string,
  source?: string,
): Promise<Response> => {
  try {
    const body = `auth_key=${API_KEY}&text=${text}&target_lang=${target}`;
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: source ? `${body}&source_lang=${source}` : body
    });

    if (!response.ok)
      throw deeplErrorHandler(response.status);

    const responseJson = await response.json();
    //console.log(responseJson);
    return responseJson;
  } catch (error: any) {
    //console.log(error);
    throw error;
  }
};

const google_TranslationRequest = async (
  text: string,
  target: string,
  source?: string,
): Promise<Response> => {
  try {
    const api = 'GOOGLE_API_URL';
    const response = await fetch(api, {method: 'GET'});
    const responseJson = await response.json();
    //console.log(responseJson);
    return responseJson;
  } catch (error: any) {
    throw error;
  }
};

const deeplErrorHandler = (code: number) => {
  switch (code) {
    case 400:
      return {message: "Bad request. Please check your parameters."};
    case 403:
      return {message: "Authorization failed. Please supply a valid auth_key parameter."};
    case 404:
      return {message: "The requested resource could not be found."};
    case 413:
      return {message: "The request size exceeds the limit."};
    case 429: case 529:
      return {message: "Too many requests. Please wait and resend your request."};
    case 456:
      return {message: "Quota exceeded. The character limit has been reached."};
    case 503:
      return {message: "Resource currently unavailable. Try again later."};
    default:
      return {message: "Internal server error"};
  }
};


export { deepL_TranslationRequest };