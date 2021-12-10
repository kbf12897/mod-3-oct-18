document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('input[type="submit"]').addEventListener('click', async ev => {
        ev.preventDefault();
        const tasks = document.querySelector('textarea').value;
        const time = document.querySelector('input').value;
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tasks, time})
        });
        document.querySelector('textarea').value = '';
        document.querySelector('input').value = '';
        
        const data = await res.json();
        debugger;
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const liText = document.createTextNode(`${data.tasks} - ${data.time}`);
        li.appendChild(liText);
        li.setAttribute('id', `${data.id}`);
        ul.appendChild(li);
        li.addEventListener('click', async ev => {
            const taskId = ev.currentTarget.id;
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });
            debugger
            if (res.ok) {
                console.log(ev);
                ev.target.remove();
            }

        });
    })
});