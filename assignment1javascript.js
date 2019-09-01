
$('#search-button').on('click', function(){
   $('#results').html('');
});
$('#search-form').submit(function(event){
	event.preventDefault();
  $('#loading-spinner').toggleClass('loader');
    let subredditname= document.querySelector('#subreddit-id').value;
    console.log(subredditname);
    
    let promise = $.ajax({
    type: 'GET',
    url: 'https://www.reddit.com/r/'+subredditname+'.json'
    });
    
    promise.then(function(threads) {
    	console.log(threads);

    	let fragment = document.createDocumentFragment();

    	console.log(threads.data.children.length);
    	for(let i=0; i<threads.data.children.length; i++){
    		console.log(threads.data.children[i].data.title);
    		console.log(threads.data.children[i].data.url);
    		let titleText=document.createElement('a');
    		titleText.target="_blank";
    		titleText.innerHTML=threads.data.children[i].data.title;
    		titleText.href=threads.data.children[i].data.url;
    		let authorText=document.createElement('h5');
    		authorText.innerHTML=threads.data.children[i].data.author;
    		let scoreText=document.createElement('h5');
    		scoreText.innerHTML=threads.data.children[i].data.score;
    		fragment.append(titleText);
    		fragment.append(authorText);
    		fragment.append(scoreText);
    	}

    	$('#loading-spinner').toggleClass('loader');
    	$('#results').html(fragment);
   }); 	

});