//-------------------------------------------------------------------hour variables
var hour = document.querySelector('.hour')
var minute = document.querySelector('.minute')
var nameday = document.querySelector('.nameday')
var ndate = document.querySelector('.ndate')
var month = document.querySelector('.month')
var year = document.querySelector('.year')
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
var data = new Date()
var hours = data.getHours()
/*-----------------------------------------------------------------weather variables*/
var inputcity = document.querySelector('.inputcity')
var btnsearch = document.querySelector('.btnsearch')
var weatherdescription = document.querySelector('.description')
var weathericon = document.querySelector('#icon')
var namecity = document.querySelector('.namecity')
var tempC = document.querySelector('.tempC')
var tempF = document.querySelector('.tempF')
var api = '80abda605526f239890885c33aa2a841'
var long
var lat
/*-----------------------------------------------------------------inputlist variables*/
var box_inputlist = document.querySelector('.container2_inputlist')
var inputlist = document.querySelector('.inputlist')
var btninputlist = document.querySelector('.btninputlist')
var btnconfirmednamelist = document.querySelector('.btnconfirmednamelist')
var container_all_lists = document.querySelector('.container_alllists')


//-----------------------------------------------------------------------events
window.addEventListener('load', loadpage)
btnsearch.addEventListener('click', searchcity)
inputlist.addEventListener('keypress', (e)=>{
  if(e.keyCode == 13){
    addlist(e)
  }
})
btninputlist.addEventListener('click', addlist)


//---------------------------------------------------------------------functions

hour.innerHTML = ('0' + data.getHours()).slice(-2)
minute.innerHTML = ('0' + data.getMinutes()).slice(-2)
nameday.innerHTML = days[data.getDay()]
ndate.innerHTML = data.getDate()
month.innerHTML = months[data.getMonth()]
year.innerHTML = data.getFullYear()

function searchcity(e) {
  e.preventDefault()
  var city = inputcity.value 
  getapi(city)
}
inputcity.addEventListener('keypress', (event)=>{
  if(event.keyCode == 13){
    searchcity(event)
  }
})

function loadpage() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      long = position.coords.longitude
      lat = position.coords.latitude

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`)
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        console.log(data)
        const {description, id} = data.weather[0]
        weatherdescription.innerHTML = description
        namecity.innerHTML = data.name
        tempC.innerHTML = Math.floor(data.main.temp) 
        let farenheit = (data.main.temp * 1.8) +32
        tempF.innerHTML = Math.floor(farenheit)

        if(id == 800){
          if(hours >=8 && hours < 20){
            weathericon.src = "icons/clear-day.svg"
          }else{
            weathericon.src = "icons/clear-night.svg"
          }
        }else if( id >=801 && id <= 804){
          weathericon.src = "icons/cloudy.svg"
        }else if( id >=200 && id <= 232){
          weathericon.src = "icons/Thunderstorm.svg"
        }else if( id >=300 && id <= 321){
          weathericon.src = "icons/Rain.svg"
        }else if( id >=500 && id <= 504){
          weathericon.src = "icons/Rain-day.svg"
        }else if( id == 511){
          weathericon.src = "icons/Frezze.svg"
        }else if( id >=520 && id <= 531){
          weathericon.src = "icons/Rain-night.svg"
        }else if( id >=600 && id <= 622){
          weathericon.src = "icons/Frezze.svg"
        }else if( id >=700 && id <= 781){
          weathericon.src = "icons/Fog.svg"
      }
      
      })
    }
  )}
}


var getapi = (city)=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`)
  .then((response)=>{
    return response.json()
  })
  .then((data)=>{
    console.log(data)
    const {description,id} = data.weather[0]
    weatherdescription.innerHTML = description
    namecity.innerHTML = data.name
    tempC.innerHTML = Math.floor(data.main.temp)
    let farenheit = (data.main.temp * 1.8) + 32
    tempF.innerHTML = Math.floor(farenheit)

    if(id == 800){
      if(hours >=8 && hours < 20){
        weathericon.src = "icons/clear-day.svg"
      }else if(hour >=20 && hour <8){
        weathericon.src = "icons/clear-day.svg"
      }
    }else if( id >=801 && id <= 804){
      weathericon.src = "icons/cloudy.svg"
    }else if( id >=200 && id <= 232){
      weathericon.src = "icons/Thunderstorm.svg"
    }else if( id >=300 && id <= 321){
      weathericon.src = "icons/Rain.svg"
    }else if( id >=500 && id <= 504){
      weathericon.src = "icons/Rain-day.svg"
    }else if( id == 511){
      weathericon.src = "icons/Frezze.svg"
    }else if( id >=520 && id <= 531){
      weathericon.src = "icons/Rain-night.svg"
    }else if( id >=600 && id <= 622){
      weathericon.src = "icons/Frezze.svg"
    }else if( id >=700 && id <= 781){
      weathericon.src = "icons/Fog.svg"
  }
  })
}


function addlist(e) {
  e.preventDefault()
  if(inputlist.value == 0){
    return alert('Please, Insert a name list')  
  }  
  //create  DIV container_list
  var DIVcontainer_list = document.createElement('div')
  DIVcontainer_list.classList.add('container_list')
  container_all_lists.appendChild(DIVcontainer_list)
  //create DIV box_namelist
  var DIVbox_namelist = document.createElement('div')
  DIVbox_namelist.classList.add('box_namelist')
  DIVcontainer_list.appendChild(DIVbox_namelist)
  //create P namelist
  var namelist = document.createElement('p')
  namelist.classList.add('namelist')
  namelist.innerHTML = inputlist.value
  DIVbox_namelist.appendChild(namelist)
  //create DIV btnnamelist
  var DIVbtnnamelist = document.createElement('div')
  DIVbtnnamelist.classList.add('btnnamelist')
  DIVbox_namelist.appendChild(DIVbtnnamelist)
  //create BUTTON btneditnamelist
  var btneditnamelist = document.createElement('button')
  btneditnamelist.classList.add('btneditnamelist')
  btneditnamelist.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
  DIVbtnnamelist.appendChild(btneditnamelist)
                  btneditnamelist.onclick = ()=>{
                    editnamelist(namelist)
                  }
  //create BUTTON btndeletelist
  var btndeletelist = document.createElement('div')
  btndeletelist.classList.add('btndeletelist')
  btndeletelist.innerHTML = '<i class="fa-solid fa-trash"></i>'
  DIVbtnnamelist.appendChild(btndeletelist)
  //create DIV box_inputtask
  var DIVbox_inputtask = document.createElement('div')
  DIVbox_inputtask.classList.add('box_inputtask')
  DIVcontainer_list.appendChild(DIVbox_inputtask)
  //create INPUT inputtask
  var inputtask = document.createElement('input')
  inputtask.classList.add('inputtask')
  inputtask.placeholder = 'Insert your task'
  DIVbox_inputtask.appendChild(inputtask)
  //create BUTTON btneditnametask
  var btnconfirmednametask = document.createElement('button')
  btnconfirmednametask.classList.add('btnconfirmednametask', 'hide')
  btnconfirmednametask.innerHTML = '<i class="fa-solid fa-check"></i>'
  DIVbox_inputtask.appendChild(btnconfirmednametask)
  //create BUTTON btnaddtask
  var btnaddtask = document.createElement('button')
  btnaddtask.classList.add('btnaddtask')
  btnaddtask.innerHTML ='<i class="fa-solid fa-plus"></i>'
  DIVbox_inputtask.appendChild(btnaddtask)
  btnaddtask.onclick = ()=>{  
                if(inputtask.value == 0){
                  return alert('Please, Insert a name task')
                }
                //create DIV box_task
                var DIVbox_task = document.createElement('div')
                DIVbox_task.classList.add('box_task')
                DIVbox_tasks.appendChild(DIVbox_task)
                //create P nametask
                var nametask = document.createElement('p')
                nametask.classList.add('nametask')
                nametask.innerHTML = inputtask.value
                DIVbox_task.appendChild(nametask)
                //create BUTTON btncompleted
                var btncompleted = document.createElement('button')
                btncompleted.classList.add('btncompleted')
                btncompleted.innerHTML = '<i class="fa-solid fa-check"></i>'
                DIVbox_task.appendChild(btncompleted)
                //create BUTTON btneditnametask
                var btneditnametask = document.createElement('button')
                btneditnametask.classList.add('btneditnametask')
                btneditnametask.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
                DIVbox_task.appendChild(btneditnametask)
                                            btneditnametask.onclick = ()=>{
                                              editnametask(nametask)
                                            }
                //create BUTTON btndeletetask
                var btndeletetask = document.createElement('button')
                btndeletetask.classList.add('btndeletetask')
                btndeletetask.innerHTML = '<i class="fa-solid fa-trash"></i>'
                DIVbox_task.appendChild(btndeletetask)
                inputtask.value =""
                inputtask.focus()
                 }
                
    //create DIV box_tasks
    var DIVbox_tasks = document.createElement('div')
    DIVbox_tasks.classList.add('box_tasks')
    DIVcontainer_list.appendChild(DIVbox_tasks)
    inputlist.value = ""
    inputlist.focus()

    //-----------------------------------------------------events
    //btndeletelist.addEventListener('click', deletelist)
    DIVcontainer_list.addEventListener('click', completeddelete)


    /*----------------------------------------------------toggle*/
function toggleeditnamelist(){
  btninputlist.classList.toggle('hide')
  btnconfirmednamelist.classList.toggle('hide')
  box_inputlist.classList.toggle('changecolor')
  inputlist.classList.toggle('changecolor')
  btneditnamelist.classList.toggle('changecolorbtn')
  
  }

function toggleeditnametask(){
  btnaddtask.classList.toggle('hide')
  btnconfirmednametask.classList.toggle('hide')
  DIVbox_inputtask.classList.toggle('changecolor')
  inputtask.classList.toggle('changecolor')
}

  
  

    //-------------------------------------------------editnamelist and task
function editnamelist(e){
  toggleeditnamelist()
  let editvalue = e.firstChild.nodeValue 
  inputlist.value = editvalue 
  inputlist.focus()
  btnconfirmednamelist.onclick = ()=>{
    toggleeditnamelist()
    e.firstChild.nodeValue = inputlist.value
    inputlist.value = ""
  }
}

function editnametask(e){
  toggleeditnametask()
  let editvalue = e.firstChild.nodeValue
  inputtask.value = editvalue
  inputtask.focus()
  btnconfirmednametask.onclick = ()=> {
    toggleeditnametask()
    e.firstChild.nodeValue = inputtask.value
    inputtask.value = ""
    inputtask.focus()
  }
}

}//chaves referente -> addlist(e)

function completeddelete(e){
  let item = e.target
  if(item.classList[0] == "btncompleted") {
    let y = item.parentElement
    y.classList.toggle('completed')
  }

  if(item.classList.contains("btndeletetask")){
    let x1 = item.parentElement
    x1.remove()
  }

  if(item.classList[0] == "btndeletelist"){
    let z = item.parentElement
    let z1 = z.parentElement
    let z2 = z1.parentElement
    z2.remove()
  }
}












