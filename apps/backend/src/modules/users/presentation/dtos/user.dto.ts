import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequestDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;
}

export class UserResponseDto {
	id: string;
	name: string;
	email: string;
	createdAt: string;

	constructor(user: {
		id: string;
		name: string;
		email: string;
		createdAt: Date;
	}) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
		this.createdAt = user.createdAt.toISOString();
	}
}
