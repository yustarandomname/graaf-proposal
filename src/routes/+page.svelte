<script lang="ts">
	import { toast } from 'svelte-sonner';
	import CreateNewProgramButton from './CreateNewProgramButon.svelte';
	import Program from './Program.svelte';
	import SearchCourses from './SearchCourses.svelte';

	const { data, form } = $props();

	$effect(() => {
		// When add 'course to program' form is submitted with an error
		if (form?.error) toast.error(form.error);
	});
</script>

<section class="prose mx-auto p-4 text-blue-900">
	<h1 class="my-12 text-4xl font-bold text-blue-950 shadow-blue-500/70">Welcome to the graaf</h1>
	<p>
		Here you can find all Programs and associated Courses. Click on any of them to edit or view more
		information. You can also create a sandbox environment to experiment with the Graph Editor.
		Can't find a specific Program or Course? Maybe you don't have access to it. Contact one of its
		Admins to get access.
	</p>
</section>

<section class="mx-auto my-12 grid max-w-4xl gap-4 p-4">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-bold">Programs</h2>

		<div class="flex gap-2">
			{#await data.courses then courses}
				<SearchCourses {courses} />
			{/await}
			<CreateNewProgramButton form={data.programForm} />
		</div>
	</div>

	{#each data.programs as program (program.id)}
		<Program {program} courses={data.courses} courseForm={data.courseForm} />
	{/each}
</section>
