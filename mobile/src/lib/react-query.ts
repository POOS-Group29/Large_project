/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	DefaultOptions,
	QueryCache,
	QueryClient,
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

const queryConfig: DefaultOptions = {
	queries: {
		retry: false,
	},
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
	ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
	UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
	'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
	UseMutationOptions<
		ExtractFnReturnType<MutationFnType>,
		HTTPError,
		Parameters<MutationFnType>[0]
	>;

export const queryCache = new QueryCache();
