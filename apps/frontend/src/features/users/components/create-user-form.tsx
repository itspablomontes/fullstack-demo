"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userApi } from "../services/user-api";

export const CreateUserForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage("");

		try {
			const user = await userApi.create({ name, email });
			setMessage(`User created: ${user.name} (${user.id})`);
			setName("");
			setEmail("");
		} catch (_error) {
			setMessage("Error creating user");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-6 border rounded shadow-md max-w-sm bg-white text-black"
		>
			<h2 className="text-xl font-bold mb-4">Create User</h2>
			<div className="mb-4">
				<label htmlFor="name" className="block text-sm font-medium mb-1">
					Name
				</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="email" className="block text-sm font-medium mb-1">
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<Button type="submit" disabled={isLoading} className="w-full">
				{isLoading ? "Creating..." : "Create User"}
			</Button>
			{message && <p className="mt-4 text-sm text-center">{message}</p>}
		</form>
	);
};
