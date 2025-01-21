
<script lang="ts">

    // External dependencies
    import { setContext } from "svelte";

    // Properties
    let { children } = $props();

    // Functions
    export function open() {
        dialog.showModal();
        const element: HTMLElement | null = dialog.querySelector("input:not(.exit-modal), button:not(.exit-modal), select:not(.exit-modal), textarea:not(.exit-modal)");
        if (element) element.focus();
    }

    export function close() {
        dialog.close();
    }

    // Main
    let dialog: HTMLDialogElement

    setContext("modalRoot", { open, close });

</script>


<!-- Markup -->


<svelte:window onkeydown={event => event.key === 'Escape' && dialog.close()} />

<dialog tabindex="-1" bind:this={ dialog }>
    {@render children()}
</dialog>


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    dialog {
        position: fixed;
        translate: -50% -50%;
        z-index: 1000;
        top: 50%;
        left: 50%;

        width: 100%;
        max-width: 800px;

        border: 1px solid $gray;
        border-radius: $border-radius;
        box-shadow: $box-shadow;

        &::backdrop {
            background-color: rgba($color: #000, $alpha: 0.5);
        }
    }

</style>