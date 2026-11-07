(() => {
  const data = window.JASMINOR_SITE || {};
  const lunaPosUrl = (data.lunaPosUrl || "").trim();
  const lunaPosUrlIsAllowed = isAllowedStoreLink(lunaPosUrl);
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element && value != null) element.textContent = value;
  };

  setText("header-note", data.headerNote || "Katalog mini");
  setText("hero-eyebrow", data.heroEyebrow || "");
  setText("hero-title", data.heroTitle || "");
  setText("hero-description", data.heroDescription || "");
  setText("hero-primary-link", data.heroButtonLabel || "Lihat koleksi");
  setText("shop-eyebrow", data.shopEyebrow || "");
  setText("shop-title", data.shopTitle || "");
  setText("shop-description", data.shopDescription || "");
  setText("products-eyebrow", data.productsEyebrow || "");
  setText("products-title", data.productsTitle || "");
  setText("footer-brand", data.brandName || "JASMINOR");
  setText("footer-note", data.footerNote || "");
  document.title = `${data.brandName || "JASMINOR"} — Katalog Mini`;

  const description = document.querySelector('meta[name="description"]');
  if (description && data.heroDescription) description.content = data.heroDescription;

  const heroImage = document.getElementById("hero-image");
  if (heroImage) {
    if (data.heroImage) heroImage.src = data.heroImage;
    if (data.heroImageAlt) heroImage.alt = data.heroImageAlt;
  }

  const shopContainer = document.getElementById("shop-links");
  if (lunaPosUrlIsAllowed) {
    const shopLink = document.createElement("a");
    shopLink.className = "channel-button";
    shopLink.textContent = data.shopLinkLabel || "Buka toko Luna POS";
    shopLink.href = lunaPosUrl;
    shopLink.target = "_blank";
    shopLink.rel = "noopener noreferrer";
    shopLink.setAttribute("aria-label", "Buka toko Luna POS di tab baru");
    shopContainer.appendChild(shopLink);
  } else if (lunaPosUrl) {
    const shopLink = document.createElement("button");
    shopLink.className = "channel-button";
    shopLink.textContent = "URL Luna POS belum valid";
    shopLink.type = "button";
    shopLink.disabled = true;
    shopLink.setAttribute("aria-disabled", "true");
    shopContainer.appendChild(shopLink);
  }

  const productGrid = document.getElementById("product-grid");
  (data.products || []).forEach((product, index) => {
    const card = document.createElement("article");
    card.className = `product-card product-card-${(index % 3) + 1}`;

    const art = document.createElement("div");
    art.className = `product-art${product.image ? " product-art-photo" : ""}`;
    art.setAttribute("aria-label", product.image ? `Foto ${product.name || "produk"}` : "Ilustrasi parfum contoh");

    if (product.isExample) {
      const tag = document.createElement("span");
      tag.className = "sample-tag";
      tag.textContent = "CONTOH";
      art.appendChild(tag);
    }

    if (product.image) {
      const image = document.createElement("img");
      image.className = "product-image";
      image.src = product.image;
      image.alt = product.imageAlt || product.name || "Foto produk";
      art.appendChild(image);
    } else {
      const bottle = document.createElement("span");
      bottle.className = "bottle";
      bottle.setAttribute("aria-hidden", "true");
      art.appendChild(bottle);
    }

    const info = document.createElement("div");
    info.className = "product-info";
    const title = document.createElement("h3");
    title.textContent = product.name || "Nama produk";
    const copy = document.createElement("p");
    copy.textContent = product.description || "Tambahkan deskripsi produk di site-data.js.";
    const bottom = document.createElement("div");
    bottom.className = "product-bottom";
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = product.price || "Harga belum diisi";
    const detail = document.createElement("span");
    detail.className = "detail-label";
    detail.textContent = product.detail || "";
    bottom.append(price, detail);

    
const buyLink = document.createElement("a");
buyLink.className = "product-buy-link";

const orderMessage = [
  "Halo JASMINOR, saya ingin memesan parfum.",
  "",
  `Ukuran: ${product.name || "Belum dipilih"}`,
  `Harga: ${product.price || "Mohon konfirmasi harga"}`,
  "",
  "Saya ingin memilih aroma parfum melalui WhatsApp.",
  "Mohon bantu saya melihat pilihan inspirasi aroma yang tersedia."
].join("\n");

buyLink.href = `https://wa.me/${data.whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;

buyLink.target = "_blank";
buyLink.rel = "noopener noreferrer";

buyLink.setAttribute(
  "aria-label",
  `Pesan ${product.name || "ukuran botol"} melalui WhatsApp`
);

buyLink.innerHTML = '<span>Pesan di sini</span><svg class="whatsapp-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.2 11.6a8.4 8.4 0 0 1-12.4 7.3L3 20l1.2-4.6a8.4 8.4 0 1 1 16-3.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.3 7.8c.2-.4.4-.5.7-.5h.5c.2 0 .4.2.5.4l.8 1.8c.1.2.1.4 0 .6l-.6.7c-.2.2-.2.4-.1.6.5.8 1.2 1.5 2 2 .2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.7.8c.2.1.3.3.3.5 0 .2-.2 1-.7 1.4-.5.4-1.1.5-1.8.4-.8-.1-1.9-.5-3.1-1.5-1.4-1.2-2.3-2.7-2.6-3.4-.3-.7 0-1.7.5-2.2Z" fill="currentColor"/></svg><span>Jasminor</span>';

    info.append(title, copy, bottom, buyLink);
    card.append(art, info);
    productGrid.appendChild(card);
  });

  const disclaimer = document.getElementById("disclaimer-text");
  if (disclaimer) {
    const strong = document.createElement("strong");
    strong.textContent = "Disclaimer: ";
    disclaimer.append(
      strong,
      document.createTextNode(data.disclaimer || "Periksa kembali semua informasi produk.")
    );
  }
})();

function isAllowedStoreLink(value) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return false;
    const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
    const blockedDomains = ["shopee.co.id", "shopee.com", "tokopedia.com"];
    return !blockedDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}
