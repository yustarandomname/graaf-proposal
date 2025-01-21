
<script>

    import { page } from '$app/state';

</script>

<!-- Markup -->

<div>
    <h1> { page.status } </h1>
    <p> { page.error?.message } </p>
</div>

<!-- Styles -->

<style lang="scss">

    @use '$styles/palette.scss' as *;

    div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        position: absolute;
        translate: -50%, -50%;
        top: 50%;
        left: 50%;

        h1 {
            color: $dark-gray;
        }

        p {
            color: $gray;
        }
    }

</style>