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

const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';
        
function generateTitleLinks(){
    console.log('We are in function generateTitleLinks');
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    
    let html = '';
    /* [DONE] for each article */
    const articleList = document.querySelectorAll(optArticleSelector);
    for(let article of articleList){
        /* get the article id */
        const articleId = article.getAttribute('id'); 
        
        /* find the title element and get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        
         /* create HTML of the link */
        const codeHtml = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; 
        
        console.log(codeHtml);
        
        //titleList.innerHTML = titleList.innerHTML + codeHtml;
        
        //titleList.insertAdjacentHTML('beforeend', codeHtml);
        
        html = html + codeHtml;
    }
    
    /* insert link into titleList */
    titleList.innerHTML = html;
    
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    console.log('links: '+links);    
}
generateTitleLinks();