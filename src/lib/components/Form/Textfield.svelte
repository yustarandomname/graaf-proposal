
<script lang="ts">

    // External dependencies
	import { getContext } from "svelte";

    // Components
    import Textfield from "$components/Textfield.svelte";

    // Properties
    let { id, label, placeholder } = $props();

    // Get superform from context
    // TODO PROPERLY TYPE SUPERFORM
    const { super_form }: { super_form: any } = getContext('formRoot')

</script>


<!-- Markup -->


<div>
    <label for={ id }> { label } </label>
    <Textfield
        type="text"
        name={ id }
        placeholder={ placeholder }
        aria-invalid={ super_form.$errors[id] ? 'true' : undefined }
        bind:value={ super_form.$form[id] }
    />

    {#if super_form.$errors[id]}
        <span> { super_form.$errors[id] } </span>
    {/if}
</div>


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    div {
        display: grid;
        grid-template-columns: $form-grid-columns;
        place-items: center end;
        gap: $medium-form-gap;
    }

</style>