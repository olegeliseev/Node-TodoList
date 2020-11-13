//При нажатии на кнопку Add значение поля выводится в новый эдемент списка, а само поле обнуляется
$(".add-button").on("click", (e) => {
    let inputVal = $(".input").val().toString();
    if (inputVal.length !== 0) {
        $(".list").append(`<li class="list-element"><span>${inputVal}</span> <button class="delete-button">X</button></li>`);
        $(".input").val("");
        e.preventDefault();
    } else {
        e.preventDefault();
        return;
    }   
});


//При нажатии на X элемент удаляется из списка
$(".list").on('click', '.delete-button', function() {
    $(this).parent().remove();
});

//Вычеркивает элемент при нажатии на него
$(".list").on('click', '.content', function() {
    $(this).toggleClass("crossed");
});