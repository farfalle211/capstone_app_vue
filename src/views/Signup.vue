<template>
  <div class="signup">

    <div class="col-left">
        <div class="middle">
            <div class="inner">
                <section class="section section-welcome">
                  <h1>Attend</h1>
                    <ul class="navigation">
                      <li><router-link to="/">Home</router-link></li>
                      <li><router-link to="/login">Login</router-link></li>
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

              <h2>Sign Up for An Account! </h2>

              <div class="separator"></div>

              <form class="contact-form" id="contact-form" v-on:submit.prevent="submit()">
                  <div class="form-group">
                      <label class="sr-only">Name</label>
                      <input type="text" class="form-control" v-model="name" placeholder="Name">                   
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Your Email</label>
                      <input type="email" id="email" v-model="email" class="form-control" placeholder="Your E-mail">
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Password</label>
                      <input class="form-control" type="password" id="message" v-model="password" placeholder="Password" required="">
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Password Confirmation: </label>
                      <input class="form-control" type="password" v-model="passwordConfirmation" placeholder="Password Confirmation" required="">
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Age</label>
                      <input class="form-control" v-model="userAge" id="message" placeholder="Age" required=""></input>
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Location</label>
                      <input class="form-control" v-model="userLocation" placeholder="Location" required="">
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Age</label>
                      <input class="form-control" v-model="userPhoneNumber" placeholder="+13042229816"></input>
                  </div>

                  <div class="form-group">
                      <label class="radio-inline">Gender</label>
                      <input class="radio-inline" type="radio" value="male" v-model="userGender"> Male
                      <input class="radio-inline" type="radio" value="female" v-model="userGender"> Female
                  </div>

                  <div class="form-group">
                      <label class="sr-only">Message</label>
                      <textarea class="form-control" v-model="userSummary" id="message" name="message" rows="7" placeholder="Text about yourself!" required=""></textarea>
                  </div>

                  <div class="form-group">
                      <input type="file" v-on:change="setFile($event)" ref="fileInput">
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

          </div>
        </div>
      </div>
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
      userPhoneNumber: "",
      userNewImage: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = new FormData();
   
        params.append("name", this.name);
        params.append("email", this.email);
        params.append("password", this.password);
        params.append("password_confirmation", this.passwordConfirmation);
        params.append("age", this.userAge);
        params.append("summary", this.userSummary);
        params.append("gender", this.userGender);
        params.append("location", this.userLocation);
        params.append("phone_number", this.userPhoneNumber);
        params.append("image", this.userNewImage);

      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
          this.$refs.fileInput.value = "";
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },

    setFile: function(event) {
      if (event.target.files.length > 0) {
      this.userNewImage = event.target.files[0];
      }
    }
  }
};
</script>

