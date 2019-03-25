<template>
  <div class="events-show">

    <div class="col-left">
            <div class="middle">
                <div class="inner">
                    <section class="section section-welcome">
                        <ul class="navigation">
                          <li><router-link to="/">Home</router-link></li>
                          <li><router-link :to="'/users/' + user_id" >Profile</router-link></li>
                          <li><router-link to="/login">Login</router-link></li>
                          <li><router-link to="/logout">Logout</router-link></li>
                          <li><router-link to="/signup">Signup</router-link></li>
                        </ul>
                        <h1>Attend</h1>
                        <div class="counter">
                        
                            <h2>{{ event.name }}</h2>
                            <p>Date: {{ event.date }}</p>
                            <p>Category: {{ event.category }}</p>
                            <p>Location: {{ event.location }}</p>
                            

                              <div v-if="!event.user_event_by_user">
                                <p>Express interest below:</p>
                                <form v-on:submit.prevent="submit_interest()">

                                <div>Have you purchased tickets?</div>
                                 <div class="form-group">
                                    <label>Confirmation Status: </label> 
                                  <select class="form-control" v-model="newConfirmationStatus">
                                    <option value="not_purchased">Not Purchased</option>
                                    <option value="purchased">Purchased</option>
                                  </select>
                                </div>

                               <!--  <div class="form-group">
                                   <label>Seating Quality: </label>
                                  <select class="form-control" name="seating_quality" v-model="newSeatingQuality">
                                    <option value="good_seats">Good Seats</option>
                                    <option value="nosebleed">Nosebleed</option>
                                  </select>
                                </div> -->

                                  <input type="submit" class="btn btn-primary" value="I'm interested!">
                                </form>
                              </div>

                              <div v-if="event.user_event_by_user">
                                <div v-if="event.user_event_by_user.distance_between">
                                  <button class="btn btn-block btn-warning" v-on:click="checkIn(event.user_event_by_user.id)">Check In!</button> 
                                </div>  

                                <ul>
                                  <li v-for="error in errors">{{ error }}</li>
                                </ul>


                                <!-- modal -->
                              
                            <modal v-if="showModal">
                              <h3 slot="header" class="modal-title">
                                Create Group
                              </h3>
                              <div slot="body" class="text-center">
                                <ul>
                                  <li v-for="error in errors">{{ error }}</li>
                                </ul>
                                <form v-on:submit.prevent="closeModal(); submit()">
                                  <div>
                                    <p style="font-weight: bold;">Label: <input class="form-control" type="text" v-model="newGroupLabel"></p>
                                    <p style="font-weight: bold;">Size: <input class="form-control" type="number" v-model="newGroupSize"></p>

                                     <div class="form-group">
                                        <label>Meet Before Options: </label> 
                                      <select class="form-control" v-model="newGroupMeetBefore" name="meet_before">
                                        <option value="drinks">Drinks</option>
                                        <option value="dinner">Dinner</option>
                                        <option value="dinner_and_drinks">Dinner and Drinks</option>
                                      </select>
                                    </div>

                                     <p class="form-group">
                                        <label>Drink Level: </label> 
                                      <select class="form-control" v-model="newGroupDrinkLevel" name="drink_level">
                                        <option value="sober">Sober</option>
                                        <option value="one_to_two">One to Two</option>
                                        <option value="three_or_more">Three or more</option>
                                      </select>
                                    </p>

                                  </div>
                                </form>
                              </div>
                              <div slot="footer" class="mt-3">
                               <button type="button" class="btn btn-outline-info mr-1" @click="closeModal()">Close</button>
                               <button type="button" class="btn btn-primary ml-1" data-dismiss="modal" @click="closeModal(); submit();">
                                 Submit
                               </button>
                              </div>
                            </modal>
                            <button class="btn btn-block btn-primary" @click="openModal();"> Create a Group </button>

                                <!-- end modal -->
                          </div>
                        </div>
                        <!-- end div .counter -->
                    </section>
                </div>
            </div><!-- .middle --> 
        </div><!-- .col-left --> 
    
    <div class="col-right">
        <div class="middle tab-content">                
            <section class="section section-newsletter tab-pane fade in active" id="newsletter"> 
           
              <h2>Current Groups</h2>
                <div v-if="event.user_event_by_user">
                <!-- <button v-on:click="userEvent()">Show Groups</button> -->
                  <div v-for="group in event.groups">
                    <div v-if="(group.open === true) || (user_id == group.creater_id) || (group.requested) && (group.requested.confirmed === 'confirmed')">
                      <router-link :to="'/groups/' + group.id">
                        <h2>{{ group.label }}</h2>
                      </router-link>
                      <p>Remaining Group Capacity: {{ group.formatted.size }} </p>
                      <p>Meet Before?: {{ group.formatted.meet_before }}</p>
                      <p>Drink Amount: {{ group.formatted.drink_level }}</p>
                    </div>
                    <div else>
                    </div>
                  </div>
                </div>

               

            </section><!-- #newsletter -->               
        </div><!-- .middle.tab-content --> 
    </div><!-- .col-right --> 
  </div>
</template>

<style>
  .events-show {
    color: black;
  }

  h2 {
    color: black;
  }

</style>

<script>
import axios from "axios";
const math = require('mathjs');
import Modal from '../components/Modal.vue';

export default {
  components: {
    Modal
  },

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
      showModal: false,
      errors: []

    };
  },
  created: function() {
      this.user_id = localStorage.getItem("user_id");
      axios.get("/api/events/" + this.$route.params.id)
      .then(response => {
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
              }).catch(error => {
                this.errors = error.response.data.errors;
            });
          }
        },

        openModal: function() {
             this.showModal = true;
           },

         closeModal: function() {
           this.showModal = false;
         },

    // showGroup: function(photo) {
    //   if (this.currentPhoto === photo) {
    //     this.currentPhoto = {};
    //   } else {
    //     this.currentPhoto = photo;
    //   }
    }
};
</script>
