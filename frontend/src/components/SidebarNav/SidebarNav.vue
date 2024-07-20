<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        :prepend-avatar=user.avatar
        :subtitle="user.email"
        :title="user.fullname"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-chart-line" title="Overview" link :to="{ name: 'overview' }" value="overview"></v-list-item>
      <v-list-item prepend-icon="mdi-bullseye-arrow" title="Investments" value="starred"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const user = ref({
  fullname: "Jane Doe",
  email: "test@test.com",
  avatar: "https://randomuser.me/api/portraits/women/75.jpg"
})
</script>