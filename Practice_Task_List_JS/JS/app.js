/** take input - string - tasks
 * add task to list
 * display list
 * line through completed tasks
 * clear form
*/

//IIFE
(function(app) {
    'use strict';
    const pageItems = {};
    // const taskList = document.getElementById('taskList');

    app.todoStartup = function(){
        const frm = document.getElementById('taskForm');
        pageItems.taskList = document.getElementById('taskList');
        pageItems.taskInput = frm.querySelector('#taskInput'); //we are just using the form here.
        pageItems.submit = frm.querySelector('#submit');

        pageItems.submit.addEventListener('click', addTask);
        pageItems.taskList.addEventListener('click', completeTask);

    };

    function addTask(e) {
        e.preventDefault;

        const li = document.createElement('li'); //create the element
        li.innerText = pageItems.taskInput.value; //set the text
        pageItems.taskList.appendChild(li); //append the text
        pageItems.taskInput.value = ''; //clears input box
    }

    function completeTask(e) {
        // The if statements allow us to click the strike on and off.
        if (e.target.classList.contains('completed-task')) {
            e.target.classList.remove('completed-task');
        } else {
            e.target.classList.add('completed-task'); //from css class - adds strike through to completed tasks upon click. 
        }
        
    }

})(window.app = window.app || {});


