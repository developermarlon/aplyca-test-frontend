<template>
  <div container="general-container">
    <Navbar />
    <div container="screen-container">
      <div>
        <slot name="router" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "../components/Navbar/index.vue";
</script>

<style lang="scss" scoped>
div[container="general-container"] {
  width: 100%;
  display: flex;
  height: 100vh;

  & > div[container="screen-container"] {
    flex: 1;
    display: flex;
    justify-content: center;

    & > div {
      margin: 0px 36px;
      width: 100%;
      max-width: 100%;
      max-width: 1200px;
    }
  }
}

@media (max-width: 900px) {
  div[container="general-container"] {
    & > div[container="screen-container"] {
      & > div {
        margin: 0px 0px;
      }
    }
  }
}
</style>
