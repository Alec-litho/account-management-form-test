<template>
  <div class="space-y-4" v-if="account">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Метки (разделяйте ;)
        <span class="text-gray-400 text-sm">(необязательно)</span>
      </label>
      <input
        :value="labelsInput"
        @input="updateLabels(($event.target as HTMLInputElement).value)"
        @blur="validateLabels"
        :class="{ 'border-red-500': account.errors.labels }"
        class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <p v-if="account.errors.labels" class="text-red-600 text-sm mt-1">Некоторые метки превышают 50 символов</p>
      <p v-else class="text-gray-500 text-sm mt-1">Пример: метка1; метка2</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"> Тип учетной записи </label>
      <select
        :value="account.type"
        @change="updateField('type', ($event.target as HTMLSelectElement).value)"
        class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="LDAP">LDAP</option>
        <option value="local">Локальная</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"> Логин <span class="text-red-500">*</span> </label>
      <input
        :value="account.login"
        @input="updateField('login', ($event.target as HTMLInputElement).value)"
        @blur="validateLogin"
        :class="{ 'border-red-500': account.errors.login }"
        class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <p v-if="account.errors.login" class="text-red-600 text-sm mt-1">Обязательное поле (максимум 100 символов)</p>
    </div>
    <div v-if="account.type === 'local'">
      <label class="block text-sm font-medium text-gray-700 mb-1"> Пароль <span class="text-red-500">*</span> </label>
      <input
        :value="account.password || ''"
        @input="updateField('password', ($event.target as HTMLInputElement).value)"
        type="password"
        @blur="validatePassword"
        :class="{ 'border-red-500': account.errors.password }"
        class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <p v-if="account.errors.password" class="text-red-600 text-sm mt-1">Обязательное поле (максимум 100 символов)</p>
    </div>
    <div class="flex justify-end">
      <button @click="store.removeAccount(account.id)" class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAccountStore } from "@/stores/accountStore";
import type { Account } from "@/stores/accountStore";

const props = defineProps<{
  accountId: string;
}>();

const store = useAccountStore();

const account = computed(() => store.accounts.find((a) => a.id === props.accountId));

const labelsInput = computed(() => account.value?.labels.map((l) => l.text).join(";") || "");

const updateField = <K extends keyof Account>(field: K, value: Account[K]) => {
  if (!account.value) return;

  store.updateAccountField(props.accountId, {
    [field]: value,
  });
};

const updateLabels = (value: string) => {
  const labels = value.split(";").map((l) => ({ text: l.trim() }));

  store.updateAccountField(props.accountId, { labels });
};

const validateLabels = () => {
  if (!account.value) return;

  const isValid = account.value.labels.every((l) => l.text.length <= 50);
  store.updateAccountField(props.accountId, {
    errors: {
      ...account.value.errors,
      labels: !isValid,
    },
  });
};

const validateLogin = () => {
  if (!account.value) return;

  const isValid = !!account.value.login.trim() && account.value.login.length <= 100;

  store.updateAccountField(props.accountId, {
    errors: {
      ...account.value.errors,
      login: !isValid,
    },
  });
};

const validatePassword = () => {
  if (!account.value || account.value.type === "LDAP") return;

  const isValid = !!account.value.password?.trim() && account.value.password.length <= 100;

  store.updateAccountField(props.accountId, {
    errors: {
      ...account.value.errors,
      password: !isValid,
    },
  });
};
</script>
