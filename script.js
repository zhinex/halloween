// Personalize the gift code below before publishing.
const ROBLOX_GIFT_CODE = "RBG3KRC3TEDUCDB5";

const screens = [...document.querySelectorAll(".screen")];
function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({top: 0, behavior: "smooth"});
}
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.getElementById("scareButton").addEventListener("click", () => {
  showScreen("scare");
  // Later, replace the emoji with your own spooky portrait if you want.
  // Keep the image in this folder and use an <img> inside #scareFace.
});

const codeBox = document.getElementById("giftCode");
const copyStatus = document.getElementById("copyStatus");
codeBox.textContent = ROBLOX_GIFT_CODE;

document.getElementById("copyButton").addEventListener("click", async () => {
  const code = ROBLOX_GIFT_CODE;
  if (code === "ADD-YOUR-CODE") {
    copyStatus.textContent = "Add your real gift code in script.js first 🎃";
    return;
  }
  try {
    await navigator.clipboard.writeText(code);
    copyStatus.textContent = "Code copied! Enjoy your treat, Angie! 🧡";
  } catch {
    copyStatus.textContent = "Tap and hold the code above to copy it.";
  }
});

// Background music controls
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

backgroundMusic.volume = 0.35;

function updateMusicButton() {
  if (backgroundMusic.paused) {
    musicButton.textContent = "🎵 Play Music";
    musicButton.setAttribute("aria-pressed", "false");
  } else {
    musicButton.textContent = "🔇 Pause Music";
    musicButton.setAttribute("aria-pressed", "true");
  }
}

// Try to play music automatically when the website opens
async function startBackgroundMusic() {
  try {
    await backgroundMusic.play();
  } catch (error) {
    console.log("Autoplay was blocked. Waiting for user interaction.");
  }

  updateMusicButton();
}

musicButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
    } catch (error) {
      console.error("Unable to play music:", error);
    }
  } else {
    backgroundMusic.pause();
  }

  updateMusicButton();
});

backgroundMusic.addEventListener("play", updateMusicButton);
backgroundMusic.addEventListener("pause", updateMusicButton);

// Attempt autoplay when the page loads
startBackgroundMusic();

// Open the Halloween surprise and start the music
const surpriseOverlay = document.getElementById("surpriseOverlay");
const openSurpriseButton = document.getElementById("openSurpriseButton");

openSurpriseButton.addEventListener("click", async () => {
  openSurpriseButton.disabled = true;
  openSurpriseButton.textContent = "✨ Opening your surprise...";

  try {
    await backgroundMusic.play();
  } catch (error) {
    console.log("Music could not start:", error);
  }

  updateMusicButton();

  surpriseOverlay.classList.add("hidden");

  // Remove the opening screen after its fade-out animation
  setTimeout(() => {
    surpriseOverlay.remove();
  }, 750);
});