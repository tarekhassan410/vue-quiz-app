import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Quiz from "@/components/Quiz";
import Results from "@/components/Results";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/question/:id",
    name: "question",
    component: Quiz,
    props: true,
  },
  {
    path: "/results",
    name: "results",
    component: Results,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  hash: false,

  routes,
});

export default router;
