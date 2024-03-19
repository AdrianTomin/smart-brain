/**
 * @file signupIndex.cy.ts
 * @description Cypress test cases for user signup functionality.
 */

describe('New user signup', () => {

	// Test case: Check if the signup page loads correctly
	it('should load correctly', () => {
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});
	});

	// Test case: Attempt to sign up with valid input data
	it('should allow a user to sign up successfully', () => {
		const randFloat = Math.random();
		const randInt = randFloat.toFixed();
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid input data
		cy.get('[data-cy="first-name-input-field"]')
			.click()
			.type('User');

		cy.get('[data-cy="email-input-field"]')
			.click()
			.type(`user${randInt}@gmail.com`);

		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="confirm-password-input-field"]')
			.click()
			.type('Password123@');

		// Click sign up button
		cy.get('[data-cy="sign-up-button"]')
			.click();

		// Ensure redirection to the login page after successful signup
		cy.location('pathname')
			.should('eq', '/login');
	});

	// Test case: Ensure error on empty first name field
	it('should error on empty first name field', () => {
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Leave first name field empty

		// Enter valid email
		cy.get('[data-cy="email-input-field"]')
			.click()
			.type('user@gmail.com');

		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="confirm-password-input-field"]')
			.click()
			.type('Password123@');

		// Confirm sign-up button is disabled
		cy.get('[data-cy="sign-up-button"]')
			.should('be.disabled');

		// Ensure redirection back to sign-up page
		cy.location('pathname')
			.should('eq', '/sign-up');
	});

	// Test case: Ensure error on empty email field
	it('should error on empty email field', () => {
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid first name
		cy.get('[data-cy="first-name-input-field"]')
			.click()
			.type('User');

		// Leave email field empty

		// Enter valid password
		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="confirm-password-input-field"]')
			.click()
			.type('Password123@');

		// Confirm sign-up button is disabled
		cy.get('[data-cy="sign-up-button"]')
			.should('be.disabled');

		// Ensure redirection back to sign-up page
		cy.location('pathname')
			.should('eq', '/sign-up');
	});

	// Test case: Ensure error on empty password field
	it('should error on empty password field', () => {
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid first name
		cy.get('[data-cy="first-name-input-field"]')
			.click()
			.type('User');

		// Enter valid email
		cy.get('[data-cy="email-input-field"]')
			.click()
			.type('user@gmail.com');

		// Leave password field empty

		// Confirm sign-up button is disabled
		cy.get('[data-cy="sign-up-button"]')
			.should('be.disabled');

		// Ensure redirection back to sign-up page
		cy.location('pathname')
			.should('eq', '/sign-up');
	});

	// Test case: Ensure error message if password does not meet requirements
	it('should display if password does not meet requirements', () => {
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid first name
		cy.get('[data-cy="first-name-input-field"]')
			.click()
			.type('User');

		// Enter valid email
		cy.get('[data-cy="email-input-field"]')
			.click()
			.type('user@gmail.com');

		// Enter valid password
		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		// Enter invalid confirmation password
		cy.get('[data-cy="confirm-password-input-field"]')
			.click()
			.type('Password123@f');

		// Confirm error message for passwords not matching
		cy.contains('Passwords do not match');

		// Confirm sign-up button is disabled
		cy.get('[data-cy="sign-up-button"]')
			.should('be.disabled');

	});

	// Test case: Ensure error message if passwords do not match
	it('should display if passwords do not match', () => {
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid first name
		cy.get('[data-cy="first-name-input-field"]')
			.click()
			.type('User');

		// Enter valid email
		cy.get('[data-cy="email-input-field"]')
			.click()
			.type('user@gmail.com');

		// Enter valid password
		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		// Enter invalid confirmation password
		cy.get('[data-cy="confirm-password-input-field"]')
			.click()
			.type('Password123@!');

		// Confirm error message for passwords not matching
		cy.contains('Passwords do not match');

		// Ensure redirection back to sign-up page
		cy.location('pathname')
			.should('eq', '/sign-up');
	});

	// Test case: Ensure error if account with email already exists
	it('should error if account with email already exists', () => {
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid first name
		cy.get('[data-cy="first-name-input-field"]') // First name input field
			.click()
			.type('User');

		// Enter existing email
		cy.get('[data-cy="email-input-field"]')
			.click()
			.type('user@gmail.com');

		// Enter valid password
		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		// Enter valid confirmation password
		cy.get('[data-cy="confirm-password-input-field"]')
			.click()
			.type('Password123@');

		// Click sign-up button
		cy.get('[data-cy="sign-up-button"]')
			.click();

		// Confirm error message for existing account
		cy.contains('An account with this email already exists.');

		// Ensure redirection back to sign-up page
		cy.location('pathname')
			.should('eq', '/sign-up');
	});
});
