<template>
  <div class="login">

    <div class="col-left">
        <div class="middle">
            <div class="inner">
                <section class="section section-welcome">
                    <ul class="navigation">
                      <li><router-link to="/">Home</router-link></li>
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
                
                <h2>Login</h2>                    
                <ul class="info">
                    <li><i class="fa fa-home"></i> 3137 rue Levy Montreal, QC H3C 5K4</li>
                    <li><i class="fa fa-phone"></i> +1 (234) 567-8910</li>
                    <li><i class="fa fa-envelope"></i> <a href="mailto:infp@example.com">infp@example.com</a></li>
                </ul>
                <ul class="social-icon">
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i class="fa fa-behance"></i></a></li>
                    <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
                </ul>

                <div class="separator"></div>
                <p>Please enter your login information: </p>
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
                        <button type="submit" class="btn btn-main">Submit</button>
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
