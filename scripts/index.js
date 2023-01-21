const state = {
    taskList: [],
  };
  
  // dom manipulations
  const taskModal = document.querySelector(".task__modal__body");
  const taskContents = document.querySelector(".task__contents");
  
  const htmlTaskContent = ({ id, title, description, type, url }) => `
      
        
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
      <div class='card shadow-sm task__card'>
        <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
          <button type='button' class='btn btn-outline-info mr-2' name=${id}>
            <i class='fas fa-pencil-alt' name=${id}></i>
          </button>
          <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="DeleteTask.apply(this, arguments)">
            <i class='fas fa-trash-alt' name=${id}></i>
          </button>
        </div>
        <div class='card-body'>
          ${
            url
              ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
              : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://st.depositphotos.com/1000558/53737/v/450/depositphotos_537370102-stock-illustration-image-photo-sign-symbol-template.jpg" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
          }
          <h4 class='task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted' data-gram_editor='false'>
            ${description}
          </p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class='badge bg-primary m-1'>${type}</span>
          </div>
        </div>
        <div class='card-footer'>
          <button 
          type='button' 
          class='btn btn-outline-primary float-right' 
          data-bs-toggle='modal'
          data-bs-target='#showTask'
          id=${id}
          onclick='openTask.apply(this, arguments)'>
            Open Task
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Dynamic modals on our home page/ui
  const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
  <div id = ${id}>
  ${
    url
      ? `<img width='100%' src=${url} alt='card image here  class='img-fluid place__holder__image mb-3'/>`
      : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"src="https://st.depositphotos.com/1000558/53737/v/450/depositphotos_537370102-stock-illustration-image-photo-sign-symbol-template.jpg" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
  }
  <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
  <h2 class="my-3">${title}</h2>
  <p class='lead'>${description}</p>
  </div>`;
  };
  
//   updating our local Storage
  
  const updateLocalStorage = () => {
    localStorage.setItem(
      "task",
      JSON.stringify({
        tasks: state.taskList,
      })
    );
  };
  
  // to get data or card or modals on ur ui from local storage
  const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
  
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
    state.taskList.map((cardDate) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
  };
  
  const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageUrl").value,
      title: document.getElementById("taskTitle").value,
      type: document.getElementById("tags").value,
      description: document.getElementById("taskDescription").value,
    };
    if (input.title === "" || input.type === "" || input.description === "") {
      return alert("All the fields are manadotary");
    }
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({
        ...input,
        id,
      })
    );
  
    // updated task list - for 1st go
    state.taskList.push({ ...input, id });
  
    // update the same on localStorage too
    updateLocalStorage();
  };
  
//   open modal when user clicks
  const openTask =(e) => {
    //popping
    if(!e) e =window.event;
// find current card
    const getTask =state.taskList.find(({ id }) =>  
        id === e.target.id
  );
  taskModal.innerHTML = htmlModalContent(getTask);
  };

//   Deleting the item
const DeleteTask = (e) => {
    if(!e) e =window.event;
    const targetID = e.target.getAttribute("name");
    const type = e.target.tagName;
    const removeTask = state.taskList.filter(({id}) =>
    id !== targetID
    );
    
};

