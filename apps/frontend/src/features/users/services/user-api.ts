import { apiClient } from "../../../lib/api-client";
import type { CreateUserDTO, User } from "../types/user.types";

export const userApi = {
	create: async (data: CreateUserDTO): Promise<User> => {
		return apiClient.post<User>("/users", data);
	},
};
