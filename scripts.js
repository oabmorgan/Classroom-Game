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
        "pct": 0
    },
    {
        "level": 1,
        "xp": 0,
        "pct": 0
    },
    {
        "level": 1,
        "xp": 0,
        "pct": 0
    },
    {
        "level": 1,
        "xp": 0,
        "pct": 0
    }
];

function draw(timePassed) {
    for(var i=0; i<4; i++){
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
    var grouplevel = document.getElementById("grouplevel"+id);
    grouplevel.innerHTML = groups[id].level;
    switch(groups[id].level){
        case 3:
            grouplevel.style.backgroundColor = "#4dbf49";
        break;
        case 5:
            grouplevel.style.backgroundColor = "#73bbff";
        break;
        case 10:
            grouplevel.style.backgroundColor = "#ffe054";
        break;
    }
}

function score(group, delta) {
    if(groups[group].pct != groups[group].xp){
        return;
    }
    groups[group].xp += parseInt(delta);
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