<template>
  <div class="groups-show">
    <div class="container">
      <h4 v-if="group.creater_id == user_id">You are the Admin of this Group</h4>
      <h1>{{ group.label }}</h1>
      <h2>{{ group.formatted.event_name }} <br> ({{group.formatted.event_date}})</h2>
      <p>Meet Before?: {{ group.formatted.meet_before }}</p>
      <p>Drink Level: {{ group.formatted.drink_level }}</p>
      <p>Gender Preference: {{ group.formatted.gender_preference }}</p>

      <!-- <button v-on:click="destroyGroup()" class="btn btn-danger">Delete</button> -->
      


        <div v-if="!group.requested && (group.creater_id != user_id)">
          <h3>Request to Join Group</h3>
          <button v-on:click="createRequest()">Create Request</button>
        <!-- <div v-if="createRequest()">Request Created!</div> -->
        </div>

        <div v-if="group.requested">
          <h3> Group Join Status: {{ group.requested.confirmed }} </h3>
          <button v-on:click="destroyRequest()" class="btn btn-danger">Delete Join Request</button>
        </div>
        
        <div v-if="group.requested && group.requested.confirmed === 'confirmed'">
            
        </div>

        <ul>
          <li v-for="error in errors"> {{ error }} </li>
        </ul>

        <div v-if="group.creater_id == user_id">
          Current User Requests: 
          <div v-for="request in group.requests">
              <div v-if="request.confirmed === 'pending'">
                <li>{{ request.user }}</li>
                <button v-on:click="confirmRequest(request.id)">Confirm Request</button>
              </div>
              <div v-else>
                No Current User Requests
              </div>
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
      group: {
              size: "",
              event_id: "",
              seating_quality: "",
              open: "",
              label: "",
              meet_before: "",
              drink_level: "",
              gender_preference: "",
              creater_id: "",
              requests: [
                          {
                            id: "",
                            confirmed: "",
                            user_event_id: "",
                            group_id: "",
                            user: ""
                          }
                        ],
              requested: {
                          confirmed: ""
                          },
              formatted: {
                          meet_before: "",
                          drink_level: "",
                          gender_preference: "",
                          event_date: "",
                          event_name: ""
                          }
              },
      user_id: "",
      errors: []
    };
  },
  created: function() {
     this.user_id = localStorage.getItem("user_id");
    axios.get("/api/groups/" + this.$route.params.id)
    .then(response => {
      console.log(response.data);
      this.group = response.data;
    });
  },
  methods: {
      createRequest: function() {
          var params = {
                        group_id: this.group.id
                        };

          axios.post("/api/requests/", params)
          .then(response => {
           this.group.requested = response.data;
          });
      },

      confirmRequest: function(inputRequest) {
        var params = {
                      confirmed: "confirmed"
                      };
                      
        axios.patch("/api/requests/" + inputRequest, params)
          .then(response => {
            this.$router.push("/groups/" + this.group.id);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },

      destroyRequest: function() {
        axios.delete("/api/requests/" + this.group.requested.id)
          .then(response => {
            console.log("Success", response.data);
            this.group.requested = "";
          });
      },
    // destroyGroup: function() {
    //   axios.delete("/api/groups/" + this.group.id)
    //     .then(response => {
    //       console.log("Success", response.data);
    //       this.$router.push("/"); 
    //     });
    // },
  }
};
</script>