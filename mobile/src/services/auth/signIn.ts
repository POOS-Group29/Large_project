import { instance } from '@/services/instance';
import { AuthResponseSchema } from '@/types/schemas/auth';
import type { SignInRequestSchemaType } from '@/types/schemas/auth';

export default async (props: SignInRequestSchemaType) => {
	const { email, password } = props;
	const response = await instance
		.post('api/auth/signin/', {
			body: JSON.stringify({ email, password }),
		})
		.json();
	return AuthResponseSchema.parse(response);
};
