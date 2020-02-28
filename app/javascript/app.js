(function () {
  /**
   * Local variable
   */
  const INITIAL_NUM_OF_ARTICLE = 10;
  const INCREASEMENTAL_ARTICLE = 10;
  const IMAGE_DOMAIN = './images';
  const FETCH_DATA_API_URL = 'https://learn.accountingcpd.net/ACPD/API/Test/SampleObject';
  let initialArticle = INITIAL_NUM_OF_ARTICLE;
  let DATA;
  let activeData;

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
  * Fetch Data
  */
  fetch (FETCH_DATA_API_URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // cacahed the data
      DATA = data;
      activeData = DATA;
      firstTimeRenderArticles();
      console.log('Fetch data successfully');
    })
    .catch(function(error) {
      console.log(error.message);
    });

  // const DATA = [
  //   {
  //     "title": "Crime Risk New",
  //     "description": "Donec a sodales lorem. Curabitur at nulla nec sem volutpat accumsan placerat nec elit. Ut bibendum dui vitae purus fringilla rhoncus. Praesent volutpat felis vitae felis ultricies rhoncus. Nulla maximus nibh vel enim ullamcorper aliquam. Nam efficitur est nibh, id mollis nisl ullamcorper et.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Alternative Ireland Mergers Statements Practice",
  //     "description": "Aenean iaculis vehicula sollicitudin. Sed convallis, massa sit amet venenatis volutpat, arcu dolor volutpat neque, in lobortis arcu velit hendrerit ante. Quisque accumsan luctus enim eu aliquam. Quisque et dolor est.",
  //     "type": "tax",
  //     "imageSrc": "tax.jpg",
  //     "altText": "calculator and laptop on desk",
  //     "price": 100
  //   },
  //   {
  //     "title": "Security Leadership Social",
  //     "description": "Vivamus pellentesque semper arcu eu egestas. Fusce lacinia velit quam, a rhoncus turpis blandit sit amet. Vivamus eros mi, malesuada vitae facilisis at, tincidunt in urna. Morbi sodales at nulla ac commodo.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 10
  //   },
  //   {
  //     "title": "Results Regulation Financial Governance",
  //     "description": "In enim nunc, tempor a congue ut, interdum consequat tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Nulla luctus sodales nulla, at eleifend nibh fermentum eget.",
  //     "type": "tax",
  //     "imageSrc": "tax.jpg",
  //     "altText": "calculator and laptop on desk",
  //     "price": 150
  //   },
  //   {
  //     "title": "UK Leadership Professional Instruments",
  //     "description": "Ut a congue quam, eu hendrerit dolor.  Ut porta in nunc id porttitor. Pellentesque iaculis pretium vulputate. Aenean eu neque vestibulum, semper leo sed, porttitor sapien. Etiam in justo eu risus scelerisque ultricies. Nunc commodo est in scelerisque semper.",
  //     "type": "tax",
  //     "imageSrc": "tax.jpg",
  //     "altText": "calculator and laptop on desk",
  //     "price": 50
  //   },
  //   {
  //     "title": "Workload Witness Data",
  //     "description": "Vestibulum maximus et arcu eget congue. Phasellus",
  //     "type": "technology",
  //     "imageSrc": "technology.jpg",
  //     "altText": "circuit board",
  //     "price": 10
  //   },
  //   {
  //     "title": "Business Savings Control",
  //     "description": "Etiam elementum auctor tellus.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Donor Business Professionalism Positioning",
  //     "description": "Phasellus ultrices tellus at gravida tempor. Mauris in augue dolor. Pellentesque sit amet mauris vehicula, eleifend tellus eget, cursus lectus. Suspendisse sed convallis ex, non tristique tellus.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 75
  //   },
  //   {
  //     "title": "Performance Work Preventing Workload Mergers Data Strategy",
  //     "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed ut ipsum ac sapien mollis ultrices vehicula magna sed augue feugiat, eget interdum dui feugiat. Integer erat augue, lacinia vel ex a, consectetur lacinia nulla.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Enterprise Compliance Introduction",
  //     "description": "Nullam cursus, leo in cursus feugiat, leo urna mollis dui, eu pretium augue orci ut lorem.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 100
  //   },
  //   {
  //     "title": "Performance Combinations Continuous BPM Data Corporate",
  //     "description": "Donec ornare nisi nec viverra lacinia. Ut in pharetra est. Suspendisse vestibulum, nisi eget bibendum porta, urna erat fermentum mi, ac efficitur turpis nisi ut lacus.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 20
  //   },
  //   {
  //     "title": "Building Spreadsheets International",
  //     "description": "Phasellus odio arcu, lobortis vel dui et, tincidunt tristique mi. Aenean et malesuada nibh.",
  //     "type": "technology",
  //     "imageSrc": "technology.jpg",
  //     "altText": "circuit board",
  //     "price": 50
  //   },
  //   {
  //     "title": "Partnership Acquisitions Finance Teams for Gift Strategy",
  //     "description": "Donec et arcu a augue sollicitudin congue. Ut suscipit, dui at ultrices convallis, purus mauris dignissim lacus, a dignissim dui justo eu turpis. Proin eget orci porttitor, convallis nibh sit amet, posuere lacus. Nunc vestibulum at ante sit amet dignissim. Curabitur quis quam tortor.",
  //     "type": "technology",
  //     "imageSrc": "technology.jpg",
  //     "altText": "circuit board",
  //     "price": 75
  //   },
  //   {
  //     "title": "Briefing Financial UK",
  //     "description": "Donec volutpat justo maximus lorem volutpat, eget aliquam dolor cursus. Maecenas porta fermentum rhoncus. Aliquam porttitor enim iaculis congue dignissim. Aenean at ante a nisl mattis efficitur. Morbi vulputate a lorem nec condimentum.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 100
  //   },
  //   {
  //     "title": "Ideas Management Mapping Using Skills",
  //     "description": "Aliquam sollicitudin, nunc vitae laoreet mattis, justo ante congue tortor, nec tempus tellus metus consequat enim. Ut eget urna euismod, luctus augue laoreet, rutrum dui.  Vivamus egestas eleifend arcu facilisis gravida.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 99
  //   },
  //   {
  //     "title": "Career Negotiating Managing Buying change? your Tax",
  //     "description": "Donec purus odio, bibendum in rutrum sit amet, tincidunt a justo.   Curabitur quis blandit elit. Cras blandit felis scelerisque luctus vulputate. Etiam purus mauris, mattis bibendum metus a, vehicula consequat enim.",
  //     "type": "tax",
  //     "imageSrc": "tax.jpg",
  //     "altText": "calculator and laptop on desk",
  //     "price": 1
  //   },
  //   {
  //     "title": "Mergers and Assessing Accountants and Ethical",
  //     "description": "Donec vel neque consequat, tincidunt risus quis, sodales erat. Donec imperdiet urna in sollicitudin auctor. Donec tristique dolor vel elit pulvinar imperdiet. Nulla id nisi feugiat, tempus neque quis, dignissim augue.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 20
  //   },
  //   {
  //     "title": "Solving Mergers Business",
  //     "description": "Donec maximus suscipit tellus. Sed dolor metus, lobortis in ultricies eget, tincidunt in erat. Curabitur faucibus hendrerit ex in eleifend. Maecenas ligula mauris, bibendum vitae nisl eget, mattis consequat mi.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Promoting for Basics Accounting",
  //     "description": "Morbi sit amet diam a dui molestie venenatis ac vitae tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Building UK GAAP World",
  //     "description": "Nunc consequat dictum rutrum.",
  //     "type": "tax",
  //     "imageSrc": "tax.jpg",
  //     "altText": "calculator and laptop on desk",
  //     "price": 75
  //   },
  //   {
  //     "title": "Principles New Professional Accountants",
  //     "description": "Mauris luctus neque sit amet odio posuere porta. Aliquam interdum augue dui, at lobortis eros ultrices id. Donec mattis posuere dui vitae sagittis. Sed tempor aliquam nisi, vel semper odio.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Transformation Charity Solving The Dynamic Guide",
  //     "description": "Duis leo lectus, lacinia sodales semper eget, convallis ut nibh. In blandit orci lectus, at imperdiet urna posuere nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc vel urna quis est varius auctor.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 75
  //   },
  //   {
  //     "title": "Megatrends and Advantage",
  //     "description": "Morbi consequat eu magna quis bibendum.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 100
  //   },
  //   {
  //     "title": "The Law Protection Control",
  //     "description": "Proin lobortis, ante ut vestibulum posuere, tortor mauris iaculis nulla, ac commodo odio quam eu arcu. Suspendisse at fringilla purus, vitae pharetra ante. Suspendisse mattis rhoncus gravida. Etiam tincidunt elementum condimentum. Vivamus id sagittis erat, tincidunt tristique elit.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Corporate Ethics",
  //     "description": "Vivamus et vulputate ipsum, id vulputate nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus lacus risus, egestas nec magna ornare, aliquam luctus nibh. Morbi vel ullamcorper ex.",
  //     "type": "technology",
  //     "imageSrc": "technology.jpg",
  //     "altText": "circuit board",
  //     "price": 10
  //   },
  //   {
  //     "title": "Succession IFRS",
  //     "description": "Mauris molestie nunc ut efficitur tincidunt. Quisque consectetur tincidunt lorem, sit amet semper purus pellentesque non. Pellentesque et volutpat sapien.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 50
  //   },
  //   {
  //     "title": "Understanding SME Results",
  //     "description": "Praesent ac sagittis purus. Etiam lacinia massa sed felis pulvinar, vitae consectetur tellus iaculis. Nullam quis vulputate turpis.",
  //     "type": "communication",
  //     "imageSrc": "communication.jpg",
  //     "altText": "man using a cup as a phone",
  //     "price": 100
  //   },
  //   {
  //     "title": "Development with Accounting Issues",
  //     "description": "Maecenas non pellentesque neque. Donec maximus bibendum lectus vel eleifend. Nullam fringilla vitae ex vel eleifend. Nunc aliquet tempus sapien vitae consequat. Donec pretium ipsum ut nunc ornare, a tincidunt odio bibendum.",
  //     "type": "tax",
  //     "imageSrc": "tax.jpg",
  //     "altText": "calculator and laptop on desk",
  //     "price": 10
  //   },
  //   {
  //     "title": "Tips Financial Planning",
  //     "description": "Proin congue semper fringilla. Cras risus ipsum, scelerisque sit amet nunc in, aliquam volutpat neque. Maecenas imperdiet nunc sed libero congue, non fringilla sapien ultricies.",
  //     "type": "tax",
  //     "imageSrc": "tax.jpg",
  //     "altText": "calculator and laptop on desk",
  //     "price": 75
  //   }
  // ];

  /**
  * nav-icon
  */
  const navMenu = $$('.header--nav')[0];
  const headerMenuIcon = $$('.header--nav__icon')[0];

  if (navMenu !== undefined && headerMenuIcon !== undefined) {

    const toggleMenu = () => {
      navMenu.classList.toggle('active');
    }
    headerMenuIcon.addEventListener('click', toggleMenu);
  }


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

  const firstTimeRenderArticles = () => {

    render(renderArticles(DATA), articleListEl);

    // Unhide the articles based on the INITIAL_NUM_OF_ARTICLE
    let showArticleEls = $$(`.article`).slice(0, initialArticle);
    loopArray(showArticleEls, (el) => {
      el.removeAttribute('data-hide');
    });
    
  }

  const showLoadMoreBtn = () => {
    $$('.js-load-article-btn')[0].removeAttribute('data-hide');
  }

  const hideLoadMoreBtn = () => {
    $$('.js-load-article-btn')[0].setAttribute('data-hide', 'true');
  }

  // firstTimeRenderArticles();


  const checkState = () => {
    console.log({
      'initialArticle': initialArticle,
      'activeData.length': activeData.length,
      'INCREASEMENTAL_ARTICLE': INCREASEMENTAL_ARTICLE,
      'activeData': activeData
    });
  }


  // handle load-more button
  $$('.js-load-article-btn')[0].addEventListener('click', (e) => {

    let showArticleEls;
    if (initialArticle + INCREASEMENTAL_ARTICLE === activeData.length) {
      hideLoadMoreBtn();
    }

    // Full of the number of INCREASEMENTAL_ARTICLE
    if (initialArticle + INCREASEMENTAL_ARTICLE <= activeData.length) {
      showArticleEls = $$(`.article`).slice(initialArticle, initialArticle + INCREASEMENTAL_ARTICLE);
      initialArticle = initialArticle + INCREASEMENTAL_ARTICLE;

      checkState();

      // unhide the article
      loopArray(showArticleEls, (el) => {
        el.removeAttribute('data-hide');
      });

      console.log(`Read More: Full of the number of INCREASEMENTAL_ARTICLE: ${INCREASEMENTAL_ARTICLE} elements`);
      
      
    } else {
      // Less than the number of INCREASEMENTAL_ARTICLE
      showArticleEls = $$(`.article`).slice(initialArticle, activeData.length + 1);

      // unhide the article
      loopArray(showArticleEls, (el) => {
        el.removeAttribute('data-hide');
      });

      console.log(`Read More: Less than the number of INCREASEMENTAL_ARTICLE: ${showArticleEls.length} elements`);

      hideLoadMoreBtn();

    }

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

    // reset the number of initialArticle
    initialArticle = INITIAL_NUM_OF_ARTICLE;

    // remove and add the active class of the menu bar
    loopArray(aEls, (el) => {
      el.classList.remove(CLASS_NAME);
    });
    targetEl.classList.add(CLASS_NAME);

    // render the articles with the hidden styling
    if (filterId === 'all') {
      activeData = DATA;
    } else {
      const filteredData = DATA.filter((el) => { return el.type === filterId } );
      activeData = filteredData;
    }
    render(renderArticles(activeData), articleListEl);

    
    // unhide the article
    let showArticleEls = $$(`.article`).slice(0, initialArticle);
    loopArray(showArticleEls, (el) => {
      el.removeAttribute('data-hide');
    });

    // show or hide the load-more button
    (initialArticle >= activeData.length) ? hideLoadMoreBtn() : showLoadMoreBtn();

    // reset the resetSortArticleSelectEl
    resetSortArticleSelectEl();

    checkState();

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
    const TEMP_ACTIVE_DATA = activeData.slice(0); // using a new temporary array
    const SORT_BY_TITLE = 'title';
    const SORT_BY_PRICE = 'price';

    checkState();

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

    
    // make use of read more effect
    let showArticleEls = $$(`.article`).slice(0, initialArticle);
    loopArray(showArticleEls, (el) => {
      el.removeAttribute('data-hide');
    });
    
    // show or hide the load-more button
    (initialArticle >= activeData.length) ? hideLoadMoreBtn() : showLoadMoreBtn();

    checkState();
    
  })







}) ();

