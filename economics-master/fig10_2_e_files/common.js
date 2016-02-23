function isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}
if (!isCanvasSupported()) {
    if (lang == "e") {
        document.getElementById("container").innerHTML = "Your browser does not support the <canvas> tag, it is recommended to use IE9+, Firefox 4+ or Chrome.";
    }
    else {
        document.getElementById("container").innerHTML = "您的瀏覽器不支援部份功能。建議使用以下瀏覽器︰IE9+, Firefox 4+ or Chrome";
    }
}

function findIntersect(p11, p12, p21, p22) {
    var ua = ((p22.x - p21.x) * (p11.y - p21.y) - (p22.y - p21.y) * (p11.x - p21.x)) / ((p22.y - p21.y) * (p12.x - p11.x) - (p22.x - p21.x) * (p12.y - p11.y));
    var ub = ((p12.x - p11.x) * (p11.y - p21.y) - (p12.y - p11.y) * (p11.x - p21.x)) / ((p22.y - p21.y) * (p12.x - p11.x) - (p22.x - p21.x) * (p12.y - p11.y));
    return { x: p11.x + ua * (p12.x - p11.x), y: p11.y + ua * (p12.y - p11.y) };
}


function labelWithSub(str, substr, x, y, color, fontstyle) {
    if (color == undefined) {
        color = "#999";
    }
    if (fontstyle == undefined) {
        fontsytle = "normal";
    }
    var tmp = new Kinetic.Group();
    var tmp_l = new Kinetic.Text({
        text: str,
        x: x,
        y: y,
        fontFamily: 'Arial',
        fontSize: 16,
        fontStyle: fontstyle,
        fill: color,
        scaleY: -1
    });
    var tmp_s = new Kinetic.Text({
        text: substr,
        x: x + tmp_l.getWidth(),
        y: y - tmp_l.getHeight(),
        fontFamily: 'Arial',
        fontStyle: fontstyle,
        fontSize: 10,
        fill: color,
        scaleY: -1
    });
    tmp_s.offsetY(tmp_s.getHeight());
    tmp.offsetX((tmp_l.getWidth() + tmp_s.getWidth()) / 2);
    tmp.add(tmp_l);
    tmp.add(tmp_s);
    return tmp;
}

function loadConcept(fig, lang) {
    if (lang == "e") {
        for (var i = 0; i < infoE.length; i++) {
            if (infoE[i].figNo == fig) {
                if (infoE[i].concept.length == 1) {
                    document.getElementById("conceptHeader").innerHTML = "Concept involved:";
                }
                if (infoE[i].concept.length > 1) {
                    document.getElementById("conceptHeader").innerHTML = "Concepts involved:";
                }
                document.getElementById("conceptBox").innerHTML = "";
                for (var j = 0; j < infoE[i].concept.length; j++) {
                    document.getElementById("conceptBox").innerHTML += "<li>"+infoE[i].concept[j]+"</li>";
                }
                return;
            }
        }
    }
    else {
        for (var i = 0; i < infoC.length; i++) {
            if (infoC[i].figNo == fig) {
                document.getElementById("conceptBox").innerHTML = "";               
                for (var j = 0; j < infoC[i].concept.length; j++) {
                    document.getElementById("conceptBox").innerHTML += "<li>" + infoC[i].concept[j] + "</li>";
                }
                return;
            }
        }
    }
}

var demandColor = "#4249d5";
var supplyColor = "#b3e40e";
var demandColorDim = "#b2b5ee";
var supplyColorDim = "#cbf347";
var kinkedSupplyColor = "#008000";
var lrasColor = "#008000";
var lrasColorDim = "#80bf80";

var gainInTotalRevenueColor = "rgba(51, 102, 255, 0.5)";
var lossInTotalRevenueColor = "rgba(255, 153, 0, 0.5)";

var originalTotalRevenueColor = "rgba(0, 128, 0, 0.3)";
var newTotalRevenueColor = "rgba(255, 153, 0, 0.3)";

var consumerTaxBurdenColor = "rgba(102, 0, 255, 0.5)";
var producerTaxBurdenColor = "rgba(0, 128, 0, 0.5)";

var producerSubsidyColor = "rgba(205, 206, 208, 0.5)";
var consumerSubsidyColor = "rgba(246, 240, 156, 0.5)";

var consumerSurplusColor = "rgba(162,199,154, 0.5)";
var producerSurplusColor = "rgba(176, 152, 203, 0.5)";
var deadweightLossColor = "rgba(235, 189, 124, 0.5)";
var govTaxRevenueColor = "rgba(192, 192, 192, 0.5)";

var tariffRevenueColor = "rgba(51, 102, 255, 0.5)";
var quotaRevenueColor = "rgba(51, 102, 255, 0.5)";
