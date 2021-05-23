const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
		optTagSelector = '.post-tags .list',
		optAuthorSelector = '.post-author',
		optTagsListSelector = '.tags';

const titleClickHandler = function(event){ 

    event.preventDefault();
	
    const clickedElement = this;

    
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
        
function generateTitleLinks(customSelector = ''){
    /* [DONE] remove contents of titleList */ 
    const titleList = document.querySelector(optTitleListSelector); 
    titleList.innerHTML = '';
    
    let html = '';
    /* [DONE] for each article */
    const articleList = document.querySelectorAll(optArticleSelector  + customSelector);
	
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

function generateTags(){
	/* [NEW] create a new variable allTags with an empty array */
	//const allTags = [];
	/* [NEW] create a new variable allTags with an empty object */
	let allTags = {}; 
	/* find all articles */
	const allArticles = document.querySelectorAll(optArticleSelector); //.post

  /* START LOOP: for every article: */
	for(let article of allArticles){ 
		/* find tags wrapper */ 													
		const tagsWrapper = article.querySelector(optTagSelector);  //.post-tags .list
		/* make html variable with empty string */
		let html = '';
		/* get tags from data-tags attribute */
		const tags = article.getAttribute('data-tags'); 
		/* split tags into array */
		const tagsList = tags.split(' '); 	
		/* START LOOP: for each tag */
		for(let tag of tagsList){   
		  /* generate HTML of the link */
			const tagLink =  '<li><a href="#tag-'+ tag +'">' + tag + '</a></li>';
		  /* add generated code to html variable */
			html = html + tagLink; 
	/* [NEW] check if this link is NOT already in allTags */
		//if(allTags.indexOf(tagLink) == -1){
		  if(!allTags[tag]){ 
		    /* [NEW] add generated code to allTags array */
		    //allTags.push(tagLink);
			/* [NEW] add tag to allTags object */
			allTags[tag] = 1;
			} else{
				allTags[tag]++; 
			}
		/* END LOOP: for each tag */
		}
		/* insert HTML of all the links into the tags wrapper */
		tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
	} 
  /* [NEW] find list of tags in right column */
		const tagsInRightColumn = document.querySelector(optTagsListSelector);
		/* [NEW] add html from allTags to tagList */
		//tagsInRightColumn.innerHTML = allTags.join(' ');
	/* [NEW] create variable for all links HTML code */
	let allTagsHtml = '';
	/* [NEW] START LOOP: for each tag in allTags: */
	for(let tag in allTags){
		/* [NEW] generate code of a link and add it to allTagsHTML */
		allTagsHtml += '<li><a href="#tag-'+ tag +'">' + tag + '</a> <span>(' + allTags[tag] + ') </span></li>';
	}
	tagsInRightColumn.innerHTML = allTagsHtml;
}
generateTags();

function tagClickHandler(event){ 																						
  /* prevent default action for this event */
	event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute('href');  										
  /* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace('#tag-',''); 													
  /* find all tag links with class active */
	const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
	for(let tagActiveLink of tagActiveLinks){
    /* remove class active */
		tagActiveLink.classList.remove('active');
  /* END LOOP: for each active tag link */
	}
  /* find all tag links with "href" attribute equal to the "href" constant */
	const tagLinks = document.querySelectorAll('a[href = "' + href + '"]'); 
  /* START LOOP: for each found tag link */
	for(let tagLink of tagLinks){
    /* add class active */
		tagLink.classList.add('active');
	}
  /* END LOOP: for each found tag link */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */
	const linksToTags = document.querySelectorAll(optTagSelector + ' a');
  /* START LOOP: for each link */
		for(let tag of linksToTags){ 
    /* add tagClickHandler as event listener for that link */
			tag.addEventListener('click', tagClickHandler);
		}
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){
    /* find all articles */
	const allArticles = document.querySelectorAll(optArticleSelector);
	/* for every article: */
	for(let article of allArticles){
	    /* find author wrapper */ 
	    const postAuthor = article.querySelector(optAuthorSelector); 
	    /* get authors from data-author attribute */
	    const author = article.getAttribute('data-author'); 
	    /* separate firstname and lastname */
	    const separate = author.replace(' ','-'); 
	    /* generate HTML  */
	    let html = '<a href="#author-' + separate +'">' + author +'</a>'; 
	    /* insert HTML of the link into the author wrapper */
	    postAuthor.innerHTML = html;
	}
}
generateAuthors();

function authorClickHandler(event){
    /* prevent default action for this event */
	 event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
	 const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
	 const href = clickedElement.getAttribute('href');							
  /* make a new constant "author" and extract author from the "href" constant */
	 const author = href.replace('#author-', '').replace('-',' ');						
  /* find all author links with class active */
     const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
	 for(let link of activeAuthorLinks){
    /* remove class active */
		link.classList.remove('active');
  /* END LOOP: for each active author link */
	 }
  /* find all author links with "href" attribute equal to the "href" constant */
	const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for(let authorLink of authorLinks){
    /* add class active */
		authorLink.classList.add('active');
    }
  /* END LOOP: for each found tag link */
    generateTitleLinks('[data-author="' + author +'"]'); 
  /* execute function "generateTitleLinks" with article selector as argument */
}
function addClickListenersToAuthors(){
  /* find all links to authors */ 
	const linksToAuthors = document.querySelectorAll(optAuthorSelector + ' a');
  /* for each link */
		for(let link of linksToAuthors){ 
    /* add authorClickHandler as event listener for that link */
			link.addEventListener('click', authorClickHandler);
	}
}

addClickListenersToAuthors();