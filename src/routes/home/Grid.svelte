
<script lang="ts">

    // Properties
    let { children } = $props();

</script>


<!-- Markup -->


<div>
    {@render children()}
</div>


<!-- Style -->


<style lang="scss">

    div {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }

</style>
