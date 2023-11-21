function changeModalHeaderColor(status){
  let modalHeader = document.getElementById('modal-header');
  modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-danger');
  
  let fstatus       = document.getElementById('field-status');
  fstatus.classList.remove('text-bg-warning','text-bg-secondary','text-bg-success','text-bg-danger')
      
  switch (status) {
    case 'ongoing':
      modalHeader.classList.add('bg-warning');
      fstatus.classList.add('text-bg-warning');
      break;
    case 'on queue':
      modalHeader.classList.add('bg-secondary');
      fstatus.classList.add('text-bg-secondary');
      break;
    case 'completed':
      modalHeader.classList.add('bg-success');
      fstatus.classList.add('text-bg-success');
      break;  
    default:
      modalHeader.classList.add('bg-danger');
      fstatus.classList.add('text-bg-danger');
      break;                    
  } 
}


function breakByHTMLChars(statusHtml = ""){
  const tagRegex = /<[^>]*>/g;
  const resultArray = statusHtml.split(tagRegex);

  return resultArray.filter(item => item.trim() !== '');
}


function showHideTableButtons(row){
  const columns = row.getElementsByTagName('td'); 
  const status = breakByHTMLChars(columns[6].innerHTML);
  
  if(status.includes("completed")){
    removeBtns = columns[7].querySelectorAll(".edit-ticket,.delete-ticket");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });
  }
}

function showHideModalButtons(row){
  const columns = row.getElementsByTagName('td'); 
  const status = breakByHTMLChars(columns[6].innerHTML);
  const modalMain = document.querySelector('#viewTicketModal');
  
  
  if(status.includes("completed")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process,#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

   
  } else if(status.includes("On Queue")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-complete");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

    showBtns = modalMain.querySelectorAll("#modal-btn-process");
    showBtns.forEach(btnCol => {
      btnCol.classList.remove('d-none');
    });
  } else if(status.includes("ongoing")){
    removeBtns = modalMain.querySelectorAll("#modal-btn-process");
    removeBtns.forEach(btnCol => {
      btnCol.classList.add('d-none');
    });

    showBtns = modalMain.querySelectorAll("#modal-btn-complete");
    showBtns.forEach(btnCol => {
      btnCol.classList.remove('d-none');
    });
  }
}

function removeRowHightlight(){
  document.querySelectorAll('tr').forEach(row => {
    row.classList.remove('table-active');
  });
}

function initializedViewButton(button){
  button.addEventListener('click', function(){
    
  });
}

function addGlobalEventListener(type, selector, callback){
  document.addEventListener(type, e => {
    if(e.target.matches(selector)) callback(e);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  //Ticket Button
  editButton = document.querySelectorAll('.edit-ticket');
  deleteButton = document.querySelectorAll('.delete-ticket');
  modalMain = document.querySelector('#viewTicketModal');
  activeRow = null;

  // ON RECORD ClICK
  document.querySelectorAll('.table tbody tr').forEach(row => {
    showHideTableButtons(row);
    row.addEventListener('dblclick', () => {
      // Get the data from the clicked row
      const columns = row.getElementsByTagName('td');
      const firstName = columns[1].textContent;
      const lastName = columns[2].textContent;

      const status = document.getElementById("status");
      console.log(columns[0].textContent);
      const animalArray = [];
      for (var i = 0; i < status.length; i++) {
        animalArray.push(status[i].textContent);
      }
      
    });


    
  });

  // ALL VIEW BUTTONS
  addGlobalEventListener("click",'.view-ticket', e => {
    removeRowHightlight();
    let modalView = document.querySelector("#viewTicketModal")
    let myModal = new bootstrap.Modal(modalView);
    myModal.show();

    let row         = e.target.parentElement.parentElement;
    activeRow       = row;
    const ticketNo  = row.getElementsByTagName('th');
    const columns   = row.getElementsByTagName('td');
    let modalLabel  = document.getElementById('view-ticket-label');
    let modalTitle  = document.getElementById('modal-ticket-no');
    let category    = document.getElementById('category');
    let status      = document.getElementById('field-status');
    let title       = document.getElementById('request-title');
    let description = document.getElementById('ticket-description');
    let dateCreated = document.getElementById('date-created');
    let targetDate  = document.getElementById('target-date');
    let requestedBy = document.getElementById('requested-by');
    let assignedTo  = document.getElementById('assigned-to');
    let department  = document.getElementById('department');
    let completed   = document.getElementById('date-completed');
    const statusArray = ['ongoing','on queue','completed','overdue'];

    row.classList.add('table-active');
    

    textContentArray = breakByHTMLChars(columns[6].innerHTML);
    
    modalTitle.innerHTML =`${ticketNo[0].textContent} [${textContentArray.join("/")}]`;
    changeModalHeaderColor(columns[6].textContent.toLowerCase());
    category.value    = columns[5].textContent;
    status.value      = textContentArray.join("/");
    title.value       = columns[0].textContent;
    dateCreated.value = columns[3].textContent;
    targetDate.value  = columns[4].textContent;
    requestedBy.value = columns[1].textContent;
    assignedTo.value  = 'IT Department';
    department.value  = columns[2].textContent;
    
    //showHideButtons
    showHideModalButtons(row);
  });

  // ALL EDIT BUTTONS
  editButton.forEach(function(button){
    button.addEventListener('click', function(){
      removeRowHightlight();

      let row       = this.parentElement.parentElement;
      activeRow       = row;
      const ticketNo  = row.getElementsByTagName('th');
      const columns   = row.getElementsByTagName('td');
      let modalLabel  = document.getElementById('view-ticket-label');
      let modalTitle  = document.getElementById('modal-ticket-no');
      let category    = document.getElementById('category');
      let status      = document.getElementById('field-status');
      let title       = document.getElementById('request-title');
      let description = document.getElementById('ticket-description');
      let dateCreated = document.getElementById('date-created');
      let targetDate  = document.getElementById('target-date');
      let requestedBy = document.getElementById('requested-by');
      let assignedTo  = document.getElementById('assigned-to');
      let department  = document.getElementById('department');
      let completed   = document.getElementById('date-completed');
      const statusArray = ['ongoing','on queue','completed','overdue'];

      row.classList.add('table-active');
     

      textContentArray = breakByHTMLChars(columns[6].innerHTML);
      
      modalTitle.innerHTML =`${ticketNo[0].textContent} [${textContentArray.join("/")}]`;
      changeModalHeaderColor(columns[6].textContent.toLowerCase());
      category.value    = columns[5].textContent;
      status.value      = textContentArray.join("/");
      title.value       = columns[0].textContent;
      dateCreated.value = columns[3].textContent;
      targetDate.value  = columns[4].textContent;
      requestedBy.value = columns[1].textContent;
      assignedTo.value  = 'IT Department';
      department.value  = columns[2].textContent;

      showHideModalButtons(row);

    });
  });


  // ALL DELETE BUTTONS
  deleteButton.forEach(function(button){
    button.addEventListener('click', function(){
      removeRowHightlight();
      let row       = this.parentElement.parentElement;
      const modalDelete = document.querySelector("#deleteTicketModal")
      const myModal = new bootstrap.Modal(modalDelete);
      myModal.show();
      
      const confirmDelBtn = modalDelete.querySelector("#modal-btn-delete");
      confirmDelBtn.addEventListener("click", function(){
        myModal.hide();
        row.remove();        
      });
    });
  });


  // ON MODAL CLOSE
  modalMain.addEventListener("hidden.bs.modal", function(){
    activeRow.classList.remove('table-active');
    
  });

  

  // MODAL BUTTONS
  // COMPLETE TICKET BUTTON
  addGlobalEventListener("click",'#modal-btn-complete', e => {
    const tblRow   = document.querySelector("#table-completed");
    const tblBody  = tblRow.querySelector('tbody');
    const ticketNo = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let newRow     = tblBody.insertRow();

    let col1 = newRow.insertCell(0);
    let col2 = newRow.insertCell(1);
    let col3 = newRow.insertCell(2);
    let col4 = newRow.insertCell(3);
    let col5 = newRow.insertCell(4);
    let col6 = newRow.insertCell(5);
    let col7 = newRow.insertCell(6);
    let col8 = newRow.insertCell(7);
    let col9 = newRow.insertCell(8);

    col1.outerHTML = ticketNo[0].outerHTML;
    col2.outerHTML = columns[0].outerHTML;
    col3.outerHTML = columns[1].outerHTML;
    col4.outerHTML = columns[2].outerHTML;
    col5.outerHTML = columns[3].outerHTML;
    col6.outerHTML = columns[4].outerHTML;
    col7.outerHTML = columns[5].outerHTML;
    col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-success">completed</span></td>`;
    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info view-ticket" >view</button>
                        <button class="btn btn-warning edit-ticket d-none" >Edit</button>
                        <button class="btn btn-danger delete-ticket d-none" >Delete</button>
                      </td>`;
    
    activeRow.remove();
    
  });

  // PROCESS TICKET BUTTON
  addGlobalEventListener("click",'#modal-btn-process', e => {
    const tblRow   = document.querySelector("#table-ongoing");
    const tblBody  = tblRow.querySelector('tbody');
    const ticketNo = activeRow.querySelectorAll('th');
    const columns  = activeRow.querySelectorAll('td');
    
    let newRow     = tblBody.insertRow();

    let col1 = newRow.insertCell(0);
    let col2 = newRow.insertCell(1);
    let col3 = newRow.insertCell(2);
    let col4 = newRow.insertCell(3);
    let col5 = newRow.insertCell(4);
    let col6 = newRow.insertCell(5);
    let col7 = newRow.insertCell(6);
    let col8 = newRow.insertCell(7);
    let col9 = newRow.insertCell(8);

    col1.outerHTML = ticketNo[0].outerHTML;
    col2.outerHTML = columns[0].outerHTML;
    col3.outerHTML = columns[1].outerHTML;
    col4.outerHTML = columns[2].outerHTML;
    col5.outerHTML = columns[3].outerHTML;
    col6.outerHTML = columns[4].outerHTML;
    col7.outerHTML = columns[5].outerHTML;
    col8.outerHTML = `<td class="align-middle"><span class="badge rounded-pill text-bg-warning">ongoing</span></td>`;
    col9.outerHTML = `<td class="align-middle text-center">
                        <button class="btn btn-info view-ticket" >view</button>
                        <button class="btn btn-warning edit-ticket" >Edit</button>
                        <button class="btn btn-danger delete-ticket" >Delete</button>
                      </td>`;
    
    activeRow.remove();
    
  });

});

