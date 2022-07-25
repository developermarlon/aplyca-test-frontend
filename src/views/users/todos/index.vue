<template>
  <div container="content-screen">
    <Appbar :title="'Todos'" />

    <div container="content-scroll" v-toucheabletable v-scrolltable>
      <router-link
        to="create"
        class="btn-icon-left btn-lg btn-primary"
        id="createUserButton"
        key="create-user"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add new todo
      </router-link>

      <List :todos="todos" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Appbar from "../../../components/Appbar/index.vue";
import List from "./List.vue";
import Todo from "../../../models/Todo";
import { onMounted, ref, Ref } from "vue";
import { Todo as TodoInterface } from "../../../ts/interfaces";
import { useRoute } from "vue-router";

const route = useRoute();
const todos: Ref<TodoInterface[]> = ref([]);
const todo_model = new Todo();

onMounted(() => {
  (async () => {
    const usersRequest = await todo_model.getTodosByUser(
      Number(route.params.userId)
    );
    todos.value = [...usersRequest];
  })();
  console.log();
});
</script>

<style lang="scss" scoped>
#createUserButton {
  width: 195px;
  height: 48px;
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
      & > a {
        margin-left: 15px;
      }
    }
  }
}
</style>
