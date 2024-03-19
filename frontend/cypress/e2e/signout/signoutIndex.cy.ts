/**
 * @file signoutIndex.cy.ts
 * @description Cypress test case for allowing a user to sign out of their account.
 */

describe('Allow a user to sign-out of their account', () => {
	it('should allow a user to sign-out', () => {
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
			timeout: 60000,
		}).should('eq', '/application');

		// Click on the menu button
		cy.get('[data-cy="menu-nav"]')
			.click();

		// Click on the logout button
		cy.get('[data-cy="logout"]')
			.click();

		// Ensure redirection to the login page after logout
		cy.location('pathname', {
			timeout: 60000,
		}).should('eq', '/login');
	});
});
