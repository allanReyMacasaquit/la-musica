import { ProductWithPrice } from '@/types/types_custom';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
	const supabase = createServerComponentClient({
		cookies,
	});

	const { data, error } = await supabase
		.from('products')
		.select('*, prices(*)')
		.eq('active', true)
		.eq('prices.active', true)
		.order('metadata->index')
		.order('unit_amount', { referencedTable: 'prices' });

	if (error) {
		console.log(20, 'getActiveProductsWithPrices - ', error.message);
	}

	return (data as any) || [];
};

export default getActiveProductsWithPrices;
