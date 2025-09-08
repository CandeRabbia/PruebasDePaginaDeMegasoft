 // Funcionalidad de navegación de módulos
        document.querySelectorAll('.modulo-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover clase active de todos los enlaces
                document.querySelectorAll('.modulo-link').forEach(l => l.classList.remove('active'));
                
                // Agregar clase active al enlace clickeado
                this.classList.add('active');
                
                // Simular cambio de contenido
                const modulo = this.dataset.modulo;
                updateModuleContent(modulo);
            });
        });

        // Funcionalidad de tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover clase active de todos los tabs
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                
                // Agregar clase active al tab clickeado
                this.classList.add('active');
                
                // Simular cambio de sección
                const section = this.dataset.section;
                updateSectionContent(section);
            });
        });

        function updateModuleContent(modulo) {
            const titles = {
                comercios: 'Gestión Comercial para Empresas y Comercios',
                estaciones: 'Sistema para Estaciones de Servicio',
                supermercados: 'Gestión Integral de Supermercados',
                cablevideos: 'Administración de Servicios de Cable',
                servicios: 'Gestión de Servicios Públicos',
                holistor: 'Sistemas Integrales HOLISTOR'
            };

            document.querySelector('.module-header h2').textContent = titles[modulo] || 'Módulo Seleccionado';
            
            // Agregar efecto de entrada
            const section = document.querySelector('.mod-section');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100);
        }

        function updateSectionContent(section) {
            const contents = {
                introduccion: 'Introducción al sistema seleccionado',
                'puntos-venta': 'Gestión de Puntos de Venta',
                administracion: 'Panel de Administración Central',
                seguridad: 'Características de Seguridad'
            };

            document.querySelector('.mod-section h3').textContent = contents[section] || 'Sección';
            
            // Efecto visual de cambio
            const section_el = document.querySelector('.mod-section');
            section_el.style.transform = 'scale(0.98)';
            setTimeout(() => {
                section_el.style.transform = 'scale(1)';
            }, 150);
        }

        // Efecto de parallax suave en scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            document.querySelector('.contenido-inicial::after')?.style.setProperty('transform', `translate3d(0, ${rate}px, 0)`);
        });

        // Observador de intersección para animaciones
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.navegacion-modulos li, .mod-section').forEach(el => {
            observer.observe(el);
        });

          function toggleMenu(){ document.querySelector('.menu').classList.toggle('active'); }
    function moduloDesdeURL(){ const params = new URLSearchParams(window.location.search); return params.get('modulo'); }
    function slugify(str){
      return String(str).toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
        .replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    }

    const LABELS_GENERIC = {
      introduccion: "Introducción",
      puntos_de_venta: "Puntos de Venta",
      administracion_central: "Administración Central",
      seguridad: "Seguridad"
    };

    const ORDER = {
      comercios: ["introduccion","puntos_de_venta","administracion_central","seguridad"]
    };

    const ModuleState = { title:'', url:'', sections:new Map(), order:[] };

    function renderModuleMenu(modulo, sectionList){
      const nav = document.getElementById('moduleTopTabs');
      if (!nav) return;
      if (!Array.isArray(sectionList) || !sectionList.length){ nav.innerHTML=''; return; }

      nav.innerHTML = `
        <ul class="tabs">
          ${sectionList.map((it,i)=>`
            <li><a class="tab ${i===0?'active':''}" data-id="${it.id}" href="#${it.id}">${it.subtitulo}</a></li>
          `).join('')}
        </ul>
        <div class="ink"></div>
      `;

      nav.querySelectorAll('.tab').forEach(a=>{
        a.addEventListener('click',(e)=>{
          e.preventDefault();
          const id = a.dataset.id;
          nav.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t===a));
          renderSingleSection(id);
          moveInkToActive(nav);
        });
      });

      moveInkToActive(nav);
      window.addEventListener('resize', ()=>moveInkToActive(nav));
    }

    function moveInkToActive(nav){
      const ink = nav.querySelector('.ink');
      const active = nav.querySelector('.tab.active');
      if (!ink || !active) return;
      const aRect = active.getBoundingClientRect();
      const nRect = nav.getBoundingClientRect();
      const left = (aRect.left - nRect.left) + nav.scrollLeft;
      ink.style.height = '2px';
      ink.style.background = '#1a237e';
      ink.style.width = `${aRect.width}px`;
      ink.style.transform = `translateX(${left}px)`;
    }

    function renderSingleSection(id){
      const cont = document.getElementById('contenido-acordeon');
      const s = ModuleState.sections.get(id);
      if (!s){ cont.innerHTML = "<p>Contenido no disponible.</p>"; return; }
      cont.innerHTML = `
        <h2>${ModuleState.title || ''}</h2>
        ${ModuleState.url ? `<p><a href="${ModuleState.url}" target="_blank">Ver más detalles</a></p>`:''}
        <section class="mod-section" id="${id}">
          <h3>${s.label}</h3>
          ${s.html}
        </section>

      `;
    }

    async function cargarModulo(modulo) {
      const cont = document.getElementById('contenido-acordeon');
      cont.innerHTML = `<p>Cargando ${modulo}...</p>`;
      ModuleState.title=''; ModuleState.url=''; ModuleState.sections=new Map(); ModuleState.order=[];

      try {
        const r = await fetch(`./json/${modulo}.json`);
        const data = await r.json();

        const sectionsObj = data.sections;
        ModuleState.title = data.name || modulo;
        ModuleState.url = data.url || '';

        const keys = Object.keys(sectionsObj);
        const pref = ORDER[modulo] || [];
        const ordered = [...pref.filter(k => k in sectionsObj), ...keys.filter(k => !pref.includes(k))];

        const secList=[];
        ordered.forEach(k=>{
          const label = LABELS_GENERIC[k] || k;
          ModuleState.sections.set(k,{label,html:sectionsObj[k]});
          ModuleState.order.push(k);
          secList.push({id:k, subtitulo:label});
        });

        renderModuleMenu(modulo,secList);
        renderSingleSection(ModuleState.order[0]);

      } catch(err){
        cont.innerHTML = "<p>Contenido no disponible.</p>";
      }
    }

    function activarYcargar(modulo){
      document.querySelectorAll('.modulo-link').forEach(l=>l.classList.remove('active'));
      const link=document.querySelector(`.modulo-link[data-modulo="${modulo}"]`);
      if(link) link.classList.add('active');
      cargarModulo(modulo);
    }

    document.querySelectorAll('.modulo-link').forEach(link=>{
      link.addEventListener('click',e=>{
        e.preventDefault();
        const modulo=link.dataset.modulo;
        const url=new URL(window.location);
        url.searchParams.set('modulo',modulo);
        window.history.replaceState({},'',url);
        activarYcargar(modulo);
      });
    });

    window.addEventListener('DOMContentLoaded',()=>{
      const modulo=moduloDesdeURL()||'comercios';
      activarYcargar(modulo);
    });

     // Funcionalidad del menú de contacto flotante
        function toggleContactMenu() {
            const menu = document.getElementById('menu-contacto');
            menu.classList.toggle('active');
        }

        // Funcionalidad del menú móvil (si es necesaria)
        function toggleMenu() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        }

        // Cerrar menú de contacto al hacer click fuera
        document.addEventListener('click', function(event) {
            const contactBtn = document.getElementById('btn-contacto');
            const contactMenu = document.getElementById('menu-contacto');
            
            if (!contactBtn.contains(event.target) && !contactMenu.contains(event.target)) {
                contactMenu.classList.remove('active');
            }
        });

        // Efecto de scroll en el header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Intersection Observer para animaciones
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observar elementos para animaciones
        document.querySelectorAll('.card, .noticia').forEach(el => {
            observer.observe(el);
        });

        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        