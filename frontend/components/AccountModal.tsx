/**
 * @file AccountModal.tsx
 * @description Defines a modal component for account settings.
 */

import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	Typography,
} from '@mui/material';

import { DeleteAccount } from './DeleteAccount';

/**
 * @function BootstrapDialog
 * @description Customized dialog component for the modal.
 * @param props - Props for the dialog component.
 * @returns A Bootstrap styled Dialog component.
 */
const BootstrapDialog = (props: any) => (
	<Dialog
		{...props}
		sx={{
			'& .MuiDialogContent-root': {
				paddingLeft: 5,
				paddingRight: 5,
				paddingTop: 5,
				paddingBottom: 5,
				backgroundColor: 'rgb(40,40,50)',
				color: 'rgb(209, 213, 219)',
			},
			'& .MuiDialogActions-root': {
				padding: 1,
			},
		}}
	/>
);

/**
 * @interface AccountModalProps
 * @description Represents the props for the AccountModal component.
 * @property {boolean} open Determines whether the modal is open or closed.
 * @property {Function} onClose Callback function to handle the close event of the modal.
 */
interface AccountModalProps {
	open: boolean;
	onClose: () => void;
}

/**
 * @function AccountModal
 * @description A modal component for account settings.
 * @param open - Determines whether the modal is open or closed.
 * @param onClose - Callback function to handle the close event of the modal.
 * @returns A modal component for account settings.
 */
export const AccountModal = ({ open, onClose }: AccountModalProps): React.ReactElement => {

	/**
	 * @function handleClose
	 * @description Closes the modal.
	 */
	const handleClose = (): void => {
		onClose();
	};

	return (
		<BootstrapDialog
			onClose={handleClose}
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				sx={{
					'backgroundColor': 'rgb(40,40,50)',
					'color': 'rgb(209, 213, 219)',
				}}
			>
				{'Account Settings'}
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent dividers>
				<Typography gutterBottom>
					<DeleteAccount />
				</Typography>
			</DialogContent>
		</BootstrapDialog>
	);
};