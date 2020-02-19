function save_deck(){
    var deck = []
    var deckname = document.getElementById('deckname').value
    var cards = document.getElementsByTagName('div');
    if(cards.length > 0){
        for(i=0; i < cards.length; i++){
            if(cards[i].front_value && cards[i].back_value){
            deck.push(cards[i].front_value)
            deck.push(cards[i].back_value)
            }
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "save_deck?value=" + deck + "&deck=" + deckname);
        xhttp.send();
    }
}