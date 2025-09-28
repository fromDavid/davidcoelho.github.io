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

  const hasEconomicsSummary = document.getElementById('summary-v') !== null;
  const locale = hasEconomicsSummary ? 'en-US' : 'pt-PT';

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const percentageFormatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const chartCanvas = document.getElementById('income-chart');
  let incomeChart;

  const updateChart = (points) => {
    if (!chartCanvas || typeof window.Chart === 'undefined') {
      return;
    }
    const labels = points.map((point) => point.label);
    const values = points.map((point) => Number.isFinite(point.value) ? point.value : 0);
    const backgroundColor = values.map((value) => value >= 0 ? 'rgba(25, 135, 84, 0.55)' : 'rgba(220, 53, 69, 0.55)');
    const borderColor = values.map((value) => value >= 0 ? 'rgba(25, 135, 84, 1)' : 'rgba(220, 53, 69, 1)');

    if (!incomeChart) {
      incomeChart = new window.Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Value (EUR)',
            data: values,
            backgroundColor,
            borderColor,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${currencyFormatter.format(context.raw ?? 0)}`
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => currencyFormatter.format(value)
              }
            }
          }
        }
      });
      return;
    }

    incomeChart.data.labels = labels;
    incomeChart.data.datasets[0].data = values;
    incomeChart.data.datasets[0].backgroundColor = backgroundColor;
    incomeChart.data.datasets[0].borderColor = borderColor;
    incomeChart.update();
  };
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
    element.textContent = `${percentageFormatter.format(value)}%`;
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

  const calculateEconomics = () => {
    const revenue = getValue('operating-revenue');
    const variableCosts = getValue('variable-costs');
    const fixedCosts = getValue('fixed-costs');
    const financialCharges = getValue('financial-charges');
    const taxRate = Math.max(0, getValue('tax-rate')) / 100;

    const grossMargin = revenue - variableCosts;
    const operatingResult = grossMargin - fixedCosts;
    const resultBeforeTax = operatingResult - financialCharges;
    const taxes = Math.max(0, resultBeforeTax) * taxRate;
    const netResult = resultBeforeTax - taxes;
    const profitMargin = revenue !== 0 ? (netResult / revenue) * 100 : 0;
    const contributionMarginRatio = revenue !== 0 ? (revenue - variableCosts) / revenue : 0;
    const breakEvenSales = contributionMarginRatio > 0 ? (fixedCosts + financialCharges) / contributionMarginRatio : 0;
    const marginOfSafety = revenue > 0 ? ((revenue - breakEvenSales) / revenue) * 100 : 0;

    updateCurrency('summary-v', revenue);
    updateCurrency('summary-cv', -variableCosts);
    updateCurrency('summary-mb', grossMargin);
    updateCurrency('summary-cf', -fixedCosts);
    updateCurrency('summary-ro', operatingResult);
    updateCurrency('summary-ef', -financialCharges);
    updateCurrency('summary-rlai', resultBeforeTax);
    updateCurrency('summary-rl', netResult);
    updatePercentage('summary-profit-margin', profitMargin);
    updatePercentage('summary-margin-safety', marginOfSafety);
    updateCurrency('summary-break-even', breakEvenSales);

    updateChart([
      { label: 'Operating Revenue', value: revenue },
      { label: 'Variable Costs', value: -variableCosts },
      { label: 'Fixed Costs', value: -fixedCosts },
      { label: 'Financial Charges', value: -financialCharges },
      { label: 'Net Result', value: netResult },
      { label: 'Break-even Sales', value: breakEvenSales }
    ]);
  };

  const resetEconomics = () => {
    updateCurrency('summary-v', 0);
    updateCurrency('summary-cv', 0);
    updateCurrency('summary-mb', 0);
    updateCurrency('summary-cf', 0);
    updateCurrency('summary-ro', 0);
    updateCurrency('summary-ef', 0);
    updateCurrency('summary-rlai', 0);
    updateCurrency('summary-rl', 0);
    updatePercentage('summary-profit-margin', 0);
    updatePercentage('summary-margin-safety', 0);
    updateCurrency('summary-break-even', 0);

    updateChart([
      { label: 'Operating Revenue', value: 0 },
      { label: 'Variable Costs', value: 0 },
      { label: 'Fixed Costs', value: 0 },
      { label: 'Financial Charges', value: 0 },
      { label: 'Net Result', value: 0 },
      { label: 'Break-even Sales', value: 0 }
    ]);
  };

  const calculateDefault = () => {
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

  const resetDefault = () => {
    updateCurrency('gross-margin', 0);
    updateCurrency('operating-income', 0);
    updateCurrency('income-before-tax', 0);
    updateCurrency('taxes', 0);
    updateCurrency('net-income', 0);
    updatePercentage('net-margin', 0);
  };

  const calculate = hasEconomicsSummary ? calculateEconomics : calculateDefault;
  const resetResults = hasEconomicsSummary ? resetEconomics : resetDefault;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculate();
  });

  form.addEventListener('reset', () => {
    window.setTimeout(resetResults, 0);
  });

  resetResults();
});

