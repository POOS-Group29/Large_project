import { instance } from '@/services/instance';
import { AuthResponseSchema } from '@/types/schemas/auth';
import type { SignUpRequestSchemaType } from '@/types/schemas/auth';

export default async (props: SignUpRequestSchemaType) => {
	const { name, email, password } = props;
	const response = await instance
		.post('api/auth/signup/', {
			body: JSON.stringify({ email, password, name }),
		})
		.json();
	return AuthResponseSchema.parse(response);
};
