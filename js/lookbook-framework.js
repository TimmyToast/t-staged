var lookbookModule = function() {
    var lookbookCodeCollection = window[$("#jersey-outer-wrap").attr("collection")];
    var moduleVar = {};
    var lookbookFoundNextItem = undefined;
    var lookbookFoundPrevItem = undefined;
    var lookbookPrevPrevItem = undefined;
    var lookbookNextNextItem = undefined;
    var firstLookbookItem = undefined;
    var lastLookbookItem = undefined;
    getDataStr = function() {
        if (lookbookCodeCollection && lookbookCodeCollection.length != 0) {
            for (var i = 0; i < lookbookCodeCollection.length; i++) {
                var idToRender = lookbookCodeCollection[i].lookbookID;
                if (idToRender == currentLookBookID) {
                    lookbookCodeObj = lookbookCodeCollection[i];
                    break
                }
            }
            var dataObj = {
                skuList: []
            };
            if (lookbookCodeObj != null) {
                for (var i = 0; i < lookbookCodeObj.products.length; i++) {
					if(lookbookCodeObj.products[i].prodId) {
						dataObj.skuList.push(lookbookCodeObj.products[i].prodId)
					}
                }
            }
            if (dataObj.skuList.length == 0) {
                return false
            }
            return JSON.stringify(dataObj)
        }
        return false
    };
    getLookbookStockInfo = function(dataObj) {
        $.ajax({
            url: "/services/stockservices.asmx/GetProductVariantStock",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: dataObj,
            dataType: "json",
            success: function(data, status) {
                stockJson = $.parseJSON(data.d);
                rangeModule.setFadedOutRangeImagesBasedOnStock();
                rangeModule.populateRangeSizesBasedOnStock();
                rangeModule.initAddToBasket();
                rangeModule.toggleOpenDescription();
                reviewDisplayModule.callReviews();
                if (typeof wishlistModule.updateAddRemoveWishlistButton != "undefined") {
                    wishlistModule.updateAddRemoveWishlistButton()
                }
            }
        })
    };
    getLookbookProductInfo = function() {
        var dataObj = getDataStr();
        if (dataObj != false) {
            $.ajax({
                url: "/services/stockservices.asmx/GetProductData",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: dataObj,
                dataType: "json",
                success: function(data, status) {
                    productJson = $.parseJSON(data.d);
                    for (var i = 0; i < productJson.products.length; i++) {
                        for (prop in productJson.products[i]) {
                            if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance" && prop != "restricted" && (productJson.products[i][prop][0].price === "0" || productJson.products[i][prop][0].price === null || productJson.products[i][prop][0].price === "0.00" || productJson.products[i][prop][0].price === "undefined")) {
                                productJson.products.splice(i, 1)
                            }
                        }
                    }
                    if (productJson.products.length > 0) {
                        setUpRangeBuyOff();
                        rangeModule.setBaseBuyOffVars();
                        rangeModule.setCurrentObj(false);
                        rangeModule.populateRangeImages();
                        rangeModule.populateRangeBuyOffSection();
                        getLookbookStockInfo(dataObj);
                        $(".panel-wrapper:eq(" + parseInt(currentLookBookID - 1) + ")").prepend("<a href='#' class='shop-button'>SHOP</a>");
                        setTimeout(function() {
                            $(".shop-button").addClass("fade-me-in")
                        }, 250);
                        if (productJson.products.length > 1) {
                            $(".MagicZoomPlus").after("<img src='//toast-images.s3.amazonaws.com/content-images/development/jersey/OurJersey_Right.png' class='jersey-carousel-right' />");
                            $(".MagicZoomPlus").after("<img src='//toast-images.s3.amazonaws.com/content-images/development/jersey/OurJersey_Left.png' class='jersey-carousel-left' />")
                        } else {
                            $(".jersey-carousel-left, .jersey-carousel-right").remove()
                        }
                    }
                }
            })
        }
    };
    lookbookGoLeft = function() {
        $(".shop-button").fadeOut(400, function() {
            $(this).remove()
        });
        if (currentLookBookID == 1) currentLookBookID = lookbookCodeCollection.length;
        else currentLookBookID--;
        setSources(false, false);
        getLookbookProductInfo();
        updateIndexOfLookbook();
        $(".lookbook-loader").removeClass("visuallyHidden")
    };
    lookbookGoRight = function() {
        $(".shop-button").fadeOut(400, function() {
            $(this).remove()
        });
        if (currentLookBookID != lookbookCodeCollection.length) currentLookBookID++;
        else currentLookBookID = 1;
        setSources(false, true);
        getLookbookProductInfo();
        updateIndexOfLookbook();
        $(".lookbook-loader").removeClass("visuallyHidden")
    };
    setSources = function(firstSet, isNext) {
        var foundItem = _.find(lookbookCodeCollection, function(obj) {
            return parseInt(obj.lookbookID) == currentLookBookID
        });
        moduleVar.lookbookFoundItem = foundItem;
        lookbookFoundNextItem = _.find(lookbookCodeCollection, function(obj) {
            return parseInt(obj.lookbookID) == currentLookBookID + 1
        });
        lookbookFoundPrevItem = _.find(lookbookCodeCollection, function(obj) {
            return parseInt(obj.lookbookID) == currentLookBookID - 1
        });
        lookbookNextNextItem = _.find(lookbookCodeCollection, function(obj) {
            return parseInt(obj.lookbookID) == currentLookBookID + 2
        });
        lookbookPrevPrevItem = _.find(lookbookCodeCollection, function(obj) {
            return parseInt(obj.lookbookID) == currentLookBookID - 2
        });
        if (firstSet) {
            firstLookbookItem = _.find(lookbookCodeCollection, function(obj) {
                return parseInt(obj.lookbookID) == 1
            });
            lastLookbookItem = _.find(lookbookCodeCollection, function(obj) {
                return parseInt(obj.lookbookID) == lookbookCodeCollection.length
            });
            if (firstLookbookItem) $($(".liquid-slider div img")[0]).attr("src", firstLookbookItem.imgSrc);
            if (lastLookbookItem) $($(".liquid-slider div img")[lookbookCodeCollection.length - 1]).attr("src", lastLookbookItem.imgSrc);
            if (moduleVar.lookbookFoundItem) $($(".liquid-slider div img")[currentLookBookID - 1]).attr("src", moduleVar.lookbookFoundItem.imgSrc);
            if (lookbookFoundPrevItem) $($(".liquid-slider div img")[currentLookBookID - 2]).attr("src", lookbookFoundPrevItem.imgSrc);
            if (lookbookFoundNextItem) $($(".liquid-slider div img")[currentLookBookID]).attr("src", lookbookFoundNextItem.imgSrc);
            if (lookbookPrevPrevItem) $($(".liquid-slider div img")[currentLookBookID - 3]).attr("src", lookbookPrevPrevItem.imgSrc);
            if (lookbookNextNextItem) $($(".liquid-slider div img")[currentLookBookID + 1]).attr("src", lookbookNextNextItem.imgSrc)
        }
    };
    updateIndexOfLookbook = function() {
        if ($("#imgNames").length < 1) {
            currentLookBookID = currentLookBookID == 0 ? currentLookBookID = 1 : currentLookBookID;
            window.location.hash = currentLookBookID
        }
    };
    initialSetUp = function() {
        $(".jersey-buy-off, .buy-off-container").hide();
        var indexOfHTM = document.location.href.indexOf(".htm");
        var endOfURL = document.location.href.slice(indexOfHTM);
        var backToCatalogueUrl = document.location.href.slice(0, indexOfHTM + 4);
        $(".lookbook-navigations .back-to-catalogue").attr("href", backToCatalogueUrl);
        currentLookBookID = parseInt(endOfURL.slice(endOfURL.indexOf("#") + 1));
        if (_.isNaN(currentLookBookID)) currentLookBookID = 1;
        updateIndexOfLookbook();
        var foundItem = _.find(lookbookCodeCollection, function(obj) {
            return parseInt(obj.lookbookID) == currentLookBookID
        });
        for (var i = 0; i < lookbookCodeCollection.length; i++) {
            var $newImgCont = $('<div><img class="grid-image"></div>');
            $(".liquid-slider").append($newImgCont)
        }
        if (foundItem) {
            setSources(true)
        }
    };
    setUpRangeBuyOff = function() {
        $(".jersey-buy-off .group-images-set-one").html("");
        for (var j = 0; j < window.productJson.products.length; j++) {
            for (prop in window.productJson.products[j]) {
                if (prop != "title" && prop != "description" && prop != "details" && prop != "fitNotes" && prop != "provenance" && prop != "restricted") {
                    var $rangeProductImage = $("<img >");
                    var $outerDiv = $('<li class="range-product" id="' + prop + '"></li>');
                    $(".jersey-buy-off .group-images-set-one").append($outerDiv);
                    $outerDiv.append($rangeProductImage)
                }
            }
        }
        $($(".range-product")[0]).addClass("selected-range-product")
    };

    function setCarouselSize() {
        if ($("#outerWrap").length > 0) {
            var newWidth = $(window).height() * 1.3;
            $("#outerWrap").css("maxWidth", newWidth);
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 || window.navigator.userAgent.indexOf("Trident") !== -1) {
                var pollCount = 0;
                var iePoll = setInterval(function() {
                    if (pollCount < 20) {
                        if ($("#outerWrap").width() > 0) {
                            $(".panel").css("width", $("#slide-panel").css("width"));
                            $(".panel-container").css("width", parseInt($(".panel").length + 1) + "00%");
                            pollCount = 20
                        } else {
                            pollCount++
                        }
                    } else {
                        clearInterval(iePoll)
                    }
                }, 100)
            }
        }
    }
    var resizeCarousel = _.debounce(setCarouselSize, 300);
    $(window).resize(function() {
        if ($("#imgNames").length > 0) {
            if (Modernizr.mq("(max-width: 767px)")) {} else {
                $(".jersey-buy-off, .buy-off-container").hide()
            }
        }
        resizeCarousel()
    });
    $(document).ready(function() {
        resizeCarousel();
        if ($(".social-icons-wrapper").length > 0) {
            $(".facebook-lookbook").click(function(e) {
                e.preventDefault();
                var imageShare = $(".currentPanel img").attr("src").replace(sizeRegex, "/250/");
                var desc = $("head title").text() + "%20page%20" + currentLookBookID + "%20by%20TOAST";
                if (lookbookCodeCollection.length > 0 && lookbookCodeCollection[0].sharingDescription != undefined) {
                    desc = encodeURIComponent(lookbookCodeCollection[0].sharingDescription)
                }
                var title = $("head title").text();
                var faceLink = "http://www.facebook.com/sharer.php?s=100&p[title]=" + title + "&p[summary]=" + desc + "&p[url]=" + document.location.href + "&p[images][0]=http:" + imageShare;
                $(".facebook-lookbook").attr("href", faceLink.replace(/\s/g, "%20").replace("#", "%23"));
                var imgPrettyURL = $(".currentPanel img").attr("src");
                imgPrettyURL = imgPrettyURL.split("lookbook/");
                imgPrettyURL = imgPrettyURL[1];
                _gaq.push(["_trackEvent", "Lookbook Social Sharing", "Click - " + imgPrettyURL, "Facebook"])
            });
            $(".pinterest-lookbook").click(function(e) {
                e.preventDefault();
                var desc = $("head title").text() + "%20page%20" + currentLookBookID + "%20by%20TOAST";
                if (lookbookCodeCollection.length > 0 && lookbookCodeCollection[0].sharingDescription != undefined) {
                    desc = encodeURIComponent(lookbookCodeCollection[0].sharingDescription)
                }
                var imageShare = $(".currentPanel img").attr("src").replace(sizeRegex, "/250/");
                var pinLink = "//pinterest.com/pin/create/button/?url=" + document.location.href + "&media=" + imageShare + "&description=" + desc;
                $(".pinterest-lookbook").attr("href", pinLink.replace(/\s/g, "%20").replace("#", "%23"));
                var imgPrettyURL = $(".currentPanel img").attr("src");
                imgPrettyURL = imgPrettyURL.split("lookbook/");
                imgPrettyURL = imgPrettyURL[1];
                _gaq.push(["_trackEvent", "Lookbook Social Sharing", "Click - " + imgPrettyURL, "Pinterest"])
            });
            $(".twitter-lookbook").click(function(e) {
                e.preventDefault();
                var desc = $("head title").text() + "%20page%20" + currentLookBookID + "%20by%20TOAST";
                if (lookbookCodeCollection.length > 0 && lookbookCodeCollection[0].sharingDescription != undefined) desc = encodeURIComponent(lookbookCodeCollection[0].sharingDescription);
                var twitLink = "//twitter.com/share?url=" + document.location.href + "&text=" + desc;
                $(".twitter-lookbook").attr("href", twitLink.replace(/\s/g, "%20").replace("#", "%23"));
                var imgPrettyURL = $(".currentPanel img").attr("src");
                imgPrettyURL = imgPrettyURL.split("lookbook/");
                imgPrettyURL = imgPrettyURL[1];
                _gaq.push(["_trackEvent", "Lookbook Social Sharing", "Click - " + imgPrettyURL, "Twitter"])
            });
            $(".pinterest-lookbook").popupWindow({
                height: 400,
                width: 800,
                centerBrowser: 1
            });
            $(".facebook-lookbook, .twitter-lookbook").popupWindow({
                height: 350,
                width: 670,
                centerBrowser: 1
            })
        }
        $("#jersey-outer-wrap").css("visibility", "visible").hide().fadeIn(400);
        if ($(".jersey-buy-off").length > 0) {
            $("#jersey-outer-wrap").css("visibility", "visible").hide().fadeIn(400)
        }
        if ($("#imgNames").length > 0) {
            if (lookbookCodeCollection && lookbookCodeCollection.length != 0) {
                for (var i = 0; i < lookbookCodeCollection.length; i++) {
                    var lookbookCodeObj = lookbookCodeCollection[i];
                    var thisClass = "grid-parent mobile-grid-100";
                    if (lookbookCodeObj.orientation == "portrait") {
                        thisClass += " port-" + lookbookCodeObj.percentWidth
                    } else if (lookbookCodeObj.orientation == "landscape") {
                        thisClass += " land-" + lookbookCodeObj.percentWidth
                    } else {
                        thisClass += " square-" + lookbookCodeObj.percentWidth
                    }
                    thisClass += lookbookCodeObj.float == "right" ? " float-right" : "";
                    var $imageDiv = $('<div class="' + thisClass + " grid-" + lookbookCodeObj.percentWidth + " tablet-grid-" + lookbookCodeObj.percentWidth + ' mobile-grid-100 grid-parent"></div>');
                    var dataId = lookbookCodeObj.products.length > 0 ? " data-id='" + lookbookCodeObj.lookbookID + "'" : "";
                    var $anchor = $('<a class="catImagesJQLink"' + dataId + "></a>");
                    if (lookbookCodeObj.products.length > 0) {
                        var $img = $(['<div class="lookbook-tile-content">', '<span class="visual-shop-button">', "Shop", "</span>", '<div class="plus">+</div>', "</div>"].join(""))
                    } else {
                        var $img = $('<div class="lookbook-tile-content"><div class="plus">+</div></div>')
                    }
                    $("#imgNames").append($imageDiv);
                    $img.attr("style", "background-image:url(" + lookbookCodeObj.imgThumbSrc + "); filter: progid:DXImageTransform.Microsoft.AlphaImageLoader( src='" + lookbookCodeObj.imgThumbSrc + "', sizingMethod='scale');");
                    $imageDiv.append($anchor);
                    $anchor.append($img);
                    var currUrl = document.location.href;
                    var resultUrl = currUrl.replace(".htm", "-browse.htm");
                    $anchor.attr("href", resultUrl + "#" + (i + 1));
                    if (lookbookCodeObj.clear) {
                        $imageDiv.after("<div class='clearfix'></div>")
                    }
                }
                if ($("[collection='jerseyAugust2014']").length > 0 || $("[collection='kinfolkSeptember2014']").length > 0) {
                    $("#imgNames > div:eq(0), #imgNames > div:eq(1), #imgNames > div:eq(2)").wrapAll("<div style='position: relative' id='bannerHolder'/>");
                    $("#bannerHolder").prepend($("#banner")).append("<div class='clear'></div>");
                    $("#imgNames").on("click", ".openBanner", function() {
                        $("#banner").fadeIn();
                        $(".openBanner").hide()
                    });
                    $("#imgNames").on("click", "#closeBanner", function(e) {
                        e.stopPropagation();
                        if (Modernizr.mq("(max-width: 767px)")) {
                            $("#banner").hide();
                            $(".openBanner").fadeIn()
                        } else {
                            $("#banner").hide();
                            $(".openBanner").show()
                        }
                    });
                    if ($("[collection='kinfolkSeptember2014']").length > 0) {
                        $("#bannerHolder").prepend($("#secondBanner")).append("<div class='clear'></div>");
                        $("#imgNames").on("click", "#banner", function(e) {
                            if ($(e.target).attr("id") != "closeBanner") {
                                $("#secondBanner").fadeIn();
                                $("#banner").hide()
                            }
                        });
                        $("#imgNames").on("click", "#closeSecondBanner", function() {
                            if (Modernizr.mq("(max-width: 767px)")) {
                                $("#secondBanner").hide();
                                $(".openBanner").fadeIn()
                            } else {
                                $("#secondBanner").hide();
                                $(".openBanner").show()
                            }
                        })
                    }
                }
            }
        }
        if ($(".jersey-buy-off").length > 0) {
            currentLookBookID = 1;
            var lookbookCodeObj = {};
            var foundItem = {};
            initialSetUp();
            getLookbookProductInfo(getDataStr());
            $("#jersey-outer-wrap").on("click", ".panel img", function(e) {
                if ($(".jersey-buy-off").is(":visible")) {
                    $("html, body").animate({
                        scrollTop: $(".jersey-buy-off").offset().top
                    }, 300)
                }
            });
            $("#jersey-outer-wrap").on("click", ".ls-nav-right-arrow", function(e) {
                lookbookGoRight()
            });
            $("#jersey-outer-wrap").on("click", ".right-slider-overlay", function(e) {
                $(".ls-nav-right-arrow").trigger("click")
            });
            $("#jersey-outer-wrap").on("click", ".ls-nav-left-arrow", function(e) {
                lookbookGoLeft()
            });
            $("#jersey-outer-wrap").on("click", ".left-slider-overlay", function(e) {
                $(".ls-nav-left-arrow").trigger("click")
            });
            $("#jersey-outer-wrap").on("click", ".jersey-carousel-left", function() {
                if ($(".selected-range-product").prev(".range-product").length > 0) {
                    $(".selected-range-product").prev(".range-product").trigger("click")
                } else {
                    $(".range-product").last().trigger("click")
                }
            });
            $("#jersey-outer-wrap").on("click", ".jersey-carousel-right", function() {
                if ($(".selected-range-product").next(".range-product").length > 0) {
                    $(".selected-range-product").next(".range-product").trigger("click")
                } else {
                    $(".range-product").first().trigger("click")
                }
            });
            $("#jersey-outer-wrap").on("click", ".panel-wrapper", function(e) {
                e.preventDefault();
                $(".selected-range-product").trigger("click");
                $(".jersey-buy-off, .buy-off-container").show();
                $("html, body").animate({
                    scrollTop: $(".jersey-buy-off").offset().top
                }, 300);
                rangeModule.toggleOpenDescription();
                _gaq.push(["_trackEvent", "Lookbook Shop Button", "Click", $("#jersey-outer-wrap").attr("collection") + " image " + window.location.hash])
            });
            $("#jersey-outer-wrap").on("click", ".jersey-close", function() {
                $(".jersey-buy-off, .buy-off-container").hide();
                if ($("#imgNames").length < 1) {
                    $("html, body").animate({
                        scrollTop: $("#jersey-outer-wrap").offset().top
                    }, 300)
                }
            });
            $(".jersey-buy-off").prepend("<img src='//toast-images.s3.amazonaws.com/content-images/development/jersey/OurJersey_Close.png' class='jersey-close' />")
        }
        if ($(".jersey-buy-off").length > 0) {
            $("#slide-panel").liquidSlider({
                autoHeight: false,
                onload: function() {
                    $($(".panel-container .panel img")[1]).addClass("currentImage");
                    $("#slide-panel .panel").swipe({
                        swipeLeft: function(event, direction, distance, duration, fingerCount) {
                            $(".ls-nav-right-arrow").trigger("click")
                        },
                        swipeRight: function(event, direction, distance, duration, fingerCount) {
                            $(".ls-nav-left-arrow").trigger("click")
                        }
                    });
                    setTimeout(function() {
                        if ($(".lookbook-navigations").length > 0) $("html, body").animate({
                            scrollTop: $(".lookbook-navigations").offset().top - 10
                        }, 0)
                    }, 250)
                },
                callback: function() {
                    if (moduleVar.lookbookFoundItem && ($($(".liquid-slider div img")[currentLookBookID - 1]).attr("src") == undefined || $($(".liquid-slider div img")[currentLookBookID - 1]).attr("src") == "")) $($(".liquid-slider div img")[currentLookBookID - 1]).attr("src", moduleVar.lookbookFoundItem.imgSrc);
                    if (lookbookFoundPrevItem && ($($(".liquid-slider div img")[currentLookBookID - 2]).attr("src") == undefined || $($(".liquid-slider div img")[currentLookBookID - 2]).attr("src") == "")) $($(".liquid-slider div img")[currentLookBookID - 2]).attr("src", lookbookFoundPrevItem.imgSrc);
                    if (lookbookFoundNextItem && ($($(".liquid-slider div img")[currentLookBookID]).attr("src") == undefined || $($(".liquid-slider div img")[currentLookBookID]).attr("src") == "")) $($(".liquid-slider div img")[currentLookBookID]).attr("src", lookbookFoundNextItem.imgSrc);
                    if (lookbookPrevPrevItem && ($($(".liquid-slider div img")[currentLookBookID - 3]).attr("src") == undefined || $($(".liquid-slider div img")[currentLookBookID - 3]).attr("src") == "")) $($(".liquid-slider div img")[currentLookBookID - 3]).attr("src", lookbookPrevPrevItem.imgSrc);
                    if (lookbookNextNextItem && ($($(".liquid-slider div img")[currentLookBookID + 1]).attr("src") == undefined || $($(".liquid-slider div img")[currentLookBookID + 1]).attr("src") == "")) $($(".liquid-slider div img")[currentLookBookID + 1]).attr("src", lookbookNextNextItem.imgSrc);
                    $(".lookbook-loader").addClass("visuallyHidden")
                },
                swipe: false,
                slideEaseDuration: 750,
                heightEaseDuration: 500,
                hoverArrows: false,
                continuous: false,
                useCSSMaxWidth: 1,
                firstPanelToLoad: currentLookBookID
            })
        }
    });
    return moduleVar
}();