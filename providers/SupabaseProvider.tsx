'use client';

import { Database } from '@/types/types_database';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

interface SupabaseProviderProps {
	children: React.ReactNode;
}

function SupabaseProvider({ children }: SupabaseProviderProps) {
	const [supabaseClient] = useState(() =>
		createClientComponentClient<Database>()
	);
	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			{children}
		</SessionContextProvider>
	);
}
export default SupabaseProvider;
