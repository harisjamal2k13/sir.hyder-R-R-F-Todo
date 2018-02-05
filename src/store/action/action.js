
import ActionTypes from '../constant/constant';
// import history from '../../History';
// import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()

// const hsitory = createBrowserHistory()



// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRR8qGpVGUaom9lT6pg7qQhEIXLoGQcJ8",
    authDomain: "react-redux-firebase-todo999.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-todo999.firebaseio.com",
    projectId: "react-redux-firebase-todo999",
    storageBucket: "",
    messagingSenderId: "188066927367"
};
firebase.initializeApp(config);



export function addData(addTodo) {
    return dispatch => {
        firebase.database().ref('todos/').push(addTodo)
            .then((userData) => {

            }

            )
    }
}




let currentTodos = [];
export function getTodos() {
    return dispatch => {
        firebase.database().ref('todos/').on('child_added', (data) => {
            let obj = data.val();

            console.log('objobjobjobj',obj);
            obj.id = data.key;
            currentTodos = currentTodos.concat(obj);
            // console.log(currentTodos,'currentTodoscurrentTodoscurrentTodos')
            dispatch({ type: ActionTypes.RENDERTODOS, payload: currentTodos })
        })
    }
}





export function deleteTodo(todoKey, index) {
    return dispatch => {
        firebase.database().ref('todos/' + todoKey).remove()
            .then((v) => {
                currentTodos = currentTodos.slice(0, index).concat(currentTodos.slice(index + 1));
                dispatch({ type: ActionTypes.RENDERTODOS, payload: currentTodos })
            });
    }
}


export function editTodo(todoObj, index) {
    return dispatch => {
        // console.log(todoObj)
        let updateKey =todoObj.id;
        delete todoObj.id;
        firebase.database().ref('todos/' + updateKey).set(todoObj)
            // .then((v) => {
            //     currentTodos = currentTodos.slice(0, index).concat(currentTodos.slice(index + 1));
            //     dispatch({ type: ActionTypes.RENDERTODOS, payload: currentTodos })
            // });
    }
}
