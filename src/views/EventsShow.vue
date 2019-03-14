<template>
  <div class="container">
    <div> {{event.groups}} </div>
    <h1>{{ event.name }}</h1>
    <div>
    <h1>All Groups</h1>
      <div v-for="group in event.groups">
      <button v-on:click="userEvent()">Show Groups</button>
          <h2>{{ group.label }}</h2>

        <div v-if="event.check_user_event">
<!--       <img v-bind:src="photo.url"> -->
          <div>
            <p>Size: {{ group.size }}</p>
            <p>Location: {{ group.location }}</p>
          </div>
          <div>
            <p>New Group</p>
            <form v-on:submit.prevent="submit()">
              <p>Label: <input type="text" v-model="newGroupLabel"></p>
              <p>Size: <input type="text" v-model="newGroupSize"></p>
              <p>Seating Quality: <input type="text" v-model="newGroupSeatingQuality"></p>
              <p>Open: <input type="text" v-model="newGroupOpen"></p>
              <p>Meeting Time <input type="text" v-model="newGroupMeetBefore"></p>
              <p>Drinks? <input type="text" v-model="newGroupDrinkLevel"></p>
              <p>Gender Preference <input type="text" v-model="newGroupGenderPreference"></p>
              <input type="submit" value="Create Group" class="btn btn-warning">
              <!-- <button v-on:click="createGroup()">Create Group</button> -->
            </form>
          </div>
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
              check_user_event: "",
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
      user_event_checker: "",
      newGroupSize: "",
      newGroupSeatingQuality: "",
      newGroupOpen: "",
      newGroupLabel: "",
      newGroupMeetBefore: "",
      newGroupDrinkLevel: "",
      newGroupGenderPreference: ""
    };
  },
  created: function() {
      axios.get("/api/events/" + this.$route.params.id)
      .then(response => {
      this.event = response.data;
    });

    //   axios.get("/api/user_events/")
    //   .then(response => {
    //     console.log(response.data);
    //   this.user_events = response.data;
    // });


  },
  methods: {
    submit: function() {
      var params = {
        size: this.newGroupSize,
        seating_quality: this.newGroupSeatingQuality,
        open: this.newGroupOpen,
        label: this.newGroupLabel,
        meet_before: this.newGroupMeetBefore,
        drink_level: this.newGroupDrinkLevel,
        gender_preference: this.newGroupGenderPreference
      };
      axios.post("/api/groups", params)
        .then(response => {
        this.event.groups.push(response.data);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
        // this.newPhotoName = "";
        // this.newPhotoWidth = "";
        // this.newPhotoHeight = "";
      // });
    },

    // userEvent: function() {
    //   var identity = this.event.id
    //   console.log(identity);
    //   this.user_events.forEach(function(element) {
    //     console.log(element);
    //     if (element.event_id === identity) {
    //       this.user_event_checker = true;
    //     }
    //   });
    // }

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
