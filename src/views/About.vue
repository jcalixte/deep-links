<template>
  <div class="about">
    <h1 class="title is-1">Deep Links</h1>
    <p>
      App Deep Link lets you easily test your app's deep links with an easy way
      and lets you manage multiple apps and links.
    </p>
    <section>
      <p>
        Icons made by
        <a href="http://www.creaticca.com/" title="Creaticca Creative Agency"
          >Creaticca Creative Agency</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a
        >.
      </p>
    </section>
    <p>
      made with <span><i class="gg-heart"></i></span> by
      <a href="https://github.com/jcalixte" target="_blank" rel="noreferrer"
        >Julien</a
      >
      on
      <a
        href="https://github.com/jcalixte/deep-links"
        target="_blank"
        rel="noreferrer"
        ><i class="gg-git-branch"></i></a
      >.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables';

.about {
  max-width: 800px;
  margin: auto;
  text-align: center;
  p {
    margin: $spacing 0;
  }
  a,
  span {
    display: inline-block;
  }
  span {
    margin: 0 $spacing / 4;
  }
}
</style>
