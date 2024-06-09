<template>
  <div class="getStarted">
    <p class="q-pt-md q-pl-sm" :class="[$q.screen.width < 1200 ? 'getStartedHeadlineMobile' : 'getStartedHeadlineDesktop']">Get Started.</p>
    <p class="q-pl-sm" style="color:#C4C4C4" :class="[$q.screen.width < 1200 ? 'getStartedDescriptionMobile' : 'getStartedDescriptionDesktop' ]">Use these Solana Foundation and community courses to begin your journey into Solana development.</p>
    <img class="getStartedImg1" :class="[$q.screen.width < 1200 ? 'getStartedImg1Mobile' : 'getStartedImg1Desktop']" src="../../assets/getStartedMainPage/getStartedImg1.png" alt="">

    <div class="q-pt-md q-gutter-sm q-pl-md " :class="[$q.screen.width < 1200 ? 'column' : 'row coursesDiv']">
      <div class="col"> 
        <p class="getStartedText">getStartedImg</p>
        <img :class="[$q.screen.width < 1200 ? 'mobileImg q-pt-md' : 'desktopImg']" src="../../assets/getStartedMainPage/getStartedImg2.png" alt="">
      </div>
      <div class="col">
        <img class="getStartedImg" :class="[$q.screen.width < 1200 ? 'mobileImg' : 'desktopImg']" src="../../assets/getStartedMainPage/getStartedImg3.png" alt="">
      </div>
      <div class="col">
        <img class="getStartedImg" :class="[$q.screen.width < 1200 ? 'mobileImg' : 'desktopImg']" src="../../assets/getStartedMainPage/getStartedImg4.png" alt="">

      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.getStarted{
    color: white;
}

.getStartedDescription{
    color: #C4C4C4;
}

.getStartedText{
  position: absolute;
  top: 15px;
}

.getStartedImg1{
  object-fit: cover;
    width: 100%;
}

.getStartedImg1Mobile{
  height: 200px;
}

.getStartedImg1Desktop{
  height: 370px;
} 

.desktopImg{
  width: 480px;
  /* border: solid red 1px; */
  max-height: 300px;
}

.mobileImg{
  width: 96%;
  max-height: 300px;
  padding-top: 25px;
}

.getStartedHeadlineMobile{
  font-size: 30px;
}

.getStartedHeadlineDesktop{
  font-size: 42px;
}

.getStartedDescriptionMobile{
  font-size: 14px;
}

.getStartedDescriptionDesktop{
  font-size: 28px;
}
</style>