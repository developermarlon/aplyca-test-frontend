<template>
  <div v-if="true" container="container-alerts">
    <div
      v-for="(alert, idx) in props.alerts"
      :class="[
        alert.status === 200 && 'success',
        alert.status === 400 && 'error',
        alert.status === 500 && 'error',
      ]"
      :key="idx"
    >
      <div>{{ alert.title }}</div>
      <div>{{ alert.message }}</div>
      <div @click="deleteAlert(idx)">
        <font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Alerts as AlertsType } from "../../ts/types/index";

const props = defineProps<{
  alerts: AlertsType;
}>();

const deleteAlert = (idx: number): void => {
  props.alerts.splice(idx, 1);
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/texts.scss";
@import "../../assets/styles/colors.scss";

$success-color: #09b199;
$warning-color: #f0ad00;
$error-color: #fb726a;

@mixin alertTheme($color) {
  background-color: rgba($color, 0.2);
  & > div {
    &:nth-of-type(1) {
      color: $color;
    }
    &:nth-of-type(2) {
      color: rgba($color, 0.6);
    }
    &:nth-of-type(3) {
      border: 1px solid $color;
      width: 15px;
      height: 15px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      & > svg {
        color: $color;
        font-size: 10px;
        margin-left: 1px;
        margin-top: 1px;
      }
    }
  }
}

div[container="container-alerts"] {
  margin-bottom: 20px;
  margin-top: 20px;

  & > div {
    width: 100%;
    height: auto;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 8px;
    margin-bottom: 10px;
    position: relative;

    &.success {
      @include alertTheme($success-color);
    }

    &.warning {
      @include alertTheme($warning-color);
    }

    &.error {
      @include alertTheme($error-color);
    }

    & > div {
      &:nth-of-type(1) {
        font-weight: 500;
        font-size: 12px;
        margin-bottom: 5px;
      }

      &:nth-of-type(2) {
        font-weight: 500;
        font-size: 12px;
      }

      &:nth-of-type(3) {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
}
</style>
