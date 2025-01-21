
<script lang="ts">

    let { name, href }: { name: string, href?: string } = $props();

</script>


<!-- Markup -->


{#if href}
    <a { href }> { name } </a>
{:else}
    <span> { name } </span>
{/if}


<!-- Styles -->


<style lang="scss">

    @use '$styles/palette.scss' as *;

    a, span {
        color: $dark-purple;
        font-size: 1.65rem;
        font-weight: 700;

        &:not(:first-child)::before {
            content: '/';
            margin-right: 0.5rem;
        }
    }

    a:hover {
        color: $purple;
        text-decoration: underline;
    }

</style>