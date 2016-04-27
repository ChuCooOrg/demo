var $listNameWrap = Symbol('$listNameWrap');
class ListName {
	constructor() {
		// cache DOM
		this[$listNameWrap] = $('#listNameWrap');

		// bind event
		this[$listNameWrap]
			.off('click.setList')
			.on('click.setList', '#btn-setList', this._handleSetList.bind(this));
		this[$listNameWrap]
			.off('keypress.setList')
			.on('keypress.setList', '#listName', this._handlePressEnter.bind(this));
	}

	_handlePressEnter(e) {
		if(e.which == 13) {
			this._handleSetList();
		}
	}

	_handleSetList() {
		var listName = this[$listNameWrap].find('#listName').val();
		if(listName) {
			$.ajax({
				url: `${App.BASE_URL}lists`, 
				type: 'post', 
				dataType: 'json', 
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					listName
				}), 
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true, 
				success: function(data) {
					App.todoList.render(data.tasks);
					if(!data.tasks.length) {
						alert('Has any task yet.\n Just add one.');
					}
				}, 
				error: function(jqXHR) {
					console.dir(jqXHR);
				}
			});
		}
	}
}
