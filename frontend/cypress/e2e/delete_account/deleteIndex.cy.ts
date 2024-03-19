/**
 * @file deleteIndex.cy.ts
 * @description Cypress test case for deleting a user account.
 */

describe('Delete user account', () => {
	it(`should delete the user's account`, () => {

		// Visit sign-up page
		cy.visit('http://localhost:3000/sign-up', {
			timeout: 60000,
			failOnStatusCode: true,
		});

		// Fill sign-up form
		cy.get('[data-cy="first-name-input-field"]')
			.click()
			.type('User');

		cy.get('[data-cy="email-input-field"]')
			.click()
			.type('deletemyaccount@gmail.com');

		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="confirm-password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="sign-up-button"]')
			.click();

		// Ensure redirection to the login page after successful sign-up
		cy.location('pathname', {
			timeout: 60000,
		}).should('eq', '/login');

		// Login with created account
		cy.get('[data-cy="username-input-field"]')
			.click()
			.type('deletemyaccount@gmail.com');

		cy.get('[data-cy="password-input-field"]')
			.click()
			.type('Password123@');

		cy.get('[data-cy="login-button"]')
			.click();

		// Ensure redirection to the application page after successful login
		cy.location('pathname', {
			timeout: 60000,
		}).should('eq', '/application');

		// Open account menu
		cy.get('[data-cy="menu-nav"]')
			.click();

		// Navigate to account settings
		cy.get('[data-cy="account"]')
			.click();

		// Ensure delete account button is disabled
		cy.get('[data-cy="delete-account-button"]')
			.should('be.disabled');

		// Enter DELETE to enable delete account button
		cy.get('[data-cy="delete-account-input-field"]')
			.click()
			.type('DELETE');

		// Ensure delete account button is enabled
		cy.get('[data-cy="delete-account-button"]')
			.should('be.enabled')
			.click();

		// Confirm account deletion success message
		cy.contains('Your account has been deleted successfully', {
			timeout: 60000,
		});
	});
});