
<script lang="ts">

    let { children } = $props();

</script>


<!-- Markup -->


<div>
    {@render children()}
</div>


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;

        padding: $card-thin-padding $card-thick-padding;

        background: $light-gray;
        border-bottom: 1px solid $gray;
        border-radius: $border-radius $border-radius 0 0;
    }

</style>