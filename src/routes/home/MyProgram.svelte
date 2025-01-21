
<script lang="ts">

	// External dependencies
	import { Prisma } from '@prisma/client';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import type { SvelteComponent } from 'svelte';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';

    // Internal dependencies
    import { state } from './state.svelte';

    // Components
    import * as Card from '$components/Card';
	import * as Form from '$components/Form';
	import * as Modal from '$components/Modal';
    import Button from '$lib/components/Button.svelte';
	import Linkbutton from '$lib/components/LinkButton.svelte';

    import Grid from './Grid.svelte';

    // Assets
    import plus_icon from '$assets/icons/plus.svg';
	import gear_icon from '$assets/icons/gear.svg';
	import people_icon from '$assets/icons/people.svg';
	import { programSchema } from '$lib/zod';

    // Properties
	type Props = {
		program: Prisma.ProgramGetPayload<{
			include: {
				courses: true
			}
		}>,

		programForm: SuperValidated<Infer<typeof programSchema>>
	}

    let { program, programForm }: Props = $props();

	// Main
	let new_course_modal: SvelteComponent;

	const filtered_courses = $derived(
		program.courses.filter(course => {
	
			// TODO MOVE THIS QUERY MATCHING TO A CONTROLLER
			const parsed_query = state.query
				.toLowerCase()	
				.trim();

			const parsed_code = course.code
				.toLowerCase()
				.trim();

			const parsed_name = course.name
				.toLowerCase()
				.trim();

			return parsed_code.includes(parsed_query) || parsed_name.includes(parsed_query);
		})
	);

	const super_form = superForm(programForm, {
		validators: zodClient(programSchema),
		id: `new-course-${program.id}`,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				new_course_modal.close();
			}
		}
	});

</script>


<!-- Markup -->


<Card.Root>
	<Card.Header>
		<h4> { program.name } </h4>

		<div class="flex-spacer"></div>

		{#if true} <!-- TODO IF PROGRAM ADMIN -->
			<Linkbutton src={ gear_icon } href={ `/program/settings/${ program.id }` }>
				Settings
			</Linkbutton>
			<Button src={ plus_icon } onclick={() => new_course_modal.open()}>
				New Course
			</Button>
		{:else}
			<Linkbutton src={people_icon}>
				Program admins
			</Linkbutton>
		{/if}
	</Card.Header>

	<Card.Content>
		{#if filtered_courses.length === 0}
			<p class="nothing-here"> No courses found </p>
		{:else}
			<Grid>
				{#each filtered_courses as course}
					<a href="/course/overview/{ course.code }"> { course.code } { course.name } </a>
				{/each}
			</Grid>
		{/if}
	</Card.Content>
</Card.Root>

<Modal.Root bind:this={ new_course_modal }>
	<Modal.Header>
		<h3> New Course </h3>
	</Modal.Header>
	<Modal.Content>
		<Form.Root action="create-course" { super_form }>
			<Form.Textfield id="code" label="Code" placeholder="Course code" />
			<Form.Textfield id="name" label="Name" placeholder="Course name" />
			<Form.Submit>
				Create Course
			</Form.Submit>
		</Form.Root>
	</Modal.Content>
</Modal.Root>
