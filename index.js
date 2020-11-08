$(".container__button").on("click", (e) => {
    let inputVal = $(".container__input").val();
    $(".container__list").append(`<li>${inputVal}</li>`);
    $(".container__input").val("");
    e.preventDefault();
});
