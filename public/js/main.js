console.log('Client Side js file is loaded!')

// toggle text and arrows from reddit's posts
$(document).on('click', '.expand-text-reddit', function () {
    $(this).closest('.container-reddit').find('.post-text-reddit').toggle();
    $(this).closest('.container-reddit').find('.main-image').toggle();
    if ($(this).hasClass('expand-text-reddit')) {
        $(this).toggleClass('contract-text-reddit')
    }
});

let mainMenuBtn = document.querySelector('.main-menu-btn');
let mainMenu = document.querySelector('.main-menu');

mainMenuBtn.addEventListener('click', addClass)
function addClass() {
    mainMenu.classList.toggle('show')
}

$(function() {
    fetch('/get-tickers').then((tickerOutput) => {
        tickerOutput.text().then((tickerHtml) => {
            $('#prices').html(tickerHtml);
        });
    });
});



//social media drop down
document.getElementById('navbarDropdown').addEventListener('click', toggleMnu)
let socialMediaMenu = document.getElementById('social-media-menu');
function toggleMnu(){
    if(socialMediaMenu.style.display == 'block'){
        socialMediaMenu.style.display = 'none';
    } else {
        socialMediaMenu.style.display = 'block'
    } 
}

var $container = $('.container');
$container.imagesLoaded(function(){
  $container.masonry({
    itemSelector : '.item',
    columnWidth : 340
  });
});