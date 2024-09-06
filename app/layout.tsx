import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';

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
				<body className={font.className}>
					<Sidebar>{children}</Sidebar>
				</body>
			</SupabaseProvider>
		</html>
	);
}
