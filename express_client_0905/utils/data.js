var app = getApp()
function searchmtdata(id) {
  var result
  for (let i = 0; i < mt_data.list.length; i++) {
    var mt = mt_data.list[i]
    if (mt.id == id) {
      result = mt
    }
  }
  return result || {}
}
function insertmtdata(obj) {
  mt_data.list.push(obj)
  // var arr=app.userList
  // arr.push(obj)
  //app.userList=arr
  //app.userList.insert(1)
  console.log(app.userList)
}

function mtData() {
  var arr = {
    list: [
      {
        id: '1',
        phone: "15820575589",
        address: '3-506',
        name: "林炯程",
        power:1
      }, {
        id: '2',
        phone: "15820575589",
        address: '3-506',
        name: "杨子明",
         power:0
      }, {
        id: '3',
        phone: "15820575589",
        address: '3-506',
        name: "彭云飞",
         power: 0
      }, {
        id: '4',
        phone: "15820575589",
        address: '3-506',
        name: "肖聪",
         power: 0
      }, {
        id: '5',
        phone: "15820575589",
        address: '3-506',
        name: "蔡信扬",
         power: 0
      }
    ]
  }
  return arr
}
var mt_data = mtData()
module.exports = {
  mtData: mtData,
  searchmtdata: searchmtdata,
  insertmtdata: insertmtdata
}