<template>
  <div class="container">
    <h1>All Events</h1>
    <div v-for="event in events">
      <router-link v-bind:to="'/events/' + event.id">
        <h2>{{ event.name }}</h2>
      </router-link>

      <p>Date: {{ event.date }}</p>
      <p>Category: {{ event.category }}</p>
      <p>Location: {{ event.location }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      events: []
    };
  },
  created: function() {
    axios.get("/api/events")
      .then(response => {
      this.events = response.data;
    }).catch(error => {
      this.$router.push("/login")
    });
  },
  methods: {}
};
</script>

