<template>
  <div class="d-flex flex-column align-center pt-10">
    <v-select class="w-50" label="Number of tasks" :items="[1, 2, 3, 4, 5]" v-model="numberOfTasks"></v-select>
    <v-select class="w-50" label="Working hours" :items="[4, 8]" v-model="workingHours"></v-select>
    <div class="w-50">
      <v-switch color="secondary" label="Daily meeting" v-model="hasDailyMeeting"></v-switch>
    </div>
   
    <div class="mt-5"></div>
    <span class="text-h5">Total hours: {{ totalHours }}</span>
    <div class="mt-5"></div>
    <div class="d-flex flex-column align-center ga-4">
      <v-btn size="large" v-for="(text, index) in taskArray" :key="index" @click="copyToClipboard(text)">
        {{ text }}
        {{ index === 0 && hasDailyMeeting ? "(daily)" : "" }}
      </v-btn>
    </div>

    <div class="mt-5"></div>
    <v-btn @click="refresh">Refresh</v-btn>
    <v-snackbar v-model="snackbar" :timeout="1000"> Copied to Clipboard </v-snackbar>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import randomInteger from "./randomInt";
import convertMinutesToHHMM from "./convertMinutesToHHMM";

const snackbar = ref(false);
const numberOfTasks = ref(2);
const workingHours = ref(8);
const hasDailyMeeting = ref(true);
let totalHours = ref("00:00");
const taskArray = ref([]);

function calculateTimeLogs(numberOfTasks, workingHours, hasDailyMeeting) {
  taskArray.value = [];

  let remainingMinutes = randomInteger(workingHours * 60 - 5, workingHours * 60 + 15);
  totalHours.value = convertMinutesToHHMM(remainingMinutes);
  let remainingTasks = numberOfTasks;

  // Add daily meeting
  if (hasDailyMeeting) {
    const minutes = randomInteger(14, 22);
    taskArray.value.push("00:" + minutes);
    remainingMinutes -= minutes;
  }

  const distributingList = [];
  // Give each task a random amount of time
  for (let i = 0; i < remainingTasks; i++) {
    distributingList[i] = randomInteger(60, 130);
    remainingMinutes -= distributingList[i];
  }

  for (let i = 0; i < distributingList.length; i++) {
    distributingList[i] += remainingMinutes / distributingList.length;
    taskArray.value.push(convertMinutesToHHMM(Math.ceil(distributingList[i])));
  }
}

watch([numberOfTasks, workingHours, hasDailyMeeting], ([numberOfTasks, workingHours, hasDailyMeeting], []) => {
  calculateTimeLogs(numberOfTasks, workingHours, hasDailyMeeting);
});

onMounted(() => {
  calculateTimeLogs(2, 8, true);
});

const refresh = () => {
  calculateTimeLogs(numberOfTasks.value, workingHours.value, hasDailyMeeting.value);
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  snackbar.value = true;
};
</script>

<style scoped></style>
