/* Main JS for Akácfa Étkezde site
   - populates today's offer from localStorage (admin editor)
   - handles contact form (dummy)
   - handles admin save
*/

document.addEventListener('DOMContentLoaded', function(){
  // Sample default offer
  const defaultOffer = {
    title: "Today's Offer: Gulyás",
    soup: "Gulyásleves — 1,100 HUF",
    main: "Beef goulash with dumplings — 1,580 HUF",
    side: "House salad — 300 HUF"
  };

  function getOffer(){
    try{
      const raw = localStorage.getItem('akacfa_today');
      return raw ? JSON.parse(raw) : defaultOffer;
    }catch(e){
      return defaultOffer;
    }
  }

  function renderToday(){
    const container = document.getElementById('today-offer');
    if(!container) return;
    const offer = getOffer();
    container.innerHTML = `
      <h3>${escapeHtml(offer.title)}</h3>
      <ul class="menu-list">
        <li><strong>Soup:</strong> ${escapeHtml(offer.soup)}</li>
        <li><strong>Main:</strong> ${escapeHtml(offer.main)}</li>
        <li><strong>Side/Dessert:</strong> ${escapeHtml(offer.side)}</li>
      </ul>
    `;
  }

  // Admin editor actions
  const adminForm = document.getElementById('adminForm');
  if(adminForm){
    const title = document.getElementById('offerTitle');
    const soup = document.getElementById('offerSoup');
    const main = document.getElementById('offerMain');
    const side = document.getElementById('offerSide');
    const msg = document.getElementById('adminMessage');

    // populate fields from storage
    const offer = getOffer();
    if(title) title.value = offer.title || '';
    if(soup) soup.value = offer.soup || '';
    if(main) main.value = offer.main || '';
    if(side) side.value = offer.side || '';

    adminForm.addEventListener('submit', function(e){
      e.preventDefault();
      const newOffer = {
        title: title.value || 'Today\'s Offer',
        soup: soup.value || '',
        main: main.value || '',
        side: side.value || ''
      };
      localStorage.setItem('akacfa_today', JSON.stringify(newOffer));
      msg.textContent = 'Saved to local browser storage. Visit the homepage to see changes.';
    });
  }

  // Contact form (dummy behaviour)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const messageEl = document.getElementById('contactMessage');
      messageEl.textContent = 'Thank you — your message was received (dummy).';
      contactForm.reset();
    });
  }

  // Render today on pages
  renderToday();

  // simple escape to avoid injecting HTML from storage
  function escapeHtml(text){
    if(!text) return '';
    return text.replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m];});
  }
});
