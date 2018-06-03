<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">{{ title }}</h1>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HeroTitle',
    props: {
        title: {
            type: String,
            required: true
        },
    }
}
</script>
