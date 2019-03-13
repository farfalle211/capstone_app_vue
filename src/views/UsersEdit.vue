<template>
  <div class="users-edit">

    <ul>
      <li v-for="error in errors"{{ error }}</li>
    </ul>

      <h2>Edit Profile</h2>

      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Name: </label>
          <input class='form-control' type='text' v-model="cat.first_name" placeholder="First Name">
        </div>
        <div class="form-group">
          <label>Email: </label>
          <input class='form-control' type='text' v-model="cat.family_name" placeholder="Family Name">
        </div>
        <div class="form-group">
          <label>Age: </label>
          <input class='form-control' type='text' v-model="cat.title" placeholder="Title">
        </div>
        <div class="form-group">
          <label>Summary: </label>
          <input class='form-control' type='text' v-model="cat.education" placeholder="Education">
        </div>
        <div class="form-group">
          <label>Gender: </label>
          <input class='form-control' type='text' v-model="cat.experience" placeholder="Experience">
        </div>
        <div class="form-group">
          <label>Location: </label>
          <input class='form-control' type='text' v-model="cat.location" placeholder="Location">
        </div>
  
        <input type="submit" value="Update" class="btn btn-primary">
      </form>

  </div>
</template>


<style>
.btn{
  position: relative;
  align-self: center;
}
</style>


<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      cat: {
              first_name: "",
              family_name: "",
              title: "",
              education: "",
              experience: "",
              location: "",
              owner: "",
              summary: "",
              profile_url: "",
              accomplishments: "",
              endorsements: "",
              skills: "",
              user_id: ""
              },
      errors: []
    };
  },
  created: function() {
    axios.get("/api//" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.cat = response.data;
      })
  },
  methods: {
    submit: function() {
      var params = {
                    first_name: this.cat.first_name,
                    family_name: this.cat.family_name,
                    title: this.cat.title,
                    education: this.cat.education,
                    experience: this.cat.experience,
                    location: this.cat.location,
                    owner: this.cat.owner,
                    summary: this.cat.summary,
                    profile_url: this.cat.profile_url,
                    accomplishments: this.cat.accomplishments,
                    endorsements: this.cat.endorsements,
                    skills: this.cat.skills,
                    user_id: this.cat.user_id
                    };
      axios.patch("/api/cats/" + this.cat.id, params)
        .then(response => {
          this.$router.push("/cats/" + this.cat.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
}
</script>