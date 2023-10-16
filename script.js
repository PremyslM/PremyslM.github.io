const currentDate = new Date();
const formattedDate =
    currentDate.toDateString().split(" ").slice(0, 3).join(" ") +
    " " +
    currentDate.toTimeString().split(" ")[0].split(":").slice(0, 3).join(":");
document.getElementById("dateTime").innerHTML = formattedDate;
const typingElement = document.querySelector(".typing");
let index = 0;
let currentText = "";
let isDeleting = false;
let currentMenu = "main";

const menus = {
    main: `Select a menu:<br><span onclick="handleMenuClick('1')">[1] Who is Premysl?</span><br><span onclick="handleMenuClick('2')">[2] Contact me</span><br><span onclick="handleMenuClick('3')">[3] My works</span>`,
    1: `Who is Premysl?<br><br>I've been in lots of different kinds of SW development. My journey of developer starts when I was 12 yo. and I created my first Android trivia-quiz app , hacked clients, and building websites. As my interests shifted to the AI market, I channeled my skills into data-science. This led me to work extensively with something I love such as ML, it's implementation, and testing, a niche where I contributed significantly. <br><br>Following my story with ML, I again delved into the Apple platform development scene and started to using my skill there. Back to 2021, I was a proud member of great team of GREAT people matsword.io - together we created several amazing apps, such as: newskit, iHoubar, etc.<br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    2: `Contact:<br>- Email: <a href="mailto:premysl.mikulenka@outlook.com">premysl.mikulenka@outlook.com</a><br>- Discord: <a href="https://discord.com/users/premysl.codes">@premysl.codes</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
    3: `Some of my Projects:<br><br>
- <strong>timero</strong>: A Friendly time-management app that helps to users known about their time, and how there are spending it. <a href="https://github.com/PremyslM/Timero" target="_blank">[GitHub]</a><br>
- <strong>worbit 2.0</strong>: An Exercise-based app that creates fully-free personalized exercise bundles specially for users, based on their biometric data. <a href="https://github.com/PremyslM/worbit-2.0" target="_blank">[GitHub]</a><br>
- <strong>EXRS.</strong>: ML Model that creates strong reference between biometrical data and thousants of different exercises and can create final 'exercise-bundle' (bunch of exercised that are based on biometrical data of subject) <a href="https://github.com/PremyslM/" target="_blank">[GitHub]</a><br>
- <strong>knomore.</strong>: Simple, minimalistic but user-friendly fully free trivia app. <a href="https://github.com/PremyslM" target="_blank">[GitHub]</a><br>
    - <strong>FREELANCE PROJECTS</strong>: ... can't show YOU :(<br>
<span onclick="handleMenuClick('B')">[B] Back</span>`
};

function handleMenuClick(menuKey) {
    if (menuKey in menus && currentMenu !== menuKey) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = menuKey;
            currentText = menus[menuKey];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((menuKey === "B" || menuKey === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}
function typeDeleteAnimation(callback) {
    let speed = 7; // default typing speed
    let deleteSpeed = 3; // default deletion speed

    if (currentMenu === "1" || currentMenu === "3") {
        speed = 1; // Makes the typing faster for "Who is Premysl".
        deleteSpeed = 1; // Makes the deletion faster for "Who is Premysl". Adjust as needed.
    }

    if (isDeleting && typingElement.innerHTML !== "") {
        if (currentText.charAt(index - 1) === ">") {
            const openTagIndex = currentText.lastIndexOf("<", index);
            const tagName = currentText.substring(
                openTagIndex + 1,
                currentText.indexOf(" ", openTagIndex)
                );
            const startTagIndex = currentText.lastIndexOf(
                `</${tagName}>`,
                index
                );
            index = startTagIndex;
        } else {
            index--;
        }
        currentText = currentText.slice(0, index);
        typingElement.innerHTML = currentText;

        setTimeout(() => typeDeleteAnimation(callback), deleteSpeed);
    } else if (isDeleting) {
        isDeleting = false;
        if (callback) callback();
    } else if (!isDeleting && index < currentText.length) {
        if (currentText.charAt(index) === "<") {
            if (currentText.substr(index, 4) === "<br>") {
                const br = document.createElement("br");
                typingElement.appendChild(br);
                index += 4;
            } else {
                const closingTagIndex = currentText.indexOf(">", index);
                const tagName = currentText
                    .substring(index + 1, closingTagIndex)
                    .split(" ")[0];
                const endTagIndex =
                    currentText.indexOf(`</${tagName}>`, index) +
                    `</${tagName}>`.length;
                const outerHTML = currentText.substring(index, endTagIndex);
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = outerHTML;
                const childElement = tempDiv.firstChild;

                if (tagName === "a") {
                    childElement.target = "_blank";
                    speed = 1; // Faster typing for <a> tag
                } else if (tagName === "span") {
                    childElement.onclick = function () {
                        const menuKey = childElement
                            .getAttribute("onclick")
                            .replace("handleMenuClick('", "")
                            .replace("')", "");
                        handleMenuClick(menuKey);
                    };
                    speed = 1; // Faster typing for <span> tag
                }

                typingElement.appendChild(childElement);
                index = endTagIndex;
            }
        } else {
            typingElement.innerHTML += currentText.charAt(index);
            index++;
        }

        setTimeout(typeDeleteAnimation, speed);
    }
}

function handleUserInput(event) {
    const key = event.key;
    if (key in menus && currentMenu !== key) {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = key;
            currentText = menus[key];
            index = 0;
            typeDeleteAnimation();
        });
    } else if ((key === "B" || key === "b") && currentMenu !== "main") {
        isDeleting = true;
        typeDeleteAnimation(() => {
            currentMenu = "main";
            currentText = menus.main;
            index = 0;
            typeDeleteAnimation();
        });
    }
}

document.addEventListener("keydown", handleUserInput);

// Initialize the typing animation with the main menu on page load
currentText = menus.main;
typeDeleteAnimation();
