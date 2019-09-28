{ 
    const modalBtn = document.querySelector('.abrir-modal');
    const modal = document.querySelector('.modal');

    modalBtn.addEventListener('click', (e => {
        e.preventDefault();
        if(modal.classList.contains('active')){
            modal.classList.remove('active');
            modalBtn.innerText = 'Abrir Modal';
        } else {
            modal.classList.add('active');
            modalBtn.innerText = 'Fechar Modal';
        }
    }));
}