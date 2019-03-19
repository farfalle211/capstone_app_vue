<template>
  <div class="signup">

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


              <div class="separator"></div>

              <p>Sign Up for An Account! </p>
              <form class="contact-form" id="contact-form" v-on:submit.prevent="submit()">
                  <div class="form-group">
                      <label class="sr-only" for="name">Name</label>
                      <input type="text" class="form-control" v-model="name" placeholder="Name*">                               
                  </div>

                  <div class="form-group">
                      <label class="sr-only" for="email">Your Email</label>
                      <input type="email" id="email" v-model="email" class="form-control" placeholder="Your E-mail*">                                
                  </div>

                  <div class="form-group">
                      <label class="sr-only" for="password">Password</label>
                      <input class="form-control" id="message" v-model="password" placeholder="Password*" required="">
                  </div>


                  <div class="form-group">
                      <label class="sr-only" for="password_confirmation">Password Confirmation: </label>
                      <input class="form-control" v-model="passwordConfirmation" placeholder="Password Confirmation*" required="">
                  </div>

                  <div class="form-group">
                      <label class="sr-only" for="age">Age</label>
                      <textarea class="form-control" v-model="userAge" id="message" placeholder="Message*" required=""></textarea>
                  </div>

                  <div class="form-group">
                      <label class="sr-only" for="location">Location</label>
                      <input class="form-control" v-model="userLocation" placeholder="Message*" required="">
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Age</label>
                      <input type="radio" value="male" class="form-control" v-model="userGender"> Male
                      <input type="radio" value="female" class="form-control" v-model="userGender"> Female
                  </div>

                  <div class="form-group">
                      <label class="sr-only" for="message">Message</label>
                      <textarea class="form-control" v-model="userSummary" id="message" name="message" rows="7" placeholder="Message*" required=""></textarea>
                  </div>

                  <div class="text-center">
                      <button type="submit" class="btn btn-block btn-main">Submit</button>
                  </div>

                  <div class="alert-message">
                    <ul>
                      <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                  </div>
              </form>

            </section>

          </div>
        </div>
      </div>



  <!--   <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <div class="form-group">
          <label>Age:</label>
          <input type="text" class="form-control" v-model="userAge">
        </div>
        <div class="form-group">
          <label>Summary:</label>
          <input type="text" class="form-control" v-model="userSummary">
        </div>
        <div class="form-group">
          <label>Gender:</label>
          <input type="radio" value="male" class="form-control" v-model="userGender"> Male<br>
          <input type="radio" value="female" class="form-control" v-model="userGender"> Female

        </div>
        <div class="form-group">
          <label>Location:</label>
          <input type="text" class="form-control" v-model="userLocation">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      userAge: "",
      userSummary: "",
      userGender: "",
      userLocation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        age: this.userAge,
        summary: this.userSummary,
        gender: this.userGender,
        location: this.userLocation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

