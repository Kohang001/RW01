// ✅ กำหนดสินค้าในรูปแบบ Array (เพิ่ม/ลบได้ง่าย)
const products = [
  { id: "A", name: "ผัดมาม่า", price: 30, img: "M1.jpg", bg: "#FF6B6B" },
  { id: "B", name: "ข้าวไข่ข้น", price: 30, img: "M2.jpg", bg: "#4ECDC4" },
  { id: "C", name: "ข้าวผัดกุ้ง", price: 30, img: "M3.jpg", bg: "#FFE66D" },
  { id: "D", name: "ข้าวผัดหมู", price: 30, img: "M4.jpg", bg: "#1A535C" },
  { id: "E", name: "ข้าวผัดไก่", price: 30, img: "M5.jpg", bg: "#FF9F1C" }
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
      <p class="price">ราคา: ${p.price} บาท (พิเศษ +10)</p>
      
      <label for="qty${p.id}">จำนวนที่ต้องการ:</label>
      <input type="number" id="qty${p.id}" class="quantity" min="0" value="0">

      <!-- ✅ ปุ่มเลือก ธรรมดา/พิเศษ -->
      <div class="menu-type">
        <label>
          <input type="radio" name="type${p.id}" value="normal" checked> ธรรมดา
        </label>
        <label>
          <input type="radio" name="type${p.id}" value="special"> พิเศษ
        </label>
      </div>

      <!-- ✅ ช่องพิมพ์รายละเอียดเพิ่มเติม -->
      <label for="note${p.id}">รายละเอียดเพิ่มเติม:</label>
      <textarea id="note${p.id}" class="note" rows="2" placeholder="เช่น ไม่ใส่เผ็ด, เพิ่มไข่ดาว"></textarea>
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

    // เช็คว่าเลือกธรรมดาหรือพิเศษ
    const type = card.querySelector('input[type="radio"]:checked').value;
    let itemPrice = price;
    if (type === "special") {
      itemPrice += 10; // เพิ่ม 10 บาทถ้าเลือกพิเศษ
    }

    total += itemPrice * qty;
  });
  totalPriceEl.textContent = total.toFixed(2);
}


// เมื่อเปลี่ยนจำนวน หรือเปลี่ยนปุ่มเลือก
document.addEventListener("input", e => {
  if (e.target.classList.contains("quantity") || e.target.type === "radio") {
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

  // ✅ รวมรายละเอียดเมนูที่เลือก
  let orderDetails = "";
  document.querySelectorAll(".product-card").forEach(card => {
    const qty = parseInt(card.querySelector(".quantity").value) || 0;
    if (qty > 0) {
      const name = card.querySelector("h3").textContent;
      const type = card.querySelector('input[type="radio"]:checked').value;
      const note = card.querySelector(".note").value.trim();
      orderDetails += `- ${name} (${type}) x ${qty}${note ? " | หมายเหตุ: " + note : ""}\n`;
    }
  });

  alert(
    `ขอบคุณคุณ ${name} ที่สั่งซื้อ!\n` +
    `ห้อง/ที่อยู่: ${room}\n` +
    `ติดต่อ: ${contact}\n\n` +
    `📋 รายการสั่งซื้อ:\n${orderDetails}\n` +
    `ยอดรวมทั้งหมด: ${totalPriceEl.textContent} บาท`
  );
});

