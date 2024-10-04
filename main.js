// Task and Issue management
let tasks = [];
let issues = [];
let totalTasks = 0;
let completedTasks = 0;
let totalIssues = 0;

// DOM elements
const taskList = document.getElementById('task-list');
const comprehensiveTaskList = document.getElementById('comprehensive-task-list');
const issueList = document.getElementById('issue-list');
const addTaskForm = document.getElementById('add-task-form');
const addIssueForm = document.getElementById('add-issue-form');
const newTaskInput = document.getElementById('new-task-input');
const newIssueInput = document.getElementById('new-issue-input');
const totalTasksElement = document.getElementById('total-tasks');
const completedTasksElement = document.getElementById('completed-tasks');
const pendingTasksElement = document.getElementById('pending-tasks');
const totalIssuesElement = document.getElementById('total-issues');

// Navigation
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.classList.add('active');
            }
        });
    });
});

// Add task
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskDescription = newTaskInput.value.trim();
    if (taskDescription) {
        addTask(taskDescription);
        newTaskInput.value = '';
    }
});

function addTask(description) {
    const task = {
        id: Date.now(),
        description,
        completed: false
    };
    tasks.push(task);
    renderTask(task);
    renderComprehensiveTaskList();
    updateDashboard();
}

// Add issue
addIssueForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const issueDescription = newIssueInput.value.trim();
    if (issueDescription) {
        addIssue(issueDescription);
        newIssueInput.value = '';
    }
});

function addIssue(description) {
    const issue = {
        id: Date.now(),
        description,
        resolved: false
    };
    issues.push(issue);
    renderIssue(issue);
    updateDashboard();
}

// Render task
function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${task.description}</span>
        <div class="task-actions">
            <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
}

// Render issue
function renderIssue(issue) {
    const li = document.createElement('li');
    li.className = 'issue-item';
    li.innerHTML = `
        <span>${issue.description}</span>
        <div class="issue-actions">
            <button onclick="toggleIssue(${issue.id})">${issue.resolved ? 'Reopen' : 'Resolve'}</button>
            <button onclick="deleteIssue(${issue.id})">Delete</button>
        </div>
    `;
    issueList.appendChild(li);
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        updateDashboard();
        renderTasks();
        renderComprehensiveTaskList();
    }
}

// Toggle issue resolution
function toggleIssue(id) {
    const issue = issues.find(i => i.id === id);
    if (issue) {
        issue.resolved = !issue.resolved;
        updateDashboard();
        renderIssues();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    updateDashboard();
    renderTasks();
    renderComprehensiveTaskList();
}

// Delete issue
function deleteIssue(id) {
    issues = issues.filter(i => i.id !== id);
    updateDashboard();
    renderIssues();
}

// Render all tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(renderTask);
}

// Render all issues
function renderIssues() {
    issueList.innerHTML = '';
    issues.forEach(renderIssue);
}

// Render comprehensive task list
function renderComprehensiveTaskList() {
    comprehensiveTaskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.description}</span>
            <span>${task.completed ? 'Completed' : 'Pending'}</span>
        `;
        comprehensiveTaskList.appendChild(li);
    });
}

// Update dashboard
function updateDashboard() {
    totalTasks = tasks.length;
    completedTasks = tasks.filter(t => t.completed).length;
    totalIssues = issues.length;
    totalTasksElement.textContent = totalTasks;
    completedTasksElement.textContent = completedTasks;
    pendingTasksElement.textContent = totalTasks - completedTasks;
    totalIssuesElement.textContent = totalIssues;
}

// Initialize with sample data
addTask('Design project logo');
addTask('Create project timeline');
addTask('Set up team meeting');
addIssue('Server performance issues');
addIssue('Bug in login functionality');