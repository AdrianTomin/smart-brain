/**
 * @file ImageLinkForm.tsx
 * @description Component for entering an image URL and initiating image detection.
 */

import React from 'react';
import { TextField, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { ThemeProvider, useTheme } from '@mui/material/styles';
import { CustomTheme } from '@/contexts/CustomTheme';

/**
 * @interface ImageLinkFormProps
 * @description Props interface for the ImageLinkForm component.
 * @property {Function} handleOnChange - Function to handle input change event.
 * @property {Function} handleDetectClick - Function to handle click event for image detection.
 */
interface ImageLinkFormProps {
	handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleDetectClick: () => Promise<void>;
}

/**
 * @function ImageLinkForm
 * @description Component for entering an image URL and initiating image detection.
 * @param {ImageLinkFormProps} props - Props for the ImageLinkForm component.
 * @returns {React.ReactElement} An ImageLinkForm component.
 */
export const ImageLinkForm = ({ handleOnChange, handleDetectClick }: ImageLinkFormProps): React.ReactElement => {

	const outerTheme = useTheme();
	return (
		<>
			<div className="flex flex-col items-center w-8/12 md:w-6/12 lg:w-4/12">
				<Typography
					sx={{
						color: 'rgb(209, 213, 219)',
					}}
					className={'text-center'}
				>
					<i>
						{'This Magic Brain Will Identify The Content Of Pictures'}
					</i>
				</Typography>
				<Typography
					sx={{
						color: 'rgb(110, 231, 183)',
					}}
					className={'text-center mt-3'}
					variant={'body1'}
				>
					<i>
						{'Note: URL must end with .jpg'}
					</i>
				</Typography>
				<div className="flex flex-col justify-center items-center w-full mt-4">
					<ThemeProvider theme={CustomTheme(outerTheme)}>
						<TextField
							data-cy="image-form"
							sx={{
								height: '48px',
								input: {
									color: 'rgb(209, 213, 219)',
								},
								'& label.Mui-focused': {
									color: 'rgb(209, 213, 219)',
								},
							}}
							label="Enter Image URL"
							variant="filled"
							fullWidth={true}
							InputProps={{ readOnly: false }}
							onChange={handleOnChange}
						/>
					</ThemeProvider>
					<div className="mt-10 w-full md:w-8/12 lg:w-6/12">
						<Button
							data-cy="image-detection-button"
							sx={{
								height: '48px',
								width: '100%',
							}}
							variant={'contained'}
							endIcon={<SearchIcon />}
							className={'image-form-button'}
							onClick={handleDetectClick}
						>
							{'Detect'}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};