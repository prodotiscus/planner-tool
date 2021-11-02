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
      <div class="card" style="width: 14rem" v-for="chain in mem.data.chains">
        <div class="card-body">
          <h5 class="card-title">{{ chain.name }}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <p class="chain" v-for="element in chain.elements">
            <li class="list-group-item">{{ element.name }}</li>
            <li
              class="list-group-item"
              v-if="element.transitionType == 'sequential'"
            >
              ↓
              <p v-for="ctrl in element.transitionControls" class="chain">
                {{ ctrl }}&nbsp;
              </p>
            </li>
            <li
              class="list-group-item"
              v-if="element.transitionType == 'parallel'"
            >
              ⇅
            </li>
          </p>
        </ul>
        <div class="card-footer project-list-footer text-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
            @click="rmChain"
          >
            <path v-bind:d="SVG.paths.trash_remove[0]" />
            <path fill-rule="evenodd" v-bind:d="SVG.paths.trash_remove[1]" />
          </svg>
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
    rmChain: function (e) {
      var el = e.target;
      if (el.nodeName == 'path') el = el.parentNode;
      var t =
        el.parentNode.parentNode.querySelector('div .card-title').innerText;
      this.mem.removeChain(t);
    },
  },
};
</script>
<style>
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
</style>
