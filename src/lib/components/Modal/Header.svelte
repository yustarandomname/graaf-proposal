
<script lang="ts">

    // External dependencies
    import { getContext, onMount } from 'svelte';

    // Properties
    let { children } = $props();

    // Main
    let context: { open: () => void, close: () => void };

    $effect(() => {
        context = getContext('modalRoot');
    });

</script>


<!-- Markup -->


<div>
    {@render children()}
    <div class="flex-spacer"></div>
    <button class="exit-modal" aria-label="Close" onclick={ context.close }></button>
</div>


<!-- Styles -->


<style lang="scss">

    @use '$styles/variables.scss' as *;
    @use '$styles/palette.scss' as *;

    div {
        position: relative;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        padding: $card-thin-padding $card-thick-padding;
        border-radius: $border-radius $border-radius 0 0;

        button {
            position: relative;

            box-sizing: content-box;
            width: $icon-size;
            height: $icon-size;
            padding: 0.1rem;

            border: none;
            border-radius: $border-radius;
            background: none;
            cursor: pointer;
            
            &::before, &::after {
                content: '';

                position: absolute;
                translate: -50% -50%;
                rotate: 45deg;
                top: 50%;
                left: 50%;
                
                width: 100%;
                height: 2px;

                background-color: $dark-gray;
                transition: width $anim-duration $anim-easing;
            }

            &::after {
                rotate: -45deg;
            }

            &:hover {
                &::before, &::after {
                    width: 130%;
                }
            }

            &:focus-visible {
                outline: 2px solid $highlight;
            }
        }
    }

</style>