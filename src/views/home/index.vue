<template>
  <div container="content-screen">
    <Appbar :title="'Home'" />

    <div container="content-scroll"></div>
  </div>
</template>

<script lang="ts" setup>
import Appbar from "../../components/Appbar/index.vue";
</script>

<style lang="scss" scoped>
#createUserButton {
  margin-top: 25px;
  margin-bottom: 15px;
  align-self: flex-start;
}

div[container="content-screen"] {
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div[container="content-scroll"] {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    overflow-x: scroll;
  }
}

@media (max-width: 900px) {
  div[container="content-screen"] {
    & > div[container="content-scroll"] {
      & > button {
        margin-left: 15px;
      }
    }
  }
}
</style>
