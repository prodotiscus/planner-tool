<template>
  <div class="task-log">
    <span class="section-title">TASK LOG</span>
    <span style="margin-left: 5px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-bookmark"
        viewBox="0 0 16 16"
        @click="
          mem.addTodayEvent(newTodo());
          $emit('update-cal', 'yes');
        "
      >
        <path
          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-bookmark-check"
        viewBox="0 0 16 16"
        v-if="!blocked"
        @click="
          mem.addTodayEvent(newSolved());
          $emit('update-cal', 'yes');
        "
      >
        <path
          fill-rule="evenodd"
          d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
        />
        <path
          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
        />
      </svg>
    </span>
    <p></p>
    <div class="project-item-list">
      <div
        class="card text-center"
        :key="projectListing"
        v-for="item in getListedEvents(mem.getFilteredLog(['project', route]))"
      >
        <div class="card-body">
          <span
            class="card-text item-listed"
            contenteditable="true"
            v-on:keypress.enter.prevent="$event.target.blur()"
            @focusout="item__ModifyDesc($event, item.event.id, item.date)"
          >
            {{ item.event.content.desc }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
            style="float: right"
            @click="item__RemoveSelf($event, item.event.id, item.date)"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <div
          class="card-footer project-list-footer text-muted _toggling"
          v-bind:class="{ '_toggling-blocked': blocked }"
          @click="item__ToggleType($event, item.event.id, item.date)"
        >
          <span v-if="item.event.type == 'todo'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-hourglass-split"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
              /></svg
          ></span>
          <span v-if="item.event.type == 'solved'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
          </span>
          by {{ item.event.author }}
          {{
            new Date(item.date).toLocaleString('default', {
              month: 'long',
              day: 'numeric',
            })
          }}
          {{ item.event.time.split('.')[0] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { default as mem, Log as Lg } from '../Memory.js';

window.mem = mem;

export default {
  name: 'TaskLog',
  props: {
    route: String,
  },
  data() {
    return {
      mem: mem,
      blocked: mem.getProject(this.route).blocked,
      console_log: console.log,
      projectListing: 0,
    };
  },
  methods: {
    item__ModifyDesc: function (event, id, date) {
      mem.item__modifyDesc(date, id, event.target.innerText);
      this.$emit('update-cal', 'yes');
      this.$emit('task-state-changed', 'yes');
    },
    item__ToggleType: function (event, id, date) {
      if (this.blocked) return;
      mem.item__toggleTaskType(date, id);
      this.$emit('update-cal', 'yes');
      this.$emit('task-state-changed', 'yes');
      this.projectListing++;
    },
    item__RemoveSelf: function (event, id, date) {
      mem.item__remove(date, id);
      this.$emit('update-cal', 'yes');
      this.$emit('task-state-changed', 'yes');
      this.projectListing++;
    },
    getRandomInt: function (max) {
      return Math.floor(Math.random() * max);
    },
    newTodo: function () {
      return {
        content: {
          desc: 'Add some content to this TODO!',
        },
        type: 'todo',
        author: this.mem.username,
        time: new Date().toISOString().split('T')[1],
        linked: {
          project: this.route,
        },
        id: this.getRandomInt(Math.pow(10, 4)),
      };
    },
    newSolved: function () {
      return {
        content: {
          desc: 'Which task was solved?',
        },
        type: 'solved',
        author: this.mem.username,
        time: new Date().toISOString().split('T')[1],
        linked: {
          project: this.route,
        },
        id: this.getRandomInt(Math.pow(10, 4)),
      };
    },
    getEvents(fl, date) {
      if (fl[date] === undefined) return [];
      return fl[date];
    },
    getListedEvents(fl) {
      var result = [];
      var flDates = Object.keys(fl);
      flDates = flDates.sort().reverse();
      for (var i = 0; i < flDates.length; i++) {
        var date = flDates[i];
        if (fl[date] !== undefined && fl[date].length > 0) {
          fl[date] = fl[date]
            .sort(function (el1, el2) {
              return el1.time > el2.time ? 1 : -1;
            })
            .reverse();
          for (var j = 0; j < fl[date].length; j++) {
            result.push({
              date: date,
              event: fl[date][j],
            });
          }
        }
      }
      return result;
    },
  },
};
</script>

<style>
.task-log {
  height: 450px;
  max-width: 800px;
  margin-left: 100px;
}
.project-item-list {
  max-height: 400px;
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
.card-text.item-listed {
  max-width: 200px;
  display: inline-block;
  margin-right: 5px;
}
._toggling {
  cursor: pointer;
}
._toggling._toggling-blocked {
  cursor: not-allowed !important;
}
</style>
