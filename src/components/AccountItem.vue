<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Метки (разделяйте ;)
        <span class="text-gray-400 text-sm">(необязательно)</span>
      </label>
      <input class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <p class="text-red-600 text-sm mt-1">Некоторые метки превышают 50 символов</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"> Тип учетной записи </label>
      <select class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option value="LDAP">LDAP</option>
        <option value="local">Локальная</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"> Логин <span class="text-red-500">*</span> </label>
      <input class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <p class="text-red-600 text-sm mt-1">Обязательное поле (максимум 100 символов)</p>
    </div>

    <!-- Password -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"> Пароль <span class="text-red-500">*</span> </label>
      <input type="password" class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <p class="text-red-600 text-sm mt-1">Обязательное поле (максимум 100 символов)</p>
    </div>

    <!-- Delete Button -->
    <div class="flex justify-end">
      <button class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/accountStore";

const props = defineProps<{
  accountId: string;
}>();

const store = useAccountStore();
</script>
