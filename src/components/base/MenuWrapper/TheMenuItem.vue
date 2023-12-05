<template>
  <li class="m-menu-item">
    <slot></slot>
  </li>
</template>
<style lang="scss">
.m-menu-item {
  outline: none;
  color: inherit;
  text-decoration: none;
  line-height: 30px;
  height: 30px;
  padding: 0 16px;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  &:hover {
    outline: 0;
    background-color: #e8e9ec;
    border-radius: 2px;
    color: #1aa4c8;
  }
}
</style>
