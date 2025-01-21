
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
        border: 1px solid $gray;
        border-radius: $border-radius;
    }

</style>