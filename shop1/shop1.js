// ✅ กำหนดสินค้าในรูปแบบ Array (เพิ่ม/ลบได้ง่าย)
const products = [
  { id: "A", name: "ยำสาหร่าย", price: 20, img: "M1.jpg", bg: "#FF6B6B" },
  { id: "B", name: "ไข่กุ้ง", price: 20, img: "M2.jpg", bg: "#4ECDC4" },
  { id: "C", name: "ทูน่า", price: 20, img: "M3.jpg", bg: "#FFE66D" },
  { id: "D", name: "ปูอัด", price: 20, img: "M4.jpg", bg: "#1A535C" },
  { id: "E", name: "หมึกกรุบ", price: 20, img: "M5.jpg", bg: "#FF9F1C" }
];

const productList = document.getElementById("product-list");
const totalPriceEl = document.getElementById("totalPrice");

// ✅ สร้างสินค้าอัตโนมัติจาก Array
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.price = p.price;
  card.dataset.id = p.id;

  card.innerHTML = `
        <div class="product-image" style="background-color:${p.bg};">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="product-details">
          <h3>${p.name}</h3>
          <p class="price">ราคา: ${p.price} บาท</p>
          <label for="qty${p.id}">จำนวนที่ต้องการ:</label>
          <input type="number" id="qty${p.id}" class="quantity" min="0" value="0">
        </div>
      `;
  productList.appendChild(card);
});

// ✅ คำนวณราคารวม
function calculateTotal() {
  let total = 0;
  document.querySelectorAll(".product-card").forEach(card => {
    const price = parseFloat(card.dataset.price);
    const qty = parseInt(card.querySelector(".quantity").value) || 0;
    total += price * qty;
  });
  totalPriceEl.textContent = total.toFixed(2);
}

// ✅ Event: เมื่อเปลี่ยนจำนวนสินค้า
document.addEventListener("input", e => {
  if (e.target.classList.contains("quantity")) {
    calculateTotal();
  }
});

// ✅ Event: ยืนยันการสั่งซื้อ
document.getElementById("confirmOrder").addEventListener("click", () => {
  const name = document.getElementById("customerName").value.trim();
  const room = document.getElementById("customerRoom").value.trim();
  const contact = document.getElementById("customerContact").value.trim();

  if (!name) {
    alert("กรุณากรอกชื่อลูกค้า");
    return;
  }
  if (!room) {
    alert("กรุณากรอกห้องที่ต้องการรับสินค้า");
    return;
  }
  if (!contact) {
    alert("กรุณากรอกเบอร์ติดต่อ");
    return;
  }

  alert(
    `ขอบคุณคุณ ${name} ที่สั่งซื้อ!\n` +
    `ห้อง/ที่อยู่: ${room}\n` +
    `ติดต่อ: ${contact}\n` +
    `ยอดรวมทั้งหมด: ${totalPriceEl.textContent} บาท`
  );
});