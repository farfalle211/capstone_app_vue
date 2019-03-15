<template>
  <div class="groups-show">
    <div class="container">
      <h1>{{ group.label }}</h1>
      <h2>{{ group.formatted.event_name }} <br> ({{group.formatted.event_date}})</h2>
      <p>Meet Before?: {{ group.formatted.meet_before }}</p>
      <p>Drink Level: {{ group.formatted.drink_level }}</p>
      <p>Gender Preference: {{ group.formatted.gender_preference }}</p>
      <!-- <button v-on:click="destroyGroup()" class="btn btn-danger">Delete</button> -->
      </div>
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      group: {
              size: "",
              event_id: "",
              seating_quality: "",
              open: "",
              label: "",
              meet_before: "",
              drink_level: "",
              gender_preference: "",
              creater_id: "",
              formatted: {
                          meet_before: "",
                          drink_level: "",
                          gender_preference: "",
                          event_date: "",
                          event_name: ""
                          }
              }
    };
  },
  created: function() {
    axios.get("/api/groups/" + this.$route.params.id)
    .then(response => {
      this.group = response.data;
    });
  },
  methods: {
    // destroyGroup: function() {
    //   axios.delete("/api/groups/" + this.group.id)
    //     .then(response => {
    //       console.log("Success", response.data);
    //       this.$router.push("/"); 
    //     });
    // },
  }
};
</script>