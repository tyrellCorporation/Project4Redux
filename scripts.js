const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const moodApp = {};

const finalSelection = {
    primaryMood: '',
    secondaryMood: ''
}

let clicks = 0;


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


const audTag = document.getElementsByTagName("audio");
const happyClips = document.getElementsByClassName("happy");
delete happyClips[0];
const sadClips = document.getElementsByClassName("sad");
const number = [1, 2, 3];

console.log(number);
console.log(audTag);
console.log(happyClips);
console.log(sadClips);

moodApp.checkboxValue = function (){
    $('input[type=checkbox]').on('click', function(e){
        if (e.target.className === 'happy') {
            $('.happyMoods').toggleClass('hidden');
        } else if (e.target.className === 'sad'){
            $('.sadMoods').toggleClass('hidden');  
        }

        if ($('.happyMoods').css('display') == 'none' && $('.sadMoods').css('display') == 'none'){
            $('.sad').attr("disabled", false);
            $('.happy').attr("disabled", false);
        }   else if ($('.happyMoods').css('display') == 'none') {
            $('.happy').attr("disabled", true);
            $('.sad').attr("disabled", false);
        } else if ($('.sadMoods').css('display') == 'none'){
            $('.happy').attr("disabled", false);
            $('.sad').attr("disabled", true);
        }


        if (clicks % 2 === 1){
            if(this.checked) {
                audTag[1].currentTime = 0;
                audTag[1].play();
                finalSelection.primaryMood = this.value;             
            } else if (!this.checked) {
                audTag[1].currentTime = 0
                audTag[1].play();
                delete finalSelection.primaryMood;
            }
        } else if (clicks % 2 === 0) {
            if(this.checked) {
                audTag[1].currentTime = 0;
                audTag[1].play();
                finalSelection.secondaryMood = this.value;             
            } else if (!this.checked) {
                audTag[1].currentTime = 0
                audTag[1].play();
                delete finalSelection.secondaryMood;
            }
        }   else {
            audTag[1].currentTime = 0;
            audTag[1].play();
        }
        clicks++;
    })
}

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

            console.log(randomNumber);
            console.log(finalSelection.secondaryMood);
            
            if (finalSelection.secondaryMood == "happy") {
                happyClips[`${randomNumber}`].currentTime = 0;
                happyClips[`${randomNumber}`].play();
            } else if (finalSelection.secondaryMood == "sad") {
                sadClips[`${randomNumber}`].currentTime = 0;
                sadClips[`${randomNumber}`].play();           
            } else if (finalSelection.primaryMood == "happy") {
                happyClips[`${randomNumber}`].currentTime = 0;
                happyClips[`${randomNumber}`].play();
            } else if (finalSelection.primaryMood == "sad") {
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