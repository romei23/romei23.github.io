function showDish(dishName, description, imgElement) {
    const allImages = document.querySelectorAll('.dishes img');
    const existingDescription = imgElement.nextElementSibling;

    if (imgElement.classList.contains('active')) {
        imgElement.classList.remove('active');
        if (existingDescription && existingDescription.classList.contains('dish-description')) {
            existingDescription.remove();
        }
    } else {
        allImages.forEach(img => {
            img.classList.remove('active');
            const desc = img.nextElementSibling;
            if (desc && desc.classList.contains('dish-description')) {
                desc.remove();
            }
        });
        imgElement.classList.add('active');
        const dishDescription = document.createElement('div');
        dishDescription.classList.add('dish-description');
        dishDescription.innerHTML = `
          <h3>${dishName}</h3>
          <p>${description}</p>
        `;
        imgElement.insertAdjacentElement('afterend', dishDescription);
    }
}
  
window.onload = function() {
    const images = document.querySelectorAll('.dishes img');
    images.forEach(img => {
      img.addEventListener('click', function() {
        const dishName = img.getAttribute('alt');
        const description = img.getAttribute('data-description') || 'Delicious food available here.';
        showDish(dishName, description, img);
      });
    });
}