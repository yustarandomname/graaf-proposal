import prisma from '$lib/server/db/prisma';
import { error, type ServerLoad } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { domainRelSchema, domainSchema, subjectRelSchema, subjectSchema } from './zodSchema';
import type { DomainStyle } from '@prisma/client';
import { GraphValidator } from '$lib/server/validators/graphValidator';

export const load = (async ({ params }) => {
	if (!params.code || !params.graphid) {
		error(400, { message: 'Course code and Graph id are required' });
	}

	const graphId = parseInt(params.graphid);
	// Check if graphId is not NaN
	if (isNaN(graphId)) {
		error(400, { message: 'Graph id must be a number' });
	}

	try {
		const course = await prisma.course.findFirst({
			where: {
				code: params.code
			},
			include: {
				graphs: {
					where: {
						id: graphId
					},
					include: {
						domains: {
							include: {
								incommingDomains: true,
								outgoingDomains: true
							}
						},
						subjects: {
							include: {
								incommingSubjects: true,
								outgoingSubjects: true,
								domain: true
							}
						},
						lectures: true
					}
				}
			}
		});

		if (!course) error(404, { message: 'Course not found' });
		if (course.graphs.length === 0) error(404, { message: 'Graph not found' });

		const graphValidator = new GraphValidator(course.graphs[0]);

		const cycles = graphValidator.hasCycle();

		// Happy path
		return {
			course: course,
			newDomainForm: await superValidate(zod(domainSchema)),
			newDomainRelForm: await superValidate(zod(domainRelSchema)),
			newSubjectForm: await superValidate(zod(subjectSchema)),
			newSubjectRelForm: await superValidate(zod(subjectRelSchema)),
			cycles: cycles
		};
	} catch (e: unknown) {
		error(500, { message: e instanceof Error ? e.message : `${e}` });
	}
}) satisfies ServerLoad;

// ACTIONS
export const actions = {
	'add-domain-to-graph': async (event) => {
		const form = await superValidate(event, zod(domainSchema));

		if (!form.valid) {
			return setError(form, 'name', 'Invalid graph name');
		}

		try {
			const domainCount = await prisma.domain.count({
				where: {
					graphId: form.data.graphId
				}
			});

			await prisma.domain.create({
				data: {
					name: form.data.name,
					style: form.data.color == '' ? null : (form.data.color as DomainStyle),
					order: domainCount,
					graphId: form.data.graphId
				}
			});
		} catch (e: unknown) {
			return setError(form, 'name', e instanceof Error ? e.message : `${e}`);
		}
	},
	'add-domain-rel': async (event) => {
		const form = await superValidate(event, zod(domainRelSchema));

		if (!form.valid) {
			return setError(form, '', 'Invalid domain relationship');
		}

		try {
			// Check if the domains are already connected
			const isConnected = await prisma.domain.findFirst({
				where: {
					id: form.data.domainInId,
					outgoingDomains: {
						some: {
							id: form.data.domainOutId
						}
					}
				}
			});

			if (isConnected) {
				return setError(form, '', 'Domains are already connected');
			}

			const addOutToIn = prisma.domain.update({
				where: {
					id: form.data.domainInId
				},
				data: {
					outgoingDomains: {
						connect: {
							id: form.data.domainOutId
						}
					}
				}
			});

			const addInToOut = prisma.domain.update({
				where: {
					id: form.data.domainOutId
				},
				data: {
					incommingDomains: {
						connect: {
							id: form.data.domainInId
						}
					}
				}
			});

			await prisma.$transaction([addOutToIn, addInToOut]);
		} catch (e: unknown) {
			return setError(form, '', e instanceof Error ? e.message : `${e}`);
		}
	},

	/* MARK: SUBJECTS */
	'add-subject-to-graph': async (event) => {
		const form = await superValidate(event, zod(subjectSchema));

		if (!form.valid) {
			return setError(form, 'name', 'Invalid subject');
		}

		try {
			const subjectCount = await prisma.subject.count({
				where: {
					graphId: form.data.graphId
				}
			});

			await prisma.subject.create({
				data: {
					name: form.data.name,
					order: subjectCount,
					graphId: form.data.graphId,
					domainId: form.data.domainId > 0 ? form.data.domainId : null
				}
			});
		} catch (e: unknown) {
			return setError(form, 'name', e instanceof Error ? e.message : `${e}`);
		}
	},

	'add-subject-rel': async (event) => {
		const form = await superValidate(event, zod(subjectRelSchema));

		console.log({ form });

		if (!form.valid) {
			return setError(form, '', 'Invalid subject relationship');
		}

		try {
			// Check if the subjects are already connected
			const isConnected = await prisma.subject.findFirst({
				where: {
					id: form.data.subjectInId,
					outgoingSubjects: {
						some: {
							id: form.data.subjectOutId
						}
					}
				}
			});

			if (isConnected) {
				return setError(form, '', 'Subjects are already connected');
			}

			const addOutToIn = prisma.subject.update({
				where: {
					id: form.data.subjectInId
				},
				data: {
					outgoingSubjects: {
						connect: {
							id: form.data.subjectOutId
						}
					}
				}
			});

			const addInToOut = prisma.subject.update({
				where: {
					id: form.data.subjectOutId
				},
				data: {
					incommingSubjects: {
						connect: {
							id: form.data.subjectInId
						}
					}
				}
			});

			await prisma.$transaction([addOutToIn, addInToOut]);
		} catch (e: unknown) {
			return setError(form, '', e instanceof Error ? e.message : `${e}`);
		}
	}
};
