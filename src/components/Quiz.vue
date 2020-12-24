<template>
  <div>
    <Nav
      :id="id"
      :numberOfQuestions="questions.length"
      v-on:previousQuestion="previous"
      v-on:nextQuestion="next"
      v-on:goToResults="goToResults"
    />
    <div class="container mt-5 border-1">
      <b-card header-tag="header">
        <template #header>
          <span class="h4"> {{ id }} - </span>
          <span v-html="question" class="mb-0 h4">{{ id }}</span>
        </template>
        <b-alert show variant="danger" v-show="noAnswerSelected"
          >Please select an answer</b-alert
        >
        <b-list-group>
          <b-list-group-item v-for="(answer, index) in answers" :key="index">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="answer"
                :id="answer"
                :value="answer"
                v-model="selectedAnswer"
                @click="noAnswerSelected = false"
              />
              <label class="form-check-label" for="gridRadios1" v-html="answer">
              </label>
            </div>
          </b-list-group-item>
        </b-list-group>
        <template #footer>
          <b-button
            @click="previous"
            variant="dark"
            class="mr-1"
            :disabled="id == 1"
          >
            <b-icon-chevron-left></b-icon-chevron-left>
            Previous</b-button
          >
          <b-button
            @click="next"
            variant="dark"
            class="mr-1"
            :disabled="id == questions.length"
          >
            <b-icon-chevron-right></b-icon-chevron-right>

            Next</b-button
          >
          <b-button
            @click="goToResults"
            variant="dark"
            v-show="id == questions.length"
            >Results
            <b-icon-book></b-icon-book>
          </b-button>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav";
export default {
  props: ["id", "questions", "question", "answers", "index", "results"],
  components: {
    Nav,
  },
  data() {
    return {
      questionAnswered: false,
      selectedAnswer: null,
      noAnswerSelected: false,
    };
  },
  methods: {
    next() {
      if (this.selectedAnswer == null) {
        this.noAnswerSelected = true;
        return;
      }

      if (this.results[this.index]) {
        this.results[this.index] = this.selectedAnswer;
      } else {
        this.results.push(this.selectedAnswer);
      }

      // These data should be reset here or it will with last value after routing
      this.selectedAnswer = null;
      this.noAnswerSelected = false;

      this.$router.push({
        name: "question",
        params: {
          id: this.id + 1,
          question: this.questions[this.index + 1].question,
          answers: this.shuffleArray([
            this.questions[this.index + 1].correct_answer,
            ...this.questions[this.index + 1].incorrect_answers,
          ]),
          questions: this.questions,
          results: this.results,
          index: this.index + 1,
        },
      });
    },
    previous() {
      this.$router.push({
        name: "question",
        params: {
          id: this.id - 1,
          question: this.questions[this.index - 1].question,
          answers: this.shuffleArray([
            this.questions[this.index + 1].correct_answer,
            ...this.questions[this.index + 1].incorrect_answers,
          ]),
          questions: this.questions,
          results: this.results,
          index: this.index - 1,
        },
      });
    },
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    goToResults() {
      if (this.selectedAnswer == null) {
        this.noAnswerSelected = true;
        return;
      }

      if (this.selectedAnswer == this.questions[this.index].correct_answer) {
        this.results.push(this.selectedAnswer);
      } else {
        this.results.push(this.selectedAnswer);
      }

      this.$router.push({
        name: "results",
        params: {
          questions: this.questions,
          results: this.results,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>