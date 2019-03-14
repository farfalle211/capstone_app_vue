<template>
  <div class="container">
    <h1>{{ event.name }}</h1>
    <div>
    <!--   Name: <input type="text" v-model="newPhotoName">
      Date: <input type="text" v-model="newPhotoWidth">
      Category: <input type="text" v-model="newPhotoHeight">
      <button v-on:click="createPhoto()">Create Photo</button> -->
    


    <h1>All Groups</h1>
      <div v-for="group in event.groups">
      <button v-on:click="userEvent()">Show Groups</button>
          <h2>{{ group.label }}</h2>
        <div v-if="user_event_checker">
<!--       <img v-bind:src="photo.url"> -->
          <p>Size: {{ group.size }}</p>
          <p>Location: {{ group.location }}</p>
        </div>
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
      user_events: [],
      user_event_checker: ""
    };
  },
  created: function() {
      axios.get("/api/events/" + this.$route.params.id)
      .then(response => {
      this.event = response.data;
    });

      axios.get("/api/user_events/")
      .then(response => {
        console.log(response.data);
      this.user_events = response.data;
    });


  },
  methods: {
    // createPhoto: function() {
    //   var params = {
    //     name: this.newPhotoName,
    //     width: this.newPhotoWidth,
    //     height: this.newPhotoHeight
    //   };
    //   axios.post("/api/photos", params).then(response => {
    //     this.photos.push(response.data);
    //     this.newPhotoName = "";
    //     this.newPhotoWidth = "";
    //     this.newPhotoHeight = "";
    //   });
    // },

    userEvent: function() {
      var identity = this.event.id
      console.log(identity);
      this.user_events.forEach(function(element) {
        console.log(element);
        if (element.event_id === identity) {
          this.user_event_checker = true;
        }
      });
    }

    // showGroup: function(photo) {
    //   if (this.currentPhoto === photo) {
    //     this.currentPhoto = {};
    //   } else {
    //     this.currentPhoto = photo;
    //   }
    // }
  }
};
</script>
