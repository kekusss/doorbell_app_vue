<template>
  <div class="home">
    <b-container>
      <b-row align-content="center" class="mt-150">
        <div class="col-md-8 offset-md-2 header">
          <h1>The Enterprise Smart Lock</h1>
          <blockquote class="mt-5">
            Open, control and manage access to your doors. In real time, from any device.
            View access history with photos. Protect your rooms at the highest level.
          </blockquote>
        </div>
      </b-row>
      <b-row align-content="center">
        <div class="col-md-8 offset-md-2 mt-150">
          <img alt="logo" src="../assets/logo.png">
        </div>
      </b-row>
    </b-container>

  </div>
</template>
<style lang="scss">
  .header{
    font-family: 'Rubik', sans-serif;
    color: #434343;
  }
  .mt-150{
    margin-top: 90px;
    @media (min-width: 768px) {
      margin-top: 150px;
    }
  }
</style>
<script>

export default {
  name: 'Home',
}
</script>
