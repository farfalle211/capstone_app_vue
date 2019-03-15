<template>
  <div class="container">
  <!--   <div> {{event.groups}} </div> -->
    <h2>{{ event.name }}</h2>
    <p>Date: {{ event.date }}</p>
    <p>Category: {{ event.category }}</p>
    <p>Location: {{ event.location }}</p>
    <!-- <div>{{event.user_event_by_user}}</div> -->
      <div v-if="!event.user_event_by_user">

        <p>Express interest below:</p>
        <form v-on:submit.prevent="submit_interest()">

        <div>Have you purchased tickets?</div>
         <div class="form-group">
            <label>Confirmation Status: </label> 
          <select v-model="newConfirmationStatus" name="confirmation_status">
            <option value="not_purchased">Not Purchased</option>
            <option value="purchased">Purchased</option>
          </select>
        </div>

        <div class="form-group">
           <label>Seating Quality: </label>
          <select name="seating_quality" v-model="newSeatingQuality">
            <option value="good_seats">Good Seats</option>
            <option value="nosebleed">Nosebleed</option>
          </select>
        </div>

          <input type="submit" class="btn btn-primary" value="I'm interested!">
        </form>
      </div>

    <h2>Groups</h2>
      <div v-if="event.user_event_by_user">
      <!-- <button v-on:click="userEvent()">Show Groups</button> -->
        <div v-for="group in event.groups">
          <div>
            <router-link :to="'/groups/' + group.id">
              <h2>{{ group.label }}</h2>
            </router-link>
            <p>Size: {{ group.size }}</p>
            <p>Meet Before?: {{ group.formatted.meet_before }}</p>
            <p>Drink Amount: {{ group.formatted.drink_level }}</p>
            <p>Gender Preference: {{ group.formatted.gender_preference }}</p>
          </div>
        </div>
      </div>
      <div v-if="event.user_event_by_user">

        <p>Or...create a new group!</p>
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
                      ],
              user_event_by_user: {},
              },
  
      newGroupSize: "",
      newGroupSeatingQuality: "",
      newGroupOpen: "",
      newGroupLabel: "",
      newGroupMeetBefore: "",
      newGroupDrinkLevel: "",
      newGroupGenderPreference: "",

      newConfirmationStatus: "",
      newSeatingQuality: ""

    };
  },
  created: function() {
      axios.get("/api/events/" + this.$route.params.id)
      .then(response => {
      this.event = response.data;
    });


  },
  methods: {
    submit: function() {

      var user_id = localStorage.getItem("user_id");
      var params = {
        size: this.newGroupSize,
        event_id: this.event.id,
        seating_quality: this.newGroupSeatingQuality,
        open: this.newGroupOpen,
        label: this.newGroupLabel,
        meet_before: this.newGroupMeetBefore,
        drink_level: this.newGroupDrinkLevel,
        gender_preference: this.newGroupGenderPreference,
        creater_id: user_id
      };
      axios.post("/api/groups", params)
        .then(response => {
        this.event.groups.push(response.data);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
      submit_interest: function() {
        var params = {
          user_id: this.user_id,
          event_id: this.event.id,
          confirmation_status: this.newConfirmationStatus,
          seating_quality: this.newSeatingQuality
          };

          axios.post("/api/user_events", params)
            .then(response => {
              console.log(response.data);
              this.event.user_event_by_user = response.data;

            }).catch(error => {
              this.errors = error.response.data.errors;
            });
          }


    // userEvent: function() {
    //   var identity = this.event.id;
    //   this.user_events.forEach(element => {
    //     if (element.event_id === identity) {
    //       this.user_event_checker = true;
    //     }
    //   });
    //   return this.user_event_checker;
    // }

    // showGroup: function(photo) {
    //   if (this.currentPhoto === photo) {
    //     this.currentPhoto = {};
    //   } else {
    //     this.currentPhoto = photo;
    //   }
    }
};
</script>
