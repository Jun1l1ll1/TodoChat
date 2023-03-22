let API_URL = '../api/todos/';
let myName = 'Anonymous';

getAllTasks();
function getAllTasks() {
    let list = document.getElementById('task-list');

    fetch(API_URL).then(response => {
        response.json().then(body => {
            list.innerHTML = '';
            body.forEach(element => {
                list.innerHTML += modelToHTML(element);
            });
        })
    })
}


function getStarIcon(isFav) {
    if (isFav) {
        return "bi-star-fill"
    } else {
        return "bi-star"
    }
}
function modelToHTML(obj) {
    return `
    <div class='list-group-item'>
        <div class='text-primary'>${obj['name']}</div>

        <div class='d-flex flex-row justify-content-between'>
            <div>
                ${obj['task']}
                <button class="btn btn-outline-warning" onclick='deleteTask(${obj['id']})'><i class="bi bi-trash3"></i></button>
            </div>

            <button class="btn btn-outline-warning" onclick='updateTask(${obj['id']}, ${obj['fav']})'><i class="bi ${getStarIcon(obj.fav)}"></i></button>
        </div>
    </div>
    `;
}


function submitTask() {
    let txt = document.getElementById('task-input').value;

    if (txt != '') {

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({'task': txt, 'fav': false, 'name': myName}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 201) {
                console.log('POST successful');
                getAllTasks(); // inefficent, fetches all
                document.getElementById('task-input').value = '';
            } else {
                console.log('something went wrong: ' + response.status);
            }
        })

    }
}


function deleteTask(id) {
    fetch(API_URL + id, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 204) {
            console.log('DELETE successful');
            getAllTasks();
        } else {
            console.log('something went wrong: ' + response.status);
        }
    })
}


function updateTask(id, fav) {
    fetch(API_URL + id, {
        method: 'PUT',
        body: JSON.stringify({'fav': !fav}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            console.log('PUT successful');
            getAllTasks();
        } else {
            console.log('something went wrong: ' + response.status);
        }
    })
}






function confirmName() {
    let name = document.getElementById('name-input').value;

    myName = name;
    document.getElementById('name-input').placeholder = name;
    document.getElementById('name-input').value = '';
}