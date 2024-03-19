/**
 * @file index.tsx
 * @description Component for the home page.
 */

import React, { useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';

import CircularProgress from '@mui/material/CircularProgress';

import { useUser } from '@/contexts/UserContext';

/**
 * Component for the home page.
 * @returns {React.ReactElement} The home page component.
 */
const Home = (): React.ReactElement => {
	const router: NextRouter = useRouter();
	const currentUser = useUser();

	useEffect(() => {
		const redirectUser = async () => {
			if (currentUser && currentUser.isLoggedIn && currentUser.isActive) {
				await router.push('/application');
			} else {
				await router.push('login');
			}
		};

		redirectUser();
	}, [currentUser]);

	return (
		<div className={'flex justify-center items-center h-screen'}>
			<CircularProgress sx={{
				color: 'rgb(164, 110, 231)',
			}} />
		</div>
	);
};

export default Home;