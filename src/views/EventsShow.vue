<template>
  <div class="container">
    <h1>{{ event.name }}</h1>
    <div>
      Name: <input type="text" v-model="newPhotoName">
      Date: <input type="text" v-model="newPhotoWidth">
      Category: <input type="text" v-model="newPhotoHeight">
      <button v-on:click="createPhoto()">Create Photo</button>
    


    <h1>All Groups</h1>
    <div v-for="group in event.groups">
      <h2>{{ group.label }}</h2>
<!--       <img v-bind:src="photo.url"> -->
      <button v-on:click="showGroup(group)">Show Groups</button>
      <div v-if="currentGroup === group">
        <p>Width: {{ group.width }}</p>
        <p>Height: {{ group.height }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      event: {
              name: "",
              date: "",
              category: "",
              location: "", 
              groups: [
                      {
                        id: "",
                        size: "", 
                        event_id: "",
                        seating_quality: "",
                        open: "",
                        label: "",
                        formatted: {
                          meet_before: "",
                          drink_level: "",
                          gender_preference: ""
                        },
                        creater_id: ""
                      }
                      ]
              },
    };
  },
  created: function() {
        axios.get("/api/events/" + this.$route.params.id)
        .then(response => {
      this.event = response.data;
    });

  },
  methods: {
    createPhoto: function() {
      var params = {
        name: this.newPhotoName,
        width: this.newPhotoWidth,
        height: this.newPhotoHeight
      };
      axios.post("/api/photos", params).then(response => {
        this.photos.push(response.data);
        this.newPhotoName = "";
        this.newPhotoWidth = "";
        this.newPhotoHeight = "";
      });
    },
    showGroup: function(photo) {
      if (this.currentPhoto === photo) {
        this.currentPhoto = {};
      } else {
        this.currentPhoto = photo;
      }
    }
  }
};
</script>
