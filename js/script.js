const titleClickHandler = function(event){ 

    event.preventDefault();
	
    const clickedElement = this;
	
    console.log('click link - clicked element: ' + clickedElement);
    
   /* [DONE] remove class 'active' from all article links  
        a. find all links witch class active
        b. delete class activ for all found links
   */
    const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            console.log('activeLink: ' + activeLink);
            activeLink.classList.remove('active');
        }
        
  /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement ', clickedElement);   
    clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
    
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

  /* [DONE] get 'href' attribute from the clicked link */
    const hrefAttribute = clickedElement.getAttribute('href');
    console.log('hrefAttribute ', hrefAttribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector('.posts article' + hrefAttribute);
    console.log('correctArticle ' + correctArticle);
 
  /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}