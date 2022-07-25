<template>
  <div container="content-screen">
    <Appbar :title="'Users'" />

    <div container="content-scroll" v-toucheabletable v-scrolltable>
      <router-link
        to="/users/create"
        class="btn-icon-left btn-lg btn-primary"
        id="createUserButton"
        key="create-user"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        Add new user
      </router-link>

      <List :users="users" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Appbar from "../../components/Appbar/index.vue";
import List from "./List.vue";
import User from "../../models/User";
import { onMounted, ref, Ref } from "vue";
import { User as UserInterface } from "../../ts/interfaces";

const users: Ref<UserInterface[]> = ref([]);
const user_model = new User();

onMounted(() => {
  (async () => {
    const usersRequest = await user_model.getAllUsers();
    users.value = [...usersRequest];
  })();
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
