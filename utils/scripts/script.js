function sharePage() {
    if (window.location) {
        var page_url = window.location.href;
    }
    var page_title = document.title;

    //https://www.geeksforgeeks.org/how-to-use-web-share-api-for-native-share-options-in-html-javascript/
    //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#syntax

    if (navigator.share) {
        navigator.share({
            title: page_title,
            url: page_url
        }).catch(err => {
            console.log(
                "Error while using Web share API:");
            console.log(err);
        });
    } else {
        navigator.clipboard.writeText(page_url);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("mobile-open-menu").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    });

    document.querySelector("#close").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    });

    var share_btns = document.querySelectorAll(".share");
    share_btns.forEach(share_btn => {
        share_btn.addEventListener("click", (e) => {
            sharePage();
        })
    });

    var selectors = document.querySelectorAll(".recipe-type");
    selectors.forEach(selector => {
        selector.addEventListener('click', (e) => {
            if (selector.classList.contains("selected")) {
                document.querySelector(".selected").classList.toggle("selected")
                document.querySelector("#all").classList.toggle("selected")

                var cards = document.querySelectorAll(".recipes-list .recipe-card");
                if (cards.length === 0) {
                    var empty_message = document.querySelector("#empty")
                    if (!empty_message.classList.contains("visible")) {
                        empty_message.classList.toggle("visible")
                    }
                } else {
                    cards.forEach(card => {
                        card.style.display = "flex";
                    })
                }
            }
            else {
                document.querySelector(".selected").classList.toggle("selected");

                var target_id = e.currentTarget.id;
                document.querySelector(`#${target_id}`).classList.toggle("selected");

                var cards_category = document.querySelectorAll(`.${target_id}`);
                if (cards_category.length === 0) {
                    var empty_message = document.querySelector("#empty")
                    if (!empty_message.classList.contains("visible")) {
                        empty_message.classList.toggle("visible")
                    }
                }

                var cards = document.querySelectorAll(".recipes-list .recipe-card");

                cards.forEach(card => {
                    if (card.classList.contains(`${target_id}`)) {
                        card.style.display = "flex";
                    }
                    else {
                        card.style.display = "none";
                    }
                })


            }

        })
    });

});
