<template lang="html">
  <div v-if="message" id="app_message" :class="classMsg + ' ' + messageStatus">
      <button class="delete" @click="closeMessage($event)" aria-label="delete"></button>
        {{ message }}
  </div>
</template>

<script>
export default {
  created() {
    this.$ebus.$on("message-from-app", msg => {
      if (!msg) return this.resetMessage();
      if (this.checkMessage(msg)) {
        this.message = msg.txt;
        this.setMessageStyle(msg);
      } else {
        console.error("message mal formé: payload attendu => {txt: 'message', status: 'error|warning|success'}");
      }
    });
    this.$ebus.$on("reset-app-message", msg => {
      this.resetMessage();
    });
  },
  data() {
    return {
      classMsg: 'notification',
      message: null,
      statuses: ["is-danger", "is-success", "is-warning", "is-info"] // liste des status ok
    }
  },
  methods: {
    checkMessage(msg) {
      var errors = 0;
      errors += (typeof msg !== "object") ? 1 : 0;
      errors += (!msg.txt) ? 1 : 0;
      return errors === 0;
    },
    resetMessage() {
      this.message = null;
    },
    setMessageStyle(msg) {
      // on vérifie si le status est correct
      const found = this.statuses.find(s => {
        return s === msg.status; // retourne le status trouvé OU undefined
      });
      this.messageStatus = found ? found : "blank";
    },
    closeMessage(e) {
      this.message = null
    }
  }
}
</script>

<style lang="scss" scoped>
#app_message {
  max-width: 720px;
  transform: translateX(-50%);
  position: absolute;
  z-index: 2;
  top: 60px;
  left: 50%;
}
</style>
