
import prisma from '$lib/server/db/prisma.js';

export const load = async () => {
	return {
		testConnection: prisma.program.findFirst()
	};
};
