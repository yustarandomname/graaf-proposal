
<script lang="ts">

    import Button from "$components/Button.svelte";

    let { children } = $props();

</script>

<div>
    <div></div>
    <Button type="submit">
        {@render children()}
    </Button>
</div>

<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    div {
        display: grid;
        grid-template-columns: $form-grid-columns;
        place-items: center start;
        gap: $medium-form-gap;
    }

</style>