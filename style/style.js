window.addEventListener('scroll', function() {
    const header = document.querySelector('.zoom-header');
    const photoBox = document.querySelector('.photo-box');
    const photoBox1 = document.querySelector('.photo-box-2');
    const photoBox2 = document.querySelector('.photo-box-3');
    const headerContent = document.querySelector('.header-content');
    const panel = document.querySelector('.panel');
    const line = document.querySelector('.scroll-line');
    const scrollPosition = window.scrollY;
    
    //Photo Box 1
    let photoBoxPosition = 0 + scrollPosition * 0.01;
    
    const maxTranslate = 18; // Maximum translation in vh
      if (photoBoxPosition > maxTranslate) {
          photoBoxPosition = maxTranslate;
      }
  
    photoBox.style.transform = `translate(0, ${photoBoxPosition}vh)`;
    
    //Photo Box 2
    let photoBoxPosition1 = 0 + scrollPosition * 0.01;
    
    const maxTranslate1 = 25; // Maximum translation in vh
      if (photoBoxPosition1 > maxTranslate1) {
          photoBoxPosition1 = maxTranslate1;
      }
  
    photoBox1.style.transform = `translate(0, ${photoBoxPosition1}vh)`;
  
    //Photo Box 3
    let photoBoxPosition2 = 0 - scrollPosition * 0.01;
    
    const maxTranslate2 = 18; // Maximum translation in vh
      if (photoBoxPosition2 > maxTranslate2) {
          photoBoxPosition2 = maxTranslate2;
      }
  
    photoBox2.style.transform = `translate(0, ${photoBoxPosition2}vh)`;
  
    // Efeito Zoom no background header
    header.style.setProperty('--scale-value', 1 + scrollPosition * 0.0004);
    
    // Efeito parallax no texto do header
    const headerContentPosition = 0 + scrollPosition * 0.1;
    headerContent.style.transform = `translateY(${headerContentPosition}px)`;
  });



document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('income-statement-form');
  if (!form) {
    return;
  }

  const currencyFormatter = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const formatPercentage = (value) =>
    value.toLocaleString('pt-PT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  const applyTrendClass = (element, value) => {
    element.classList.remove('text-success', 'text-danger');
    if (value > 0.0001) {
      element.classList.add('text-success');
    } else if (value < -0.0001) {
      element.classList.add('text-danger');
    }
  };

  const updateCurrency = (id, value) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    element.textContent = currencyFormatter.format(value);
    applyTrendClass(element, value);
  };

  const updatePercentage = (id, value) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    element.textContent = `${formatPercentage(value)}%`;
    applyTrendClass(element, value);
  };

  const getValue = (id) => {
    const input = document.getElementById(id);
    if (!input) {
      return 0;
    }
    const normalised = input.value.replace(',', '.');
    const numeric = Number.parseFloat(normalised);
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const calculate = () => {
    const revenue = getValue('revenue');
    const costOfGoods = getValue('cost-of-goods');
    const operatingExpenses = getValue('operating-expenses');
    const otherIncome = getValue('other-income');
    const otherExpenses = getValue('other-expenses');
    const taxRate = Math.max(0, getValue('tax-rate')) / 100;

    const grossMargin = revenue - costOfGoods;
    const operatingIncome = grossMargin - operatingExpenses;
    const incomeBeforeTax = operatingIncome + otherIncome - otherExpenses;
    const taxableBase = Math.max(0, incomeBeforeTax);
    const taxes = taxableBase * taxRate;
    const netIncome = incomeBeforeTax - taxes;
    const netMargin = revenue !== 0 ? (netIncome / revenue) * 100 : 0;

    updateCurrency('gross-margin', grossMargin);
    updateCurrency('operating-income', operatingIncome);
    updateCurrency('income-before-tax', incomeBeforeTax);
    updateCurrency('taxes', taxes);
    updateCurrency('net-income', netIncome);
    updatePercentage('net-margin', netMargin);
  };

  const resetResults = () => {
    updateCurrency('gross-margin', 0);
    updateCurrency('operating-income', 0);
    updateCurrency('income-before-tax', 0);
    updateCurrency('taxes', 0);
    updateCurrency('net-income', 0);
    updatePercentage('net-margin', 0);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculate();
  });

  form.addEventListener('reset', () => {
    window.setTimeout(resetResults, 0);
  });

  resetResults();
});


