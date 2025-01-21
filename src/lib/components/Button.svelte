
<script lang="ts">

    let { 
        children, 
        type = undefined,
        src = undefined, 
        onclick = undefined, 
    } = $props();

</script>


<!-- Markup -->


<button { type } { onclick } onmousedown={ event => event.preventDefault() }>
    {#if src} <img { src } alt="" /> {/if}
    <b> {@render children()} </b>
</button>


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;

        padding: $input-thin-padding $input-thick-padding;
        
        border: 1px solid $purple;
        border-radius: $border-radius;
        
        background: $purple;

        cursor: pointer;
        transition: background $anim-duration $anim-easing;

        b {
            color: $white;
            padding-bottom: 0.1rem;
        }

        img {
            height: $icon-size;
            filter: $white-filter;
        }

        &:hover {
            background: $dark-purple;
            border-color: $dark-purple;
        }

        &:focus {
            outline: 2px solid $highlight;
        }
    }

</style>