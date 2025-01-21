
<script lang="ts">

    let { 
        ref = $bindable(null),
        value = $bindable(),
        ...props
    } = $props();

</script>


<!-- Markup -->


<input bind:this={ ref } bind:value { ...props } />


<!-- Styles -->


<style lang="scss">
    
    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    input {
        width: 100%;
        padding: $input-thin-padding $input-thick-padding;

        border: 1px solid $gray;
        border-radius: $border-radius;

        &::placeholder {
            color: $light-gray;
        }

        &:focus-visible {
            border-color: transparent;
            outline: 2px solid $highlight;
        }
    }

</style>