
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
        border-radius: 0 0 $border-radius $border-radius;
        padding: $card-thick-padding;
    }

</style>