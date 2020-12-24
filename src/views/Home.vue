<template>
  <div class="my-5">
    <div class="container">
      <div class="jumbotron text-center">
        <h1 class="display-5">Knowledge quiz</h1>
        <p class="lead">This quiz is designed to test your Knowledge.</p>
        <hr class="my-4" />
        <p>The quiz consists of {{ questions.length }} questions.</p>
        <p class="lead">
          <router-link
            :to="{
              name: 'question',
              params: {
                id: index + 1,
                question: questions[index].question,
                index: index,
                answers: [
                  questions[index].correct_answer,
                  ...questions[index].incorrect_answers,
                ],
                questions: questions,
                results: results,
              },
            }"
          >
            <a class="btn btn-primary btn-lg" href="#" role="button"
              >Start <b-icon-play-fill style="color: #fff"></b-icon-play-fill>
            </a>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      questions: [],
      index: 0,
      results: [],
    };
  },
  name: "Home",
  components: {},
  methods: {
    async fetchData() {
      this.questions = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple"
      )
        .then((response) => response.json())
        .then((response) => {
          return response.results;
        });
    },
    async continueToNextQuestion() {
      console.log("here");
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
