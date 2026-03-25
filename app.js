// Array لتخزين البوستات (مؤقت)
let posts = [];

// دالة رفع البوست
window.upload = async function () {
  const textInput = document.getElementById("text");
  const fileInput = document.getElementById("file");

  const text = textInput ? textInput.value : "";
  const file = fileInput ? fileInput.files[0] : null;

  if (!file) {
    alert("اختار صورة الأول");
    return;
  }

  try {
    // تجهيز البيانات
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset"); // غيرها لو عندك اسم تاني

    // رفع الصورة على Cloudinary
    const res = await fetch("https://api.cloudinary.com/v1_1/dyml1sor9/image/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    // حفظ البوست في Array
    posts.push({
      text: text,
      image: data.secure_url
    });

    alert("تم النشر 🔥");

    // تفريغ الحقول
    if (textInput) textInput.value = "";
    if (fileInput) fileInput.value = "";

  } catch (error) {
    console.error(error);
    alert("حصل خطأ ❌");
  }
};

// دالة عرض البوستات
window.showPosts = function () {
  const container = document.getElementById("posts");

  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div style="margin-bottom:20px;">
        <p>${post.text}</p>
        <img src="${post.image}" width="200"/>
      </div>
    `;
  });
};
