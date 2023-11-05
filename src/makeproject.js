import { createDomProject, createDOMItem } from "./DOMstuff"
import { Storage } from "./storage"


class ToDoLists {
  constructor() {
    this.projects = []
  }

  getProjects() {
    return this.projects
  }

  getProject(projectName) {
    return this.projects.find(arproject => arproject.name === projectName)
  }

  setProjects(newprojects) {
    this.projects = newprojects
  }

  setProject(projectName, newProject) {
    let projectToChange = this.projects.find(arproject => arproject.name === projectName)
    projectToChange = newProject
  }

  addToProjectsArray(project) {
    this.projects.push(project)
  }

  removeProject(project) {
    const projectToDelete = this.projects.find((arproject) => arproject.name === project.name)
    this.projects.splice(this.projects.indexOf(projectToDelete), 1)
  }

  findProject(project) {
    return this.projects.find((arproject) => arproject.name === project)
  }
}

class ProjectMaker {
  constructor(name) {
    this.name = name,
    this.items = []
  }

  createProject() {
    createDomProject(this.name)
  }

  getName() {
    return this.name
  }

  setItems(items) {
    this.items = items
  }

  itemIndex(item) {
    return this.items.indexOf(item)
  }

  getItems() {
    return this.items
  }

  addItem(item) {
    this.items.push(item)
    console.log(this.items)
  }
  
  createItem(title, dueDate, description, priority) {
    const item = new ListItem(title, dueDate, description, priority)
    item.createItem(this.name)
    this.addItem(item)
  }

  removeItem(itemName) {
    const newItems = this.items.filter(item => item !== itemName)
    this.items = newItems
  }

  reloadItems() {
    this.items.forEach(item => {
      item.reloadItem(this.name)
    })
  }

  findItem(itemName) {
    return this.items.find((aritem) => aritem.title === itemName)
  }
}

class ListItem {
  constructor(title, duedate, description, priority) {
    this.title = title
    this.description = description
    this.duedate = duedate
    this.priority = priority
    this.done = false
  }

  createItem (projectName) {
    if (this.title === '') {
      const todoList = Storage.getToDoList()
      Storage.removeItem(projectName, this.name)
    } else {
      createDOMItem(this.title, this.duedate, this.priority, projectName)
    }
  }

  reloadItem(projectName) {
    if (this.title === '') {
      const todoList = Storage.getToDoList()
      Storage.removeItem(projectName, this.name)
    } else {
      createDOMItem(this.title, this.duedate, this.priority, projectName)
    }
  }

  getName() {
    return this.name
  }
}

export { ProjectMaker, ListItem, ToDoLists }