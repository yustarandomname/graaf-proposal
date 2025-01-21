
<script lang="ts">

    // External dependencies
    import type { Course } from '@prisma/client';

    // Internal dependencies
    import { state } from './state.svelte';

    // Components
	import * as Card from '$components/Card';
	import Button from '$lib/components/Button.svelte';
	import Search from '$components/Search.svelte';

	import Grid from './Grid.svelte';

    // Assets
	import plus_icon from '$assets/icons/plus.svg';

    // Properties
    let { courses }: { courses: Course[] } = $props();

    // Reactivity
    let filtered_courses = $derived(
        courses.filter(course => {

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

</script>


<!-- Markup -->


<div class="toolbar">
    <h3> My Courses </h3>
    <Search placeholder="Search Courses" bind:value={ state.query } />
    <Button src={plus_icon} onclick={() => console.log('New Sandbox')}>
        New Sandbox
    </Button>
</div>

<Card.Root>
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


<!-- Styles -->


<style lang="scss">

	@use '$styles/variables.scss' as *;
	@use '$styles/palette.scss' as *;

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

</style>