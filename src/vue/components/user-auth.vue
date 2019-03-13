<template>
  <div>
    <button @click="logIn" class="uk-button uk-button-primary" v-show="! this.$store.state.auth.isAuthenticated">
      {{ l10n.getMsg(`AUTH_LOG_IN_BTN_LABEL`) }}
    </button>
    <button @click="logOut" class="uk-button uk-button-primary" v-show="this.$store.state.auth.isAuthenticated">
      {{ l10n.getMsg(`AUTH_LOG_OUT_BTN_LABEL`) }}
    </button>
    <div class="alpheios-user-auth__message-box" v-show="this.$store.state.auth.message">
      {{ l10n.getMsg(auth.getMsg()) }}
    </div>
    <div class="alpheios-user-auth__user-info-box" v-if="this.$store.state.auth.isAuthenticated">
      <div class="alpheios-user-auth__user-info-item-box">
        <div class="alpheios-user-auth__user-info-item-name">
          {{ l10n.getMsg(`AUTH_PROFILE_NICKNAME_LABEL`) }}:
        </div>
        <div class="alpheios-user-auth__user-info-item-value">
          {{ this.$store.state.auth.userNickName ? this.$store.state.auth.userNickName: `&mdash;` }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'UserAuth',
  inject: {
    l10n: 'l10n',
    auth: { from: 'auth', default: null } // This module is options
  },
  // inject: ['auth', 'l10n'], // Specify what API modules are we going to use
  data: function () {
    return {
    }
  },

  methods: {
    logIn: function () {
      this.auth.authenticate()
    },

    logOut: function () {
      this.auth.logout()
    }
  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";

  .alpheios-user-auth__message-box {
    margin-top: 20px;
    padding: 10px;
    background: $alpheios-logo-color;
  }

  .alpheios-user-auth__user-info-box {
    margin-top: 20px;
    display: flex;
    border-top: 1px solid $alpheios-link-color-dark-bg;
    flex-direction: column;
  }

  .alpheios-user-auth__user-info-item-box {
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    border-bottom: 1px solid $alpheios-link-color-dark-bg;
  }

  .alpheios-user-auth__user-info-item-name {
    flex: 1 1;
  }

  .alpheios-user-auth__user-info-item-value {
    font-weight: 700;
    flex: 1 1;
    color: $alpheios-link-color !important;
    text-align: right;
  }
</style>
