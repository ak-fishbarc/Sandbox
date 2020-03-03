
function make_wordsearch_map(x){
    var wordsearch_map = [];
    var x = x;
    var y = x;
    for(i = 0; i < x; i++){
        wordsearch_map[i] = [];
        for(j = 0; j < y; j++){
          wordsearch_map[i].push(null);
        };
    };
    return wordsearch_map;
}
function check(value){
    if(value == (-1)){
        value = value
        lower = value
        higher = -10
    }else{
        value = value
        lower = 10
        higher = value
    }
    for(;lower > higher;){
        console.log(value)
        console.log(2 - (value))
        if(value < 0){
            value--
            lower = value
        } else {
            value++
            higher = value
        }
    }
}

/*
    Track and check the line. If it goes beyond the grid, return an empty array.
    If it's crossing with more than one letter of another word, return an empty array.
    Important:
     - Initial value (-1) will give positive results.
     - Initial value 1 will give negative results.
    Note: Might get improved to cross with more than one letter if letters belong to
    different words.
*/
function track_line(map_to_populate, posx, posy, word, tracker, value, value2){
    var counter = 0;
    var check_overflow = 0;
    var value = value
    // Second value for diagonal tracking.
    var value2 = value2
    var word = word
    var offset = 0;
    var offset2 = 0;
    // Get initial value to change operators in accordance.
    if(value == (-1)){
        value = value;
        lower = value + offset;
        offset = (+1)
        higher = (-word.length);
        if(posx + word.length + 1 <= map_to_populate.length){
            check_overflow = 1
        }
    } else if(value == 0){
        value = 0
    } else if(value == 1){
        value = value;
        offset = (-1)
        lower = word.length;
        higher = value + offset;
        if(posx - (word.length + 1) >= 0){
            check_overflow = 1
        }
    }
    if(value2 == (-1)){
        offset2 = (+1)
        lower = value2 + offset2;
        higher = (-word.length);
        if(posy + word.length <= map_to_populate.length){
            check_overflow = 1;
        }
    } else if(value2 == 0){
        value2 = 0
    } else if(value2 == 1){
        offset2 = (-1)
        lower = word.length + 1;
        higher = value2 + offset2;
        if(posy - word.length >= 0){
            check_overflow = 1;
        }
    }
        // Check the grid.
        if(check_overflow == 1){
        for(;lower > higher;){
            if(map_to_populate[posx - (value + offset)][posy - (value2 + offset2)] == word[value + offset] || map_to_populate[posx - (value + offset)][posy - (value2 + offset2)] == word[value2 + offset2]){
                counter++;
                // Use double substraction to create addition.
                if(value != 0){
                    tracker.push(posx - (value + offset));
                }
                if(value2 != 0){
                    tracker.push(posy - (value2 + offset2));
                }
            } else if(map_to_populate[posx - (value + offset)][posy - (value2 + offset2)] == null && counter <= 1){
                if(value != 0){
                    tracker.push(posx - (value + offset));
                }
                if(value2 != 0){
                tracker.push(posy - (value2 + offset2));
                }
            } else if(counter > 1){
                tracker = [];
                counter = 0;
            } else {
                tracker = [];
                counter = 0;
            }
            // Change values according to initial value.
            if(value < 0){
                value--;
                lower = value;
            } else if (value > 0){
                value++;
                higher = value;
            }
            if(value2 < 0){
                value2--;
                lower = value2;
            } else if (value2 > 0){
                value2++;
                higher = value2;
            }
                counter = 0;
            }}
    return tracker;
}

// Populate map with words and letters.
function populate_map(wordslist, map_to_populate){
    var posx = Math.floor((Math.random() * map_to_populate.length));
    var posy = Math.floor((Math.random() * map_to_populate.length));
    var direction = Math.floor((Math.random() * 7));
    var tracker = [];
    var counter = 0;
    for(i = 0; i < wordslist.length; i++){
        if(direction == 0){
                tracker = []
                tracker = track_line(map_to_populate, posx, posy, wordslist[i], tracker, 0, 1)
                if(tracker.length == wordslist[i].length){
                    for(y = 0; y < tracker.length; y++){
                        map_to_populate[posx][tracker[y]] = wordslist[i][y];
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0;
                }
        } else if(direction == 1){
                tracker = []
                tracker = track_line(map_to_populate, posx, posy, wordslist[i], tracker, 0, -1)
                if(tracker.length == wordslist[i].length){
                    for(y = 0; y < tracker.length; y++){
                        map_to_populate[posx][tracker[y]] = wordslist[i][y]
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0
                }
        } else if(direction == 2){
                tracker = []
                tracker = track_line(map_to_populate, posx, posy, wordslist[i], tracker, 1, 0)
                if(tracker.length == wordslist[i].length){
                    for(x = 0; x < tracker.length; x++){
                        map_to_populate[tracker[x]][posy] = wordslist[i][x]
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0
                }
        } else if(direction == 3){
                tracker = []
                tracker = track_line(map_to_populate, posx, posy, wordslist[i], tracker, -1, 0)
                if(tracker.length == wordslist[i].length){
                    for(x = 0; x < tracker.length; x++){
                        map_to_populate[tracker[x]][posy] = wordslist[i][x]
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0
                }
        } else if (direction == 4){
           if(posx + wordslist[i].length <= map_to_populate.length && posy + wordslist[i].length <= map_to_populate.length){
                tracker = []
                for(x = 0; x < wordslist[i].length; x++){
                    if(map_to_populate[posx + x][posy + x] == wordslist[i][x]){
                        counter++;
                        tracker.push(posx + x);
                        tracker.push(posy + x);
                    } else if(map_to_populate[posx + x][posy + x] == null && counter <= 1){
                        tracker.push(posx + x);
                        tracker.push(posy + x);
                    } else if(counter > 1){
                        tracker = []
                        counter = 0;
                    } else {
                        tracker = []
                        counter = 0;
                    }
                counter = 0;
                }
                if(tracker.length == wordslist[i].length * 2){
                    for(x = 0, y = 0; x < tracker.length, y < wordslist[i].length; x = x + 2, y++){
                        map_to_populate[tracker[x]][tracker[x + 1]] = wordslist[i][y]
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0
                }
           }
        } else if (direction == 5){
           if(posx - wordslist[i].length >= 0 && posy - wordslist[i].length >= 0){
                tracker = []
                for(x = 0; x < wordslist[i].length; x++){
                    if(map_to_populate[posx - x][posy - x] == wordslist[i][x]){
                        counter++;
                        tracker.push(posx - x);
                        tracker.push(posy - x);
                    } else if(map_to_populate[posx - x][posy - x] == null && counter <= 1){
                        tracker.push(posx - x);
                        tracker.push(posy - x);
                    } else if(counter > 1){
                        tracker = []
                        counter = 0;
                    } else {
                        tracker = []
                        counter = 0;
                    }
                counter = 0;
                }
                if(tracker.length == wordslist[i].length * 2){
                    for(x = 0, y = 0; x < tracker.length, y < wordslist[i].length; x = x + 2, y++){
                        map_to_populate[tracker[x]][tracker[x + 1]] = wordslist[i][y]
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0
                }
           }
        } else if (direction == 6){
           if(posx - wordslist[i].length >= 0 && posy + wordslist[i].length <= map_to_populate.length){
                tracker = []
                for(x = 0; x < wordslist[i].length; x++){
                    if(map_to_populate[posx - x][posy + x] == wordslist[i][x]){
                        counter++;
                        tracker.push(posx - x);
                        tracker.push(posy + x);
                    } else if(map_to_populate[posx - x][posy + x] == null && counter <= 1){
                        tracker.push(posx - x);
                        tracker.push(posy + x);
                    } else if(counter > 1){
                        tracker = []
                        counter = 0;
                    } else {
                        tracker = []
                        counter = 0;
                    }
                counter = 0;
                }
                if(tracker.length == wordslist[i].length * 2){
                    for(x = 0, y = 0; x < tracker.length, y < wordslist[i].length; x = x + 2, y++){
                        map_to_populate[tracker[x]][tracker[x + 1]] = wordslist[i][y]
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0
                }
           }
        } else if (direction == 7){
           if(posx + wordslist[i].length <= map_to_populate.length && posy - wordslist[i].length >= 0){
                tracker = []
                for(x = 0; x < wordslist[i].length; x++){
                    if(map_to_populate[posx + x][posy - x] == wordslist[i][x]){
                        counter++;
                        tracker.push(posx + x);
                        tracker.push(posy - x);
                    } else if(map_to_populate[posx + x][posy - x] == null && counter <= 1){
                        tracker.push(posx + x);
                        tracker.push(posy - x);
                    } else if(counter > 1){
                        tracker = []
                        counter = 0;
                    } else {
                        tracker = []
                        counter = 0;
                    }
                counter = 0;
                }
                if(tracker.length == wordslist[i].length * 2){
                    for(x = 0, y = 0; x < tracker.length, y < wordslist[i].length; x = x + 2, y++){
                        map_to_populate[tracker[x]][tracker[x + 1]] = wordslist[i][y]
                    }
                    wordslist[wordslist.indexOf(wordslist[i])] = 0
                }
           }
        }
        direction = Math.floor((Math.random() * 3))
        posx = Math.floor((Math.random() * map_to_populate.length))
        posy = Math.floor((Math.random() * map_to_populate.length))
    }
    function check_wordslist(word){
        return word == 0
    }
    if(!wordslist.every(check_wordslist)){
        wordslist = wordslist.sort()
        wordslist = wordslist.reverse()
        populate_map(wordslist, map_to_populate)
    } else {
        var letterz = 'abcdefghijklmnoprstquwyvz'
        for(x = 0; x < map_to_populate.length; x++){
            for(y = 0; y < map_to_populate.length; y++){
                if(map_to_populate[x][y] == null){
                    map_to_populate[x][y] = letterz[Math.floor((Math.random() * letterz.length))]
                }
            }
        }
    }
    return map_to_populate
}

var words = ['Dywan', 'Zebra', 'Dekarz', 'Opona', 'Paczka', 'Kaczka']
var word_reference = ['Dywan', 'Zebra', 'Dekarz', 'Opona', 'Paczka', 'Kaczka']
var new_map = make_wordsearch_map(words.length * 2)
var word_map = populate_map(words, new_map)

/*
function change_color(){
    if(this.style.backgroundColor = 'white'){
        this.style.backgroundColor = 'green';
    } else {
        this.style.backgroundColor = 'white';
    }
    for(x = 0; x < this.children.length; x++){
        console.log(this.children[x])
    }
}
*/

    function check_field(){
        var direction = null;
        var startx = 0;
        var starty = 0;
        var startNode = null;
        var word = ''
        var divs = []
        for(x = 0; x < this.children.length; x++){
        var posx = parseInt(this.children[x].style.left)
        var posy = parseInt(this.children[x].style.top)
        posx = event.pageX - posx
        posy = event.pageY - posy
        event.preventDefault();
        if(posx > 0 && posx < 31 && posy > 0 && posy < 31){

            if(this.children[x].style.backgroundColor == 'white'){
                startx = event.pageX
                starty = event.pageY
                startNode = this.children[x]
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                divs.push(this.children[x])
                }
        }
        }

        function change_colors(){

        for(x = 0; x < this.children.length; x++){
        var posx = parseInt(this.children[x].style.left)
        var posy = parseInt(this.children[x].style.top)
        posx = event.pageX - posx
        posy = event.pageY - posy
                if(posx > 0 && posx < 31 && posy > 0 && posy < 31){

            if(this.children[x].style.backgroundColor == 'white' || this.children[x].style.backgroundColor == 'blue'){
                    var angleDeg = Math.atan2(starty - event.clientY, startx - event.clientX) * 180 / Math.PI;
                if(direction == null){
               angleDeg = Math.atan2(starty - event.clientY, startx - event.clientX) * 180 / Math.PI;
            console.log(angleDeg)
                if(angleDeg < 30 && angleDeg > -30){
                    direction = 'left'
                } else if (angleDeg > 81 && angleDeg < 115){
                    direction = 'up'
                } else if (angleDeg > 140 || angleDeg < -140){
                    direction = 'right'
                } else if (angleDeg > 115 && angleDeg < 139){
                    direction = 'upright'
                } else if (angleDeg > 40 && angleDeg < 70){
                    direction = 'upleft'
                } else if (angleDeg < -30 && angleDeg > -70){
                    direction = 'downleft'
                    console.log(direction)
                } else if (angleDeg < -120 && angleDeg > - 135){
                    direction = 'downright'

                } else if (angleDeg < -80 && angleDeg > - 110){
                    direction = 'down'

                }
                }else if(direction == 'upright' && (parseInt(this.children[x].style.left) - parseInt(startNode.style.left) % 2 + parseInt(startNode.style.top) - parseInt(this.children[x].style.top) % 2) % 2 == 0 && angleDeg > 120 && angleDeg < 140){
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])


                }else if(direction == 'upleft' && (parseInt(this.children[x].style.left) - parseInt(startNode.style.left) % 2 + parseInt(startNode.style.top) - parseInt(this.children[x].style.top) % 2) % 2 == 0 && angleDeg > 31 && angleDeg < 60){
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])

                }else if(direction == 'downleft' && (parseInt(this.children[x].style.left) - parseInt(startNode.style.left) % 2 + parseInt(startNode.style.top) - parseInt(this.children[x].style.top) % 2) % 2 == 0 && angleDeg < -30 && angleDeg > -60){
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])

                }else if(direction == 'downright' && (parseInt(this.children[x].style.left) - parseInt(startNode.style.left) % 2 + parseInt(startNode.style.top) - parseInt(this.children[x].style.top) % 2) % 2 == 0 && angleDeg < -120 && angleDeg > - 135){
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])


                } else if(direction == 'left' && parseInt(this.children[x].style.left) < parseInt(startNode.style.left) && parseInt(this.children[x].style.top) == parseInt(startNode.style.top)){
                console.log(direction)
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])


                } else if(direction == 'up' && parseInt(this.children[x].style.left) == parseInt(startNode.style.left) && parseInt(this.children[x].style.top) < parseInt(startNode.style.top)){
                console.log(direction)
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])

                } else if(direction == 'right' && parseInt(this.children[x].style.left) > parseInt(startNode.style.left) && parseInt(this.children[x].style.top) == parseInt(startNode.style.top)){
                console.log(direction)
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])

                               } else if(direction == 'down' && parseInt(this.children[x].style.left) == parseInt(startNode.style.left) && parseInt(this.children[x].style.top) > parseInt(startNode.style.top)){
                console.log(direction)
                if(this.children[x].style.backgroundColor == 'blue'){
                    this.children[x].prev_color = 'blue';
                }
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])

                }
}
        }
        }
        }
    function stop_check(){
        event.preventDefault();
        for(x = 0; x < this.children.length; x++){

        var posx = parseInt(this.children[x].style.left)
        var posy = parseInt(this.children[x].style.top)
        posx = event.clientX - posx
        posy = event.clientY - posy
        if(posx > 0 && posx < 31 && posy > 0 && posy < 31){
            if(this.children[x].style.backgroundColor == 'white'){
            var angleDeg = Math.atan2(starty - event.clientY, startx - event.clientX) * 180 / Math.PI;
                this.children[x].style.backgroundColor = 'green';
                word = word + String(this.children[x].innerHTML)
                                divs.push(this.children[x])
                }
        }

        function change_back(item){
            if(item.prev_color == 'blue'){
                item.style.backgroundColor = 'blue';
            } else {
            item.style.backgroundColor = 'white';
            }
        }
        function change_to_blue(item){
            item.style.backgroundColor = 'blue';
            item.prev_color = 'blue';
        }
        if(word_reference.indexOf(word) != -1){
            divs.forEach(change_to_blue)
        }else if(word_reference.indexOf(word) == -1){
            divs.forEach(change_back)
            divs = []
            word = []
        }

        document.getElementById('game_field').removeEventListener('mousemove', change_colors)
    }
    }

            if(startNode != null){

    document.getElementById('game_field').addEventListener('mousemove', change_colors)
    document.getElementById('game_field').addEventListener('mouseup', stop_check)
    id_e = this.id
    posx = this.style.top
    posy = this.style.left
    }
}

function pin_points_to_elements(word_board){
    var x = 0;
    var z = 0;
    var create_tab = document.createElement("DIV")
    document.getElementById('game_field').addEventListener('mousedown', check_field)
    document.getElementById('game_field').style.width = '900px';
    document.getElementById('game_field').style.height = '900px';
    document.getElementById('game_field').style.top = '0px';
    document.getElementById('game_field').style.left = '0px'
    for(i = 0; i < word_board.length; i++){
        for(y = 0; y < word_board.length; y++){
                create_tab = document.createElement('DIV')
                document.getElementById('game_field').appendChild(create_tab)
                create_tab.style.width = '30px';
                create_tab.style.height = '30px';
                create_tab.style.margin = '0px 0px 0px 0px';
                create_tab.style.border = '1px solid black';
                create_tab.style.textAlign = 'center';
                create_tab.style.position = 'absolute';
                create_tab.style.backgroundColor = 'white';
                create_tab.style.width = '30px';
                create_tab.style.height = '30px';
                create_tab.style.left = z + 'px';
                create_tab.style.top = x + 'px';
                if(word_board[i][y] != null){
                    create_tab.id = String(word_board[i][y]) + String(i) + String(y)
                    document.getElementById(create_tab.id).innerHTML = String(word_board[i][y])
                }
                z = z + 31;
        }
        z = 0;
        x = x + 31;
    }
}

pin_points_to_elements(word_map)