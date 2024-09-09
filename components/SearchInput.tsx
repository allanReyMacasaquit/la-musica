'use client';

import useDebounce from '@/hooks/useDebounce';
import { url } from 'inspector';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';

import { useEffect, useState } from 'react';
import Input from './Input';

interface SearchInput {}
function SearchInput() {
	const router = useRouter();
	const [value, setValue] = useState<string>('');
	const debounceValue = useDebounce<string>(value, 500);

	useEffect(() => {
		const query = {
			title: debounceValue,
		};

		const newUrl = queryString.stringifyUrl({
			url: '/search',
			query: query,
		});
		router.push(newUrl);
	}, [debounceValue, router]);

	return (
		<div>
			<Input
				className='capitalize'
				placeholder='Find out your favorite songs here!'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}
export default SearchInput;
