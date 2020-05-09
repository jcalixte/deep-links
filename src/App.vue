<template>
  <div id="app">
    <router-view />
    <div id="nav" class="buttons is-centered">
      <router-link class="button is-primary" to="/">Links</router-link>
      <router-link class="button is-primary" :to="{ name: 'LinkCreate' }"
        >New</router-link
      >
      <router-link class="button is-primary" to="/about">About</router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import './styles';

#app {
  margin: $spacing 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: $dark-primary;
    }
  }
}
</style>
