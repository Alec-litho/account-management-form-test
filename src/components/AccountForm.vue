<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Управление учетными записями</h1>
    <button @click="store.addAccount" class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      + Добавить учетную запись
    </button>

    <div class="space-y-4">
      <div v-for="account in store.accounts" :key="account.id" class="p-4 border rounded-lg shadow-sm bg-white">
        <AccountCard :account-id="account.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/accountStore";
import AccountCard from "@/components/AccountCard.vue";

const store = useAccountStore();
store.initialize();
</script>
