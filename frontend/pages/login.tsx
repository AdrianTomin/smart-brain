/**
 * @file login.tsx
 * @description Component for user login.
 */

import React, { useMemo, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import {
	TextField,
	Typography,
	InputAdornment,
	Button,
	Checkbox,
	FormGroup,
	FormControlLabel,
	Alert,
	Collapse,
	CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';

import { ThemeProvider, useTheme } from '@mui/material/styles';
import { USER_LOGIN_MUTATION } from '@/graphql/mutations/UserLogin';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { useMutation, useQuery } from '@apollo/client';
import { ParticleBG } from '@/components/ParticleBG';
import { Logo } from '@/components/Logo';
import { CustomTheme } from '@/contexts/CustomTheme';
import styles from '../styles/Login.module.scss';
import { useUser } from '@/contexts/UserContext';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { client } from '@/config/apolloClient';

/**
 * Component for user login.
 * @returns {React.ReactElement} The login component.
 */
const Login = (): React.ReactElement => {
	const useMemoizedParticleBG = () => {
		return useMemo(() => <ParticleBG />, []);
	};
	const MemoizedParticleBG: React.ReactElement = useMemoizedParticleBG();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [checkboxText, setCheckboxText] = useState<string>('Show Password');
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const { refetch: refetchCurrentUser } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-and-network',
	});

	const userHook = useUser();

	const { data } = useQuery(GET_CURRENT_USER);

	const [login] = useMutation(USER_LOGIN_MUTATION, {
		update: (cache, {
			data: {
				login,
			},
		}) => cache.writeQuery({
			query: GET_CURRENT_USER,
			data: {
				getCurrentUser: login,
			},
		}),
	});

	const router: NextRouter = useRouter();

	const outerTheme = useTheme();
	const { successMessage } = router.query;

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(event.target.value);
	};

	const handleLogin = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();

		const user = {
			email: email,
			password: password,
		};

		setIsLoading(true);

		try {
			console.log('Current User before login mutation', data);
			console.log('Current User before login mutation, userHook', userHook);
			await login({
				variables: user,
			});

			console.log('Current User after login mutation and before refetch', data);
			console.log('Current User after login mutation and before refetch with userHook', data);
			// await refetchCurrentUser();
			// console.log('Current User after refetch', data);
			await router.push('/application');

		} catch (error: any) {
			setIsError(true);
			setErrorMessage(error.message);
			setIsLoading(false);
		}
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

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className={'container mx-auto px-4'}
		>
			<Head>
				<title>Login</title>
				<meta name="description" content="Smart Brain web application to detect the content in pictures" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{MemoizedParticleBG}
			{successMessage &&
                <Collapse in={isOpen}>
                    <Alert
                        variant={'filled'}
                        severity={'success'}
                        onClose={() => {
							setIsOpen(false);
						}}
                        sx={{
							backgroundColor: 'rgb(110, 231, 183)',
							color: 'rgb(40,40,50)',
						}}>
                        Your account has been deleted successfully
                    </Alert>
                </Collapse>
			}
			<div className={'flex justify-between mx-16 mt-16 sm:hidden mb-10'}>
				<div className={'flex justify-center w-full'}>
					<Logo />
				</div>
			</div>
			<div className={'hidden sm:flex justify-between mt-16'}>
				<Logo />
			</div>
			<main
				className={'flex flex-col justify-center items-center min-h-screen'}
				style={{
					marginTop: '-50px',
					transition: 'margin-top 0.3s ease',
				}}
			>
				<div className={`w-full sm:w-6/12 pt-10 flex flex-col ${styles.loginContainer}`}>
					<div
						className={`${styles.loginForm} flex flex-col justify-center mb-6`}
						style={{
							flex: 1,
						}}
					>
						<div className={'mb-6'}>
							<Typography
								className={'text-center text-2xl sm:text-4xl mb-4 sm:mb-6'}
								variant={'h4'}
								sx={{
									color: 'rgb(209, 213, 219)',
								}}
							>
								{'User Login'}
							</Typography>
						</div>
						<form onSubmit={handleLogin} className={'flex flex-col justify-center items-center w-full'}>
							<div
								className={'mb-3 mt-6 cursor-pointer w-full sm:w-7/12'}
								data-cy="username-input-field"
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
										error={isError}
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
							<div
								className={'mt-3 cursor-pointer w-full sm:w-7/12'}
								data-cy="password-input-field"
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
										label={'Password'}
										type={showPassword ? 'text' : 'password'}
										variant={'filled'}
										required={true}
										onChange={handlePasswordChange}
										error={isError}
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
							</div>
							{!isLoading ?
								<div
									className={'mt-6 w-full sm:w-7/12'}
									data-cy="login-button"
								>
									<Button
										sx={{
											height: '48px',
										}}
										variant={'contained'}
										className={'login-signup-button'}
										type={'submit'}
										fullWidth={true}
									>
										<Typography variant={'body1'}>
											{'Login'}
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
								<Link href={'/sign-up'}>
									<Typography
										sx={{
											color: 'rgb(209, 213, 219)',
										}}
									>
										{`Don't have an account?`}
										{' '}
										{<b>Sign Up</b>}
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

export default Login;