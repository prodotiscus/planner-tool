<template>
  <div class="project-controls">
    <span class="section-title">CONTROLS</span>
    <span style="margin-left: 5px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-plus-square-dotted"
        viewBox="0 0 16 16"
        @click="mem.addEmptyControl(route)"
      >
        <path
          d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
        />
      </svg>
    </span>
    <p></p>
    <div class="project-controls-list">
      <span
        class="card text-center"
        v-for="ctrl in mem.getProject(route).controls"
      >
        <div
          class="card-body"
          v-if="(localHolder[ctrl.name + '$$$done'] = ctrl.done) === 0 ? 1 : 1"
        >
          <vue3-slider
            v-if="ctrl.countable"
            v-model="localHolder[ctrl.name + '$$$done']"
            color="#000000"
            track-color="#E5E4E2"
            @change="__setDone(ctrl.name, localHolder[ctrl.name + '$$$done'])"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
            style="float: right"
            @click="__remove(ctrl.name)"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
          <input
            type="checkbox"
            id="countable"
            value="yes"
            v-bind:checked="ctrl.countable"
            v-model="localHolder[ctrl.name + '$$$countable']"
            @change="
              __setCountable(ctrl.name, localHolder[ctrl.name + '$$$countable'])
            "
          />
          <label for="countable" style="margin-left: 2px">Countable</label>
          <h5
            class="card-title"
            contenteditable
            v-on:keypress.enter.prevent="$event.target.blur()"
            @focusout="__rename($event, ctrl.id)"
          >
            {{ ctrl.name }}
          </h5>
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import slider from 'vue3-slider';
import { default as mem, Log as Lg } from '../Memory.js';

window.mem = mem;
window.localHolder = {};

export default {
  name: 'ProjectControls',
  components: { 'vue3-slider': slider },
  props: {
    route: String,
  },
  methods: {
    __remove: function (ctrlName) {
      this.mem.control__remove(ctrlName, this.route);
    },
    __rename: function ($event, id) {
      this.mem.control__rename(id, this.route, $event.target.innerText);
    },
    __setCountable: function (ctrlName, value) {
      this.mem.control__setCountable(ctrlName, this.route, value);
    },
    __setDone: function (ctrlName, value) {
      this.mem.control__setDone(ctrlName, this.route, value);
    },
  },
  data() {
    return {
      number: 0,
      mem: mem,
      localHolder: window.localHolder,
      console_log: console.log,
    };
  },
};
</script>

<style>
.project-controls {
  height: 450px;
  max-width: 800px;
  margin-left: 100px;
  margin-top: 30px;
}
.project-controls-list .card {
  margin-bottom: 10px;
}
</style>
