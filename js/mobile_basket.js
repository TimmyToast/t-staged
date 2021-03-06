var legacyBasketModule = function() {
    var moduleVar = {};
    $(document).ready(function() {
        $("#mainContent").addClass("grid-container grid-parent");
        $("#inner").addClass("legacy-max mobile-grid-100 tablet-grid-100");
        $("br").not("#addressHolder br, #addressHolderSplit br").remove();
        $(".promobutton").text("Apply Code");
        $("tr.basketTableHeader th:last-child").hide();
        $("#basketTable").html(function() {
            return $(this).html().replace(/<\/?strong>/g, "")
        });
        var mainHeaderVal = $("#mainHeader").text();
        $("#mainHeader").wrap('<nav id="breadcrumb" class="hide-on-tablet hide-on-mobile grid-100 grid-parent">').wrap("<ul>").wrap("<li>");
        $("#mainHeader").parent().parent().prepend('<li class="breadcrumb">' + mainHeaderVal + "</li>").prepend('<li class="breadcrumb"><a href="/">HOME</a></li>');
        $("#mainHeader").parent().remove();
        $currentStatusBarAnchors = $(".statusBarCurrent a");
        $(".statusBarCurrent").html($currentStatusBarAnchors);
        $tableRowList = $("#basketTableMain tbody tr");
        for (var j = 0; j < $tableRowList.length; j++) {
            var $tableRow = $($tableRowList[j]);
            var $tDivList = $tableRow.find("td");
            var $removeBtn = $($($tDivList[6]).find("input"));
            $removeBtn.attr("src", "//d1kh76s6bjh8ww.cloudfront.net/img/Close_60px.png").css({
                width: "20px",
                height: "20px"
            })
        }
        $("#promoCode").html($("<p><span>IF YOU HAVE A PROMOTIONAL CODE</span><span>PLEASE ENTER IT HERE</span></p>"));
        buildBasketRecommendations = function() {
            var basketRec = $(".basket-recommendations-container");
            $("#inner").append('<div class="grid-50 tablet-grid-100 mobile-grid-100 basket-recommendations-container group-images"></div>');
            $(".basket-recommendations-container").html('<span class="basket-recommendations-label">Others Like:</span><div></div><div></div><div></div>');
            $(".basket-recommendations-container div").addClass("grid-33 tablet-grid-33 mobile-grid-33 basket-recommendations range-product");
            $($(".basket-recommendations-container div")[0]).addClass("selected-range-product").attr("id", basketitem1[0]).html('<img class="grid-image"><span class="basket-recommendation-title">' + basketitem1[2] + '</span><span class="basket-recommendation-price">' + basketitem1[3] + "</span>");
            $($(".basket-recommendations-container div")[1]).attr("id", basketitem2[0]).html('<img class="grid-image"><span class="basket-recommendation-title">' + basketitem2[2] + '</span><span class="basket-recommendation-price">' + basketitem2[3] + "</span>");
            $($(".basket-recommendations-container div")[2]).attr("id", basketitem3[0]).html('<img class="grid-image"><span class="basket-recommendation-title">' + basketitem3[2] + '</span><span class="basket-recommendation-price">' + basketitem3[3] + "</span>");
            if (basketitem1[3] != basketitem1[4]) {
                $($(".basket-recommendations-container div")[0]).append('<span class="basket-recommendation-sale-price">' + basketitem1[4] + "</span>").find(".basket-recommendation-price").addClass("price-strike-through")
            }
            if (basketitem2[3] != basketitem2[4]) {
                $($(".basket-recommendations-container div")[1]).append('<span class="basket-recommendation-sale-price">' + basketitem2[4] + "</span>").find(".basket-recommendation-price").addClass("price-strike-through")
            }
            if (basketitem3[3] != basketitem3[4]) {
                $($(".basket-recommendations-container div")[2]).append('<span class="basket-recommendation-sale-price">' + basketitem3[4] + "</span>").find(".basket-recommendation-price").addClass("price-strike-through")
            }
            $("#inner").append(getRangeBuyOffTemplate())
        };
        onMobileSelectChange = function(select) {
            setTimeout(function() {
                var selectId = $(select).attr("id");
                var thisAssociatedSelect = selectId.replace("_mobile", "");
                $("#basketTableMain #" + thisAssociatedSelect).val($(select).val());
                $("#basketTableMain #" + thisAssociatedSelect).trigger("change")
            }, 0)
        };
        reskinBasketTable = function() {
            if ($(".mobile-product-list").length == 0) {
                var $trList = $("#basketTableMain tbody tr");
                var $newList = $('<ul class="mobile-product-list"></ul>');
                for (var i = 0; i < $trList.length; i++) {
                    var $tr = $($trList[i]);
                    var $tdList = $tr.find("td").clone(true);
                    var $prodImage = $($tdList[0]);
                    var $desc = $($tdList[1]);
                    var $size = $($tdList[2]);
                    var $price = $($tdList[3]);
                    var $select = $($tdList[4]).find("select").clone();
                    var $subTotal = $($tdList[5]);
                    var $remove = $($tdList[6]);
                    var $item = $('<li class="item clearfix"></li>');
                    var $imageDiv = $("<div class='prod-img col grid_3 alpha'></div>");
                    $imageDiv.append($prodImage.find("a"));
                    $item.append($imageDiv);
                    var $contentDiv = $("<div class='content'></div>");
                    var $prodInfo = $("<div class='prod-info col grid_5'></div>");
                    $prodInfo.append($contentDiv);
                    $item.append($prodInfo);
                    $contentDiv.append($desc.find("a")[0]);
                    $contentDiv.append($("<div class='description'>" + $desc.find("#colour").html() + "," + $size.html() + "</div>"));
                    $contentDiv.append($("<div class='prod-code'><span class='sku'>" + $desc.find("#Full_productid").html() + "</span></div>"));
                    $contentDiv.append($desc.find("span.stockWarning")[0]);
                    $contentDiv.append($desc.find("span.unavailableWarning")[0]);
                    $contentDiv.append("<br>");
                    $contentDiv.append($remove.html());
                    $contentDiv.append($('<div class="prod-price col grid_2"><p class="content">' + $price.find("strong").text() + "</p></div>"));
                    var $selectQty = $('<div class="prod-quan col grid_3"></div>');
                    var $selectContent = $('<div class="content"></div>');
                    var selectId = $select.attr("id");
                    $select.attr("id", selectId + "_mobile");
                    $select.attr("onchange", "onMobileSelectChange(" + $select.attr("id") + ")");
                    $selectQty.append($selectContent);
                    $contentDiv.append($select);
                    $contentDiv.append($('<div class="prod-sub col grid_3 omega"><span class="show_mobile">Subtotal: </span><span class="content licost">' + $subTotal.text().trim() + "</span></div>"));
                    $newList.append($item[0])
                }
                var $mobileTotal = $('<div class="subtotal-row clearfix"><div class="subtotal-block"><span class="basket-sub-label">TOTAL (excluding delivery):</span> <span id="basket-sub">' + $("#grandTotal").html() + "</span></div></div>");
                $("#basketTable").append($mobileTotal);
                $("#basketTableMain").after($newList);
                $("#basketTableMain").hide();
                $(".totalWrapper").hide();
                $(".promobutton").addClass("lightButtonBasket")
            }
        };
        addBasketToAccordion = function() {
            if ($("#mainContent #inner").hasClass("mobile-basket") == false) {
                $("#mainContent #inner").addClass("mobile-basket");
                $(".main-content").addClass("mobile-container");
                var $totalWrapper = $('<div class="totalWrapper"></div>');
                $totalWrapper.append($("#mainContent #inner #totalText").detach());
                $totalWrapper.append($("#mainContent #inner #grandTotal").detach());
                $("#mainContent #belowBasket").after($totalWrapper[0]);
                $(".promobutton").text("Apply Code");
                $("#promoCode").text("If you have a promotional code please enter it below:")
            }
        };
        if (Modernizr.mq("(max-width: 1024px)")) {
            addBasketToAccordion();
            reskinBasketTable()
        }
        $(".range-product").click(function() {
            $("body, html").animate({
                scrollTop: $(".basket-recommendations-container").offset().top
            }, "250")
        });
        $(window).resize(function() {
            if (Modernizr.mq("(max-width: 1024px)")) {
                addBasketToAccordion();
                reskinBasketTable()
            } else {
                $("#mainContent #inner").removeClass("mobile-basket");
                $("#belowBasket .clear").before($("#mainContent #inner #grandTotal").detach());
                $("#belowBasket .clear").before($("#mainContent #inner #totalText").detach());
                $(".totalWrapper").remove();
                $(".main-content").removeClass("mobile-container");
                $(".mobile-product-list").remove();
                $(".subtotal-row").remove();
                $("#basketTableMain").show();
                $(".totalWrapper").show();
                $(".promobutton").removeClass("lightButtonBasket").text("Apply Code");
                $("#promoCode").html($("<p><span>If you have a promotional code</span><span>please enter it below</span></p>"))
            }
        })
    });
    return moduleVar
}();