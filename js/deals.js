$(document).ready(function() {
 $('select').material_select();


 $("#searchBtn").click(function (e) {


  $("#dealsRow").empty();
  $("#couponsRow").empty();

  e.preventDefault();

  $('html, body').animate({
      scrollTop: $("#dealsRow").offset().top
    }, 1800);

  var userLocation = $(".userLocation").val().trim();
  var userCategory = $("#inputfield").val();
  var radius = $("#radius").val();
  var perPage;

  var sqootDealAPI = "https://api.sqoot.com/v2/deals?api_key=fflt53&location=";
  sqootDealAPI += userLocation;
  sqootDealAPI += "&category_slugs=";
  sqootDealAPI += userCategory;
  sqootDealAPI += "&radius=";
  sqootDealAPI += radius;



  var sqootCouponAPI = "https://api.sqoot.com/v2/coupons?api_key=fflt53&location=";
  sqootCouponAPI += userLocation;
  sqootCouponAPI += "&category_slugs=";
  sqootCouponAPI += userCategory;
  sqootCouponAPI += "&radius=";
  sqootCouponAPI += radius;


  

  $.getJSON(sqootDealAPI, {
   action: "query",
   list: "search",
   format: "json"
  }, 

  function (data) {

   $.each(data.deals, function buildDealThumbnail (i, item) {

    var dealId = data.deals[i].deal.id;
    var categoryName = $("<h3>").append(data.deals[i].deal.category_name).append(" Deal");
    var dealTitle = $("<p>").append(data.deals[i].deal.title);
    var merchantName = $("<p>").html("Provided by ").append(data.deals[i].deal.merchant.name);
    var merchantLocality = $("<p>").html("City: ").append(data.deals[i].deal.merchant.locality);
    var merchantRegion = $("<p>").html("State: ").append(data.deals[i].deal.merchant.region);
    var dealImage =$("<img>").addClass("activator").attr("src", data.deals[i].deal.image_url);

    var dealExpire = $("<p>").html("Expiration: ").append(data.deals[i].deal.expires_at);
    var dealPrice = $("<p>").html("Price: $").append(data.deals[i].deal.price);
    var dealDescription = $("<p>").append(data.deals[i].deal.short_title);
    var dealUrl = $("<a>").attr("href", data.deals[i].deal.untracked_url).html("Check it out at " + data.deals[i].deal.provider_name);

    var cardDiv = $("<div>").addClass("card");
    var cardImage = $("<div>").addClass("card-image waves-effect waves-block waves-light");
    var cardContent = $("<div>").addClass("card-content light-blue lighten-4");
    var cardTitle = $("<span>").addClass("card-title activator grey-text text-darken-4").html(dealTitle);
    var cardReveal = $("<div>").addClass("card-reveal light-blue lighten-4");
    var cardInfoReveal = $("<span>").addClass("card-title grey-text text-darken-4");
    var closeIcon = $("<i>").addClass("material-icons right").html("close");


    $("#dealsRow").append(cardDiv
     .append(cardImage
      .append(dealImage)
      )
     .append(cardContent
      .append(cardTitle)
      )
     .append(cardReveal
      .append(cardInfoReveal
       .append(dealDescription)
       .append(closeIcon)
       .append(merchantName)
       .append(merchantLocality)
       .append(merchantRegion)
       .append(dealPrice)
       .append(dealUrl)
       )
      
      )
     );


   });
});   



$.getJSON(sqootCouponAPI, {
 action: "query",
 list: "search",
 format: "json"
}, 

function (data) {


 $.each(data.coupons, function buildCouponThumbnail (i, item) {

  var couponId = data.coupons[i].coupon.id;
  var categoryName = $("<h3>").append(data.coupons[i].coupon.category_name).append(" Coupon");
  var couponTitle = $("<p>").append(data.coupons[i].coupon.title);
  var merchantName = $("<p>").html("Provided by ").append(data.coupons[i].coupon.merchants[0].merchant.name);
  var merchantLocality = $("<p>").html("City: ").append(data.coupons[i].coupon.merchants[0].merchant.locality);
  var merchantRegion = $("<p>").html("State: ").append(data.coupons[i].coupon.merchants[0].merchant.region);
  var couponImage = $("<img>").addClass("activator").attr("src", data.coupons[i].coupon.image_url);

  var couponExpire = $("<p>").html("Expiration: ").append(data.coupons[i].coupon.expires_at);
  var couponPrice = $("<p>").append(data.coupons[i].coupon.title);
  var couponDescription = $("<p>").append(data.coupons[i].coupon.description);
  var couponUrl = $("<a>").attr("href", data.coupons[i].coupon.untracked_url).html("check it out at " + data.coupons[i].coupon.provider_name);

  var cardDiv = $("<div>").addClass("card");
  var cardImage = $("<div>").addClass("card-image waves-effect waves-block waves-light");
  var cardContent = $("<div>").addClass("card-content yellow lighten-3");
  var cardTitle = $("<span>").addClass("card-title activator grey-text text-darken-4").html(couponTitle);
  var cardReveal = $("<div>").addClass("card-reveal yellow lighten-3");
  var cardInfoReveal = $("<span>").addClass("card-title grey-text text-darken-4");
  var closeIcon = $("<i>").addClass("material-icons right").html("close");

  $("#couponsRow").append(cardDiv
   .append(cardImage
    .append(couponImage)
    )
   .append(cardContent
    .append(cardTitle)
    )
   .append(cardReveal
    .append(cardInfoReveal
     .append(couponDescription)
     .append(closeIcon)
     .append(merchantName)
     .append(merchantLocality)
     .append(merchantRegion)
     .append(couponPrice)
     .append(couponUrl)
     )
    
    )
   );

 }); 

}); 

 }); //end button click
});