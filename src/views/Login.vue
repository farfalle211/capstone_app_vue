<template>
  <div class="login">

    <div class="col-left">
        <div class="middle">
            <div class="inner">
                <section class="section section-welcome">
                  <h1>Attend</h1>
                    <ul class="navigation">
                      <li><router-link to="/">Home</router-link></li>
                      <li><router-link to="/signup">Signup</router-link> </li>
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
            <section class="section section-newsletter tab-pane fade in active" id="newsletter"> 
                
                <h2>Login</h2>                    

                <div class="separator"></div>
                <form class="contact-form" v-on:submit.prevent="submit()">
                    <div class="form-group">
                        <label class="sr-only">Email</label>
                        <input class="form-control" type="email" v-model="email" placeholder="E-mail*">                              
                    </div>
                    <div class="form-group">
                        <label class="sr-only">Password</label>
                        <input type="password" class="form-control" v-model="password" placeholder="Password*">            
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-block btn-main">Submit</button>
                    </div>
                    <div class="alert-message">
                      <ul>
                        <li v-for="error in errors">{{ error }}</li>
                      </ul>
                    </div>
                </form>            
            </section><!-- #newsletter -->
            
            <section class="section tab-pane fade" id="services">
      
            </section><!-- #services -->
            
        </div><!-- .middle.tab-content --> 

    </div><!-- .col-right --> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
