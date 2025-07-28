const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

  addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)

// ========== Developer Mode ==========
let devMode = false;


window.toggleDevMode = () => {
  devMode = !devMode;
  document.querySelectorAll('.editable').forEach(el => {
    el.setAttribute('contenteditable', devMode);
    if (devMode) {
      el.classList.add('editable-active');
    } else {
      el.classList.remove('editable-active');
    }
  });

  alert(devMode ? '开发模式已开启：现在可以编辑内容' : '开发模式已关闭');
};


window.saveChanges = () => {
  const content = {};
  document.querySelectorAll('.editable').forEach((el, i) => {
    content[`editable_${i}`] = el.innerText.trim();
  });
  console.log('Saved content:', content);
  alert('内容已保存');

  // Exit developer mode
  devMode = false;
  document.querySelectorAll('.editable').forEach(el => {
    el.setAttribute('contenteditable', false);
    el.classList.remove('editable-active');
  });

  // Download updated page as HTML
  const docClone = document.documentElement.cloneNode(true);

  // Remove <script> tag to prevent recursion or reexecution
  docClone.querySelectorAll('script').forEach(s => s.remove());

  const htmlContent = '<!DOCTYPE html>\n' + docClone.outerHTML;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'updated_page.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

