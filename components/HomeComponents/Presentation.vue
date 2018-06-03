<template>
    <section class="section is-platform is-medium" id=platform>
        <div class=container>
            <div class="columns is-centered">
                <div class="column is-12 is-10-fullhd">
                    <div class="columns is-vcentered">
                        <div class="column is-6 is-flex">
                            <div class="section-media is-flex">
                                <div class=screens>
                                    <figure class="screen">
                                        <img class="img" role=presentation src="~assets/images/ordi.jpg" srcset="~assets/images/tablette.jpg 320w, ~assets/images/ordi.jpg 678w" sizes="(min-width: 600px) 600px, 100vw"/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class=section-header>
                                <h2 class="title is-2 is-spaced"> A platform for Makers </h2>
                                <p class="subtitle is-5"> Être un maker, c'est bidouiller, réparer, fabriquer... en se servant des outils technologiques. </p>
                                <hr class="spacer is-2"/>
                            </div>
                            <div class=section-body>
                                <div class=vertical-tabs>
                                    <div class="tab is-active">
                                        <h3 class="title is-4"> "Do It Yourself" ? </h3>
                                        <p class=subtitle> À la différence du "Do It Yourself" ou plus généralement, du simple fait de fabriquer des choses (ce que l'Homme fait depuis la Préhistoire), le mot "maker" désigne celui qui fabrique, détourne... et utilise la technologie pour le faire. </p>
                                    </div>
                                    <div class=tab>
                                        <h3 class="title is-4"> Un véritable état d'esprit </h3>
                                        <p class=subtitle> La culture maker ne se contente pas d'être un ensemble de pratiques individuelles. À l'instar du hack, elle a aussi son code d'éthique : tout le monde peut apprendre et il y a un bricoleur en chacun de nous. </p>
                                    </div>
                                    <div class=tab>
                                        <h3 class="title is-4"> Des fab labs partout </h3>
                                        <p class=subtitle> À Paris par exemple, il y a – entre autres – le Fab Club, le Lorem, le Fab Lab de la Cité des Sciences, le Maker/Seine, le WoMa... Ces espaces attirent de plus en plus de curieux. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.img {
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
}
@media (max-width: 770px) {
  .post-preview {
    height: 100%;
    width: auto;
  }
}
</style>
