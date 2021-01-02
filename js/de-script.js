
$(document).ready(function() {
		var canvas    = document.createElement('canvas');
		var ctx       = canvas.getContext("2d");
		var watch     = new StopWatch();
		var chunkSize = 500;
		var imgd      = ctx.getImageData(0,0,225,225);
		var img,pix;
		var file = {};
		var pass;
		var passwd;
		var bar = document.getElementById('decrypting');

		
			
	
		document.getElementById('enter').addEventListener('click', setPasswd, false);

	
		function setPasswd(evt){
			 passwd = document.getElementById('passwd').value;
			
		}
	
	
	
		$('#decrypt').click(function(e) {
			var encryptedText = $('#decrypt-text').val();
			var dWorker       = new Worker('js/decrypt.js');
			dWorker.postMessage({command:'image',value:encryptedText,chunk:chunkSize,passwd});
			watch.start();
						
			dWorker.onmessage = function(event) {
				switch(event.data.command) {
					case 'log' :
						console.log('Worker Log : ' + event.data.value);
						break;
				
					case 'progress' :
						$('#decrypting').css("width",event.data.value + "%");
						bar.innerHTML = event.data.value * 1 + "%";
						break;
						
						
					case 'decrypting' :
						
						
						var image = new Image();
						image.src = event.data.code;
						$(image).insertAfter('#imgLabel');
						watch.stop();
						$('#Time').html(watch.duration());
						dWorker.terminate();
						break;
						
				}
			}
		});
		
	  
		function StopWatch(){
			var startTime = null; 
			var stopTime = null; 
			var running = false; 
			
			function getTime(){
				var day = new Date();
				return day.getTime();
			}
			
			
			this.start = function(){ 
				if (running == true)        return;
				else if (startTime != null) stopTime = null; 

				running = true;    
				startTime = getTime();
			}
			
			
			this.stop = function(){ 
				if (running == false) return;    
				stopTime = getTime();
				running = false; 
			}
			
			this.duration = function(){ 
				if(startTime == null || stopTime == null)return 'Undefined';
				else  return (stopTime - startTime) / 1000;
			}
		}
		
});
			