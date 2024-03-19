/**
 * @file Navigation.tsx
 * @description Component for rendering the navigation menu with user account options.
 */

import React, { useState } from 'react';
import { useRouter, NextRouter } from 'next/router';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Menu, MenuItem } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';

import { useUser } from '@/contexts/UserContext';
import { USER_LOGOUT_MUTATION } from '@/graphql/mutations/UserLogout';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { AccountModal } from '@/components/AccountModal';
import styles from '../styles/component-styles/Navigation.module.scss';

/**
 * @function Navigation
 * @description Component for rendering the navigation menu with user account options.
 * @returns {React.ReactElement} A Navigation component.
 */
export const Navigation = (): React.ReactElement => {

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const open = Boolean(anchorEl);

	const router: NextRouter = useRouter();

	const [logout] = useMutation(USER_LOGOUT_MUTATION, {
		update: (cache, {
			data: { logout },
		}) => {
			cache.writeQuery({
				query: GET_CURRENT_USER,
				data: {
					getCurrentUser: logout,
				},
			});
		},
	});

	const { refetch: refetchCurrentUser } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'network-only', // Ensure we always fetch from the network
	});

	const { email, firstName } = useUser();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (): void => {
		setAnchorEl(null);
	};

	const handleAccountModal = () => {
		setIsModalOpen(true);
		handleClose();
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleLogout = async (): Promise<void> => {
		await logout({
			variables: {
				email,
			},
		});
		await refetchCurrentUser();
		await router.push('/');
	};

	return (
		<nav
			className={styles.navigation}
			data-cy="menu-nav"
		>
			<Button
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={{
					color: 'rgb(40,40,50)',
				}}
			>
				<AccountCircleIcon sx={{
					fontSize: 50,
					color: 'rgb(209, 213, 219)',
				}} />
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem disabled={true}>
					{`Welcome ${firstName}`}
				</MenuItem>
				<MenuItem
					onClick={handleAccountModal}
					data-cy="account"
				>
					{'My Account'}
				</MenuItem>
				<MenuItem
					onClick={handleLogout}
					data-cy="logout"
				>
					{'Logout'}
				</MenuItem>
			</Menu>
			<AccountModal
				open={isModalOpen}
				onClose={handleCloseModal}
			/>
		</nav>
	);
};