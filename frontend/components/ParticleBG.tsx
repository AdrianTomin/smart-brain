/**
 * @file ParticleBG.tsx
 * @description Component for rendering a particle background effect.
 */

import React, { useEffect, useState } from 'react';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

/**
 * @function ParticleBG
 * @description Component for rendering a particle background effect.
 * @returns {React.ReactElement} A ParticleBG component.
 */
export const ParticleBG = (): React.ReactElement => {
	const [init, setInit] = useState(false);

	// this should be run only once per application lifetime
	useEffect(() => {
		initParticlesEngine(async (engine: Engine): Promise<void> => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = async (container: Container | undefined): Promise<void> => {};

	return (
		<>
			{init && <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={{
					fpsLimit: 60,
					interactivity: {
						events: {
							onClick: {
								enable: false,
								mode: 'push',
							},
							onHover: {
								enable: true,
								mode: 'repulse',
							},
						},
						modes: {
							push: {
								quantity: 4,
							},
							repulse: {
								distance: 200,
								duration: 0.4,
							},
						},
					},
					particles: {
						color: {
							value: ['#E36EE7FF', '#6EC7E7FF'],
						},
						links: {
							color: '#ffffff',
							distance: 150,
							enable: true,
							opacity: 0.5,
							width: 1,
						},
						move: {
							direction: 'none',
							enable: true,
							outModes: {
								default: 'bounce',
							},
							random: false,
							speed: 3,
							straight: false,
						},
						number: {
							density: {
								enable: true,
							},
							value: 150,
						},
						opacity: {
							value: 1,
						},
						shape: {
							type: 'circle',
						},
						size: {
							value: {
								min: 1,
								max: 5,
							},
						},
					},
					detectRetina: true,
				}}
            />
			}
		</>
	);
};