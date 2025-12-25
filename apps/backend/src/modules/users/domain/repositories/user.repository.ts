import type { IRepository } from "../../../../shared/domain/repository.interface";
import type { User } from "../entities/user.entity";

export interface UserRepository extends IRepository<User> {
	findByEmail(email: string): Promise<User | null>;
}

export const UserRepository = Symbol("UserRepository"); // Di Token
