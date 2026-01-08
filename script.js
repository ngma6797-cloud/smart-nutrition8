// ملف البيانات الديناميكي
const dataURL = "data.json"; // DataSource

// رسالة ترحيب عند تحميل الصفحة
window.onload = function () {
  speak("من فضلك اضغط على كلمة دخول");
};

function speak(text) {
  let msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ar-SA";
  speechSynthesis.speak(msg);
}

// زر تسجيل الدخول
document.getElementById("loginBtn").addEventListener("click", () => {
  let kot = prompt("اختر الكوت (kot1, kot2, kot3, kot4)");
  if (["kot1", "kot2", "kot3", "kot4"].includes(kot)) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userKot", kot);
    speak("أهلاً وسهلاً، موقع النجم التعليمي");
    showDashboard();
  } else {
    alert("الكوت غير صحيح!");
  }
});

function showDashboard() {
  document.querySelector(".login-container").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  loadKotData();
}

// تحميل بيانات الكوت ديناميكي
function loadKotData() {
  if(localStorage.getItem("loggedIn") !== "true") return;

  let userKot = localStorage.getItem("userKot");
  fetch(dataURL)
    .then(res => res.json())
    .then(data => {
      let kotData = data.kots[userKot];
      let contentDiv = document.getElementById("content");

      // الكتب
      let booksTitle = document.createElement("h2");
      booksTitle.textContent = "الكتب:";
      contentDiv.appendChild(booksTitle);
      kotData.books.forEach(book => {
        let div = document.createElement("div");
        div.textContent = book;
        contentDiv.appendChild(div);
      });

      // الصور
      let imagesTitle = document.createElement("h2");
      imagesTitle.textContent = "الصور:";
      contentDiv.appendChild(imagesTitle);
      kotData.images.forEach(img => {
        let image = document.createElement("img");
        image.src = img;
        contentDiv.appendChild(image);
      });

      // الكلمات الإنجليزية
      let wordsTitle = document.createElement("h2");
      wordsTitle.textContent = "الكلمات الإنجليزية:";
      contentDiv.appendChild(wordsTitle);
      kotData.englishWords.forEach(word => {
        let p = document.createElement("p");
        p.textContent = word;
        contentDiv.appendChild(p);
      });
    });
}
