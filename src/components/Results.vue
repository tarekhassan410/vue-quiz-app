<template>
  <div>
    <Nav :id="questions.length" :numberOfQuestions="questions.length" />
    <div class="mt-5 container">
      <b-progress
        value="100"
        variant="primary"
        animated="animate"
        class="mb-5"
        v-show="loading"
      ></b-progress>

      <b-table-simple outlined>
        <b-thead>
          <b-tr>
            <b-th colspan="4"
              ><span class="text-secondary"> Result </span>
            </b-th>
          </b-tr>
          <b-tr variant="secondary">
            <b-th>The Question</b-th>
            <b-th>Your Answer</b-th>
            <b-th>Correct Answer</b-th>
            <b-th>Points</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(result, index) in finalResults" :key="index">
            <b-th v-html="result.The_question"></b-th>
            <b-th v-html="result.Your_answer"></b-th>
            <b-th
              :class="result.Points == 1 ? 'text-success' : 'text-danger'"
              v-html="result.Correct_answer"
            >
            </b-th>
            <b-th :class="result.Points == 1 ? 'text-success' : 'text-danger'">
              {{ result.Points }}</b-th
            >
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr variant="secondary">
            <b-td> <strong> Total Points </strong> </b-td>
            <b-td> </b-td>
            <b-td> </b-td>
            <b-td> {{ score }} </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </div>
  </div>
</template>

<script>
import Nav from "./Nav";

export default {
  props: ["questions", "results"],
  data() {
    return {
      loading: true,
      finalResults: [],
      score: 0,
    };
  },
  components: {
    Nav,
  },
  mounted() {
    this.results.map((result, index) => {
      console.log("index", index);
      if (result == this.questions[index].correct_answer) {
        this.finalResults.push({
          The_question: this.questions[index].question,
          Your_answer: result,
          Correct_answer: this.questions[index].correct_answer,
          Points: 1,
        });
        this.score++;
      } else {
        this.finalResults.push({
          The_question: this.questions[index].question,
          Your_answer: result,
          Correct_answer: this.questions[index].correct_answer,
          Points: 0,
        });
      }

      this.loading = false;

      console.log("this.finalResults", this.finalResults);
    });
  },
};
</script>

<style scoped>
</style>