'use client';

import AuthModal from '@/components/AuthModal';
import SubscribeModal from '@/components/SubscribeModal';
import UploadModal from '@/components/UploadModal';
import { ProductWithPrice } from '@/types/types_custom';
import { useEffect, useState } from 'react';

interface ModalProviderProps {
	products: ProductWithPrice[];
}
function ModalProvider({ products }: ModalProviderProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<>
			<AuthModal />
			<UploadModal />
			<SubscribeModal products={products} />
		</>
	);
}
export default ModalProvider;
