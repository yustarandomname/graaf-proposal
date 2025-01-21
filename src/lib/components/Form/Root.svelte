
<script lang="ts">

	import { setContext } from "svelte";

    // Properties
    let { children, action, super_form } = $props();

    // Expose superform to children
    setContext('formRoot', { super_form });

</script>


<!-- Markup -->


<form action="?/{ action }" method="POST" use:super_form.enhance>
    {@render children()}
</form>


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    form {
        display: flex;
        flex-flow: column nowrap;
        gap: $small-form-gap;

        max-width: 80%;
        margin: 0 auto;
    }

</style>