import { CreateUserForm } from "@/features/users/components/create-user-form";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1 className="text-2xl font-bold">Feature-Based Architecture Demo</h1>
				<p className="text-gray-500">
					Creating a user via the "Users" feature module.
				</p>

				<CreateUserForm />
			</main>
		</div>
	);
}
