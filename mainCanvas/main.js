paper.install(window);

// Only executed our code once the DOM is ready.
window.onload = function() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('renderCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);


    var background = new Path.Rectangle([0,0],[view.bounds.width,view.bounds.height]);
    background.fillColor='#efefef';

    var line = new Path.Line({
        segments:[view.center,view.center],
        strokeColor:'black'
    });




    var text = new PointText({
        point:new Point(100,100),
        justification:'left',
        fontSize:20,
        fillColor:'black',
        tempContent:'empty',
        drawText:function(msg){
            this.tempContent+=msg+"\n";
        },
        render:function(){
            this.content = this.tempContent;
            this.tempContent = '';
        }
    });



    var mouseEvent = {
        position: new Point(view.center),
        setPosition:function(pos1, pos2){
            if(typeof pos2==='undefined')
                this.position = pos1;
            else
            {
                this.position.x = pos1;
                this.position.y = pos2;
                console.log(pos2);
            }
        }
    };


    var button_element = document.getElementById("button");

    button_element.style.top="100px";
    button_element.style.left="100px";

    var rect=button_element.getBoundingClientRect();

    var r = new Path.Rectangle([rect.left, rect.top],[rect.right-rect.left,rect.bottom-rect.top]);
    r.fillColor='#f76788';

    var paragraph = document.getElementById("paragraph");
    paragraph.style.top = "200px";
    paragraph.style.left = "100px";
    paragraph.style.right = "500px";
 
    rect=paragraph.getBoundingClientRect();

    r = new Path.Rectangle([rect.left, rect.top],[rect.right-rect.left,rect.bottom-rect.top]);
    r.fillColor='#f76788';


    function Button(name) {
        var position = new Point(100,200);


        this.circle = new Path.Circle(new Point(position),50);
        this.circle.fillColor='#b14400';

        this.text = new PointText({
            point:new Point(position),
            justification:'center',
            fontSize:20,
            fillColor:'black',
            content:name});
    }
    Button.prototype.setPosition = function(pos){
        this.position = pos;
        this.text.position = pos;
        this.circle.bounds.center = pos;
        console.log(text);
    }
    Button.prototype.setRadius = function(rad){
        this.circle.scale(2*rad/this.circle.bounds.width);
        console.log(this.circle); 
    }

    var angle = 0;
    view.onFrame = function(event){

        // text.drawText("FPS: "+(1.0/event.delta).toFixed(2)); 
        // text.drawText("Canvas size: "+canvas.width+" "+canvas.height);
        // text.drawText("Mouse pos: "+mouseEvent.position.x.toFixed(2)+" "+mouseEvent.position.y.toFixed(2));
        // text.render();
        angle += event.delta*Math.PI*0.05;
        if(angle>2*Math.PI) angle = 0;

        var mag = 100*Math.sin(angle);
        var right = 500+mag;
        paragraph.style.right = right.toString()+"px";
        rect=paragraph.getBoundingClientRect();
        r.bounds.width = rect.right-rect.left;
        r.bounds.height = rect.bottom-rect.top;

    }
    view.onResize = function(event){

    }









    //handle input from any devices

    function touchMove(point){
        mouseEvent.setPosition(point);
    }
    function touchStart(point){
         mouseEvent.setPosition(point);
    }
    function touchEnd(point){
        mouseEvent.setPosition(point);
    }



    //tools
    var tool = new Tool();
    tool.onMouseDown = function(event){touchStart(event.point);}
    tool.onMouseUp = function(event){touchEnd(event.point);}
    tool.onMouseDrag = function(event){touchMove(event.point);}
    tool.onMouseMove = function(event){
    }

    var touchPos = new Point(0,0);
    canvas.addEventListener("touchstart",
        function touchStartEvent(event){
            touchPoint.x = event.touches[0].pageX;
            touchPoint.y = event.touches[0].pageY;
            touchStart(touchPoint);});
    canvas.addEventListener("touchend",
        function touchStartEvent(event){
            touchPoint.x = event.touches[0].pageX;
            touchPoint.y = event.touches[0].pageY;
            touchEnd(touchPoint);});
    canvas.addEventListener("touchmove",
        function touchMoveEvent(event){
            touchPoint.x = event.touches[0].pageX;
            touchPoint.y = event.touches[0].pageY;
            touchMove(touchPoint);});


    function getAngleInRadians(point) {
        if (!arguments.length) {
            return point.isZero()
                    ? point._angle || 0
                    : point._angle = Math.atan2(point.y, point.x);
        } else {
            var point = Point.read(arguments),
                div = point.getLength() * point.getLength();
            if (Numerical.isZero(div)) {
                return NaN;
            } else {
                var a = point.dot(point) / div;
                return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
            }
        }
    }

}


