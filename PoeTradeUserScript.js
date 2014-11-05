// ==UserScript==
// @name         Poe.trade pm buttons
// @namespace    
// @version      0.1
// @description  PM buttons
// @author       TomTer
// @match        http://poe.trade/search/*
// @grant        none
// ==/UserScript==

function AddDirectPMButtons() {
	'use strict';
    $('.item').each(function(index) {
        var ignPattern = /IGN: (\w+)\s/i;
        var result = $(this).text().match(ignPattern);
        if (!result) return;
        
        var playerName = result[1].trim();
        var itemName = ($(".title", this).text()).trim();
        var quality = $(".gem-quality", this).text();
        var currency = $(".currency", this).attr("title");
        var itemLvl = $("td[data-name='level']", this).attr("data-value");
        
        var textString = "@" + playerName;
        textString += " Hello! I would like to buy: " + itemName + ".";
        if (quality) {
            textString += " Q: " + quality + "%.";
        }
        if (itemLvl && itemLvl > 0) {
        	textString += " Lvl: " + itemLvl + ".";
        }
        if (currency) {
        	textString += " BO: " + currency + ".";
        }
        
        // Add buttons
        $(".bottom-row", this).find(".requirements").parent()
        	.append("<a id='IngamePMButton'>IngamePM</a>");
		$("#IngamePMButton", this).prepend("<div hidden id='IngamePMText'/>");
        $("#IngamePMText", this).text(textString);
    });
}

$(document).on("click", "#IngamePMButton", function() {
	var textForIngamePaste = $(this).find("#IngamePMText").text();
    prompt("Copy to paste in game", textForIngamePaste);
});

$(document).ready(function() {
    $(document).off("click", ".sortable");
    
    // Script implemented by poe.trade
    $(document).on("click", ".sortable", function () {
        $(this).mouseout();
        window.scrollTo(0, 0);
        $(".loader").html('<span>Loading</span><span class="l-1"></span><span class="l-2"></span><span class="l-3"></span><span class="l-4"></span><span class="l-5"></span><span class="l-6"></span>');
        var prop = $(this).data("name");
        $.post(document.URL, {sort: prop, bare: true}, function (data) {
            $(".loader").html("");
            var arr = data.split("<!--~split~-->");
            for (var i = 0; i < arr.length; ++i)
                $("#search-results-" + i).replaceWith(arr[i]);
            AddDirectPMButtons(); // This is only my addition
        });
    });
    
    AddDirectPMButtons();
    
});


