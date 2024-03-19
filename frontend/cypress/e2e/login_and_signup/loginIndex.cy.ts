/**
 * @file loginIndex.cy.ts
 * @description Cypress test cases for user login and signup functionality.
 */

describe('Email/Password login_and_signup', () => {

	// Test case: Check if the login page loads correctly
	it('should load correctly', () => {
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});
	});

	// Test case: Check if the login page loads correctly
	it('should allow a user to login correctly', () => {
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid credentials
		cy.get('[data-cy="username-input-field"]')
			.click()
			.type('test@gmail.com');

		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		// Click login button
		cy.get('[data-cy="login-button"]')
			.click();

		// Ensure redirection to the application page after successful login
		cy.location('pathname')
			.should('eq', '/application');
	});

	// Test case: Attempt to log in with an invalid email
	it('should error on invalid email', () => {
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter invalid email
		cy.get('[data-cy="username-input-field"]')
			.click()
			.type('test@gmail.comm');

		// Enter valid password
		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		// Click login button
		cy.get('[data-cy="login-button"]')
			.click();

		// Confirm error message for invalid email
		cy.contains('Incorrect Credentials');
	});

	// Test case: Attempt to log in with an invalid password
	it('should error on invalid password', () => {
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid email
		cy.get('[data-cy="username-input-field"]')
			.click()
			.type('test@gmail.com');

		// Enter invalid password
		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@1');

		// Click login button
		cy.get('[data-cy="login-button"]')
			.click();

		// Confirm error message for invalid password
		cy.contains('Incorrect Credentials');
	});

	// Test case: Attempt to log in with an empty email field
	it('should error on empty email', () => {
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Leave email field empty

		// Enter valid password
		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		// Click login button
		cy.get('[data-cy="login-button"]')
			.click();

		// Ensure redirection back to login page
		cy.location('pathname')
			.should('eq', '/login');
	});

	// Test case: Attempt to log in with an empty password field
	it('should error on empty password', () => {
		cy.visit('http://localhost:3000/login', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Enter valid email
		cy.get('[data-cy="username-input-field"]')
			.click()
			.type('test@gmail.com');

		// Leave password field empty


		// Click login button
		cy.get('[data-cy="login-button"]')
			.click();

		// Ensure redirection back to login page
		cy.location('pathname')
			.should('eq', '/login');
	});

	// Test case: Ensure access to application page is denied if not logged in
	it('should not allow user to access /application if not logged in', () => {
		cy.visit('http://localhost:3000/application', {
			timeout: 60000,
			failOnStatusCode: false,
		});
		cy.location('pathname')
			.should('eq', '/login');
	});
});