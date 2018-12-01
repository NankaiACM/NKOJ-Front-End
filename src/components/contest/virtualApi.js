const getSets = function (sets) {
  let idsets = []
  for (let i of sets) {
    idsets.push(i.problem_id)
  }
  return idsets
}

const myStatus = function (http, sets) {
  let idsets = getSets(sets)
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/u')
      .then(function (res) {
        let ret = []
        const all = res.body.data.all
        const ac = res.body.data.ac
        for (let i of idsets) {
          let node = {id: i, status: ''}
          if (ac.indexOf(i) !== -1) {
            node.status = 2 // 'ac'
          } else if (all.indexOf(i) !== -1) {
            node.status = 1 // 'trying'
          } else {
            node.status = 0 // 'none'
          }
          ret.push(node)
        }
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const pcStatus = function (http, sets, oldstatus, startime, endtime) { // 这是魔改的api，不建议使用
  let idsets = getSets(sets)
  startime = new Date(startime).getTime()
  endtime = new Date(endtime).getTime()
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/status')
      .then(function (res) {
        let ret = []
        const status = res.body.data
        for (let s of status) {
          console.log(s)
          if (idsets.indexOf(s.problem_id) === -1) continue
          if (oldstatus.has(s.solution_id)) continue
          let when = new Date(s.when).getTime()
          if (when > endtime) continue
          if (when < startime) continue
          oldstatus.add(s.solution_id)
          ret.push(s)
        }
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const contestStatus = function (http, sid, lastid, start, end) {
  start = new Date(start).getTime()
  end = new Date(end).getTime()
  lastid = Number(lastid || 0)
  console.log(sid, lastid, start, end)
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/status/contest/' + sid + '/' + lastid)
      .then(function (res) {
        let ret = []
        if (res.body.data) {
          for (let it of res.body.data) {
            let t = new Date(it['when']).getTime()
            if (t > start && t < end) ret.push(it)
          }
        }
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const contestData = function (http, cid) {
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/contest/cid')
      .then(function (res) {
        let ret = res.body.data
        resolve(ret)
      }, function (err) {
        reject(err)
      })
  })
}

const rankList = async function (http, cid) {
  let during = await contestData(http, cid)
  let [startime, endtime] = JSON.parse(during)
  let status = await contestStatus(http, cid, 0, startime, endtime)
  const suptime = new Date(startime).getTime()
  const getUsers = function (list) {
    let sets = new Set([])
    let pack = {}
    for (let it of list) {
      if (!sets.has(it['user_id'])) {
        sets.add(it['user_id'])
        pack[it['user_id']] = []
      }
      it['love41'] = new Date(it['when']).getTime() - suptime
      pack[it['user_id']].push(it)
    }
    for (let id in pack) {
      pack[id].sort(function (l, r) {
        return l['solution_id'] - r['solution_id']
      })
    }
    return {
      sets: sets,
      pack: pack
    }
  }
  let users = getUsers(status)
  // struct:
  /* 0: how many ac
     1: total time
     2...: time (NaN is not ac yet)
  */
  const penalty = 20 * 60 * 1000
  const ret = []
  for (let it of users.sets) {
    let one = new Map()
    let add = new Map()
    for (let ht of users.pack[it]) {
      const pid = ht['problem_id']
      const when = ht['love41']
      if (ht['status_id'].toString() === 107) {
        if (!one.has(pid)) {
          one.set(pid, when)
        } else {
          one[pid] = Math.min(one[pid], when)
        }
      } else {
        if (!one.has(pid)) {
          if (!add.has(pid)) {
            add.set(pid, penalty)
          } else {
            add[pid] += penalty
          }
        }
      }
    }
    const allac = one.size
    let alltime = 0
    for (let i in one) {
      alltime += one[i]
      if (add.has(i)) alltime += add[i]
    }
    ret.push({
      uid: it,
      nickname: users.pack[0]['nickname'],
      allac: allac,
      alltime: alltime,
      one: one,
      add: add
    })
  }
  return ret
}

export {
  myStatus,
  pcStatus,
  contestStatus,
  rankList
}
