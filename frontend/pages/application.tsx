/**
 * @file application.tsx
 * @description Component for the main application page.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, NextRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

import { motion } from 'framer-motion';
import { Button, Skeleton, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';

import { ParticleBG } from '@/components/ParticleBG';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';
import { Rank } from '@/components/Rank';
import { ImageLinkForm } from '@/components/ImageLinkForm';
import { APIResponse, fetchData } from '@/api/clarifaiService';
import { GET_CURRENT_USER } from '@/graphql/queries/GetCurrentUser';
import { INCREMENT_USER_ENTRIES_MUTATION } from '@/graphql/mutations/IncrementUserEntries';
import { DataTable } from '@/components/DataTable';
import { AuthGuard } from '@/components/AuthGaurd';
import styles from '@/styles/Application.module.scss';
import { useUser } from '@/contexts/UserContext';

/**
 * Component for the main application page.
 * @returns {React.ReactElement} The application page component.
 */
const Application = (): React.ReactElement => {
	// const userHook = useUser();
	// const { data } = useQuery(GET_CURRENT_USER);
	// const user = data?.getCurrentUser || {};
	// console.log("User in application page", user);
	// console.log("User in application page userHook", userHook);
	// const { email, isActive, isLoggedIn } = user;

	const { email, isActive, isLoggedIn } = useUser();
	const user = useUser();

	const [inputValue, setInputValue] = useState<string>('');
	const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);
	const [apiResponseData, setApiResponseData] = useState<APIResponse[] | undefined>(undefined);
	const [isAPIError, setIsAPIError] = useState<boolean>(false);

	const router: NextRouter = useRouter();

	const { refetch: refetchCurrentUser } = useQuery(GET_CURRENT_USER, {
		fetchPolicy: 'cache-and-network', // Ensure we always fetch from the network
	});

	const [incrementUserEntries] = useMutation(INCREMENT_USER_ENTRIES_MUTATION);

	useEffect(() => {
		const checkAuthentication = async () => {
			await refetchCurrentUser()
			console.log({ user });
			if (!isLoggedIn || !email || !isActive) {
				await router.push('/login');
			}
		};

		checkAuthentication();
	}, [isLoggedIn, router, email, isActive]);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(event.target.value);
	};

	const handleDetectClick = async (): Promise<void> => {
		setIsDataLoading(true);
		try {
			const data: APIResponse [] | undefined = await fetchData(inputValue);
			if (data) {
				setIsAPIError(false);
				setApiResponseData(data);
				setDataLoaded(true);
				await incrementUserEntries({
					variables: {
						email,
					},
				});
				await refetchCurrentUser();
			}
		} catch (error) {
			setIsDataLoading(false);
			setDataLoaded(false);
			setIsAPIError(true);
		}
	};

	const reset = (): void => {
		setIsDataLoading(false);
		setDataLoaded(false);
		setInputValue('');
	};

	const useMemoizedParticleBG = () => {
		return useMemo(() => <ParticleBG />, []);
	};

	const MemoizedParticleBG = useMemoizedParticleBG();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className={'container mx-auto px-4'}
		>
			{/*<AuthGuard>*/}
				<Head>
					<title>Homepage</title>
					<meta name="description" content="Smart Brain web application to detect the content in pictures" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				{MemoizedParticleBG}
				<main className={'min-h-screen flex flex-col justify-center mt-16'}>
					<div className={'flex justify-between mx-4 mt-16 sm:mx-16'}>
						<div className={'sm:hidden'}>
							<div className={'flex justify-center w-full'}>
								<Logo />
							</div>
						</div>
						<div className={'hidden sm:block'}>
							<Logo />
						</div>
						<Navigation />
					</div>
					<div className={'flex-grow flex flex-col justify-center items-center mt-6'}>
						{!isDataLoading ? (
							<div
								className={`flex flex-col justify-center items-center w-full sm:w-8/12 py-14 ${styles.applicationContainer}`}>
								<Rank />
								<ImageLinkForm
									handleOnChange={handleOnChange}
									handleDetectClick={handleDetectClick}
								/>
								{isAPIError &&
                                    <Typography
                                        variant={'body1'}
                                        sx={{
											color: 'rgb(231, 110, 110)',
										}}
                                        className={'text-center mt-3'}
                                    >
										{'Invalid file format. Please try again.'}
                                    </Typography>
								}
							</div>
						) : (
							<>
								{dataLoaded ? (
									<div
										className={`flex flex-col justify-center items-center w-full sm:w-8/12 ${styles.applicationContainer}`}
									>
										<div className={`mt-4`}>
											<Typography
												variant={'h6'}
												sx={{
													color: 'rgb(209, 213, 219)',
												}}>
												{'Your Results'}
											</Typography>
										</div>
										<div
											className={'flex flex-col sm:flex-row justify-between w-full p-2 sm:p-7 sm:space-x-3'}>
											<div className={'w-full sm:w-6/12 h-full mb-6'}>
												<Image
													src={inputValue}
													alt={'Uploaded Picture'}
													className={'w-full h-auto rounded-lg object-cover'}
													width={640}
													height={480}
													quality={100}
													priority={true}
												/>
											</div>
											<div className={'w-full sm:w-6/12'}>
												<DataTable data={apiResponseData} />
											</div>
										</div>
										<div className={'flex justify-center mb-4 mt-4 sm:mt-0 cursor-pointer'}>
											<Button
												data-cy="analyze-additional-picture-button"
												sx={{
													height: '48px',
													width: '100%',
												}}
												variant={'contained'}
												endIcon={<SearchIcon />}
												className={'image-form-button'}
												onClick={reset}
												fullWidth={true}
											>
												{'Analyze another picture'}
											</Button>
										</div>
									</div>
								) : (
									<div
										className={`flex flex-col justify-center items-center h-32 w-full sm:w-8/12 ${styles.applicationContainer}`}>
										<Skeleton
											animation={'wave'}
											width={'100%'}
											height={'100%'}
											style={{ borderRadius: 10 }}
											sx={{
												'backgroundColor': 'rgb(50, 50, 62, 0.95)',
											}}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</main>
			{/*</AuthGuard>*/}
		</motion.div>
	);
};

export default Application;