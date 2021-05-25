const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorLinkRightColumn: Handlebars.compile(document.querySelector('#template-author-right-column').innerHTML)
}

const opts = {
	articleSelector: '.post',
	titleSelector: '.post-title',
	titleListSelector: '.titles',
	tagSelector: '.post-tags .list',
	authorSelector: '.post-author',
	tagsListSelector: '.tags',
	tagSizes: {
		count: 5,
		prefix: 'tag-size-'
	},
	autorsListSelector: '.authors'
};

const titleClickHandler = function(event){ 

    event.preventDefault();	
    const clickedElement = this;
    
   /* [DONE] remove class 'active' from all article links  
        a. find all links witch class active
        b. delete class activ for all found links
   */
    const activeLinks = document.querySelectorAll(opts.titleListSelector + ' a.active');

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
    const titleList = document.querySelector(opts.titleListSelector); 
    titleList.innerHTML = '';
    
    let html = '';
    /* [DONE] for each article */
    const articleList = document.querySelectorAll(opts.articleSelector  + customSelector);
	
    for(let article of articleList){
        /* get the article id */
        const articleId = article.getAttribute('id'); 
        
        /* find the title element and get the title from the title element */
        const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
        
         /* create HTML of the link */
		const linkHTMLData = {id: articleId, title: articleTitle};
		const codeHtml = templates.articleLink(linkHTMLData);
        
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

function calculateTagClass(count, params){
	
	const classNumber = Math.floor((count - params.min)/(params.max - params.min) * (opts.tagSizes.count - 1) + 1);
	return opts.tagSizes.prefix + classNumber;
}

function calculateTagsParams(tags){
	const params = {
		min: 99999,
		max: 0
	};
	for(let tag in tags){
		if(tags.hasOwnProperty(tag)){
			params.min = Math.min(tags[tag], params.min);
			params.max = Math.max(tags[tag], params.max);
		}
	}
	return params;
}

function generateTags(){
	/* [NEW] create a new variable allTags with an empty object */
	let allTags = {}; 
	/* find all articles */
	const allArticles = document.querySelectorAll(opts.articleSelector); 

  /* START LOOP: for every article: */
	for(let article of allArticles){ 
		/* find tags wrapper */ 													
		const tagsWrapper = article.querySelector(opts.tagSelector);  
		/* make html variable with empty string */
		let html = '';
		/* get tags from data-tags attribute */
		const tags = article.getAttribute('data-tags'); 
		/* split tags into array */
		const tagsList = tags.split(' '); 	
		/* START LOOP: for each tag */
		for(let tag of tagsList){   
		  /* generate HTML of the link */
			const objTag = {tagName: tag};
			const tagLink = templates.tagLink(objTag);
		  /* add generated code to html variable */
			html = html + tagLink; 
	/* [NEW] check if this link is NOT already in allTags */
		  if(!allTags[tag]){ 
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
		const tagsInRightColumn = document.querySelector(opts.tagsListSelector);
	/* [NEW] create variable for all links HTML code */
	const allTagsData = {tags: []};
	const tagsParams = calculateTagsParams(allTags);		
	/* [NEW] START LOOP: for each tag in allTags: */
	for(let tag in allTags){
		/* [NEW] generate code of a link and add it to allTagsHTML */
		allTagsData.tags.push({
			tag: tag,
			count: allTags[tag],
			className: calculateTagClass(allTags[tag], tagsParams)
		}); 
	} 
	tagsInRightColumn.innerHTML = templates.tagCloudLink(allTagsData); 
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
	const linksToTags = document.querySelectorAll(opts.tagSelector + ' a');
  /* START LOOP: for each link */
		for(let tag of linksToTags){ 
    /* add tagClickHandler as event listener for that link */
			tag.addEventListener('click', tagClickHandler);
		}
  /* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors(){
	/* [NEW] create a new variable allAuthors with an empty object */
	const allAuthors = {};
    /* find all articles */
	const allArticles = document.querySelectorAll(opts.articleSelector);
	/* for every article: */
	for(let article of allArticles){
	    /* find author wrapper */ 
	    const postAuthor = article.querySelector(opts.authorSelector); 
	    /* get authors from data-author attribute */
	    const author = article.getAttribute('data-author'); 
	    /* separate firstname and lastname */
	    const separate = author.replace(' ','-'); 
		/* [NEW] */
		if(!allAuthors.hasOwnProperty(author)){
			allAuthors[author] = 1;
		} else {
			allAuthors[author]++;
		} 
	    /* generate HTML  */
		let objAuthor = {authorHref: separate, authorName: author};
		let html = templates.authorLink(objAuthor);
	    /* insert HTML of the link into the author wrapper */
	    postAuthor.innerHTML = html;
	}
	/* [NEW] */
	const authorsInRightColumn = document.querySelector(opts.autorsListSelector);
	const allAuthorsData = {authors: []};
	for(author in allAuthors){
		allAuthorsData.authors.push({
			href: author.replace(' ','-'),
			author: author,
			count: allAuthors[author]
		});
	} 
	authorsInRightColumn.innerHTML = templates.authorLinkRightColumn(allAuthorsData);
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
	const linksToAuthors = document.querySelectorAll(opts.authorSelector + ' a');
  /* for each link */
		for(let link of linksToAuthors){ 
    /* add authorClickHandler as event listener for that link */
			link.addEventListener('click', authorClickHandler);
	}
}

addClickListenersToAuthors();