let card = document.querySelector('.card');

///////////////////////////////////////////
/// *** Custom ContextMenu
///////////////////////////////////////////

let contextmenu = null;
let clickedX = 0;
let clickedY = 0;

card.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    clickedX = e.x;
    clickedY = e.y;

    if (contextmenu != null) {
        contextmenu.remove();
    }

    contextmenu = document.createElement('div');
    contextmenu.className = `absolute top-[${e.y + 5}px] left-[${e.x + 5}px] z-10 bg-gray-800 text-white rounded-md`;
    contextmenu.innerHTML = 
    `<ul>
        <li><button type="button" class="context-add-text px-5 py-3 border-b border-gray-600">Add Text</button></li>
        <li><button type="button" class="px-5 py-3 border-b border-gray-600">Add Image</button></li>
        <li><button type="button" class="px-5 py-3">Add Form</button></li>
    </ul>`;

    document.body.append(contextmenu);

    contextmenu.querySelector('.context-add-text').addEventListener('click', function () {

        let textInput = document.createElement('textarea');
        textInput.className = `absolute top-[${clickedY}px] left-[${clickedX}px] resize-none h-[30px]`;
        textInput.value = "Write Here";
        document.body.append(textInput);

        contextmenu.remove();
        contextmenu = null;
        document.removeEventListener('click', removeContextMenu);


    });

    document.addEventListener('click', removeContextMenu);
});

function removeContextMenu(e) {
    if (e.target != contextmenu && !contextmenu.contains(e.target)) {
        contextmenu.remove();
        contextmenu = null;
        document.removeEventListener('click', removeContextMenu);
    }
}