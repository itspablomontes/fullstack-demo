import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import type { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject(UserRepository)
		private readonly userRepository: UserRepository,
	) {}

	async execute(dto: CreateUserDto): Promise<User> {
		const existingUser = await this.userRepository.findByEmail(dto.email);
		if (existingUser) {
			throw new Error("User already exists");
		}

		// In a real generic app, we might use a factory or a domain service
		const newUser = new User(uuidv4(), dto.name, dto.email, new Date());

		await this.userRepository.save(newUser);
		return newUser;
	}
}
