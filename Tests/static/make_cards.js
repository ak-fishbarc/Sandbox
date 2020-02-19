function turn(){
        this.style.fontSize = '18px';
        if(this.innerHTML == this.front_value){
            if(this.back_value.length < 70){
                this.innerHTML = this.back_value;
            } else if(this.back_value.length < 100){
                this.style.fontSize = '15px';
                this.innerHTML = this.back_value;
            } else if(this.back_value.length < 120){
                this.style.fontSize = '12px';
                this.innerHTML = this.back_value;
            } else {
                this.style.fontSize = '10px';
                this.innerHTML = this.back_value;
            }
        }else{
            if(this.front_value.length < 70){
                this.innerHTML = this.front_value;
            }else if(this.front_value.length < 100){
                this.style.fontSize = '15px';
                this.innerHTML = this.front_value;
            }else{
                this.style.fontSize = '12px';
                this.innerHTML = this.front_value;
            }
            }
        }

function season_the_card(card_id, front, back){
        card_to_season = document.getElementById(card_id)
        card_to_season.innerHTML = front.value;
        card_to_season.front_value = front.value;
        card_to_season.back_value = back.value;
        card_to_season.style.border = '1px solid black';
        card_to_season.style.textAlign = 'center';
        card_to_season.style.width = '100px';
        card_to_season.style.height = '130px';
        card_to_season.style.position = 'absolute';
        card_to_season.style.cursor = 'move';
        card_to_season.addEventListener('dblclick', turn)
        card_to_season.addEventListener('mousemove', dragElement)
    };

function create_card(){
    var front_text = document.getElementById("front");
    var back_text = document.getElementById("back");
    var new_card = document.createElement("DIV");
    new_card.id = front_text.value;
    document.body.appendChild(new_card);
    season_the_card(new_card.id, front_text, back_text);
};
