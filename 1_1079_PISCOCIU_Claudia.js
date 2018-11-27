		function playSound(){
		var canvasSound = document.getElementById("canvasSound");
		canvasSound.play();
		}

		function scaleImage(){
			var canvasSound = document.getElementById("canvasSound");
			canvasSound.play();
			var image = document.getElementById('canvasImage');
			image.style.width = "300px";
			image.style.height = "300px";
		}

		function scaleUp(){
			var canvasSound = document.getElementById("canvasSound");
			canvasSound.play();
			var image1 = document.getElementById('canvasImage');
			image1.style.width = "800px";
			image1.style.height =  "800px";
		}

		function cropImage(){
			
			var canvas = document.getElementById('canvasImage');
			var context = canvas.getContext('2d');
			var imageObj = new Image();
	  
			imageObj.onload = function() {
			  // draw cropped image
			  var sourceX = 150;
			  var sourceY = 0;
			  var sourceWidth = 150;
			  var sourceHeight = 150;
			  var destWidth = sourceWidth;
			  var destHeight = sourceHeight;
			  var destX = canvas.width / 2 - destWidth / 2;
			  var destY = canvas.height / 2 - destHeight / 2;
	  
			  context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
	

			}
			imageObj.src = document.getElementById('canvasImage');
		}

		$(function() {
			var canvas = document.getElementById('canvasImage');
			var ctx = canvas.getContext('2d');
			var drawing = false;
			var startX = 0;
			var startY = 0;
			var tool = '';
			var shapes = [];
			var tools = document.getElementsByName('shape');
		
			for(var i = 0; i < tools.length; i++) {
				tools[i].addEventListener('click', function(e){
					tool = e.target.getAttribute('id');
				});
			}
			canvas.addEventListener('mousedown', function(e){
				drawing = true;
				startX = e.offsetX;
				startY = e.offsetY;
			});
			canvas.addEventListener('mouseup', function(e){
				if(drawing) {
				var shape = {
					shape: tool,
					startX: startX,
					startY: startY,
					endX: e.offsetX, 
					endY: e.offsetY,
					color: "#000000",
					lineWidth: 1,
					strokeStyle: "#000000"
				};
				shapes.push(shape);
				render(shapes);
				}
				drawing = false;
			});
			canvas.addEventListener('click', function(e){
					var img_data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
			});
			canvas.addEventListener('mousemove', function(e){
				if(drawing) {
					render(shapes);
					var shape = {
						shape: tool,
						startX: startX,
						startY: startY,
						endX: e.offsetX, 
						endY: e.offsetY,
						color: "#000000",
						lineWidth: 1,
						strokeStyle: "#000000"
					};
					draw(shape);
				}
			});
		
			function draw(obj) {
			
				switch(obj.shape) {
					case 'line':
						ctx.beginPath();
						ctx.moveTo(obj.startX, obj.startY);
						ctx.lineTo(obj.endX, obj.endY);
						ctx.lineWidth = obj.lineWidth;
						ctx.strokeStyle = obj.color;
						ctx.stroke();
						break;
					case 'circle':
						var radius = obj.endX - obj.startX;
						var centerX = obj.startX;
						var centerY = obj.startY;
						ctx.beginPath();
						ctx.arc(centerX, centerY, Math.abs(radius), 0, 2 * Math.PI, false);
						ctx.fillStyle = obj.color;
						ctx.fill();
						break;
					case 'rect': 
						ctx.fillStyle = obj.color;
						ctx.fillRect(obj.startX, obj.startY, obj.endX - obj.startX, obj.endY - obj.startY);
						break;
				}
			}
			function render(shapes) {
				//ctx.clearRect(canvas.width, canvas.height, canvas.width, canvas.height);
				for(var i = 0; i < shapes.length; i++) {
					draw(shapes[i]);
				}
				console.log(shapes);
			}
		
		});