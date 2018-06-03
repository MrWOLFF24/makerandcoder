<template>
  <section class="section">
    <div class="carousel-wrapper">
      <span id="item-1"></span>
      <span id="item-2"></span>
      <span id="item-3"></span>
      <div class="carousel-item item-1">
        <h2>EVER TRIED. EVER FAILED. NO MATTER. TRY AGAIN. FAIL AGAIN. FAIL BETTER.</h2>
        <a class="arrow arrow-prev" href="#item-3"></a>
        <a class="arrow arrow-next" href="#item-2"></a>
      </div>

      <div class="carousel-item item-2">
        <h2>MAKERS GONNA MAKE</h2>
        <a class="arrow arrow-prev" href="#item-1"></a>
        <a class="arrow arrow-next" href="#item-3"></a>
      </div>

      <div class="carousel-item item-3">
        <h2>LET'S BUILD THE CHANGE WE WISH TO SEE</h2>
        <a class="arrow arrow-prev" href="#item-2"></a>
        <a class="arrow arrow-next" href="#item-1"></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {padding: 0;}
.carousel-wrapper{
  height:93vh;
  position:relative;
  width:100%;
  margin:0 auto;
}
.carousel-item{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  padding:25px 50px;
  opacity:0;
  transition: all 0.5s ease-in-out;
}
.carousel-item h2 {
  color:rgba(238, 121, 26, 1);
  font-size: 3rem;
  margin-top: 25vh;
  padding: 30px;
  text-align: center;
}
.arrow{
  position:absolute;
  top:0;
  display:block;
  width:50px;
  height:100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background: url("~assets/images/play-button.svg") 50% 50% / 20px no-repeat;
}
.arrow-prev{
  left:5px;
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.arrow-next{
  right:5px;
}
.light{
  color:white;
}
@media (max-width: 480px) {
  .carousel-item h2 {
    color: #FD7836;
    margin-top: 20vh;
    font-size: 1.8rem;
    text-align: center;
  }
  .arrow, .light .arrow {
    background-size: 10px;
    background-position: 10px 50%;
  }
}
/*Select every element*/
[id^="item"] {
    display: none;
  }
.item-1 {
    z-index: 2;
    opacity: 1;
  background:url('~assets/images/coder_maker_2.jpg');
  background-size:cover;
  }
.item-2{
  background:url('~assets/images/coder_maker_1.jpg');
   background-size:cover;
}
.item-3{
  background:url('~assets/images/coder_maker_3.jpg');
   background-size:cover;
}
*:target ~ .item-1 {
    opacity: 0;
  }
#item-1:target ~ .item-1 {
    opacity: 1;
  }
#item-2:target ~ .item-2, #item-3:target ~ .item-3 {
    z-index: 3;
    opacity: 1;
  }
</style>

