document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#compose').addEventListener('click', compose_mail);
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archived'));

  //by default, load the 'inbox' mailbox
  load_mailbox('inbox')
})

function compose_mail(){
  document.querySelector('#mailbox_view').style.display = 'none';
  document.querySelector('#detail_view').style.display = 'none';
  document.querySelector('#compose_view').style.display = 'block';

  //clearing out the fields
  document.querySelector('#recipients').value = '';
  document.querySelector('#subject').value = '';
  document.querySelector('#body').value = '';


  //Send mails
  document.querySelector('#compose_form').addEventListener('submit', send_mails);
}

function send_mails(event){
  event.preventDefault()
  const recipients = document.querySelector('#recipients').value;
  const subject = document.querySelector('#subject').value;
  const body = document.querySelector('#body').value;

  fetch(`/emails`, {
    method: "POST",
    body: JSON.stringify({
        "recipients": recipients,
        "subject": subject,
        "body": body,
    })
  })
  .then(response => response.json())
  .then(results => {
    console.log(results);
    load_mailbox('sent')
  });
}

function load_mailbox(mailbox){
  document.querySelector('#mailbox_view').style.display = 'block';
  document.querySelector('#compose_view').style.display = 'none';
  document.querySelector('#detail_view').style.display = 'none';

  document.querySelector('#mailbox_view').innerHTML = `<h3> ${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)} </h3>`;

  //GET http request
  fetch(`emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    console.log(emails);
    emails.forEach(email => {
      console.log(email);
      const single_mail = document.createElement('div');
      single_mail.innerHTML = display_mail(email);

      //read or unread
      single_mail.className = email.read ? "read" : "unread";

      //On-click
      single_mail.addEventListener('click', function(){
        detailed_mail(email.id);
      });
      document.querySelector('#mailbox_view').append(single_mail);
    })
  })

}


function display_mail(email){
  return `
  <div class="row border border-dark border-2 rounded my-2 py-2 px-2">
     <h6 class="mr-4 " style="width:270px;" > ${email.sender} </h6>
     <h6 class="mr-4 text-muted"> ${email.subject} </h6>
     <h6 class="ml-auto text-muted small"> ${email.timestamp} </h6>
  </div>
  `;
}

function detailed_mail(id){
  fetch(`emails/${id}`)
  .then(response => response.json())
  .then(email => {
    
    console.log(email);
    document.querySelector('#detail_view').style.display = 'block';
    document.querySelector('#mailbox_view').style.display = 'none';
    document.querySelector('#compose_view').style.display = 'none';

    document.querySelector('#detail_view').innerHTML = details(email);

    //mark the email as read.
    if(!email.read){
      fetch(`emails/${id}`, {
        method:"PUT",
        body: JSON.stringify({
          read: true
        })
      })
    }

    //archive/unarchive
    const btn = document.createElement('button');
    btn.textContent = email.archived ? "unarchived" : "archived";
    btn.className = email.archived ? "btn btn-sm btn-success mt-3" : "btn btn-sm btn-danger mt-3";
    btn.addEventListener('click', function(){
      fetch(`emails/${email.id}`, {
        method: "PUT",
        body: JSON.stringify({
          archived: !email.archived
        })
      })
      .then(() => {load_mailbox('inbox')});
    })
    document.querySelector('#detail_view').append(btn);


    //Reply
    const reply = document.createElement('button');
    reply.className = "reply_btn btn-primary rounded mt-3";
    reply.textContent = 'Reply';
    reply.addEventListener('click', function(){
      compose_mail();

      document.querySelector('#recipients').value = email.sender;

      //Pre-filling the 'subject' field
      const originalSubject = email.subject;
      if(originalSubject.startsWith('Re:')){
        document.querySelector('#subject').value = originalSubject;
      }
      else{
        document.querySelector('#subject').value = `Re: ${originalSubject}`;
      }

      document.querySelector('#body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
      
    })
    const element = document.querySelector('#element');
    const parentelement = element.parentElement;

    parentelement.insertBefore(reply, element.nextSibling);

  });
}

function details(email){
  return `
  <div class="mb-3">
      <h4 class="list-item "><strong class="text-muted">From:</strong> ${email.sender} </h4>
      <h4 class="list-item "><strong class="text-muted" style="width:100px;" >To:</strong> ${email.recipients} </h4>
      <h4 class="list-item "><strong class="text-muted" style="width:100px;" >Subject:</strong> ${email.subject} </h4>
      <h4 class="list-item " id="element" ><strong class="text-muted" style="width:100px;" >time:</strong> ${email.timestamp} </h4>
      <hr>
      <p class="list-item font-size-large mb-3" style="font-size:17px;" > ${email.body} </p>
  </div>
  `;
}
