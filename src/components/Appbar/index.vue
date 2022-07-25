<template>
  <div container="container-appbar">
    <div>
      <div
        @click="navbarStore.dispatch('toggle')"
        container="container-button-menu"
      >
        <img :src="IconLeft" alt="Menu icon" />
      </div>

      <h1>{{ props.title }}</h1>
    </div>
    <div v-if="isAuth" key="user-logged">
      <img :src="Avatar" alt="Avatar" />
      <h1>{{ userStore.getters.getUser.name }}</h1>
    </div>
    <router-link
      to="/auth/login"
      v-else
      key="button-login"
      id="button-login"
      class="btn-icon-right btn-lg btn-primary"
    >
      Acceder
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import IconLeft from "../../assets/images/template/navbar/menu-left.svg";
import Avatar from "../../assets/images/template/navbar/avatar.png";
import { useStore as useNavbarStore } from "../../stores/vuex/navbar";
import { useStore as useUserStore } from "../../stores/vuex/user";
import { computed, ComputedRef, onMounted } from "vue";

const navbarStore = useNavbarStore();
const userStore = useUserStore();

const props = defineProps<{
  title: string;
}>();

const isAuth: ComputedRef<string> = computed(
  (): string => userStore.getters.getUser.token
);
</script>

<style lang="scss" scoped>
@import "../../assets/styles/colors.scss";
@import "../../assets/styles/texts.scss";
@import "../../assets/styles/buttons.scss";

div[container="container-appbar"] {
  width: 100%;
  height: 74px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(43, 45, 55, 0.0105441);
  padding: 0px 31px 0px 31px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > div:nth-of-type(1) {
    display: flex;
    align-items: center;

    div[container="container-button-menu"] {
      margin-right: 17px;
      border-radius: 100px;
      transition: box-shadow 0.15s, background-color 0.1s;
      width: 15px;
      height: 15px;
      cursor: pointer;

      &:hover {
        box-shadow: 0px 0px 0px 10px rgba(0, 0, 0, 0.06);
        background-color: rgba(0, 0, 0, 0.06);
      }

      & > img {
        width: 100%;
        height: 100%;
      }
    }

    & > h1 {
      font-weight: 500;
      font-size: 14px;
      color: $color-medium-text;
      @include multiline(1);
    }
  }

  & > div:nth-of-type(2) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;

    & > img {
      width: 32px;
      margin-right: 15px;
    }

    & > h1 {
      font-weight: 500;
      font-size: 14px;
      color: $color-medium-text;
      @include multiline(1);
    }
  }

  & > a#button-login {
    width: 150px;
    &.router-link-exact-active {
      display: none;
    }
  }
}
</style>
