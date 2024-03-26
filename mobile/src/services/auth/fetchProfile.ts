import { authenticatedInstance } from '@/services/instance';
import { UserSchema } from '@/types/schemas/auth';

export default async () => {
	const response = await authenticatedInstance.get('api/auth/profile/').json();
	return UserSchema.parse(response);
};
