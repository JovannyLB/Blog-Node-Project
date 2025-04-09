// Post creation modal
const createPostModal = document.querySelector("#createPostModal");

function toggleCreateModal() {
  createPostModal.classList.toggle("post-modal-container-show");
}

if (createPostModal.dataset.editing === "true") {
  toggleCreateModal();

  document.querySelector("#cancelPostModal").addEventListener("click", function () {
    createPostModal.querySelector("form").action = this.dataset.action;
    createPostModal.querySelector("form").submit();
  });
} else {
  document.querySelector("#cancelPostModal").addEventListener("click", toggleCreateModal);
}

document.querySelector("#newPostButton").addEventListener("click", toggleCreateModal);

// Post date setter
function setPostDate(postButtonDate) {
  const datePoster = postButtonDate.dataset.dateposted.split(" ");

  const dayPosted = parseInt(datePoster[0]);
  const monthPosted = parseInt(datePoster[1]);
  const yearPosted = parseInt(datePoster[2]);

  const currentDate = new Date();

  function checkForPlural(number) {
    if (number !== 1) {
      return "s";
    } else {
      return "";
    }
  }

  if (yearPosted !== currentDate.getFullYear()) {
    let numberOfYears = currentDate.getFullYear() - yearPosted;

    postButtonDate.textContent = `${numberOfYears} year${checkForPlural(numberOfYears)} ago`;
  } else if (monthPosted !== currentDate.getMonth()) {
    let numberOfMonths = currentDate.getMonth() - monthPosted;

    postButtonDate.textContent = `${numberOfMonths} month${checkForPlural(numberOfMonths)} ago`;
  } else if (dayPosted !== currentDate.getDay()) {
    let numberOfDays = currentDate.getDay() - dayPosted;

    postButtonDate.textContent = `${numberOfDays} day${checkForPlural(numberOfDays)} ago`;
  } else {
    postButtonDate.textContent = "Today";
  }
}

document.querySelectorAll("#postDate").forEach(setPostDate);

// Post button
const allPostButtonForms = document.querySelectorAll("#postButtonForm");

function actionToSubmit(form, button) {
  form.action = button.dataset.action;
  form.submit();
}

allPostButtonForms.forEach((postButtonForm) => {
  postButtonForm.querySelector("#postButton").addEventListener("click", function () {
    actionToSubmit(postButtonForm, this);
  });

  postButtonForm.querySelector("#editButton").addEventListener("click", function () {
    actionToSubmit(postButtonForm, this);
  });

  postButtonForm.querySelector("#deleteButton").addEventListener("click", function () {
    actionToSubmit(postButtonForm, this);
  });
});

document.querySelector(".post-selected")?.scrollIntoView({ behavior: "auto", inline: "start" });
