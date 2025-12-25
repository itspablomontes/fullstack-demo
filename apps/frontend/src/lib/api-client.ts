const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export const apiClient = {
	get: async <T>(url: string): Promise<T> => {
		const res = await fetch(`${BASE_URL}${url}`);
		if (!res.ok) throw new Error("API Request Failed");
		return res.json();
	},
	post: async <T>(url: string, body: unknown): Promise<T> => {
		const res = await fetch(`${BASE_URL}${url}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!res.ok) throw new Error("API Request Failed");
		return res.json();
	},
};
