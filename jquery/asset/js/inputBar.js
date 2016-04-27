var $inputWrap = Symbol('$inputWrap');
class InputBar {
	constructor() {
		// cache DOM
		this[$inputWrap] = $('#inputWrap');

		// bind event
		this._bindEvent();
	}

	_bindEvent() {
		this[$inputWrap]
			.off('click.addTask')
			.on('click.addTask', '#btn-add', this._handleAddTask.bind(this));
		this[$inputWrap]
			.off('keypress.addTask')
			.on('keypress.addTask', '#newTask', this._handlePressEnter.bind(this));
	}

	_handlePressEnter(e) {
		if(e.which == 13) {
			this._handleAddTask();
		}
	}

	_handleAddTask() {
		var text = this[$inputWrap].find('#newTask').val();
		if(text) {
			$.ajax({
				url: `${App.BASE_URL}tasks`, 
				type: 'post', 
				dataType: 'json', 
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					text
				}), 
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true, 
				success: function(data) {
					App.todoList.addTask(data);
					this[$inputWrap].find('#newTask').val('');
				}.bind(this), 
				error: function(jqXHR) {
					console.dir(jqXHR);
				}
			});
		}
	}
}
