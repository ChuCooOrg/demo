var BASE_URL = BASE_URL || 'https://richegg.tw/';
var todoList = ( _ => {
	var $list;

	function init() {
		_cacheDOM();
		_bindEvent();
	}

	function _cacheDOM() {
		$list = $('#todoList');
	}

	function _bindEvent() {
		$list.on('click.del', '.btn-del', _handleDel);
		$list.on('click.changeStatus', '.btn-status', _handleChangeStatus);
	}

	function _handleDel() {
		var $this = $(this);
		var id = $this.parents('.tasks').attr('id');
		$.ajax({
			url: `${BASE_URL}tasks/${id}`, 
			type: 'delete', 
			dataType: 'json', 
			contentType: "application/json; charset=utf-8",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true, 
			success: function(data) {
				console.log(data);
				$list.find(`#${id}`).remove();
			}, 
			error: function(jqXHR) {
				console.dir(jqXHR);
			}
		});
	}
	function _handleChangeStatus() {
		var $this = $(this);
		var id = $this.parents('.tasks').attr('id');
		var status = $this.attr('data-status');
		var isDone = status == 'done' ? false : true;
		$.ajax({
			url: `${BASE_URL}tasks/${id}`, 
			type: 'patch', 
			dataType: 'json', 
			contentType: "application/json; charset=utf-8",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true, 
			data: JSON.stringify({
				isDone
			}), 
			success: function(data) {
				console.log(data);
				$this
					.text((isDone ? 'Done' : 'Yet'))
					.attr('data-status', (isDone ? 'done' : 'det'))
					.parents('.tasks')
					.removeClass('danger success')
					.addClass(`${isDone ? 'success' : 'danger'}`)
			}, 
			error: function(jqXHR) {
				console.dir(jqXHR);
			}
		});
	}

	function addTask(data) {
		console.dir(data);
		$list
			.find('tbody')
			.append(
				`<tr id=${data.id} class="tasks danger">
					<td class="taskStatus">
						<button data-status="yet" type="button" class="btn btn-default btn-status">Yet</button>
					</td>
					<td class="taskName">
						${$('<textarea>').text(data.text).html()}
						<span class="glyphicon glyphicon-remove btn-del pull-right" aria-hidden="true"></span>
					</td>
				</tr>`
			);
	}

	function render(list) {
		$list.find('tbody').html('');
		list.forEach(function(val, i) {
			$list
				.find('tbody')
				.append(
					`<tr id=${val.id} class="tasks ${val.isDone ? 'success' : 'danger'}">
						<td class="taskStatus">
							<button data-status=${val.isDone ? 'done' : 'yet'} type="button" class="btn btn-default btn-status">${val.isDone ? 'Done' : 'Yet'}</button>
						</td>
						<td class="taskName">
							${$('<textarea>').text(val.text).html()}
							<span class="glyphicon glyphicon-remove btn-del pull-right" aria-hidden="true"></span>
						</td>
					</tr>`
				);
		});
	}

	return {
		init, 
		addTask, 
		render
	}
})();