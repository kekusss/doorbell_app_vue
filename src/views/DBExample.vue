<template>
  <div>
    You are logged in
    <button @click="write" class="btn" >
      write
    </button>
    <button @click="push" class="btn" >
      push
    </button>
    <button @click="deleteItem" class="btn" >
      delete
    </button>
    <button @click="getItems" class="btn" >
      get
    </button>
    <button @click="getItemsOnce" class="btn" >
      get Once
    </button>
  </div>
  <!--  <b-container>-->
  <!--    <b-row>-->
  <!--      <b-alert>Yoy are logged in</b-alert>-->
  <!--    </b-row>-->
  <!--  </b-container>-->
</template>

<script>
import DbService from "../services/db.service";

export default {
  name: 'Dashboard',
  data() {
    return {
      user: {email: null, password: null},
      message: '',
    };
  },
  methods: {
    write() {
      DbService.writeUserData('1','keks','email@email.pl', 'url').then(() => {
        console.log("Created new item successfully!");
      })
          .catch(e => {
            console.log(e);
          });
    },
    push(){
      DbService.pushUserData('keks2','email@email.pl2', 'url2').then(() => {
        console.log("pushed new item successfully!");
      })
          .catch(e => {
            console.log(e);
          });
    },
    deleteItem(){
      DbService.delete('-MnFS4ZKKwT9AJbBuTjp').then(() => {
        console.log("removed item successfully!");
      })
          .catch(e => {
            console.log(e);
          });
    },
    getItems(){
      DbService.getUsers();
    },
    getItemsOnce(){
      DbService.getUsersOnce();
    }
  }
};
</script>