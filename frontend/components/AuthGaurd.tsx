/**
 * @file AuthGuard.tsx
 * @description Defines a component for guarding routes based on user authentication status.
 */

import React from 'react';
import { useRouter, NextRouter } from 'next/router';

import { useQuery } from '@apollo/client';

import { useUser } from '@/contexts/UserContext';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';

/**
 * @function AuthGuard
 * @description A component that guards routes based on user authentication status.
 * @param children - The child components to be rendered if the user is authenticated.
 * @returns The child components if the user is authenticated, otherwise redirects to the login page.
 */
export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { data, loading } = useQuery(GET_CURRENT_USER);
	const user = useUser() || {};
	const { isLoggedIn, email, isActive } = user;
	const router: NextRouter = useRouter();

	if (loading) {
		// Display a loading indicator or a fallback component while data is being fetched
		return <div>Loading Auth guard...</div>;
	}

	if (!data || !data.getCurrentUser || !isLoggedIn || !email || !isActive) {
		// Redirect to the login page if user data is not available or user is not authenticated
		router.push('/login').catch((error) => {
			console.error('Error during navigation:', error);
		});
		return null;
	}

	return <>{children}</>;
};