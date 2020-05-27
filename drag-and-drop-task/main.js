function dragOver(container ,e ){
    e.preventDefault();    
}

function dragEnter(list , e){
    e.preventDefault();
    list.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    // console.log("dragEnter" , this); 
}

function dragLeave(list , e){
    e.preventDefault();
    list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
} 

function drop(list , item , e) {
    // console.log("drop" , item) ;
    // list.append(item);
    list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

    const afterElement = getDragAfterElement(list , e.clientY) ;
    console.log("afterElement == ",  afterElement) ;
    const draggable = document.querySelector('.dragging');
    console.log("draggable ---------> " , draggable) ;
    if (afterElement == null) {
        list.appendChild(draggable)
    } else {
        list.insertBefore(draggable, afterElement)
    }

    // console.log("list" , this);
}

function dragEnd(item , e){
    setTimeout(function(){
        item.style.display ="flex";
        item.classList.remove('dragging');
        item = null ;
    }, 0) ;
}

function getDragAfterElement(container , y ) {
    console.log("getDragAfterElement y=  " , y)
    const draggableElements = [...container.querySelectorAll(".list-item:not(.dragging)")]  ;
    console.log("container",container ,"draggableElements" , draggableElements ) ;

    return draggableElements.reduce((closest, child) => {
        console.log("closest   ----  child" , closest, child);
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
          return closest
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element
}



const lists =document.querySelectorAll(".list");
const list_items = document.querySelectorAll('.list-item');


let draggedItem = null ;

for(let i = 0 ; i < list_items.length ; i++){
    
    const item  = list_items[i] ;
    // console.log("item chargement " , item);
    item.addEventListener("dragstart" , function(e){
        draggedItem = item ;
        draggedItem.classList.add('dragging');
        setTimeout(function(){
            item.style.display ="none" ;
        }, 0);
    });

    item.addEventListener("dragend" ,  function(e){
        dragEnd(draggedItem , e) ;
    });

    for(let j = 0 ; j< lists.length ; j++){
        const list = lists[j] ;
        // console.log("list" , list);
        
        list.addEventListener("dragover" , function(e){
            dragOver(list , e) ;
        });

        list.addEventListener("dragenter" , function(e){
            dragEnter(list ,e);
        });

        list.addEventListener("dragleave" , function(e){
            dragLeave(list ,e);
        });

        list.addEventListener("drop" ,  function(e){
            drop(list , draggedItem ,e);
        });

    }
}


const items = document.querySelectorAll(".item");

items.forEach((item ,currentValue, currentIndex, listObj)=>{

    // console.log(item , listObj , currentValue) ;
    const subject = item.getElementsByClassName('item-subject-text')
    const subject_icon_show = item.getElementsByClassName('item-subject-icon-show');
    const subject_action_edit = item.getElementsByClassName('item-subject-edit');
    
    const content = item.getElementsByClassName('item-content') ;

    subject[0].addEventListener("click" ,function(e){
        subject_icon_show[0].classList.toggle("open") ;
        content[0].classList.toggle("open__content");
        console.log('click') ;
    });

    subject_action_edit[0].addEventListener("click" , function(e){
        console.log("subject_action_edit") ;
    });

});
