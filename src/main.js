import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
// import HighchartsInit from 'highcharts/modules/highcharts'
import exportingInit from 'highcharts/modules/exporting'
import exportDataInit from 'highcharts/modules/export-data'



axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://dessailly-attend-app.herokuapp.com";

// HighchartsInit(Highcharts);
exportingInit(Highcharts);
exportDataInit(Highcharts);


Vue.use(HighchartsVue);

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
