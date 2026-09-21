(() => {
  const storageKey = "ninh-binh-itinerary-completed-v4";
  const toast = document.getElementById("toast");

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
  };

  const loadCompleted = () => {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
    } catch {
      return new Set();
    }
  };

  const completed = loadCompleted();

  document.querySelectorAll("[data-check-id]").forEach((item) => {
    const id = item.dataset.checkId;
    if (completed.has(id)) item.classList.add("completed");

    item.querySelector(".check-button")?.addEventListener("click", () => {
      item.classList.toggle("completed");
      if (item.classList.contains("completed")) completed.add(id);
      else completed.delete(id);
      localStorage.setItem(storageKey, JSON.stringify([...completed]));
    });
  });

  document.querySelectorAll("[data-day-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.dayFilter;
      document.querySelectorAll("[data-day-filter]").forEach((b) => {
        b.classList.toggle("active", b === button);
      });
      document.querySelectorAll("[data-day]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.day !== filter;
      });
    });
  });

  document.getElementById("printButton")?.addEventListener("click", () => window.print());

  document.getElementById("shareButton")?.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Lịch trình Ninh Bình 3 ngày 2 đêm",
      url: window.location.href
    };

    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Đã sao chép link");
      }
    } catch (error) {
      if (error?.name !== "AbortError") showToast("Không thể chia sẻ lúc này");
    }
  });

  document.getElementById("copySummaryButton")?.addEventListener("click", async () => {
    const summary = [
      "T7: Hà Nội → Tam Cốc → Bích Động → nghỉ/trưa → Thung Nham → Tam Cốc",
      "CN: Tràng An → ăn trưa → Am Tiên/Tuyệt Tình Cốc → [Hoa Lư nếu dư thời gian] → Hang Múa → Tam Cốc",
      "T2: Bái Đính → Dê Chính Thư → Tam Cốc lấy đồ/trả xe → Hà Nội"
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      showToast("Đã sao chép lịch trình");
    } catch {
      showToast("Không thể sao chép trên trình duyệt này");
    }
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
