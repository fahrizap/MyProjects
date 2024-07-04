document.addEventListener("DOMContentLoaded", (event) => {
  //get menu
  const homeMenu = document.getElementById("homeMenu");
  const friendMenu = document.getElementById("friendMenu");
  const communityMenu = document.getElementById("communityMenu");
  const saveMenu = document.getElementById("saveMenu");
  const postMenu = document.getElementById("postMenu");
  const profileMenu = document.getElementById("profileMenu");
  const notificationMenu = document.getElementById("notificationMenu");
  const messageMenu = document.getElementById("messageMenu");
  const privateFriend = document.querySelectorAll(".priv-friend");
  const privateCommunity = document.querySelectorAll(".priv-community");
  const contentClasses = [
    "friendContent",
    "createContent",
    "communityContent",
    "saveContent",
    "profileContent",
    "messageContent",
    "notificationContent",
    "privateFriendContent",
    "privateCommunityContent",
    "postContent",
  ];
  function hideOtherContent() {
    contentClasses.forEach((className) => {
      document.querySelector(`#${className}`).classList.add("hidden");
    });
  }
  function activeContent(content) {
    document.querySelector(`#${content}`).classList.remove("hidden");
  }
  hideOtherContent();
  activeContent("postContent");

  homeMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("postContent");
  });
  friendMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("friendContent");
  });
  postMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("createContent");
  });
  communityMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("communityContent");
  });
  saveMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("saveContent");
  });
  notificationMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("notificationContent");
  });
  messageMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("messageContent");
  });
  profileMenu.addEventListener("click", () => {
    hideOtherContent();
    activeContent("profileContent");
  });
  privateFriend.forEach((pf) => {
    pf.addEventListener("click", () => {
      hideOtherContent();
      activeContent("privateFriendContent");
    });
  });
  privateCommunity.forEach((pC) => {
    pC.addEventListener("click", () => {
      hideOtherContent();
      activeContent("privateCommunityContent");
    });
  });
});
