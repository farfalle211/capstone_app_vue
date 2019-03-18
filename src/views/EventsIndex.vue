<template>
  <div class="container">
    <h1>All Events</h1>
    <!-- <table>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Date</th>
          <th>Category</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events">
            <td>{{event.name}}</td>
            <td>{{event.date}}</td>
            <td>{{event.category}}</td>
            <td>{{event.location}}</td>
          
        </tr>
      </tbody>
    </table> -->

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

