var _l = window.localStorage;
var _p = JSON.parse;
var _s = JSON.stringify;
var plannerKey = 'planner_04b6';
var startTemplate = {
  projects: [],
  chains: [],
  _taskLog: {},
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
      id: getRandomInt(Math.pow(10, 8)),
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
          id: getRandomInt(Math.pow(10, 8)),
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
  renameChain(id, new_name) {
    var d = this.data;
    for (var i = 0; i < d.chains.length; i++) {
      if (d.chains[i].id == id) {
        d.chains[i].name = new_name;
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
  addToChain(name, element) {
    var d = this.data;
    for (var i = 0; i < d.chains.length; i++) {
      if (d.chains[i].name == name) {
        if (!element.name) {
          element.name = 'Step ' + (d.chains[i].elements.length + 1);
        }
        d.chains[i].elements.push(element);
        break;
      }
    }
    this.data = d;
    return true;
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
            yield logDay[j];
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
        var target = d._taskLog[date][i];
        if (target.type == 'todo') {
          target.type = 'solved';
        } else {
          target.type = 'todo';
        }
        var dsplit = new Date().toISOString().split('T');
        var today = dsplit[0];
        var time = dsplit[1];
        target.time = time;
        if (d._taskLog[today] === undefined) d._taskLog[today] = [];
        d._taskLog[today].push(target);
        delete d._taskLog[date][i];
        d._taskLog[date] = d._taskLog[date].filter((n) => n);
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

  control__remove(ctrlName, projName) {
    var d = this.data;
    for (var i = 0; i < d.projects.length; i++) {
      if (d.projects[i].name == projName) {
        for (var j = 0; j < d.projects[i].controls.length; j++) {
          if (d.projects[i].controls[j].name == ctrlName) {
            delete d.projects[i].controls[j];
            d.projects[i].controls = d.projects[i].controls.filter((n) => n);
            break;
          }
        }
      }
    }

    this.data = d;
    return true;
  },

  control__rename(id, projName, newCtrlName) {
    var d = this.data;

    for (var i = 0; i < d.projects.length; i++) {
      if (d.projects[i].name == projName) {
        for (var j = 0; j < d.projects[i].controls.length; j++) {
          if (d.projects[i].controls[j].id == id) {
            d.projects[i].controls[j].name = newCtrlName;
            break;
          }
        }
      }
    }

    this.data = d;
    return true;
  },

  control__setCountable(ctrlName, projName, boolCountable) {
    var d = this.data;

    for (var i = 0; i < d.projects.length; i++) {
      if (d.projects[i].name == projName) {
        for (var j = 0; j < d.projects[i].controls.length; j++) {
          if (d.projects[i].controls[j].name == ctrlName) {
            d.projects[i].controls[j].countable = boolCountable;
            break;
          }
        }
      }
    }

    this.data = d;
    return true;
  },

  control__setDone(ctrlName, projName, intDone) {
    var d = this.data;

    for (var i = 0; i < d.projects.length; i++) {
      if (d.projects[i].name == projName) {
        for (var j = 0; j < d.projects[i].controls.length; j++) {
          if (d.projects[i].controls[j].name == ctrlName) {
            d.projects[i].controls[j].done = intDone;
            break;
          }
        }
      }
    }

    this.data = d;
    return true;
  },

  getMaxForControl(controlName) {
    var d = this.data;
    var max = 0;
    for (var i = 0; i < d.projects.length; i++) {
      for (var j = 0; j < d.projects[i].controls.length; j++) {
        if (
          d.projects[i].controls[j].name == controlName &&
          d.projects[i].controls[j].countable &&
          d.projects[i].controls[j].done > max
        ) {
          max = d.projects[i].controls[j].done;
        }
      }
    }
    return max;
  },

  blockedControls() {
    var d = this.data;
    var blocked = [];
    for (var j = 0; j < d.chains.length; j++) {
      for (var k = 1; k < d.chains[j].elements.length; k++) {
        // TODO: support more than 1 control (line 335)
        if (
          d.chains[j].elements[k - 1].transitionType == 'sequential' &&
          this.getMaxForControl(
            d.chains[j].elements[k - 1].transitionControls[0]
          ) < 100
        ) {
          blocked.push(d.chains[j].elements[k].transitionControls[0]);
        }
      }
    }
    return blocked;
  },

  controlsByChain() {
    var d = this.data;
    var controls = {};
    for (var j = 0; j < d.chains.length; j++) {
      controls[d.chains[j].name] = [];
      for (var k = 0; k < d.chains[j].elements.length; k++) {
        if (d.chains[j].elements[k].transitionControls.length === 0) continue;
        // TODO: support more than 1 control (line 358)
        controls[d.chains[j].name].push(
          d.chains[j].elements[k].transitionControls[0]
        );
      }
    }
    return controls;
  },

  projectsWithControls(controlsList) {
    var d = this.data;
    var proj = [];
    for (var i = 0; i < d.projects.length; i++) {
      for (var j = 0; j < d.projects[i].controls.length; j++) {
        for (var k = 0; k < controlsList.length; k++) {
          if (controlsList.indexOf(d.projects[i].controls[j].name) !== -1) {
            proj.push(d.projects[i].name);
          }
        }
      }
    }
    return proj;
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
