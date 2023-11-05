import './style.css'
import { ProjectMaker, ListItem } from './makeproject'
import { Storage } from './storage'

const newbtn = document.querySelector('.newbtn')
const all = document.querySelector('.all')
const projectTitleInput = document.querySelector('.ptitleinput')
const projectForm = document.querySelector('.projectForm')
const createProjectBtn = document.querySelector('.projectsubmit')

window.onload = () => {
  const todoList = Storage.getToDoList()
  const projects = todoList.getProjects()
  console.log(projects)
  projects.forEach(project => {
    project.createProject()
  });
}

newbtn.addEventListener('click', () => {
  projectForm.classList.add('y')
  all.classList.add('n')
})

createProjectBtn.addEventListener('click', () => {
  projectForm.classList.remove('y')
  all.classList.remove('n')
  const project = new ProjectMaker(projectTitleInput.value)
  const todoList = Storage.getToDoList()
  Storage.addProject(project)
  project.createProject()
  projectTitleInput.value = ''
})
