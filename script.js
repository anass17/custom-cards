let card = document.querySelector('.card');

///////////////////////////////////////////
/// *** Custom ContextMenu
///////////////////////////////////////////

let contextmenu = null;
let clickedX = 0;
let clickedY = 0;
let selectedElement = null;
let elementsCounter = 0;

card.addEventListener('contextmenu', function (e) {
    console.log(e);
    e.preventDefault();

    clickedX = e.offsetX;
    clickedY = e.offsetY;

    if (contextmenu != null) {
        contextmenu.remove();
    }

    contextmenu = document.createElement('div');
    contextmenu.className = `absolute top-[${e.offsetY + 5}px] left-[${e.offsetX + 5}px] z-10 bg-gray-800 text-white rounded-md`;
    contextmenu.innerHTML = 
    `<ul>
        <li><button type="button" class="context-add-text px-5 py-3 border-b border-gray-600">Add Text</button></li>
        <li><button type="button" class="context-add-image px-5 py-3 border-b border-gray-600">Add Image</button></li>
        <li><button type="button" class="px-5 py-3">Add Form</button></li>
    </ul>`;

    card.append(contextmenu);

    contextmenu.querySelector('.context-add-text').addEventListener('click', function () {

        let textInput = document.createElement('textarea');
        textInput.className = `absolute top-[${clickedY}px] left-[${clickedX}px] resize-none h-[30px] bg-transparent select-none`;
        textInput.dataset.color = "000000";
        textInput.dataset.background = "transparent";
        textInput.placeholder = "Write Here";
        card.append(textInput);

        contextmenu.remove();
        contextmenu = null;
        document.removeEventListener('click', removeContextMenu);

        textInput.addEventListener('mousedown', function () {
            selectedElement = this;
            e.preventDefault();
            card.addEventListener('mousemove', moveElements);
        });

        
        elementsCounter++;

    });

    contextmenu.querySelector('.context-add-image').addEventListener('click', function () {

        let inputElement = document.createElement('div');
        inputElement.className = `absolute top-[${clickedY}px] left-[${clickedX}px]`;
        inputElement.innerHTML = 
        `<label for="image-${elementsCounter}" class="bg-gray-200 border border-gray-300 w-[80px] h-[80px] flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 fill-gray-600" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
        </label>
        <input type="file" id="image-${elementsCounter}" class="hidden">`;
        // textInput.dataset.color = "000000";
        // textInput.dataset.background = "transparent";
        // textInput.placeholder = "Write Here";
        card.append(inputElement);

        inputElement.querySelector('input').addEventListener('change', function(event) {
            const file = event.target.files[0];

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    let imagePreview = document.createElement('img');
                    imagePreview.src = e.target.result;
                    imagePreview.style.width = "100px";

                    inputElement.innerHTML = "";
                    inputElement.append(imagePreview);
                };
        
                reader.readAsDataURL(file);
            }
        });

        contextmenu.remove();
        contextmenu = null;
        document.removeEventListener('click', removeContextMenu);

        inputElement.addEventListener('mousedown', function () {
            selectedElement = this;
            e.preventDefault();
            card.addEventListener('mousemove', moveElements);
        });

        inputElement.addEventListener('drag', function (e) {
            e.preventDefault();
        })

        inputElement.addEventListener('dragstart', function (e) {
            e.preventDefault();
        })
        
        elementsCounter++;

    });

    document.addEventListener('click', removeContextMenu);
});

card.addEventListener('mouseup', function () {
    card.removeEventListener('mousemove', moveElements);
});

// Remove the context menu

function removeContextMenu(e) {
    if (e.target != contextmenu && !contextmenu.contains(e.target)) {
        contextmenu.remove();
        contextmenu = null;
        document.removeEventListener('click', removeContextMenu);
    }
}

// Move cards Elements: Text or Images

function moveElements(e) {
    // selectedElement.setAttribute('disabled', '');
    e.preventDefault();
    selectedElement.style.left = e.offsetX + 5 + "px";
    selectedElement.style.top = e.offsetY + 5 + "px";
}