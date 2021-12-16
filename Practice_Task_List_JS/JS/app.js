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

    // Using this app.todoStartup make this the only function available outside the others are internal.  test this in the html by typing in app. and see what is visible. 
    app.todoStartup = function(){
        const frm = document.getElementById('taskForm');
        pageItems.taskList = document.getElementById('taskList');
        pageItems.taskInput = frm.querySelector('#taskInput'); //we are just using the form here.
        pageItems.submit = frm.querySelector('#submit');
        pageItems.removeButton = frm.querySelector('#remove');

        pageItems.submit.addEventListener('click', addTask);
        pageItems.taskList.addEventListener('click', completeTask);
        pageItems.removeButton.addEventListener('click', removeCompletedTasks);

    };

    function addTask(e) {
        e.preventDefault;

        const li = document.createElement('li'); //create the element
        li.innerText = pageItems.taskInput.value.toUpperCase(); //set the text
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

    function removeCompletedTasks(e) {
        e.preventDefault();
        const items = Array.from(pageItems.taskList.children); //this combines the two below into one line. Gets children and puts them into an array of items. 
        // const items = pageItems.taskList.children;
        // const itemsArray = Array.from(items);

        items.forEach(el => {
            if (el.classList.contains('completed-task')){
                pageItems.taskList.removeChild(el); // Removes child items that are completed tasks.
            }
        });

    }
    
})(window.app = window.app || {});

//How would you get the strike down items to move to the bottom? I do not know how to do this. A search did not reveal much. How would I put strikes on the bottom of the list. 
//How would you sort the list? 
