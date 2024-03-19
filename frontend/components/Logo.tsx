/**
 * @file Logo.tsx
 * @description Component for rendering the application logo.
 */

import React from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

import styles from '../styles/component-styles/Logo.module.scss';

/**
 * @function Logo
 * @description Component for rendering the application logo.
 * @returns {React.ReactElement} A Logo component.
 */
export const Logo = (): React.ReactElement => {
	return (
		<motion.div
			className={`${styles.logo} flex justify-center items-center w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-28 xl:h-28`}
			whileHover={{
				scale: 1.1,
			}}
		>
			<Image
				alt={'Smart Brain Logo'}
				src={'/static/logo.png'}
				width={70}
				height={70}
				priority={true}
			/>
		</motion.div>
	);
};