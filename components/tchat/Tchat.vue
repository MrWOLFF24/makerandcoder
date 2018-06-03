<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>Chat Group</h3>
              <hr>
          </div>
          <div class="messages" v-for="(msg, index) in messages" :key="index">
                <div class="box">
                    <div class="content">
                        <p v-if="$store.state.authUser">
                        <strong>{{ $store.state.authUser.username }}</strong>
                        <br>
                        {{ msg.message }}
                        </p>
                        <p v-else>
                            <strong>User</strong>
                        </p>
                    </div>
                </div>
          </div>
      </div>

        <form @submit.prevent="sendMessage">
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" v-model="message" placeholder="Votre message">
                </p>
                <p class="control">
                    <a class="button is-info">Envoyer</a>
                </p>
            </div>
        </form>

  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            message: '',
            messages: [],
            socket : io('51.15.255.111:3000')
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        }
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
    }
}
</script>

<style scoped>
.field.is-grouped {
    padding: 5px;
}
.box {
    margin: 5px 40px;
}
.card-body {
    height: 80vh;
    overflow: auto;
}
</style>
