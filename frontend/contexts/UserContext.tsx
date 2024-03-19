/**
 * @file UserContext.tsx
 * @description Provides a context for managing user data.
 */

import React, {
	createContext,
	ReactNode,
	useContext,
} from 'react';

import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { UserInterface } from '../../backend/database/models/User';
import CircularProgress from '@mui/material/CircularProgress';

// Define the context for user data
const UserContext = createContext<Partial<UserInterface>>({});

/**
 * @function useUser
 * @description Custom hook to consume the user context.
 * @returns {Partial<UserInterface>} The user context.
 */
export const useUser = (): Partial<UserInterface> => {
	return useContext(UserContext);
};


/**
 * @interface UserProviderProps
 * @description Represents the props for the UserContext component.
 * @property {ReactNode} children The children within the UserContext component to be rendered.
 */
interface UserProviderProps {
	children: ReactNode;
}

/**
 * @function UserProvider
 * @description Provides the user context to its children.
 * @param {UserProviderProps} props - The props for the UserProvider component.
 * @returns {React.ReactElement} A UserProvider component.
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps): React.ReactElement => {
	const { loading, error, data } = useQuery(GET_CURRENT_USER);

	// Handle error in fetching user data
	if (error) {
		return (
			<div className="flex justify-center items-center h-screen bg-red-100">
				<div className="p-4 rounded-md bg-red-500 text-white">
					<p>Error: {error.message}</p>
				</div>
			</div>
		);
	}

	// Render loading indicator while fetching user data
	return (
		<UserContext.Provider value={data ? data.getCurrentUser : {}}>
			{loading ? (
				<div className={'flex justify-center items-center h-screen'}>
					<CircularProgress sx={{
						color: 'rgb(164, 110, 231)',
					}} />
				</div>
			) : (
				children
			)}
		</UserContext.Provider>
	);
};