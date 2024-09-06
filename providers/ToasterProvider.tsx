'use client';

import { Toaster } from 'react-hot-toast';

function ToasterProvider() {
	return (
		<Toaster
			toastOptions={{
				duration: 4000,
				position: 'bottom-center',
				style: {
					background: '#333',
					color: '#fff',
				},
			}}
		></Toaster>
	);
}
export default ToasterProvider;
