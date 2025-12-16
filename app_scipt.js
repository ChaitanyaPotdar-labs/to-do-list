
// Simple To-Do list app using localStorage for persistence

const STORAGE_KEY = 'todo.tasks.v1';

// DOM references
const form = document.getElementById('new-task-form');
const input = document.getElementById('new-task-input');
const listEl = document.getElementById('task-list');

let tasks = [];

function saveTasks() {
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }catch(e){
        console.error('Could not save tasks', e);
    }
}

function loadTasks(){
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        if(!raw) return [];
        return JSON.parse(raw);
    }catch(e){ console.error('Could not load tasks', e); return [] }
}

function renderTasks(){
    listEl.innerHTML = '';
    if(tasks.length === 0){
        const empty = document.createElement('li');
        empty.className = 'task empty';
        empty.innerHTML = '<div class="left"><span class="task-label" style="color:var(--muted)">No tasks — add one above</span></div>';
        listEl.appendChild(empty);
        return;
    }

    for(const task of tasks){
        const li = createTaskElement(task);
        listEl.appendChild(li);
    }
}

function createTaskElement(task){
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');

    const left = document.createElement('div');
    left.className = 'left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.setAttribute('aria-label', 'Mark task complete');

    const label = document.createElement('span');
    label.className = 'task-label';
    label.textContent = task.text;

    left.appendChild(checkbox);
    left.appendChild(label);

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon btn-delete';
    deleteBtn.title = 'Delete task';
    deleteBtn.innerHTML = '🗑';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon btn-edit';
    editBtn.title = 'Edit task';
    editBtn.innerHTML = '✏️';

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(actions);

    // events
    checkbox.addEventListener('change', ()=>{
        task.completed = checkbox.checked;
        if(task.completed) li.classList.add('completed'); else li.classList.remove('completed');
        saveTasks();
    });

    deleteBtn.addEventListener('click', ()=>{
        tasks = tasks.filter(t=>t.id !== task.id);
        saveTasks();
        renderTasks();
    });

    editBtn.addEventListener('click', ()=>{
        const newText = prompt('Edit task', task.text);
        if(newText === null) return; // cancelled
        const trimmed = newText.trim();
        if(trimmed.length === 0) return alert('Task cannot be empty');
        task.text = trimmed;
        saveTasks();
        renderTasks();
    });

    return li;
}

// handle form submit
form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const text = input.value.trim();
    if(!text) return; // ignore empty

    const newTask = { id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), text, completed: false };
    tasks.unshift(newTask); // newest first
    input.value = '';
    saveTasks();
    renderTasks();
    input.focus();
});

// keyboard accessibility - add on Enter when focused in input is handled by the form submit above

// Initialize
tasks = loadTasks();
renderTasks();

// small helper for debugging in console
window.__todo = {
    list: tasks,
    reload: ()=>{ tasks = loadTasks(); renderTasks(); }
};

