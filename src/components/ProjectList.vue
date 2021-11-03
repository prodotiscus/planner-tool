<template>
  <div class="projects-list">
    <span class="section-title">PROJECTS</span>
    <span style="margin-left: 5px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-plus-square-dotted"
        viewBox="0 0 16 16"
        v-on:click="mem.addEmptyProject"
      >
        <path v-bind:d="SVG.paths.plus_dotted" />
      </svg>
    </span>
    <p></p>
    <div class="project-item-list">
      <div
        class="card text-center"
        v-for="proj in mem.data.projects"
        v-bind:class="{ __blocked: proj.blocked }"
      >
        <div class="card-body">
          <h5 class="card-title">{{ proj.name }}</h5>
          <p class="card-text">
            <button
              type="button"
              class="btn btn-primary control-item"
              v-for="ctrl in sortControls(proj.controls)"
            >
              {{ ctrl.name }}
              <span class="badge badge-light" v-if="ctrl.countable"
                >{{ Number(ctrl.done) }}%</span
              >
            </button>
          </p>
        </div>
        <div class="card-footer project-list-footer text-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="16"
            fill="currentColor"
            class="bi bi-pencil"
            viewBox="0 0 16 16"
            @click="updateRouteLocally(proj.name)"
          >
            <path v-bind:d="SVG.paths.pencil_edit" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
            @click="rmProj"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
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
  name: 'ProjectList',
  props: {
    projects: Array,
  },
  data() {
    return {
      mem: mem,
      SVG: SVG,
    };
  },
  methods: {
    rmProj: function (e) {
      var el = e.target;
      if (el.nodeName == 'path') el = el.parentNode;
      var t = el.parentNode.parentNode.querySelector('.card-title').innerText;
      this.mem.removeProject(t);
    },
    updateRouteLocally: function (routeName) {
      this.$emit('update-route', routeName);
    },
    sortControls: function (controlsList) {
      var ctb = controlsList.filter((ctrl) => ctrl.countable);
      ctb = ctb.sort((a, b) => b.done - a.done);
      return ctb.slice(0, 3);
    },
  },
};
</script>

<style>
.projects-list {
  height: 350px;
  max-width: 500px;
  margin-left: 100px;
}
.project-item-list {
  height: 350px;
  overflow-y: scroll;
}
.control-item,
.edit-buttons {
  font-size: 12px;
  font-weight: bold;
}
.card-title {
  font-family: Roboto;
  letter-spacing: 0.5px;
}
.card-footer {
  border-top: 0;
}
.project-item-list .card {
  margin-bottom: 10px;
}
</style>
