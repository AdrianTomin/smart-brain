import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

import { client } from '@/config/apolloClient';
import '@/styles/globals.scss';
import { UserProvider } from '@/contexts/UserContext';

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
	return (
		<ApolloProvider client={client}>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</ApolloProvider>
	);
}
