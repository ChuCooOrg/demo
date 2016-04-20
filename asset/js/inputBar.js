var BASE_URL = BASE_URL || 'https://richegg.tw/';
var inputBar = ( _ => {
	var $inputWrap;

	function init() {
		_cacheDOM();
		_bindEvent();
	}

	function _cacheDOM() {
		$inputWrap = $('#inputWrap');
	}

	function _bindEvent() {
		$inputWrap.on('click.addTask', '#btn-add', _handleAddTask);
		$inputWrap.on('keypress.addTask', '#newTask', _handlePressEnter);
	}

	function _handlePressEnter(e) {
		if(e.which == 13) {
			_handleAddTask();
		}
	}

	function _handleAddTask() {
		var text = $inputWrap.find('#newTask').val();
		if(text) {
			$.ajax({
				url: `${BASE_URL}tasks`, 
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
					todoList.addTask(data);
					$inputWrap.find('#newTask').val('');
				}, 
				error: function(jqXHR) {
					console.dir(jqXHR);
				}
			});
		}
	}

	return {
		init
	}
})();
