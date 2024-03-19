/**
 * @file DeleteAccount.tsx
 * @description This component provides functionality for users to delete their account by typing "DELETE" and clicking a button.
 */

import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';

import { Button, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import { useUser } from '@/contexts/UserContext';
import { DELETE_USER_ACCOUNT_MUTATION } from '@/graphql/mutations/DeleteUserAccount';
import { CustomTheme } from '@/contexts/CustomTheme';

/**
 * @function DeleteAccount
 * @description Component for deleting user account.
 * @returns {React.ReactElement} A DeleteAccount component.
 */
export const DeleteAccount = (): React.ReactElement => {

	const { email } = useUser();
	const [inputValue, setInputValue] = useState<string>('');
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

	const router: NextRouter = useRouter();

	const outerTheme = useTheme();

	const [deleteUserAccountMutation] = useMutation(DELETE_USER_ACCOUNT_MUTATION);

	/**
	 * @function onInputChange
	 * @description Handles the change event for the input field.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
	 */
	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;
		setInputValue(value);
		setIsButtonDisabled(value !== 'DELETE');
	};

	/**
	 * @function onDeleteAccount
	 * @description Deletes the user account.
	 */
	const onDeleteAccount = async (): Promise<void> => {
		try {
			await deleteUserAccountMutation({ variables: { email } });
			await router.push({
				pathname: '/login',
				query: {
					successMessage: 'Your account has been deleted successfully.',
				},
			});
		} catch (error) {
			console.error('Error deleting user account:', error);
		}
	};

	return (
		<div className={'w-full md:w-500 mx-auto md:max-w-full flex flex-col items-center'}>
			<div className={'flex flex-col items-center mb-10'}>
				<Typography
					variant={'h6'}
					sx={{
						color: 'rgb(209, 213, 219)',
					}}
				>
					{'Delete Account'}
				</Typography>
				<Typography
					variant={'body2'}
					sx={{
						color: 'rgb(209, 213, 219)',
					}}
					className={'text-center'}
				>
					{'To delete your account, type DELETE'}
				</Typography>
			</div>
			<div className="mx-4 md:mx-20 w-full">
				<ThemeProvider theme={CustomTheme(outerTheme)}>
					<TextField
						data-cy="delete-account-input-field"
						sx={{
							height: '48px',
							input: {
								color: 'rgb(209, 213, 219)',
							},
							'& label.Mui-focused': {
								color: 'rgb(209, 213, 219)',
							},
						}}
						fullWidth={true}
						onChange={onInputChange}
						variant={'filled'}
					/>
				</ThemeProvider>
			</div>
			<div className={'flex justify-center mt-6 w-full'}>
				<Button
					data-cy="delete-account-button"
					variant={'contained'}
					disabled={isButtonDisabled}
					onClick={onDeleteAccount}
					className={'login-signup-button'}
					fullWidth={true}
				>
					{'Delete Account'}
				</Button>
			</div>
		</div>
	);
};