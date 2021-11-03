<template>
  <template v-if="navigator.mode == 'main-page'">
    <div id="app">
      <b-container class="bv-example-row">
        <b-row style="display: flex">
          <b-col class="planner-left-col">
            <p class="title-logo">PLANNER</p>
            <ProjectList
              v-bind:projects="projects"
              v-bind:mode="mode"
              v-bind:route="route"
              @update-route="openProject"
              :key="_projListUpdate"
            />
          </b-col>
          <b-col>
            <ProjectChainList
              v-bind:chains="chains"
              style="margin-top: 60px"
              @chain-state-changed="blockControls"
            />
          </b-col>
        </b-row>
      </b-container>
      <StatsWidget :key="statsFilterSelected" v-bind:filter="decodedFilter()" />
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="statsFilterSelected"
      >
        <option selected value="*">
          Display all projects (no matter what chain)
        </option>
        <optgroup label="----------"></optgroup>
        <option
          v-bind:value="'chain$$$' + chain.name"
          v-for="chain in mem.data.chains"
        >
          Chain: {{ chain.name }}
        </option>
        <optgroup label="----------"></optgroup>
        <option
          v-bind:value="'project$$$' + proj.name"
          v-for="proj in mem.data.projects"
        >
          Project: {{ proj.name }}
        </option>
      </select>
    </div>
  </template>

  <template v-if="navigator.mode == 'project-edit'">
    <div id="app">
      <b-container class="bv-example-row">
        <b-row style="display: flex">
          <b-col class="planner-left-col">
            <p class="title-logo" @click="navigator.mode = 'main-page'">
              PLANNER
            </p>
            <TaskLog
              v-bind:route="navigator.route"
              @update-cal="updateCalInsideProject"
              @task-state-changed="blockControls"
            />
          </b-col>
          <b-col>
            <p
              class="project-title"
              contenteditable="true"
              v-on:keypress.enter.prevent="$event.target.blur()"
              @focusout="project_renameSelf"
            >
              {{ navigator.route }}
            </p>
            <ProjectControls
              v-bind:route="navigator.route"
              @control-state-changed="blockControls"
            />
          </b-col>
        </b-row>
      </b-container>
      <StatsWidget
        :key="_internalCalKey"
        v-bind:filter="['project', navigator.route]"
      />
    </div>
  </template>
</template>

<script>
import Vue from 'vue';
import ProjectList from './components/ProjectList.vue';
import ProjectChainList from './components/ProjectChainList.vue';
import StatsWidget from './components/StatsWidget.vue';
import TaskLog from './components/TaskLog.vue';
import ProjectControls from './components/ProjectControls.vue';
import {default as mem, Log as log} from './Memory.js';

export default {
  name: 'App',
  components: {
    ProjectList,
    ProjectChainList,
    StatsWidget,
    TaskLog,
    ProjectControls
  },
  created() {
    this.blockControls();
  },
  methods: {
    openProject : function (routeName) {
      this.cls(routeName);
      this.navigator.mode = "project-edit";
      this.navigator.route = routeName;
    },
    updateCalInsideProject: function (v) {
      this.cls("AAAA");
      this._internalCalKey ++;
    },
    project_renameSelf: function (event) {
      var newName = event.target.innerText;
      mem.renameProject(this.navigator.route, newName);
      this.navigator.route = newName;
    },
    decodedFilter: function () {
      if (this.statsFilterSelected == "*") {
        return [null, null];
      }
      else {
        var dec = this.statsFilterSelected.split("$$$");
        return dec;
      }
    },
    blockControls: function () {
      var bc = this.mem.blockedControls();
      var byChain = this.mem.controlsByChain();
      this.cls(bc);
      this.cls("block_controls");
      var d = this.mem.data;
      for (var i = 0; i < d.projects.length; i ++) {
        d.projects[i].blocked = false;
        d.projects[i].inChains = [];
        for (var j = 0; j < d.projects[i].controls.length; j ++) {
          if (bc.indexOf(d.projects[i].controls[j].name) !== -1) {
            d.projects[i].blocked = true;
          }
          for (var chainName in byChain) {
            if (byChain[chainName].indexOf(d.projects[i].controls[j].name) !== -1) {
              d.projects[i].inChains.push(chainName);
            }
          }
        }
      }
      this.mem.data = d;
      this._projListUpdate ++;
    }
  },
  data() {
    return {
      navigator: {
        mode: "main-page",
        route: null
      },
      _internalCalKey: 0,
      _projListUpdate: 0,
      statsFilterSelected: "*",
      cls: console.log,
      mem: mem,
      selectedList: [] as any[],
      projects: mem.data.projects,
      chains: mem.data.chains
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.control-item {
  margin: 1px;
}

.edit-buttons {
  margin: 1px;
}

.title-logo {
  text-align: left;
  font-size: 30px;
  font-family: Times New Roman;
  letter-spacing: 10px;
  text-decoration: overline;
  margin-left: 50px;
}

.project-title {
  text-align: left;
  font-size: 20px;
  font-family: Times New Roman;
  letter-spacing: 5px;
  text-decoration: overline;
  margin-left: 50px;
}

.section-title {
  font-size: 20px;
  font-family: Times New Roman;
  letter-spacing: 10px;
  text-decoration: overline;
}

.card-body {
  padding: 0.5rem;
}

select {
  margin-left: 100px;
  margin-top: 10px;
  width: 722px !important;
}

svg {
  color: black;
  cursor: pointer;
}

.title-logo {
  cursor: pointer;
}

.planner-left-col {
  width: 500px;
  margin-bottom: 50px;
}
</style>
