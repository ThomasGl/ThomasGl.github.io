//Logo hover effect
var git = document.querySelector('a.GithubButton');
var gitL = document.querySelector('img.GitIMG')


var linke = document.querySelector('a.LinkedInButton');
var linkeL = document.querySelector('img.LinkedInIMG')


var mail = document.querySelector('a.MailButton');
var mailL = document.querySelector('img.MailIMG')


function CheckMedia(check) {
    if (!check.matches) { // If media query matches
        git.onmouseout = function(){gitL.style.display = "none";}
        git.onmouseover = function(){gitL.style.display = "block";}

        linke.onmouseout = function(){linkeL.style.display = "none";}
        linke.onmouseover = function(){linkeL.style.display = "block";}

        mail.onmouseout = function(){mailL.style.display = "none";}
        mail.onmouseover = function(){mailL.style.display = "block";}
    }
}
  
var check = window.matchMedia("(max-width: 1000px)")
CheckMedia(check) // Call listener function at run time
check.addListener(CheckMedia) // Attach listener function on state changes
//Inverting TAU logo
function InvertIMG(event) {
    var cX = event.clientX;       
    var percentile = Math.abs(4*(cX-screen.width/2)/screen.width); 
    tau.style.filter = `invert(${percentile})`
}

var tau = document.querySelector('img.Tau');
var test = document.querySelector('body');
test.onmousemove = function(event){InvertIMG(event);}

//Text typing effect
class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
        else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        var that = this;
        var delta = 200 - Math.random() * 100;
        if (this.isDeleting) {
            delta /= 2;
        }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(function () {
            that.tick();
        }, delta);
    }
}

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #70a0e4cc}";
    document.body.appendChild(css);
}
