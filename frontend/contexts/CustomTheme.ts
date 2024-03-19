/**
 * @file CustomTheme.ts
 * @description Defines custom MUI theme overrides.
 */

import { createTheme, Theme } from '@mui/material/styles';

/**
 * @function CustomTheme
 * @description Creates a custom MUI theme based on the outer theme.
 * @param {Theme} outerTheme - The outer theme to inherit from.
 * @returns {Theme} The customized MUI theme.
 */
export const CustomTheme = (outerTheme: Theme): Theme =>
	createTheme({
		palette: {
			mode: outerTheme.palette.mode,
		},
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						'--TextField-brandBorderFocusedColor': 'rgb(164, 110, 231)',
						'& label': {
							color: 'rgb(209, 213, 219)',
						},
						input: {
							'&:-webkit-autofill': {
								transitionDelay: '9999s',
								transitionProperty: 'background-color, color',
							},
						},
					},
				},
			},
			MuiFilledInput: {
				styleOverrides: {
					root: {
						'&::before, &::after': {
							borderBottom: '2px solid var(--TextField-brandBorderColor)',
						},
						'&:hover:not(.Mui-disabled, .Mui-error):before': {
							borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
						},
						'&.Mui-focused:after': {
							borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
						},
					},
				},
			},
			MuiFormLabel: { // Add style overrides for MuiFormLabel
				styleOverrides: {
					root: {
						'&.Mui-error': {
							color: 'rgb(231, 110, 110)', // Set color for error state
						},
					},
					asterisk: {
						'&.Mui-error': {
							color: 'rgb(231, 110, 110)', // Set color for error state and asterisk
						},
					},
				},
			},
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						'&.Mui-error': {
							color: 'rgb(231, 110, 110)',
						}
					}
				}
			}
		},
	});