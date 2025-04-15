const carousels = [
    {
        thumb: "1.jpg",
        channel: "Manuu XO",
        channelImg: "manuuxo.jpg",
        title: "L'inizio SONS OF THE FOREST",
        duration: "10:15",
        views: "46.267",
        time: "50 minuti fa",
    },
    {
        thumb: "2.jpg",
        channel: "CiccioGamer89",
        channelImg: "manuuxo.jpg",
        title: "Brawl Stars REGALA 100 Starr Drops!",
        duration: "11:20",
        views: "63.205",
        time: "2 giorni fa",
    },
    {
        thumb: "3.jpg",
        channel: "Surry Was Taken",
        channelImg: "manuuxo.jpg",
        title: "Ho venduto la mia prima casa - House Flipper 2",
        duration: "29:09",
        views: "34,445",
        time: "7 ore fa",
    },
    {
        thumb: "4.jpg",
        channel: "theShow",
        channelImg: "manuuxo.jpg",
        title: "Da Milano a Palermo in bici - [Si Può Fare?]",
        duration: "34:12",
        views: "225,284",
        time: "3 giorni fa",
    },
       {
        thumb: "thumbnail ciccio.jpg",
        channel: "CiccioGamer89",
        channelImg: "manuuxo.jpg",
        title: "Proviamo il nuovo CACCASPIKE",
        duration: "26:47",
        views: "10,723",
        time: "1 ora fa",
    },
];

const works = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "https://i.imgur.com/iVjxCeO.mp4", "https://imgur.com/tRBio74", "https://imgur.com/dWYIGm2", "https://i.imgur.com/trz4wA5.jpg", "https://i.imgur.com/vIIdx2z.jpg", "https://imgur.com/5Rwqkcf", "https://imgur.com/undefined", "https://imgur.com/rg52hzf", "poster escher.jpg"];

async function LoadCarouselImage(i) {
    return new Promise((resolve) => {
        const imageUrl = `./imgs/${carousels[i].thumb}`;
        $(".youtube-carousel-thumb img")
            .stop(true, true)
            .on("load", function () {
                resolve(true);
            })
            .on("error", () => resolve(false))
            .attr("src", imageUrl);
    });
}

async function UpdateCarousel(i) {
    if (!carousels[i]) i = 0;

    $(".youtube-carousel").stop(true, true).css("filter", "blur(5px)");
    $(".youtube-carousel-watchTime").stop(true, true).css("width", "0%");
    await new Promise((resolve) => setTimeout(resolve, 500));
    await LoadCarouselImage(i);

    $(".youtube-carousel-channelImg img").stop(true, true).attr("src", `./imgs/${carousels[i].channelImg}`);
    $(".youtube-carousel-duration h1").stop(true, true).text(carousels[i].duration);
    $(".youtube-carousel-videoTitle h1").stop(true, true).text(carousels[i].title);
    $(".youtube-carousel-channelName h1").stop(true, true).text(carousels[i].channel);
    $(".youtube-carousel-videoViews h1").stop(true, true).text(`${carousels[i].views} visualizzazioni • ${carousels[i].time}`);

    $(".youtube-carousel-watchTime").stop(true, true).animate({ width: "100%" }, 10000);
    $(".youtube-carousel").stop(true, true).css("filter", "blur(0px)");
}

function CarouselAnimation() {
    let index = 0;

    async function loop() {
        await UpdateCarousel(index);
        index++;
        if (index >= carousels.length) index = 0;
    }

    loop();
    setInterval(loop, 10000);
}

$(document).ready(async function () {
    CarouselAnimation();

    $(".works").empty();
    for (let i = 0; i < works.length; i++) {
        $(".works").append(`
        <div>
            ${
                works[i].endsWith("mp4")
                    ? `<video autoplay muted loop src="${works[i].startsWith("http") ? works[i] : `./imgs/${works[i]}`}"></video>`
                    : `<img src="${works[i].startsWith("http") ? works[i] : `./imgs/${works[i]}`}" alt="">`
            }
            
        </div>
        `);
    }

    $(".works div").on("click", function () {
        const url = $(this).children().attr("src");
        $("body").stop(true, true).css("overflow-y", "hidden");
        $(".fullscreen-work img").hide();
        $(".fullscreen-work video").hide();
        $(`.fullscreen-work ${url.endsWith("mp4") ? "video" : "img"}`)
            .stop(true, true)
            .attr("src", url);
        $(`.fullscreen-work ${url.endsWith("mp4") ? "video" : "img"}`).show();
        $(".fullscreen-work").stop(true, true).fadeIn(100);
    });

    $(".fullscreen-work i").on("click", function () {
        $("body").stop(true, true).css("overflow-y", "scroll");
        $(".fullscreen-work").stop(true, true).fadeOut(100);
    });
});

function ScrollTo(element) {
    window.scrollTo({
        top: $(`.${element}`).offset().top,
        behavior: "smooth",
    });
}

function OpenNewPage(URL) {
    window.open(URL, "_blank");
}
