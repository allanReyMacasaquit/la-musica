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
	return (
		<html lang='en'>
			<SupabaseProvider>
				<UserProvider>
					<ModalProvider />
					<body className={font.className}>
						<ToasterProvider />
						<Sidebar songs={userSongs}>{children}</Sidebar>
						<Player />
					</body>
				</UserProvider>
			</SupabaseProvider>
		</html>
	);
}
