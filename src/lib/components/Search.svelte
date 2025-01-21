
<script lang="ts">

    // Assets
    import search_icon from '$assets/icons/search.svg';

    // Main
    let { 
        placeholder, 
        value = $bindable() 
    } = $props();

</script>


<!-- Markup -->


<div>
    <img src={ search_icon } alt="" class:has-content={ value }>
    <input type="text" { placeholder } bind:value />
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

        width: 100%;
        max-width: 20rem;
        padding: $input-thin-padding $input-thick-padding;

        border: 1px solid $gray;
        border-radius: $border-radius;

        img {
            height: $icon-size;
            filter: $light-gray-filter;
        }

        &:focus-within img, & img.has-content {
            filter: $black-filter;
        }

        input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;

            &::placeholder {
                color: $light-gray;
            }
        }

        &:focus-within {
            border-color: transparent;
            outline: 2px solid $highlight;
        }
    }

</style>