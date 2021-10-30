<template>
  <div>
    You are logged in

    <div>
      <iframe src="https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4" frameborder="0"></iframe>
    </div>
    <div>
      <b-button type="danger" @click="sendOpenSignal">
        Open door
      </b-button>
    </div>
  </div>
<!--  <b-container>-->
<!--    <b-row>-->
<!--      <b-alert>Yoy are logged in</b-alert>-->
<!--    </b-row>-->
<!--  </b-container>-->
</template>

<script>

  export default {
    name: 'Dashboard',
    data() {
      return {
        user: {email: null, password: null},
        message: '',
      };
    },
    methods: {
      sendOpenSignal(){
        alert('opened');
      }
    }
  };
</script>