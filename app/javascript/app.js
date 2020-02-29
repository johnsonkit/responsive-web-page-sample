(function () {
  /**
   * Local variable
   */
  const INITIAL_NUM_OF_ARTICLE = 10;
  const INCREASEMENTAL_ARTICLE = 10;
  const IMAGE_DOMAIN = './images';
  
  // Dev
  // const FETCH_DATA_API_URL = 'http://localhost:3003/articles';
  // Production
  const FETCH_DATA_API_URL = 'https://learn.accountingcpd.net/ACPD/API/Test/SampleObject';
  let initialIdxOfArticle = INITIAL_NUM_OF_ARTICLE;
  let DATA;
  let activeArticle;

  /**
   * Helper
   */
  const toArray = (list) => {
    return Array.prototype.slice.apply(list);
  }

  const $$ = (selector, target) => {
    return toArray((target||document).querySelectorAll(selector));
  }

  const render = (html, dom) => {
    dom.innerHTML = html;
  }

  const loopArray = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      callback(el);
    }
  }

  /**
   * Debug
   */
  const checkState = () => {
    console.log({
      'initialIdxOfArticle': initialIdxOfArticle,
      'activeArticle.length': activeArticle.length,
      'INCREASEMENTAL_ARTICLE': INCREASEMENTAL_ARTICLE,
      'activeArticle': activeArticle
    });
  }

  /**
  * Fetch Data
  */
  fetch(FETCH_DATA_API_URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // cacahed the data
      DATA = data;
      activeArticle = DATA;
      firstTimeRenderArticles();
      console.log('Fetch data successfully');
    })
    .catch(function(error) {
      console.log(error.message);
    });

 
  // activeArticle = DATA;

  /**
  * nav-icon
  */
  const navMenu = $$('.header--nav')[0];
  const headerMenuIcon = $$('.header--nav__icon')[0];

  const toggleMenu = () => {
    navMenu.classList.toggle('active');
  }
  headerMenuIcon.addEventListener('click', toggleMenu);

  /**
   * Article
   */
  const articleListEl = $$('.article--list')[0];

  const renderArticles = (array) => {
    return array.map((el, idx) => {
      const DT_IMG = el.imageSrc;
      const [ IMG_NAME, IMG_EXT ] = DT_IMG.split('.');
      const MB_IMG = [ IMG_NAME, '@2x.', IMG_EXT].join('');
      
      return `
        <li class="article" data-type="${el.type}" data-id="${idx}" data-hide="true">
            <div class="article--img">
                <picture>
                    <source media='(min-width: 1024px)' srcset='${IMAGE_DOMAIN}/${DT_IMG}' />
                    <img src='${IMAGE_DOMAIN}/${MB_IMG}' alt="${el.altText}" />
                </picture>
                <span class="article--img__ribbon">${el.type}</span>
            </div>
            <div class="article--text">
                <h3 class="article--text__title">${el.title}</h3>
                <p class="article--text__desc">${el.description}</p>
                <p class="article--text__price"><strong>Price:</strong> £${el.price}</p>
            </div>
        </li>
      `
    }).join('');
  }

  const unhideArticle = (startIdx, endIdx) => {
    console.log(`unhideArticle(), articleStartIdx: ${startIdx}, articleEndIdx: ${endIdx}`);
    let showArticleEls = $$(`.article`).slice(startIdx, endIdx);
    loopArray(showArticleEls, (el) => {
      el.removeAttribute('data-hide');
    });
  }

  const firstTimeRenderArticles = () => {
    render(renderArticles(DATA), articleListEl);
    unhideArticle(0 , INITIAL_NUM_OF_ARTICLE);
    showOrHideLoadMoreBtn();
  }

  const showLoadMoreBtn = () => {
    $$('.js-load-article-btn')[0].removeAttribute('data-hide');
  }

  const hideLoadMoreBtn = () => {
    $$('.js-load-article-btn')[0].setAttribute('data-hide', 'true');
  }

  const showOrHideLoadMoreBtn = () => {
    (initialIdxOfArticle >= activeArticle.length) ? hideLoadMoreBtn() : showLoadMoreBtn();
  }


  // handle load-more button
  $$('.js-load-article-btn')[0].addEventListener('click', (e) => {
    // Full of the number of INCREASEMENTAL_ARTICLE
    if (initialIdxOfArticle + INCREASEMENTAL_ARTICLE < activeArticle.length) {
      unhideArticle(initialIdxOfArticle, (initialIdxOfArticle + INCREASEMENTAL_ARTICLE));
      initialIdxOfArticle += INCREASEMENTAL_ARTICLE;
      console.log(`Load ${INCREASEMENTAL_ARTICLE} articles`);
      
    } else {
      // Less than the number of INCREASEMENTAL_ARTICLE
      unhideArticle(initialIdxOfArticle , activeArticle.length);
      hideLoadMoreBtn();
      console.log(`Load remaining articles`);
    }
    // checkState();
  });



  /**
   * Filter--nav
   */
  const filterNavEl = $$('.filter--nav')[0];

  filterNavEl.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'A') {
      return;
    }
    const targetEl = e.target;
    const filterId = targetEl.getAttribute('data-id');
    const aEls = $$('.filter--nav a');
    const CLASS_NAME = 'active';

    // reset the initialIdxOfArticle
    initialIdxOfArticle = INITIAL_NUM_OF_ARTICLE;

    // remove and add the active class of the menu bar
    loopArray(aEls, (el) => {
      el.classList.remove(CLASS_NAME);
    });
    targetEl.classList.add(CLASS_NAME);

    // render the articles with the hidden styling
    if (filterId === 'all') {
      activeArticle = DATA;
    } else {
      const filteredData = DATA.filter((el) => { return el.type === filterId } );
      activeArticle = filteredData;
    }
    render(renderArticles(activeArticle), articleListEl);
    unhideArticle(0 , INITIAL_NUM_OF_ARTICLE);
    showOrHideLoadMoreBtn();

    // reset the resetSortArticleSelectEl
    resetSortArticleSelectEl();

    // checkState();

  })

  /**
   * Sorting
   */
  const sortArticleSelectEl = $$('.sorting-article--select')[0];

  const resetSortArticleSelectEl = () => {
    $$('.sorting-article--select')[0].selectedIndex = 0;
  }

  sortArticleSelectEl.addEventListener('change', (e) => {
    const target = e.target;
    const id = target.value;
    let TEMP_ACTIVE_DATA = activeArticle.slice(0); // using a new temporary array
    const SORT_BY_TITLE = 'title';
    const SORT_BY_PRICE = 'price';

    // sort by title in ascending or sort by price by using a new temporary array, then re-render the article
    if (id === SORT_BY_TITLE) {
      TEMP_ACTIVE_DATA.sort((a, b) => {
        const aTitle = a.title.toUpperCase();
        const bTitle = b.title.toUpperCase();
        let comparison = 0;

        if (aTitle > bTitle) {
          comparison = 1;
        } else if (aTitle < bTitle) {
          comparison = -1;
        }
        return comparison;
      })
      
    } else if (id === SORT_BY_PRICE) {
      TEMP_ACTIVE_DATA.sort((a , b) => {
        return a.price - b.price;
      })
    }

    render(renderArticles(TEMP_ACTIVE_DATA), articleListEl);
    unhideArticle(0 , INITIAL_NUM_OF_ARTICLE);
    showOrHideLoadMoreBtn();

    // checkState();
    
  })


}) ();

