document.addEventListener('DOMContentLoaded', function() {
  //Ticket Button
  viewButton = document.querySelectorAll('.view-ticket');
  
  document.querySelectorAll('.table tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      // Get the data from the clicked row
      const columns = row.getElementsByTagName('td');
      const firstName = columns[1].textContent;
      const lastName = columns[2].textContent;

      const status = document.getElementById("status");
      //console.log(status[0].textContent);
      const animalArray = [];
      for (var i = 0; i < status.length; i++) {
        animalArray.push(status[i].textContent);
      }
      // Do something with the data (e.g., display in an alert)
      //alert(`Name: ${firstName} ${lastName}\nEmail: ${animalArray}`);
    });
  });

  viewButton.forEach(function(button){
    button.addEventListener('click', function(){
      document.querySelectorAll('tr').forEach(row => {
        row.classList.remove('table-active');
      });

      let row       = this.parentElement.parentElement;
      const ticketNo  = row.getElementsByTagName('th');
      const columns   = row.getElementsByTagName('td');
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
      
      modalTitle.innerHTML = ticketNo[0].textContent + " ["+ textContentArray.join("/") +"]";
      changeModalHeaderColor(columns[6].textContent.toLowerCase());
      category.value    = columns[5].textContent;
      status.value      = textContentArray.join("/");
      title.value       = columns[0].textContent;
      dateCreated.value = columns[3].textContent;
      targetDate.value  = columns[4].textContent;
      requestedBy.value = columns[1].textContent;
      assignedTo.value  = 'IT Department';
      department.value  = columns[2].textContent;
      
      



    });
    
    
    
  });

});


function changeModalHeaderColor(status){
  let modalHeader = document.getElementById('modal-header');
  modalHeader.classList.remove('bg-warning','bg-success','bg-success','bg-danger');
  
  let fstatus       = document.getElementById('field-status');
  fstatus.classList.remove('text-bg-warning','text-bg-secondary','text-bg-success','text-bg-danger')
      
  switch (status) {
    case 'ongoing':
      console.log(status);
      modalHeader.classList.add('bg-warning');
      fstatus.classList.add('text-bg-warning');
      let btnProcess
      break;
    case 'on queue':
      console.log(status);
      modalHeader.classList.add('bg-secondary');
      fstatus.classList.add('text-bg-secondary');
      break;
    case 'completed':
      console.log(status);
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