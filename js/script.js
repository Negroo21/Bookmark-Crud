var bookmarkName = document.getElementById('siteName');
var bookmarkURL = document.getElementById('siteURL');
var submitBtn = document.getElementById('submitBtn');
var tableContent = document.getElementById("tableContent");
var closeModelbtn = document.getElementById('closeModelbtn');
var boxModal =document.getElementById('exampleModal');
var validationModal = new bootstrap.Modal(boxModal);
var bookmarks;

if(localStorage.getItem("allBookmarks") == null) {
    bookmarks = []
}
else{
    bookmarks=JSON.parse(localStorage.getItem('allBookmarks'));
    displayBookmark()
}

function addBookmark(){
   if(bookmarkName.classList.contains('is-valid') && bookmarkURL.classList.contains('is-valid')){
    var bookmark ={
        name:bookmarkName.value,
        url:bookmarkURL.value  
    }
    bookmarks.push(bookmark);
    localStorage.setItem('allBookmarks' , JSON.stringify(bookmarks))
    displayBookmark()

    clearBookmark()
    validationModal.hide();
   }
   else{
    validationModal.show();
   }

    
}

function clearBookmark(){
    bookmarkName.value = null
    bookmarkURL.value = null
}

function displayBookmark(){
    var newBookmark ='';
    for(var i=0 ; i< bookmarks.length;i++){
        newBookmark+=`
            <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].name}</td>              
                <td><button onclick="openPage(${i})" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                <td><button onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
            </tr>`
}

document.getElementById('tableContent').innerHTML=newBookmark;

 }

 function openPage(index){
    var bookmark = bookmarks[index];
    window.open(bookmark.url, '_blank');
 }

 function deleteItem(index){
    bookmarks.splice(index, 1);
    localStorage.setItem('allBookmarks' , JSON.stringify(bookmarks));
    displayBookmark();
   }


 function deleteBookmark(index){
  bookmarks.splice(index, 1);
  displayBookmark();
  localStorage.setItem('allBookmarks' , JSON.stringify(bookmarks));
 }


 function validateAllBookmarks(elem){
  
  var regex={
    siteName:/^[A-Z][a-z]{3,5}$/,
    siteURL:/^https?:\/\//g
  }

  if(regex[elem.id].test(elem.value)==true){
    elem.classList.add('is-valid')
    elem.classList.remove('is-invalid')
 }
else{
    elem.classList.add('is-invalid')
    elem.classList.remove('is-valid')
}
 }


 
 

