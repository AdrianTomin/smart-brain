/**
 * @file clarifaiService.ts
 * @description Provides functions to interact with the Clarifai API for image recognition.
 */

/**
 * @constant {string} PAT - The Personal Access Token for accessing the Clarifai API.
 */
const PAT = process.env.NEXT_PUBLIC_PAT as string;

/**
 * @constant {string} USER_ID - The User ID for the Clarifai application.
 */
const USER_ID = process.env.NEXT_PUBLIC_USER_ID as string;

/**
 * @constant {string} APP_ID - The Application ID for the Clarifai application.
 */
const APP_ID = process.env.NEXT_PUBLIC_APP_ID as string;

/**
 * @constant {string} MODEL_ID - The Model ID for the trained model in Clarifai.
 */
const MODEL_ID = process.env.NEXT_PUBLIC_MODEL_ID as string;

/**
 * @constant {string} MODEL_VERSION_ID - The Version ID for the trained model in Clarifai.
 */
const MODEL_VERSION_ID = process.env.NEXT_PUBLIC_MODEL_VERSION_ID as string;

/**
 * @interface APIResponse
 * @description Represents the structure of the response from the Clarifai API.
 */
export interface APIResponse {
	id: string;
	name: string;
	value: number;
}

/**
 * @function fetchData
 * @description Fetches data from the Clarifai API for the provided image URL.
 * @param imgURL - The URL of the image to analyze.
 * @returns A promise resolving to an array of APIResponse objects representing the detected concepts.
 */
export const fetchData = async (imgURL: string): Promise<APIResponse[] | undefined> => {
	const raw: string = JSON.stringify({
		'user_app_id': {
			'user_id': USER_ID,
			'app_id': APP_ID,
		},
		'inputs': [
			{
				'data': {
					'image': {
						'url': imgURL,
					},
				},
			},
		],
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Key ' + PAT,
		},
		body: raw,
	};
	try {
		const response: Response = await fetch(
			`https://api.clarifai.com/v2/models/
			${MODEL_ID}
			/versions/
			${MODEL_VERSION_ID}
			/outputs`,
			requestOptions,
		);
		const data = await response.json();
		const conceptsArray = data.outputs[0].data.concepts;
		return conceptsArray.map(({ id, name, value }: APIResponse) => ({ id, name, value }));
	} catch (error) {
		console.error(`Clarifai API Error ${error}`);
		throw new Error('Clarifai API Error');
	}
};