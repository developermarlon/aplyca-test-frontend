<template>
  <div container="content-screen">
    <Appbar :title="''" :goBack="true" />

    <div ref="scroll" container="content-scroll">
      <form @submit.prevent="handleSubmit()">
        <div container="header-form">
          <h2>Create todo</h2>
          <div @click="$router.go(-1)" id="button-return">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </div>
        </div>

        <AlertsComponent :alerts="alerts" />

        <div class="form-control">
          <label for="email">Title</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Enter a todo title"
            required
          />
        </div>

        <button
          class="btn-icon-right btn-block btn-lg btn-primary"
          :disabled="disabled"
          type="submit"
          style="height: 48px; margin-top: 35px"
        >
          {{ !disabled ? "Create" : "Waite a moment..." }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Appbar from "../../../../components/Appbar/index.vue";
import AlertsComponent from "../../../../components/Alerts/index.vue";
import {
  UserCreated,
  Todo as TodoEntry,
} from "../../../../ts/interfaces/index";
import { FormCreateTodo } from "../../../../ts/interfaces/index";
import { Alerts as AlertsType } from "../../../../ts/types/index";
import { onMounted, reactive, ref, Ref } from "vue";
import { useStore as useUserStore } from "../../../../stores/vuex/user";
import { useRouter, useRoute } from "vue-router";
import Todo from "../../../../models/Todo";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const todo = new Todo();
const disabled: Ref<boolean> = ref(false);
const alerts = reactive<AlertsType>([]);
const scroll = ref();

const form = reactive<FormCreateTodo>({
  title: null,
  userId: null,
});

const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

const handleSubmit = async () => {
  try {
    disabled.value = true;
    await sleep(1000);

    const result: TodoEntry = await todo.createTodo(form);

    alerts.length = 0;
    addAlert("Success", `Todo created successfully`, 200);
    restartForm();
  } catch (e: any) {
    addAlert("Error", e.message, 400);
  } finally {
    disabled.value = false;
    scroll.value.scrollTo({ top: 0, behavior: "smooth" });
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
  form.title = null;
};

onMounted(() => {
  form.userId = route.params.userId;
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/colors.scss";
@import "../../../../assets/styles/inputs.scss";
@import "../../../../assets/styles/buttons.scss";

div[container="content-screen"] {
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div[container="content-scroll"] {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    overflow-y: scroll;

    & > form {
      position: relative;
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

      & > div[container="header-form"] {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > div#button-return {
          width: 30px;
          height: 30px;
          border-radius: 20px;
          background-color: rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          & > svg {
            color: $color-medium-text;
          }
        }
      }

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
