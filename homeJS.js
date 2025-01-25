document.getElementById("clickable-iroha").addEventListener("click", function () {
    const sound = document.getElementById("iroha-click")
    sound.volume = 0.2
    sound.play()
})
