<template>
  <div class="events-index">
    
    <div class="col-left">
        <div class="middle">
            <div class="inner">
                <section class="section section-welcome">
                    <ul class="navigation">
                      <li><router-link to="/">Home</router-link></li>
                      <li><router-link :to="'/users/' + user_id" >Profile</router-link></li>
                      <li><router-link to="/logout">Logout</router-link></li>
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
                <div class="block-list">
                    <div class="block" v-for="event in geekEvents">
                        <!-- <i class="fa fa-laptop"></i>  -->
                        <div class="block-content">

                            
                            <h4 style="cursor:pointer;" v-on:click="addEvent(event)" class="block-title">{{ event.name }}</h4>
                            
                            <p>Date: {{ event.formatted.date }}</p>
                            <p>Category: {{ event.category }}</p>
                            <p>Location: {{ event.location }}</p>
                        </div>
                    </div>
                </div>                 
            </section><!-- #newsletter -->
            
            <section class="section tab-pane fade" id="services">
                
            </section><!-- #services -->
            
            
        </div><!-- .middle.tab-content --> 

    </div><!-- .col-right --> 

    <!-- <div class="container"> -->
     


      <!-- <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events">
              <td>{{event.name}}</td>
              <td>{{event.date}}</td>
              <td>{{event.category}}</td>
              <td>{{event.location}}</td>
            
          </tr>
        </tbody>
      </table> -->

   <!--  </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
            geekEvents: [
                          {
                            name: "",
                            date: "",
                            category: "",
                            location: "",
                            formatted: {
                                          date: ""
                                        },
                            latitude: "",
                            longitude: ""
                            }
                          ],
            user_id: ""
    };
  },
  created: function() {
    this.user_id = localStorage.getItem("user_id");

    if (!this.user_id) {
      this.$router.push("/login");
    }

    axios.get("/api/events")
      .then(response => {
      this.geekEvents = response.data;
    }).catch(error => {
      this.$router.push("/login");
    });
  },

  methods: {
    addEvent: function(event) {

      var params = event;

    axios.post("/api/events", params)
      .then(response => {
      this.$router.push("/events/" + response.data.id);
      console.log(response.data);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>

