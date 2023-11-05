import { ListItem, ProjectMaker, ToDoLists } from "./makeproject"
import { Storage } from "./storage"

let index = 0

window.onload = () => {
  index = Storage.getIndex()
}

function getIndex() {
  return index
}

function increaseIndex() {
  index++
}

const content = document.querySelector('.content')
const sidebar = document.querySelector('.sidebar')
const all = document.querySelector('.all')
const itemForm = document.querySelector('.itemform')

function createDOMItem (title, duedate, priority, projectName) {
  const newDOMItem = document.createElement('div')
  const itemLeft = document.createElement('div')
  const itemRight = document.createElement('div')
  const itemDone = document.createElement('input')
  const itemName = document.createElement('span')
  const itemDate = document.createElement('span')
  const itemDetails = document.createElement('button')
  const itemEdit = document.createElement('button')
  const itemRemove = document.createElement('button')

    itemDone.type = 'checkbox'

    newDOMItem.classList.add('item')
    itemLeft.classList.add('itemleft')
    itemRight.classList.add('itemright')
    itemDone.classList.add('itemdone')
    itemName.classList.add('itemname')
    itemDate.classList.add('itemdate')
    itemDetails.classList.add('itemdetails')
    itemEdit.classList.add('itemedit')
    itemRemove.classList.add('itemremove')

    if (priority === 'green') {
      newDOMItem.classList.add('priority-green')
    } else if (priority === 'red') {
      newDOMItem.classList.add('priority-red')
    } else {
      newDOMItem.classList.add('priority-yellow')
    }

    itemName.textContent = title
    itemDate.textContent = duedate
    itemDetails.textContent = 'Details'
    itemEdit.textContent = 'Edit'
    itemRemove.textContent = 'Remove'
    
    newDOMItem.appendChild(itemLeft)
    newDOMItem.appendChild(itemRight)
    itemLeft.appendChild(itemDone)
    itemLeft.appendChild(itemName)
    itemRight.appendChild(itemDate)
    itemRight.appendChild(itemDetails)
    itemRight.appendChild(itemEdit)
    itemRight.appendChild(itemRemove)

    content.appendChild(newDOMItem)

    itemRemove.addEventListener('click', () => {
      Storage.removeItem(projectName, title)
      newDOMItem.remove()
    })
}

function createDomProject (title) {
  const newProject = document.createElement('div')
  const projectName = document.createElement('span')
  const newItemBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')

  newProject.classList.add('project')
  projectName.classList.add('projectname')
  newItemBtn.classList.add('projectitembtn')
  deleteBtn.classList.add('projectdltbtn')

  const thisIndex = getIndex()
  increaseIndex()

  newProject.classList.add(`p${thisIndex}`)
  newItemBtn.classList.add(`i${thisIndex}`)
  deleteBtn.classList.add(`d${thisIndex}`)

  projectName.textContent = title
  newItemBtn.textContent = '+'
  deleteBtn.textContent = 'x'

  sidebar.appendChild(newProject)
  newProject.appendChild(projectName)
  newProject.appendChild(newItemBtn)
  newProject.appendChild(deleteBtn)

  deleteBtn.addEventListener('click', () => {
    newProject.remove()
    const todoList = Storage.getToDoList()
    const project = todoList.getProject(title)
    Storage.removeProject(project)
    return
  })

  newProject.addEventListener('click', () => {
    content.textContent = ''
    const todoList = Storage.getToDoList()
    const project = todoList.getProject(title)
    if (project == undefined) {
      return
    } else {
      Storage.getToDoList().getProject(title).reloadItems()
    }
  })

  newItemBtn.addEventListener('click', () => {
    createItemForm()
    const titleInput = document.querySelector('.titleinput')
    const dueDateInput = document.querySelector('.duedateinput')
    const descriptionInput = document.querySelector('.descriptioninput')
    const priorityGreen = document.querySelector('.priorityinputgreen')
    const priorityRed = document.querySelector('.priorityinputred')
    const priorityYellow = document.querySelector('.priorityinputyellow')
    const createItemBtn = document.querySelector('.itemsubmit')
    createItemBtn.addEventListener('click', () => {
      itemForm.classList.remove('y')
      all.classList.remove('n')
      let priority
      if (priorityGreen.checked === true) {
        priority = 'green'
      } else if (priorityYellow.checked === true) {
        priority = 'yellow'
      } else {
        priority = 'red'
      }
      const ititle = titleInput.value
      const duedate = dueDateInput.value
      const description = descriptionInput.value
      titleInput.value = ''
      descriptionInput.value = ''
      dueDateInput.value = ''
      priorityGreen.checked = true
      priorityRed.checked = false
      priorityYellow.checked = false
      console.log(ititle, duedate, description, priority)
      Storage.addItem(title, new ListItem(ititle, duedate, description, priority))
    })
  })
}

function createItemForm () {
  itemForm.innerHTML = '<label for="title">Title:</label><input type="text" name="title" id="title" class="titleinput"><label for="description">Description:</label><textarea name="description" id="description" cols="30" rows="5" class="descriptioninput"></textarea><label for="duedate">Due Date:</label><input type="date" name="duedate" id="duedate" class="duedateinput"><label for="priority">Priority:</label><input type="radio" name="priority" id="priority" class="priorityinputred"><input type="radio" name="priority" id="priority" class="priorityinputyellow"><input type="radio" name="priority" id="priority" class="priorityinputgreen" checked><button class="itemsubmit">Create</button>'
  itemForm.classList.add('y')
  all.classList.add('n')
}

export { createDOMItem, createDomProject, index }