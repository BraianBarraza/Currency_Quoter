<template>
  <div class="alert">
    <slot></slot>
  </div>
</template>

<style>
.alert {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--white);
  background-color: rgb(174, 0, 0);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4rem;
  padding: .5rem
}
</style>