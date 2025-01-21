
// External dependencies
import { z } from 'zod';

// Internal dependencies
import * as settings from '$lib/utils/settings';

// Schema for validating program data
export const programSchema = z.object({
    name: z.string().min(1).max(settings.MAX_PROGRAM_NAME_LENGTH)
});
