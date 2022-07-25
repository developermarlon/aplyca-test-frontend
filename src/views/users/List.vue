<template>
  <div container="container-results">
    <div container="contaier-title">
      <h2>Users</h2>
      <div>
        <img src="../../assets/images/template/tables/menu-dots.png" />
        <div></div>
      </div>
    </div>

    <div container="contaier-table">
      <table cellspacing="0">
        <thead>
          <tr>
            <th><span>Name</span></th>
            <th><span>Username</span></th>
            <th><span>Email</span></th>
            <th><span>Adress</span></th>
            <th><span>Company</span></th>
            <th><span>Options</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in [...props.users].reverse()">
            <td>
              <p>{{ user.name }}</p>
            </td>
            <td>
              <p>{{ user.username }}</p>
            </td>
            <td>
              <p>{{ user.email }}</p>
            </td>
            <td>
              <p>{{ user.address.street }}</p>
            </td>
            <td>
              <p>{{ user.company.name }}</p>
            </td>
            <td>
              <router-link :to="`/users/${user.id}/todos/`"
                >View todos</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "../../ts/interfaces";
const props = defineProps<{
  users: User[];
}>();
</script>

<style lang="scss" scoped>
@import "../../assets/styles/tables.scss";
@import "../../assets/styles/colors.scss";

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
