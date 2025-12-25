import { Module } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { InMemoryUserRepository } from "./in-memory/in-memory-user.repository";

@Module({
	providers: [
		{
			provide: UserRepository,
			useClass: InMemoryUserRepository,
		},
	],
	exports: [UserRepository],
})
export class UserPersistenceModule {}
