<template>
  <div class="events-show">

    <div class="col-left">
            <div class="middle">
                <div class="inner">
                    <section class="section section-welcome">
                      <h1>Attend</h1>
                        <ul class="navigation">
                          <li><router-link to="/">Home</router-link></li>
                          <li><router-link :to="'/users/' + user_id" >Profile</router-link></li>
                          <li><router-link to="/logout">Logout</router-link></li>
                        </ul>
                        <div class="counter">
                        </div>
                        <!-- end div .counter -->
                    </section>
                </div>
            </div><!-- .middle --> 
        </div><!-- .col-left --> 
    
    <div class="col-right">
        <div class="middle tab-content">                
             
           
          <div class="row">
            <div class="thumbnail">
              <div class="caption text-center">
                <h4 class="block-title">{{ event.name }}</h4>
                <p>Date: {{ event.date }}</p>
                <p>Category: {{ event.category }}</p>
                <p>Location: {{ event.location }}</p>


                <div v-if="event.user_event_by_user">

                  <p><a href="#" v-if="event.user_event_by_user.confirmation_status !== 'attended'" v-on:click="checkIn(event.user_event_by_user.id)" class="btn btn-primary" style="margin-right: 15px;" role="button">Check In!</a> 

                    <a href="#" v-on:click="removeInterest(event.user_event_by_user.id)" class="btn btn-danger" role="button">Remove Interest</a></p>

                    <p v-if="event.user_event_by_user.confirmation_status === 'attended'">You're checked in!</p>
                    <p v-else-if="confirmAttended === true">You've checked in successfully!</p>

                    <p v-else-if="event.user_event_by_user.distance_between">You can check into the event</p>
                    <p v-else>Sorry, you're not within check-in range.</p>
                </div>
              </div>
            </div>
          </div>

            <div v-if="!event.user_event_by_user">
              <form v-on:submit.prevent="submit_interest()">

               <div class="form-group">
                  <label class="display-label">Have you purchased tickets? </label> 
                <select class="form-control" v-model="newConfirmationStatus">
                  <option value="not_purchased"> Not Purchased</option>
                  <option value="purchased">Purchased</option>
                </select>
              </div>
                <input type="submit" class="btn btn-primary" value="I'm interested!">
              </form>
            </div>


                <div id="group-remove-interest" v-if="event.user_event_by_user">

                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>

                  <p>
                    <button class="btn btn-block btn-primary create-group" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                      Create a Group!
                    </button>
                  </p>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                      <form v-on:submit.prevent="submit()">

                      <p class="display-label" style="font-weight: bold;">Label: <input class="form-control" type="text" v-model="newGroupLabel"></p>
                      <p class="display-label" style="font-weight: bold;">Size: <input class="form-control" type="number" v-model="newGroupSize"></p>

                       <div class="form-group">
                          <label class="display-label">Meet Before Options: </label> 
                        <select class="form-control" v-model="newGroupMeetBefore" name="meet_before">
                          <option value="drinks">Drinks</option>
                          <option value="dinner">Dinner</option>
                          <option value="dinner_and_drinks">Dinner and Drinks</option>
                        </select>
                      </div>

                       <p class="form-group">
                          <label class="display-label">Drink Level: </label> 
                        <select class="form-control" v-model="newGroupDrinkLevel" name="drink_level">
                          <option value="sober">Sober</option>
                          <option value="one_to_two">One to Two</option>
                          <option value="three_or_more">Three or more</option>
                        </select>
                      </p>

                      <input type="submit" data-target="#collapseExample" value="Create Group" class="btn btn-block btn-primary">
                    </form>
                  </div>
                </div>
              </div>
              <div class="separator"></div>
            


            <div v-if="event.user_event_by_user">
              <div v-for="group in event.groups">
                <div v-if="(group.open === true) || (user_id == group.creater_id) || (group.requested) && (group.requested.confirmed === 'confirmed')">
                  <div class="row">
                    <div class="thumbnail">
                        <div class="caption text-center">
                          <router-link :to="'/groups/' + group.id"><h2 class="group-name">{{ group.label }}</h2>
                          </router-link>
                          <p>Group Capacity: {{ group.formatted.size }} </p>
                          <p>Meet Before?: {{ group.formatted.meet_before }}</p>
                          <p>Drink Amount: {{ group.formatted.drink_level }}</p>
                          <p><a href="#" class="btn btn-primary" style="margin-right: 15px" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <h6>No Current Groups Exist!</h6>
                  </div>
                </div>
              </div>

            <!-- #newsletter -->   
         
        </div><!-- .middle.tab-content --> 
    </div><!-- .col-right --> 
  </div>
</template>

<style>

  .display-label {
    color: white;
    font-size: 15px;
  }

  .create-group {
    display: inline-block;
  }

  #group-remove-interest {
    text-align: center;
  }

  .events-show {
    color: black;
  }

  h2.group-name {
    color: white;
  }

  h2.group-name:hover {
    color: blue;
  }

  .btn-block {
    margin: 10px;
  }

</style>

<script>
import axios from "axios";
const math = require('mathjs');

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
                        size: "",
                        event_id: "",
                        seating_quality: "",
                        open: "",
                        label: "",
                        meet_before: "",
                        drink_level: "",
                        gender_preference: "",
                        creater_id: "",
                        creater: {
                                  id: "",
                                  name: "",
                                  age: "",
                                  gender: "",
                                  summary: "",
                                  location: "",
                                  email: ""
                                  },
                        requests: [
                                    {
                                      id: "",
                                      confirmed: "",
                                      user_event_id: "",
                                      group_id: "",
                                      user_id: "",
                                      user_name: "",
                                      user_age: "",
                                      user_location: ""
                                    }
                                  ],
                        requested: {
                                    confirmed: ""
                                    },
                        formatted: {
                                    meet_before: "",
                                    drink_level: "",
                                    gender_preference: "",
                                    size: "",
                                    event_date: "",
                                    event_name: ""
                                    }
                      }
                      ],
              user_event_by_user: {
                                    distance_between: ""
                                  },
              },
      user: {},
      newGroupSize: "",
      newGroupSeatingQuality: "",
      newGroupLabel: "",
      newGroupMeetBefore: "",
      newGroupDrinkLevel: "",
      newGroupGenderPreference: "",
      newConfirmationStatus: "",
      newSeatingQuality: "",
      user_id: "",
      confirmAttended: false,
      errors: []

    };
  },
  created: function() {
      this.user_id = localStorage.getItem("user_id");
      axios.get("/api/events/" + this.$route.params.id)
      .then(response => {
      console.log(response.data);
      this.event = response.data;
    });

    axios.patch("/api/users/" + this.user_id)
      .then(response => {
        this.user = response.data;
        console.log(response.data);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },


  methods: {
    submit: function() {
      var user_id = localStorage.getItem("user_id");
      var params = {
        size: this.newGroupSize,
        event_id: this.event.id,
        seating_quality: this.newGroupSeatingQuality,
        label: this.newGroupLabel,
        meet_before: this.newGroupMeetBefore,
        drink_level: this.newGroupDrinkLevel,
        gender_preference: this.newGroupGenderPreference,
        creater_id: user_id
      };
      axios.post("/api/groups", params)
        .then(response => {
        this.event.groups.push(response.data);
        console.log(response.data);
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
              this.event.user_event_by_user = response.data;


            }).catch(error => {
              this.errors = error.response.data.errors;
            });
          },

        removeInterest: function(input_id) {
          axios.
            delete("/api/user_events/" + input_id)
            .then(response => {
              console.log(response.data);
              this.event.user_event_by_user = "";
            }).catch(error => {
                this.errors = error.response.data.errors;
            });
        },

        successfulCheckIn: function() {

        },

        currentCapacity: function(input) {
          console.log(input);
          return math.subtract(math.fraction('1'), math.fraction(input))
        },

        checkIn: function(inputUserEvent) {
          // console.log(this.event.user_event_by_user.distance_between);
          if (this.event.user_event_by_user.distance_between === true) {
            var params = {
                          confirmation_status: "attended"
                          };
            axios.patch("/api/user_events/" + inputUserEvent, params)
              .then(response => {
                console.log(response.data);
                if (response.data.confirmation_status === "attended") {
                  this.confirmAttended = true;
                }
              }).catch(error => {
                this.errors = error.response.data.errors;
            });
          }
        }

    // showGroup: function(photo) {
    //   if (this.currentPhoto === photo) {
    //     this.currentPhoto = {};
    //   } else {
    //     this.currentPhoto = photo;
    //   }
    }
};
</script>
