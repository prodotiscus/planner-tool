<template>
  <div class="chains-list">
    <span class="section-title">CHAINS</span>
    <span style="margin-left: 5px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-plus-square-dotted"
        viewBox="0 0 16 16"
        v-on:click="mem.addEmptyChain"
      >
        <path v-bind:d="SVG.paths.plus_dotted" />
      </svg>
    </span>
    <p></p>
    <div class="chains-list-func">
      <div class="card" style="width: 24rem" v-for="chain in mem.data.chains">
        <div class="card-body" style="display: inline-flex">
          <h5
            class="card-title"
            style="width: 100%"
            contenteditable="true"
            v-on:keypress.enter.prevent="$event.target.blur()"
            @focusout="mvChain($event, chain.id)"
          >
            {{ chain.name }}
          </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
            style="float: right"
            @click="rmChain($event, chain.name)"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <ul class="list-group list-group-flush __chain-sequence">
          <p class="chain" v-for="element in chain.elements">
            <li class="list-group-item __element-name">{{ element.name }}</li>
            <li
              class="list-group-item __chain-connector __sequential"
              v-if="element.transitionType == 'sequential'"
            >
              <span class="__transition-type">&#9759;</span>
              <p
                v-for="ctrl in element.transitionControls"
                class="chain __control"
              >
                {{ ctrl }}&nbsp;
              </p>
            </li>
            <li
              class="list-group-item __chain-connector parallel"
              v-if="element.transitionType == 'parallel'"
            >
              <span class="__transition-type">⇅</span>
              <p
                v-for="ctrl in element.transitionControls"
                class="chain __control"
              >
                {{ ctrl }}&nbsp;
              </p>
            </li>
          </p>
        </ul>
        <div class="card-footer chain-list-footer text-muted">
          <input
            v-model="newChain__controls"
            placeholder="Controls"
            style="float: left"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-down-up"
            viewBox="0 0 16 16"
            @click="addElem_ParallelTransition($event, chain.name)"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-down"
            viewBox="0 0 16 16"
            @click="addElem_SequentialTransition($event, chain.name)"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
            />
          </svg>
          <div style="margin-top: 10px">
            <input
              v-model="newChain__name"
              style="float: left"
              placeholder="Name of project"
            />
            <span class="adding-hint">add new element</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mem from '../Memory.js';
import SVG from '../paths.js';
export default {
  name: 'ProjectChainList',
  props: {
    chains: Array,
  },
  data() {
    return {
      mem: mem,
      SVG: SVG,
    };
  },
  methods: {
    cl: console.log,
    rmChain: function (e, name) {
      this.mem.removeChain(name);
    },
    mvChain: function (e, id) {
      this.mem.renameChain(id, e.target.innerText);
    },
    addElem_ParallelTransition: function (e, chainName) {
      this.mem.addToChain(chainName, {
        name: this.newChain__name,
        transitionControls: [this.newChain__controls],
        transitionType: 'parallel',
      });
      this.newChain__name = '';
      this.newChain__controls = '';
    },
    addElem_SequentialTransition: function (e, chainName) {
      this.mem.addToChain(chainName, {
        name: this.newChain__name,
        transitionControls: [this.newChain__controls],
        transitionType: 'sequential',
      });
      this.newChain__name = '';
      this.newChain__controls = '';
    },
  },
};
</script>
<style>
.adding-hint {
  color: black;
  font-variant: small-caps;
  font-size: 12px;
}
.chains-list-func {
  height: 350px;
  max-width: 500px;
  overflow-y: scroll;
}
.chains-list {
  margin-left: 100px;
}
p.chain {
  margin: 0;
  display: inline;
}
.chain-title {
  color: inherit !important;
  margin-top: 10px;
}
.chains-list-func .card {
  margin-bottom: 10px;
}
.chain-list-footer svg {
  margin-left: 10px;
  border: 2px solid;
}
.list-group-item {
  padding: 0 !important;
  border: none !important;
}
.__element-name {
  width: fit-content;
  align-content: center;
  display: inline-block;
}
.__chain-sequence p li {
  font-variant: small-caps;
  font-size: 12px;
}
.__element-name {
  border-radius: 50%;
  border: solid 1px !important;
  padding: 3px !important;
  border-top-left-radius: 50% !important;
  border-top-right-radius: 50% !important;
}
.__transition-type {
  display: inline-block;
}
.__control {
  position: absolute;
  padding-left: 10px;
}
</style>
