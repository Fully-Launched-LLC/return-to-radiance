(function(){
  "use strict";

  /* ---------------- SHOP PRODUCTS ----------------
     Single source for the /shop grid. Cards currently link to Etsy.
     shopifyId is reserved for the Shopify switch (see CLAUDE.md). */
  var PRODUCTS = [
    {name:"I Am Radiant Crown Tee — Blush Pink", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/fad2bb/7443072962/il_570xN.7443072962_d4xr.jpg", url:"https://www.etsy.com/listing/4412530838/i-am-radiant-crown-tee-soft-blush-pink", shopifyId:null},
    {name:"I Am Love Affirmation Sweatshirt", price:"$55.00", image:"https://i.etsystatic.com/60793845/r/il/eb5bfa/7512202461/il_570xN.7512202461_eyyc.jpg", url:"https://www.etsy.com/listing/4416209863/i-am-love-affirmation-sweatshirt-return", shopifyId:null},
    {name:"I Am Radiant Sweatshirt", price:"$55.00", image:"https://i.etsystatic.com/60793845/r/il/aa0ed3/7518489319/il_570xN.7518489319_i004.jpg", url:"https://www.etsy.com/listing/4417361928/i-am-radiant-sweatshirt-cozy-affirmation", shopifyId:null},
    {name:"I Am Breath Crop Top", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/cf5d4a/7582356806/il_570xN.7582356806_7npd.jpg", url:"https://www.etsy.com/listing/4438019074/i-am-breath-crop-top-nervous-system", shopifyId:null},
    {name:"I Am Light Tee — White & Gold", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/99894e/7604892314/il_570xN.7604892314_k1m5.jpg", url:"https://www.etsy.com/listing/4441573137/i-am-light-tee-shirt-white-and-gold", shopifyId:null},
    {name:"I Am Radiant Crop Top", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/4e8fb2/7575274158/il_570xN.7575274158_msa8.jpg", url:"https://www.etsy.com/listing/4436888098/i-am-radiant-crop-top-crown-affirmation", shopifyId:null},
    {name:"I Am Stillness Crop Top", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/35d852/7619692763/il_570xN.7619692763_ibta.jpg", url:"https://www.etsy.com/listing/4436295253/i-am-stillness-mindful-affirmation-crop", shopifyId:null},
    {name:"I Am Divine Crop Top", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/3ba7b0/7562204840/il_570xN.7562204840_699x.jpg", url:"https://www.etsy.com/listing/4434710005/i-am-divine-crop-top-black-blue", shopifyId:null},
    {name:"I Am Radiant Crown Tee — Black", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/3dc1e6/7549683290/il_570xN.7549683290_g5mj.jpg", url:"https://www.etsy.com/listing/4432486705/i-am-radiant-crown-tee-soft-black-shirt", shopifyId:null},
    {name:"Radiant Empress — Original Painting", price:"$888.00", image:"https://i.etsystatic.com/60793845/r/il/95c99b/7176569901/il_570xN.7176569901_gaj3.jpg", url:"https://www.etsy.com/listing/4356030828/radiant-empress-36x36", shopifyId:null},
    {name:"Echoes of Light — Original Painting", price:"$1,111.11", image:"https://i.etsystatic.com/60793845/r/il/67f380/7171689981/il_570xN.7171689981_34os.jpg", url:"https://www.etsy.com/listing/4355050550/echos-of-light-original-abstract", shopifyId:null},
    {name:"Glow & Flow Ritual Kit", price:"$48.00", image:"https://i.etsystatic.com/60793845/r/il/de4ef3/7825106287/il_570xN.7825106287_c4mt.jpg", url:"https://www.etsy.com/listing/4467655166/glow-flow-ritual-kit-essential-oil-body", shopifyId:null},
    {name:"“I AM” Crown Mug", price:"$34.65", image:"https://i.etsystatic.com/60793845/r/il/a61310/8078245883/il_570xN.8078245883_k6pa.jpg", url:"https://www.etsy.com/listing/4506737679/10oz-insulated-coffee-mug-i-am-crown", shopifyId:null},
    {name:"I Am Radiant — Affirmation Scroll", price:"$5.55", image:"https://i.etsystatic.com/60793845/r/il/e52626/7701106717/il_570xN.7701106717_cct2.jpg", url:"https://www.etsy.com/listing/4448998411/i-am-radiant-printable-affirmation", shopifyId:null},
    {name:"I Am Light — Affirmation Scroll", price:"$5.55", image:"https://i.etsystatic.com/60793845/r/il/5cba7a/7701091807/il_570xN.7701091807_lwy5.jpg", url:"https://www.etsy.com/listing/4448991813/i-am-light-printable-digital-affirmation", shopifyId:null},
    {name:"I Am Love Heavyweight Tee", price:"$33.00", image:"https://i.etsystatic.com/60793845/r/il/c1d270/7530300620/il_570xN.7530300620_22oa.jpg", url:"https://www.etsy.com/listing/4428691256/i-am-love-heavyweight-tee-self-love", shopifyId:null}
  ];

  var dbPromise = (function(){
    try{
      if (window.claude && window.claude.use) return window.claude.use("db");
    }catch(e){}
    return Promise.resolve(null);
  })();

  var prefersReducedMotion = (function(){
    try{ return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; }
  })();

  /* ---- scroll-triggered reveals ---- */
  var revealObserver = ("IntersectionObserver" in window) ? new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      if(entries[i].isIntersecting){
        entries[i].target.classList.add("in-view");
        revealObserver.unobserve(entries[i].target);
      }
    }
  }, {threshold:0.12, rootMargin:"0px 0px -8% 0px"}) : null;
  function initReveals(){
    var els = document.querySelectorAll(".reveal");
    for(var i=0;i<els.length;i++){
      if(prefersReducedMotion || !revealObserver){ els[i].classList.add("in-view"); }
      else { revealObserver.observe(els[i]); }
    }
  }

  /* ---------------- COACHING: application form ---------------- */
  function wireApplyForm(){
    var form = document.getElementById("apply-form-el");
    if(!form) return;
    form.addEventListener("submit", async function(e){
      e.preventDefault();
      var status = document.getElementById("apply-status");
      var btn = form.querySelector("button[type=submit]");
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        instagram: form.instagram.value.trim(),
        change_area: form.change_area.value.trim(),
        ready_reason: form.ready_reason.value.trim(),
        commit: form.commit.value,
        createdAt: new Date().toISOString()
      };
      if(!data.name || !data.email || !data.change_area || !data.ready_reason || !data.commit){
        status.textContent = "Please fill in every field before submitting.";
        status.className = "form-status err";
        return;
      }
      btn.disabled = true;
      btn.textContent = "Submitting…";
      try{
        var db = await dbPromise;
        if(db){
          await db.collection("applications").add(data);
        }
        document.getElementById("apply-form-wrap").innerHTML =
          '<div class="success"><h3>Application Received</h3><p>Thank you, '+escapeHtml(data.name.split(" ")[0]||"there")+'. I read every application personally &mdash; if it&rsquo;s a fit, you&rsquo;ll hear from me about a discovery call soon.</p></div>';
      }catch(err){
        btn.disabled = false;
        btn.textContent = "Submit Application";
        status.textContent = "Something went wrong saving your application. Please try again.";
        status.className = "form-status err";
      }
    });
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  /* ---------------- CONNECT: newsletter form ---------------- */
  function wireConnectForm(){
    var form = document.getElementById("connect-form-el");
    if(!form) return;
    form.addEventListener("submit", async function(e){
      e.preventDefault();
      var status = document.getElementById("connect-status");
      var btn = form.querySelector("button[type=submit]");
      var data = { name: form.name.value.trim(), email: form.email.value.trim(), createdAt: new Date().toISOString() };
      if(!data.email){
        status.textContent = "Please enter your email.";
        status.className = "form-status err";
        return;
      }
      btn.disabled = true;
      btn.textContent = "Joining…";
      try{
        var db = await dbPromise;
        if(db){
          await db.collection("subscribers").add(data);
        }
        try{ sessionStorage.setItem("rr_joined","1"); if(data.name) sessionStorage.setItem("rr_name", data.name); }catch(e){}
        location.href = "/welcome";
      }catch(err){
        btn.disabled = false;
        btn.textContent = "Join the List";
        status.textContent = "Something went wrong. Please try again.";
        status.className = "form-status err";
      }
    });
  }

  /* ---------------- WELCOME: greet new subscribers ---------------- */
  function personalizeWelcome(){
    var heading = document.getElementById("welcome-heading");
    if(!heading) return;
    var joined = false, firstName = "";
    try{ joined = sessionStorage.getItem("rr_joined") === "1"; firstName = sessionStorage.getItem("rr_name") || ""; }catch(e){}
    if(!joined) return;
    document.getElementById("welcome-eyebrow").innerHTML = "You&rsquo;re In";
    heading.innerHTML = "Welcome"+(firstName?", "+escapeHtml(firstName):"")+".";
  }

  /* ---------------- SHOP grid ---------------- */
  function shopCard(p){
    return '<a class="shop-card" href="'+p.url+'" target="_blank" rel="noopener">'+
      '<div class="shop-card-img"><img src="'+p.image+'" alt="'+p.name+'" loading="lazy" onerror="this.closest(\'.shop-card\').remove()"></div>'+
      '<div class="shop-card-info"><h4 class="shop-card-title">'+p.name+'</h4><span class="shop-card-price">'+p.price+'</span></div>'+
    '</a>';
  }
  function renderShop(){
    var grid = document.getElementById("shop-grid");
    if(grid) grid.innerHTML = PRODUCTS.map(shopCard).join('');
  }

  function init(){
    personalizeWelcome();
    renderShop();
    wireApplyForm();
    wireConnectForm();
    initReveals();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
