import { Body, Controller, Post } from "@nestjs/common";
import type { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
import { type CreateUserRequestDto, UserResponseDto } from "../dtos/user.dto";

@Controller("users")
export class UserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	async create(@Body() body: CreateUserRequestDto): Promise<UserResponseDto> {
		const user = await this.createUserUseCase.execute({
			name: body.name,
			email: body.email,
		});
		return new UserResponseDto(user);
	}
}
