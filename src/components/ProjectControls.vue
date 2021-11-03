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
        <path v-bind:d="SVG.paths.plus_dotted" />
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
import SVG from '../paths.js';

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
      this.$emit('control-state-changed', 'yes');
    },
    __rename: function ($event, id) {
      this.mem.control__rename(id, this.route, $event.target.innerText);
      this.$emit('control-state-changed', 'yes');
    },
    __setCountable: function (ctrlName, value) {
      this.mem.control__setCountable(ctrlName, this.route, value);
      this.$emit('control-state-changed', 'yes');
    },
    __setDone: function (ctrlName, value) {
      this.mem.control__setDone(ctrlName, this.route, value);
      this.$emit('control-state-changed', 'yes');
    },
  },
  data() {
    return {
      number: 0,
      mem: mem,
      SVG: SVG,
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
