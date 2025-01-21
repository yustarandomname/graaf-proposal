
<script lang="ts">

    let { children } = $props();

</script>


<!-- Markup -->


<div>
    {@render children()}
</div>


<!-- Styles -->


<style lang="scss">

    div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;
    }

</style>