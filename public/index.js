/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      tasks: []
    };
  },
  created: function() {
    axios.get("/v1/tasks.json").then(function(response){
      this.tasks = response.data;
    }.bind(this));
  },
  methods: {
    completeTask: function(task) {
      task.completed = !task.completed;
    },
    numIncompleteTasks: function() {
      var count = 0;
      for (var i = 0; i < this.tasks.length; i++) {
        if (!this.tasks[i].completed) {
          count++;
        }
      }
      return count;
    },
    clearCompletedTasks: function() {
      var incompleteTasks = [];
      for (var i = 0; i < this.tasks.length; i++) {
        if (!this.tasks[i].completed) {
          incompleteTasks.push(this.tasks[i]);
        }
      }
      this.tasks = incompleteTasks;
    }
  },
  computed: {},
  mounted: function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.788, lng: -122.407},
      zoom: 11
    });
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});