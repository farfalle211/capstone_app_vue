<template>
  <div class="events-index">
    
    <div class="col-left">
        <div class="middle">
            <div class="inner">
                <section class="section section-welcome">
                    <ul class="navigation">
                      <li><router-link to="/">Home</router-link></li>
                      <li><router-link to="/login">Login</router-link></li>
                      <li><router-link to="/logout">Logout</router-link></li>
                      <li><router-link to="/signup">Signup</router-link> </li>
                    </ul>
                    <h1>Attend</h1>
                    <div class="counter">
                        <p>Choose an event that you are interested in?</p>
                    </div>
                    <!-- end div .counter -->
                </section>
            </div>
        </div><!-- .middle --> 
    </div><!-- .col-left --> 
    
    <div class="col-right">
        <div class="middle tab-content">                
            <section class="section section-newsletter tab-pane fade in active" id="newsletter"> 
                
                <h2>All Events</h2>                    
                <div class="block-list">
                    <div class="block" v-for="event in events">
                        <i class="fa fa-laptop"></i> 
                        <div class="block-content">
                            <router-link v-bind:to="'/events/' + event.id">
                              <h4 class="block-title">{{ event.name }}</h4>
                            </router-link>

                            <p>Date: {{ event.date }}</p>
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
      <h1></h1>

      <div v-for="event in events">

      </div>
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
      events: []
    };
  },
  created: function() {
    axios.get("/api/events")
      .then(response => {
      this.events = response.data;
    }).catch(error => {
      this.$router.push("/login")
    });
  },
  methods: {}
};
</script>

