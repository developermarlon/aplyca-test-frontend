<template>
  <div container="content-screen">
    <Appbar :title="''" />

    <div container="content-scroll">
      <form @submit.prevent="login()">
        <h2>Login</h2>

        <AlertsComponent :alerts="alerts" />

        <div class="form-control">
          <label for="email">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            placeholder="Digite su correo"
            required
          />
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            placeholder="***********"
            required
          />
        </div>

        <button
          class="btn-icon-right btn-block btn-lg btn-primary"
          :disabled="disabled"
          type="submit"
          style="height: 48px"
        >
          {{ !disabled ? "Acceder" : "Espera un momento..." }}
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Appbar from "../../components/Appbar/index.vue";
import AlertsComponent from "../../components/Alerts/index.vue";
import { UserLogged } from "../../ts/interfaces/index";
import { FormLogin } from "../../ts/types/index";
import { Alerts as AlertsType } from "../../ts/types/index";
import { reactive, ref, Ref } from "vue";
import User from "../../models/User";
import { useStore as useUserStore } from "../../stores/vuex/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const user = new User();
const disabled: Ref<boolean> = ref(false);
const alerts = reactive<AlertsType>([]);
const form = reactive<FormLogin>({ email: null, password: null });

const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

const login = async () => {
  try {
    disabled.value = true;
    await sleep(1000);

    const result: UserLogged = await user.loginApi(form);
    userStore.dispatch("openSesion", result);
    router.push({ name: "users" });
    restartForm();
  } catch (e: any) {
    addAlert("Error", e.message, 400);
  } finally {
    disabled.value = false;
  }
};

const addAlert = (title: string, message: string, status: number): void => {
  alerts.push({
    title,
    message,
    status,
  });
};

const restartForm = (): void => {
  form.email = null;
  form.password = null;
  alerts.length = 0;
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/colors.scss";
@import "../../assets/styles/inputs.scss";
@import "../../assets/styles/buttons.scss";

div[container="content-screen"] {
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div[container="content-scroll"] {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    overflow-y: scroll;

    & > form {
      width: 100%;
      max-width: 400px;
      background-color: #ffffff;
      height: auto;
      min-height: 100px;
      border-radius: 10px;
      box-shadow: 0px 4px 4px rgb(43 45 55 / 1%);
      padding: 30px;
      box-sizing: border-box;
      margin: 30px 30px 30px 30px;

      & > h2 {
        font-size: 22px;
        color: $color-primary-text;
        margin-bottom: 20px;
      }

      & > button[type="submit"] {
        margin-top: 15px;
      }
    }
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
