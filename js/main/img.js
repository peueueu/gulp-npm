{
    console.log(moment().format());


    const img = document.querySelector('.modal-img');

        img.addEventListener('click', (() => {
            if(img.classList.contains('active')){
                img.classList.remove('active');
            } else { 
                img.classList.add('active');
            }
        }));
}