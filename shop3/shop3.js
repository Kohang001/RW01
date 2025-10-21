// ✅ กำหนดสินค้าในรูปแบบ Array (เพิ่ม/ลบได้ง่าย)
const products = [
  { id: "A", name: "ลิปสติก", price: 20, img: "M1.jpg", bg: "#FF6B6B", desc: "ลิปสติกสีสวย ติดทนนาน" },
  { id: "B", name: "มาสคาร่า", price: 20, img: "M2.jpg", bg: "#4ECDC4", desc: "ขนตางอนเด้ง ไม่จับตัวเป็นก้อน" },
  { id: "C", name: "อายชาโดว์", price: 20, img: "M3.jpg", bg: "#FFE66D", desc: "สีสวยชัด เกลี่ยง่าย" },
  { id: "D", name: "คุชชั่น", price: 20, img: "M4.jpg", bg: "#1A535C", desc: "ปกปิดดี ให้ผิวโกลว์" },
  { id: "E", name: "ไพรเมอร์", price: 25, img: "M5.jpg", bg: "#FF9F1C", desc: "ช่วยให้เครื่องสำอางติดทน" },
  { id: "F", name: "แป้งพัฟ", price: 30, img: "M6.jpg", bg: "#9D94FF", desc: "ควบคุมความมัน หน้าเนียน" },
  { id: "G", name: "รองพื้น", price: 35, img: "M7.jpg", bg: "#FF6F91", desc: "ปกปิดเรียบเนียน" },
  { id: "H", name: "คอนซิลเลอร์", price: 40, img: "M8.jpg", bg: "#00BFA6", desc: "ปกปิดรอยสิว รอยคล้ำ" },
  { id: "I", name: "บลัชออน", price: 45, img: "M9.png", bg: "#FF9671", desc: "สีแก้มสวยธรรมชาติ" },
  { id: "J", name: "ไฮไลท์เตอร์", price: 50, img: "M10.png", bg: "#FFC75F", desc: "เพิ่มความโกลว์ให้ผิว" },
  { id: "K", name: "อายไลน์เนอร์", price: 150, img: "M11.png", bg: "#D4A5A5", desc: "เส้นคมชัด ติดทน" }
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
      <p class="desc">${p.desc}</p> <!-- ✅ รายละเอียดสินค้า -->
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