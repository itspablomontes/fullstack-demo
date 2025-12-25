import { Injectable } from "@nestjs/common";
import type { User } from "../../../domain/entities/user.entity";
import type { UserRepository } from "../../../domain/repositories/user.repository";

@Injectable()
export class InMemoryUserRepository implements UserRepository {
	private readonly users: Map<string, User> = new Map();

	async findAll(): Promise<User[]> {
		return Array.from(this.users.values());
	}

	async findById(id: string): Promise<User | null> {
		return this.users.get(id) || null;
	}

	async findByEmail(email: string): Promise<User | null> {
		for (const user of this.users.values()) {
			if (user.email === email) {
				return user;
			}
		}
		return null;
	}

	async save(user: User): Promise<void> {
		this.users.set(user.id, user); // Simulates upsert
	}

	async delete(id: string): Promise<void> {
		this.users.delete(id);
	}
}
