const student = document.getElementById('student');
const addStd = document.getElementById('addStd');
const addPro = document.getElementById('addPro');
const name = document.getElementById('name');
const webLink = document.getElementById('webLink');
const gitLink = document.getElementById('gitLink');
const imgUrl = document.getElementById('imgUrl');
const description = document.getElementById('description');
const nameError = document.getElementById('nameError');
const descriptionError = document.getElementById('descriptionError');
const gitError = document.getElementById('gitError');
const webError = document.getElementById('webError');
const imgError = document.getElementById('imgError');
const addProjectButton = document.getElementById('addproj');
const URL = window.location.href;
const splitUrl = URL.split('/');
const cohortId = splitUrl[splitUrl.length - 2];

const students = () => {
  student.classList.toggle('sectionstd--visible');
};

const addProject = () => {
  addPro.classList.toggle('sectionAddPro--visible');
};

const addStudents = () => {
  addStd.classList.toggle('sectionAddstd--visible');
};

const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
};

const checkName = () => {
  if (!name.value) {
    displayErr(nameError, 'Project Name is required');
  } else {
    displayErr(nameError, '');
    return true;
  }
};

const checkDescription = () => {
  if (!description.value) {
    displayErr(descriptionError, 'Project Description is required');
  } else {
    displayErr(descriptionError, '');
    return true;
  }
};
const checkGitLink = () => {
  if (!gitLink.value) {
    displayErr(gitError, 'Project Github Link is required');
  } else {
    displayErr(gitError, '');
    return true;
  }
};
const checkWebLink = () => {
  if (!webLink.value) {
    displayErr(webError, 'Project Website Link is required');
  } else {
    displayErr(webError, '');
    return true;
  }
};
const checkImage = () => {
  if (!imgUrl.value) {
    displayErr(imgError, 'Project Image is required');
  } else {
    displayErr(imgError, '');
    return true;
  }
};

name.addEventListener('focusout', checkName);
description.addEventListener('focusout', checkDescription);
gitLink.addEventListener('focusout', checkGitLink);
webLink.addEventListener('focusout', checkWebLink);
imgUrl.addEventListener('focusout', checkImage);

addProjectButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (checkName() && checkDescription() && checkGitLink() && checkWebLink() && checkImage()) {
    const nameVal = name.value;
    const descriptionVal = description.value;
    const webLinkVal = webLink.value;
    const gitLinkVal = gitLink.value;
    const imgUrlVal = imgUrl.value;

    const newProject = {
      nameVal,
      descriptionVal,
      webLinkVal,
      gitLinkVal,
      imgUrlVal,
      cohortId,
    };

    fetch(`/admin/community/${cohortId}/newProject`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then((response) => { response.json(); })
      .then((response) => {
        swal('Good job!', 'Add Successfully!', 'success').then((value) => {
          window.location = `/admin/community/${cohortId}/projects`;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});