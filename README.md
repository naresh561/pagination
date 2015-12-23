In This project i used a simple pagination technique along with searching and sorting the data.

USAGE:

1. Simply add Pagination.js to your page. 
2. add a class "searchable" or "sortable" or both to your table header.
3. add data attr to each header in such a way that the value should be a key in json data.
4. difine options object 
   ex
        options = {
    		recodsPerPage : 10, // optional by defult 10;
    		paginationType : paginationTypeObject.arrowApproach, // by defult paginationTypeObject.arrowApproach you can use paginationTypeObject.buttonApproch
    		searchURL : 'ajax/searchstudents.php', 
    		paginationURL : 'ajax/getstudentsdata.php',
    		buttonsCount : 8 // optional by default 5
    	};
    	var paginator = new Paginator(options); // create object
    	paginator.paginate(); // paginate it

Thats it magic is done... Lets began the show.
