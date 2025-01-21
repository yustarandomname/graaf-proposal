
<script lang="ts">

    // Components
    import { Toaster, toaster } from '$components/Toaster'

    // Global styles
	import '$styles/global.scss';

    // Properties
	let { children, data } = $props();

	$effect(() => {
		toaster.promise(data.testConnection, {
			duration: Number.POSITIVE_INFINITY,
			header: 'Failed to connect to server',
            body: 'Please check your internet connection and try again.',
            actions: [{
                label: 'reload page',
                onclick: () => location.reload()
            }]
		});
	});

</script>


<!-- Markup -->


<Toaster />

<header>
    <img src="" alt="logo">
    <h1> Graph Editor </h1>
</header>

<main>
    {@render children()}
</main>


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    header {
        position: relative;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        padding: 24px;

        img {
            height: 2rem;
            margin-right: 16px;

            border: 1px solid $white; // TODO REPLACE WITH ACTUAL LOGO
        }

        h1 {
            color: $white;
        }

        &::before {
            content: '';

            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            background: linear-gradient(15deg, $dark-purple, 80%, $light-purple);
            transition: all $anim-duration $anim-easing;
        }

        &::after {
            content: '';

            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            background: url('$assets/noise.svg');
            opacity: 0.2;
        }
    }

    main {
        max-width: $content-width;
        margin: 0 auto;
        padding: $topper-height $gutter-width $footer-height;
    }

</style>