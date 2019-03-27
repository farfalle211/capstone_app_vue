<template>
  <div class="users-show">

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
                          <li><router-link to="/logout">Logout</router-link></li>
                        </ul>
                        <div class="counter">
                          <!-- <highcharts :options="chartOptions"></highcharts> -->

                        </div>
                        <!-- end div .counter -->
                    </section>
                </div>
            </div><!-- .middle --> 
        </div><!-- .col-left --> 
    

    <div class="col-right">
        <div class="middle tab-content">

          <div class="col-md-4">
            <div class="thumbnail row">
              <img class="img-circle" :src="user.image_url" alt="">
              <div class="caption">
                <h3>{{ user.name }}, {{ user.age }}, {{ user.location }}</h3>
                <p>{{ user.summary }}</p>
                <div v-if="user_id == user.id" style="text-align: center;">
                <p>
                  <a class="btn btn-block btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                      Edit Your Profile
                    </a> 
                  </p>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                      <form v-on:submit.prevent="submit()">
                        <div class="form-group">
                            <label class="sr-only">Name</label>
                            <input class="form-control" type="text" v-model="user.name" required>          
                        </div>

                        <div class="form-group">
                            <label class="sr-only">Age</label>
                            <input type="text" class="form-control" v-model="user.age" required>            
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
                            <input type="text" class="form-control" v-model="user.location" required="">
                        </div>

                        <div class="form-group">
                            <label class="sr-only">Phone Number</label>
                            <input type="text" class="form-control" v-model="user.phone_number" placeholder="+13042227896">
                        </div>

                        <div class="form-group">
                            <label class="sr-only">Summary</label>
                            <input type="text" class="form-control" v-model="user.summary" required="">
                        </div>

                        <div class="form-group">
                            <label class="sr-only">Image</label>
                            <input type="file" v-on:change="setFile($event)" ref="fileInput">
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
              </div>
            </div>
          </div>

          <div class="col-md-8">
           <highcharts :options="chartOptions"></highcharts>
          </div>

            <section class="section section-newsletter tab-pane fade in active col-md-6" id="newsletter">

              <table>
              <h3> {{ user.name }}'s Current Groups</h3>
                <li v-for="group in user.groups">
                  <router-link :to="'/groups/' + group.id">{{ group.label }} -- {{ group.formatted.event_name }}</router-link>
                </li>
                <li v-for="group in user.created_groups">
                 <router-link :to="'/groups/' + group.id">{{ group.label }} -- {{ group.formatted.event_name }} (ADMIN)</router-link>
                 </li>
                </table>

              </section><!-- #newsletter -->      


            <section class="col-md-6">
             <h3>Currently Interested In Events</h3>
              <div v-for="user_event in user.user_events">
                <div v-if="user_event.confirmation_status !== 'attended'">
                  <router-link :to="'/events/' + user_event.event_id"> {{ user_event.formatted_event.event }}
                  </router-link>
                </div>
              </div>
            </section>   

            <section class="section section-newsletter tab-pane fade in active col-md-6" id="newsletter"> 

              <h3>Events Attended</h3>
                  <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseHello" aria-expanded="false" aria-controls="collapseExample">
                      Show All Attended Events Below
                    </button>
                  </p>
                  <div class="collapse" id="collapseHello">
                    <div class="card card-body">
                      <div v-for="user_event in user.user_events">
                        <div v-if="user_event.confirmation_status === 'attended'">
                          <p> {{ user_event.formatted_event.event }}
                          {{ user_event.formatted_event.date }}</p>
                        </div>
                      </div>
                    </div>
                  </div>



            </section>



        </div><!-- .middle.tab-content --> 
    </div><!-- .col-right --> 
  </div>
</template>

<style>

.highcharts-data-table td, .highcharts-data-table th {
  border-bottom: dashed lightblue 1px;
  padding: 10px 20px;
  margin: 5px;
}

.highcharts-data-table {
  margin: 30px 30px 30px 235px;
}


  
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
              phone_number: "",
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
                    created_groups: []
                  },
        user_id: "",
        chartOptions: {
                chart: {
                    plotBackgroundColor: 'rgb(2, 174, 240)',
                    plotBorderWidth: 0,
                    plotShadow: false,
                    backgroundColor: null,
                    borderWidth: 2,
                    borderRadius: 5,
                    type: 'line',
                    borderColor: 'black'
                  },
                  title: {
                    text: 'Attended Stats',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 40
                  },
                  tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                  },
                  exporting: { 
                    showTable: true,
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
                    name: 'Count',
                    innerSize: '50%',
                    data: [
                      // ['Attended', 4],
                      // ['Firefox', 4],
                      // ['Internet Explorer', 13],
                      // ['Edge', 3.78],
                      // ['Safari', 3.42],
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
       var params = new FormData();
       
         params.append("name", this.user.name);
         params.append("email", this.user.email);
         params.append("age", this.user.age);
         params.append("summary", this.user.summary);
         params.append("gender", this.user.gender);
         params.append("location", this.user.location);
         params.append("phone_number", this.user.phone_number);
         if (this.user.image) {
           params.append("image", this.user.image);
         }

        axios.patch("/api/users/" + this.user.id, params)
          .then(response => {
            this.user = response.data;
            this.$refs.fileInput.value = "";
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },

      setFile: function(event) {
        if (event.target.files.length > 0) {
        this.user.image = event.target.files[0];
        }
      }
    },
};
</script>