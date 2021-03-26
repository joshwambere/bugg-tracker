const getBugs=async()=>{
  const container=document.querySelector('#bug')
  fetch('http://127.0.0.1:3000/bugs', {
      method: 'get',
      headers: {
        'content-type':'application/json'
      }}
    )
    .then(async (response)=> {
        if (response.status !== 200) {
          const msg=await response.json()
          const error=document.querySelector('.errors')
          error.innerHTML+=`<div class="alert alert-danger" role="alert">
          Bug not added ${msg.message}
        </div>`
        }else{
          res=await response.json();
          res.bugs.forEach(item=>{
            container.innerHTML+=`<div class="draggable bg-white mt-2" draggable="true">
            <div class="draggable-info ">
              <p>${item.bug_title}</p>
              <i class="float-right draggings-user">Johnson</i>
            </div>
          </div>`
          })
          draggs()
        }
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })
  
}
getBugs()

function draggs(){
  const draggables=document.querySelectorAll('.draggable')
  const containers=document.querySelectorAll('.draggings')

  draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',()=>{
      draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend',()=>{
      draggable.classList.remove('dragging')
    })
  })

  containers.forEach(container=>{
    container.addEventListener('dragover',(e)=>{
      e.preventDefault()
      const afterElement=getDraggAfterElement(container,e.clientY)
      const draggable=document.querySelector('.dragging')
      switch(container.id) {
        case 'bug':
          // code block
          break;
        case 'fixing':
          // code block
          break;
          break;
        case 'testing':
          // code block
          break;
        case 'fixed':
          // code block
          break;
        default:
          // code block
      }
          if(afterElement==null){
            container.appendChild(draggable)
          }else{
            container.insertBefore(draggable, afterElement)
          }
    })
  })


  const getDraggAfterElement=(container,y)=>{
    const draggableElements=[...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest,child)=>{
      const box=child.getBoundingClientRect()
      const offset=y- box.top - box.height /2
      if(offset<0 && offset>closest.offset){
        return {offset:offset, element:child}
      }else{
        return closest
      }
    }, {offset:Number.NEGATIVE_INFINITY}).element
  }
}

function addBug(){

  const form=document.getElementById("myForm")
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const bug_title=document.querySelector('#title').value
    const bug_desc=document.querySelector('#desc').value
    const bug_priority=document.querySelector('#priority').value
    const bug_status="new"
    let data={
      bug_title,
      bug_desc,
      bug_priority,
      bug_status
    }

    fetch('http://127.0.0.1:3000/bugs/add', {
      method: 'post',
      headers: {
        'content-type':'application/json',
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(data)}
    )
    .then(async (response)=> {
        if (response.status !== 201) {
          const msg=await response.json()
          const error=document.querySelector('.errors')
           error.innerHTML+=`<div class="alert alert-danger" role="alert">
          Bug not added ${msg.message}
        </div>`
       
        form.reset()
        }else{
          form.reset()
          const modal=document.querySelector('#exampleModal')
          modal.classList.remove('show')
          const shadow=document.querySelector('.modal-backdrop')
          shadow.classList.remove('show')
          
        }
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  })
  
}


const login=()=>{
  const loginForm=document.querySelector('#loginForm')
  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email=document.querySelector('#email').value
    const password=document.querySelector('#password').value
    let data={
      email,
      password
    }
    fetch('http://127.0.0.1:3000/users/login', {
      method: 'post',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(data)}
    )
    .then(async (response)=> {
        if (response.status !== 200) {
          const msg=await response.json()
          const error=document.querySelector('.errors')
           error.innerHTML+=`<div class="alert alert-danger" role="alert">
          Bug not added ${msg.message}
        </div>`
        }else{
          res=await response.json();
          console.log(res)
          localStorage.setItem("user",JSON.stringify(res.user))
          localStorage.setItem("token",res.token)
          loginForm.reset()
          const modal=document.querySelector('#loginModal')
          modal.classList.remove('show')
          const shadow=document.querySelector('.modal-backdrop')
          shadow.classList.remove('show')
          
        }
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })

  })
}

