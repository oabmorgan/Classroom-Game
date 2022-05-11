let start = Date.now(); // remember start time

let timer = setInterval(function() {
  // how much time passed from the start?
  let timePassed = Date.now() - start;
  // draw the animation at the moment timePassed
  draw(timePassed);
}, 20);

var groups = [
    {
        "level": 1,
        "xp": 0,
        "pct": 0,
        "name" : ""
    },
    {
        "level": 1,
        "xp": 0,
        "pct": 0,
        "name" : ""
    },
    {
        "level": 1,
        "xp": 0,
        "pct": 0,
        "name" : ""
    },
    {
        "level": 1,
        "xp": 0,
        "pct": 0,
        "name" : ""
    }
];

function load(){
    var json_str = getCookie('mycookie');
    groups = JSON.parse(json_str);

    for(var i=0; i<4; i++){
        document.getElementById("grouplevel"+i).innerHTML = groups[i].level;
        groups[i].pct = 0;
        setLevelText(i);
        document.getElementById("groupName"+i).innerHTML = groups[i].name;
    }    
}

function save(){
    var json_group = JSON.stringify(groups);
    createCookie('mycookie', json_group, 0.6);
}

function reset(){
    var json_group = JSON.stringify(groups);
    createCookie('mycookie', json_group, 0.00000001);
    location.reload();
}

function draw(timePassed) {
    for(var i=0; i<4; i++){
        groups[i].name = document.getElementById("groupName"+i).innerHTML;
        if(groups[i].pct < groups[i].xp){
            groups[i].pct = groups[i].pct + 1;
            var height = groups[i].pct *2;
            if(height > 100){
                height = 100;
            }
            document.getElementById("xp"+i).style.height = height + '%';
            if(groups[i].pct >= groups[i].xp){  
                if(groups[i].xp >= xpToLevel(i)){
                    levelUp(i);
                }
            }
        } else if(groups[i].pct > groups[i].xp){
            groups[i].pct -=1;
            var height = groups[i].pct *2;
            if(height > 100){
                height = 100;
            }
            document.getElementById("xp"+i).style.height = height + '%';
        } else {
            document.getElementById("xpgain"+i).style.opacity -= 0.01;
        }     
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
    grouplevel.innerHTML = groups[id].level;
    if(groups[id].level >= 3){
        grouplevel.style.backgroundColor = "#4dbf49";
    }
    if(groups[id].level >= 4){
        grouplevel.style.backgroundColor = "#73bbff";
    }
    if(groups[id].level >= 5){
        grouplevel.style.backgroundColor = "#ffe054";
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
    return 50;
    //return 40 + (groups[group].level * 10);
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