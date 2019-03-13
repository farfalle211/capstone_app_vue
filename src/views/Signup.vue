<template>
  <div class="signup">
    <div class="container">
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
        age: this.age,
        summary: this.summary,
        gender: this.gender,
        location: this.location
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

