/**
 * @file sign-up.tsx
 * @description Component for user signup.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	InputAdornment,
	LinearProgress,
	TextField,
	Typography,
	CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useMutation, useQuery } from '@apollo/client';

import { USER_SIGNUP_MUTATION } from '@/graphql/mutations/UserSignup';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { ParticleBG } from '@/components/ParticleBG';
import { CustomTheme } from '@/contexts/CustomTheme';
import { Logo } from '@/components/Logo';
import styles from '@/styles/Signup.module.scss';

/**
 * Component for user sign-up.
 * @returns {React.ReactElement} The sign-up component.
 */
const SignUp = (): React.ReactElement => {

	const useMemoizedParticleBG = () => {
		return useMemo(() => <ParticleBG />, []);
	};

	const MemoizedParticleBG = useMemoizedParticleBG();

	const router: NextRouter = useRouter();

	const [signup] = useMutation(USER_SIGNUP_MUTATION, {
		update: (cache, {
			data: {
				signup,
			},
		}) => cache.writeQuery({
			query: GET_CURRENT_USER,
			data: {
				getCurrentUser: signup,
			},
		}),
	});

	const [firstName, setFirstName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [checkboxText, setCheckboxText] = useState<string>('Show Password');
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);
	const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState<boolean>(true);
	const [lowercaseChecked, setLowercaseChecked] = useState<boolean>(false);
	const [uppercaseChecked, setUppercaseChecked] = useState<boolean>(false);
	const [specialCharacterChecked, setSpecialCharacterChecked] = useState<boolean>(false);
	const [numberChecked, setNumberChecked] = useState<boolean>(false);
	const [lengthChecked, setLengthChecked] = useState<boolean>(false);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
	const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const { refetch: refetchCurrentUser } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'network-only', // Ensure we always fetch from the network
	});

	useEffect(() => {
		if (progress === 100 && isValidPassword && firstName && email && !isPasswordError) {
			setIsSignUpButtonDisabled(false);
		} else if (progress < 100 || !isValidPassword || !firstName || !email || isPasswordError) {
			setIsSignUpButtonDisabled(true);
		}
	}, [progress, isValidPassword, firstName, email, isPasswordError]);

	useEffect(() => {
		if (confirmPassword === password) {
			setIsPasswordError(false);
			setIsValidPassword(true);
		} else {
			setIsPasswordError(true);
			setIsValidPassword(false);
		}
	}, [confirmPassword, password]);

	const outerTheme = useTheme();

	const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFirstName(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newPassword = event.target.value;
		setPassword(newPassword);

		let newProgress = 0;

		if (newPassword.match(/[a-z]/)) {
			newProgress += 20;
			setLowercaseChecked(true);
		} else {
			setLowercaseChecked(false);
		}

		if (newPassword.match(/[A-Z]/)) {
			newProgress += 20;
			setUppercaseChecked(true);
		} else {
			setUppercaseChecked(false);
		}

		if (newPassword.match(/[!@#$%^&*(),.?":{}|<>]/)) {
			newProgress += 20;
			setSpecialCharacterChecked(true);
		} else {
			setSpecialCharacterChecked(false);
		}

		if (newPassword.match(/[0-9]/)) {
			newProgress += 20;
			setNumberChecked(true);
		} else {
			setNumberChecked(false);
		}

		if (newPassword.length > 7) {
			newProgress += 20;
			setLengthChecked(true);
		} else {
			setLengthChecked(false);
		}
		setProgress(newProgress);
	};

	const handleToggle = (): void => {
		setIsChecked((prevState) => !prevState);

		if (isChecked) {
			setCheckboxText('Show Password');
		}
		if (!isChecked) {
			setCheckboxText('Hide Password');
		}

		setShowPassword((prevState) => !prevState);
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		try {
			setIsLoading(true);
			await signup({
				variables: {
					firstName,
					email,
					password,
				},
			});

			await refetchCurrentUser();
			await router.push('/login');

		} catch (error: any) {
			console.error('Error signing up:', error);
			setIsError(true);
			setErrorMessage(error.message);
			setIsLoading(false);
		}
	};

	const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setConfirmPassword(event.target.value);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className={'container mx-auto px-4'}
		>
			<Head>
				<title>Smart Brain - Signup</title>
				<meta name="description" content="Smart Brain web application to detect the content in pictures" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{MemoizedParticleBG}
			<div className={'flex justify-between mx-16 mt-16 sm:hidden mb-10'}>
				<div className={'flex justify-center w-full'}>
					<Logo />
				</div>
			</div>
			<div className={'hidden sm:flex justify-between mt-16'}>
				<Logo />
			</div>
			<main className={'flex flex-col justify-center items-center min-h-screen mb-10'}>
				<div className={`w-full sm:w-6/12 pt-5 flex flex-col ${styles.signupContainer}`}>
					<div
						className={'flex flex-col justify-center'}
						style={{
							flex: 1,
						}}
					>
						<div className={'my-4'}>
							<Typography
								className={'text-center text-2xl sm:text-4xl mb-4 sm:mb-6'}
								variant={'h4'}
								sx={{
									color: 'rgb(209, 213, 219)',
								}}
							>
								{'User Signup'}
							</Typography>
						</div>
						<form
							onSubmit={handleFormSubmit}
							className={'flex flex-col justify-center items-center w-full'}
						>
							<div
								className={'mt-6 cursor-pointer w-full sm:w-7/12'}
								data-cy="first-name-input-field"
							>
								<ThemeProvider theme={CustomTheme(outerTheme)}>
									<TextField
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
										label={'First Name'}
										type={'text'}
										variant={'filled'}
										required={true}
										onChange={handleFirstNameChange}
										InputProps={{
											startAdornment: (
												<InputAdornment position={'start'}>
													<PersonIcon sx={{
														color: 'rgb(209, 213, 219)',
													}} />
												</InputAdornment>
											),
										}}
									/>
								</ThemeProvider>
							</div>
							<div
								className={'mb-3 mt-6 cursor-pointer w-full sm:w-7/12'}
								data-cy="email-input-field"
							>
								<ThemeProvider theme={CustomTheme(outerTheme)}>
									<TextField
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
										label={'Email'}
										type={'email'}
										variant={'filled'}
										required={true}
										onChange={handleEmailChange}
										InputProps={{
											startAdornment: (
												<InputAdornment position={'start'}>
													<EmailIcon sx={{
														color: 'rgb(209, 213, 219)',
													}} />
												</InputAdornment>
											),
										}}
									/>
								</ThemeProvider>
							</div>
							<div className={'mt-3 cursor-pointer w-full sm:w-7/12'}>
								<ThemeProvider theme={CustomTheme(outerTheme)}>
									<TextField
										data-cy="password-input-field"
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
										label={'Password'}
										type={showPassword ? 'text' : 'password'}
										variant={'filled'}
										required={true}
										onChange={handlePasswordChange}
										error={isPasswordError}
										InputProps={{
											startAdornment: (
												<InputAdornment position={'start'}>
													<LockIcon
														sx={{
															color: 'rgb(209, 213, 219)',
														}}
													/>
												</InputAdornment>
											),
										}}
									/>
								</ThemeProvider>
								<div className={'mt-6 mb-6 cursor-pointer w-full'}
									 data-cy="confirm-password-input-field"
								>
									<ThemeProvider theme={CustomTheme(outerTheme)}>
										<TextField
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
											label={'Confirm Password'}
											type={showPassword ? 'text' : 'password'}
											variant={'filled'}
											required={true}
											onChange={handleConfirmPasswordChange}
											error={isPasswordError}
											helperText={isPasswordError ? 'Passwords do not match' : ''}
											InputProps={{
												startAdornment: (
													<InputAdornment position={'start'}>
														<LockIcon
															sx={{
																color: 'rgb(209, 213, 219)',
															}}
														/>
													</InputAdornment>
												),
											}}
										/>
									</ThemeProvider>
								</div>
								<div className={'mt-4 px-2'}>
									<FormGroup>
										<FormControlLabel
											control={
												<Checkbox
													icon={<VisibilityIcon />}
													checkedIcon={<VisibilityOffIcon sx={{
														color: 'rgb(209, 213, 219)',
													}} />}
													checked={isChecked}
													onChange={handleToggle}
													sx={{
														color: 'rgb(209, 213, 219)',
													}}
												/>
											}
											label={checkboxText}
											sx={{
												color: 'rgb(209, 213, 219)',
											}}
										/>
									</FormGroup>
								</div>
								<div>
									<LinearProgress
										variant={'determinate'}
										value={progress}
										sx={{
											'& .MuiLinearProgress-bar': {
												backgroundColor: progress >= 20 && progress < 60 ? 'rgb(231, 110, 110)' :
													progress >= 60 && progress < 90 ? 'rgb(231, 207, 110)' :
														progress >= 90 && progress <= 100 ? 'rgba(110, 231, 183)' :
															'inherit',
											},
											pointerEvents: 'none', // To set the pointer events to default
										}}
									/>
								</div>
								<div className={'mt-4'}>
									<div
										className={'flex-row justify-center'}
										style={{ flex: 1 }}
									>
										<div className={'flex items-center'}>
											<Checkbox
												disabled
												checked={lowercaseChecked}
												sx={{
													'&.MuiCheckbox-root.Mui-disabled': {
														color: 'rgb(209, 213, 219)', // Change this value to the desired color
													},
													fill: 'rgb(209, 213, 219)',
												}}
											/>
											<Typography sx={{
												color: 'rgb(209, 213, 219)',
											}}>
												{'One lowercase character'}
											</Typography>
										</div>
									</div>
									<div className={'flex items-center'}>
										<Checkbox
											disabled
											checked={uppercaseChecked}
											sx={{
												'&.MuiCheckbox-root.Mui-disabled': {
													color: 'rgb(209, 213, 219)', // Change this value to the desired color
												},
												fill: 'rgb(209, 213, 219)',
											}}
										/>
										<Typography sx={{
											color: 'rgb(209, 213, 219)',
										}}>
											{'One uppercase character'}
										</Typography>
									</div>
									<div className={'flex items-center'}>
										<Checkbox
											disabled
											checked={specialCharacterChecked}
											sx={{
												'&.MuiCheckbox-root.Mui-disabled': {
													color: 'rgb(209, 213, 219)', // Change this value to the desired color
												},
												fill: 'rgb(209, 213, 219)',
											}}
										/>
										<Typography sx={{
											color: 'rgb(209, 213, 219)',
										}}>
											{'One special character'}
										</Typography>
									</div>
									<div className={'flex items-center'}>
										<Checkbox
											disabled
											checked={numberChecked}
											sx={{
												'&.MuiCheckbox-root.Mui-disabled': {
													color: 'rgb(209, 213, 219)', // Change this value to the desired color
												},
												fill: 'rgb(209, 213, 219)',
											}}
										/>
										<Typography sx={{
											color: 'rgb(209, 213, 219)',
										}}>
											{'One number'}
										</Typography>
									</div>
									<div className={'flex items-center'}>
										<Checkbox
											disabled
											checked={lengthChecked}
											sx={{
												'&.MuiCheckbox-root.Mui-disabled': {
													color: 'rgb(209, 213, 219)', // Change this value to the desired color
												},
												fill: 'rgb(209, 213, 219)',
											}}
										/>
										<Typography sx={{
											color: 'rgb(209, 213, 219)',
										}}>
											{'At least 8 characters'}
										</Typography>
									</div>
								</div>
							</div>
							<div>
								<Typography
									variant={'body1'}
									sx={{
										color: 'rgb(231, 110, 110)',
										cursor: 'default',
									}}
								>
									<i>
										{errorMessage}
									</i>
								</Typography>
							</div>
							{!isLoading ?
								<div className={'mt-6 w-full sm:w-7/12'}>
									<Button
										data-cy="sign-up-button"
										sx={{
											height: '48px',
										}}
										variant={'contained'}
										className={'login-signup-button'}
										type={'submit'}
										fullWidth={true}
										disabled={isSignUpButtonDisabled}
									>
										<Typography variant={'body1'}>
											{'Signup'}
										</Typography>
									</Button>
								</div>
								:
								<div className={'flex justify-center'}>
									<CircularProgress
										sx={{
											color: 'rgb(164, 110, 231)',
										}}
									/>
								</div>
							}
							<div className={'flex justify-center my-3'}>
								<Link href={'/login'}>
									<Typography
										sx={{
											color: 'rgb(209, 213, 219)',
										}}
									>
										{'Already have an account?'}
										{' '}
										{<b>Login</b>}
									</Typography>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</main>
		</motion.div>
	);
};

export default SignUp;