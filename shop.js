'use strict';
// Configure only with the store's confirmed number, country code included.
const WHATSAPP_NUMBER='5567981542208';
let bag;try{bag=JSON.parse(localStorage.getItem('mimo-kids-bag')||'[]');if(!Array.isArray(bag))bag=[]}catch{bag=[]}let currentProduct;let returnFocus;
const bagButton=document.createElement('button');bagButton.className='bag-button';bagButton.type='button';bagButton.setAttribute('aria-label','Abrir carrinho de compras');bagButton.innerHTML='<svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L20.5 8H6"/><circle cx="9" cy="19" r="1.3"/><circle cx="17" cy="19" r="1.3"/></svg><span class="bag-count">0</span>';document.querySelector('.header-link').replaceWith(bagButton);
const purchase=document.createElement('div');purchase.className='purchase';purchase.innerHTML='<label>Tamanho:<select id="choose-size" required><option value="">Selecione</option></select></label><label>Quantidade:<input id="quantity" type="number" min="1" max="20" value="1"></label><button id="add-bag" type="button">Adicionar ao carrinho</button><p id="added" role="status"></p>';document.querySelector('.back').before(purchase);
const bagDialog=document.createElement('dialog');bagDialog.className='bag-dialog';bagDialog.setAttribute('aria-labelledby','bag-title');bagDialog.innerHTML='<button class="bag-close close" aria-label="Fechar carrinho">×</button><div class="bag-content"><a class="bag-brand brand-logo" href="#" aria-label="Mimo Kids Presentes, início"><svg class="brand-mark" viewBox="144 524 592 628" aria-hidden="true"><image href="assets/logo-mimo-kids.png" width="900" height="1600"/></svg><span class="brand-wordmark"><strong>Mimo Kids</strong><small>Presentes</small></span></a><p class="eyebrow">SEUS MIMOS</p><h2 id="bag-title">Meu carrinho</h2><p class="demo-note">Escolha seus mimos e fale com a gente para confirmar tamanhos, valores e disponibilidade.</p><div id="bag-items"></div><p id="bag-status" role="status"></p><label class="order-observation" for="order-observation">Observações<textarea id="order-observation" rows="3" placeholder=""></textarea></label><button id="prepare-order">Preparar pedido</button><div id="order-preview" hidden><label for="order-text">Mensagem do pedido:</label><textarea id="order-text" rows="8" readonly></textarea><button id="copy-order">Copiar mensagem</button><a id="whatsapp" target="_blank" rel="noopener noreferrer" hidden>Abrir no WhatsApp ↗</a><p id="phone-note"></p></div></div>';document.body.append(bagDialog);
const originalOpenDetail=openDetail;openDetail=function(p){currentProduct=p;const select=document.querySelector('#choose-size');select.replaceChildren(new Option('Selecione',''));p.sizes.forEach(size=>select.add(new Option(size,size)));if(p.sizes.includes(state.size))select.value=state.size;document.querySelector('#quantity').value=1;document.querySelector('#added').textContent='';originalOpenDetail(p)};
document.querySelector('#add-bag').addEventListener('click',()=>{const select=document.querySelector('#choose-size');const quantity=document.querySelector('#quantity');if(!select.reportValidity()||!quantity.reportValidity())return;const amount=Number(quantity.value);const existing=bag.find(x=>x.id===currentProduct.id&&x.size===select.value);if(existing&&existing.quantity+amount>20){document.querySelector('#added').textContent='Limite de 20 unidades por modelo e tamanho.';return}if(existing)existing.quantity+=amount;else bag.push({id:currentProduct.id,name:currentProduct.name,size:select.value,quantity:amount,image:currentProduct.image});document.querySelector('#added').textContent='Adicionado ao carrinho.';updateBag()});
bagButton.addEventListener('click',()=>{returnFocus=document.activeElement;updateBag();bagDialog.showModal()});document.querySelector('.bag-close').addEventListener('click',()=>bagDialog.close());bagDialog.addEventListener('close',()=>returnFocus?.focus());
document.querySelector('#prepare-order').addEventListener('click',()=>{const observation=document.querySelector('#order-observation').value.trim();const orderTotal=bag.reduce((sum,x)=>sum+x.quantity*items[x.id].price,0);const promoLine=orderTotal>=199?'\n\nPromoção: compras acima de R$ 199,00 ganham 1 meia maluca.':'';const message='Olá, Mimo Kids Presentes!\n\nPedido:\n'+bag.map(x=>`• ${x.name} | Tamanho: ${x.size} | Quantidade: ${x.quantity}`).join('\n')+promoLine+'\n\nPor favor, confirme os modelos, valores e disponibilidade.';document.querySelector('#order-text').value=observation?message+'\n\nObservações: '+observation:message;document.querySelector('#order-preview').hidden=false;const link=document.querySelector('#whatsapp');const valid=/^55\d{10,11}$/.test(WHATSAPP_NUMBER);link.hidden=!valid;if(valid)link.href='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(document.querySelector('#order-text').value);document.querySelector('#phone-note').textContent=valid?'O WhatsApp será aberto para você revisar e enviar a mensagem.':'O número da loja ainda precisa ser configurado. Você já pode revisar e copiar a mensagem.'});document.querySelector('#copy-order').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#order-text').value);document.querySelector('#phone-note').textContent='Mensagem copiada.'}catch{document.querySelector('#order-text').select();document.querySelector('#phone-note').textContent='Selecione e copie o texto acima.'}});

/* Carrinho com miniaturas, tamanho visível e controle rápido de quantidade */
let updateBag=function(){try{localStorage.setItem("mimo-kids-bag",JSON.stringify(bag))}catch{}
  const total=bag.reduce((sum,x)=>sum+x.quantity,0);document.querySelector('.bag-count').textContent=total;
  bagButton.setAttribute('aria-label',`Abrir carrinho de compras, ${total} ${total===1?'item':'itens'}`);
  const container=document.querySelector('#bag-items');container.replaceChildren();
  bag.forEach((x,index)=>{const row=document.createElement('div');row.className='bag-item';
    const thumb=document.createElement('div');thumb.className=`product-thumb photo-${x.id}`;thumb.setAttribute('role','img');thumb.setAttribute('aria-label',x.name);if(x.image){thumb.style.backgroundImage='url('+x.image+')';thumb.style.backgroundSize='contain';thumb.style.backgroundRepeat='no-repeat';thumb.style.backgroundPosition='center';thumb.style.backgroundColor='#fff8fb'}
    const info=document.createElement('div');info.className='bag-item-info';const name=document.createElement('strong');name.textContent=x.name;const meta=document.createElement('span');meta.textContent=`Tamanho: ${x.size}`;
    const controls=document.createElement('div');controls.className='bag-controls';const minus=document.createElement('button');minus.type='button';minus.textContent='−';minus.setAttribute('aria-label',`Diminuir quantidade de ${x.name}`);minus.disabled=x.quantity<=1;const qty=document.createElement('span');qty.textContent=x.quantity;const plus=document.createElement('button');plus.type='button';plus.textContent='+';plus.setAttribute('aria-label',`Aumentar quantidade de ${x.name}`);plus.disabled=x.quantity>=20;minus.addEventListener('click',()=>{if(x.quantity>1){x.quantity--;updateBag()}});plus.addEventListener('click',()=>{if(x.quantity<20){x.quantity++;updateBag()}});controls.append(minus,qty,plus);const price=document.createElement('strong');price.className='bag-item-price';price.textContent=(x.quantity*items[x.id].price).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});info.append(name,meta,controls,price);
    const remove=document.createElement('button');remove.className='bag-remove';remove.type='button';remove.textContent='Remover';remove.setAttribute('aria-label',`Remover ${x.name} tamanho ${x.size}`);remove.addEventListener('click',()=>{bag.splice(index,1);updateBag()});row.append(thumb,info,remove);container.append(row);});
  const summary=document.createElement('div');summary.className='bag-total';const summaryLabel=document.createElement('span');summaryLabel.textContent='Total:';const summaryValue=document.createElement('strong');summaryValue.textContent=bag.reduce((sum,x)=>sum+x.quantity*items[x.id].price,0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});summary.append(summaryLabel,summaryValue);container.append(summary);
  document.querySelector('#bag-status').textContent=bag.length?'':'Seu carrinho está vazio. Explore os mimos e escolha um tamanho.';document.querySelector('#prepare-order').disabled=!bag.length;document.querySelector('#order-preview').hidden=true;
};updateBag();


window.addToBag=function(product,size){const existing=bag.find(x=>x.id===product.id&&x.size===size);if(existing){if(existing.quantity<20)existing.quantity++}else{bag.push({id:product.id,name:product.name,size,quantity:1,image:product.image})}updateBag();returnFocus=document.activeElement;if(!bagDialog.open)bagDialog.showModal()};

























