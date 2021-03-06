/**
 * This file contain the necessary javascript functions to connect to the registered
 * websocket and subscribe the client to the channel that will receive all the
 * STOMP messages.
 */
jQuery(document).ready(function(){
	
	var stompClient = null;
	
	/**
	 * Function that connects with the published websocket and subscribes the
	 * connection to listen the published messages.
	 * 
	 * @returns
	 */
	function connect() {
		var socket = new SockJS('/client/websocket');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			stompClient.subscribe('/topic/messages', function(greeting) {
				$.notify({
					// options
					message: 'The person with name "' + greeting.body  + '" has been removed from server side.',
				},{
					// settings
					type: 'danger'
				})
			});
		});
	}
	
	// When the document is ready, connect to the websocket to listen
	// the published messages
	connect();
	
});	
