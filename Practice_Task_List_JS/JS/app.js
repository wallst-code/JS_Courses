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

    app.promisesStartup = function() {
        pageItems.loadData = document.getElementById('loadData');
        pageItems.waitIndicator = document.getElementById('wait-indicator');

        pageItems.loadData.addEventListener('click', loadChainedPromisedData);


    }

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

        loadFromStorage();
    };

    function loadSimplePromiseData(e){
        pageItems.waitIndicator.style.display = 'block';
        const promise = new Promise(function(resolve, reject){
            setTimeout(() => reject("Rejected the promise"), 3000);
        });

        // Here we have a full "then clause" with success code and failure code. 
        // Basic promise setup
        promise
        .then(
            result => console.log(result),
            reason => console.error(reason)
        )
        .finally(() => {
            console.log('This is now complete');
            pageItems.waitIndicator.style.display = 'none';
        })
        //Chaining together with promises...the finally is optional and used if we need cleanup. 
    }

    function loadChainedPromisedData(e){
        const promise = new Promise(function(resolve, reject) {
            setTimeout(() => resolve('Promise #1'), 3000);
        });

        promise.then(result => {
            console.log('Promise #1 Succeeded');
            return new Promise(function(resolve, reject) {
                setTimeout(() => resolve('Promise #2'), 2000);
            });
        })
        .then(result => {
            console.log('Promise #2 Succeeded');
        })
        .finally(() => console.log('We have now completed all promises'));        
    }

    function loadFromStorage(){
        const itemsString = localStorage.getItem('taskList');

        if (itemsString !== null){
            const items = JSON.parse(itemsString); //the opposite of stringify takes it to a JS string.
            items.forEach(item => {
                const li = document.createElement('li'); //create the element
                li.innerText = item.task.toUpperCase(); //set the text
                if (item.isComplete) {
                    li.classList.add('completed-task');
                }
                pageItems.taskList.appendChild(li); 
            });
        }
    }

    function saveToStorage(){
        const items = Array.from(pageItems.taskList.children);
        const itemsToSave = items.map(item => {
            return {
                task: item.innerText,
                isComplete: item.classList.contains('completed-task')
            };
        });
        localStorage.setItem('taskList', JSON.stringify(itemsToSave));
        console.log(itemsToSave);
        }

    function addTask(e) {
        e.preventDefault;
        const li = document.createElement('li'); //create the element
        li.innerText = pageItems.taskInput.value.toUpperCase(); //set the text
        pageItems.taskList.appendChild(li); //append the text
        pageItems.taskInput.value = ''; //clears input box
        saveToStorage();   
    }

    function completeTask(e) {
        // The if statements allow us to click the strike on and off.
        if (e.target.classList.contains('completed-task')) {
            e.target.classList.remove('completed-task');
        } else {
            e.target.classList.add('completed-task'); //from css class - adds strike through to completed tasks upon click. 
        }
        saveToStorage()        
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
        saveToStorage()
    }
    
})(window.app = window.app || {});

//How would you get the strike down items to move to the bottom? I do not know how to do this. A search did not reveal much. How would I put strikes on the bottom of the list. 
//How would you sort the list? 

//Session storage and local strorage


