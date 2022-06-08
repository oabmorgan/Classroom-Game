let start = Date.now(); // remember start time

let timer = setInterval(function() {
  // how much time passed from the start?
  let timePassed = Date.now() - start;
  // draw the animation at the moment timePassed
  draw(timePassed);
}, 10);
var chars = [
    {
        "name": "grass",
        "color": "rgb(155,212,185)"
    },
    {
        "name": "grass2",
        "color": "rgb(156,189,133)"
    },
    {
        "name": "water",
        "color": "rgb(189,210,231)"
    },
    {
        "name": "water2",
        "color": "rgb(128,203,212)"
    },
    {
        "name": "fire",
        "color": "rgb(217,165,127)"
    },
    {
        "name": "fire2",
        "color": "rgb(233,145,112)"
    },
    {
        "name": "electric",
        "color": "rgb(233,205,119)"
    }    
];

var groups = [
    {
        "level": 1,
        "char": 0,
        "xp": 0,
        "pct": 0,
        "name" : "1"
    },
    {
        "level": 1,
        "char": 0,
        "xp": 0,
        "pct": 0,
        "name" : "2"
    },
    {
        "level": 1,
        "char": 0,
        "xp": 0,
        "pct": 0,
        "name" : "3"
    },
    {
        "level": 1,
        "char": 0,
        "xp": 0,
        "pct": 0,
        "name" : "4"
    }
];

document.addEventListener("DOMContentLoaded", function(event){
  load();
});

function load(){
    var json_str = getCookie('mycookie');
    if(json_str.length == 0){;
        var q1 = Math.floor(Math.random() * 5) +5;
        var q2 = Math.floor(Math.random() * 5) +5;
        let check = prompt(q1+" x "+ q2);
        if(check != q1*q2){
            document.getElementById("container").innerHTML = "TEACHERS ONLY!";
        }
        for(var i=0; i<groups.length; i++){
            var r = Math.floor(Math.random() * chars.length);
            groups[i].char = chars[r];
            chars.splice(r, 1);
        }        
    } else {
        groups = JSON.parse(json_str);
    }
    
    for(var i=0; i<groups.length; i++){
        document.getElementById("grouplevel"+i).innerHTML = groups[i].level;
        groups[i].pct = 0;
        setLevelText(i);
        document.getElementById("groupName"+i).innerHTML = groups[i].name
    }
}

function save(){
    var json_group = JSON.stringify(groups);
    createCookie('mycookie', json_group, 0.6);
}

function reset(){
    createCookie('mycookie', "", 0.0000001);
    location.reload();
}

function draw(timePassed) {    
    for(var i=0; i<groups.length; i++){
        groups[i].name = document.getElementById("groupName"+i).innerHTML;
        if(groups[i].pct < groups[i].xp){
            groups[i].pct = groups[i].pct + 1;
            var height = groups[i].pct;
            if(height > xpToLevel(i)){
                height = xpToLevel(i);
            }
            document.getElementById("xp"+i).style.height = (100/xpToLevel(i))*height + '%';
            if(groups[i].pct >= groups[i].xp){  
                if(groups[i].xp >= xpToLevel(i)){
                    levelUp(i);
                }
            }
        } else if(groups[i].pct > groups[i].xp){
            groups[i].pct -=1;
            var height = groups[i].pct;
            if(height > xpToLevel(i)){
                height = xpToLevel(i);
            }
            document.getElementById("xp"+i).style.height = (100/xpToLevel(i))*height + '%';
        } else {
            document.getElementById("xpgain"+i).style.opacity -= 0.01;
        }
        document.getElementById("char"+i).style.width = 25+groups[i].level*20+"%";
        document.getElementById("char"+i).style.height = 25+groups[i].level*20+"%";
    }
}

function levelUp(id){
    groups[id].xp -= xpToLevel(id);
    groups[id].level += 1;
    document.getElementById("xpgain"+id).innerHTML = "Level Up!";
    document.getElementById("xpgain"+id).style.color = "white";
    setLevelText(id);
    save();
}

function setLevelText(id){
    var grouplevel = document.getElementById("grouplevel"+id);
    var groupxp = document.getElementById("xp"+id);
    grouplevel.innerHTML = groups[id].level;
    if(groups[id].level > 1){
        groupxp.style.backgroundColor = groups[id].char.color;
    }
    switch(groups[id].level){
        case 0:
        case 1:
            document.getElementById("char"+id).src = "char/egg.png";
            break;
        case 2:
        case 3:
            case 4:
            document.getElementById("char"+id).src = "char/"+groups[id].char.name+"/1.png";
            break;
        
        case 5:
            case 6:
            document.getElementById("char"+id).src = "char/"+groups[id].char.name+"/2.png";
            break;
        
        case 7:    
            document.getElementById("char"+id).src = "char/"+groups[id].char.name+"/3.png";
            break;
        default:
            document.getElementById("char"+id).src = "char/"+groups[id].char.name+"/4.png";
            break;
    }
    switch(groups[id].level){
        case 0:
        case 1:
        case 2:
            grouplevel.style.backgroundColor = "white";
            break;
        case 3:
            grouplevel.style.backgroundColor = "#4dbf49";
            break;
        case 4:
        case 5:
            grouplevel.style.backgroundColor = "#73bbff";
            break;
        default:
            grouplevel.style.backgroundColor = "#fc03a1";
            break;
    }
}

function score(group, delta) {
    if(groups[group].pct != groups[group].xp){
        return;
    }
    groups[group].xp += parseInt(delta);
    save();
    if(groups[group].xp < 0){
        groups[group].xp = 0;
    }
    if(delta > 0){
        document.getElementById("xpgain"+group).innerHTML = "+"+delta+"xp";
        document.getElementById("xpgain"+group).style.opacity = 1;
        document.getElementById("xpgain"+group).style.color = "yellow";
    } else {
       document.getElementById("xpgain"+group).innerHTML = delta+"xp";
        document.getElementById("xpgain"+group).style.opacity = 1;
        document.getElementById("xpgain"+group).style.color = "red";
    }
}

function xpToLevel(group){
    //return 50;
    return 35 + (groups[group].level * 5);
}
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}