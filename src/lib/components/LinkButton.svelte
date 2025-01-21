
<script lang="ts">

    let { 
        children, 
        src = undefined,
        type = undefined,
        href = undefined,        
        onclick = undefined
    } = $props();

</script>


<!-- Markup -->


{#if href}
    <a { href } class="button">
        {#if src} <img { src } alt="" /> {/if}
        <b> {@render children()} </b>
    </a>
{:else}
    <button { type } { onclick } class="button" onmousedown={ event => event.preventDefault() }>
        {#if src} <img { src } alt="" /> {/if}
        <b> {@render children()} </b>
    </button>
{/if}


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    .button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;

        padding: $input-thin-padding $input-thick-padding;
        
        border: none;
        border-radius: $border-radius;
        background: none;

        color: $purple;
        cursor: pointer;

        b {
            padding-bottom: 0.1rem;
        }
        
        img {
            height: $icon-size;
            filter: $purple-filter;
        }

        &:hover {
            color: $dark-purple;
            text-decoration: underline;

            img {
                filter: $dark-purple-filter;
            }
        }

        &:focus {
            outline: 2px solid $highlight;
        }
    }

</style>