var BASE_URL = BASE_URL || 'https://richegg.tw/';
var listName = ( _ => {
	var $listNameWrap;

	function init() {
		_cacheDOM();
		_bindEvent();
	}

	function _cacheDOM() {
		$listNameWrap = $('#listNameWrap');
	}

	function _bindEvent() {
		$listNameWrap.on('click.setList', '#btn-setList', handleSetList);
		$listNameWrap.on('keypress.setList', '#listName', _handlePressEnter);
	}

	function _handlePressEnter(e) {
		if(e.which == 13) {
			handleSetList();
		}
	}

	function handleSetList() {
		var listName = $listNameWrap.find('#listName').val();
		if(listName) {
			$.ajax({
				url: `${BASE_URL}lists`, 
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
					if(data.tasks.length) {
						todoList.render(data.tasks);
					} else {
						alert('Has any task yet.\n Just add one.');
					}
				}, 
				error: function(jqXHR) {
					console.dir(jqXHR);
				}
			});
		}
	}

	return {
		init, 
		handleSetList
	}
})();