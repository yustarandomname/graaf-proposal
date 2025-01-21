
// External dependencies
import prisma from '$lib/server/db/prisma.js';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, setError, superValidate } from 'sveltekit-superforms';

import type { Course } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types.js';

// Internal dependencies
import { emptyPrismaPromise } from '$lib/utils.js';
import { courseSchema, programSchema } from '$lib/zod';

// Page server load
export const load: PageServerLoad = async ({ url }) => {
	try {
		const programs = prisma.program.findMany({
			include: {
				courses: {
					orderBy: {
						updatedAt: 'desc'
					}
				}
			},
			orderBy: {
				updatedAt: 'desc'
			}
		});

		const courses = prisma.course.findMany({
			orderBy: {
				updatedAt: 'desc'
			}
		});

		return {
			error: undefined,
			programs,
			courses,
			programForm: await superValidate(zod(programSchema)),
			courseForm: await superValidate(zod(courseSchema))
		};
	} catch (error: unknown) {
		return {
			error: error instanceof Error ? error.message : `${error}`,
			programs: [],
			courses: emptyPrismaPromise([] as Course[]),
			programForm: await superValidate(zod(programSchema)),
			courseForm: await superValidate(zod(courseSchema))
		};
	}
};

// Page actions
export const actions: Actions = {

	// Creates a new program with the given name
	'new-program': async (event) => {
		const form = await superValidate(event, zod(programSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.program.create({
				data: {
					name: form.data.name
				}
			});
		} 
		
		catch (error) {
			if (error instanceof Object && 'message' in error)
				return setError(form, 'name', `${error.message}`);
			return setError(form, 'name', error instanceof Error ? error.message : `${error}`);
		}

		return {
			form
		};
	},

	// Creates a new course with the given code and name
	'new-course': async (event) => {
		const form = await superValidate(event, zod(courseSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.program.update({
				where: {
					id: form.data.programId
				},
				data: {
					updatedAt: new Date(),
					courses: {
						create: {
							name: form.data.name,
							code: form.data.code
						}
					}
				}
			});
		} 
		
		catch (event) {
			if (event instanceof Object && 'message' in event)
				return setError(form, 'name', `${event.message}`);
			return setError(form, 'name', event instanceof Error ? event.message : `${event}`);
		}

		return {
			form
		};
	}
};
