import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./application/use-cases/create-user.use-case";
import { UserPersistenceModule } from "./infrastructure/persistence/user-persistence.module";
import { UserController } from "./presentation/controllers/user.controller";

@Module({
	imports: [UserPersistenceModule],
	controllers: [UserController],
	providers: [
		CreateUserUseCase,
		// Add other use cases here
	],
	exports: [],
})
export class UsersModule {}
