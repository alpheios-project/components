<template>
  <div
    class="notification-area"
  >
    <div :class="notificationClass"
         class="notification-area"
         v-show="$store.state.ui.notification.text && $store.state.ui.notification.important"
    >
        <span
            @click="$store.commit(`ui/resetNotification`)"
            class="notification-area-close-btn"
        >
            <close-icon/>
        </span>

      <span v-html="$store.state.ui.notification.text"></span>
      <setting :classes="['notification-area--lang-switcher']"
               :data="settings.contentOptions.items.preferredLanguage"
               :show-title="false" @change="contentOptionChanged"
               v-show="$store.state.ui.notification.showLanguageSwitcher"></setting>
    </div>
    <div
        class="notification-area notification-area__notification--important"
        :data-count="$store.state.auth.notification.count"
        v-show="showLoginNotification">
           <span @click="$store.commit(`auth/resetNotification`)" class="notification-area-close-btn">
              <close-icon/>
           </span>
      <div class="notification-area-auth-msg"
           v-html="l10n.getMsg($store.state.auth.notification.text)"></div>
      <login btn-class="alpheios-button-tertiary"/>
    </div>
  </div>
</template>
<script>
// Embeddable SVG icons
import CloseIcon from '@/images/inline-icons/close.svg'
// UI modules
import Setting from '@/vue/components/setting.vue'
import Login from '@/vue/components/login.vue'
// Modules support
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'NotificationArea',
  inject: ['app', 'l10n', 'settings'],
  storeModules: ['ui', 'auth'],
  mixins: [DependencyCheck],
  components: {
    closeIcon: CloseIcon,
    setting: Setting,
    login: Login
  },

  computed: {
    notificationClass: function () {
      return this.$store.state.ui.notification.important
        ? 'notification-area__notification--important'
        : 'notification-area__notification'
    },

    // TODO: right now this prop sets a condition for displaying both the notification message and the login button.
    //       However, sometimes we cannot obtain the login URL and thus cannot show the button.
    //       Need to think how to handle such situations gracefully.
    showLoginNotification () {
      return Boolean(
        this.$store.state.auth.notification.text &&
        this.$store.state.auth.notification.showLogin &&
        (this.$store.state.auth.notification.count === 1 || this.$store.state.auth.notification.count % 10 === 0)
      )
    }
  },

  methods: {
    contentOptionChanged: function (name, value) {
      this.app.contentOptionChange(name, value)
    }
  }
}
</script>
<style lang="scss">
  .notification-area {
    display: none;
    position: relative;
    padding: uisize(10px) uisize(20px);
    flex: 0 0 uisize(60px);
    overflow: hidden;
  }

  // Notifications: classes that are universal for both panel and popup
  .notification-area__notification {
    color: var(--alpheios-color-neutral-lightest);
    background: var(--alpheios-color-muted);
  }

  .notification-area__notification--important {
    color: var(--alpheios-color-neutral-lightest);
    background: var(--alpheios-color-vivid);
  }

  .notification-area-auth-msg {
    margin-bottom: uisize(10px);
  }

  .notification-area-close-btn {
    position: absolute;
    right: uisize(5px);
    top: uisize(5px);
    display: block;
    width: uisize(20px);
    height: uisize(20px);
    margin: 0;
    cursor: pointer;
    fill: var(--alpheios-color-neutral-lightest);
    stroke: var(--alpheios-color-neutral-lightest);
  }

  .notification-area-close-btn:hover,
  .notification-area-close-btn:focus {
    fill: var(--alpheios-color-neutral-light);
    stroke: var(--alpheios-color-neutral-light);
  }

  [data-notification-visible="true"] .notification-area {
    display: block;
  }

  .notification-area--lang-switcher {
    font-size: textsize(12px);
    float: right;
    margin: textsize(-20px) textsize(10px) 0 0;
    display: inline-block;
  }

  .notification-area--lang-switcher .alpheios-select {
    width: textsize(120px);
    height: textsize(25px);
  }
</style>
