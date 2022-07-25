<template>
  <DefaultTemplate>
    <template v-slot:router>
      <router-view></router-view>
    </template>
  </DefaultTemplate>
</template>

<script lang="ts" setup>
import DefaultTemplate from "./templates/DefaultTemplate.vue";
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "./stores/vuex/navbar";

const navbarStore = useStore();
const router = useRouter();
const route = useRoute();

watch(
  () => route.name,
  (res) => {
    navbarStore.dispatch("close");
  }
);
</script>

<style lang="scss" scoped></style>
