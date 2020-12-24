<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="#">
          <router-link
            :to="{
              name: 'Home',
            }"
            class="text-white"
          >
            Logo
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" @click="previous"> Previous </b-nav-item>
            <b-nav-item href="#">
              <b-icon
                v-show="id != numberOfQuestions"
                icon="exclamation-circle-fill"
              ></b-icon>
              <b-icon
                v-show="id == numberOfQuestions"
                icon="check-circle-fill"
              ></b-icon>

              {{ id }} / {{ numberOfQuestions }}
            </b-nav-item>
            <b-nav-item href="#" @click="next"> Next </b-nav-item>
            <b-nav-item href="#">
              <a href="#" class="text-white" @click.prevent="goToResults">
                Results
              </a>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: ["id", "numberOfQuestions"],
  name: "nav",
  methods: {
    goToResults() {
      this.$emit("goToResults");
    },
    next() {
      this.$emit("nextQuestion");
    },
    previous() {
      this.$emit("previousQuestion");
    },
  },
};
</script>