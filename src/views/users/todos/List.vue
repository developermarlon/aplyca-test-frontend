<template>
  <div container="container-results">
    <div container="contaier-title">
      <h2>Todo list</h2>
      <div>
        <img src="../../../assets/images/template/tables/menu-dots.png" />
        <div></div>
      </div>
    </div>

    <div container="contaier-table">
      <table cellspacing="0">
        <thead>
          <tr>
            <th width="60"><span>Id</span></th>
            <th width="60"><span>State</span></th>
            <th><span>Title</span></th>
            <th width="120"><span>Actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="todo in [...props.todos].sort((a, b) => {
              if (a.completed < b.completed) return 1;
              if (a.completed > b.completed) return -1;
              return 0;
            })"
          >
            <td>
              <p>{{ todo.id }}</p>
            </td>
            <td>
              <p>{{ todo.completed }}</p>
            </td>
            <td>
              <p>{{ todo.title }}</p>
            </td>

            <td style="display: flex">
              <router-link :to="`${todo.id}/edit/`" style="margin-right: 20px"
                >Edit</router-link
              >
              <router-link @click="deleteTodo(todo.id)" :to="''"
                >Delete</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Todo as TodoEntry } from "../../../ts/interfaces";
import Todo from "../../../models/Todo";
import { useRoute } from "vue-router";

const todo = new Todo();
const route = useRoute();
const props = defineProps<{
  todos: TodoEntry[];
}>();

const deleteTodo = (id: number) => {
  if (confirm("Are you sure you want to delete this todo?")) {
    todo.deleteTodo(Number(route.params.userId), id);
    const index = props.todos.findIndex((todo) => todo.id === id);
    props.todos.splice(index, 1);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/tables.scss";
@import "../../../assets/styles/colors.scss";

div[container="container-results"] {
  width: 100%;
  flex: 1;
  min-height: 200px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
  border-radius: 5px;
  padding: 30px;
  box-sizing: border-box;
  margin-bottom: 10px;

  & > div[container="contaier-title"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    & > h2 {
      font-size: 15px;
      color: $color-primary-text;
    }

    & > div {
      background: rgba(0, 0, 0, 0.05);
      width: 40px;
      height: 20px;
      position: relative;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover > div {
        display: block;
      }

      & > img {
        width: 16px;
      }

      & > div {
        display: none;
        position: absolute;
        z-index: 5;
        width: 200px;
        height: 70px;
        border-radius: 20px;
        background-color: #ffffff;
        top: 15px;
        right: 0px;
        box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }

  & > div[container="contaier-table"] {
    width: 100%;
    height: 92%;
    overflow-y: scroll;
    overflow-x: scroll;
    display: flex;

    & > table {
      width: 100%;
      height: auto;
      align-self: flex-start;

      @include defaultResults;
    }
  }
}

@media (max-width: 900px) {
  div[container="container-results"] {
    padding: 20px;
    margin-bottom: 0px;
    & > div[container="contaier-table"] {
      height: 93%;
    }
  }
}
</style>
