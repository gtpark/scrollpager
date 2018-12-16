import $ from "jquery"

export default function(containerSelector) { 
    const STATUS = {
        "WAITING": 0,
        "RUNNING": 1
    };

    const $container = $(containerSelector);
    let status = STATUS.WAITING;
    let currentPage = 0;

    if (!$container.length) throw `not found ${containerSelector} element`;
    if ($container.lengh >= 2) throw `not unique element '${containerSelector}'`;

    $(window).on("resize", () => { 
        slideContainer($container, currentPage, 500);
    });

    $container.on("mousewheel", (event) => { 
        go(currentPage + (event.originalEvent.wheelDelta < 0 ? 1 : -1));
    });

    return {
        go
    };

    function go(page) {
        const maxPages = $container.children().length;
        if (page >= maxPages || page < 0) return;
        if (status != STATUS.WAITING) return;   // skip

        status = STATUS.RUNNING;
        currentPage = page;

        slideContainer($container, page)
            .on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                slideContainer($container, page, 0);
                status = STATUS.WAITING;
            });
    }
    function slideContainer($container, page, msTransitionTime = 1000) { 
        const pxHeight = -$container.height() * page;
        return $container
            .css("transform", `translate3d(0px, ${pxHeight}px, 0px)`)
            .css("transition", `all ${msTransitionTime}ms ease 0s`)
    }
};

