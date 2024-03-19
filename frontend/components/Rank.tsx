/**
 * @file Rank.tsx
 * @description Component for displaying user rank and number of analyzed images.
 */

import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { useUser } from '@/contexts/UserContext';

/**
 * @function Rank
 * @description Component for displaying user rank and number of analyzed images.
 * @returns {React.ReactElement} A Rank component.
 */
export const Rank = (): React.ReactElement => {

	const { firstName, entries } = useUser();
	const [currentEntries, setCurrentEntries] = useState<number | undefined>(entries);

	useEffect(() => {
		setCurrentEntries(entries);
	}, [entries]);

	return (
		<div className="flex flex-col items-center mb-3">
			<Typography
				sx={{
					color: 'rgb(209, 213, 219)',
				}}
				variant={'h5'}
				className={'text-xl md:text-2xl font-bold text-center'}
			>
				{`${firstName}, you have analyzed...`}
			</Typography>
			<Typography
				sx={{
					color: 'rgb(209, 213, 219)',
				}}
				variant={'h5'}
				className={'text-xl md:text-2xl font-bold text-center'}
			>
				{`${currentEntries} images`}
			</Typography>
		</div>
	);
};