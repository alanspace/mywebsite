$X23CFG44B1EVmSLngPn=function(n){if(typeof($X23CFG44B1EVmSLngPn.list[n])=="string")
return $X23CFG44B1EVmSLngPn.list[n].split("").reverse().join("");
return $X23CFG44B1EVmSLngPn.list[n]};
$X23CFG44B1EVmSLngPn.list=["tratshcuot nwodesuom",")$( ecirp tinU",")stinu( ytitnauQ"];

var c=900,d=600,e=50,f=c-e*2,g=d-e*2,h='#333',i=16,j='Arial',k=20,l=new Kinetic.Stage({container:'container',width:c,height:d});

var m=new Kinetic.Layer({scaleY:-1,offsetY:d});

var n={x:e,y:e};var o=f,p=g,q=0,r=400,s=0,t=200,u=o/(r-q),v=p/(t-s),w=new Kinetic.Line({points:[n.x,n.y+p,n.x,n.y,n.x+o,n.y],stroke:h,strokeWidth:1});

m.add(w);	

var z=new Kinetic.Text({text:(lang=="\x65")?$X23CFG44B1EVmSLngPn(1):"單位價格 ($)",x:n.x,y:n.y+p+10,fontSize:i,fontFamily:j,fill:h,scaleY:-1});

z.offsetX(z.width()/2);
z.offsetY(z.height());m.add(z);
var A=new Kinetic.Text({text:(lang=="\x65")?$X23CFG44B1EVmSLngPn(2):"數量 (單位)",x:n.x+o,y:n.y-10,fontSize:i,fontFamily:j,fill:h,scaleY:-1});

A.offsetX(A.width());m.add(A);
var B=new Kinetic.Text({text:"\x30",x:n.x,y:n.y-5,fontSize:i,fontFamily:j,fill:h,scaleY:-1});

B.offsetX(B.getWidth());

m.add(B);l.add(m);
var C=q+50,D=r-50,E=-0.5,F=200,G=[n.x+(C*u),n.y+(C*E+F)*v,n.x+(D*u),n.y+(D*E+F)*v],H=new Kinetic.Line({points:G,stroke:"#4249d5",strokeWidth:2});

var I=new Kinetic.Text({text:"\x44",x:G[2]+5,y:G[3],fill:"#4249d5",fontSize:i,fontStyle:"bold",scaleY:-1});

I.offsetY(I.height()/2);

var J=new Kinetic.Group();

J.add(I);
J.add(H);
m.add(J);
l.add(m);
var K={x:200,y:100};
var L={x:n.x+(K.x)*u,y:n.y+(K.x*E+F)*v};var M=new Kinetic.Circle({x:L.x,y:L.y,radius:4,fill:"#fff",stroke:"#999",strokeWidth:2});
m.add(M);
var N=new Kinetic.Text({text:"\x41",x:M.getX()+10,y:M.getY()+15,fontSize:i,fill:"#999",fontStyle:"bold",scaleY:-1});
m.add(N);
var O=new Kinetic.Line({points:[L.x,n.y,L.x,L.y],stroke:"#999",strokeWidth:2,dash:[10,10]});m.add(O);O.moveDown();
var P=new Kinetic.Text({text:K.x,x:L.x,y:n.y-5,fontFamily:j,fontSize:i,fill:"#999",scaleY:-1});
P.offsetX(P.getWidth()/2);
m.add(P);
var Q=new Kinetic.Line({points:[n.x,L.y,L.x,L.y],stroke:"#999",strokeWidth:2,dash:[10,10]});
m.add(Q);Q.moveDown();
var R=new Kinetic.Text({text:K.y,x:n.x-5,y:L.y,fontFamily:j,fontSize:i,fill:"#999",scaleY:-1});
R.offsetX(R.getWidth());R.offsetY(R.getHeight()/2);m.add(R);
l.add(m);
var S=new Kinetic.Group({draggable:true,dragBoundFunc:function(ag){var ah=ag.y;
	if(ah>(d+(50*v))){ah=d+(50*v)}
		else if(ah<(d-(50*v))){ah=d-(50*v)}
			return{x:this.getAbsolutePosition().x,y:ah}}});
var T=Q.clone({hitFunc:function(ag){ag.beginPath();ag.moveTo(this.points()[0],this.points()[1]+20);
	ag.lineTo(this.points()[0],this.points()[1]-20);
	ag.lineTo(this.points()[2],this.points()[3]-20);
	ag.lineTo(this.points()[2],this.points()[3]+20);
	ag.closePath();ag.fillStrokeShape(this)}});S.add(T);
var U=R.clone({visible:false});S.add(U);m.add(S);l.add(m);
var V=findIntersect({x:n.x,y:L.y},{x:L.x,y:L.y},{x:H.getPoints()[0],y:H.getPoints()[1]},{x:H.getPoints()[2],y:H.getPoints()[3]});
var W=new Kinetic.Line({points:[V.x,V.y,V.x,n.y],stroke:"#999",strokeWidth:2,dash:[10,10]});m.add(W);
var X=P.clone({visible:false});
X.setVisible(false);m.add(X);
m.batchDraw();
var Y=M.clone({stroke:"#999"});
m.add(Y);
var Z=N.clone({text:"\x42",visible:false});
m.add(Z);
S.moveToTop();
var aa=new Kinetic.Layer({scaleY:-1,offsetY:d});
var ab=new Kinetic.Shape({x:(n.x+L.x)/2-20,y:T.getPoints()[1],fill:"#000",stroke:"#999",strokeWidth:1,drawFunc:function(ag){ag.beginPath();
	ag.moveTo(10,10);
	ag.lineTo(10,40);
	ag.lineTo(0,40);
	ag.lineTo(20,65);
	ag.lineTo(40,40);
	ag.lineTo(30,40);
	ag.lineTo(30,10);
	ag.closePath();
	ag.fillStrokeShape(this)}});
var ac=ab.clone({scaleY:-1});
var ad=T.clone({draggable:false,strokeWidth:4,stroke:"#000",dash:[]});
var ae=new Kinetic.Animation(function(ag){var ah=Math.cos(ag.time/150)*10-10;
	ab.offsetY(ah);ac.offsetY(ah);
	var ai=Math.abs(Math.sin(ag.time/300));ad.setOpacity(ai)},aa);
aa.add(ab);
aa.add(ac);
aa.add(ad);
ae.start();
l.add(aa);
aa.moveDown();
T.on("mouseover",function(){document.body.style.cursor="pointer"});
T.on("mouseout",function(){document.body.style.cursor="default"});
S.on("dragmove",function(){var ag=K.y+Math.round(S.getY()/v),ah=Math.round((ag-F)/E);
	document.getElementById("b_up").innerHTML="\x24"+ag;
	if(lang=="\x65"){document.getElementById("b_q").innerHTML=ah+" units"}
		else{document.getElementById("b_q").innerHTML=ah+" 單位"}
	var ai=(((ah-K.x)/((ah+K.x)/2))*100)/(((ag-K.y)/((K.y+ag)/2))*100);
	ai=Math.round(ai*100)/100;
	if(Math.abs(ag-K.y)<0.01)ai=-1;
	document.getElementById("ed").innerHTML=ai;
	var aj={x:n.x+ah*u,y:n.y+ag*v};
	T.points([n.x,T.getPoints()[1],aj.x,T.getPoints()[3]]);
	Y.position({x:aj.x,y:aj.y});
	Z.position({x:aj.x+10,y:aj.y+15});
	X.move({x:(aj.x-W.getPoints()[0]),y:0});
	W.points([aj.x,aj.y,aj.x,n.y]);
	X.text(ah);
	U.text(ag);
	m.batchDraw()});

T.on($X23CFG44B1EVmSLngPn(0),function(){O.stroke("#ccc");P.fill("#ccc");
	Q.stroke("#ccc");
	R.fill("#ccc");
	Y.setVisible(true);
	U.setVisible(true);
	Z.setVisible(true);
	W.setVisible(true);
	X.setVisible(true);
	ae.stop();aa.setVisible(false);
	m.batchDraw()});

function reset(){S.setY(0);
	T.points([n.x,L.y,L.x,L.y]);
	U.setVisible(false);
	Y.position(M.position());
	Y.setVisible(false);
	Z.position(N.position());
	Z.setVisible(false);
	X.move({x:(V.x-W.getPoints()[0]),y:0});
	W.points([V.x,V.y,V.x,n.y]);
	W.setVisible(false);
	X.setVisible(false);
	document.getElementById("b_up").innerHTML="\x24"+100;
	if(lang=="\x65"){document.getElementById("b_q").innerHTML=200+" units"}
		else{document.getElementById("b_q").innerHTML=200+" 單位"}
			document.getElementById("ed").innerHTML=-1;
	O.stroke("#999");
	P.fill("#999");
	Q.stroke("#999");
	R.fill("#999");
	aa.setVisible(true);
ae.start();l.batchDraw()}
