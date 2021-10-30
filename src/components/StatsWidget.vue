<template>
  <div class="calendar-holder">
    <svg width="722" height="112" class="js-calendar-graph-svg">
      <g transform="translate(10, 20)">
        <g v-bind:transform="vars.parentXTransform" v-for="(vars, j) in xList">
          <rect
            width="10"
            height="10"
            v-bind:x="vars.childXProperty"
            y="0"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            v-bind:data-count="countForDate(todayMinus(7 * (52 - j) + 6))"
            v-bind:data-level="
              levelForCount(countForDate(todayMinus(7 * (52 - j) + 6)))
            "
            v-bind:data-date="todayMinus(7 * (52 - j) + 6)"
            data-level="0"
          ></rect>
          <rect
            width="10"
            height="10"
            v-bind:x="vars.childXProperty"
            y="13"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            v-bind:data-count="countForDate(todayMinus(7 * (52 - j) + 5))"
            v-bind:data-level="
              levelForCount(countForDate(todayMinus(7 * (52 - j) + 5)))
            "
            v-bind:data-date="todayMinus(7 * (52 - j) + 5)"
          ></rect>
          <rect
            width="10"
            height="10"
            v-bind:x="vars.childXProperty"
            y="26"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            v-bind:data-count="countForDate(todayMinus(7 * (52 - j) + 4))"
            v-bind:data-level="
              levelForCount(countForDate(todayMinus(7 * (52 - j) + 4)))
            "
            v-bind:data-date="todayMinus(7 * (52 - j) + 4)"
          ></rect>
          <rect
            width="10"
            height="10"
            v-bind:x="vars.childXProperty"
            y="39"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            v-bind:data-count="countForDate(todayMinus(7 * (52 - j) + 3))"
            v-bind:data-level="
              levelForCount(countForDate(todayMinus(7 * (52 - j) + 3)))
            "
            v-bind:data-date="todayMinus(7 * (52 - j) + 3)"
          ></rect>
          <rect
            width="10"
            height="10"
            v-bind:x="vars.childXProperty"
            y="52"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            v-bind:data-count="countForDate(todayMinus(7 * (52 - j) + 2))"
            v-bind:data-level="
              levelForCount(countForDate(todayMinus(7 * (52 - j) + 2)))
            "
            v-bind:data-date="todayMinus(7 * (52 - j) + 2)"
          ></rect>
          <rect
            width="10"
            height="10"
            v-bind:x="vars.childXProperty"
            y="65"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            v-bind:data-count="countForDate(todayMinus(7 * (52 - j) + 1))"
            v-bind:data-level="
              levelForCount(countForDate(todayMinus(7 * (52 - j) + 1)))
            "
            v-bind:data-date="todayMinus(7 * (52 - j) + 1)"
          ></rect>
          <rect
            width="10"
            height="10"
            v-bind:x="vars.childXProperty"
            y="78"
            class="ContributionCalendar-day"
            rx="2"
            ry="2"
            v-bind:data-count="countForDate(todayMinus(7 * (52 - j) + 0))"
            v-bind:data-level="
              levelForCount(countForDate(todayMinus(7 * (52 - j) + 0)))
            "
            v-bind:data-date="todayMinus(7 * (52 - j) + 0)"
          ></rect>
        </g>
        <text x="14" y="-7" class="ContributionCalendar-label">
          {{ months[0] }}
        </text>
        <text x="53" y="-7" class="ContributionCalendar-label">
          {{ months[1] }}
        </text>
        <text x="118" y="-7" class="ContributionCalendar-label">
          {{ months[2] }}
        </text>
        <text x="170" y="-7" class="ContributionCalendar-label">
          {{ months[3] }}
        </text>
        <text x="235" y="-7" class="ContributionCalendar-label">
          {{ months[4] }}
        </text>
        <text x="287" y="-7" class="ContributionCalendar-label">
          {{ months[5] }}
        </text>
        <text x="339" y="-7" class="ContributionCalendar-label">
          {{ months[6] }}
        </text>
        <text x="391" y="-7" class="ContributionCalendar-label">
          {{ months[7] }}
        </text>
        <text x="456" y="-7" class="ContributionCalendar-label">
          {{ months[8] }}
        </text>
        <text x="508" y="-7" class="ContributionCalendar-label">
          {{ months[9] }}
        </text>
        <text x="560" y="-7" class="ContributionCalendar-label">
          {{ months[10] }}
        </text>
        <text x="625" y="-7" class="ContributionCalendar-label">
          {{ months[11] }}
        </text>
        <text x="677" y="-7" class="ContributionCalendar-label">
          {{ months[0] }}
        </text>
        <text
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-10"
          dy="8"
          style="display: none"
        >
          Sun
        </text>
        <text
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-10"
          dy="22"
        >
          Mon
        </text>
        <text
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-10"
          dy="32"
          style="display: none"
        >
          Tue
        </text>
        <text
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-10"
          dy="48"
        >
          Wed
        </text>
        <text
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-10"
          dy="57"
          style="display: none"
        >
          Thu
        </text>
        <text
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-10"
          dy="73"
        >
          Fri
        </text>
        <text
          text-anchor="start"
          class="ContributionCalendar-label"
          dx="-10"
          dy="81"
          style="display: none"
        >
          Sat
        </text>
      </g>
    </svg>
  </div>
</template>

<style>
.calendar-holder {
  text-align: left;
  margin-left: 100px;
  margin-top: 10px;
}
.ContributionCalendar-label {
  font-size: 9px;
  fill: var(--color-fg-default);
}
.ContributionCalendar-day,
.ContributionCalendar-day[data-level='0'] {
  fill: var(--color-calendar-graph-day-bg);
  shape-rendering: geometricPrecision;
  outline: 1px solid var(--color-calendar-graph-day-border);
  outline-offset: -1px;
}

.ContributionCalendar-day[data-level='1'] {
  fill: var(--color-calendar-graph-day-L1-bg);
  outline: 1px solid var(--color-calendar-graph-day-L1-border);
}

.ContributionCalendar-day[data-level='2'] {
  fill: var(--color-calendar-graph-day-L2-bg);
  outline: 1px solid var(--color-calendar-graph-day-L2-border);
}

.ContributionCalendar-day[data-level='3'] {
  fill: var(--color-calendar-graph-day-L3-bg);
  outline: 1px solid var(--color-calendar-graph-day-L3-border);
}

.ContributionCalendar-day[data-level='4'] {
  fill: var(--color-calendar-graph-day-L4-bg);
  outline: 1px solid var(--color-calendar-graph-day-L4-border);
}

:root,
[data-color-mode='light'][data-light-theme*='light'],
[data-color-mode='dark'][data-dark-theme*='light'] {
  --color-workflow-card-connector: var(--color-scale-gray-3);
  --color-workflow-card-connector-bg: var(--color-scale-gray-3);
  --color-workflow-card-connector-inactive: var(--color-border-default);
  --color-workflow-card-connector-inactive-bg: var(--color-border-default);
  --color-workflow-card-connector-highlight: var(--color-scale-blue-4);
  --color-workflow-card-connector-highlight-bg: var(--color-scale-blue-4);
  --color-workflow-card-bg: var(--color-scale-white);
  --color-workflow-card-inactive-bg: var(--color-canvas-inset);
  --color-workflow-card-header-shadow: rgba(0, 0, 0, 0);
  --color-workflow-card-progress-complete-bg: var(--color-scale-blue-4);
  --color-workflow-card-progress-incomplete-bg: var(--color-scale-gray-2);
  --color-discussions-state-answered-icon: var(--color-scale-white);
  --color-bg-discussions-row-emoji-box: rgba(209, 213, 218, 0.5);
  --color-notifications-button-text: var(--color-fg-muted);
  --color-notifications-button-hover-text: var(--color-fg-default);
  --color-notifications-button-hover-bg: var(--color-scale-gray-2);
  --color-notifications-row-read-bg: var(--color-canvas-subtle);
  --color-notifications-row-bg: var(--color-scale-white);
  --color-page-header-bg: var(--color-canvas-subtle);
  --color-icon-directory: var(--color-scale-blue-3);
  --color-checks-step-error-icon: var(--color-scale-red-4);
  --color-calendar-halloween-graph-day-L1-bg: #ffee4a;
  --color-calendar-halloween-graph-day-L2-bg: #ffc501;
  --color-calendar-halloween-graph-day-L3-bg: #fe9600;
  --color-calendar-halloween-graph-day-L4-bg: #03001c;
  --color-calendar-graph-day-bg: #ebedf0;
  --color-calendar-graph-day-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L1-bg: #9be9a8;
  --color-calendar-graph-day-L2-bg: #40c463;
  --color-calendar-graph-day-L3-bg: #30a14e;
  --color-calendar-graph-day-L4-bg: #216e39;
  --color-calendar-graph-day-L1-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L2-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L3-border: rgba(27, 31, 35, 0.06);
  --color-calendar-graph-day-L4-border: rgba(27, 31, 35, 0.06);
  --color-user-mention-fg: var(--color-fg-default);
  --color-user-mention-bg: var(--color-attention-subtle);
  --color-text-white: var(--color-scale-white);
}
</style>

<script>
import { default as mem, Log as log } from '../Memory.js';

export default {
  name: 'StatsWidget',
  props: {
    filter: Array,
  },
  methods: {
    generate_X: function () {
      var i = 0;
      var j = 14;
      var varList = [];
      while (i <= 728) {
        varList.push({
          parentXTransform: 'translate(' + i + ', 0)',
          childXProperty: j.toString(),
        });
        i += 14;
        j--;
      }
      console.log(varList);
      return varList;
    },
    months: function () {
      var d = new Date();
      var c = d.getMonth();
      var m = [...Array(12).keys()];
      var n = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      var cal = m.slice(c).concat(m.slice(0, c + 1));
      function* numberToName(m, n) {
        for (let j = 0; j < m.length; j++) {
          yield n[m[j]];
        }
      }
      return [...numberToName(cal, n)];
    },
    todayMinus: function (n) {
      var d = new Date();
      d.setDate(d.getDate() - n);
      return d.toISOString().split('T')[0];
    },
    countForDate: function (date) {
      return this.getEvents(this.log, date).filter((e) => e.type == 'solved')
        .length;
    },
    levelForCount: function (count) {
      if (count > this.maxCount) {
        this.maxCount = count;
        return 4;
      }
      if (this.maxCount === 0) return 0;
      return Math.round((1 / this.maxCount) * 4 * count);
    },
    getEvents(fl, date) {
      if (fl[date] === undefined) return [];
      return fl[date];
    },
    getListedEvents(fl) {
      var result = [];
      for (var date in fl) {
        if (fl[date] !== undefined && fl[date].length > 0) {
          for (var i = 0; i < fl[date].length; i++) {
            result.push({
              date: date,
              event: fl[date][i],
            });
          }
        }
      }
      return result;
    },
  },
  data() {
    return {
      mem: mem,
      log: mem.getFilteredLog(this.filter),
      xList: this.generate_X(),
      months: this.months(),
      maxCount: 0,
    };
  },
};
</script>
