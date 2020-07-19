const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const moodApp = {};
const audTag = document.getElementsByTagName("audio");
const happyClips = document.getElementsByClassName("happy");
const sadClips = document.getElementsByClassName("sad");
const number = [1, 2, 3];
const finalSelection = {
    primaryMood: '',
    secondaryMood: ''
}

let clicks = 1;


openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

moodApp.checkboxValue = function (){
    // On checkbox click
    $('input[type=checkbox]').on('click', function(e){
        // if the target of the click has a class of happy
        if (e.target.className === 'happy') {
            //toggle removal of hidden class to show happy dials
            $('.happyMoods').toggleClass('hidden');
            //or if target of click is sad
        } else if (e.target.className === 'sad'){
            //toggle to remove hidden class to show sad dials
            $('.sadMoods').toggleClass('hidden');  
        }

        // If happy dials and sad dials both are not displayed
        if ($('.happyMoods').css('display') == 'none' && $('.sadMoods').css('display') == 'none'){
            //then don't disable the two main dials
            $('.sad').attr("disabled", false);
            $('.happy').attr("disabled", false);
            // otherwise if only sad dials are showing, disable the happy dial
        }   else if ($('.happyMoods').css('display') == 'none') {
            $('.happy').attr("disabled", true);
            $('.sad').attr("disabled", false);
            //or if only the happy dials are showing, disable the sad dial
        } else if ($('.sadMoods').css('display') == 'none'){
            $('.happy').attr("disabled", false);
            $('.sad').attr("disabled", true);
        }
    

        if (clicks === clicks++) {

            if(this.checked) {
                $("." + this.className).not(this).prop("disabled", true);
                audTag[1].currentTime = 0;
                audTag[1].play();
        } else if(!this.checked) {
            $("." + this.className).not(this).prop("disabled", false);
                delete (finalSelection.secondaryMood);
                audTag[1].currentTime = 0;
                audTag[1].play();
        }

    }

        if (this.value == "happy") {
            delete finalSelection.primaryMood;
            delete finalSelection.secondaryMood;
            finalSelection.primaryMood = this.value;
        }

        if (this.value == "happy" && !$(this).is(":checked")) {
            delete finalSelection.primaryMood;
        }

        if (this.value == "sad") {
            delete finalSelection.primaryMood;
            delete finalSelection.secondaryMood;
            finalSelection.primaryMood = this.value;
        }

        if (this.value == "sad" && !$(this).is(":checked")) {
            delete finalSelection.primaryMood;
        }

        if (this.value === "calm" && $(this).is(":checked")) {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }
        
        if (this.value === "calm" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 
        
        if (this.value === "cheerful") {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }

        if (this.value === "cheerful" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 

        if (this.value === "excited") {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }

        if (this.value === "excited" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 

        if (this.value === "romantic") {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }

        if (this.value === "romantic" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 

        if (this.value === "gloomy") {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }

        if (this.value === "gloomy" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 

        if (this.value === "fear") {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }

        if (this.value === "fear" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 

        if (this.value === "tense") {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }

        if (this.value === "tense" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 

        if (this.value === "lonely") {
            delete finalSelection.secondaryMood;
            finalSelection.secondaryMood = this.value;
        }

        if (this.value === "lonely" && !$(this).is(":checked")) {
            delete finalSelection.secondaryMood;
        } 

    })
}

function releaseCheckboxes() {
    if(this.checked) {
        null;
    } else {
        $("." + this.className).prop("disabled", false);

}};

moodApp.activate = function (){
    $('.keyboardContainer button').on('click', function(){
        $('.gifContainer').empty();
        $('.keyboardContainer button').attr("disabled", true);
        $.ajax({
            url:'https://api.giphy.com/v1/gifs/random',
            method: 'GET',
            dataType: 'json',
            data: {
                api_key: 'uOoh1YcEJMW5RZkHeRFcIl5PkkMudbnv',
                tag: `${finalSelection.primaryMood} ${finalSelection.secondaryMood}`
            }
        }).then(function(e){
                const embedUrl = e.data.embed_url;
                $('.gifContainer').append(`<div style="width:300px;height:400px;padding-bottom:0%;position:relative;"><iframe src="${embedUrl}" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed"></iframe></div>`)
                
            });

            let randomNumber = number[Math.floor(Math.random() * number.length)]
            
            if (finalSelection.secondaryMood == "happy"||"calm"||"romantic"||"excited"||"cheerful") {
                happyClips[`${randomNumber}`].currentTime = 0;
                happyClips[`${randomNumber}`].play();
            } else if (finalSelection.secondaryMood == "sad"||"gloomy"||"fear"||"tense"||"lonely") {
                sadClips[`${randomNumber}`].currentTime = 0;
                sadClips[`${randomNumber}`].play();           
            } else if (finalSelection.primaryMood == "happy"||"calm"||"romantic"||"excited"||"cheerful") {
                happyClips[`${randomNumber}`].currentTime = 0;
                happyClips[`${randomNumber}`].play();
            } else if (finalSelection.primaryMood == "sad"||"gloomy"||"fear"||"tense"||"lonely") {
                sadClips[`${randomNumber}`].currentTime = 0;
                sadClips[`${randomNumber}`].play();  
            } else audTag[2].play(); 

        $('html, body').animate({
            scrollTop: $('html').offset().top
        }, 1000);
        
        setTimeout(moodApp.switchReturn, 5000);
        setTimeout( function(){$('.keyboardContainer button').attr("disabled", false);}, 5000);
        })
        
    }

moodApp.volume = function() {
    $('.audio').prop('volume', 0.2);
    $('.volume').change(function(){
        if (this.checked){
            $('.audio').prop('volume', 0);
        } else {
            $('.audio').prop('volume', 0.2);
        }
    })
}

moodApp.reset = function(){
    $('.happyMoods').addClass('hidden');
    $('.sadMoods').addClass('hidden');
    $('.happy').removeAttr("disabled");
    $('.sad').removeAttr("disabled");
    $('.happy2').removeAttr("disabled");
    $('.sad2').removeAttr("disabled");

    $('input[type=checkbox]').each(function() { 
        this.checked = false; 
        finalSelection.primaryMood = '';
        finalSelection.secondaryMood = '';
    }); 
}

moodApp.switchReturn = function(){
    $('.gifContainer').empty(),

    ($('.gifContainer').append(`<div style="width:300px;height:400px;padding-bottom:0%;position:relative;"><iframe src="https://giphy.com/embed/1qpQwleotpxXG" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed"></iframe></div>`));

    moodApp.reset();

    audTag[0].play(); 
}


moodApp.resetButton = function(){
    $('.resetButton').on('click', function(){
        audTag[2].play();
        moodApp.reset();
    })
}   

moodApp.init = () => {
    moodApp.checkboxValue();
    moodApp.activate();
    moodApp.volume();
    moodApp.switchReturn();
    moodApp.resetButton();
}

$(function(){
    moodApp.init();
})