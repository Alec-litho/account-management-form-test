import { defineStore } from "pinia";
import { guidGenerator } from "@/helpers/guidGenerator";

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
  actions: {
    updateAccountField(id: string, field: Partial<Account>) {
      this.accounts = this.accounts.map((acc) => (acc.id === id ? { ...acc, ...field } : acc));
      this.save();
    },
    initialize() {
      const saved = localStorage.getItem("accounts");
      if (saved) this.accounts = JSON.parse(saved);
    },
    addAccount() {
      this.accounts.push({
        id: guidGenerator(),
        labels: [],
        type: "LDAP",
        login: "",
        password: null,
        errors: { login: false, password: false, labels: false },
      });
      this.save();
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id);
      this.save();
    },
    updateAccount(account: Account) {
      const index = this.accounts.findIndex((a) => a.id === account.id);
      if (index > -1) this.accounts.splice(index, 1, account);
      this.save();
    },
    save() {
      localStorage.setItem("accounts", JSON.stringify(this.accounts));
    },
  },
});
