/* -------------------------
   UI: menu, theme, top btn
   ------------------------- */
   const menuBtn = document.getElementById('menuBtn');
   const siteNav = document.getElementById('siteNav');
   const themeToggle = document.getElementById('themeToggle');
   const topBtn = document.getElementById('topBtn');
   const orderForm = document.getElementById('orderForm');
   
   menuBtn && menuBtn.addEventListener('click', () => {
     if (siteNav.style.display === 'flex') {
       siteNav.style.display = '';
     } else {
       siteNav.style.display = 'flex';
       siteNav.style.flexDirection = 'column';
       siteNav.style.alignItems = 'flex-end';
       siteNav.style.gap = '8px';
     }
   });
   
   // theme toggle (light/dark)
   themeToggle && themeToggle.addEventListener('click', () => {
     document.body.classList.toggle('dark');
     if (document.body.classList.contains('dark')) {
       localStorage.setItem('calmnature-theme', 'dark');
     } else {
       localStorage.removeItem('calmnature-theme');
     }
   });
   
   // preserve theme
   if (localStorage.getItem('calmnature-theme') === 'dark') {
     document.body.classList.add('dark');
   }
   
   /* Top button */
   window.addEventListener('scroll', () => {
     if (document.documentElement.scrollTop > 200) {
       topBtn.style.display = 'inline-block';
     } else {
       topBtn.style.display = 'none';
     }
   });
   topBtn && topBtn.addEventListener('click', () => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
   });
   
   /* -------------------------
      Simple reveal on scroll
      ------------------------- */
   const revealEls = document.querySelectorAll('.reveal');
   const io = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('visible');
         io.unobserve(entry.target);
       }
     });
   }, { threshold: 0.12 });
   
   revealEls.forEach(el => io.observe(el));
   
   /* -------------------------
      Order form handler (AJAX) com mensagem animada
      ------------------------- */
   if (orderForm) {
     const msgBox = document.createElement('div');
     msgBox.classList.add('form-msg'); // classe para CSS animada
     msgBox.style.display = 'none';
     orderForm.appendChild(msgBox);
   
     orderForm.addEventListener('submit', async (e) => {
       e.preventDefault();
       const formData = new FormData(orderForm);
   
       try {
         const response = await fetch('https://formspree.io/f/mpwjvrbp', {
           method: 'POST',
           headers: { 'Accept': 'application/json' },
           body: formData
         });
   
         if (response.ok) {
           msgBox.textContent = 'Obrigado! Seu pedido foi enviado com sucesso.';
           msgBox.classList.remove('error');
           msgBox.classList.add('visible');
           orderForm.reset();
           setTimeout(() => { msgBox.classList.remove('visible'); }, 5000);
         } else {
           msgBox.textContent = 'Ocorreu um erro. Tente novamente mais tarde.';
           msgBox.classList.add('error', 'visible');
         }
       } catch (error) {
         msgBox.textContent = 'Erro de conexão. Tente novamente mais tarde.';
         msgBox.classList.add('error', 'visible');
       }
     });
   }
   
   /* -------------------------
      Chart.js — Dados de exemplo
      ------------------------- */
   (function renderChart(){
     const ctx = document.getElementById('anxietyChart');
     if (!ctx) return;
   
     const labels = ['2019 (OMS)', '2023 (tendência)', '2024 (estimativa)', 'População com Dx'];
     const data = {
       labels,
       datasets: [{
         label: 'Indicadores relacionados à ansiedade',
         data: [18.6, 26, 9.3, 26],
         backgroundColor: [
           'rgba(74,124,89,0.9)',
           'rgba(74,124,89,0.75)',
           'rgba(74,124,89,0.6)',
           'rgba(74,124,89,0.45)'
         ],
         borderRadius: 6,
         barThickness: 28
       }]
     };
   
     new Chart(ctx, {
       type: 'bar',
       data,
       options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
           legend: { display: false },
           tooltip: {
             callbacks: {
               label: (ctx) => {
                 const idx = ctx.dataIndex;
                 if (idx === 0) return '18.6 milhões (2019)';
                 if (idx === 1) return '26% (alguns levantamentos)';
                 if (idx === 2) return '9.3% (estimativa 2024)';
                 if (idx === 3) return '26% (população com diagnóstico)';
                 return ctx.formattedValue;
               }
             }
           }
         },
         scales: {
           y: {
             beginAtZero: true,
             ticks: {
               callback: function(value) { return value; }
             }
           }
         }
       }
     });
   })();
   
   /* -------------------------
      Improve nav link behavior (close on click small screens)
      ------------------------- */
   const navLinks = document.querySelectorAll('#siteNav a');
   navLinks.forEach(a => a.addEventListener('click', () => {
     if (window.innerWidth <= 900) {
       siteNav.style.display = '';
     }
   }));
   