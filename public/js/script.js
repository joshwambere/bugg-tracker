const getSingleBug=async(boxId)=>{
  let data=  await fetch(`http://127.0.0.1:3000/bugs/${boxId}`, {
    method: 'get',
    headers: {
      'content-type':'application/json',
      "Authorization": localStorage.getItem('token')
    }}
  ).then(async (response)=> {
     if (response.status == 200){
       const  bugData= await response.json();
        return bugData;
      }
        
    });

    return data;
    
}
async function getUser(id){
  let data=  await fetch(`http://127.0.0.1:3000/users/${id}`, {
    method: 'get',
    headers: {
      'content-type':'application/json',
      "Authorization": localStorage.getItem('token')
    }}
  ).then(async (response)=> {
     if (response.status == 200){
       const  bugData= await response.json();
        return bugData;
      }
        
    });

    return data;
}


const getBugs=async()=>{
  fetch('http://127.0.0.1:3000/bugs', {
      method: 'get',
      headers: {
        'content-type':'application/json'
      }}
    )
    .then(async (response)=> {
      const buxNumber=document.querySelector('#bugs');
      const res=await response.json()
      buxNumber.innerHTML=res.bugs.length;
        if (response.status !== 200) {
          const msg=await response.json()
          const error=document.querySelector('.errors')
          error.innerHTML+=`<div class="alert alert-danger" role="alert">
          Bug not added ${msg.message}
        </div>`
        }else{
          

          res.bugs.forEach(item=>{
            const user=getUser(item.added_by)
            console.log(user);
            switch(item.bug_status) {
              case 'bug':
                const bugCont=document.querySelector('#bug')
                bugCont.innerHTML+=`<div class="draggable bg-white mt-2" draggable="true" name="dragg">
                  <div class="draggable-info ">
                    <p class="bugTitle">${item.bug_title}</p>
                    <div class="del-section">
                      <i class="float-right draggings-user">${item.user.names}</i>
                      <i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteBug(${item.id})"  data-id="${item.id}"></i>
                    </div>
                    
                  </div>
                  <input value="${item.id}" class="bug_id" hidden="true"></input>
                </div>`
                break;
              case 'fixing':
                const fixCont=document.querySelector('#fixing')
                fixCont.innerHTML+=`<div class="draggable bg-white mt-2" draggable="true">
                  <div class="draggable-info ">
                    <p class="bugTitle">${item.bug_title}</p>
                    <div class="del-section">
                      <i class="float-right draggings-user">${item.user.names}</i>
                      <i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteBug(${item.id})"  data-id="${item.id}"></i>
                    </div>
                  </div>
                  <input value="${item.id}" class="bug_id" hidden="true"></input>
                </div>`
                break;
              case 'testing':
                const testCont=document.querySelector('#testing')
                testCont.innerHTML+=`<div class="draggable bg-white mt-2" draggable="true">
                  <div class="draggable-info ">
                    <p class="bugTitle">${item.bug_title}</p>
                    <div class="del-section">
                      <i class="float-right draggings-user">${item.user.names}</i>
                      <i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteBug(${item.id})"  data-id="${item.id}"></i>
                    </div>
                  </div>
                  <input value="${item.id}" class="bug_id" hidden="true"></input>
                </div>`
                break;
              case 'fixed':
                const doneCont=document.querySelector('#fixed')
                doneCont.innerHTML+=`<div class="draggable bg-white mt-2" draggable="true">
                <div class="draggable-info ">
                  <p class="bugTitle">${item.bug_title}</p>
                  <div class="del-section">
                      <i class="float-right draggings-user">${item.user.names}</i>
                      <i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteBug(${item.id})"  data-id="${item.id}"></i>
                    </div>
                  
                </div>
                <input value="${item.id}" class="bug_id" hidden="true"></input>
              </div>`
                break;
              default:
                const defCont=document.querySelector('#bug')
                defCont.innerHTML+=`<div class="draggable bg-white mt-2" draggable="true">
                  <div class="draggable-info ">
                    <p class="bugTitle">${item.bug_title}</p>
                    <div class="del-section">
                      <i class="float-right draggings-user">${item.user.names}</i>
                      <i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteBug(${item.id})"  data-id="${item.id}"></i>
                    </div>
                  </div>
                  <input value="${item.id}" class="bug_id" hidden="true"></input>
                </div>`
            }
            
            draggs()
          }) 
            
        }
      }
    )
    .catch(function(err) {
      console.log('error ', err);
    })
  
}
getBugs()


//delete bug

const deleteBug=(boxId)=>{
      fetch(`http://127.0.0.1:3000/bugs/delete/${boxId}`, {
          method: 'delete',
          headers: {
            'content-type':'application/json',
            "Authorization": localStorage.getItem('token')
          }
        }).then(async (response)=> {
            if (response.status !== 200) {
              const msg=await response.json()
              document.querySelector('.alert-warning').classList.add('show')
              setTimeout(function() {
                document.querySelector('.alert-warning').classList.add('hide');
                document.querySelector('.alert-warning').classList.remove('show');
            }, 4000);
            }else{
              location.reload();
            }
        });
}





let containerId='';

//update bug status on drop
const updateBugStatus=()=>{
  const dragged=document.querySelector('.dragged')
  const boxId=dragged.getElementsByClassName('bug_id')[0].value
  const singleBugData=getSingleBug(boxId);
  dragged.addEventListener('dragend',async()=>{
    switch(containerId) {
      case 'bug':
        singleBugData.then(response=>{
          data=response.bugs
          const newData={
            bug_title:data.bug_title,
            bug_status:"bug",
            bug_desc:data.bug_desc,
            bug_priority:data.bug_priority
          }
          fetch(`http://127.0.0.1:3000/bugs/update/${boxId}`, {
            method: 'put',
            headers: {
              'content-type':'application/json',
              "Authorization": localStorage.getItem('token')
            },
            body:JSON.stringify(newData)
          }
          ).then(async (response)=> {
              if (response.status !== 200) {
                const msg=await response.json()
               console.log(msg)
              }
            });
        })
        break;
      case 'fixing':
        singleBugData.then(response=>{
          data=response.bugs
          const newData={
            bug_title:data.bug_title,
            bug_status:"fixing",
            bug_desc:data.bug_desc,
            bug_priority:data.bug_priority
          }
          fetch(`http://127.0.0.1:3000/bugs/update/${boxId}`, {
            method: 'put',
            headers: {
              'content-type':'application/json',
              "Authorization": localStorage.getItem('token')
            },
            body:JSON.stringify(newData)
          }
          ).then(async (response)=> {
              if (response.status !== 200) {
                const msg=await response.json()
               console.log(msg)
              }
            });
        })
        
        break;
      case 'testing':
        singleBugData.then(response=>{
          data=response.bugs
          const newData={
            bug_title:data.bug_title,
            bug_status:"testing",
            bug_desc:data.bug_desc,
            bug_priority:data.bug_priority
          }
          fetch(`http://127.0.0.1:3000/bugs/update/${boxId}`, {
            method: 'put',
            headers: {
              'content-type':'application/json',
              "Authorization": localStorage.getItem('token')
            },
            body:JSON.stringify(newData)
          }
          ).then(async (response)=> {
              if (response.status !== 200) {
                const msg=await response.json()
               console.log(msg)
              }
            });
        })
        break;
      case 'fixed':
        singleBugData.then(response=>{
          data=response.bugs
          const newData={
            bug_title:data.bug_title,
            bug_status:"fixed",
            bug_desc:data.bug_desc,
            bug_priority:data.bug_priority
          }
          fetch(`http://127.0.0.1:3000/bugs/update/${boxId}`, {
            method: 'put',
            headers: {
              'content-type':'application/json',
              "Authorization": localStorage.getItem('token')
            },
            body:JSON.stringify(newData)
          }
          ).then(async (response)=> {
              if (response.status !== 200) {
                const msg=await response.json()
               console.log(msg)
              }
            });
        })
        break;
      default:
        // code block
    }
  })
}

//used on drag and drop functionality
function draggs(){
  const draggables=document.querySelectorAll('.draggable')
  const containers=document.querySelectorAll('.draggings')
  draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',(e)=>{
      draggable.classList.add('dragging')
      draggable.classList.add('dragged')
      updateBugStatus();
    })

    draggable.addEventListener('dragend',()=>{
      draggable.classList.remove('dragging')
    }) 
  })

  containers.forEach(container=>{   
    container.addEventListener('dragover',(e)=>{
      e.preventDefault()
      containerId=container.id;
      const draggable=document.querySelector('.dragging')
      const afterElement=getDraggAfterElement(container,e.clientY)
        if(afterElement==null){
            container.appendChild(draggable)
        }else{
            container.insertBefore(draggable, afterElement)
        }
    })
  })

  //get previous element to drop after
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
    const user=localStorage.getItem("user");
    const added_by=JSON.parse(user).id

    const bug_status="new"
    let data={
      bug_title,
      bug_desc,
      bug_priority,
      bug_status,
      added_by
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
          getBugs()
          location.reload();
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
          localStorage.setItem("user",JSON.stringify(res.user))
          localStorage.setItem("token",res.token)
          loginForm.reset()
          const modal=document.querySelector('#loginModal')
          modal.classList.remove('show')
          const shadow=document.querySelector('.modal-backdrop')
          shadow.classList.remove('show')
          location.reload();
          
        }
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })

  })
}

