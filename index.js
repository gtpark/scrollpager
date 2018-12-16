import $ from "jquery"
import ScrollPager from "./scrollpager"

$(() => { 
    const spContainer = ScrollPager("#sp-container");

    spContainer.go(1);
})


