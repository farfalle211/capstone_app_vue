import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import UsersEdit from './views/UsersEdit.vue'
import EventsIndex from './views/EventsIndex.vue'
import EventsShow from './views/EventsShow.vue'
import GroupsShow from './views/GroupsShow.vue'
import UsersShow from './views/UsersShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'events-index', component: EventsIndex },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },
    { path: "/users/:id/edit", name: "users-edit", component: UsersEdit },
    { path: "/events/:id", name: "events-show", component: EventsShow },
    { path: "/groups/:id", name: "groups-show", component: GroupsShow },
    { path: "/users/:id", name: "users-show", component: UsersShow }

    // { path: "/events", name: "events-index", component: EventsIndex }



  ]
})
