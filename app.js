// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA809gpxrpd1QSlWEH4wCjZHw3_aRai3gA",
  authDomain: "my-site-a4c05.firebaseapp.com",
  projectId: "my-site-a4c05"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// رفع بوست
window.upload = async function () {
  const text = document.getElementById("text").value;
  const file = document.getElementById("file").files[0];

  if (!file) {
    alert("اختار صورة");
    return;
  }

  // رفع الصورة على Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_preset");

  const res = await fetch("https://api.cloudinary.com/v1_1/dyml1sor9/image/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  // حفظ في Firebase
  await addDoc(collection(db, "posts"), {
    text: text,
    image: data.secure_url
  });

  alert("تم النشر 🔥");
};

// عرض البوستات
async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const container = document.getElementById("posts");

  if (!container) return;

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const post = doc.data();

    container.innerHTML += `
      <div style="margin-bottom:20px;">
        <p>${post.text}</p>
        <img src="${post.image}" width="200"/>
      </div>
    `;
  });
}

// تشغيل تلقائي
loadPosts();
