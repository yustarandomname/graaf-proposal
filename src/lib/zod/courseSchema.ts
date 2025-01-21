
// External dependencies
import { z } from 'zod';

// Internal dependencies
import * as settings from '$lib/utils/settings';

// Schema for validating course data
export const courseSchema = z.object({
	code: z
		.string()
		.nonempty()
		.max(settings.MAX_COURSE_CODE_LENGTH)
		.regex(settings.COURSE_CODE_REGEX, 'Course code must be alphanumeric withouth any spaces'),
	name: z.string().nonempty().max(settings.MAX_COURSE_NAME_LENGTH),
	programId: z.string()
});
