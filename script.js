document.addEventListener('DOMContentLoaded', function() {
    var nav = document.querySelector('.nav');
    var listItems = document.querySelectorAll('.nav-links li');
    var links = nav.querySelectorAll('a[href^="#"]'); // Selektujemo sve linkove koji vode do sidra
    var kontaktButton = document.querySelector('#kontakt'); // Assuming the button has an ID 'kontaktButton'
    var kontaktRespButton = document.querySelector('#kontaktResp'); // Assuming the button has an ID 'kontaktButton

    // Postavljanje ID-a active na link POCETNA
    var pocetnaLink = document.querySelector('li a[href="#pocetna"]').parentElement;
    console.log('Pocetna link:', pocetnaLink);
    if (pocetnaLink) {
        pocetnaLink.id = 'active';
    }

    // Onemogućavanje pamćenja pozicije skrolovanja
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Skrolovanje stranice na vrh po defaultu
    window.scrollTo(0, 0);


    if(nav){
        window.addEventListener('scroll', function() {
            var scrollPosition = window.scrollY || document.documentElement.scrollTop;
            var scrollThreshold = document.documentElement.scrollHeight*0; // 10% visine stranice
            
            // Dodavanje ili uklanjanje klase 'scrolled' na navigacioni bar
            if (scrollPosition > scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    } else {
        console.error("Nije pronadjen element sa klasom .nav");
    }

    window.addEventListener('scroll', function() { // FUNKCIJA ZA DODAVANJE ID-A ACTIVE NA LINKOVE KADA SE SKROLUJE RUCNO KROZ SAJT
        listItems.forEach(function(listItem) {
            if (!listItem.querySelector('a')) {
                return; // Skip empty listItem
            }
            var targetId = listItem.querySelector('a').getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            console.log('Target element:', targetElement);
            if (targetElement) {
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150; // Kod da se menja id active iznad ciljanog elementa
                var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollPosition >= targetPosition) {
                    listItems.forEach(function(li) { li.removeAttribute('id'); });
                    listItem.setAttribute('id', 'active');
                }
            }
        });
    });

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Sprečavamo podrazumevano ponašanje linka
            var targetId = this.getAttribute('href').substring(1); // Dobijamo ID ciljanog elementa
            var targetElement = document.getElementById(targetId);
            console.log('Clicked link target element:', targetElement);

            if (targetElement) {
                var offset;
                if (targetId == 'kontakt') {
                    offset = 200; // Offset for 'kontakt' section
                } else {
                    offset = 100; // Default offset for other sections
                }
                window.scrollTo(0, targetElement.getBoundingClientRect().top + window.pageYOffset - offset); // Skrolujemo iznad ciljanog elementa
            }
            listItems.forEach(function(li) {
                if (li.hasAttribute('id')) {
                    console.log('Removing ID from:', li);
                    li.removeAttribute('id');
                }
            });
            // Add 'active' id to the parent list item of the clicked link
            console.log('Setting active ID to:', this.parentElement);
            this.parentElement.setAttribute('id', 'active');

            document.querySelector('.nav-links').classList.remove('activeResp');
        });
    });

    document.getElementById('kontaktResp').addEventListener('click', function() {
        var targetElement = document.getElementById('kontaktNav');
        if (targetElement) {
            var offset = 150; // Offset for 'kontaktResp' section
            window.scrollTo(0, targetElement.getBoundingClientRect().top + window.pageYOffset - offset);

            document.querySelector('.nav-links').classList.remove('activeResp');
        }
    });

    if (kontaktButton) {
        kontaktButton.addEventListener('click', function(event) {
            event.preventDefault(); // Sprečavamo podrazumevano ponašanje dugmeta
            var targetElement = document.querySelector('#kontaktNav'); // Assuming the div has a class 'kontaktKlasa'
            console.log('Kontakt button target element:', targetElement);

            if (targetElement) {
                var offset = 135; // Offset for 'kontakt' section
                window.scrollTo(0, targetElement.getBoundingClientRect().top + window.pageYOffset - offset); // Skrolujemo iznad ciljanog elementa
            }
        });
    }

    document.getElementById('nav-toggle').addEventListener('click', function() {
        console.log('Toggling nav links');
        document.querySelector('.nav-links').classList.toggle('activeResp');
    });
});