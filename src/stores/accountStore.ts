import { defineStore } from "pinia";

export interface AccountLabel {
  text: string;
}

export interface Account {
  id: string;
  labels: AccountLabel[];
  type: "LDAP" | "local";
  login: string;
  password: string | null;
  errors: {
    login: boolean;
    password: boolean;
    labels: boolean;
  };
}

export const useAccountStore = defineStore("accounts", {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {},
});
