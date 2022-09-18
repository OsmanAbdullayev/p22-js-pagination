// SELECTORS

// INITIALIZE THE API

fetch("https://rickandmortyapi.com/api/character/?page=i")
	.then((response) => response.json())
	.then((data) => {
		const paginatedList = document.getElementById("paginated-list");
		const paginationNumbers = document.getElementById("pagination-numbers");
		const nextButton = document.getElementById("next-button");
		const prevButton = document.getElementById("prev-button");
		data.results.forEach((item) => {
			const characterName = item.name;
			const characterImage = item.image;

			var li = document.createElement("li");
			var nameBox = document.createElement("div");
			nameBox.className = "nameBox";
			var imageBox = document.createElement("div");
			imageBox.className = "imageBox";
			li.appendChild(nameBox);
			li.appendChild(imageBox);
			var p = document.createElement("p");
			p.innerHTML = characterName;
			nameBox.appendChild(p);
			var img = document.createElement("img");
			img.setAttribute("src", characterImage);
			imageBox.appendChild(img);
			paginatedList.appendChild(li);

			// console.log(paginatedList)
		});
		var listItems = document.querySelectorAll("li");

		// VARIABLES

		const paginationLimit = 5;
		const pageCount = Math.ceil(listItems.length / paginationLimit);
		var currentPage;

		// FUNCTIONS
		// creating a function that adds a page number (index) equal to input (index)
		const appendPageNumber = (index) => {
			const pageNumber = document.createElement("button");
			pageNumber.className = "pagination-number";
			pageNumber.innerHTML = index;
			pageNumber.setAttribute("page-index", index);
			pageNumber.setAttribute("aria-label", "Page" + index);
			paginationNumbers.appendChild(pageNumber);
		};

		// creating a function with a loop so that the index is iterated till the pageCount;

		const getPaginationNumbers = () => {
			for (let i = 1; i <= pageCount; i++) {
				appendPageNumber(i);
			}
		};

		const setCurrentPage = (pageNum) => {
			currentPage = pageNum;

			handleActivePageNumber();
			handlePageButtonsStatus();

			const prevRange = (pageNum - 1) * paginationLimit;
			const currRange = pageNum * paginationLimit;

			// WORKING WITH API
            
            paginatedList.innerHTML = ("");
            data.results.forEach((item, index) => {
						
						if (index >= prevRange && index < currRange) {
							const characterName = item.name;
							const characterImage = item.image;

							var li = document.createElement("li");
							var nameBox = document.createElement("div");
							nameBox.className = "nameBox";
							var imageBox = document.createElement("div");
							imageBox.className = "imageBox";
							li.appendChild(nameBox);
							li.appendChild(imageBox);
							var p = document.createElement("p");
							p.innerHTML = characterName;
							nameBox.appendChild(p);
							var img = document.createElement("img");
							img.setAttribute("src", characterImage);
							imageBox.appendChild(img);
							paginatedList.appendChild(li);
						}
					});
                    console.log(paginatedList)
				

			// listItems.forEach((item, index) => {
			// 	item.classList.add("hidden");
			// 	if (index >= prevRange && index < currRange) {
			// 		item.classList.remove("hidden");
			// 	}
			// });
		};

		// SETTING ACTIVE PAGE NUMBER

		const handleActivePageNumber = () => {
			document.querySelectorAll(".pagination-number").forEach((button) => {
				button.classList.remove("active");

				const pageIndex = Number(button.getAttribute("page-index"));
				if (pageIndex === currentPage) {
					button.classList.add("active");
				}
			});
		};

		// DISABLING NEXT AND PREVIOUS ON THE LAST AND FIRST PAGES

		const disableButton = (button) => {
			button.classList.add("disabled");
			button.setAttribute("disabled", true);
		};

		const enableButton = (button) => {
			button.classList.remove("disabled");
			button.removeAttribute("disabled");
		};

		const handlePageButtonsStatus = () => {
			if (currentPage === 1) {
				disableButton(prevButton);
			} else {
				enableButton(prevButton);
			}

			if (pageCount === currentPage) {
				disableButton(nextButton);
			} else {
				enableButton(nextButton);
			}
		};

        
            getPaginationNumbers();
            setCurrentPage(1);
    
            prevButton.addEventListener("click", () => {
                setCurrentPage(currentPage - 1);
            });
    
            nextButton.addEventListener("click", () => {
                setCurrentPage(currentPage + 1);
            });
    
            document.querySelectorAll(".pagination-number").forEach((button) => {
                const pageIndex = Number(button.getAttribute("page-index"));
    
                if (pageIndex) {
                    button.addEventListener("click", () => {
                        setCurrentPage(pageIndex);
                    });
                }
            });
        
		// EVENT LISTENERS
	});
    