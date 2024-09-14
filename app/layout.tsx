import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';
import { Suspense } from 'react';
import Loading from './(site)/Loading';
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'La Musica',
	description: 'Listen to Music',
};

export const revalidate = 0;
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userSongs = await getSongsByUserId();
	const products = await getActiveProductsWithPrices();
	return (
		<html lang='en'>
			<SupabaseProvider>
				<UserProvider>
					<body className={font.className}>
						<ToasterProvider />
						<ModalProvider products={products} />
						<Sidebar songs={userSongs}>
							<Suspense fallback={<Loading />}>{children}</Suspense>
						</Sidebar>
						<Player />
					</body>
				</UserProvider>
			</SupabaseProvider>
		</html>
	);
}
