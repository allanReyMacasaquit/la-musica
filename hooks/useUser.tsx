import { Subscription, UserDetails } from '@/types/types_custom';
import { User } from '@supabase/auth-helpers-nextjs';
import {
	useSessionContext,
	useUser as supabaseUser,
} from '@supabase/auth-helpers-react';
import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
	accessToken: string | null;
	user: User | null;
	userDetails: UserDetails | null;
	isLoading: boolean;
	subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export interface Props {
	[propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
	const {
		session,
		isLoading: isLoadingUser,
		supabaseClient: supabase,
	} = useSessionContext();
	const user = supabaseUser();
	const accessToken = session?.access_token ?? null;

	const [isLoadingData, setIsLoadingData] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [subscription, setSubscription] = useState<Subscription | null>(null);

	// Fetch user details from the database
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getUserDetails = async () => {
		const { data, error } = await supabase.from('users').select('*').single();
		if (error) {
			console.error('Error fetching user details:', error);
		}
		return data;
	};

	// Fetch subscription data for the user
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getSubscription = async () => {
		const { data, error } = await supabase
			.from('subscriptions')
			.select(`*,prices (*, products(*))`)
			.eq('user_id', session?.user.id)
			.in('status', ['trialing', 'active'])
			.single();
		if (error) {
			console.error('Error fetching subscription:', error);
		}
		return data;
	};

	useEffect(() => {
		const fetchData = async () => {
			if (user && !userDetails && !subscription && !isLoadingData) {
				setIsLoadingData(true);
				try {
					// Use Promise.all to fetch both details and subscription in parallel
					const [fetchedUserDetails, fetchedSubscription] = await Promise.all([
						getUserDetails(),
						getSubscription(),
					]);

					if (fetchedUserDetails)
						setUserDetails(fetchedUserDetails as UserDetails);
					if (fetchedSubscription)
						setSubscription(fetchedSubscription as Subscription);
				} catch (error) {
					console.error('Error fetching data:', error);
				} finally {
					setIsLoadingData(false);
				}
			}

			// Reset data when user logs out
			if (!user && !isLoadingUser) {
				setUserDetails(null);
				setSubscription(null);
			}
		};

		fetchData();
	}, [
		getSubscription,
		getUserDetails,
		isLoadingData,
		isLoadingUser,
		subscription,
		user,
		userDetails,
	]);

	const value = {
		accessToken,
		user,
		userDetails,
		isLoading: isLoadingUser || isLoadingData,
		subscription,
	};

	return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a MyUserContextProvider');
	}
	return context;
};
