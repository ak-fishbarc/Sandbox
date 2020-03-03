var compare = document.getElementById('sentence').value
console.log(compare)
function slice_n_dice(){
    if(document.getElementById('sentence').value && document.getElementById('level').value){
        compare = document.getElementById('sentence').value
        var sentence = document.getElementById('sentence').value
        var prepare_to_cut = sentence.split(" ")
        var level = parseInt(document.getElementById('level').value)
        console.log(typeof level)
        if(typeof level == "number" && level <= prepare_to_cut.length){
            for(z = 0; z < level; z++){
                var random_num = Math.floor(Math.random() * prepare_to_cut.length)
                if(prepare_to_cut[random_num] != ""){
                    prepare_to_cut[random_num] = ""
                } else {
                 console.log(z)
                 z = z - 1
                }
            }
            console.log(prepare_to_cut)
            prepare_to_cut = prepare_to_cut.toString()
            for(x = 0; x < prepare_to_cut.length; x++){
                prepare_to_cut = prepare_to_cut.replace(",", " ")
            }
            document.getElementById('sentences_form').reset()
            document.getElementById('show_sentence').innerHTML = prepare_to_cut
    }else{
        console.log('level must be a number')
    }
    }
}

function compare_two(){
    var sentence_to_compare = document.getElementById('compare').value
    if(sentence_to_compare){
        if(sentence_to_compare == compare){
            document.getElementById('show_sentence').innerHTML = 'Correct!'
        }else{
            document.getElementById('show_sentence').innerHTML = 'Wrong!'
        }
    }
}