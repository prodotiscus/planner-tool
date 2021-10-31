var _l = window.localStorage;
var _p = JSON.parse;
var _s = JSON.stringify;
var plannerKey = 'planner_04b6';
var startTemplate = {
  projects: [],
  chains: [],
  _taskLog: new Object(),
  taskState: {},
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
  get data() {
    if (_l[plannerKey] === undefined) {
      _l.setItem(plannerKey, _s(startTemplate));
    }
    return _p(_l[plannerKey]);
  },
  set data(d) {
    _l.setItem(plannerKey, _s(d));
  },
  get username() {
    return 'root';
  },
  addEmptyProject() {
    var newEmpty = {
      name: 'Project #' + getRandomInt(Math.pow(10, 4)),
      controls: [],
      tasks: [],
      inChains: [],
    };
    var d = this.data;
    d.projects.push(newEmpty);
    this.data = d;
  },
  addEmptyChain() {
    var newEmpty = {
      name: 'Chain #' + getRandomInt(Math.pow(10, 4)),
      elements: [],
    };
    var d = this.data;
    d.chains.push(newEmpty);
    this.data = d;
  },
  addEmptyControl(projName) {
    var d = this.data;
    for (var i = 0; i < d.projects.length; i++) {
      if (d.projects[i].name == projName) {
        d.projects[i].controls.push({
          name: '#' + getRandomInt(Math.pow(10, 4)),
          countable: true,
          done: 0.0,
        });
      }
    }
    this.data = d;
  },
  addTodayEvent(eventObj) {
    var d = this.data;
    var dsplit = new Date().toISOString().split('T');
    var today = dsplit[0];
    var time = dsplit[1];
    eventObj.time = time;
    if (d._taskLog[today] === undefined) {
      d._taskLog[today] = [];
    }
    d._taskLog[today].push(eventObj);
    this.data = d;
  },
  removeProject(name) {
    var d = this.data;
    d.projects2 = d.projects;
    d.projects = [];
    for (var i = 0; i < d.projects2.length; i++) {
      if (d.projects2[i].name != name) {
        d.projects.push(d.projects2[i]);
      }
    }
    delete d.projects2;
    this.data = d;
  },
  getProject(name) {
    for (var i = 0; i < this.data.projects.length; i++) {
      if (this.data.projects[i].name == name) {
        return this.data.projects[i];
      }
    }
    return null;
  },
  renameProject(name, new_name) {
    var d = this.data;
    for (var i = 0; i < d.projects.length; i++) {
      if (d.projects[i].name == name) {
        d.projects[i].name = new_name;
        /*  ******* */
        for (var date in d._taskLog) {
          for (var i = 0; i < d._taskLog[date].length; i++) {
            if (d._taskLog[date][i].linked.project == name) {
              d._taskLog[date][i].linked.project = new_name;
            }
          }
        }
        /*  ******* */
        this.data = d;
        return true;
      }
    }
    return false;
  },
  removeChain(name) {
    var d = this.data;
    d.chains2 = d.chains;
    d.chains = [];
    for (var i = 0; i < d.chains2.length; i++) {
      if (d.chains2[i].name != name) {
        d.chains.push(d.chains2[i]);
      }
    }
    delete d.chains2;
    this.data = d;
  },

  getFilteredLog(filterPair) {
    var _log = this.data._taskLog;
    function* filterLogDay(logDay, criterion, value) {
      for (let j = 0; j < logDay.length; j++) {
        if (criterion == 'project' && logDay[j].linked.project == value) {
          yield logDay[j];
        } else if (criterion == 'chain') {
          var p = mem.getProject(logDay[j].linked.project);
          if (p === null) {
            continue;
          } else if (p.inChains.indexOf(value) !== -1) {
            yield logDay[i];
          }
        }
      }
    }

    if (filterPair[0] !== null) {
      for (var key in _log) {
        _log[key] = [...filterLogDay(_log[key], filterPair[0], filterPair[1])];
      }
    }

    return _log;
  },

  item__modifyDesc(date, item_id, new_desc) {
    var d = this.data;
    if (d._taskLog[date] === undefined) return;

    for (var i = 0; i < d._taskLog[date].length; i++) {
      if (d._taskLog[date][i].id == item_id) {
        d._taskLog[date][i].content.desc = new_desc;
        break;
      }
    }

    this.data = d;

    return true;
  },

  item__toggleTaskType(date, item_id) {
    var d = this.data;
    if (d._taskLog[date] === undefined) return;

    for (var i = 0; i < d._taskLog[date].length; i++) {
      if (d._taskLog[date][i].id == item_id) {
        if (d._taskLog[date][i].type == 'todo') {
          d._taskLog[date][i].type = 'solved';
        } else {
          d._taskLog[date][i].type = 'todo';
        }
        break;
      }
    }

    this.data = d;

    return true;
  },

  item__remove(date, item_id) {
    var d = this.data;
    if (d._taskLog[date] === undefined) return;

    for (var i = 0; i < d._taskLog[date].length; i++) {
      if (d._taskLog[date][i].id == item_id) {
        delete d._taskLog[date][i];
        d._taskLog[date] = d._taskLog[date].filter((n) => n);
        break;
      }
    }

    this.data = d;

    return true;
  },
};

/*

log: {

    getForDate: function (date) {
      if (this.data.taskLog[date] === undefined) {
        return [];
      } else {
        return this.data.taskLog[date];
      }
    }

  }

*/
