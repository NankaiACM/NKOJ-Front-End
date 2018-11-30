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
            node.status = 'ac'
          } else if (all.indexOf(i) !== -1) {
            node.status = 'trying'
          } else {
            node.status = 'none'
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

const contestStatus = function (http, sid, lastid) {
  lastid = Number(lastid || 0)
  console.log(sid, lastid)
  return new Promise(function (resolve, reject) {
    http.get(window.noPointHost + '/api/status/contest/' + sid + '/' + lastid)
      .then(function (res) {
        resolve(res.body.data)
      }, function (err) {
        reject(err)
      })
  })
}
export {
  myStatus,
  pcStatus,
  contestStatus
}
