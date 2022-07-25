<template>
  <div
    container="container-navbar"
    :style="{
      marginLeft: navbarStore.getters.open ? '0px' : '-245px',
    }"
  >
    <h2>System</h2>

    <div container="container-list-navigation">
      <ul>
        <li>
          <router-link to="/">
            <font-awesome-icon :icon="['fas', 'house-chimney']" />
            Home</router-link
          >
        </li>
        <li>
          <router-link to="/users" v-if="isAuth">
            <font-awesome-icon :icon="['fas', 'users']" />
            Users</router-link
          >
        </li>
      </ul>
    </div>

    <div container="container-bottom-navigation">
      <button
        v-if="isAuth"
        @click="closeSesion"
        class="btn btn-block btn-lg btn-danger"
      >
        Cerrar sesión
      </button>
      <router-link
        v-else
        to="/auth/login"
        class="btn-icon-right btn-block btn-lg btn-primary"
      >
        Acceder
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore as useNavbarStore } from "../../stores/vuex/navbar";
import { useStore as useUserStore } from "../../stores/vuex/user";
import { useRouter } from "vue-router";
import { computed, ComputedRef } from "vue";

const router = useRouter();
const navbarStore = useNavbarStore();
const userStore = useUserStore();

const closeSesion = (): void => {
  userStore.dispatch("closeSesion");
  router.push({ name: "home" });
  navbarStore.dispatch("close");
};

const isAuth: ComputedRef<string> = computed(
  (): string => userStore.getters.getUser.token
);
</script>

<style lang="scss" scoped>
@import "../../assets/styles/colors.scss";
@import "../../assets/styles/texts.scss";

$navbar-width: 245px;

div[container="container-navbar"] {
  width: $navbar-width;
  max-width: $navbar-width;
  min-width: $navbar-width;
  transition: margin-left 0.2s;
  margin-left: 0px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 4px 0px 4px rgba(43, 45, 55, 0.01);
  padding: 33px;
  box-sizing: border-box;
  border-right: 1px solid rgb(240, 240, 240);
  display: flex;
  flex-direction: column;

  & > h2 {
    font-size: 24px;
    margin-bottom: 50px;
    font-weight: 500;
  }

  & > div[container="container-list-navigation"] {
    flex: 1;
    & > ul {
      list-style: none;
      & > li {
        & > a {
          display: block;
          width: 100%;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
          text-decoration: none;
          @include multiline(1);
          padding: 10px 15px;
          box-sizing: border-box;

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }

          & > svg {
            color: $primaryColor;
            margin-right: 22px;
            font-size: 15px;
            width: 15px;
          }
        }
      }
    }
  }

  & > div[container="container-bottom-navigation"] {
  }
}
</style>
