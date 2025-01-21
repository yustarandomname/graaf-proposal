
<script lang="ts">

    // Internal dependencies
    import { toaster } from '.'
    import type { ToastParams } from './types'

    // Functions
    function error(params: ToastParams) {
        console.error(`${params.header}: ${params.body}`)

        // TODO ERROR TOAST POPUP
    }

    async function promise(promise: Promise<any>, params: ToastParams) {
        try {
            return await promise
        } catch {
            error(params)
        }
    }

    // Assign to toaster state
    $effect(() => {
        toaster.error = error
        toaster.promise = promise
    })

</script>


<!-- Markup -->


<div>

</div>


<!-- Styles -->


<style lang="scss">

    div {
        position: fixed;
        z-index: 1000;
        bottom: 0;
        right: 0;

        display: flex;
        flex-flow: column-reverse nowrap;
    }

</style>
