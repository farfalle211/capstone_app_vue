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
                          <h2> {{ user.name }}'s Profile Page</h2>

                          <highcharts :options="chartOptions"></highcharts>


                        </div>
                        <!-- end div .counter -->
                    </section>
                </div>
            </div><!-- .middle --> 
        </div><!-- .col-left --> 
    
    <div class="col-right">
        <div class="middle tab-content">                
            <section class="section section-newsletter tab-pane fade in active" id="newsletter"> 
                  <h3> {{ user.name }}'s Groups</h3>
                    <div v-for="group in user.groups">
                      <ol>
                        <li style="font-size: 20px">
                          <router-link style="font-size: 20px; text-decoration: underline;" :to="'/groups/' + group.id">{{ group.label }} -- {{ group.formatted.event_name }}</router-link>
                        </li>
                      </ol>
                    </div>
                  <div v-if="user_id == user.id">
                    <h3>Groups you are the Administrator Of</h3>
                      <ol>
                       <li style="font-size: 20px" v-for="group in user.created_groups">
                        <router-link style="font-size: 20px; text-decoration: underline;" :to="'/groups/' + group.id">{{ group.label }} -- {{ group.formatted.event_name }}</router-link>
                      </li>
                    </ol>
                  </div>
                <div v-if="user_id == user.id">

                  <p>
                    <button class="btn btn-block btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                      Edit Your Profile
                    </button>
                  </p>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body">
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
                            <label class="radio-inline">
                                <input type="radio" class="checkmark" value="male" v-model="user.gender" checked>Male
                            </label>
                            <label class="radio-inline">
                                <input type="radio" class="checkmark" value="female" v-model="user.gender">Female
                            </label>
                        </div>

                        <div class="form-group">
                            <label class="sr-only">Location</label>
                            <input type="text" class="form-control" v-model="user.location">
                        </div>

                        <div class="form-group">
                            <label class="sr-only">Summary</label>
                            <input type="text" class="form-control" v-model="user.summary">
                        </div>

                        <input type="submit" value="Update" class="btn btn-block btn-primary">

                        <div class="alert-message">
                          <ul>
                            <li v-for="error in errors">{{ error }}</li>
                          </ul>
                        </div>
                      </form> 
                    </div>
                  </div>
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
                            events_attended: "",
                            adjusted_interested_total: "",
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
        chartOptions: {
                chart: {
                    plotBackgroundColor: 'rgb(2, 174, 240)',
                    plotBorderWidth: 0,
                    plotShadow: false,
                    backgroundColor: null
                  },
                  title: {
                    text: 'User<br>Attended<br>Stats',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 40
                  },
                  tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                  },
                  exporting: { 
                    enabled: false 
                  },
                  plotOptions: {
                    pie: {
                      dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                          fontWeight: 'bold',
                          color: 'white'
                        }
                      },
                      startAngle: -90,
                      endAngle: 90,
                      center: ['50%', '75%'],
                      size: '110%'
                    }
                  },
                  series: [{
                    type: 'pie',
                    name: 'Percentage',
                    innerSize: '50%',
                    data: [
                      // ['Attended', 4],
                      // ['Firefox', 4],
                      // ['Internet Explorer', 13],
                      // ['Edge', 3.78],
                      // ['Safari', 3.42],


                      // {
                      //   name: 'Other',
                      //   y: 7.61,
                        // dataLabels: {
                        //   enabled: false
                        // }
                      // }
                    ]
                  }],
                  credits: {
                       enabled: false
                   }
              },
        errors: []
      };
  },
  created: function() {
     this.user_id = localStorage.getItem("user_id");
    axios.get("/api/users/" + this.$route.params.id)
    .then(response => {
      console.log(response.data);
      this.user = response.data;
      this.chartOptions.series[0].data.push(['Attended', this.user.user_events[0].events_attended]);
      this.chartOptions.series[0].data.push(['Not Attended', this.user.user_events[0].adjusted_interested_total]);


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