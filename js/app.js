// making the user name dynamic
let userNameElement = document.getElementById("user-name");
userNameElement.innerHTML = userName;
let unreadCount = emailsData.inbox.emails.filter((mail) => {
  return mail.isRead === false;
}).length;

let openedMail;
let inboxMails = emailsData.inbox.emails;
let navInboxIcon = document.getElementById("nav-inbox-icon");
unreadCount > 0
  ? navInboxIcon.setAttribute("src", "/assets/images/inbox-icon-filled.png")
  : navInboxIcon.setAttribute("src", "/assets/images/inbox-icon.png");
//check if there is a new mails then show the orange icon

function checkForNewMailBoxes() {
  if (emailsData.inbox.unreadCount > 0) {
    let inboxIcon = document.getElementById("inbox-icon");
    inboxIcon.setAttribute("src", "/assets/images/inbox-icon-filled.png");
  }
}

function greateUser() {
  let userGrete = document.getElementById("user-greate-name");
  let mailsCount = document.getElementById("user-mails-count-number");

  userGrete.innerHTML = `
  ${userName.split(" ")[0]}
  `;

  mailsCount.innerHTML = `${unreadCount}`;
}

function createElmentWithAttributes(
  tagName,
  className,
  attributes = [],
  innerText
) {
  let element = document.createElement(tagName);
  element.className = className ? className : "";
  attributes.length > 0 &&
    attributes.forEach((attr) => {
      element.setAttribute(attr.key, attr.value);
    });

  element.innerText = innerText ? innerText : "";

  return element;
}

function mailComponentCreator(mail) {
  let mailId = `mail-${mail.id}`;

  let mailMainInfoContatiner = createElmentWithAttributes("div", "");
  let mailMainInfo = createElmentWithAttributes(
    "div",
    mail.isRead ? "mail-main-info" : "mail-main-info unread"
    // [{ key: "id", value: mailId }]
  );
  let mailCecksDev = createElmentWithAttributes("div", "mail-checks");

  let mailCheckbox = createElmentWithAttributes("input", "mail-checkbox", [
    { key: "type", value: "checkbox" },
  ]);

  let mailFavorite = createElmentWithAttributes("img", "favorite", [
    { key: "src", value: "/assets/images/star.png" },
    { key: "alt", value: "star-img" },
  ]);

  let mailCheckboxSmall = createElmentWithAttributes(
    "input",
    "mail-checkbox-small",
    [{ key: "type", value: "checkbox" }]
  );

  let mailFavoriteSmallContainer = createElmentWithAttributes(
    "div",
    "favorite-small"
  );
  let mailFavoriteSmall = createElmentWithAttributes("img", "", [
    { key: "src", value: "/assets/images/star.png" },
    { key: "alt", value: "star-img" },
  ]);

  let mailReadLabel = createElmentWithAttributes("img", "active-mail", [
    { key: "src", value: "/assets/images/activee-mail.png" },
    {
      key: "alt",
      value: "point-img",
    },
  ]);

  mailCecksDev.appendChild(mailCheckbox);
  mailCecksDev.appendChild(mailFavorite);

  !mail.isRead && mailCecksDev.appendChild(mailReadLabel);
  mailMainInfo.appendChild(mailCecksDev);

  let mailSender = createElmentWithAttributes("p", "name", [], mail.name);

  let mailTitle = createElmentWithAttributes("p", "title", [], mail.title);
  let mailDate = createElmentWithAttributes("p", "date", [], mail.date);

  let mailAttachment =
    mail.attachment &&
    createElmentWithAttributes("div", "attachments-container");
  let mailAttachmentImg =
    mail.attachment &&
    createElmentWithAttributes("img", "attachments", [
      { key: "src", value: mail.attachment },
      {
        key: "alt",
        value: "atatchment",
      },
    ]);
  mailMainInfo.appendChild(mailSender);
  mailMainInfo.appendChild(mailTitle);
  mailMainInfo.appendChild(mailDate);
  mailFavoriteSmallContainer.appendChild(mailFavoriteSmall);
  mailMainInfo.appendChild(mailFavoriteSmallContainer);
  mailMainInfo.appendChild(mailCheckboxSmall);

  mail.attachment && mailAttachment.appendChild(mailAttachmentImg);
  mail.attachment && mailMainInfo.appendChild(mailAttachment);

  mailMainInfoContatiner.appendChild(mailMainInfo);

  mailMainInfoContatiner.addEventListener("click", () => {
    openEmailHandler(mailId, mail.id);
  });

  let mailInfoBodyContainer = createElmentWithAttributes("div", "", [
    { key: "id", value: mailId },
  ]);
  mailInfoBodyContainer.appendChild(mailMainInfoContatiner);
  return mailInfoBodyContainer;
}

function openEmailHandler(mailId, id) {
  let mailBody = document.getElementById("mail-view-container");
  mailBody && mailBody.remove();

  let newActiveMail = document.getElementById(mailId);
  let currentActiveMail = document.getElementById(openedMail);
  currentActiveMail && currentActiveMail.classList.remove("current-open-mail");

  currentActiveMail &&
    currentActiveMail
      .getElementsByClassName("mail-checkbox")[0]
      .removeAttribute("checked");

  currentActiveMail &&
    currentActiveMail
      .getElementsByClassName("mail-checkbox-small")[0]
      .removeAttribute("checked");

  newActiveMail.classList.add("current-open-mail");
  newActiveMail
    .getElementsByClassName("mail-checkbox")[0]
    .setAttribute("checked", true);
  newActiveMail
    .getElementsByClassName("mail-checkbox-small")[0]
    .setAttribute("checked", true);
  openedMail = mailId;

  let filtersForward = document.getElementById("filters-forward-icon");
  filtersForward.className = "filters-forward-icon-show";
  let filtersReply = document.getElementById("filters-reply-icon");
  filtersReply.className = "filters-reply-icon-show";

  showEmailContentHandler(mailId, id);
}

function showEmailContentHandler(mailId, id) {
  let mailsListContainer = document.getElementById("mails-list-container");
  let activeMailContainer = document.getElementById(mailId);
  activeMailContainer.classList.add("all-mail-content-container");
  let mailContentContainer = document.getElementById("mail-content");
  let mailData = emailsData.inbox.emails.filter((mail) => {
    return mail.id === id;
  })[0];

  let mailContentHeader = createElmentWithAttributes(
    "div",
    "mail-content-header"
  );
  let mailContentTitle = createElmentWithAttributes(
    "div",
    "mail-content-title"
  );

  mailContentTitle.innerText = mailData.title;

  mailContentHeader.appendChild(mailContentTitle);

  let mailTitleActions = createElmentWithAttributes(
    "div",
    "mail-title-actions"
  );

  let mailTitlePrint = createElmentWithAttributes("img", "", [
    { key: "src", value: "/assets/images/print.png" },
    { key: "alt", value: "print-img" },
  ]);

  let mailTitleDownload = createElmentWithAttributes("img", "", [
    { key: "src", value: "/assets/images/download.png" },
    { key: "alt", value: "download-img" },
  ]);

  let mailTitleClose = createElmentWithAttributes("img", "", [
    { key: "src", value: "/assets/images/close.png" },
    { key: "alt", value: "close-img" },
  ]);

  mailTitleClose.addEventListener("click", closeMailHandler);

  mailTitleActions.appendChild(mailTitlePrint);
  mailTitleActions.appendChild(mailTitleDownload);
  mailTitleActions.appendChild(mailTitleClose);
  mailContentHeader.appendChild(mailTitleActions);

  let mailContentBody = createElmentWithAttributes("div", "mail-content-body");

  let mailContentSenderActions = createElmentWithAttributes(
    "div",
    "mail-content-sender-actions"
  );
  let mailContentMail = createElmentWithAttributes("div", "mail-content-mail");
  mailContentMail.innerText = mailData.mail;

  let mailContentActions = createElmentWithAttributes(
    "div",
    "mail-content-actions"
  );

  let mailConForward = createElmentWithAttributes("img", "", [
    { key: "src", value: "/assets/images/forward.png" },
    { key: "alt", value: "forward-img" },
  ]);
  let mailConReply = createElmentWithAttributes("img", "", [
    { key: "src", value: "/assets/images/reply.png" },
    { key: "alt", value: "reply-img" },
  ]);
  let mailConMenu = createElmentWithAttributes("img", "", [
    { key: "src", value: "/assets/images/hor-menu-icon.png" },
    { key: "alt", value: "menu-img" },
  ]);

  mailContentActions.appendChild(mailConForward);
  mailContentActions.appendChild(mailConReply);
  mailContentActions.appendChild(mailConMenu);
  mailContentSenderActions.appendChild(mailContentMail);
  mailContentSenderActions.appendChild(mailContentActions);
  mailContentBody.appendChild(mailContentSenderActions);

  let mailContentMailTime = createElmentWithAttributes(
    "div",
    "mail-content-time"
  );
  mailContentMailTime.innerText = `${mailData.date} ${mailData.time}`;
  mailContentBody.appendChild(mailContentMailTime);

  let mailAttachmentContainer = createElmentWithAttributes(
    "div",
    "attachment-container"
  );

  mailAttachmentContainer.innerHTML = mailData.attachment
    ? `<img src=${mailData.attachment} alt="attachment" class='mail-content-attach' />`
    : null;

  mailContentBody.appendChild(mailAttachmentContainer);

  let mailContainer = createElmentWithAttributes("div", "mail-content", [
    { key: "id", value: "mail-view-container" },
  ]);
  mailContainer.appendChild(mailContentHeader);
  mailContainer.appendChild(mailContentBody);
  if (window.screen.width >= 992) {
    mailsListContainer.className = "mail-list-opened-mail";

    mailContentContainer.appendChild(mailContainer);
  } else {
    activeMailContainer.appendChild(mailContainer);
  }
}

function closeMailHandler() {
  let currentActiveMail = document.getElementById(openedMail);
  currentActiveMail && currentActiveMail.classList.remove("current-open-mail");
  currentActiveMail &&
    currentActiveMail
      .getElementsByClassName("mail-checkbox")[0]
      .removeAttribute("checked");

  currentActiveMail &&
    currentActiveMail
      .getElementsByClassName("mail-checkbox-small")[0]
      .removeAttribute("checked");
  let mailsListContainer = document.getElementById("mails-list-container");
  mailsListContainer.className = "mail-list-titles";
  let filtersForward = document.getElementById("filters-forward-icon");
  filtersForward.className = "filters-forward-icon";
  let filtersReply = document.getElementById("filters-reply-icon");
  filtersReply.className = "filters-reply-icon";

  let mailBody = document.getElementById("mail-view-container");
  mailBody.remove();
  openedMail = null;
}

function mapMailsToCompments() {
  let mailsList = document.getElementById("mails-list");

  inboxMails.forEach((mail) => {
    let mailComponent = mailComponentCreator(mail);
    mailsList.appendChild(mailComponent);
  });
}

function checkInboxCount() {
  let inboxLi = document.getElementById("side-inbox-box");
  let inboxCount = document.getElementById("mail-box-count");
  let unReadMailsCount = emailsData.inbox.emails.filter((mail) => {
    return mail.isRead === false;
  });

  if (unReadMailsCount.length > 0) {
    inboxCount.innerText = unReadMailsCount.length;
    inboxLi.className = "mail-box-count-mails";
    inboxCount.className = "visible-count";
  }
}

let sideMenuBtn = document.getElementById("side-menu-btn");

sideMenuBtn.addEventListener("click", toggleSideMenuHandler);

function toggleSideMenuHandler() {
  let sideBar = document.getElementById("side-bar");
  if (!sideBar.classList.contains("sid-bar-show")) {
    sideBar.classList.add("sid-bar-show");
    sideMenuBtn.setAttribute("src", "/assets/images/menu-btn-opened.png");
  } else {
    sideBar.classList.remove("sid-bar-show");
    sideMenuBtn.setAttribute("src", "/assets/images/menu-btn-closed.png");
  }
}

let actionsMenuBtn = document.getElementById("actions-menu-icon");

actionsMenuBtn.addEventListener("click", showActionsMenuHandler);
function showActionsMenuHandler() {
  let actionsMenu = document.getElementById("actions-menu");
  if (!actionsMenu.classList.contains("nav-icons-ul-show")) {
    actionsMenu.classList.add("nav-icons-ul-show");
  } else {
    actionsMenu.classList.remove("nav-icons-ul-show");
  }
}
greateUser();
checkForNewMailBoxes();
mapMailsToCompments();
checkInboxCount();
