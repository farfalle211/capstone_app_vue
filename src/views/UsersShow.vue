<template>
  <div class="users-show">

      <ul>
         <li v-for="error in errors"> {{ error }} </li>
      </ul>

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
                          




                        </div>
                        <!-- end div .counter -->
                    </section>
                </div>
            </div><!-- .middle --> 
        </div><!-- .col-left --> 
    
    <div class="col-right">
        <div class="middle tab-content">                
            <section class="section section-newsletter tab-pane fade in active" id="newsletter"> 
                <h2>Profile Page</h2>




                <div class="separator"></div>
                <p>Edit your Profile</p>
                <div v-if="user_id == user.id">
                  <form class="contact-form" v-on:submit.prevent="submit()">

                      <div class="form-group">
                          <label class="sr-only">Name</label>
                          <input class="form-control" type="text" v-model="user.name">          
                      </div>

                      <div class="form-group">
                          <label class="sr-only">Age</label>
                          <input type="text" class="form-control" v-model="user.age">            
                      </div>

                      <div class="form-group">
                          <label class="sr-only">Gender</label>
                          <input type="radio" value="male" class="form-control" v-model="user.gender"> Male
                          <input type="radio" value="female" class="form-control" v-model="user.gender"> Female
                      </div>

                      <div class="form-group">
                          <label class="sr-only">Location</label>
                          <input type="text" class="form-control" v-model="user.location">
                      </div>

                      <div class="form-group">
                          <label class="sr-only">Summary</label>
                          <input type="text" class="form-control" v-model="user.summary">
                      </div>

                      <input type="submit" value="Update" class="btn btn-primary">

                  <!--     <div class="text-center">
                          <button type="submit" class="btn btn-block btn-main">Submit</button>
                      </div> -->

                      <div class="alert-message">
                        <ul>
                          <li v-for="error in errors">{{ error }}</li>
                        </ul>
                      </div>
                  </form> 
                </div>
               

            </section><!-- #newsletter -->               
        </div><!-- .middle.tab-content --> 
    </div><!-- .col-right --> 
  </div>
</template>

<style>
  
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {
              id: "",
              name: "",
              email: "",
              age: "",
              gender: "",
              summary: "",
              location: "",
              user_events:  [
                            {
                            id: "",
                            user_id: "",
                            event_id: "",
                            confirmation_status: "",
                            seating_quality: "",
                            formatted: {
                                        confirmation_status: ""
                                        },
                            formatted_event: {
                                              event: "",
                                              date: ""
                                              }
                            }
                            ],
                groups: [
                        {
                          id: "",
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
                                    age: "",
                                    gender: "",
                                    summary: "",
                                    location: "",
                                    name: "",
                                    email: ""
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
                                                location: ""
                                            }
                                    }
                                    ],
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
                    created_groups: []
                  },
        user_id: "",
        errors: []
      };
  },
  created: function() {
     this.user_id = localStorage.getItem("user_id");
    axios.get("/api/users/" + this.$route.params.id)
    .then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {

      submit: function() {
        var params = {
                      name: this.user.label,
                      age: this.user.age,
                      gender: this.user.gender,
                      location: this.user.location,
                      summary: this.user.summary
                      };

        axios.patch("/api/users/" + this.user.id, params)
          .then(response => {
            this.user = response.data;
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },
    },
    // destroyGroup: function() {
    //   axios.delete("/api/groups/" + this.group.id)
    //     .then(response => {
    //       console.log("Success", response.data);
    //       this.$router.push("/"); 
    //     });
    // },
};
</script>