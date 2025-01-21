
<script lang="ts">

	// External dependencies
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

    import type { SvelteComponent } from 'svelte';

	// Internal dependencies
	import { programSchema } from '$lib/zod';

	// Components
	import * as Form from '$components/Form';
	import * as Bread from '$components/Bread';
	import * as Modal from '$components/Modal';
	import Button from '$components/Button.svelte';
	import Linkbutton from '$components/LinkButton.svelte';

	import MyCourses from './MyCourses.svelte';
    import MyProgram from './MyProgram.svelte';

	// Assets
	import plus_icon from '$assets/icons/plus.svg';
	import pin_icon from '$assets/icons/pin.svg';

	// Properties
	const { data } = $props();

	// Main
	let new_program_modal: SvelteComponent;

	const super_form = superForm(data.programForm, {
		validators: zodClient(programSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				new_program_modal.close();
			}
		}
	});

</script>


<!-- Markup -->


<Bread.Trail>
	<Bread.Crumb name="Home" />
</Bread.Trail>

<p class="page-description">
	Here you can find all Programs and associated Courses. Click on any of them to edit or view more
	information. You can also create a sandbox environment to experiment with the Graph Editor.
	Can't find a specific Program or Course? Maybe you don't have access to it. Contact one of its
	Admins to get access.
</p>

{#await Promise.all([data.programs, data.courses])}
	<p> Loading... </p>
{:then [programs, courses]}

	<MyCourses { courses } />

	<div class="toolbar">
		<h3> My Programmes </h3>

		<Linkbutton src={pin_icon}>
			Pinned Programmes
		</Linkbutton>

		{#if true} <!-- TODO IF SUPER ADMIN -->
			<Button src={plus_icon} onclick={() => new_program_modal.open()}>
				New Programme 
			</Button>
		{/if}
	</div>

	<div class="programs">
		{#each programs as program}
			<MyProgram { program } programForm={ data.programForm } />
		{/each}
	</div>
{:catch error}
	<p> Error: { error.message } </p>
{/await}

<Modal.Root bind:this={ new_program_modal }>
	<Modal.Header>
		<h3> New Programme </h3>
	</Modal.Header>
	<Modal.Content>
		<Form.Root action="create-program" { super_form }>
			<Form.Textfield id="name" label="Name" placeholder="Programme name" />
			<Form.Submit>
				Create Programme
			</Form.Submit>
		</Form.Root>
	</Modal.Content>
</Modal.Root>


<!-- Styles -->


<style lang="scss">

	@use '$styles/variables.scss' as *;
	@use '$styles/palette.scss' as *;

	.page-description {
		color: $dark-gray;
		margin-top: 1rem;
	}

	.toolbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: 0.5rem;

		margin: 3rem 0 1rem;

		h3 {
			flex: 1;
			color: $dark-purple;
		}
	}

	.programs {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
	}

</style>