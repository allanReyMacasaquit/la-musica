import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'La Musica',
	description: 'Listen to Music',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<SupabaseProvider>
				<UserProvider>
					<ModalProvider />
					<body className={font.className}>
						<ToasterProvider />
						<Sidebar>{children}</Sidebar>
					</body>
				</UserProvider>
			</SupabaseProvider>
		</html>
	);
}
