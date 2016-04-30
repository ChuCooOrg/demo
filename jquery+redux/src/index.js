import { createStore } from 'redux';
import todoApp from './js/reducer';
import TaskInput from './js/TaskInput';
import TodoList from './js/TodoList';
import '../static/css/style';


var App = ( _ => {
	localStorage.ReduxState = localStorage.ReduxState || JSON.stringify({});
	var initState = JSON.parse(localStorage.ReduxState);
	var store = createStore(todoApp, initState);
	var unsubscribe = store.subscribe(render);

	function render() {
		var state = store.getState();
		var doneNum = 0; 
		var yetNum = 0;
		// update list 
		$('#listWrap ul').html('');
		state.tasks.forEach((val, i) => {
			if(val.isDone) {
				doneNum ++;
			} else {
				yetNum ++;
			}
			$('#listWrap ul').append(
				`<li data-taskID=${val.id} class="list-group-item task">
					<span class="taskStatus ${!val.isDone ? 'yet' : ''}"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>
					${$('<textarea>').html(val.text).text()}
					<span class="glyphicon glyphicon-remove btn-delTask pull-right" aria-hidden="true"></span>
				</li>`
			);
		});

		// update count 
		$('#statusWrap').find('.doneNum').text(doneNum);
		$('#statusWrap').find('.yetNum').text(yetNum);

		// store state to localstorage
		localStorage.ReduxState = JSON.stringify(state);
	}

	return {
		render, 
		unsubscribe, 
		store
	}
})();

App.render();
TaskInput.init(App.store);
TodoList.init(App.store);
