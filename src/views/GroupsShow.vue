<template>
  <div class="groups-show">

      <ul>
         <li v-for="error in errors"> {{ error }} </li>
      </ul>

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
    
    <div class="col-right pl-4">
      <div class="row">
        <div class="middle tab-content col-md-6">

          <div style="padding-left: 20px" class="row">
            <div class="thumbnail">
                <div class="caption">
                  <h1>{{ group.label }}</h1>
                  <router-link :to="'/events/' + group.event_id">
                    <h4 class="block-title">{{ group.formatted.event_name }} <br> ({{group.formatted.event_date}})</h4>
                    <h5 class="block-title">{{ group.formatted.event_location}}</h5>
                  </router-link>

                  <table style="margin-top: 20px" class="table">
                    <thead class="thead-light">
                      <tr>
                        <th>Administrator</th>
                        <th>Current Group Capacity</th>
                        <th>Meeting Before</th>
                        <th>Drink Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{group.creater.name}}</td>
                        <td style="font-weight: bold;">{{group.formatted.size}}</td>
                        <td>{{group.formatted.meet_before}}</td>
                        <td>{{group.formatted.drink_level}}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div v-if="group.creater_id == user_id">
                    <p>
                      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Edit Your Group!
                      </button>
                      <button class="btn btn-info" style="margin-left: 70px" type="button" data-toggle="collapse" data-target="#collapseRequest" aria-expanded="false" aria-controls="collapseExample">
                        User Requests
                      </button>
                      <a href="#" v-on:click="popUp()" style="margin-left: 70px" class="btn btn-danger" role="button">Delete Group</a>
                    </p>
                    <div class="collapse" id="collapseExample">
                      <div class="card card-body">
                        <form v-on:submit.prevent="editGroup()">
                          <p>Label: <input class="form-control" type="text" v-model="group.label"></p>
                          <p>Size: <input class="form-control" type="text" v-model="group.size"></p>

                            <div class="form-group">
                              <label>Meet Before Options: </label> 
                              <select class="form-control" v-model="group.meet_before" name="meet_before">
                                <option class="form-control" value="drinks">Drinks</option>
                                <option class="form-control" value="dinner">Dinner</option>
                                <option class="form-control" value="dinner_and_drinks">Dinner and Drinks</option>
                              </select>
                            </div>

                            <p class="form-group">
                              <label>Drink Level: </label> 
                            <select class="form-control" v-model="group.drink_level" name="drink_level">
                              <option class="form-control" value="sober">Sober</option>
                              <option class="form-control" value="one_to_two">One to Two</option>
                              <option class="form-control" value="three_or_more">Three or more</option>
                            </select>
                            </p>

                            <input type="submit" data-target="#collapseExample" value="Edit Group" class="btn btn-block btn-primary">

                            <div class="alert-message">
                              <ul>
                                <li class="text-danger" v-for="error in errors">{{ error }}</li>
                              </ul>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="collapse" id="collapseRequest">
                      <div class="card card-body">
                        <div v-if="(group.creater_id == user_id) && group.open === true">
                          <h2>Current User Requests: </h2>
                          <div v-for="request in group.requests">
                            <div v-if="request.confirmed === 'confirmed'"></div>
                            <div v-else-if="request.confirmed === 'pending'">
                              <li style="font-size: 18px; margin-bottom: 10px;">{{ request.user.name }}<button style="margin-left: 10px" v-on:click="confirmRequest(request.id)" class="btn btn-sm btn-success">Confirm Request</button></li>
                            </div>
                            <div v-else>
                              No Current User Requests
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>       
                  </div>
                </div>
              </div>


                <div v-if="(group.creater_id == user_id) || (group.requested && group.requested.confirmed === 'confirmed')" class="row" style="padding-left: 20px">
                  <div class="thumbnail">
                    
                  <div class="caption text-center">
                    <h2>Group Members</h2>
                    <table style="margin-top: 20px" class="table">
                      <thead class="thead-light text-center">
                        <tr>
                          <th class="text-center">Name</th>
                          <th class="text-center">Age</th>
                          <th class="text-center">Location</th>
                          <th class="text-center">Phone Number</th>
                          <th class="text-center">Remove User</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><router-link :to="'/users/' + group.creater_id">{{group.creater.name}}</router-link></td>
                          <td>{{group.creater.age}}</td>
                          <td>{{group.creater.location}}</td>
                          <td>{{group.creater.phone_number}}</td>
                          <td></td>
                        </tr>
                        <tr v-for="request in group.requests" v-if="request.confirmed === 'confirmed'">
                          <td><router-link :to="'/users/' + request.user.id">{{request.user.name}}</router-link></td>
                          <td>{{request.user.age}}</td>
                          <td>{{request.user.location}}</td>
                          <td>{{request.user.phone_number}}</td>
                          <td v-if="group.creater_id == user_id"><button class="btn btn-danger btn-sm" v-on:click="removeUser(request.id)">Remove User</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        
        <div class="middle tab-content col-md-6">
         <div v-if="!group.requested && (group.creater_id != user_id) && group.open === true">
           <h3>Request to Join Group</h3>
           <button v-on:click="createRequest()" class="btn btn-success">Create Request</button>
         </div>

          <div v-if="(group.creater_id != user_id) && group.requested">
            <h3> Group Join Status: {{ group.requested.confirmed }} </h3>
            <div v-if="(group.requested && group.requested.confirmed === 'confirmed')">
              <button v-on:click="destroyRequest()" class="btn btn-danger">Leave Group</button>
            </div>
          <div v-else>
            <button v-on:click="destroyRequest()" class="btn btn-danger">Delete Join Request</button>
          </div>
          </div>
         
          <div class="separator"></div>

          <div v-if="(group.creater_id == user_id) || (group.requested && group.requested.confirmed === 'confirmed')">
            
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link" v-bind:class="{active: textStatus === 'late'}" v-on:click="textStatus = 'late'">Late</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-bind:class="{active: textStatus === 'message'}" v-on:click="textStatus = 'message'">Message</a>
              </li>
            </ul>
            <h3>Text Members in your Group!</h3>

            <div v-if="textStatus === 'late'">
              <div>
                <div style="padding-bottom: 10px; display:inline; font-size: 18px">
                Running: <input class="form-control form-control-inline" type="number" v-model="numberOfMinutes"> Minutes Late!
                <span> 
                  <button style="margin-left: 15px;" class="btn btn-primary" v-on:click="imLate()">Send!</button>
                </span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="form-group">
                  <label class="sr-only">Message</label>
                  <textarea class="form-control" v-model="userMessage" rows="5" cols="55" placeholder="Enter your message" required=""></textarea>
              </div>
              <!-- Message: <input style="color: black;" v-model="userMessage"> -->

                <div>
                  Who would you like to send the message to?: 
                  <select class="form-control" v-model="inputPhoneNumber">
                    <option v-for="request in group.requests" v-bind:value="request.user.phone_number">{{ request.user.name }}</option>
                    <option v-bind:value="group.creater.phone_number">{{ group.creater.name }}</option>
                  </select>
                  <div style="padding-top: 10px">
                    <button class="btn btn-primary" v-on:click="sendMessage('solo')">Send to individual member!</button>
                  </div>
                </div>
                <div style="padding-top: 10px">
                  <button class="btn btn-primary" v-on:click="sendMessage('group')">Send to all members!</button>
                </div>
            </div>

          </div>
        </div>
      </div>


      

    </div><!-- .col-right --> 
  </div>
</template>

<style>
  button {
    color: black;
  }

  .li-styling {
    font-size: 20px;
  }

  .btn-sm {
    padding: 5px;
    font-size: 15px;
  }

  .btn-md {
    padding: 8px;
    font-size: 15px;
  }

  .form-control-inline {
    display: inherit;
    width: 140px;
  }

</style>

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
              creater: {
                        id: "",
                        name: "",
                        age: "",
                        gender: "",
                        summary: "",
                        location: "",
                        email: "",
                        phone_number: ""
                        },
              requests: [
                          {
                            id: "",
                            confirmed: "",
                            user_event_id: "",
                            group_id: "",
                            user: {
                                    id: "",
                                    name: "",
                                    age: "",
                                    location: "",
                                    phone_number: ""
                                  }
                          }
                        ],
              requested: {
                          confirmed: ""
                          },
              current_user: {},
              formatted: {
                          meet_before: "",
                          drink_level: "",
                          gender_preference: "",
                          size: "",
                          event_date: "",
                          event_name: ""
                          }
              },
      user_id: "",
      numberOfMinutes: "",
      userMessage: "",
      confirmedGroupMembers: [],
      inputPhoneNumber: "",
      errors: [],
      textStatus: 'late'
    };
  },
  created: function() {
     this.user_id = localStorage.getItem("user_id");
    axios.get("/api/groups/" + this.$route.params.id)
    .then(response => {
      console.log(response.data);
      this.group = response.data;
    });

  },
  methods: {

      editGroup: function() {
        var params = {
                      label: this.group.label,
                      size: this.group.size,
                      seating_quality: this.group.seating_quality,
                      meet_before: this.group.meet_before,
                      drink_level: this.group.drink_level,
                      gender_preference: this.group.gender_preference
                      };

        axios.patch("/api/groups/" + this.group.id, params)
          .then(response => {
            // this.$router.push("/groups/" + this.group.id);
            this.group = response.data
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },

      createRequest: function() {
          var params = {
                        group_id: this.group.id
                        };

          axios.post("/api/requests/", params)
          .then(response => {
            console.log(response.data);
           this.group.requested = response.data;
          });
      },

      confirmRequest: function(inputRequest) {
        var params = {
                      confirmed: "confirmed"
                      // creater_id: this.group.creater_id
                      };
                      
        axios.patch("/api/requests/" + inputRequest, params)
          .then(response => {
            console.log(response.data);
            this.group.requests.push(response.data);
            axios.get("/api/groups/" + this.$route.params.id).then(response => {
              this.group = response.data;
            });
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },

      destroyRequest: function() {
        axios.delete("/api/requests/" + this.group.requested.id)
          .then(response => {
            console.log("Success", response.data);
            this.group.requested = "";
            axios.get("/api/groups/" + this.$route.params.id).then(response => {
              this.group = response.data;
            });
          });
      },

      removeUser: function(inputRequestId) {
        axios.delete("/api/requests/" + inputRequestId)
          .then(response => {
            console.log("Success", response.data);
            axios.get("/api/groups/" + this.$route.params.id).then(response => {
              this.group = response.data;
            });
          });
      },

      imLate: function() {
        var params = {
                        message: this.group.current_user.name + " is running " + this.numberOfMinutes + " minutes late!",
                        group_id: this.group.id
                      };

        axios.post("api/messages/", params)
        .then(response => {
          console.log(response.data);
        });
      },

      sendMessage: function(mode) {
        var params = {
                        message: this.userMessage,
                        group_id: this.group.id
                      };

        if (mode === 'solo') {
          params["phone_number"] = this.inputPhoneNumber;
        }

        axios.post("api/messages/", params)
        .then(response => {
          console.log(response.data);
        });
      },

      // confirmedUsers: function() {

      //   this.group['requests'].forEach(function(person) {
      //     if (person.confirmed === 'confirmed') {
      //       this.confirmedGroupMembers.push(person['user']);
      //     }
      //   });
      // }

      destroyGroup: function() {
        axios.delete("/api/groups/" + this.group.id)
          .then(response => {
            console.log("Success", response.data);
            this.$router.push("/"); 
          });
      },

    popUp: function() {
        var txt;
        if (confirm("Are you sure you want to delete this group?")) {
          this.destroyGroup();
          txt = "Group Deleted!";
        } else {
          txt = "You pressed Cancel!";
        }
    },
  }
};
</script>