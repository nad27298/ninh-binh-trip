(() => {
  const completedStorageKey = "ninh-binh-itinerary-completed-v5";
  const choicesStorageKey = "ninh-binh-itinerary-choices-v5";
  const toast = document.getElementById("toast");

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
  };

  const safeReadJSON = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  };

  // Timeline completion state
  const completed = new Set(safeReadJSON(completedStorageKey, []));

  document.querySelectorAll("[data-check-id]").forEach((item) => {
    const id = item.dataset.checkId;
    if (completed.has(id)) item.classList.add("completed");

    item.querySelector(".check-button")?.addEventListener("click", () => {
      item.classList.toggle("completed");

      if (item.classList.contains("completed")) completed.add(id);
      else completed.delete(id);

      localStorage.setItem(completedStorageKey, JSON.stringify([...completed]));
    });
  });

  // Day filter
  document.querySelectorAll("[data-day-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.dayFilter;

      document.querySelectorAll("[data-day-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      document.querySelectorAll("[data-day]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.day !== filter;
      });
    });
  });

  // Group choices — saved per browser/device (Option A)
  let choices = safeReadJSON(choicesStorageKey, {});

  const syncChoice = (choiceId, value, source = null) => {
    document.querySelectorAll(`[data-choice-id="${choiceId}"]`).forEach((select) => {
      if (select !== source) select.value = value;
    });
  };

  document.querySelectorAll("[data-choice-id]").forEach((select) => {
    const choiceId = select.dataset.choiceId;
    const savedValue = choices[choiceId];

    if (typeof savedValue === "string") {
      select.value = savedValue;
    }

    select.addEventListener("change", () => {
      choices[choiceId] = select.value;
      localStorage.setItem(choicesStorageKey, JSON.stringify(choices));
      syncChoice(choiceId, select.value, select);
      showToast("Đã lưu lựa chọn trên thiết bị này");
    });
  });

  document.getElementById("resetChoicesButton")?.addEventListener("click", () => {
    choices = {};
    localStorage.removeItem(choicesStorageKey);

    document.querySelectorAll("[data-choice-id]").forEach((select) => {
      select.selectedIndex = 0;
    });

    showToast("Đã đặt lại các lựa chọn");
  });

  const getChoiceText = (choiceId) => {
    const select = document.querySelector(`[data-choice-id="${choiceId}"]`);
    if (!select) return "Chưa chốt";

    const option = select.options[select.selectedIndex];
    return option?.textContent?.trim() || "Chưa chốt";
  };

  // Print + share
  document.getElementById("printButton")?.addEventListener("click", () => window.print());

  document.getElementById("shareButton")?.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Lịch trình Ninh Bình 10–12/10/2026 · 3 ngày 2 đêm",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Đã sao chép link");
      }
    } catch (error) {
      if (error?.name !== "AbortError") showToast("Không thể chia sẻ lúc này");
    }
  });

  // Copy the refreshed itinerary together with current local choices.
  document.getElementById("copySummaryButton")?.addEventListener("click", async () => {
    const summary = [
      "NINH BÌNH TRIP · 10–12/10/2026",
      "",
      "T7 10/10: Hà Nội → Khách sạn Hoa Lư → ăn trưa/nghỉ → Hang Múa → ăn dê → Phố cổ Hoa Lư + Chùa Cầu.",
      "CN 11/10: Tràng An → Bến An/Starbucks → ăn trưa/nghỉ → Tuyệt Tình Cốc/Động Am Tiên → [Bãi Sỏi optional] → Đỉnh Kỳ Lân → ăn tối/cafe.",
      "T2 12/10: [Bình minh Kỳ Lân nếu Day 2 không đẹp] → ăn sáng → Thung Ui → khách sạn/checkout → ăn trưa → Hà Nội.",
      "",
      "Lựa chọn trên thiết bị này:",
      `- Hà Nội ↔ Ninh Bình: ${getChoiceText("transport")}`,
      `- Bữa dê Day 1: ${getChoiceText("goat-restaurant")}`,
      `- Trưa Day 2: ${getChoiceText("day2-lunch")}`,
      `- Bãi Sỏi Day 2: ${getChoiceText("bai-soi")}`,
      `- Bình minh Kỳ Lân Day 3: ${getChoiceText("sunrise-kylan")}`,
      "",
      "Priority: Hang Múa · Tràng An · Am Tiên · Kỳ Lân · Thung Ui.",
      "Nếu Day 2 chậm: cắt Bãi Sỏi → giảm Bến An/Starbucks → giảm cafe/nghỉ phụ.",
      "Tam Cốc chỉ optional để dạo/check-in nếu dư giờ; không đi thuyền."
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      showToast("Đã sao chép lịch trình + lựa chọn");
    } catch {
      showToast("Không thể sao chép trên trình duyệt này");
    }
  });

  // Reveal animation
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
