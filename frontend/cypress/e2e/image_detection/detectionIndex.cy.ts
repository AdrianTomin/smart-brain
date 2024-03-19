/**
 * @file detectionIndex.cy.ts
 * @description Cypress test cases for uploading an image and detecting its contents.
 */

describe('Upload an image and detect the contents', () => {
	it('should successfully analyze the contents of an uploaded image', () => {

		// Visit the login page
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Login with valid credentials
		cy.get('[data-cy="username-input-field"]')
			.click()
			.type('test@gmail.com');

		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="login-button"]')
			.click();

		// Ensure redirection to the application page after successful login
		cy.location('pathname', {
			timeout: 60000
		}).should('eq', '/application');

		// Upload an image for detection
		cy.get('[data-cy="image-form"]')
			.click()
			.type('https://a.travel-assets.com/findyours-php/viewfinder/images/res70/516000/516282-whyte-ave.jpg')

		// Initiate detection process
		cy.get('[data-cy="image-detection-button"]')
			.click()

		// Confirm successful detection results page
		cy.contains('Your Results')
	});

	it('should error on an invalid input field value', () => {

		// Repeat login process
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});


		cy.get('[data-cy="username-input-field"]')
			.click()
			.type('test@gmail.com');

		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="login-button"]')
			.click();

		cy.location('pathname', {
			timeout: 60000
		}).should('eq', '/application');

		// Attempt detection without selecting an image
		cy.get('[data-cy="image-detection-button"]')
			.click()

		// Confirm error message for no image selected
		cy.contains('Invalid file format. Please try again.')

		cy.get('[data-cy="image-form"]')
			.click()
			.type('invalid_pic.txt')

		cy.get('[data-cy="image-detection-button"]')
			.click()

		// Confirm error message for invalid file format
		cy.contains('Invalid file format. Please try again.')
	});
})